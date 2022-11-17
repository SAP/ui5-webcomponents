const process = require("process");
const path = require("path");
const fs = require("fs/promises");

const inputDir = process.argv[2];

const preprocess = async () => {
	const { globby } = await import("globby");
	const fileNames = await globby(inputDir + "**/types/*.js");

	return Promise.all(fileNames.map(processFile));
};

const processFile = async (fileName) => {
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

preprocess().then(() => {
	console.log("JSDoc preprocess ready.");
});
