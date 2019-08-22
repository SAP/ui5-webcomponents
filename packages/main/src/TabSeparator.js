import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import TabSeparatorTemplate from "./generated/templates/TabSeparatorTemplate.lit.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-tab-separator",
};

/**
 * @class
 * The <code>ui5-tab-separator</code> represents a vertical line to separate tabs inside a <code>ui5-tabcontainer</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.TabSeparator
 * @extends HTMLElement
 * @tagname ui5-tab-separator
 * @public
 */
class TabSeparator extends HTMLElement {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return TabSeparatorTemplate;
	}

	get isSeparator() {
		return true;
	}
}

TabSeparator.define();

export default TabSeparator;
