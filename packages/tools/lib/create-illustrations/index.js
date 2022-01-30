const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

if (process.argv.length < 7) {
	return;
}

const ORIGINAL_TEXTS = {
	UnableToLoad: "UnableToLoad",
	UnableToUpload: "UnableToUpload",
	NoActivities: "NoActivities",
	BeforeSearch: "BeforeSearch",
	NoSearchResults: "NoSearchResults",
	NoEntries: "NoEntries",
	NoData: "NoData",
	NoNotifications: "NoNotifications",
	BalloonSky: "BalloonSky",
	SuccessScreen: "SuccessScreen",
	NoMail: "NoMail",
	NoSavedItems: "NoSavedItems",
	NoTasks: "NoTasks"
};

const FALLBACK_TEXTS = {
	ReloadScreen: ORIGINAL_TEXTS.UnableToLoad,
	Connection: ORIGINAL_TEXTS.UnableToLoad,
	ErrorScreen: ORIGINAL_TEXTS.UnableToUpload,
	EmptyCalendar: ORIGINAL_TEXTS.NoActivities,
	SearchEarth: ORIGINAL_TEXTS.BeforeSearch,
	SearchFolder: ORIGINAL_TEXTS.NoSearchResults,
	EmptyList: ORIGINAL_TEXTS.NoEntries,
	Tent: ORIGINAL_TEXTS.NoData,
	SleepingBell: ORIGINAL_TEXTS.NoNotifications,
	SimpleBalloon: ORIGINAL_TEXTS.BalloonSky,
	SimpleBell: ORIGINAL_TEXTS.NoNotifications,
	SimpleCalendar: ORIGINAL_TEXTS.NoActivities,
	SimpleCheckMark: ORIGINAL_TEXTS.SuccessScreen,
	SimpleConnection: ORIGINAL_TEXTS.UnableToLoad,
	SimpleEmptyDoc: ORIGINAL_TEXTS.NoData,
	SimpleEmptyList: ORIGINAL_TEXTS.NoEntries,
	SimpleError: ORIGINAL_TEXTS.UnableToUpload,
	SimpleMagnifier: ORIGINAL_TEXTS.BeforeSearch,
	SimpleMail: ORIGINAL_TEXTS.NoMail,
	SimpleNoSavedItems: ORIGINAL_TEXTS.NoSavedItems,
	SimpleNotFoundMagnifier: ORIGINAL_TEXTS.NoSearchResults,
	SimpleReload: ORIGINAL_TEXTS.UnableToLoad,
	SimpleTask: ORIGINAL_TEXTS.NoTasks,
	SuccessBalloon: ORIGINAL_TEXTS.BalloonSky,
	SuccessCheckMark: ORIGINAL_TEXTS.SuccessScreen,
	SuccessHighFive: ORIGINAL_TEXTS.BalloonSky
};

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
	let illustrationNameForTranslation = illustrationName;

	if (defaultText) {
		if (FALLBACK_TEXTS[illustrationNameForTranslation]) {
			illustrationNameForTranslation = FALLBACK_TEXTS[illustrationNameForTranslation];
		} else if (illustrationName.indexOf("_v") !== -1) {
			illustrationNameForTranslation = illustrationNameForTranslation.substr(0, illustrationNameForTranslation.indexOf('_v'));
		}
	}

	const illustrationNameUpperCase = illustrationNameForTranslation.toUpperCase();
	
	return defaultText ? `import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./${illustrationsPrefix}-Dialog-${illustrationName}.js";
import sceneSvg from "./${illustrationsPrefix}-Scene-${illustrationName}.js";
import spotSvg from "./${illustrationsPrefix}-Spot-${illustrationName}.js";
import {
	IM_TITLE_${illustrationNameUpperCase},
	IM_SUBTITLE_${illustrationNameUpperCase},
} from "../generated/i18n/i18n-defaults.js";

const name = "${illustrationName}";
const set = "${illustrationSet}";
const title = IM_TITLE_${illustrationNameUpperCase};
const subtitle = IM_SUBTITLE_${illustrationNameUpperCase};

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
