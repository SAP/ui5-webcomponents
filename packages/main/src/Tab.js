import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import SemanticColor from "./types/SemanticColor.js";
import Icon from "./Icon.js";
import TabTemplate from "./generated/templates/TabTemplate.lit.js";

// Styles
import css from "./generated/themes/Tab.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-tab",
	slots: /** @lends sap.ui.webcomponents.main.Tab.prototype */ {

		/**
		 * Defines the tab content.
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.Tab.prototype */ {

		/**
		 * The text to be displayed for the item.
		 * @type {string}
		 * @defaultvalue ""
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
		},

		/**
		 * Represents the "additionalText" text, which is displayed in the tab filter.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		additionalText: {
			type: String,
		},

		/**
		 * Defines the icon source URI to be displayed as graphical element within the <code>ui5-tab</code>.
		 * The SAP-icons font provides numerous built-in icons.
		 * See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		icon: {
			type: String,
		},

		/**
		 * Defines the <code>ui5-tab</code> semantic color.
		 * The color is applied to:
		 * <ul>
		 * <li>the <code>ui5-tab</code> icon</li>
		 * <li>the <code>text</code> when <code>ui5-tab</code> overflows</li>
		 * <li>the tab selection line</li>
		 * </ul>
		 * <br>
		 * Available semantic colors are: <code>"Default"</code>, <code>"Neutral"</code>, <code>"Positive"</code>, <code>"Critical"</code> and <code>"Negative"</code>.
		 * <br><br>
		 * <b>Note:</b> The color value depends on the current theme.
		 * @type {string}
		 * @defaultvalue "Default"
		 * @public
		 */
		semanticColor: {
			type: SemanticColor,
			defaultValue: SemanticColor.Default,
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
		},

		_tabIndex: {
			type: String,
			defaultValue: "-1",
			noAttribute: true,
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
class Tab extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return TabTemplate;
	}

	static get styles() {
		return css;
	}

	static async define(...params) {
		await Icon.define();

		super.define(...params);
	}

	get isSeparator() {
		return false;
	}

	getFocusDomRef() {
		let focusedDomRef = super.getFocusDomRef();

		if (this._getTabContainerHeaderItemCallback) {
			focusedDomRef = this._getTabContainerHeaderItemCallback();
		}

		return focusedDomRef;
	}
}

Tab.define();

export default Tab;
