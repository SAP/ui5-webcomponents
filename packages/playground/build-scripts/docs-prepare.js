// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

const fs = require('fs');
const path = require('path');
var rimraf = require('rimraf');
const prependFile = require('prepend-file');

var documentationPath = path.resolve(process.argv[2]);

// Delete current content of documentation folder
fs.readdirSync('./docs/documentation', (err, files) => {
    files.forEach(file => {
        if (file !== "documentation.md") {
            rimraf(path.join('./docs/documentation', file), error => {
                console.log(`Error: ${error}`);
            });
        }
    });
});

// Copy documentation files from main project
fs.readdir(documentationPath, (err, files) => {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach((file, index) => {

        //Get current component name
        const currentFileName = file.slice(0, file.indexOf('.'));
        const currentFileExtension = file.slice(file.lastIndexOf('.'), file.length);

        if (currentFileName.indexOf("-tutorial") !== -1 || !currentFileExtension.includes("md")) {
            return;
        }

        //Copy documentation
        fs.copyFileSync(path.join(documentationPath, file), path.join(process.cwd(), `/docs/documentation/${file}`));

        //Get current component name
        const currentDocName = file.slice(0, file.indexOf('.'));

        prependFile(path.join(process.cwd(), '/docs/documentation', file),
`---
layout: docs
title: ${currentDocName}
parent: Documentation
permalink: /playground/docs/${currentDocName.toLowerCase().replace(new RegExp(" ", "g"), "-")}/
nav_order: ${index}
---
`,
        err => {
            if (err) {
                // Error
                console.log(`Error: Can't prepend to ${file}`);
            }
        })
    });
});