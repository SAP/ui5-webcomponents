const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

const fileList = process.argv[2];
const dest = process.argv[3];

const filesToCopy = fs.readFileSync(fileList).toString();
// console.log(filesToCopy);

// Support full-line comments starting with # in the used-modules.txt file
const shouldCopy = file => file.length && !file.startsWith("#");

const trimFile = file => file.trim();

filesToCopy.split("\n").map(trimFile).filter(shouldCopy).forEach(moduleName => {
	const srcPath = require.resolve(`@openui5/sap.ui.core/src/${moduleName}`);
	const destPath = path.join(dest, moduleName);

	mkdirp.sync(path.dirname(destPath));
    fs.copyFile(srcPath, destPath, (err) => {
    	if (err) {
    		throw err;
		}
		console.log(`${destPath} created.`);
	});
});
