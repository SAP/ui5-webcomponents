import fs from "fs/promises";

const generate = async () => {
	const version = JSON.parse(await fs.readFile("package.json")).version;

	// Parse version
	const matches = version.match(/^([0-9]+)\.([0-9]+)\.([0-9]+)(.*)$/);
	if (!matches) {
		throw new Error("Unsupported version format");
	}

	const isNext = version.match(/[a-f0-9]{9}$/);
	const buildTime = Math.floor(new Date().getTime() / 1000);

	const fileContent = `const VersionInfo = {
	version: "${version}",
	major: ${matches[1]},
	minor: ${matches[2]},
	patch: ${matches[3]},
	suffix: "${matches[4]}",
	isNext: ${isNext ? "true" : "false"},
	buildTime: ${buildTime},
};
export default VersionInfo;`;

	await fs.mkdir("dist/generated/", { recursive: true });
	await fs.writeFile("dist/generated/VersionInfo.js", fileContent);
}

generate().then(() => {
	console.log("Version info file generated.");
});
