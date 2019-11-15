const jsFileContentTemplate = componentName => {
	return `import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ${componentName}Template from "./generated/templates/${componentName}Template.lit.js";

// Styles
import ${componentName}Css from "./generated/themes/${componentName}.css.js";


const metadata = {
	tag: "ui5-${componentName.toLowerCase()}",
	properties: {
		//
	},
	slots: {
		//
	},
	events: {
		//
	},
};

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

	static async define(...params) {
		super.define(...params);
	}
}

${componentName}.define();

export default ${componentName};
`;
};

const consoleArguments = process.argv.slice(2);
const componentName = consoleArguments[0];

if (!componentName){
	console.error("Please enter component name.")
	return;
}

const filePaths = {
	"js": `./src/${componentName}.js`,
	"css": `./src/themes/${componentName}.css`,
	"hbs": `./src/${componentName}.hbs`,
};
const sJsFileContentTemplate = jsFileContentTemplate(componentName);

const fs = require("fs");

fs.writeFileSync(filePaths.js, sJsFileContentTemplate, { flag: "wx+" });
fs.writeFileSync(filePaths.css, "", { flag: "wx+" });
fs.writeFileSync(filePaths.hbs, "<div>Hello World</div>", { flag: "wx+" });


console.log(`Successfully generated ${componentName}.js`);
console.log(`Successfully generated ${componentName}.css`);
console.log(`Successfully generated ${componentName}.hbs`);

// Change the color of the output
console.warn('\x1b[33m%s\x1b[0m', `
Please import the generated component in bundle.esm.js:
import ${componentName} from "./dist/${componentName}.js";
`);
