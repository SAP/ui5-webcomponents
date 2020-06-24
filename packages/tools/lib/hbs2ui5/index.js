const fs = require('fs');
const getopts = require('getopts');
const hbs2lit = require('../hbs2lit');
const path = require('path');
const litRenderer = require('./RenderTemplates/LitRenderer');

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

const processFile = (file, outputDir) => {

	const litCode = hbs2lit(file);

	const componentNameMatcher = /(\w+)(\.hbs)/gim;
	const componentName = componentNameMatcher.exec(file)[1];
	writeRenderers(outputDir, componentName, litRenderer.generateTemplate(componentName, litCode));
};

const wrapDirectory = (directory, outputDir) => {
	directory = path.normalize(directory);
	outputDir = path.normalize(outputDir);

	fs.readdir(directory, (err, files) => {

		if (err) {
			onError('directory');
		}

		files.forEach(fileName => {
			if (isHandlebars(fileName)) {
				processFile(path.join(directory, fileName), outputDir);
			}
		});
	})
};

const writeRenderers = (outputDir, controlName, fileContent) => {
	try {
		const compiledFilePath = `${outputDir}${path.sep}${controlName}Template.lit.js`;

		// strip DOS line endings because the break the source maps
		let fileContentUnix = fileContent.replace(/\r\n/g, "\n");
		fileContentUnix = fileContentUnix.replace(/\r/g, "\n");
		fs.writeFileSync(compiledFilePath, fileContentUnix);

	} catch (e) {
		console.log(e);
	}
};

if (!args['d'] || !args['o']) {
	console.log('Please provide an input and output directory (-d and -o)');
} else {
	wrapDirectory(args['d'], args['o']);
}
