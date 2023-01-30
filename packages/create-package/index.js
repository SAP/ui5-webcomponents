#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const prompts = require("prompts");
const parser = require("npm-config-user-agent-parser");

const version = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"))).version;

// from where all the files will be copied
const TEMPLATE_DIR = path.join(`${__dirname}`, `template/`);

// String utils
const capitalizeFirst = str => str.substr(0,1).toUpperCase() + str.substr(1);
const kebabToCamelCase = string => toCamelCase(string.split("-"));
const toCamelCase = parts => {
	return parts.map((string, index) => {
		return index === 0 ? string.toLowerCase() : string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	}).join("");
};
const isTypescriptRelatedFile = sourcePath => {
	return ["MyFirstComponent.ts", "tsconfig.json", "global.d.ts"].some(fileName => sourcePath.includes(fileName));
}

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
	const ignoreJsRelated = vars.INIT_PACKAGE_VAR_TYPESCRIPT && sourcePath.includes("MyFirstComponent.js")
	const ignoreTsRelated = !vars.INIT_PACKAGE_VAR_TYPESCRIPT && isTypescriptRelatedFile(sourcePath)

	if (ignoreJsRelated || ignoreTsRelated) {
		return;
	}

	let content = fs.readFileSync(sourcePath, {encoding: "UTF-8"});
	content = replaceVarsInFileContent(vars, content);
	destPath = replaceVarsInFileName(vars, destPath);
	fs.writeFileSync(destPath, content);
};

const copyFiles = (vars, sourcePath, destPath) => {
	const isDir = fs.lstatSync(sourcePath).isDirectory();
	if (isDir) {
		if (destPath) {
			mkdirp.sync(destPath);
		}
		fs.readdirSync(sourcePath).forEach(file => {
			copyFiles(vars, path.join(sourcePath, file), path.join(destPath, file));
		});
	} else {
		copyFile(vars, sourcePath, destPath);
	}
};

// Main function
const createWebcomponentsPackage = async () => {
	let response;
	let typescript = false;

	// Get the name
	let name = process.argv[2];
	// Get the port
	let port = process.argv[3];
	// Get the tag
	let tag = process.argv[4];
	// Get the TypeScript support
	let typescriptSupport = process.argv[5];

	if (!isNameValid(name)) {
		response = await prompts({
			type: "text",
			name: "name",
			message: "Package name:",
			validate: isNameValid,
		});
		name = response.name;
	}

	if (!typescriptSupport) {
		response = await prompts({
			type: "select",
			name: "language",
			message: "Support TypeScript:",
			choices: [
				{
					title: "JavaScript",
					value: "js",
				},
				{
					title: "TypeScript",
					value: "ts",
				},
			]
		});
		typescript = response.language === "ts";
	}

	if (!isPortValid(port)) {
		response = await prompts({
			type: "text",
			name: "port",
			message: "Dev server port:",
			validate: isPortValid,
			initial: "8080",
		});
		port = response.port;
	}

	if (!isTagValid(port)) {
		response = await prompts({
			type: "text",
			name: "tag",
			message: "Demo component name:",
			initial: "my-first-component",
			validate: isTagValid,
		});
		tag = response.tag;
	}

	const className = capitalizeFirst(kebabToCamelCase(tag));

	// All variables that will be replaced in the content of the resources/
	const vars = {
		INIT_PACKAGE_VAR_NAME: name,
		INIT_PACKAGE_VAR_PORT: port,
		INIT_PACKAGE_VAR_TAG: tag,
		INIT_PACKAGE_VAR_CLASS_NAME: className,
		INIT_PACKAGE_VAR_TYPESCRIPT: typescript
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
			"@ui5/webcomponents-base": version,
			"@ui5/webcomponents-theming": version,
		},
		"devDependencies": {
			"@ui5/webcomponents-tools": version,
			"chromedriver": "*",
		},
	};

	// Update package.json
	const destDir = path.join(`./`, name);
	mkdirp.sync(destDir);
	fs.writeFileSync(path.join(destDir, "package.json"), JSON.stringify(packageContent, null, 2));
	// Copy files
	copyFiles(vars, TEMPLATE_DIR, destDir);

	console.log("\nPackage successfully created!\nNext steps:\n");
	console.log(`$ cd ${name}`);

	let userAgentInfo;
	try {
		userAgentInfo = parser(process.env.npm_config_user_agent);
	} catch (e) {}

	if (userAgentInfo && userAgentInfo.yarn) {
		console.log(`$ yarn`);
		console.log(`$ yarn start`);
	} else {
		console.log(`$ npm i`);
		console.log(`$ npm start`);
	}

	console.log("\n");
};

createWebcomponentsPackage();
