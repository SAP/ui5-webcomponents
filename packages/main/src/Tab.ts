import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import executeTemplate from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";
import willShowContent from "@ui5/webcomponents-base/dist/util/willShowContent.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	TAB_ARIA_DESIGN_POSITIVE,
	TAB_ARIA_DESIGN_NEGATIVE,
	TAB_ARIA_DESIGN_CRITICAL,
	TAB_ARIA_DESIGN_NEUTRAL,
	TABCONTAINER_END_OVERFLOW,
	TAB_SPLIT_ROLE_DESCRIPTION,
} from "./generated/i18n/i18n-defaults.js";

import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import SemanticColor from "./types/SemanticColor.js";
import ListItemType from "./types/ListItemType.js";
import TabContainer from "./TabContainer.js";
import type { ITab } from "./TabContainer.js";
import Icon from "./Icon.js";
import Button from "./Button.js";
import CustomListItem from "./CustomListItem.js";

// Templates
import TabTemplate from "./generated/templates/TabTemplate.lit.js";
import TabInStripTemplate from "./generated/templates/TabInStripTemplate.lit.js";
import TabInOverflowTemplate from "./generated/templates/TabInOverflowTemplate.lit.js";

// Styles
import css from "./generated/themes/Tab.css.js";
import stripCss from "./generated/themes/TabInStrip.css.js";
import overflowCss from "./generated/themes/TabInOverflow.css.js";

const DESIGN_DESCRIPTIONS = {
	[SemanticColor.Positive]: TAB_ARIA_DESIGN_POSITIVE,
	[SemanticColor.Negative]: TAB_ARIA_DESIGN_NEGATIVE,
	[SemanticColor.Neutral]: TAB_ARIA_DESIGN_NEUTRAL,
	[SemanticColor.Critical]: TAB_ARIA_DESIGN_CRITICAL,
};

/**
 * @class
 * The <code>ui5-tab</code> represents a selectable item inside a <code>ui5-tabcontainer</code>.
 * It defines both the item in the tab strip (top part of the <code>ui5-tabcontainer</code>) and the
 * content that is presented to the user once the tab is selected.
 *
 * @abstract
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Tab
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-tab
 * @implements sap.ui.webc.main.ITab
 * @public
 */
@customElement({
	tag: "ui5-tab",
	languageAware: true,
	renderer: litRender,
	template: TabTemplate,
	styles: css,
	dependencies: [
		Icon,
		Button,
		CustomListItem,
	],
})
class Tab extends UI5Element implements ITab, ITabbable {
	/**
	 * The text to be displayed for the item.
	 * @type {string}
	 * @defaultvalue ""
	 * @public
	 * @name sap.ui.webc.main.Tab.prototype.text
	 */
	@property()
	text!: string;

	/**
	 * Disabled tabs can't be selected.
	 * @type {boolean}
	 * @defaultvalue false
	 * @public
	 * @name sap.ui.webc.main.Tab.prototype.disabled
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Represents the "additionalText" text, which is displayed in the tab. In the cases when in the same time there are tabs with icons and tabs without icons, if a tab has no icon the "additionalText" is displayed larger.
	 * @type {string}
	 * @defaultvalue ""
	 * @public
	 * @name sap.ui.webc.main.Tab.prototype.additionalText
	 */
	@property()
	additionalText!: string;

	/**
	 * Defines the icon source URI to be displayed as graphical element within the component.
	 * The SAP-icons font provides numerous built-in icons.
	 * See all the available icons in the <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html">Icon Explorer</ui5-link>.
	 *
	 * @type {string}
	 * @defaultvalue ""
	 * @public
	 * @name sap.ui.webc.main.Tab.prototype.icon
	 */
	@property()
	icon!: string;

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
	 * @type {sap.ui.webc.main.types.SemanticColor}
	 * @defaultvalue "Default"
	 * @public
	 * @name sap.ui.webc.main.Tab.prototype.design
	 */
	@property({ type: SemanticColor, defaultValue: SemanticColor.Default })
	design!: `${SemanticColor}`;

