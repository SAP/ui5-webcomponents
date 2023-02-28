const tsFileContentTemplate = (componentName, tagName, library, packageName) => {
	return `import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import ${componentName}Template from "./generated/templates/${componentName}Template.lit.js";

// Styles
import ${componentName}Css from "./generated/themes/${componentName}.css.js";

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
@customElement({
	tag: "${tagName}",
	renderer: litRender, /* optional */
	styles: ${componentName}Css, /* optional */
	template: ${componentName}Template, /* optional */
	dependencies: [
		// Add dependencies here if needed (e.g. Icon, Button, etc.)
	],
	languageAware: true, /* optional */
	themeAware: true, /* optional */
	fastNavigation: true, /* optional */
})

/**
 * Example custom event.
 * Please keep in mind that all public events should be documented in the API Reference as shown below.
 *
 * @event sap.ui.webc.${library}.${componentName}#click
 * @public
 */
@event("click", { detail: { /* event payload ( optional ) */ } })
class ${componentName} extends UI5Element {
	/** @lends sap.ui.webc.${library}.${componentName}.prototype */
	@property()

	/** @lends sap.ui.webc.${library}.${componentName}.prototype */
	@slot()

	static async onDefine() {

	}
}

${componentName}.define();

export default ${componentName};
`;
};

module.exports = tsFileContentTemplate;
