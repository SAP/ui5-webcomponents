import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap.js";
import URI from "@ui5/webcomponents-base/src/types/URI.js";
import Function from "@ui5/webcomponents-base/src/types/Function.js";
import TabBase from "./TabBase.js";
import TabTemplateContext from "./TabTemplateContext.js";
import IconColor from "./types/IconColor.js";
import Icon from "./Icon.js";
import TabRenderer from "./build/compiled/TabRenderer.lit.js";

// all themes should work via the convenience import (inlined now, switch to json when elements can be imported individyally)
import "./ThemePropertiesProvider.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-tab",
	defaultSlot: "content",
	slots: /** @lends sap.ui.webcomponents.main.Tab.prototype */ {

		/**
		 * Defines the tab content.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		content: {
			type: HTMLElement,
			multiple: true,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.Tab.prototype */ {

		/**
		 * The text to be displayed for the item.
		 * @type {string}
		 * @defaultvalue: ""
		 * @public
		 */
		text: {
			type: String,
		},

		/**
		 * Enabled items can be selected.
		 * @type {Boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
			defaultValue: false,
		},

		/**
		 * Represents the "additionalText" text, which is displayed in the tab filter.
		 * @type {string}
		 * @defaultvalue: ""
		 * @public
		 */
		additionalText: {
			type: String,
		},

		/**
		 * Specifies the icon to be displayed for the tab filter.
		 * @type {URI}
		 * @public
		 */
		icon: {
			type: URI,
			defaultValue: "",
		},

		/**
		 * Specifies the icon color.
		 *
		 * If an icon font is used, the color can be chosen from the icon colors
		 * (sap.ui.core.IconColor).
		 * Possible semantic colors are: Neutral, Positive, Critical, Negative.
		 * Instead of the semantic icon color the brand color can be used, this is named Default.
		 * Semantic colors and brand colors should not be mixed up inside one IconTabBar.
		 * @type {IconColor}
		 * @defaultvalue "Default"
		 * @public
		 */
		iconColor: {
			type: IconColor,
			defaultValue: IconColor.Default,
		},

		/**
		 * Specifies if the <code>ui5-tab</code> is selected.
		 *
		 * @type {Boolean}
		 * @defaultvalue false
		 * @public
		 */
		selected: {
			type: Boolean,
			defaultValue: false,
		},

		_tabIndex: {
			type: String,
			defaultValue: "-1",
		},

		_getTabContainerHeaderItemCallback: {
			type: Function,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Tab.prototype */ {

	},
};

/**
 * @class
 * The <code>ui5-tab</code> represents a selectable item inside a <code>ui5-tabcontainer</code>.
 * It defines both the item in the tab strip (top part of the <code>ui5-tabcontainer</code>) and the
 * content that is presented to the user once the tab is selected.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Tab
 * @extends TabBase
 * @tagname ui5-tab
 * @public
 */
class Tab extends TabBase {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return TabRenderer;
	}

	static get calculateTemplateContext() {
		return TabTemplateContext.calculate;
	}

	static async define(...params) {
		await Icon.define();

		super.define(...params);
	}

	getFocusDomRef() {
		let focusedDomRef = super.getFocusDomRef();

		if (this._getTabContainerHeaderItemCallback) {
			focusedDomRef = this._getTabContainerHeaderItemCallback();
		}

		return focusedDomRef;
	}
}

Bootstrap.boot().then(_ => {
	Tab.define();
});

export default Tab;
