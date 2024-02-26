import fs from "fs/promises"
import path from "path"
import { parseDeclaration, parseComponentDeclaration } from "./component-file.mjs"

const packages = ["main", "fiori"];
const manifests = {};

const generateTypes = async () => {
    await Promise.all(packages.map(async packageName => {
        manifests[packageName] = JSON.parse(await fs.readFile(path.resolve(`./../${packageName}/dist/custom-elements-internal.json`), { encoding: "utf-8" }))
    }));

    packages.forEach(async (packageName) => {
        await fs.mkdir(`./docs/components/${packageName}/enums`, { recursive: true })
        await fs.mkdir(`./docs/components/${packageName}/interfaces`, { recursive: true })

        Promise.all(["interfaces", "enums"].map(async typeName => {
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