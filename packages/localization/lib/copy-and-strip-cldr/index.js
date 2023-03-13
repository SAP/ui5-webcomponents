const fs = require("fs").promises;
const path = require("path");

const stripCLDR = async () => {
	const inputDir = process.argv[2];
	const outputDir = process.argv[3];

	await fs.mkdir(outputDir, { recursive: true });
	const files = await fs.readdir(inputDir);
	const promises = files.map(async fileName => {
		if (!fileName.endsWith("json")) {
			return; // skip the license .txt file
		}

		const inputFilePath = path.join(inputDir, fileName);
		const fileContent = `${await fs.readFile(inputFilePath, "utf8")}`;
		let fileContentObject = JSON.parse(fileContent);
		fileContentObject = removeFields(fileContentObject);
		const fileContentReduced = JSON.stringify(fileContentObject, null, 2);

		const outputFilePath = path.join(outputDir, fileName);
		return fs.writeFile(outputFilePath, fileContentReduced);
	});
	return Promise.all(promises);
}

const removeFields = object => {
	for (const field in object) {
		if (field.includes("currency")) { // remove all fields related to currency
			delete object[field];
		}
	}

	// remove all deny-listed fields
	["timezoneNames", "decimalFormat-short", "decimalFormat-long", "units"].forEach(field => {
		delete object[field];
	})

	return object;
}

stripCLDR().then(() => {
	console.log("CLDR files copied and reduced in size.");
});
