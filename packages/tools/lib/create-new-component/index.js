const fs = require("fs");
const path = require("path");
const prompts = require("prompts");
const jsFileContentTemplate = require("./jsFileContentTemplate.js");
const tsFileContentTemplate = require("./tsFileContentTemplate.js");

/**
 * Hyphanates the given PascalCase string, f.e.:
 * Foo -> "my-foo" (adds preffix)
 * FooBar -> "foo-bar"
 */
const hyphaneteComponentName = (componentName) => {
	const result = componentName.replace(/([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();

	return result.includes("-") ? result : `my-${result}`;
};

/**
 * Capitalizes first letter of string.
 */
const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

/**
 * Validates component name, enforcing PascalCase pattern - Button, MyButton.
 */
const PascalCasePattern = /^[A-Z][A-Za-z0-9]+$/;
const isNameValid = name => typeof name === "string" && PascalCasePattern.test(name);

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

	if (componentName && !isNameValid(componentName)) {
		throw new Error(`${componentName} is invalid component name. Use only letters (at least two) and start with capital one:  Button, MyButton, etc.`);
	}

	if (!componentName) {
		const response = await prompts({
			type: "text",
			name: "componentName",
			message: "Please enter a component name:",
			validate: (value) => isNameValid(value) ? true : "Component name should follow PascalCase naming convention (f.e. Button, MyButton, etc.).",
		});
		componentName = response.componentName;

		if (!componentName) {
			process.exit();
		}
	}

	const isTypeScript = fs.existsSync(path.join(process.cwd(), "tsconfig.json"));
	const tagName = hyphaneteComponentName(componentName);

	generateFiles(componentName, tagName, library, packageName, isTypeScript);
};

createWebComponent();