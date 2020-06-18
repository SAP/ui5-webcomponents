const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

const srcDir = `src/icon-collections/`;
const destDir = `dist/icons/`;

mkdirp.sync(destDir);

const template = (name, pathData, ltr) => `import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "${name}";
const pathData = "${pathData}";
const ltr = "${ltr}";

registerIcon(name, { pathData, ltr});

export default { pathData };`;

const accTemplate = (name, pathData, ltr, accData) => `import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";
import { ${accData.key} } from "../generated/i18n/i18n-defaults.js";

const name = "${name}";
const pathData = "${pathData}";
const ltr = "${ltr}";
const accData = ${accData.key};

registerIcon(name, { pathData, ltr, accData });

export default { pathData, accData };`;


const createIcons = (file) => {
	const json = JSON.parse(fs.readFileSync(file));
	for (let name in json.data) {
		let content;
		const pathData = json.data[name].path;
		const ltr = !!json.data[name].ltr;
		const accData = json.accData[name];

		if (accData) {
			content = accTemplate(name, pathData, ltr, accData);
		} else {
			content = template(name, pathData, ltr);
		}

		fs.writeFileSync(path.join(destDir, `${name}.js`), content);
	}

};

fs.readdirSync(srcDir).forEach(collectionFile => {
	createIcons(path.join(srcDir, collectionFile));
});



