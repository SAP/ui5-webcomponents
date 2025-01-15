const fs = require("fs").promises;
const path = require("path");

if (process.argv.length < 7) {
	throw new Error("Not enough arguments");
}

const generate = async () => {

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
	const collection = process.argv[7];
	const fileNamePattern = new RegExp(`${illustrationsPrefix}-.+-(.+).svg`);
	// collect each illustration name because each one should have Sample.js file
	const fileNames = new Set();

	let dotIllustrationNames = [];

	try {
		await fs.access(srcPath);
	} catch (error) {
		console.log(`The path ${srcPath} does not exist.`);
		return Promise.resolve(null);
	}

	console.log(`Generating illustrations from ${srcPath} to ${destPath}`)

	const svgImportTemplate = svgContent => {
		return `export default \`${svgContent}\`;`
	};
	const svgToJs = async fileName => {
		const svg = await fs.readFile(path.join(srcPath, fileName), { encoding: "utf-8" });
		const fileContent = svgImportTemplate(svg);
		const fileNameSplitArr = fileName.split('-');
		fileName = fileName.replace(/\.svg$/, ".js");

		if (fileNameSplitArr[1] === 'Dot') {
			// we keep the Dot illustration names to import them later. If no Dot is present, Spot will be used
			dotIllustrationNames.push(fileNameSplitArr[2].split('.')[0]);
		}

		return fs.writeFile(path.join(destPath, fileName), fileContent);
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
		// If no Dot is present, Spot will be imported as Dot
		const hasDot = dotIllustrationNames.indexOf(illustrationName) !== -1 ? 'Dot' : 'Spot';

		return `import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./${illustrationsPrefix}-Dialog-${illustrationName}.js";
import sceneSvg from "./${illustrationsPrefix}-Scene-${illustrationName}.js";
import spotSvg from "./${illustrationsPrefix}-Spot-${illustrationName}.js";
import dotSvg from "./${illustrationsPrefix}-${hasDot}-${illustrationName}.js";${
	defaultText ? `import {
	IM_TITLE_${illustrationNameUpperCase},
	IM_SUBTITLE_${illustrationNameUpperCase},
} from "../generated/i18n/i18n-defaults.js";` : ``}

const name = "${illustrationName}";
const set = "${illustrationSet}";
const collection = "${collection}";${defaultText ? `
const title = IM_TITLE_${illustrationNameUpperCase};
const subtitle = IM_SUBTITLE_${illustrationNameUpperCase};` : ``}

registerIllustration(name, {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,${defaultText ? `
	title,
	subtitle,` : ``}
	set,
	collection,
});

export default "${illustrationSet === "fiori" ? "" : `${illustrationSet}/`}${illustrationName}";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};`
	};

	const illustrationTypeDefinition = illustrationName => {
		return `declare const dialogSvg: string;
declare const sceneSvg: string;
declare const spotSvg: string;
declare const dotSvg: string;
declare const _default: "${illustrationSet === "fiori" ? "" : `${illustrationSet}/`}${illustrationName}";

export default _default;
export { dialogSvg, sceneSvg, spotSvg, dotSvg };`
	};

	await fs.mkdir(destPath, { recursive: true });

	const illustrationFileNames = await fs.readdir(path.normalize(srcPath));

	// convert SVG to JS imports
	const promises = [];
	illustrationFileNames.forEach(illustration => {
		if (fileNamePattern.test(illustration)) {
			let [fileName, illustrationName] = illustration.match(fileNamePattern);

			promises.push(svgToJs(fileName));
			fileNames.add(illustrationName);
		}
	});

	return Promise.all(promises).then(() => {
		const nestedPromises = [];
		for (let illustrationName of fileNames) {
			nestedPromises.push(fs.writeFile(path.join(destPath, `${illustrationName}.js`), illustrationImportTemplate(illustrationName)));
			nestedPromises.push(fs.writeFile(path.join(destPath, `${illustrationName}.d.ts`), illustrationTypeDefinition(illustrationName)));
		}

		return Promise.all(nestedPromises);
	});
};

generate().then(() => {
	console.log("Illustrations generated.");
});
