const glob = require('glob');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const ejs = require('ejs');
var sm = require('sitemap');

tagNameMap = {
    "Button": "ui5-button",
    "Card": "ui5-card",
    "CheckBox": "ui5-checkbox",
    "DatePicker": "ui5-date-picker",
    "Dialog": "ui5-dialog",
    "Icon": "ui5-icon",
    "Input": "ui5-input",
    "Label": "ui5-label",
    "Link": "ui5-link",
    "List": "ui5-list",
    "Panel": "ui5-panel",
    "Popover": "ui5-popover",
    "RadioButton": "ui5-radiobutton",
    "Select": "ui5-select",
    "Switch": "ui5-switch",
    "TabContainer": "ui5-tabcontainer",
    "Table": "ui5-table",
    "TextArea": "ui5-textarea",
    "Timeline": "ui5-timeline",
    "Title": "ui5-title",
    "ToggleButton": "ui5-togglebutton",
}

const generateSiteMap = (componentNames) => {
    const urls = componentNames.map(componentName => {
        return { url: `/ui5-webcomponents/playground/components/${componentName}/`,  changefreq: 'daily' };
    });

    urls.unshift({ url: `/ui5-webcomponents/playground/`,  changefreq: 'daily' });
    urls.unshift({ url: `/ui5-webcomponents/`,  changefreq: 'daily' });

    const options = {
        hostname: 'https://sap.github.io',
        cacheTime: 600000,        // 600 sec - cache purge period
        urls,
      }

    // Creates a sitemap object given the input configuration with URLs
    var sitemap = sm.createSitemap( options );
    // Generates XML with a callback function
    // Gives you a string containing the XML data
    var xml = sitemap.toString();

    fs.writeFileSync("dist/sitemap.xml", xml);
}

const files = glob.sync(process.argv[2]);
const componentNames = files.map(fileName => path.basename(fileName).replace(".sample.html", ""));

generateSiteMap(componentNames);

// generate index.html files per component
componentNames.forEach(async (componentName) => {
    console.log(`generating static index.html file for ${componentName}`);

    const data = {
        componentName,
        tagName: tagNameMap[componentName] || "",
    }

    const componentIndexContent = await ejs.renderFile("webapp/playground/component/Name/index.ejs", data);
    mkdirp.sync(`dist/playground/components/${componentName}/`);
    fs.writeFileSync(`dist/playground/components/${componentName}/index.html`, componentIndexContent);
});
