const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { hashElement } = require("folder-hash");
const config = require("./config.js");

const inputDir = path.normalize(process.argv[2]);
const outputFileName = path.normalize(process.argv[3]);

const generateHash = async (inputDir, outputFileName) => {
	const result = await hashElement(inputDir, config);
	const hash = result.hash;
	await fs.writeFile(outputFileName, hash);
	return hash;
};

generateHash(inputDir, outputFileName).then(hash => {
	console.log(`Generated hash: ${hash}`);
});
