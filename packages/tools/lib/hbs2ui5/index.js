const fs = require('fs').promises;
const getopts = require('getopts');
const hbs2lit = require('../hbs2lit');
const path = require('path');
const litRenderer = require('./RenderTemplates/LitRenderer');
const recursiveReadDir = require("recursive-readdir");

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

const processFile = async (file, outputDir) => {
	const litCode = await hbs2lit(file);
	const absoluteOutputDir = composeAbsoluteOutputDir(file, outputDir);
	const componentNameMatcher = /(\w+)(\.hbs)/gim;
	const componentName = componentNameMatcher.exec(file)[1];

	return writeRenderers(absoluteOutputDir, componentName, litRenderer.generateTemplate(componentName, litCode));
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

		const compiledFilePath = `${outputDir}${path.sep}${controlName}Template.lit.js`;

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
