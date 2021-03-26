const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

const fileList = process.argv[2];
const dest = process.argv[3];
const src = "../../node_modules/@openui5/sap.ui.core/src/";

const filesToCopy = fs.readFileSync(fileList).toString();
// console.log(filesToCopy);

// Support full-line comments starting with # in the used-modules.txt file
const shouldCopy = file => file.length && !file.startsWith("#");

const trimFile = file => file.trim();

filesToCopy.split("\n").map(trimFile).filter(shouldCopy).forEach(async moduleName => {
	const srcPath = path.join(src, moduleName);
	const destPath = path.join(dest, moduleName);

	await mkdirp(path.dirname(destPath));
    fs.copyFile(srcPath, destPath, (err) => {
    	if (err) {
    		throw err;
		}
		console.log(`${destPath} created.`);
	});
});