	/**
	 * Specifies if the component is selected.
	 *
	 * @type {boolean}
	 * @defaultvalue false
	 * @public
	 * @name sap.ui.webc.main.Tab.prototype.selected
	 */
	@property({ type: Boolean })
	selected!: boolean;

	@property({ type: Boolean })
	_selected!: boolean;

	@property({ type: Object })
	_realTab!: Tab;

	@property({ type: Boolean })
	_isTopLevelTab!: boolean;

	/**
	 * Holds the content associated with this tab.
	 *
	 * @type {Node[]}
	 * @public
	 * @slot
	 * @name sap.ui.webc.main.Tab.prototype.default
	 */
	@slot({
		type: Node,
		"default": true,
		invalidateOnChildChange: {
			properties: true,
			slots: false,
		},
	})
	content!: Array<Node>;

	/**
	 * Defines hierarchies with nested sub tabs.
	 * <br><br>
	 * <b>Note:</b> Use <code>ui5-tab</code> and <code>ui5-tab-separator</code> for the intended design.
	 *
	 * @type {sap.ui.webc.main.ITab[]}
	 * @public
	 * @slot subTabs
	 * @name sap.ui.webc.main.Tab.prototype.subTabs
	 */
	@slot({
		type: HTMLElement,
		individualSlots: true,
		invalidateOnChildChange: {
			properties: true,
			slots: false,
		},
	})
	subTabs!: Array<ITab>

	_isInline?: boolean;
	_mixedMode?: boolean;
	_getElementInStrip?: () => ITab | null;
	_individualSlot!: string;

	static i18nBundle: I18nBundle;

	set _tabIndex(val: string) {
		this.getTabInStripDomRef()!.setAttribute("tabindex", val);
	}

	get _tabIndex() {
		return this.getTabInStripDomRef()!.getAttribute("tabindex")!;
	}

	get displayText() {
		let text = this.text;

		if (this._isInline && this.additionalText) {
			text += ` (${this.additionalText})`;
		}

		return text;
	}

	get isSeparator() {
		return false;
	}

	get stripPresentation() {
		return executeTemplate(Tab.stripTemplate, this);
	}

	get overflowPresentation() {
		return executeTemplate(Tab.overflowTemplate, this);
	}

	get stableDomRef() {
		return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
	}

	get requiresExpandButton() {
		return this.subTabs.length > 0 && this._isTopLevelTab && this._hasOwnContent;
	}

	get isSingleClickArea() {
		return this.subTabs.length > 0 && this._isTopLevelTab && !this._hasOwnContent;
	}

	get isOnSelectedTabPath(): boolean {
		return this._realTab === this || this.tabs.some(subTab => subTab.isOnSelectedTabPath);
	}

	get _effectiveSlotName() {
		return this.isOnSelectedTabPath ? this._individualSlot : `disabled-${this._individualSlot}`;
	}

	get _defaultSlotName() {
		return this._realTab === this ? "" : "disabled-slot";
	}

	get _hasOwnContent() {
		return willShowContent(this.content);
	}

	/**
	 * Returns the DOM reference of the tab that is placed in the header.
	 * <b>Note:</b> Tabs, placed in the <code>subTabs</code> slot of other tabs are not shown in the header. Calling this method on such tabs will return <code>null</code>.
	 * <b>Note:</b> If you need a DOM ref to the tab content please use the <code>getDomRef</code> method.
	 *
	 * @function
	 * @public
     * @name sap.ui.webc.main.Tab.prototype.getTabInStripDomRef
	 * @since 1.0.0-rc.16
	 */
	getTabInStripDomRef() {
		if (this._getElementInStrip) {
			return this._getElementInStrip();
		}

		return null;
	}

