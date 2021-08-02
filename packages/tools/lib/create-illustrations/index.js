const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

if (process.argv.length < 4) {
	return;
}

const fileNamePattern = /sapIllus-.+-(.+).svg/;
const srcPath = process.argv[2];
const destPath = process.argv[3];
// collect each illustration name because each one should have Sample.js file
const fileNames = new Set();

const svgImportTemplate = svgContent => { return `export default \`${svgContent}\`;`};
const illustrationImportTemplate = illustrationName => {
	const illustationNameUpperCase = illustrationName.toUpperCase();

	return `import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-${illustrationName}.js";
import sceneSvg from "./sapIllus-Scene-${illustrationName}.js";
import spotSvg from "./sapIllus-Spot-${illustrationName}.js";
import {
	IM_TITLE_${illustationNameUpperCase},
	IM_SUBTITLE_${illustationNameUpperCase},
} from "../generated/i18n/i18n-defaults.js";

const name = "${illustrationName}";
const title = IM_TITLE_${illustationNameUpperCase};
const subtitle = IM_SUBTITLE_${illustationNameUpperCase};

registerIllustration(name, {
	dialogSvg,
	sceneSvg,
	spotSvg,
	title,
	subtitle,
});

export {
	dialogSvg,
	sceneSvg,
	spotSvg,
};`};

const svgToJs = fileName => {
	const svg = fs.readFileSync(path.join(srcPath, fileName), { encoding: "utf-8" });
	const fileContent = svgImportTemplate(svg);
	fileName = fileName.replace(/\.svg$/, ".js");

	fs.writeFileSync(path.join(destPath, fileName), fileContent);
}

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
