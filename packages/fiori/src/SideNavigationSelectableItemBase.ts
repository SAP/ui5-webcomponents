import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import SideNavigationItemBase from "./SideNavigationItemBase.js";

/**
 * Fired when the component is activated either with a
 * click/tap or by using the [Enter] or [Space] keys.
 *
 * @public
 */
@event("click")

/**
 * @class
 * Base class for the navigation items that support actions.
 *
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 * @since 1.24.0
 */
@customElement()
class SideNavigationSelectableItemBase extends SideNavigationItemBase {
	/**
	 * Defines the icon of the item.
	 *
	 * The SAP-icons font provides numerous options.
	 *
	 * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @public
	 * @default ""
	 */
	@property()
	icon!: string;

	/**
	 * Defines whether the item is selected
	 *
	 * @public
	 * @default false
	 */
	@property({ type: Boolean })
	selected!: boolean;

	/**
	 * Defines the link target URI. Supports standard hyperlink behavior.
	 * If a JavaScript action should be triggered,
	 * this should not be set, but instead an event handler
	 * for the `click` event should be registered.
	 *
	 * @public
	 * @default ""
	 * @since 1.19.0
	 */
	@property()
	href!: string;

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
	 * @default ""
	 * @since 1.19.0
	 */
	@property()
	target!: string;

	/**
	 * @private
	 * @default false
	 */
	@property({ type: Boolean })
	isOverflow!: boolean;

	get ariaRole() {
		if (this.sideNavCollapsed) {
			return this.isOverflow ? "menuitem" : "menuitemradio";
		}

		return "treeitem";
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
		}
	}

	_onclick(e: PointerEvent) {
		this._activate(e);
	}

	_onfocusin(e: FocusEvent) {
		e.stopPropagation();

		this.sideNavigation?.focusItem(this);
	}

	_activate(e: KeyboardEvent | PointerEvent) {
		e.stopPropagation();

		if (this.isOverflow) {
			this.fireEvent("click");
		} else {
			this.sideNavigation?._handleItemClick(e, this);
		}
	}
}

export default SideNavigationSelectableItemBase;
