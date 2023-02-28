const fs = require("fs");
const prompts = require("prompts");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const jsFileContentTemplate = require("./jsFileContentTemplate.js");
const tsFileContentTemplate = require("./tsFileContentTemplate.js");

const argv = yargs(hideBin(process.argv)).argv;

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
const camelToKebabCase = string => string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

// Validation of user input
const isNameValid = name => typeof name === "string" && name.match(/^[a-zA-Z0-9\-_]+$/);
const isNameStartingWithNumber = name => typeof name === "string" && name.match(/^[0-9]/);

const generateFiles = (componentName, tagName, library, packageName, isTypeScript) => {
	const correctComponentName = capitalizeFirstLetter(componentName);
	const filePaths = {
		"extension": isTypeScript 
			? `./src/${correctComponentName}.ts` 
			: `./src/${correctComponentName}.js`,
		"css": `./src/themes/${correctComponentName}.css`,
		"hbs": `./src/${correctComponentName}.hbs`,
	};

	const FileContentTemplate = isTypeScript 
		? tsFileContentTemplate(correctComponentName, tagName, library, packageName) 
		: jsFileContentTemplate(correctComponentName, tagName, library, packageName);

	// The .extension determines if the file is .js or .ts with the help of the isTypeScript check
	fs.writeFileSync(filePaths.extension, FileContentTemplate, { flag: "wx+" });
	fs.writeFileSync(filePaths.css, "", { flag: "wx+" });
	fs.writeFileSync(filePaths.hbs, "<div>Hello World</div>", { flag: "wx+" });

	console.log(isTypeScript 
		? `Successfully generated ${correctComponentName}.ts` 
		: `Successfully generated ${correctComponentName}.js`);
	console.log(`Successfully generated ${correctComponentName}.css`);
	console.log(`Successfully generated ${correctComponentName}.hbs`);

	const bundleLogger = fs.createWriteStream("./bundle.common.js", {
		flags: "a" // appending
	});

	bundleLogger.write(`
	// TODO: Move this line in order to keep the file sorted alphabetically
	import ${correctComponentName} from "./dist/${correctComponentName}.js";`);

	// Change the color of the output
		console.warn('\x1b[33m%s\x1b[0m', `
	Component is imported in bundle.common.js.
	Do NOT forget to sort the file in alphabetical order.`);
}

// Main function
const createWebComponent = async () => {
	const consoleArguments = process.argv.slice(2);
	let componentName = consoleArguments[0];
	let isTypeScript = !!argv.enableTypescript;

	if (!componentName) {
		const response = await prompts({
			type: "text",
			name: "componentName",
			message: "Please enter a component name:",
			validate: (value) => isNameValid(value),
		});
		componentName = response.componentName;
	}

	if (!isNameValid(componentName)) {
		console.error(`The component name "${componentName}" is not valid. Please use only letters, numbers, dashes and underscores.`);
		return;
	}

	let response = await prompts({
		type: "select",
		name: "language",
		message: "Component type:",
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
		initial: isTypeScript ? 1 : 0,
	});

	isTypeScript = response.language;

	const tagName = `ui5-${camelToKebabCase(componentName)}`;
	const packageName = getPackageName();
	const library = getLibraryName(packageName);
	
	if (!isNameStartingWithNumber(componentName)) {
		generateFiles(componentName, tagName, library, packageName, isTypeScript);
	} else {
		console.error(`The component name "${componentName}" is not valid. Please use only letters, dashes and underscores.`);
	}
};

createWebComponent();