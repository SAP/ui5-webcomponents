const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { hashElement } = require("folder-hash");
const config = require("./config.js");

const inputDir = path.normalize(process.argv[2]);
const hashFileName = path.normalize(process.argv[3]);

const isUpToDate = async (inputDir, hashFileName) => {
	try {
		await fs.readdir(inputDir);
	} catch (e) {
		return false; // No dist/ directory
	}

	let existingHash = "";
	try {
		existingHash = `${await fs.readFile(hashFileName)}`;
	} catch (e) {}

	if (!existingHash) {
		return false; // Empty hash file or hash file does not exist
	}

	// Calculate the hash of the dist/ directory
	const result = await hashElement(inputDir, config);
	const newHash = result.hash;

	return newHash === existingHash;
};

isUpToDate(inputDir, hashFileName).then(upToDate => {
	process.exit(upToDate ? 0 : 1); // 0 means success (it is up to date), 1 means failure (must rebuild the dist/)
});
