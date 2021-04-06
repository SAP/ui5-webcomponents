const mkdirp = require("mkdirp");
const fs = require("fs");

mkdirp.sync("dist/webcomponentsjs/");
fs.writeFileSync("dist/webcomponentsjs/webcomponents-loader.js", "");
