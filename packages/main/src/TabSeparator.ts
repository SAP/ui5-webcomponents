import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import executeTemplate from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import TabContainer from "./TabContainer.js";
import type { ITab, ITabPresentationInOverflowInfo, ITabPresentationInStripInfo } from "./TabContainer.js";

// Templates
import TabSeparatorInStripTemplate from "./generated/templates/TabSeparatorInStripTemplate.lit.js";
import TabSeparatorInOverflowTemplate from "./generated/templates/TabSeparatorInOverflowTemplate.lit.js";

// Styles
import stripCss from "./generated/themes/TabSeparatorInStrip.css.js";
import overflowCss from "./generated/themes/TabSeparatorInOverflow.css.js";

/**
 * @class
 * The `ui5-tab-separator` represents a vertical line to separate tabs inside a `ui5-tabcontainer`.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @implements {ITab}
 * @public
 */
@customElement({
	tag: "ui5-tab-separator",
	renderer: litRender,
})
class TabSeparator extends UI5Element implements ITab {
	_forcedStyleInOverflow?: Record<string, any>;
	_getElementInStrip?: () => HTMLElement | undefined;

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

	get stableDomRef() {
		return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
	}

	get stripPresentation() {
		return executeTemplate(TabSeparator.stripTemplate, this);
	}

	get overflowPresentation() {
		return executeTemplate(TabSeparator.overflowTemplate, this);
	}

	receiveStripPresentationInfo(info: ITabPresentationInStripInfo) {
		this._getElementInStrip = info.getElementInStrip;
	}

	receiveOverflowPresentationInfo(info: ITabPresentationInOverflowInfo) {
		this._forcedStyleInOverflow = info.style;
	}

	/**
	 * Returns the DOM reference of the separator that is placed in the header.
	 *
	 * **Note:** Tabs and separators, placed in the `subTabs` slot of other tabs are not shown in the header. Calling this method on such tabs or separators will return `undefined`.
	 * @public
	 * @since 2.0.0
	 */
	getDomRefInStrip(): HTMLElement | undefined {
		return this._getElementInStrip?.();
	}
}

TabSeparator.define();

TabContainer.registerTabStyles(stripCss);
TabContainer.registerStaticAreaTabStyles(overflowCss);

export default TabSeparator;
