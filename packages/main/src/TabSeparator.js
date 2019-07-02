import litRender from "@ui5/webcomponents-base/src/renderer/LitRenderer.js";
import TabBase from "./TabBase.js";
import TabSeparatorTemplate from "./build/compiled/TabSeparatorTemplate.lit.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-tab-separator",
	properties: /** @lends sap.ui.webcomponents.main.TabSeparator.prototype */{
	},
	events: /** @lends sap.ui.webcomponents.main.TabSeparator.prototype */{
	},
};

/**
 * @class
 * The <code>ui5-tab-separator</code> represents a vertical line to separate tabs inside a <code>ui5-tabcontainer</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.TabSeparator
 * @extends TabBase
 * @tagname ui5-tab-separator
 * @public
 */
class TabSeparator extends TabBase {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return TabSeparatorTemplate;
	}

	isSeparator() {
		return true;
	}
}

TabSeparator.define();

export default TabSeparator;
