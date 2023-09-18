const jsFileContentTemplate = (componentName, tagName, library, packageName) => {
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
	properties: /** @lends sap.ui.webc.${library}.${componentName}.prototype */ {
		//
	},
	slots: /** @lends sap.ui.webc.${library}.${componentName}.prototype */ {
		//
	},
	events: /** @lends sap.ui.webc.${library}.${componentName}.prototype */ {
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
 * @alias sap.ui.webc.${library}.${componentName}
 * @extends sap.ui.webc.base.UI5Element
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
}

${componentName}.define();

export default ${componentName};
`;
};

module.exports = jsFileContentTemplate;
