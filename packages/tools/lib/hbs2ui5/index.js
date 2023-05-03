const fs = require('fs').promises;
const existsSync = require('fs').existsSync;
const getopts = require('getopts');
const hbs2lit = require('../hbs2lit');
const path = require('path');
const litRenderer = require('./RenderTemplates/LitRenderer');
const recursiveReadDir = require("recursive-readdir");

let missingTypesReported = false;

const args = getopts(process.argv.slice(2), {
	alias: {
		o: 'output',
		d: 'directory',
		f: 'file',
		t: 'type'
	},
	default: {
		t: 'lit-html'
	}
});

const onError = (place) => {
	console.log(`A problem occoured when reading ${place}. Please recheck passed parameters.`);
};

const isHandlebars = (fileName) => fileName.indexOf('.hbs') !== -1;

const hasTypes = (file, componentName) => {
	const tsFile = path.join(path.dirname(file), componentName + ".ts")
	const dtsFile = path.join(path.dirname(file), componentName + ".d.ts")
	return existsSync(tsFile) || existsSync(dtsFile);
}

const processFile = async (file, outputDir) => {
	const componentNameMatcher = /(\w+)(\.hbs)/gim;
	const componentName = componentNameMatcher.exec(file)[1];
	const componentHasTypes = hasTypes(file, componentName);
	if (!componentHasTypes) { 
		if (!missingTypesReported) {
			console.warn("[Warn] The following templates do not have a corresponging .ts or .d.ts file and won't be type checked:")
			missingTypesReported = true;
		}
		console.log("  -> " + componentName + ".hbs");
	}
	const litCode = await hbs2lit(file, componentName);
	const absoluteOutputDir = composeAbsoluteOutputDir(file, outputDir);

	return writeRenderers(absoluteOutputDir, componentName, litRenderer.generateTemplate(componentName, litCode, componentHasTypes));
};

const composeAbsoluteOutputDir = (file, outputDir) => {
	// (1) Extract the dir structure from the source file path - "src/lvl1/lvl2/MyCompBadge.hbs"
	// - remove the filename - "src/lvl1/lvl2"
	// - remove the leading dir - "lvl1/lvl2"
	const fileDir = file.split(path.sep).slice(1, -1).join(path.sep);

	// (2) Compose full output dir - "dist/generated/templates/lvl1/lvl2"
	return `${outputDir}${path.sep}${fileDir}`;
};

const wrapDirectory = (directory, outputDir) => {
	directory = path.normalize(directory);
	outputDir = path.normalize(outputDir);

	return new Promise((resolve, reject) => {
		recursiveReadDir(directory, (err, files) => {

			if (err) {
				onError('directory');
				reject();
			}

			const promises = files.map(fileName => {
				if (isHandlebars(fileName)) {
					return processFile(fileName, outputDir);
				}
			}).filter(x => !!x);

			resolve(Promise.all(promises));
		});
	});
};

const writeRenderers = async (outputDir, controlName, fileContent) => {
	try {

		await fs.mkdir(outputDir, { recursive: true });

		const compiledFilePath = `${outputDir}${path.sep}${controlName}Template.lit.${process.env.UI5_TS ? "ts" : "js"}`;

		// strip DOS line endings because the break the source maps
		let fileContentUnix = fileContent.replace(/\r\n/g, "\n");
		fileContentUnix = fileContentUnix.replace(/\r/g, "\n");

		// Only write to the file system actual changes - each updated file, no matter if the same or not, triggers an expensive operation for rollup
		// Note: .hbs files that include a changed .hbs file will also be recompiled as their content will be updated too

		let existingFileContent = "";
		try {
			existingFileContent = await fs.readFile(compiledFilePath);
		} catch (e) {}

		if (existingFileContent !== fileContentUnix) {
			return fs.writeFile(compiledFilePath, fileContentUnix);
		}

	} catch (e) {
		console.log(e);
	}
};

if (!args['d'] || !args['o']) {
	console.log('Please provide an input and output directory (-d and -o)');
} else {
	wrapDirectory(args['d'], args['o']).then(() => {
		console.log("Templates generated");
	});
}
