const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const commandLineArgs = require('command-line-args');

const DEFAULT_PORT = 8080;

// Command line options
const options = commandLineArgs([
	{name: 'name', alias: 'n', type: String},
	{name: 'port', alias: 'p', type: Number},
]);

// Derives the name from the package.json name
const getNameFromPackage = () => {
	try {
		return JSON.parse(fs.readFileSync("package.json")).name;
	} catch (err) {
		console.log("No package.json found, please run: 'npm init' first");
		process.exit(1);
	}
};

// All variables that will be replaced in the content of the resources/
const vars = {
	INIT_PACKAGE_VAR_NAME: options.name || getNameFromPackage(),
	INIT_PACKAGE_VAR_PORT: options.port || DEFAULT_PORT,
};

const replaceAllVars = content => {
	for (let key in vars) {
		const re = new RegExp(key, "g");
		content = content.replace(re, vars[key]);
	}
	return content;
};

const copyFile = (sourcePath, destPath) => {
	let content = fs.readFileSync(sourcePath, {encoding: "UTF-8"});
	content = replaceAllVars(content);
	fs.writeFileSync(destPath, content);
};

const copyResources = sourcePath => {
	const destPath = sourcePath.substr(resourcesDir.length);
	const isDir = fs.lstatSync(sourcePath).isDirectory();
	if (isDir) {
		if (destPath) {
			mkdirp.sync(destPath);
		}
		fs.readdirSync(sourcePath).forEach(file => {
			copyResources(path.join(sourcePath, file));
		});
	} else {
		copyFile(sourcePath, destPath);
	}
};

const resourcesDir = path.join(`${__dirname}`, `resources/`);
copyResources(resourcesDir);
