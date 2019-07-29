const fs = require('fs');
const path = require('path');
const cpx = require('cpx');
var rimraf = require('rimraf');
const prependFile = require('prepend-file');

var documentationPath = path.resolve(process.argv[2]);

// Delete current content of documentation folder
fs.readdirSync('./docs/tutorials', (err, files) => {
    files.forEach(file => {
        if (file !== "tutorials.md") {
            rimraf(path.join('./docs/tutorials', file), error => {
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

        if (currentFileName.indexOf("-tutorial") === -1 || !currentFileExtension.includes("md")) {
            return;
        }

        //Get current component name
        const currentTutorialName = file.slice(0, file.indexOf('-tutorial.md'));

        //Copy documentation
        cpx.copySync(path.join(documentationPath, file), path.join(process.cwd(), '/docs/tutorials'));

        prependFile(path.join(process.cwd(), '/docs/tutorials', file),
`---
layout: default
title: ${currentTutorialName}
parent: Tutorials
permalink: /playground/tutorials/${currentTutorialName}
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