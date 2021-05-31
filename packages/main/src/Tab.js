import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import executeTemplate from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";
import SemanticColor from "./types/SemanticColor.js";
import TabLayout from "./types/TabLayout.js";
import TabContainer from "./TabContainer.js";
import Icon from "./Icon.js";
import CustomListItem from "./CustomListItem.js";

// Templates
import TabTemplate from "./generated/templates/TabTemplate.lit.js";
import TabInStripTemplate from "./generated/templates/TabInStripTemplate.lit.js";
import TabInOverflowTemplate from "./generated/templates/TabInOverflowTemplate.lit.js";

// Styles
import css from "./generated/themes/Tab.css.js";
import stripCss from "./generated/themes/TabInStrip.css.js";
import overflowCss from "./generated/themes/TabInOverflow.css.js";

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
		 * @type {boolean}
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
		 * Defines the icon source URI to be displayed as graphical element within the component.
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
		 * Defines the component's design color.
		 * <br><br>
		 * The design is applied to:
		 * <ul>
		 * <li>the component icon</li>
		 * <li>the <code>text</code> when the component overflows</li>
		 * <li>the tab selection line</li>
		 * </ul>
		 *
		 * <br><br>
		 * Available designs are: <code>"Default"</code>, <code>"Neutral"</code>, <code>"Positive"</code>, <code>"Critical"</code> and <code>"Negative"</code>.
		 *
		 * <br><br>
		 * <b>Note:</b> The design depends on the current theme.
		 * @type {SemanticColor}
		 * @defaultvalue "Default"
		 * @public
		 */
		design: {
			type: SemanticColor,
			defaultValue: SemanticColor.Default,
		},

		/**
		 * Defines the stable selector that you can use via getStableDomRef method.
		 * @public
		 * @type {string}
		 * @since 1.0.0-rc.8
		 */
		stableDomRef: {
			type: String,
		},

		/**
		 * Specifies if the component is selected.
		 *
		 * @type {boolean}
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
 * @extends UI5Element
 * @tagname ui5-tab
 * @implements sap.ui.webcomponents.main.ITab
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

	static get stripTemplate() {
		return TabInStripTemplate;
	}

	static get overflowTemplate() {
		return TabInOverflowTemplate;
	}

	static get styles() {
		return css;
	}

	static get dependencies() {
		return [
			Icon,
			CustomListItem,
		];
	}

	get isSeparator() {
		return false;
	}

	get stripPresentation() {
		return executeTemplate(this.constructor.stripTemplate, this);
	}

	get overflowPresentation() {
		return executeTemplate(this.constructor.overflowTemplate, this);
	}

	getFocusDomRef() {
		let focusedDomRef = super.getFocusDomRef();

		if (this._getTabContainerHeaderItemCallback) {
			focusedDomRef = this._getTabContainerHeaderItemCallback();
		}

		return focusedDomRef;
	}

	get isMixedModeTab() {
		return !this.icon && this._mixedMode;
	}

	get isTextOnlyTab() {
		return !this.icon && !this._mixedMode;
	}

	get isIconTab() {
		return !!this.icon;
	}

	get effectiveDisabled() {
		return this.disabled || undefined;
	}

	get effectiveSelected() {
		return this.selected || false;
	}

	get effectiveHidden() {
		return !this.selected;
	}

	get ariaLabelledBy() {
		const labels = [];

		if (this.text) {
			labels.push(`${this._id}-text`);
		}

		if (this.additionalText) {
			labels.push(`${this._id}-additionalText`);
		}

		if (this.icon) {
			labels.push(`${this._id}-icon`);
		}

		return labels.join(" ");
	}

	get headerClasses() {
		const classes = ["ui5-tab-strip-item"];

		if (this.selected) {
			classes.push("ui5-tab-strip-item--selected");
		}

		if (this.disabled) {
			classes.push("ui5-tab-strip-item--disabled");
		}

		if (this.tabLayout === TabLayout.Inline) {
			classes.push("ui5-tab-strip-item--inline");
		}

		if (!this.icon && !this._mixedMode) {
			classes.push("ui5-tab-strip-item--textOnly");
		}

		if (this.icon) {
			classes.push("ui5-tab-strip-item--withIcon");
		}

		if (!this.icon && this._mixedMode) {
			classes.push("ui5-tab-strip-item--mixedMode");
		}

		if (this.design !== SemanticColor.Default) {
			classes.push(`ui5-tab-strip-item--${this.design.toLowerCase()}`);
		}

		return classes.join(" ");
	}

	get headerSemanticIconClasses() {
		const classes = ["ui5-tab-strip-item-semanticIcon"];

		if (this.design !== SemanticColor.Default) {
			classes.push(`ui5-tab-strip-item-semanticIcon--${this.design.toLowerCase()}`);
		}

		return classes.join(" ");
	}

	get overflowClasses() {
		const classes = ["ui5-tab-overflow-item"];

		if (this.design !== SemanticColor.Default) {
			classes.push(`ui5-tab-overflow-item--${this.design.toLowerCase()}`);
		}

		if (this.disabled) {
			classes.push("ui5-tab-overflow-item--disabled");
		}

		return classes.join(" ");
	}

	get overflowState() {
		return this.disabled ? "Inactive" : "Active";
	}
}

Tab.define();

TabContainer.registerTabStyles(stripCss);
TabContainer.registerStaticAreaTabStyles(overflowCss);

export default Tab;
