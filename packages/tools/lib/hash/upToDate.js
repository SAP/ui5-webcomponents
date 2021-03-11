const fs = require("fs");
const path = require("path");
const process = require("process");
const { hashElement } = require('./folder-hash-customized/index.js');
const config = require("./config.js");

const inputDir = path.normalize(process.argv[2]);
const hashFileName = path.normalize(process.argv[3]);

const isUpToDate = async (inputDir, hashFileName) => {
	// No dist/ directory or no hash file
	if (!fs.existsSync(inputDir) || !fs.existsSync(hashFileName)) {
		return false;
	}

	// Empty hash file
	const existingHash = `${fs.readFileSync(hashFileName)}`;
	if (!existingHash) {
		return false;
	}

	// Calculate the hash of the dist/ directory
	const result = await hashElement(inputDir, config);
	const newHash = result.hash;

	return newHash === existingHash;
};

isUpToDate(inputDir, hashFileName).then(upToDate => {
	process.exit(upToDate ? 0 : 1); // 0 means success (it is up to date), 1 means failure (must rebuild the dist/)
});