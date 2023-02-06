#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const prompts = require("prompts");
const parser = require("npm-config-user-agent-parser");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv)).argv;

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
	return ["Assets.ts", "MyFirstComponent.ts", "tsconfig.json", "global.d.ts"].some(fileName => sourcePath.includes(fileName));
};

// Validation of user input
const isNameValid = name => typeof name === "string" && name.match(/^[a-zA-Z0-9\-_]+$/);
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
	const ignoreJsRelated = vars.INIT_PACKAGE_VAR_TYPESCRIPT && sourcePath.includes("MyFirstComponent.js");
	const ignoreTsRelated = !vars.INIT_PACKAGE_VAR_TYPESCRIPT && isTypescriptRelatedFile(sourcePath);

	if (ignoreJsRelated || ignoreTsRelated) {
		return;
	}

	let content = fs.readFileSync(sourcePath, { encoding: "UTF-8" });
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

const generateFilesContent = (name, tag, typescript) => {
	const className = capitalizeFirst(kebabToCamelCase(tag));

	// All variables that will be replaced in the content of the resources/
	const vars = {
		INIT_PACKAGE_VAR_NAME: name,
		INIT_PACKAGE_VAR_TAG: tag,
		INIT_PACKAGE_VAR_CLASS_NAME: className,
		INIT_PACKAGE_VAR_TYPESCRIPT: typescript,
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

// Main function
const createWebcomponentsPackage = async () => {
	let response;
	if (argv.name && !isNameValid(argv.name)) {
		throw new Error("The package name should be a string (a-z, A-Z, 0-9).");
	}

	if (argv.tag && !isTagValid(argv.tag) ) {
		throw new Error("The tag should be in kebab-case (my-first-component f.e) and it can't be a single word.");
	}

	let name = argv.name || "my-package";
	let tag = argv.tag || "my-first-component";
	let typescriptSupport = !!argv.enableTypescript;

	if (argv.skip) {
		return generateFilesContent(name, tag, typescriptSupport);
	}

	if (!argv.name) {
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
			message: "Project type:",
			choices: [
				{
					title: "JavaScript",
					value: false,
				},
				{
					title: "TypeScript",
					value: true,
				},
			],
		});
		typescriptSupport = response.language;
	}

	if (!argv.tag) {
		response = await prompts({
			type: "text",
			name: "tag",
			message: "Component name:",
			initial: "my-first-component",
			validate: isTagValid,
		});
		tag = response.tag;
	}

	return generateFilesContent(name, tag, typescriptSupport);
};

createWebcomponentsPackage();
