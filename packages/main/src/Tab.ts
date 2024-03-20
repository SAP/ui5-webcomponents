import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import executeTemplate from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";
import willShowContent from "@ui5/webcomponents-base/dist/util/willShowContent.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
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
import type { ITab, ITabPresentationInStripInfo } from "./TabContainer.js";
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
import draggableElementStyles from "./generated/themes/DraggableElement.css.js";
import overflowCss from "./generated/themes/TabInOverflow.css.js";

const DESIGN_DESCRIPTIONS = {
	[SemanticColor.Positive]: TAB_ARIA_DESIGN_POSITIVE,
	[SemanticColor.Negative]: TAB_ARIA_DESIGN_NEGATIVE,
	[SemanticColor.Neutral]: TAB_ARIA_DESIGN_NEUTRAL,
	[SemanticColor.Critical]: TAB_ARIA_DESIGN_CRITICAL,
};

/**
 * @class
 * The `ui5-tab` represents a selectable item inside a `ui5-tabcontainer`.
 * It defines both the item in the tab strip (top part of the `ui5-tabcontainer`) and the
 * content that is presented to the user once the tab is selected.
 * @abstract
 * @constructor
 * @extends UI5Element
 * @implements {ITab}
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
	 * @default ""
	 * @public
	 */
	@property()
	text!: string;

	/**
	 * Disabled tabs can't be selected.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Represents the "additionalText" text, which is displayed in the tab. In the cases when in the same time there are tabs with icons and tabs without icons, if a tab has no icon the "additionalText" is displayed larger.
	 * @default ""
	 * @public
	 */
	@property()
	additionalText!: string;

	/**
	 * Defines the icon source URI to be displayed as graphical element within the component.
	 * The SAP-icons font provides numerous built-in icons.
	 * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default ""
	 * @public
	 */
	@property()
	icon!: string;

	/**
	 * Defines the component's design color.
	 *
	 * The design is applied to:
	 *
	 * - the component icon
	 * - the `text` when the component overflows
	 * - the tab selection line
	 *
	 * Available designs are: `"Default"`, `"Neutral"`, `"Positive"`, `"Critical"` and `"Negative"`.
	 *
	 * **Note:** The design depends on the current theme.
	 * @default "Default"
	 * @public
	 */
	@property({ type: SemanticColor, defaultValue: SemanticColor.Default })
	design!: `${SemanticColor}`;

	/**
	 * Specifies if the component is selected.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected!: boolean;

	/**
	 * Defines if the tab is movable.
	 *
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	movable!: boolean;

	@property({ type: Boolean })
	forcedSelected!: boolean;

	@property({ type: Object, defaultValue: null })
	realTabReference!: Tab;

	/**
	 * Holds the content associated with this tab.
	 * @public
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
	 *
	 * **Note:** Use `ui5-tab` and `ui5-tab-separator` for the intended design.
	 * @public
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
	_forcedMixedMode?: boolean;
	_forcedPosinset?: number;
	_forcedSetsize?: number;
	_isTopLevelTab?: boolean;
	getElementInStrip?: () => ITab | null;
	_individualSlot!: string;

	static i18nBundle: I18nBundle;

	set forcedTabIndex(val: string) {
		this.getTabInStripDomRef()!.setAttribute("tabindex", val);
	}

	get forcedTabIndex() {
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
		return this.subTabs.length > 0 && this._isTopLevelTab && this.hasOwnContent;
	}

	get isSingleClickArea() {
		return this.subTabs.length > 0 && this._isTopLevelTab && !this.hasOwnContent;
	}

	get isTwoClickArea() {
		return this.subTabs.length > 0 && this._isTopLevelTab && this.hasOwnContent;
	}

	get isOnSelectedTabPath(): boolean {
		return this.selected || this.tabs.some(subTab => subTab.isOnSelectedTabPath);
	}

	get _effectiveSlotName() {
		return this.isOnSelectedTabPath ? this._individualSlot : `disabled-${this._individualSlot}`;
	}

	get _defaultSlotName() {
		return this.selected ? "" : "disabled-slot";
	}

	get hasOwnContent() {
		return willShowContent(this.content);
	}

	receiveStripPresentationInfo(info: ITabPresentationInStripInfo) {
		this._forcedMixedMode = info.mixedMode;
		this._forcedPosinset = info.posinset;
		this._forcedSetsize = info.setsize;
		this._isInline = info.isInline;
		this._isTopLevelTab = info.isTopLevelTab;
	}

	/**
	 * Returns the DOM reference of the tab that is placed in the header.
	 *
	 * **Note:** Tabs, placed in the `subTabs` slot of other tabs are not shown in the header. Calling this method on such tabs will return `null`.
	 *
	 * **Note:** If you need a DOM ref to the tab content please use the `getDomRef` method.
	 * @public
	 * @since 1.0.0-rc.16
	 */
	getTabInStripDomRef(): ITab | null {
		if (this.getElementInStrip) {
			return this.getElementInStrip();
		}

		return null;
	}

	getFocusDomRef() {
		let focusedDomRef = super.getFocusDomRef();

		if (this.getElementInStrip && this.getElementInStrip()) {
			focusedDomRef = this.getElementInStrip()!;
		}

		return focusedDomRef;
	}

	async focus(focusOptions?: FocusOptions): Promise<void> {
		await renderFinished();
		return super.focus(focusOptions);
	}

	get isMixedModeTab() {
		return !this.icon && this._forcedMixedMode;
	}

	get isTextOnlyTab() {
		return !this.icon && !this._forcedMixedMode;
	}

	get isIconTab() {
		return !!this.icon;
	}

	get effectiveDisabled() {
		return this.disabled || undefined;
	}

	get effectiveSelected() {
		const subItemSelected = this.tabs.some(elem => elem.effectiveSelected);
		return this.selected || this.forcedSelected || subItemSelected;
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

		if (!this.icon && !this._forcedMixedMode) {
			classes.push("ui5-tab-strip-item--textOnly");
		}

		if (this.icon) {
			classes.push("ui5-tab-strip-item--withIcon");
		}

		if (!this.icon && this._forcedMixedMode) {
			classes.push("ui5-tab-strip-item--mixedMode");
		}

		if (this.design !== SemanticColor.Default) {
			classes.push(`ui5-tab-strip-item--${this.design.toLowerCase()}`);
		}

		if (this.isSingleClickArea) {
			classes.push(`ui5-tab-strip-item--singleClickArea`);
		}

		if (this.isTwoClickArea) {
			classes.push(`ui5-tab-strip-item--twoClickArea`);
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

	_ondragstart(e: DragEvent) {
		if (e.target instanceof HTMLElement) {
			e.target.setAttribute("data-moving", "");
		}
	}

	_ondragend(e: DragEvent) {
		if (e.target instanceof HTMLElement) {
			e.target.removeAttribute("data-moving");
		}
	}
}

Tab.define();

TabContainer.registerTabStyles(stripCss);
TabContainer.registerTabStyles(draggableElementStyles);
TabContainer.registerStaticAreaTabStyles(overflowCss);

export default Tab;
