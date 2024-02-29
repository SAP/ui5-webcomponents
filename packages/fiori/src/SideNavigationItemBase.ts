import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type SideNavigation from "./SideNavigation.js";

/**
 * Fired when the component is activated either with a
 * click/tap or by using the Enter or Space key.
 *
 * @public
 */
@event("click")

/**
 * @class
 * A class to serve as a foundation
 * for the `SideNavigationItem` and `SideNavigationSubItem` classes.
 *
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 * @since 1.19.0
 */
class SideNavigationItemBase extends UI5Element implements ITabbable {
	/**
	 * Defines the text of the item.
	 *
	 * @public
	 * @default ""
	 */
	@property()
	text!: string;

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
	 * Defines whether the component is disabled.
	 * A disabled component can't be pressed or
	 * focused, and it is not in the tab chain.
	 *
	 * @default false
	 * @public
	 * @since 1.19.0
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines the tooltip of the component.
	 * @default ""
	 * @private
	 * @since 1.0.0-rc.16
	 */
	@property()
	title!: string;

	@property({ defaultValue: "-1", noAttribute: true })
	forcedTabIndex!: string;

	get _tooltip() {
		return this.title || this.text;
	}

	get _href() {
		return (!this.disabled && this.href) ? this.href : undefined;
	}

	get _target() {
		return (!this.disabled && this.target) ? this.target : undefined;
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

	get _effectiveTabIndex() {
		if (this.disabled) {
			return undefined;
		}

		return this.forcedTabIndex;
	}

	get _isExternalLink() {
		return this.href && this.target === "_blank";
	}

	get sideNavigation() : SideNavigation | undefined {
		let parentElement = this.parentElement;

		while (parentElement) {
			if (parentElement.hasAttribute("ui5-side-navigation")) {
				return parentElement as SideNavigation;
			}

			parentElement = parentElement.parentElement;
		}
	}

	getDomRef() {
		return this.sideNavigation?.shadowRoot!.querySelector(`#${this._id}`) as HTMLElement;
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

	get isFixedItem() {
		return true;
	}

	_onfocusin(e: FocusEvent) {
		e.stopPropagation();

		this.sideNavigation?.focusItem(this);
	}

	_activate(e: KeyboardEvent | PointerEvent) {
		this.sideNavigation?._handleItemClick(e, this);
	}
}

export default SideNavigationItemBase;
