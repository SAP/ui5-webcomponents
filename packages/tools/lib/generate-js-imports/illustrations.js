const fs = require("fs").promises;
const path = require('path');

const generate = async () => {
	const fioriInputFolder = path.normalize(process.argv[2]);
	const tntInputFolder = path.normalize(process.argv[3]);
	const outputFile = path.normalize(`${process.argv[4]}/Illustrations.js`);

	const dir = await fs.readdir(fioriInputFolder);
	const fioriIllustrationsOnFileSystem = dir.map(illustrationName => {
		const fioriMatches = illustrationName.match(/.*\.js$/);
		return fioriMatches ? illustrationName : undefined;
	}).filter(key => !!key);

	const tntDir = await fs.readdir(tntInputFolder);
	const tntIllustrationsOnFileSystem = tntDir.map(illustrationName => {
		const tntMatches = illustrationName.match(/.*\.js$/);
		return tntMatches ? illustrationName : undefined;
	}).filter(key => !!key);

	// dynamic imports for Fiori illustrations
	const fioriAvailableIllustrationsArray = `[${fioriIllustrationsOnFileSystem.filter(
		// skipping the items starting with sapIllus-Dialog, sapIllus-Scene, sapIllus-Spot since they are included in the illustration's js file
		line => !line.startsWith("sapIllus-Dialog") && !line.startsWith("sapIllus-Scene") && !line.startsWith("sapIllus-Spot") && !line.startsWith("AllIllustrations")).map(illustrationName => `"${illustrationName.replace('.js', '')}"`).join(", ")}]`;

	const fioriDynamicImportLines = fioriIllustrationsOnFileSystem.map(illustrationName =>
		`\t\tcase "${illustrationName.replace('.js', '')}": return (await import("../../illustrations/${illustrationName}")).default;`).filter(
			// skipping the items starting with sapIllus-Dialog, sapIllus-Scene, sapIllus-Spot since they are included in the illustration's js file
			line => !line.startsWith("\t\tcase \"sapIllus-Dialog") && !line.startsWith("\t\tcase \"sapIllus-Scene") && !line.startsWith("\t\tcase \"sapIllus-Spot") && !line.startsWith("\t\tcase \"AllIllustrations")).join("\n");

	// dynamic imports for Tnt illustrations
	const tntAvailableIllustrationsArray = `[${tntIllustrationsOnFileSystem.filter(
		// skipping the items starting with tnt-Dialog, tnt-Scene, tnt-Spot since they are included in the illustration's js file
		line => !line.startsWith("tnt-Dialog") && !line.startsWith("tnt-Scene") && !line.startsWith("tnt-Spot")).map(illustrationName => `"Tnt${illustrationName.replace('.js', '')}"`).join(", ")}]`;

	const tntDynamicImportLines = tntIllustrationsOnFileSystem.map(illustrationName =>
		`\t\tcase "Tnt${illustrationName.replace('.js', '')}": return (await import("../../illustrations/tnt/${illustrationName}")).default;`).filter(
			// skipping the items starting with tnt-Dialog, tnt-Scene, tnt-Spot since they are included in the illustration's js file
			line => !line.startsWith("\t\tcase \"Tnttnt-Dialog") && !line.startsWith("\t\tcase \"Tnttnt-Scene") && !line.startsWith("\t\tcase \"Tnttnt-Spot")).join("\n");


	// dynamic imports file content
	const contentDynamic = `import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

const loadIllustration = async (illustrationName) => {
	switch (illustrationName) {
${fioriDynamicImportLines}
${tntDynamicImportLines}
		default: throw new Error("[Illustrations] Illustration not found: " + illustrationName);
	}
};
	const loadAndCheck = async (illustrationName) => {
		const data = await loadIllustration(illustrationName);
		return data;
	}


	${fioriAvailableIllustrationsArray}.forEach(illustrationName => registerIllustrationLoader(illustrationName, loadAndCheck));
	${tntAvailableIllustrationsArray}.forEach(illustrationName => registerIllustrationLoader(illustrationName, loadAndCheck));`;
	

	await fs.mkdir(path.dirname(outputFile), { recursive: true });
	return Promise.all([fs.writeFile(outputFile, contentDynamic)]);
};

generate().then(() => {
	console.log("Generated Illustrations.js");
})
.catch(err => {
	console.error(err);
	process.exit(1);
});
