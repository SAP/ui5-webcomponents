const process = require("process");
const path = require("path");
const fs = require("fs/promises");

const inputDir = process.argv[2];
const sourceDir = process.argv[3];

const preprocessTypes = async () => {
	try {
		const { globby } = await import("globby");
		const fileNames = await globby(inputDir + "**/types/*.js");

		return Promise.all(fileNames.map(processTypeFile));
	} catch(e) {
		console.log("JSDoc types preprocess failed: ", e);
	}
};

const processTypeFile = async (fileName) => {
	let fileContent = `${await fs.readFile(fileName)}`;

	const re = new RegExp(`(\\/\\*\\*[^\\/]+\\s+\\*\\/)?\\s+\\s+.*?\\["([\\w\\d]+)"\\].*?"([\\w\\d]+)";`, "gm")
	let matches = [...fileContent.matchAll(re)];

	// Get all type values
	const typeData = matches.map(match => {
		return {
			comment: match[1],
			key: match[2],
			value: match[3],
		};
	});
	if (typeData.length === 0) {
		return;
	}

	const typeName = path.parse(fileName).name;

	matches = fileContent.match(/^\/\*\*[^\/]+\//gm);
	const comment = matches[0];

	const propsCode = typeData.map(item => {
		return `${item.comment}\n get ${item.key}() { return "${item.value}"; }`;
	}).join("\n");

	const newClassCode = `
	${comment}
	class ${typeName} {
		${propsCode}
	};

	export default ${typeName};`;

	fileContent = newClassCode;

	return fs.writeFile(fileName, fileContent);
};

const preprocessComponents = async () => {
	if (!sourceDir) {
		return; // if the second param was not passed, there are no components
	}

	try {
		const { globby } = await import("globby");
		const fileNames = await globby(sourceDir + "/*.ts");

		return Promise.all(fileNames.map(processComponentFile));
	} catch(e) {
		console.log("JSDoc components preprocess failed: ", e);
	}
};

const processComponentFile = async (fileName) => {
	// source file (src/*.ts)
	let fileContent = `${await fs.readFile(fileName)}`;

	// Skip all non-comopnent files
	if (!fileContent.includes("@class")) {
		return;
	}

	const re = new RegExp(`\\/\\*\\*(.|\\n)+?\\s+\\*\\/`, "gm");
	let matches = [...fileContent.matchAll(re)];
	matches = matches.map(match => match[0]); // matches will now contain all JSDoc comments (/** ..... */)

	// destination file (jsdoc-dist/*.js)
	const destFileName = fileName.replace(sourceDir, inputDir).replace(/\.ts$/, ".js");
	let destFileContent = `${await fs.readFile(destFileName)}`;

	const re2 = new RegExp(`let.*? = class`, "gm");
	let matches2 = destFileContent.match(re2);
	const index = destFileContent.indexOf(matches2); // index is the position in the file where the class is defined

	// All comments before the class definition, except for the @class comment, must be removed
	matches.forEach(match => {
		if (!match.includes("@class") && destFileContent.indexOf(match) < index) {
			destFileContent = destFileContent.replace(match, "");
		}
	});

	// Put all other comments at the end of the file
	destFileContent = destFileContent + "\n\n" + matches.join("\n");
	return fs.writeFile(destFileName, destFileContent);
};

Promise.all([
	preprocessTypes(),
	preprocessComponents(),
]).then(() => {
	console.log("JSDoc preprocess ready.");
});

