import fs from "fs/promises"
import path from "path"
import { parseDeclaration } from "./component-file.mjs"

const packages = ["main", "fiori"];
const manifests = {};

await Promise.all(packages.map(async packageName => {
    manifests[packageName] = JSON.parse(await fs.readFile(path.resolve(`./../${packageName}/dist/custom-elements-internal.json`), { encoding: "utf-8" }))
}));


const findAllImplementations = (interfaceName) => {
    let declarationNames = [];

    for (let packageName of packages) {
        for (let _module of manifests[packageName].modules) {
            for (let _declaration of _module.declarations) {
                if (_declaration?._ui5implements?.some(reference => reference.name === interfaceName)) {
                    let fullPackageName = packageName === "main" ? "@ui5/webcomponents" : "@ui5/webcomponents-fiori";
                    declarationNames.push(`${fullPackageName}/${_declaration.name}`)
                }
            }
        }
    }

    return declarationNames;
}

const generateTypes = async () => {
    await Promise.all(packages.map(async packageName => {
        manifests[packageName] = JSON.parse(await fs.readFile(path.resolve(`./../${packageName}/dist/custom-elements-internal.json`), { encoding: "utf-8" }))
    }));

    packages.forEach(async (packageName) => {
        await fs.mkdir(`./docs/components/${packageName}/enums`, { recursive: true })
        await fs.mkdir(`./docs/components/${packageName}/interfaces`, { recursive: true })

        Promise.all(["enums", "interfaces"].map(async typeName => {
            await fs.writeFile(path.join(`./docs/components/${packageName}/${typeName}/README.mdx`), `---
title: ${typeName.charAt(0).toUpperCase() + typeName.slice(1)}
---

import DocCardList from '@theme/DocCardList';

<DocCardList />`)
        }))

        manifests[packageName].modules.forEach(_module => {
            _module.declarations.forEach(async (declaration) => {
                if (declaration.kind === "enum") {
                    await fs.writeFile(path.join(`./docs/components/${packageName}/enums`, `${declaration.name}.mdx`), parseDeclaration(declaration, packageName))
                    await fs.writeFile(path.join(`./docs/components/${packageName}/enums`, `_${declaration.name}Declaration.json`), JSON.stringify(declaration))
                } else if (declaration.kind === "interface") {
                    declaration._implementations = findAllImplementations(declaration.name);

                    await fs.writeFile(path.join(`./docs/components/${packageName}/interfaces`, `${declaration.name}.mdx`), parseDeclaration(declaration, packageName))
                    await fs.writeFile(path.join(`./docs/components/${packageName}/interfaces`, `_${declaration.name}Declaration.json`), JSON.stringify(declaration))
                }
            });
        });
    })
}

export {
    generateTypes,
}