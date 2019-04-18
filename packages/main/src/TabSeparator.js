import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap";
import TabSeparatorTemplateContext from "./TabSeparatorTemplateContext";
import TabBase from "./TabBase";
import TabSeparatorRenderer from "./build/compiled/TabSeparatorRenderer.lit";

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

	static get renderer() {
		return TabSeparatorRenderer;
	}

	static get calculateTemplateContext() {
		return TabSeparatorTemplateContext.calculate;
	}

	isSeparator() {
		return true;
	}
}

Bootstrap.boot().then(_ => {
	TabSeparator.define();
});

export default TabSeparator;
