import fs from "fs";
import path from "path";

function copyFileSync(source, target) {
    var targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyIntroFile(source, target) {
    var targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
    }

    let content = `---
sidebar_position: 0
---

${fs.readFileSync(source, { encoding: "utf-8" })}`

    fs.writeFileSync(targetFile, content);
}

function copyFolderRecursiveSync(source, target) {
    var files = [];
    // Check if folder needs to be created or integrated
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    }

    // Copy
    if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(function (file) {
            var curSource = path.join(source, file);

            if (curSource === path.join(path.resolve(), "../../docs/README.md")) {
                copyIntroFile(curSource, target);
            } else if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, path.join(target, file));
            } else {
                copyFileSync(curSource, target);
            }
        });
    }
}


copyFolderRecursiveSync(path.join(path.resolve(), "../../docs"), path.join(path.resolve(), "./docs/docs"))