	getFocusDomRef() {
		let focusedDomRef = super.getFocusDomRef();

		if (this._getElementInStrip && this._getElementInStrip()) {
			focusedDomRef = this._getElementInStrip()!;
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
		const subItemSelected = this.tabs.some(elem => elem.effectiveSelected);
		return this.selected || this._selected || subItemSelected;
	}

	get effectiveHidden() {
		return !this.effectiveSelected;
	}

	get tabs(): Array<Tab> {
		return this.subTabs.filter((tab): tab is Tab => !tab.isSeparator);
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

		if (this._designDescription) {
			labels.push(`${this._id}-designDescription`);
		}

		return labels.join(" ");
	}

	get stripClasses() {
		const classes = ["ui5-tab-strip-item"];

		if (this.effectiveSelected) {
			classes.push("ui5-tab-strip-item--selected");
		}

		if (this.disabled) {
			classes.push("ui5-tab-strip-item--disabled");
		}

		if (this._isInline) {
			classes.push("ui5-tab-strip-item--inline");
		}

		if (this.additionalText) {
			classes.push("ui5-tab-strip-item--withAdditionalText");
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

		if (this.isSingleClickArea) {
			classes.push(`ui5-tab-strip-item--singleClickArea`);
		}

		return {
			itemClasses: classes.join(" "),
			additionalTextClasses: this.additionalTextClasses,
		};
	}

	get additionalTextClasses() {
		const classes = [];
		if (this.additionalText) {
			classes.push("ui5-tab-strip-itemAdditionalText");
		}

		if (this.icon && !this.additionalText) {
			classes.push("ui5-tab-strip-itemAdditionalText-hidden");
		}

		return classes.join(" ");
	}

	get expandButtonTitle() {
		return Tab.i18nBundle.getText(TABCONTAINER_END_OVERFLOW);
	}

	get _roleDescription() {
		return this.subTabs.length > 0 ? Tab.i18nBundle.getText(TAB_SPLIT_ROLE_DESCRIPTION) : undefined;
	}

	get _ariaHasPopup() {
		return this.isSingleClickArea ? "menu" : undefined;
	}

	get semanticIconName() {
		switch (this.design) {
		case SemanticColor.Positive:
			return "sys-enter-2";
		case SemanticColor.Negative:
			return "error";
		case SemanticColor.Critical:
			return "alert";
		default:
			return null;
		}
	}

	get _designDescription() {
		if (this.design === SemanticColor.Default) {
			return null;
		}

		return Tab.i18nBundle.getText(DESIGN_DESCRIPTIONS[this.design]);
	}

	get semanticIconClasses() {
		const classes = ["ui5-tab-semantic-icon"];

		if (this.design !== SemanticColor.Default && this.design !== SemanticColor.Neutral) {
			classes.push(`ui5-tab-semantic-icon--${this.design.toLowerCase()}`);
		}

		return classes.join(" ");
	}

	get overflowClasses() {
		const classes = ["ui5-tab-overflow-item"];

		if (this.design !== SemanticColor.Default && this.design !== SemanticColor.Neutral) {
			classes.push(`ui5-tab-overflow-item--${this.design.toLowerCase()}`);
		}

		if (this.effectiveDisabled) {
			classes.push("ui5-tab-overflow-item--disabled");
		}

		if (this.selected) {
			classes.push("ui5-tab-overflow-item--selectedSubTab");
		}

		return classes.join(" ");
	}

	get overflowState() {
		return (this.disabled || this.isSingleClickArea) ? ListItemType.Inactive : ListItemType.Active;
	}

	static get stripTemplate() {
		return TabInStripTemplate;
	}

	static get overflowTemplate() {
		return TabInOverflowTemplate;
	}

	static async onDefine() {
		Tab.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

Tab.define();

TabContainer.registerTabStyles(stripCss);
TabContainer.registerStaticAreaTabStyles(overflowCss);

export default Tab;
