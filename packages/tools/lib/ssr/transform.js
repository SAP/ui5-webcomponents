const fs = require('fs');
const puppeteer = require('puppeteer');
const prettier = require('prettier');

const args = process.argv.slice(2); // Skip the first two elements
const packageName = args[0] || "main";
const pageName = args[1] || "Button";

const projectRoot = __dirname.split("/packages/tools/lib/ssr")[0];
const serverRoot = `http://localhost:8080`;

const testPageURL = `${serverRoot}/packages/${packageName}/test/pages/${pageName}.html`;
const outputPath = `${projectRoot}/packages/${packageName}/test/pages/${pageName}-SSR.html`;

const generateSSRPage = async (testPageURL, outputPath) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(testPageURL);

    let html = await page.evaluate(() => {
        function processNode(node) {
            const skipList = ["vite-plugin-checker-error-overlay", "ui5-announcement-area"];

            if (skipList.includes(node.localName)) {
                return document.createTextNode("");
            }

            if (node.nodeType === Node.ELEMENT_NODE) {
                const clone = document.createElement(node.tagName.toLowerCase());

                // Copy attributes
                for (let attr of node.attributes) {
                    clone.setAttribute(attr.name, attr.value);
                }

                // Process shadow DOM if it's a custom element
                if (customElements.get(node.tagName.toLowerCase())) {
                    const shadowRoot = node.shadowRoot;
                    if (shadowRoot) {
                        const template = document.createElement('template');
                        template.shadowRootMode = 'open';
                        if (shadowRoot.delegatesFocus) {
                            template.shadowRootDelegatesFocus = true;
                        }
                        for (let child of shadowRoot.children) {
                            template.content.appendChild(processNode(child));
                        }
                        clone.appendChild(template);
                    }
                }
                // Process children
                for (let child of node.childNodes) {
                    clone.appendChild(processNode(child));
                }                

                return clone;
            } else{
                return node.cloneNode();
            }
        }

        const bodyClone = processNode(document.documentElement);        
        return bodyClone.outerHTML;
    });

   html = await prettier.format(html, { parser: 'html' });

   // Remove vite-injected scripts
   html = html.replace(`<script type="module">
      import { inject } from "/@vite-plugin-checker-runtime";
      inject({
        overlayConfig: {},
        base: "/",
      });
    </script>`, '');
   html = html.replace(`<script type="module" src="/@vite-plugin-checker-client"></script>`, '');

   fs.writeFileSync(outputPath, html);
   console.log("Done");

   await browser.close();
};

generateSSRPage(testPageURL, outputPath);