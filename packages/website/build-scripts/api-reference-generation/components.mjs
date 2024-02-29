import fs from "fs"
import path from "path"
import { parseComponentDeclaration } from "./component-file.mjs"
import { generateTypes } from "./types.mjs";
import { removeFileExtension } from "./utils.mjs";

await generateTypes();

const packages = ["main", "fiori"];
const manifests = {};

const findDeclaration = (manifest, declarationName) => {
    let declaration;

    for (let _module of manifest.modules) {
        for (let _declaration of _module.declarations) {
            if (_declaration.name === declarationName) {
                declaration = _declaration;
                break;
            }
        }
    }

    return declaration;
}

[...packages, "base"].map(packageName => {
    return manifests[packageName] = JSON.parse(fs.readFileSync(path.resolve(`./../${packageName}/dist/custom-elements-internal.json`), { encoding: "utf-8" }))
});

const parseTypeAsString = (typeObj) => {
    if (!typeObj || !typeObj.references) {
        return typeObj;
    }

    typeObj.references.forEach(reference => {
        let packageName;

        if (reference.package === "@ui5/webcomponents") {
            packageName = "main"
        } else if (reference.package === "@ui5/webcomponents-fiori") {
            packageName = "fiori"
        } else if (reference.package === "@ui5/webcomponents-base") {
            packageName = "base"
        }

        const foundReference = findDeclaration(manifests[packageName], reference.name);

        if (foundReference && foundReference.kind === "enum") {
            const enumFields = foundReference.members
                .filter(member => member.kind === "field" && member.static)
                .map(member => `"${member.name}"`)
                .join(" | ");

            const regexp = new RegExp(`\\b${foundReference.name}\\b`, "g");
            typeObj.text = typeObj.text.replaceAll(regexp, enumFields);
        }
    })
}

const resolveTypes = declaration => {
    declaration.members
        ?.filter(member => member.kind === "field")
        .forEach(field => {
            parseTypeAsString(field.type);
        })

    declaration.members
        ?.filter(member => member.kind === "method")
        .forEach(method => {
            if (method.return) parseTypeAsString(method.type);
            if (method.parameters) method.parameters.forEach(param => parseTypeAsString(param.type))
        })

    declaration.events
        ?.forEach(event => {
            parseTypeAsString(event.type)
            if (event._ui5parameters) event._ui5parameters.forEach(param => parseTypeAsString(param.type))
        })

    declaration.slots
        ?.forEach(slot => {
            parseTypeAsString(slot._ui5type)
        })

}

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
            console.log(`${"-".repeat(level)} ${file} (folder)`)

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
            }

            if (packageName) {
                const fileContent = fs.readFileSync(path.join(sourcePath, file), { encoding: "utf-8" });
                const declaration = findDeclaration(manifests[packageName], fileName)

                if (file === "Badge.mdx") debugger

                resolveTypes(declaration);

                fs.writeFileSync(path.join(targetPath, `${fileName}.mdx`), parseComponentDeclaration(declaration, fileContent))
                console.log(`${"-".repeat(level)} ${file}`)
            }
        }
    }
}

export {
    generateComponents
}