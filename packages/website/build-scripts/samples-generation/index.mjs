import fs from "fs";
import path from "path";

const configFileName = "_config_.json";

function generateSampleFile(configPath, sampleName) {
    const sampleConfig = JSON.parse(fs.readFileSync(path.resolve(path.join(configPath, configFileName)), { encoding: "utf-8" }))

    let content = `---
title: ${sampleConfig.sampleName}
---

${sampleConfig.description}

<Editor files={${JSON.stringify(sampleConfig.files.map(filePath => {
        return {
            filePath,
            fileRawContent: fs.readFileSync(path.resolve(path.join(configPath, filePath)), { encoding: "utf-8" })
        }
    }))}} />`

    fs.writeFileSync(path.join(configPath, `${sampleName}.mdx`), content);
}

function copyFolderRecursiveSync(source, fileName) {
    if (fs.lstatSync(source).isDirectory()) {
        const files = fs.readdirSync(source);

        if (files.includes(configFileName)) {
            generateSampleFile(source, fileName)
            return;
        }

        files.forEach(function (file) {
            var curSource = path.join(source, file);

            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(path.join(source, file), file);
            }
        });
    }
}


copyFolderRecursiveSync(path.join(path.resolve(), "./docs/samples"))