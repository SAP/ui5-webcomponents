const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

if (process.argv.length < 7) {
	return;
}

const srcPath = process.argv[2];
const defaultText = process.argv[3] === "true";
const illustrationsPrefix = process.argv[4];
const illustrationSet = process.argv[5];
const destPath = process.argv[6];
const fileNamePattern = new RegExp(`${illustrationsPrefix}-.+-(.+).svg`);
// collect each illustration name because each one should have Sample.js file
const fileNames = new Set();

const svgImportTemplate = svgContent => { return `export default \`${svgContent}\`;`};
const svgToJs = fileName => {
	const svg = fs.readFileSync(path.join(srcPath, fileName), { encoding: "utf-8" });
	const fileContent = svgImportTemplate(svg);
	fileName = fileName.replace(/\.svg$/, ".js");

	fs.writeFileSync(path.join(destPath, fileName), fileContent);
};
const illustrationImportTemplate = illustrationName => {
	const illustationNameUpperCase = illustrationName.toUpperCase();

	return defaultText ? `import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./${illustrationsPrefix}-Dialog-${illustrationName}.js";
import sceneSvg from "./${illustrationsPrefix}-Scene-${illustrationName}.js";
import spotSvg from "./${illustrationsPrefix}-Spot-${illustrationName}.js";
import {
	IM_TITLE_${illustationNameUpperCase},
	IM_SUBTITLE_${illustationNameUpperCase},
} from "../generated/i18n/i18n-defaults.js";

const name = "${illustrationName}";
const set = "${illustrationSet}";
const title = IM_TITLE_${illustationNameUpperCase};
const subtitle = IM_SUBTITLE_${illustationNameUpperCase};

registerIllustration(name, {
	dialogSvg,
	sceneSvg,
	spotSvg,
	title,
	subtitle,
	set,
});

export {
	dialogSvg,
	sceneSvg,
	spotSvg,
};` :
`import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./${illustrationsPrefix}-Dialog-${illustrationName}.js";
import sceneSvg from "./${illustrationsPrefix}-Scene-${illustrationName}.js";
import spotSvg from "./${illustrationsPrefix}-Spot-${illustrationName}.js";

const name = "${illustrationName}";
const set = "${illustrationSet}";

registerIllustration(name, {
	dialogSvg,
	sceneSvg,
	spotSvg,
	set,
});

export {
	dialogSvg,
	sceneSvg,
	spotSvg,
};`
};

mkdirp.sync(destPath);

const illustrationFileNames = fs.readdirSync(path.normalize(srcPath));

// convert SVG to JS imports
illustrationFileNames.forEach(illustration => {
	if (fileNamePattern.test(illustration)) {
		let [fileName, illustrationName] = illustration.match(fileNamePattern);

		svgToJs(fileName);
		fileNames.add(illustrationName);
	}
});

for (let illustrationName of fileNames) {
	fs.writeFileSync(path.join(destPath, `${illustrationName}.js`), illustrationImportTemplate(illustrationName));
}
