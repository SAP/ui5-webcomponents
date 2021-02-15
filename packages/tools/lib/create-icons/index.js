const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

const collectionName = process.argv[2] || "SAP-icons";
const srcFile = path.normalize(`src/${collectionName}.json`);
const destDir = path.normalize("dist/");

mkdirp.sync(destDir);

const template = (name, pathData, ltr, collection, packageName) => `import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "${name}";
const pathData = "${pathData}";
const ltr = ${ltr};
const collection = "${collection}";
const packageName = "${packageName}";

registerIcon(name, { pathData, ltr, collection, packageName });

export default { pathData };`;


const accTemplate = (name, pathData, ltr, accData, collection, packageName) => `import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ${accData.key} } from "./generated/i18n/i18n-defaults.js";

const name = "${name}";
const pathData = "${pathData}";
const ltr = ${ltr};
const accData = ${accData.key};
const collection = "${collection}";
const packageName = "${packageName}";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default { pathData, accData };`;

const svgTemplate = (pathData) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
	<path d="${pathData}"/>
</svg>`;

const createIcons = (file) => {
	const json = JSON.parse(fs.readFileSync(file));

	for (let name in json.data) {
		const iconData = json.data[name];
		const pathData = iconData.path;
		const ltr = !!iconData.ltr;
		const acc = iconData.acc;

		const content = acc ? accTemplate(name, pathData, ltr, acc, json.collection, json.packageName) : template(name, pathData, ltr, json.collection, json.packageName);

		fs.writeFileSync(path.join(destDir, `${name}.js`), content);
		fs.writeFileSync(path.join(destDir, `${name}.svg`), svgTemplate(pathData));
	}
};

createIcons(srcFile);
