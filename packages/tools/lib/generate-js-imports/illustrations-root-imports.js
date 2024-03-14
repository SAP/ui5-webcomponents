const fs = require("fs/promises");
const path = require("path");

if (process.argv.length < 3) {
	throw new Error("Not enough arguments");
}

const data = {}; // stores in which collections an illustration exists

const generateJsModule = (filePath, collections) => {
return `import { isLegacyThemeFamily, getTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
${collections.map((collection) => `import pathData${collection.replace("-", "")} from "@ui5/webcomponents-fiori/${filePath.replace("illustrations", `illustrations-${collection}` )}"`).join("\n")}

[${collections.map((collection) => `pathData${collection.replace("-", "")}`).join(", ")}].forEach((pathData) => {
    registerIllustration(pathData.name, {
        dialogSvg: pathData.dialogSvg,
        sceneSvg: pathData.sceneSvg,
        spotSvg: pathData.spotSvg,
        dotSvg: pathData.dotSvg,
        title: pathData.title,
        subtitle: pathData.subtitle,
        set: pathData.set,
        collection: pathData.collection,
    });
});

const {
    exportName,
    dialogSvg,
    sceneSvg,
    spotSvg,
    dotSvg,
} = pathData${collections[0].replace("-", "")};

export default exportName;

export {
    dialogSvg,
    sceneSvg,
    spotSvg,
    dotSvg,
};`
};

const generateTypeDefinition = (illustrationSet, illustrationName) => {
    return `declare const dialogSvg: string;
declare const sceneSvg: string;
declare const spotSvg: string;
declare const dotSvg: string;
declare const _default: "${illustrationSet === "fiori" ? "" : `${illustrationSet}/`}${illustrationName}";

export default _default;
export { dialogSvg, sceneSvg, spotSvg, dotSvg };`
};

const createJsModule = (filePath, collections) => {
    const fileContent = generateJsModule(filePath, collections);
    return fs.writeFile(filePath, fileContent);
};

const createTypeDefinition = (filePath, set) => {
    const defTypeFilePath = filePath.replace(".js", '.d.ts');
    const illustrationName = path.basename(filePath).replace(".js", "");
    const fileContent = generateTypeDefinition(set, illustrationName);
    return fs.writeFile(defTypeFilePath, fileContent);
};

const createFiles = async (data) => {
    for (const filePath in data) {
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await Promise.all([
            createJsModule(filePath, data[filePath].collections),
            createTypeDefinition(filePath, data[filePath].set)
        ]);
    }
};

const collectData = async (folder, outputFolder, set, collection, patterns) => {
    const dir = await fs.readdir(folder);
    for (const fileName of dir) {
        const filePath = path.join(folder, fileName);
        const stats = await fs.lstat(filePath);
        if (!stats.isDirectory() && (!Array.isArray(patterns) || patterns.some(pattern => pattern.test(fileName)))) {
            const outputFilePath = path.join(outputFolder, fileName);
            if (!data[outputFilePath]) {
                data[outputFilePath] = { 
                    collections: [],
                    set: set
                };
            }
            data[outputFilePath].collections.push(collection);
        }
    }
};

const generate = async (configs) => {
    for (const config of configs) {
        try {
            // ensure the output folder is empty
            await fs.rmdir(config.output, { recursive: true });
        } catch (error) {
            // ignore if the folder does not exist
        }
        const jsFilesRegex = /^[^-.]+\.js$/; // no dash in the file name, so js svg content files are not included
        await collectData(config.input, config.output, config.set, config.collection, [jsFilesRegex]);
        await createFiles(data);
    }
    console.log(data)
};


const config = JSON.parse(process.argv[2]);

generate(config).catch((error) => {
    console.error("Error generating illustrations:", error);
});
