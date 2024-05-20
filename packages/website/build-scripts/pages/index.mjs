import fs from "fs";
import path from "path";

const packages = [
    "main",
    "fiori",
    "compat",
]

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

function copyFolderRecursiveSync(source, target) {
    var files = [];
    // Check if folder needs to be created or integrated
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
    }

    // Copy
    if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(function (file) {
            var curSource = path.join(source, file);

            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, path.join(target, file));
            } else {
                copyFileSync(curSource, target);
            }
        });
    }
}

packages.forEach(packageName => {
    // html files
    copyFolderRecursiveSync(path.join(path.resolve(), `../${packageName}/dist/test/pages/`), path.join(path.resolve(), `./static/packages/${packageName}/`))
    // assets
    copyFolderRecursiveSync(path.join(path.resolve(), `../${packageName}/dist/assets/`), path.join(path.resolve(), `./static/assets`))
})

