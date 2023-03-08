const fs = require("fs");
const prompts = require("prompts");
const jsFileContentTemplate = require("./jsFileContentTemplate.js");
const tsFileContentTemplate = require("./tsFileContentTemplate.js");

const getPackageName = () => {
	if (!fs.existsSync("./package.json")) {
		throw("The current directory doesn't contain package.json file.");
	}

	const packageJSON = JSON.parse(fs.readFileSync("./package.json"));

	if (!packageJSON.name) {
		throw("The package.json file in the current directory doesn't have a name property");
	}

	return packageJSON.name;
};

const getLibraryName = packageName => {
	if (!packageName.includes("/")) {
		return packageName;
	}

	if (packageName === "@ui5/webcomponents") {
		return `main`;
	}

	packageName = packageName.split("/").pop();

	if (!packageName.startsWith("webcomponents-")) {
		return packageName;
	}

	return packageName.substr("webcomponents-".length);
};

// String manipulation
const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

// Validation of user input
const isNameValid = name => typeof name === "string" && name.match(/^[a-zA-Z][a-zA-Z0-9_-]*$/);
const isTagNameValid = tagName => tagName.match(/^([a-z][a-z0-9]*-)([a-z0-9]+(-[a-z0-9]+)*)$/);

const generateFiles = (componentName, tagName, library, packageName, isTypeScript) => {
	componentName = capitalizeFirstLetter(componentName);
	const filePaths = {
		"main": isTypeScript 
			? `./src/${componentName}.ts` 
			: `./src/${componentName}.js`,
		"css": `./src/themes/${componentName}.css`,
		"template": `./src/${componentName}.hbs`,
	};

	const FileContentTemplate = isTypeScript 
		? tsFileContentTemplate(componentName, tagName, library, packageName) 
		: jsFileContentTemplate(componentName, tagName, library, packageName);

	fs.writeFileSync(filePaths.main, FileContentTemplate, { flag: "wx+" });
	fs.writeFileSync(filePaths.css, "", { flag: "wx+" });
	fs.writeFileSync(filePaths.template, "<div>Hello World</div>", { flag: "wx+" });

	console.log(`Successfully generated ${filePaths.main}`);
	console.log(`Successfully generated ${filePaths.css}`);
	console.log(`Successfully generated ${filePaths.template}`);

	// Change the color of the output
	console.warn('\x1b[33m%s\x1b[0m', `
	Make sure to import the component in your bundle by using:
	import ${componentName} from "./dist/${componentName}.js";`);
}

// Main function
const createWebComponent = async () => {
	const packageName = getPackageName();
	const library = getLibraryName(packageName);

	const consoleArguments = process.argv.slice(2);
	let componentName = consoleArguments[0];
	let tagName = consoleArguments[1];
	let language = consoleArguments[2];
	let isTypeScript;


	if (componentName && !isNameValid(componentName)) {
		throw new Error("Invalid component name. Please use only letters, numbers, dashes and underscores. The first character must be a letter.");
	}

	if (tagName && !isTagNameValid(tagName)) {
		throw new Error("Invalid tag name. The tag name should only contain lowercase letters, numbers, dashes, and underscores. The first character must be a letter, and it should follow the pattern 'tag-name'.");
	}

	if (language && language !== "typescript" && language !== "ts" && language !== "javascript" && language !== "js") {
		throw new Error("Invalid language. Please use 'typescript','javascript' or their respective 'ts','js'.");
	}

	if (!componentName) {
		const response = await prompts({
			type: "text",
			name: "componentName",
			message: "Please enter a component name:",
			validate: (value) => isNameValid(value),
		});
		componentName = response.componentName;

		if (!componentName) {
			process.exit();
		}
	}

	if (!tagName) {
		const response = await prompts({
			type: "text",
			name: "tagName",
			message: "Please enter a tag name:",
			validate: (value) => isTagNameValid(value),
		});
		tagName = response.tagName;

		if (!tagName) {
			process.exit();
		}
	}

	if (!language) {
		const response = await prompts({
			type: "select",
			name: "isTypeScript",
			message: "Please select a language:",
			choices: [
				{
					title: "TypeScript (recommended)",
					value: true,
				},
				{
					title: "JavaScript",
					value: false,
				},
			],
		});
		isTypeScript = response.isTypeScript;
	} else if (language === "typescript" || language === "ts") {
		isTypeScript = true;
	} else {
		isTypeScript = false;
	}

	generateFiles(componentName, tagName, library, packageName, isTypeScript);
};

createWebComponent();