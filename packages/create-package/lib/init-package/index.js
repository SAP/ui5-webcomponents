const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const prompts = require("prompts");
const beautify = require("json-beautify");

// String utils
const capitalizeFirst = str => str.substr(0,1).toUpperCase() + str.substr(1);
const kebabToCamelCase = string => toCamelCase(string.split("-"));
const toCamelCase = parts => {
	return parts.map((string, index) => {
		return index === 0 ? string.toLowerCase() : string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	}).join("");
};

// Validation of user input
const isNameValid = name => typeof name === "string" && name.match(/^[a-zA-Z0-9\-_]+$/);
const isPortValid = port => typeof port === "string" && port.match(/^[0-9]+$/);
const isTagValid = tag => typeof tag === "string" && tag.match(/^[a-z0-9]+?-[a-zA-Z0-9\-_]+?[a-z0-9]$/);

// Utils for building the file structure
const replaceVarsInFileContent = (vars, content) => {
	for (let key in vars) {
		const re = new RegExp(key, "g");
		content = content.replace(re, vars[key]);
	}
	return content;
};

const replaceVarsInFileName = (vars, fileName) => {
	return fileName.replace(/MyFirstComponent/, vars.INIT_PACKAGE_VAR_CLASS_NAME);
};

const copyFile = (vars, sourcePath, destPath) => {
	let content = fs.readFileSync(sourcePath, {encoding: "UTF-8"});
	content = replaceVarsInFileContent(vars, content);
	destPath = replaceVarsInFileName(vars, destPath);
	fs.writeFileSync(destPath, content);
	console.log(destPath);
};

const copyResources = (vars, sourcePath, destPath) => {
	const isDir = fs.lstatSync(sourcePath).isDirectory();
	if (isDir) {
		if (destPath) {
			mkdirp.sync(destPath);
		}
		fs.readdirSync(sourcePath).forEach(file => {
			copyResources(vars, path.join(sourcePath, file), path.join(destPath, file));
		});
	} else {
		copyFile(vars, sourcePath, destPath);
	}
};

// from where all the files will be copied
const RESOURCES_DIR = path.join(`${__dirname}`, `resources/`);

const initPackage = async () => {
	let response;

	// Get the name
	let name = process.argv[2];

	if (!isNameValid(name)) {
		response = await prompts({
			type: "text",
			name: "name",
			message: `Enter the name of the new package\n A directory with this name will be created, and this will be the "name" field in "package.json":`,
			validate: isNameValid,
		});
		name = response.name;
	}

	// Get the port
	response = await prompts({
		type: "text",
		name: "port",
		message: "Choose the port where the test server will run\n Press Enter for default:",
		validate: isPortValid,
		initial: "8080",
	});
	const port = response.port;

	// Get the tag
	response = await prompts({
		type: "text",
		name: "tag",
		message: "Enter the name of your first component (must contain at least one dash)\n Press Enter for default:",
		initial: "my-first-component",
		validate: isTagValid,
	});
	const tag = response.tag;

	const className = capitalizeFirst(kebabToCamelCase(tag));

	// All variables that will be replaced in the content of the resources/
	const vars = {
		INIT_PACKAGE_VAR_NAME: name,
		INIT_PACKAGE_VAR_PORT: port,
		INIT_PACKAGE_VAR_TAG: tag,
		INIT_PACKAGE_VAR_CLASS_NAME: className,
	};

	const packageContent = {
		name,
		version: "0.0.1",
		ui5: {
			webComponentsPackage: true,
		},
		scripts: {
			"clean": "wc-dev clean",
			"lint": "wc-dev lint",
			"start": "wc-dev start",
			"watch": "wc-dev watch",
			"serve": "wc-dev serve",
			"build": "wc-dev build",
			"test": "wc-dev test",
			"create-ui5-element": "wc-create-ui5-element",
			"prepublishOnly": "npm run build",
		},
		exports: {
			"./.port": "./.port",
			"./src/*": "./src/*",
			"./dist/*": "./dist/*",
			"./package.json": "./package.json",
			"./bundle.js": "./bundle.js",
			"./*": "./dist/*",
		},
		"dependencies": {
			"@ui5/webcomponents-base": "*",
			"@ui5/webcomponents-theme-base": "*",
		},
		"devDependencies": {
			"@ui5/webcomponents-tools": "*",
			"chromedriver": "*",
		},
	};

	// Update package.json
	const destDir = path.join(`./`, name);
	mkdirp.sync(destDir);
	fs.writeFileSync(path.join(destDir, "package.json"), beautify(packageContent, null, 2, 100));
	// Copy files
	copyResources(vars, RESOURCES_DIR, destDir);

	console.log("Package successfully initialized.\n\n");
	console.log(`cd ${name}`);
	console.log(`npm i`);
	console.log(`npm start\n\n`);
};

initPackage();
