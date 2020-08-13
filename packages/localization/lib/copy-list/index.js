// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

const fileList = process.argv[2];
const dest = process.argv[3];

const filesToCopy = fs.readFileSync(fileList).toString();
// console.log(filesToCopy);

// Support full-line comments starting with # in the used-modules.txt file
const shouldCopy = file => file.length && !file.startsWith("#");

const trimFile = file => file.trim();

const copyArgs = filesToCopy.split("\n").map(trimFile).filter(shouldCopy).map(moduleName => {
    return "../../node_modules/@openui5/sap.ui.core/src/" + moduleName + " " + path.dirname(path.join(dest, moduleName));
});

copyArgs.forEach(args => {
    console.log(args);
    child_process.execSync(`npx copy-and-watch ${args}`)
});
