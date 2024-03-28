const child_process = require("child_process");
const { readFileSync } = require("fs");
const path = require("path");
const fs = require("fs");

// search for dev-server port
// start in current folder
// traversing upwards in case of mono repo tests and dev-server running in root folder of repository
let devServerFolder = process.cwd();
let devServerPort;
while (true) {
    try {
        devServerPort = readFileSync(path.join(devServerFolder, ".dev-server-port")).toString();
        break; // found
    } catch (e) {
        // file not found
        if (devServerFolder === path.dirname(devServerFolder)) {
            break; // reached root folder "/"
        }
        devServerFolder = path.dirname(devServerFolder);
    }
}

// check if we are in a monorepo and extract path from package.json
let packageRepositoryPath = "";
const pkg = require(path.join(process.cwd(), "package.json"));
packageRepositoryPath = pkg.repository ? pkg.repository.directory : "";

// construct base url
// use devServerPort if a dev server is running, otherwise let the baseUrl in the wdio config be used
// if a dev server is running in the root of a mono repo, append tha package path like this
// http://localhost:${devServerPort}/packages/main/
let baseUrl = "";
if (devServerPort) {
    baseUrl = `http://localhost:${devServerPort}/${packageRepositoryPath}/`;
}

let wdioConfig = "";

if (fs.existsSync("config/cypress.config.js")) {
    wdioConfig = "config/cypress.config.js";
}

// run wdio with calculated parameters
// const cmd = `yarn cypress run --component --browser chrome --config-file ${wdioConfig} `;
const cmd = `yarn cypress open --component --browser chrome --config-file ${wdioConfig} `;
console.log(`executing: ${cmd}`);
child_process.execSync(cmd, {stdio: 'inherit'});
