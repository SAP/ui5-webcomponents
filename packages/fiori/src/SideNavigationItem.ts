import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRender from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import bound from "@ui5/webcomponents-base/dist/decorators/bound.js";
import { isLeft, isRight } from "@ui5/webcomponents-base/dist/Keys.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import "@ui5/webcomponents-icons/dist/circle-task-2.js";
import "@ui5/webcomponents-icons/dist/arrow-right.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import type SideNavigationItemBase from "./SideNavigationItemBase.js";
import SideNavigationSelectableItemBase from "./SideNavigationSelectableItemBase.js";
import type SideNavigation from "./SideNavigation.js";
import type SideNavigationSubItem from "./SideNavigationSubItem.js";
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
	dependencies: [
		Icon,
	],
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

	get overflowItems() : Array<SideNavigationItem> {
		return [this];
	}

	get selectableItems() : Array<SideNavigationSelectableItemBase> {
		return [this, ...this.items];
	}

	get focusableItems() : Array<SideNavigationItemBase> {
		if (this.sideNavCollapsed) {
			return [this];
		}

		if (this.expanded) {
			return [this, ...this.items];
		}

		return [this];
	}

	get allItems() : Array<SideNavigationItemBase> {
		return [this, ...this.items];
	}

	get _ariaHasPopup() {
		if (!this.disabled && this.sideNavCollapsed && this.items.length) {
			return "tree";
		}

		return undefined;
	}

	get _ariaChecked() {
		if (this.isOverflow) {
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

	get _toggleIconName() {
		return this.expanded ? "navigation-down-arrow" : "navigation-right-arrow";
	}

	get classesArray() {
		const classes = super.classesArray;

		if (!this.disabled && (this.parentNode as SideNavigation).collapsed && this.items.length) {
			classes.push("ui5-sn-item-with-expander");
		}

		if (this._fixed) {
			classes.push("ui5-sn-item-fixed");
		}

		return classes;
	}

	get _selected() {
		if (this.sideNavCollapsed) {
			return this.selected || this.items.some(item => item.selected);
		}

		return this.selected;
	}

	@bound
	_onToggleClick(e: PointerEvent) {
		e.stopPropagation();

		this.expanded = !this.expanded;
	}

	@bound
	_onkeydown (e: KeyboardEvent) {
		if (isLeft(e)) {
			this.expanded = false;
			return;
		}

		if (isRight(e)) {
			this.expanded = true;
			return;
		}

		super._onkeydown(e);
	}

	@bound
	_onkeyup(e: KeyboardEvent) {
		super._onkeyup(e);
	}

	@bound
	_onfocusin(e: FocusEvent) {
		super._onfocusin(e);
	}

	@bound
	_onclick(e: MouseEvent) {
		super._onclick(e);
	}

	@bound
	_onfocusout() {
		if (!this.sideNavCollapsed) {
			return;
		}

		this.getDomRef()!.classList.remove("ui5-sn-item-no-hover-effect");
	}

	@bound
	_onmouseenter() {
		if (!this.sideNavCollapsed) {
			return;
		}

		this.getDomRef()!.classList.remove("ui5-sn-item-no-hover-effect");
	}

	@bound
	_onmouseleave() {
		if (!this.sideNavCollapsed || !this._selected) {
			return;
		}

		this.getDomRef()!.classList.add("ui5-sn-item-no-hover-effect");
	}

	get isSideNavigationItem() {
		return true;
	}
}

SideNavigationItem.define();

const isInstanceOfSideNavigationItem = (object: any): object is SideNavigationItem => {
	return "isSideNavigationItem" in object;
};

export default SideNavigationItem;
export { isInstanceOfSideNavigationItem };
