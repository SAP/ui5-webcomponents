import fs from "fs"
import path from "path"
import { parseComponentDeclaration } from "./component-file.mjs"
import { removeFileExtension } from "./utils.mjs";
import { findDeclaration, realPackagesName } from "./manifest.mjs";

const packages = ["main", "fiori", "compat"];

const generateComponents = (source = "./docs/_components_pages", level = 1) => {
    const sourcePath = path.resolve(source);
    const targetPath = source.replace("_components_pages", "components");

    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
    }

    const folderFiles = fs.readdirSync(sourcePath);

    for (let file of folderFiles) {
        const isDirectory = fs.lstatSync(path.join(sourcePath, file)).isDirectory();
        const fileName = removeFileExtension(file);

        if (isDirectory) {
            if (!packages.includes(file)) {
                fs.mkdirSync(path.join(targetPath, file), { recursive: true });
                fs.writeFileSync(path.join(targetPath, file, "_category_.json"), `{
    "label": "${fileName}",
    "link": null
}`)
            }

            generateComponents(path.join(sourcePath, file), level + 1);
        } else {
            let packageName;

            if (sourcePath.includes("main")) {
                packageName = "main"
            } else if (sourcePath.includes("fiori")) {
                packageName = "fiori";
            } else if (sourcePath.includes("compat")) {
                packageName = "compat";
            }

            if (packageName) {
                const fileContent = fs.readFileSync(path.join(sourcePath, file), { encoding: "utf-8" });
                const declaration = findDeclaration({ package: realPackagesName(packageName), name: fileName })

                fs.writeFileSync(path.join(targetPath, `${fileName}.mdx`), parseComponentDeclaration(declaration, fileContent))
            }
        }
    }
}

export {
    generateComponents
}