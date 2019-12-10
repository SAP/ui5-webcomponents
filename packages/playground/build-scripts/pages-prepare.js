const fs = require('fs');
const path = require('path');
const prependFile = require('prepend-file');
const replace = require('replace-in-file');

const packages = [
    "fiori",
    "main",
];

const components = [];

packages.forEach(package => {
    const pagesPath = `../${package}/dist/test-resources/pages/`;

    var files = fs.readdirSync(pagesPath);

    //handling error
    if (!files) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach(file => {
        components.push(file);
    });
});

components.sort();

packages.forEach(package => {
    const pagesPath = `../${package}/dist/test-resources/pages/`;

    fs.readdir(pagesPath, (err, files) => {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach((file, index) => {
            const dirPath = path.join(pagesPath, file);
            // if directory, skip it
            if (fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory()) {
                return;
            }

            //Copy pages
            fs.copyFileSync(dirPath, path.join(process.cwd(), `/docs/pages/content/${file}`));

            var results = replace({
                files: `./docs/pages/content/${file}`,
                from: [
                    `<script src="../../webcomponentsjs/webcomponents-loader.js"></script>`,
                    `<script src="../../resources/bundle.esm.js" type="module"></script>`,
                    `<script nomodule src="../../resources/bundle.es5.js"></script>`],
                to: [
                    ``,
                    ``,
                    `
<script src="{{ "/assets/js/webcomponentsjs/webcomponents-loader.js" | absolute_url }}"></script>
<script type="module" src="{{ "/assets/js/ui5-webcomponents/bundle.esm.js" | absolute_url }}"></script>
<script nomodule src="{{ "/assets/js/ui5-webcomponents/bundle.es5.js" | absolute_url }}"></script>
                    `
                ]
            })
                .then( _ => {
                    //Get current component name
                    const currentPageName = file.slice(0, file.indexOf('.'));

                    prependFile(path.join(process.cwd(), '/docs/pages/content', file),
`---
layout: default
title: ${currentPageName.replace(/([A-Z])/g, " $1").trim()}
parent: Pages
permalink: /playground/pages/${currentPageName}/
nav_exclude: true
---
`,
                    err => {
                        if (err) {
                            // Error
                            console.log(`Error: Can't prepend to ${file}`);
                        }
                    })
                })
        });
    });
});
