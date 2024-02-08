import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import { isLeft, isRight } from "@ui5/webcomponents-base/dist/Keys.js";
import SideNavigationSelectableItemBase from "./SideNavigationSelectableItemBase.js";
import type SideNavigation from "./SideNavigation.js";
import type SideNavigationSubItem from "./SideNavigationSubItem.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-side-navigation-item</code> is used within <code>ui5-side-navigation</code> only.
 * Via the <code>ui5-side-navigation-item</code> you control the content of the <code>SideNavigation</code>.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";</code>
 *
 * @constructor
 * @extends SideNavigationSelectableItemBase
 * @abstract
 * @public
 * @since 1.0.0-rc.8
 */
@customElement("ui5-side-navigation-item")
class SideNavigationItem extends SideNavigationSelectableItemBase {
	/**
	 * Defines if the item is expanded
	 *
	 * @public
	 * @default false
	 */
	@property({ type: Boolean })
	expanded!: boolean;

	/**
	 * Defines if the item should be collapsible or not.
	 * It is true, for example, for the items inside the Popover of the Side Navigation
	 * @private
	 * @default false
	 * @since 1.10.0
	 */
	@property({ type: Boolean })
	_fixed!: boolean;

	/**
     * Defines nested items by passing <code>ui5-side-navigation-sub-item</code> to the default slot.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
	items!: Array<SideNavigationSubItem>;

	/**
	 * Defines whether clicking the whole item or only pressing the icon will show/hide the sub items (if present).
	 * If set to true, clicking the whole item will toggle the sub items, and it won't fire the <code>click</code> event.
	 * By default, only clicking the arrow icon will toggle the sub items.
	 *
	 * @public
	 * @default false
	 * @since 1.0.0-rc.11
	 */
	@property({ type: Boolean })
	wholeItemToggleable!: boolean;

	get _ariaHasPopup() {
		if (!this.disabled && (this.parentNode as SideNavigation).collapsed && this.items.length) {
			return "tree";
		}

		return undefined;
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
		if (this.sideNavigation?.collapsed) {
			return this.selected || this.items.some(item => item.selected);
		}

		return this.selected;
	}

	get isFixedItem() {
		return this.slot === "fixedItems";
	}

	_onToggleClick = (e: PointerEvent) => {
		e.stopPropagation();

		this.expanded = !this.expanded;
	}

	_onkeydown = (e: KeyboardEvent) => {
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

	_onkeyup = (e: KeyboardEvent) => {
		super._onkeyup(e);
	}

	_onfocusin = (e: FocusEvent) => {
		super._onfocusin(e);
	}

	_onclick = (e: PointerEvent) => {
		if (!this.sideNavigation?.collapsed
			&& this.wholeItemToggleable
			&& e.pointerType === "mouse") {
			e.preventDefault();
			e.stopPropagation();
			this.expanded = !this.expanded;
			return;
		}

		super._onclick(e);
	}

	_onfocusout = () => {
		if (!this.sideNavigation?.collapsed) {
			return;
		}

		this.getDomRef().classList.remove("ui5-sn-item-no-hover-effect");
	}

	_onmouseenter = () => {
		if (!this.sideNavigation?.collapsed) {
			return;
		}

		this.getDomRef().classList.remove("ui5-sn-item-no-hover-effect");
	}

	_onmouseleave = () => {
		if (!this.sideNavigation?.collapsed || !this._selected) {
			return;
		}

		this.getDomRef().classList.add("ui5-sn-item-no-hover-effect");
	}
}

SideNavigationItem.define();

export default SideNavigationItem;
