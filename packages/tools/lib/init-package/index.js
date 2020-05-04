const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const commandLineArgs = require('command-line-args');
const beautify = require("json-beautify");

// String utils
const kebabToCamelCase = string => toCamelCase(string.split("-"));
const toCamelCase = parts => {
	return parts.map((string, index) => {
		return index === 0 ? string.toLowerCase() : string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	}).join("");
};
const capitalizeFirst = str => str.substr(0,1).toUpperCase() + str.substr(1);

// content of package.json
let packageContent;

const DEFAULT_PORT = 8080;
const DEFAULT_TAG = 'ui5-demo';
const BETA_VER = "0.20.0";
const RC_VER = "1.0.0-rc.7";

// from where all the files will be copied
const RESOURCES_DIR = path.join(`${__dirname}`, `resources/`);

// Command line options
const options = commandLineArgs([
	{name: 'port', alias: 'p', type: Number},
	{name: 'tag', type: String},
]);

// Ensure there is package.json
try {
	packageContent = JSON.parse(fs.readFileSync("package.json"));
} catch (err) {
	console.log("No package.json found, please run: 'npm init' first");
	process.exit(1);
}

// Ensure correct tag
const tag = options.tag || DEFAULT_TAG;
if (!tag.match(/^ui5-/)) {
	console.log("tag name should start with ui5-");
	process.exit(1);
}
const className = capitalizeFirst(kebabToCamelCase(tag.substr(4)));

// All variables that will be replaced in the content of the resources/
const vars = {
	INIT_PACKAGE_VAR_NAME: packageContent.name,
	INIT_PACKAGE_VAR_PORT: options.port || DEFAULT_PORT,
	INIT_PACKAGE_VAR_TAG: tag,
	INIT_PACKAGE_VAR_CLASS_NAME: className,
};
console.log(vars);

const replaceVarsInFileContent = content => {
	for (let key in vars) {
		const re = new RegExp(key, "g");
		content = content.replace(re, vars[key]);
	}
	return content;
};

const replaceVarsInFileName = fileName => {
	return fileName.replace(/Demo/, vars.INIT_PACKAGE_VAR_CLASS_NAME)	;
};

const copyFile = (sourcePath, destPath) => {
	let content = fs.readFileSync(sourcePath, {encoding: "UTF-8"});
	content = replaceVarsInFileContent(content);
	destPath = replaceVarsInFileName(destPath);
	fs.writeFileSync(destPath, content);
	console.log(destPath);
};

const copyResources = sourcePath => {
	const destPath = sourcePath.substr(RESOURCES_DIR.length);
	const isDir = fs.lstatSync(sourcePath).isDirectory();
	if (isDir) {
		if (destPath) {
			mkdirp.sync(destPath);
			console.log(destPath);
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

console.log("Package successfully initialized.");
