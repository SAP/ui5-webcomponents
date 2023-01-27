import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import executeTemplate from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import TabContainer from "./TabContainer.js";

// Templates
import TabSeparatorInStripTemplate from "./generated/templates/TabSeparatorInStripTemplate.lit.js";
import TabSeparatorInOverflowTemplate from "./generated/templates/TabSeparatorInOverflowTemplate.lit.js";

// Styles
import stripCss from "./generated/themes/TabSeparatorInStrip.css.js";
import overflowCss from "./generated/themes/TabSeparatorInOverflow.css.js";

/**
 * @class
 * The <code>ui5-tab-separator</code> represents a vertical line to separate tabs inside a <code>ui5-tabcontainer</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.TabSeparator
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-tab-separator
 * @implements sap.ui.webc.main.ITab
 * @public
 */
@customElement("ui5-tab-separator")
class TabSeparator extends UI5Element {
	_getElementInStrip?: () => HTMLElement | null;

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
			root: {
				"ui5-tc__separator": true,
			},
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
		if (this._getElementInStrip) {
			return this._getElementInStrip();
		}

		return null;
	}

	get stableDomRef() {
		return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
	}

	get stripPresentation() {
		return executeTemplate(TabSeparator.stripTemplate, this);
	}

	get overflowPresentation() {
		return executeTemplate(TabSeparator.overflowTemplate, this);
	}
}

TabSeparator.define();

TabContainer.registerTabStyles(stripCss);
TabContainer.registerStaticAreaTabStyles(overflowCss);

export default TabSeparator;
