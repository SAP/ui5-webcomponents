import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import executeTemplate from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";

import TabContainer from "./TabContainer.js";

// Templates
import TabSeparatorInStripTemplate from "./generated/templates/TabSeparatorInStripTemplate.lit.js";
import TabSeparatorInOverflowTemplate from "./generated/templates/TabSeparatorInOverflowTemplate.lit.js";

// Styles
import stripCss from "./generated/themes/TabSeparatorInStrip.css.js";
import overflowCss from "./generated/themes/TabSeparatorInOverflow.css.js";

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
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-tab-separator
 * @implements sap.ui.webcomponents.main.ITab
 * @public
 */
class TabSeparator extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get stripTemplate() {
		return TabSeparatorInStripTemplate;
	}

	static get overflowTemplate() {
		return TabSeparatorInOverflowTemplate;
	}

	get classes() {
		return {
			"ui5-tc__separator": true,
		};
	}

	get isSeparator() {
		return true;
	}

	/**
	 * Returns the DOM reference of the separator that is placed in the header.
	 * <b>Note:</b> Tabs and separators, placed in the <code>subTabs</code> slot of other tabs are not shown in the header. Calling this method on such tabs or separators will return <code>null</code>.
	 *
	 * @function
	 * @public
	 */
	getTabInStripDomRef() {
		return this._getElementInStrip();
	}

	get stableDomRef() {
		return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
	}

	get stripPresentation() {
		return executeTemplate(this.constructor.stripTemplate, this);
	}

	get overflowPresentation() {
		return executeTemplate(this.constructor.overflowTemplate, this);
	}
}

TabSeparator.define();

TabContainer.registerTabStyles(stripCss);
TabContainer.registerStaticAreaTabStyles(overflowCss);

export default TabSeparator;
