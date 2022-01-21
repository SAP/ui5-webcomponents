const fs = require('fs');
const mkdirp = require('mkdirp');

const version = JSON.parse(fs.readFileSync("package.json")).version;

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

mkdirp.sync("dist/generated/");
fs.writeFileSync("dist/generated/VersionInfo.js", fileContent);
