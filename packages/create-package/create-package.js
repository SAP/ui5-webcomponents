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
const isTSRelatedFile = sourcePath => {
	return ["Assets.ts", "MyFirstComponent.ts", "tsconfig.json", "global.d.ts"].some(fileName => sourcePath.includes(fileName));
};
const isJSRelatedFile = sourcePath => {
	return ["Assets.js", "MyFirstComponent.js"].some(fileName => sourcePath.includes(fileName));
};
const isGitIgnore = sourcePath => {
	return sourcePath.includes("gitignore");
};
const isNPMRC = sourcePath => {
	return sourcePath.includes("npmrc");
};

// Validation of user input
const ComponentNamePattern = /^[A-Z][A-Za-z0-9]+$/;
const isNameValid = name => typeof name === "string" && name.match(/^[a-zA-Z][a-zA-Z0-9\-_]+$/);
const isComponentNameValid = name => typeof name === "string" && ComponentNamePattern.test(name);
const isTagValid = tag => typeof tag === "string" && tag.match(/^[a-z0-9]+?-[a-zA-Z0-9\-_]+?[a-z0-9]$/);

/**
 * Hyphanates the given PascalCase string, f.e.:
 * Foo -> "my-foo" (adds preffix)
 * FooBar -> "foo-bar"
 */
const hyphaneteComponentName = (componentName) => {
	const result = componentName.replace(/([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();

	return result.includes("-") ? result : `my-${result}`;
};

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
	const ignoreJsRelated = vars.INIT_PACKAGE_VAR_TYPESCRIPT && isJSRelatedFile(sourcePath);
	const ignoreTsRelated = !vars.INIT_PACKAGE_VAR_TYPESCRIPT && isTSRelatedFile(sourcePath);

	if (ignoreJsRelated || ignoreTsRelated) {
		return;
	}

	let content = fs.readFileSync(sourcePath, { encoding: "UTF-8" });
	content = replaceVarsInFileContent(vars, content);
	destPath = replaceVarsInFileName(vars, destPath);

	fs.writeFileSync(destPath, content);

	// Rename "gitignore" to ".gitignore" (npm init won't include ".gitignore", so we add it as "gitignore" and rename it later)
	if (isGitIgnore(sourcePath)) {
		fs.renameSync(destPath, destPath.replace("gitignore", ".gitignore"))
	}

	// Rename "npmrc" to ".npmrc" (npm init won't include ".npmrc", so we add it as "npmrc" and rename it later)
	if (isNPMRC(sourcePath)) {
		fs.renameSync(destPath, destPath.replace("npmrc", ".npmrc"));
	}
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

const generateFilesContent = (name, componentName, typescript, skipSubfolder) => {
	const tagName = argv.tag || hyphaneteComponentName(componentName);

	// All variables that will be replaced in the content of the resources/
	const vars = {
		INIT_PACKAGE_VAR_NAME: name,
		INIT_PACKAGE_VAR_TAG: tagName,
		INIT_PACKAGE_VAR_CLASS_NAME: componentName,
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

	if (typescript) {
		packageContent.devDependencies.typescript = "^4.9.4";
	}

	// Update package.json
	const destDir = skipSubfolder ? path.join("./") : path.join("./", name);
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
		throw new Error("The package name should be a string, starting with letter and containing the following symbols [a-z, A-Z, 0-9].");
	}

	if (argv.componentName && !isComponentNameValid(argv.componentName)) {
		throw new Error("The component name should be a string, starting with a capital letter [A-Z][a-z], for example: Button, MyButton, etc.");
	}

	if (argv.tag && !isTagValid(argv.tag) ) {
		throw new Error("The tag should be in kebab-case (f.e my-component) and it can't be a single word.");
	}

	let name = argv.name || "my-package";
	let componentName = argv.componentName || "MyComponent";
	let typescriptSupport = !!argv.enableTypescript;
	const skipSubfolder = !!argv.skipSubfolder;

	if (argv.skip) {
		return generateFilesContent(name, componentName, typescriptSupport, skipSubfolder);
	}

	if (!argv.name) {
		response = await prompts({
			type: "text",
			name: "name",
			message: "Package name:",
			validate: (value) => isNameValid(value) ? true : "Package name should be a string, starting with a letter and containing the following symbols [a-z, A-Z ,0-9, _, -].",
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

	if (!argv.componentName) {
		response = await prompts({
			type: "text",
			name: "componentName",
			message: "Component name:",
			initial: "MyComponent",
			validate: (value) => isComponentNameValid(value) ? true : "Component name should follow PascalCase naming convention (f.e. Button, MyButton, etc.).",
		});
		componentName = response.componentName;
	}

	return generateFilesContent(name, componentName, typescriptSupport, skipSubfolder);
};

createWebcomponentsPackage();
