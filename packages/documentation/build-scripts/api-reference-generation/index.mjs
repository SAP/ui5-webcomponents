import fs from "fs/promises"
import path from "path"
import { parseDeclaration, parseComponentDeclaration } from "./component-file.mjs"

const packages = ["main", "fiori"];
const manifests = {};

Promise.all(packages.map(async packageName => {
    manifests[packageName] = JSON.parse(await fs.readFile(path.resolve(`./../${packageName}/dist/custom-elements-internal.json`), { encoding: "utf-8" }))
}));

packages.forEach(async (packageName, index) => {
    await fs.mkdir(`./docs/components/${packageName}/enums`, { recursive: true })
    await fs.mkdir(`./docs/components/${packageName}/interfaces`, { recursive: true })

    await fs.writeFile(path.join(`./docs/components/${packageName}/_category_.json`), `{
        "label": ${packageName[0].toUpperCase() + packageName.slice(1)},
        "position": ${index},
        "link": {
            "type": "generated-index"
        }
    }`)

    await fs.writeFile(path.join(`./docs/components/${packageName}/enums/_category_.json`), `{
        "label": "Enums",
        "position": 1,
        "link": {
            "type": "generated-index"
        }
    }`)

    await fs.writeFile(path.join(`./docs/components/${packageName}/interfaces/_category_.json`), `{
        "label": "Interfaces",
        "position": 2,
        "link": {
            "type": "generated-index"
        }
    }`)

    manifests[packageName].modules.forEach(_module => {
        _module.declarations.forEach(async (declaration) => {
            if (declaration.customElement && declaration.tagName) {
                const fileContent = await fs.readFile(path.join(`./docs/_components_pages/${packageName}/`, `${declaration.name}.mdx`), { encoding: "utf-8" })

                await fs.writeFile(path.join(`./docs/components/${packageName}/`, `${declaration.name}.mdx`), parseComponentDeclaration(declaration, fileContent))
                await fs.writeFile(path.join(`./docs/components/${packageName}/`, `_${declaration.name}Declaration.json`), JSON.stringify(declaration))
            } else if (declaration.kind === "enum") {
                await fs.writeFile(path.join(`./docs/components/${packageName}/enums`, `${declaration.name}.mdx`), parseDeclaration(declaration))
                await fs.writeFile(path.join(`./docs/components/${packageName}/enums`, `_${declaration.name}Declaration.json`), JSON.stringify(declaration))
            } else if (declaration.kind === "interface") {
                await fs.writeFile(path.join(`./docs/components/${packageName}/interfaces`, `${declaration.name}.mdx`), parseDeclaration(declaration))
                await fs.writeFile(path.join(`./docs/components/${packageName}/interfaces`, `_${declaration.name}Declaration.json`), JSON.stringify(declaration))
            }
        });
    });
})