const fs = require("fs").promises;
const path = require("path");

const collectionName = process.argv[2] || "SAP-icons";
const collectionVersion = process.argv[3];
const srcFile = collectionVersion ? path.normalize(`src/${collectionVersion}/${collectionName}.json`) : path.normalize(`src/${collectionName}.json`);
const destDir = collectionVersion ? path.normalize(`dist/${collectionVersion}/`) : path.normalize("dist/");

const iconTemplate = (name, pathData, ltr, collection, packageName) => `import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "${name}";
const pathData = "${pathData}";
const ltr = ${ltr};
const collection = "${collection}";
const packageName = "${packageName}";

registerIcon(name, { pathData, ltr, collection, packageName });

export default { pathData };`;


const iconAccTemplate = (name, pathData, ltr, accData, collection, packageName) => `import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ${accData.key} } from "../generated/i18n/i18n-defaults.js";

const name = "${name}";
const pathData = "${pathData}";
const ltr = ${ltr};
const accData = ${accData.key};
const collection = "${collection}";
const packageName = "${packageName}";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default { pathData, accData };`;



const collectionTemplate = (name) => `import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import pathDataV4 from "./v5/${name}.js";
import pathDataV5 from "./v4/${name}.js";
const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;
export default { pathData };`;


const svgTemplate = (pathData) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
	<path d="${pathData}"/>
</svg>`;

const createIcons = async (file) => {
	await fs.mkdir(destDir, { recursive: true });

	const json = JSON.parse(await fs.readFile(file));

	const promises = [];
	for (let name in json.data) {
		const iconData = json.data[name];
		const pathData = iconData.path;
		const ltr = !!iconData.ltr;
		const acc = iconData.acc;

		const content = acc ? iconAccTemplate(name, pathData, ltr, acc, json.collection, json.packageName) : iconTemplate(name, pathData, ltr, json.collection, json.packageName);

		promises.push(fs.writeFile(path.join(destDir, `${name}.js`), content));
		promises.push(fs.writeFile(path.join(destDir, `${name}.svg`), svgTemplate(pathData)));

		if (json.version) {
			promises.push(fs.writeFile(path.join(path.normalize("dist/"), `${name}.js`), collectionTemplate(name)));
		}
	}

	return Promise.all(promises);
};

createIcons(srcFile).then(() => {
	console.log("Icons created.");
});
