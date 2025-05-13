import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRender from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	isLeft,
	isRight,
	isSpace,
	isEnter,
	isMinus,
	isPlus,
} from "@ui5/webcomponents-base/dist/Keys.js";
import type SideNavigationItemBase from "./SideNavigationItemBase.js";
import SideNavigationSelectableItemBase from "./SideNavigationSelectableItemBase.js";
import type SideNavigationSubItem from "./SideNavigationSubItem.js";
import {
	SIDE_NAVIGATION_ICON_COLLAPSE,
	SIDE_NAVIGATION_ICON_EXPAND,
} from "./generated/i18n/i18n-defaults.js";

// Templates
import SideNavigationItemTemplate from "./SideNavigationItemTemplate.js";

// Styles
import SideNavigationItemCss from "./generated/themes/SideNavigationItem.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * Represents a navigation action. It can provide sub items.
 * The `ui5-side-navigation-item` is used within `ui5-side-navigation` or `ui5-side-navigation-group` only.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";`
 *
 * @constructor
 * @extends SideNavigationSelectableItemBase
 * @abstract
 * @public
 * @since 1.0.0-rc.8
 */
@customElement({
	tag: "ui5-side-navigation-item",
	renderer: jsxRender,
	template: SideNavigationItemTemplate,
	styles: SideNavigationItemCss,
})
class SideNavigationItem extends SideNavigationSelectableItemBase {
	/**
	 * Defines if the item is expanded
	 *
	 * @public
	 * @default false
	 */
	@property({ type: Boolean })
	expanded = false;

	/**
	 * Defines if the item should be collapsible or not.
	 * It is true, for example, for the items inside the Popover of the Side Navigation
	 * @private
	 * @default false
	 * @since 1.10.0
	 */
	@property({ type: Boolean })
	_fixed = false;

	/**
     * Defines nested items by passing `ui5-side-navigation-sub-item` to the default slot.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
	items!: Array<SideNavigationSubItem>;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	get overflowItems() : Array<SideNavigationItem> {
		return [this];
	}

	get selectableItems() : Array<SideNavigationSelectableItemBase> {
		if (this.inPopover && this.unselectable && this.items.length) {
			return [...this.items];
		}

		return [this, ...this.items];
	}

	get focusableItems() : Array<SideNavigationItemBase> {
		if (this.sideNavCollapsed) {
			return [this];
		}

		if (this.inPopover && this.unselectable && this.items.length) {
			return [...this.items];
		}

		if (this.expanded) {
			return [this, ...this.items];
		}

		return [this];
	}

	get allItems() : Array<SideNavigationItemBase> {
		return [this, ...this.items];
	}

	get effectiveTabIndex() {
		if (this.inPopover && this.unselectable) {
			return undefined;
		}

		return super.effectiveTabIndex;
	}

	get _ariaHasPopup() {
		if (this.inPopover && this.accessibilityAttributes?.hasPopup) {
			return this.accessibilityAttributes.hasPopup;
		}

		if (!this.disabled && this.sideNavCollapsed && this.items.length) {
			return "tree";
		}

		return undefined;
	}

	get _ariaChecked() {
		if (this.isOverflow || this.unselectable) {
			return undefined;
		}

		return this.selected;
	}

	get _groupId() {
		if (!this.items.length) {
			return undefined;
		}

		return `${this._id}-group`;
	}

	get _expanded() {
		if (!this.items.length) {
			return undefined;
		}

		return this.expanded;
	}

	get classesArray() {
		const classes = super.classesArray;

		if (!this.disabled && this.sideNavigation?.collapsed && this.items.length) {
			classes.push("ui5-sn-item-with-expander");
		}

		if (this._fixed) {
			classes.push("ui5-sn-item-fixed");
		}

		return classes;
	}

	get _selected() {
		if (this.sideNavCollapsed || !this.expanded) {
			return this.selected || this.items.some(item => item.selected);
		}

		return this.selected;
	}

	get _arrowTooltip() {
		return this.expanded ? SideNavigationItem.i18nBundle.getText(SIDE_NAVIGATION_ICON_COLLAPSE)
			: SideNavigationItem.i18nBundle.getText(SIDE_NAVIGATION_ICON_EXPAND);
	}

	applyInitialFocusInPopover() {
		if (this.unselectable && this.items.length) {
			this.items[0]?.focus();
		} else {
			this.focus();
		}
	}

	_onToggleClick(e: CustomEvent) {
		e.stopPropagation();

		this._toggle();
	}

	_onkeydown(e: KeyboardEvent) {
		if (isLeft(e) || isMinus(e)) {
			this.expanded = false;
			return;
		}

		if (isRight(e) || isPlus(e)) {
			this.expanded = true;
			return;
		}

		if (this.unselectable && isSpace(e)) {
			this._toggle();
			return;
		}

		if (this.unselectable && isEnter(e)) {
			this._toggle();
		}

		super._onkeydown(e);
	}

	_onkeyup(e: KeyboardEvent) {
		super._onkeyup(e);
	}

	_onfocusin(e: FocusEvent) {
		if (this.inPopover && this.unselectable && this.items.length) {
			this.sideNavigation?.focusItem(this.items[0]);
		} else {
			super._onfocusin(e);
		}
	}

	_onclick(e: MouseEvent) {
		if (!this.inPopover && this.unselectable) {
			this._toggle();
		}

		super._onclick(e);
	}

	_onfocusout() {
		if (!this.sideNavCollapsed) {
			return;
		}

		this.getDomRef()!.classList.remove("ui5-sn-item-no-hover-effect");
	}

	_onmouseenter() {
		if (!this.sideNavCollapsed) {
			return;
		}

		this.getDomRef()!.classList.remove("ui5-sn-item-no-hover-effect");
	}

	_onmouseleave() {
		if (!this.sideNavCollapsed || !this._selected) {
			return;
		}

		this.getDomRef()!.classList.add("ui5-sn-item-no-hover-effect");
	}

	get isSideNavigationItem() {
		return true;
	}

	_toggle() {
		if (this.items.length) {
			this.expanded = !this.expanded;
		}
	}
}

SideNavigationItem.define();

const isInstanceOfSideNavigationItem = (object: any): object is SideNavigationItem => {
	return "isSideNavigationItem" in object;
};

export default SideNavigationItem;
export { isInstanceOfSideNavigationItem };
