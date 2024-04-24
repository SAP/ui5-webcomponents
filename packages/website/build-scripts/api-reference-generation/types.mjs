import fs from "fs/promises"
import path from "path"
import { parseDeclaration } from "./component-file.mjs"
import { findAllImplementations, getInterfaces, getEnums, realPackagesName } from "./manifest.mjs"

const packages = ["main", "fiori", "compat"];

const generateTypes = () => {
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

        const intefaces = getInterfaces(realPackagesName(packageName));
        const enums = getEnums(realPackagesName(packageName));


        intefaces.forEach(async (declaration) => {
            declaration._implementations = findAllImplementations(declaration);

            await fs.writeFile(path.join(`./docs/components/${packageName}/interfaces`, `${declaration.name}.mdx`), parseDeclaration(declaration, packageName))
            await fs.writeFile(path.join(`./docs/components/${packageName}/interfaces`, `_${declaration.name}Declaration.json`), JSON.stringify(declaration))
        })

        enums.forEach(async (declaration) => {
            await fs.writeFile(path.join(`./docs/components/${packageName}/enums`, `${declaration.name}.mdx`), parseDeclaration(declaration, packageName))
            await fs.writeFile(path.join(`./docs/components/${packageName}/enums`, `_${declaration.name}Declaration.json`), JSON.stringify(declaration))
        })
    })
}

export {
    generateTypes,
}