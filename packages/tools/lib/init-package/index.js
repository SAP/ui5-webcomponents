const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const commandLineArgs = require('command-line-args');
const uuidv1 = require('uuid/v1');
const beautify = require("json-beautify");

// content of package.json
let packageContent;

const DEFAULT_PORT = 8080;
const BETA_VER = "0.18.0";
const RC_VER = "1.0.0-rc.5";

// from where all the files will be copied
const RESOURCES_DIR = path.join(`${__dirname}`, `resources/`);

// Command line options
const options = commandLineArgs([
	{name: 'name', alias: 'n', type: String},
	{name: 'port', alias: 'p', type: Number},
	{name: 'uuid', alias: 'u', type: String},
]);

// Ensure there is package.json
try {
	packageContent = JSON.parse(fs.readFileSync("package.json"));
} catch (err) {
	console.log("No package.json found, please run: 'npm init' first");
	process.exit(1);
}

// All variables that will be replaced in the content of the resources/
const vars = {
	INIT_PACKAGE_VAR_NAME: options.name || packageContent.name,
	INIT_PACKAGE_VAR_PORT: options.port || DEFAULT_PORT,
	INIT_PACKAGE_VAR_UUID: options.uuid || uuidv1(),
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
	const destPath = sourcePath.substr(RESOURCES_DIR.length);
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

const updatePackageFile = () => {
	packageContent.scripts = {
		"clean": "wc-dev clean",
		"lint": "wc-dev lint",
		"start": "wc-dev start",
		"build": "wc-dev build",
		"test": "wc-dev test",
		"create-ui5-element": "wc-create-ui5-element",
		"prepublishOnly": "npm run build"
	};

	packageContent.dependencies = packageContent.dependencies || {};
	packageContent.dependencies["@ui5/webcomponents-base"] = BETA_VER;
	packageContent.dependencies["@ui5/webcomponents-theme-base"] = RC_VER;
	packageContent.dependencies["@ui5/webcomponents-tools"] = RC_VER;

	fs.writeFileSync("package.json", beautify(packageContent, null, 2, 100));
};

// Copy files
copyResources(RESOURCES_DIR);

// Update package.json
updatePackageFile();

// require("../create-new-component/index.js");
