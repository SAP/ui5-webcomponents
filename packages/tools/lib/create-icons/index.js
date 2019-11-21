const process = require("process");
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

const srcDir = `src/icon-collections/`;
const destDir = `dist/icons/`;

mkdirp(destDir);

const template = (name, pathData) => `import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "${name}";
const pathData = "${pathData}";

registerIcon(name, { pathData });`;

const accTemplate = (name, pathData, accData) => `import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";
import { ${accData.key} } from "../generated/i18n/i18n-defaults.js";

const name = "${name}";
const pathData = "${pathData}";
const accData = ${accData.key};

registerIcon(name, { pathData, accData });`;


const createIcons = (file) => {
	const json = JSON.parse(fs.readFileSync(file));
	for (let name in json.data) {
		let content;
		const pathData = json.data[name];
		const accData = json.accData[name];

		if (accData) {
			content = accTemplate(name, pathData, accData);
		} else {
			content = template(name, pathData);
		}

		fs.writeFileSync(path.join(destDir, `${name}.js`), content);
	}

};

fs.readdirSync(srcDir).forEach(collectionFile => {
	createIcons(path.join(srcDir, collectionFile));
});



