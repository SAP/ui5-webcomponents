const jsFileContentTemplate = sComponentName => {
	return `import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ${sComponentName}Template from "./generated/templates/${sComponentName}Template.lit.js";

// Styles
import ${sComponentName}Css from "./generated/themes/${sComponentName}.css.js";


const metadata = {
	tag: "ui5-${sComponentName.toLowerCase()}",
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

class ${sComponentName} extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return ${sComponentName}Css;
	}

	static get template() {
		return ${sComponentName}Template;
	}

	static async define(...params) {
		super.define(...params);
	}
}

${sComponentName}.define();

export default ${sComponentName};
`;
};

const aArgs = process.argv.slice(2);
const sComponentName = aArgs[0];

if (!sComponentName){
	console.error("Please enter component name.")
	return;
}

const oPaths = {
	"js": `./src/${sComponentName}.js`,
	"css": `./src/themes/${sComponentName}.css`,
	"hbs": `./src/${sComponentName}.hbs`,
};
const sJsFileContentTemplate = jsFileContentTemplate(sComponentName);

const fs = require("fs");

fs.writeFileSync(oPaths.js, sJsFileContentTemplate, { flag: "wx+" });
fs.writeFileSync(oPaths.css, "", { flag: "wx+" });
fs.writeFileSync(oPaths.hbs, "<div>Hello World</div>", { flag: "wx+" });
