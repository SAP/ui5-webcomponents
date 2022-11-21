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
	const matches = [...fileContent.matchAll(re)];

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




	// Find the position to insert the new code
	const CLASS_START_DETECT_STRING = "extends DataType {";
	let index = fileContent.indexOf(CLASS_START_DETECT_STRING);

	if (index !== -1) { // Metadata enum (extends DataType)
		const gettersCode = typeData.map(item => {
			return `${item.comment}\n get ${item.key}() { return "${item.value}" }`;
		}).join("\n");

		index = index + CLASS_START_DETECT_STRING.length;
		fileContent = [fileContent.slice(0, index), "\n", gettersCode, "\n", fileContent.slice(index)].join("");
	} else { // Normal enum
		const typeName = path.parse(fileName).name;

		const matches = fileContent.match(/^\/\*\*[^\/]+\//gm);
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
	}

	return fs.writeFile(fileName, fileContent);
};

preprocess().then(() => {
	console.log("JSDoc preprocess ready.");
});
