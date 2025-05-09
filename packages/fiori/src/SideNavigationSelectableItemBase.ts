import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import SideNavigationItemBase from "./SideNavigationItemBase.js";
import type SideNavigationItemDesign from "./types/SideNavigationItemDesign.js";
import type { AccessibilityAttributes } from "@ui5/webcomponents-base/dist/types.js";

type SideNavigationItemAccessibilityAttributes = Pick<AccessibilityAttributes, "hasPopup">;

/**
 * Fired when the component is activated either with a click/tap or by using the [Enter] or [Space] keys.
 *
 * @public
 */
@event("click", {
	bubbles: true,
})

/**
 * @class
 * Base class for the navigation items that support actions.
 *
 * @constructor
 * @extends SideNavigationItemBase
 * @abstract
 * @public
 * @since 1.24.0
 */
@customElement()
class SideNavigationSelectableItemBase extends SideNavigationItemBase {
	eventDetails!: SideNavigationItemBase["eventDetails"] & {
		"click": void
	}
	/**
	 * Defines the icon of the item.
	 *
	 * The SAP-icons font provides numerous options.
	 *
	 * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @public
	 * @default undefined
	 */
	@property()
	icon?: string;

	/**
	 * Defines whether the item is selected
	 *
	 * @public
	 * @default false
	 */
	@property({ type: Boolean })
	selected = false;

	/**
	 * Defines the link target URI. Supports standard hyperlink behavior.
	 * If a JavaScript action should be triggered,
	 * this should not be set, but instead an event handler
	 * for the `click` event should be registered.
	 *
	 * @public
	 * @default undefined
	 * @since 1.19.0
	 */
	@property()
	href?: string;

	/**
	 * Defines the component target.
	 *
	 * **Notes:**
	 *
	 * - `_self`
	 * - `_top`
	 * - `_blank`
	 * - `_parent`
	 * - `_search`
	 *
	 * **This property must only be used when the `href` property is set.**
	 *
	 * @public
	 * @default undefined
	 * @since 1.19.0
	 */
	@property()
	target?: string;

	/**
	 * Item design.
	 *
	 * **Note:** Items with "Action" design must not have sub-items.
	 *
	 * @public
	 * @default "Default"
	 * @since 2.7.0
	 */
	@property()
	design: `${SideNavigationItemDesign}` = "Default";

	/**
	 * Indicates whether the navigation item is selectable. By default all items are selectable unless specifically marked as unselectable.
	 *
	 * When a parent item is marked as unselectable, selecting it will only expand or collapse its sub-items.
	 * To improve user experience do not mix unselectable parent items with selectable parent items in a single side navigation.
	 *
	 *
	 * **Guidelines**:
	 * - External links should be unselectable.
	 * - Items that trigger actions (with design "Action") should be unselectable.
	 *
	 * @public
	 * @default false
	 * @since 2.7.0
	 */
	@property({ type: Boolean })
	unselectable = false;

	/**
	 * Defines the additional accessibility attributes that will be applied to the component.
	 * The following fields are supported:
	 *
	 * - **hasPopup**: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button.
	 * Accepts the following string values: `dialog`, `grid`, `listbox`, `menu` or `tree`.
	 *
	 * **Note:** Do not use it on parent items, as it will be overridden if the item is in the overflow menu.
	 *
	 * @public
	 * @default {}
	 * @since 2.7.0
	 */
	@property({ type: Object })
	accessibilityAttributes: SideNavigationItemAccessibilityAttributes = {};

	/**
	 * @private
	 * @default false
	 */
	@property({ type: Boolean })
	isOverflow = false;

	get ariaRole() {
		if (this.sideNavCollapsed) {
			return this.unselectable ? "menuitem" : "menuitemradio";
		}

		return "treeitem";
	}

	get isSelectable() {
		return !this.unselectable && !this.disabled;
	}

	get _href() {
		return (!this.disabled && this.href) ? this.href : undefined;
	}

	get _target() {
		return (!this.disabled && this.target) ? this.target : undefined;
	}

	get isExternalLink() {
		return this.href && this.target === "_blank";
	}

	get _selected() {
		return this.selected;
	}

	get classesArray() {
		const classes = [];

		if (this.disabled) {
			classes.push("ui5-sn-item-disabled");
		}

		if (this._selected) {
			classes.push("ui5-sn-item-selected");
		}

		return classes;
	}

	get _classes() {
		return this.classesArray.join(" ");
	}

	get _ariaCurrent() {
		if (!this.selected) {
			return undefined;
		}

		return "page";
	}

	_onkeydown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
		}

		if (isEnter(e)) {
			this._activate(e);
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._activate(e);

			if (this.href && !e.defaultPrevented) {
				const customEvent = new MouseEvent("click");

				customEvent.stopImmediatePropagation();
				if (this.getDomRef()!.querySelector("a")) {
					this.getDomRef()!.querySelector("a")!.dispatchEvent(customEvent);
				} else {
					// when Side Navigation is collapsed and it is first level item we have directly <a> element
					this.getDomRef()!.dispatchEvent(customEvent);
				}
			}
		}
	}

	_onclick(e: MouseEvent) {
		this._activate(e);
	}

	_onfocusin(e: FocusEvent) {
		e.stopPropagation();

		this.sideNavigation?.focusItem(this);
	}

	_activate(e: KeyboardEvent | MouseEvent) {
		e.stopPropagation();

		if (this.isOverflow) {
			this.fireDecoratorEvent("click");
		} else {
			this.sideNavigation?._handleItemClick(e, this);
		}
	}

	get isSideNavigationSelectableItemBase() {
		return true;
	}
}

const isInstanceOfSideNavigationSelectableItemBase = (object: any): object is SideNavigationSelectableItemBase => {
	return "isSideNavigationSelectableItemBase" in object;
};

export default SideNavigationSelectableItemBase;
export {
	isInstanceOfSideNavigationSelectableItemBase,
};
export type {
	SideNavigationItemAccessibilityAttributes,
};
