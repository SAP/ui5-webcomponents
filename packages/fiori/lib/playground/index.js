const fs = require("fs");
const path = require("path");
const glob = require("glob");
const mkdirp = require("mkdirp");

glob("dist/test-resources/**/api/*.sample.html", {}, function (er, files) {
    let output = "dist/resources/playground.json";
    mkdirp.sync(path.dirname(output));
    fs.writeFileSync(output, JSON.stringify(files.map(function(file) {
        return path.basename(file);
    })));
});
