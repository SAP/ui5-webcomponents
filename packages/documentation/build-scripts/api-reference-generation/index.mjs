import fs from "fs/promises"
import path from "path"
import parseDeclaration from "./component-file.mjs"

const packages = ["main", "fiori"];
// Main

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

    const manifest = JSON.parse(await fs.readFile(path.resolve(`./build-scripts/api-reference-generation/custom-elements-internal-${packageName}.json`), { encoding: "utf-8" }));

    manifest.modules.forEach(_module => {
        _module.declarations.forEach(async (declaration) => {
            if (declaration.customElement && declaration.tagName) {
                await fs.writeFile(path.join(`./docs/components/${packageName}/`, `${declaration.name}.mdx`), parseDeclaration(declaration))
            } else if (declaration.kind === "enum") {
                await fs.writeFile(path.join(`./docs/components/${packageName}/enums`, `${declaration.name}.mdx`), parseDeclaration(declaration))
            } else if (declaration.kind === "interface") {
                await fs.writeFile(path.join(`./docs/components/${packageName}/interfaces`, `${declaration.name}.mdx`), parseDeclaration(declaration))
            }
        });
    });
})