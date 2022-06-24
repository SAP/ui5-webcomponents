const fs = require('fs/promises');
const path = require('path');

const packages = [
    "fiori",
    "main",
];

packages.forEach(async (package) => {
    const pagesPath = `../${package}/dist/test/pages/`;

    await fs.mkdir(`./docs/pages/content/${package}`, {recursive: true});

    const files = (await fs.readdir(pagesPath)).filter(file => file.endsWith(".html"));

    files.forEach(async (file) => {
        const fullFilePath = path.join(pagesPath, file);
        let content = (await fs.readFile(fullFilePath)).toString();

        // replace absolute urls so they get the public deploy url
        const assetsExpr = /([a-zA-Z0-9_\-]+)="([^"]*assets\/[^"]*)"/g;
        content = content.replace(assetsExpr, `$1='{{ "$2" | absolute_url }}'`);

        //Get current component name
        const currentPageName = file.slice(0, file.indexOf('.'));

        // add front matter
        content = `---
title: ${currentPageName.replace(/([A-Z])/g, " $1").trim()}
permalink: /playground/${package}/pages/${currentPageName}/
nav_exclude: true
---
${content}`;

        fs.writeFile(`docs/pages/content/${package}/${file}`, content);
    });
});
