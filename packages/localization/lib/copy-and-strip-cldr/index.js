import fs from "fs/promises";
import path from "path";

const copyAndStripCLDR = async () => {
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
	// remove all fields related to listPattern
	for (const field in object) {
		if (field.includes("listPattern")) {
			delete object[field];
		}
	}

	// remove all deny-listed fields
	[
		"languages",
		"territories",
		"scripts",
		"timezoneNames",
		"timezoneNamesFormats",
		"scientificFormat",
		"miscPattern",
	].forEach(field => {
		delete object[field];
	});


	["ca-gregorian", "ca-islamic", "ca-japanese", "ca-buddhist", "ca-persian"].forEach(calendar => {
		// remove all deny-listed fields from the calendar objects
		[
			"quarters",
			"flexibleDayPeriods"
		].forEach(field => {
			delete object[calendar][field];
		});
	})

	return object;
}

copyAndStripCLDR().then(() => {
	console.log("CLDR files copied and reduced in size.");
});
