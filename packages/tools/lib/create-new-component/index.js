const fs = require("fs");

const jsFileContentTemplate = componentName => {
	return `import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ${componentName}Template from "./generated/templates/${componentName}Template.lit.js";

// Styles
import ${componentName}Css from "./generated/themes/${componentName}.css.js";

/**
 * @public
 */
const metadata = {
	tag: "${tagName}",
	properties: /** @lends sap.ui.webcomponents.${library}.${componentName}.prototype */ {
		//
	},
	slots: /** @lends sap.ui.webcomponents.${library}.${componentName}.prototype */ {
		//
	},
	events: /** @lends sap.ui.webcomponents.${library}.${componentName}.prototype */ {
		//
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>${tagName}</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import ${packageName}/dist/${componentName}.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.${library}.${componentName}
 * @extends UI5Element
 * @tagname ${tagName}
 * @public
 */
class ${componentName} extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return ${componentName}Css;
	}

	static get template() {
		return ${componentName}Template;
	}

	static get dependencies() {
		return [];
	}

	static async onDefine() {

	}
}

${componentName}.define();

export default ${componentName};
`;
};

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

const camelToKebabCase = string => string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

const packageName = getPackageName();
const library = getLibraryName(packageName);

const consoleArguments = process.argv.slice(2);
const componentName = consoleArguments[0];

if (!componentName){
	console.error("Please enter component name.");
	return;
}

const tagName = `ui5-${camelToKebabCase(componentName)}`;

const filePaths = {
	"js": `./src/${componentName}.js`,
	"css": `./src/themes/${componentName}.css`,
	"hbs": `./src/${componentName}.hbs`,
};
const sJsFileContentTemplate = jsFileContentTemplate(componentName);

fs.writeFileSync(filePaths.js, sJsFileContentTemplate, { flag: "wx+" });
fs.writeFileSync(filePaths.css, "", { flag: "wx+" });
fs.writeFileSync(filePaths.hbs, "<div>Hello World</div>", { flag: "wx+" });


console.log(`Successfully generated ${componentName}.js`);
console.log(`Successfully generated ${componentName}.css`);
console.log(`Successfully generated ${componentName}.hbs`);

const bundleLogger = fs.createWriteStream("./bundle.common.js", {
	flags: "a" // appending
});

bundleLogger.write(`
// TODO: Move this line in order to keep the file sorted alphabetically
import ${componentName} from "./dist/${componentName}.js";`);

// Change the color of the output
	console.warn('\x1b[33m%s\x1b[0m', `
Component is imported in bundle.common.js.
Do NOT forget to sort the file in alphabeticall order.
`);