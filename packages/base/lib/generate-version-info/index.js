const fs = require('fs');

// Read src file
let versionFileContent = `${fs.readFileSync("dist/Version.js")}`;

// Parse version
const version = JSON.parse(fs.readFileSync("package.json")).version;
const matches = version.match(/^([0-9]+)\.([0-9]+)\.([0-9]+)(.*)$/);
if (!matches) {
	throw new Error("Unsupported version format");
}

// 1. version etc...
versionFileContent = versionFileContent.replace("__VERSION__", version);
versionFileContent = versionFileContent.replace("__MAJOR__", matches[1]);
versionFileContent = versionFileContent.replace("__MINOR__", matches[2]);
versionFileContent = versionFileContent.replace("__PATCH__", matches[3]);
versionFileContent = versionFileContent.replace("__SUFFIX__", matches[4]);

// 2. isNext
const isNext = version.match(/[a-f0-9]{9}^/) ? "1" : "";
versionFileContent = versionFileContent.replace("__IS_NEXT__", isNext);

// 3. buildTime
const buildTime = Math.floor(new Date().getTime() / 1000);
versionFileContent = versionFileContent.replace("__BUILD_TIME__", buildTime);

// Write src file
fs.writeFileSync("dist/Version.js", versionFileContent);
