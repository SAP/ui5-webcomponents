import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import HasPopup from "@ui5/webcomponents/dist/types/HasPopup.js";
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
 * @author SAP SE
 * @alias sap.ui.webc.fiori.SideNavigationItem
 * @extends sap.ui.webc.base.UI5Element
 * @abstract
 * @tagname ui5-side-navigation-item
 * @public
 * @implements sap.ui.webc.fiori.ISideNavigationItem
 * @since 1.0.0-rc.8
 */
@customElement("ui5-side-navigation-item")
/**
 * Fired when the component is activated either with a
 * click/tap or by using the Enter or Space key.
 *
 * @event sap.ui.webc.fiori.SideNavigationItem#click
 * @public
 */
@event("click")
class SideNavigationItem extends UI5Element {
	/**
	 * Defines the text of the item.
	 *
	 * @public
	 * @type {string}
	 * @defaultvalue ""
	 * @name sap.ui.webc.fiori.SideNavigationItem.prototype.text
	 */
	@property()
	text!: string;

	/**
	 * Defines the icon of the item.
	 * <br><br>
	 *
	 * The SAP-icons font provides numerous options.
	 * <br>
	 * See all the available icons in the <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html">Icon Explorer</ui5-link>.
	 * @public
	 * @type {string}
	 * @defaultvalue ""
	 * @name sap.ui.webc.fiori.SideNavigationItem.prototype.icon
	 */
	@property()
	icon!: string;

	/**
	 * Defines if the item is expanded
	 *
	 * @public
	 * @type {boolean}
	 * @defaultvalue false
	 * @name sap.ui.webc.fiori.SideNavigationItem.prototype.expanded
	 */
	@property({ type: Boolean })
	expanded!: boolean;

	/**
	 * Defines whether the subitem is selected
	 *
	 * @public
	 * @type {boolean}
	 * @defaultvalue false
	 * @name sap.ui.webc.fiori.SideNavigationItem.prototype.selected
	 */
	@property({ type: Boolean })
	selected!: boolean;

	/**
	 * Defines whether pressing the whole item or only pressing the icon will show/hide the items's sub items(if present).
	 * If set to true, pressing the whole item will toggle the sub items, and it won't fire the <code>click</code> event.
	 * By default, only pressing the arrow icon will toggle the sub items & the click event will be fired if the item is pressed outside of the icon.
	 *
	 * @public
	 * @type {boolean}
	 * @defaultvalue false
	 * @name sap.ui.webc.fiori.SideNavigationItem.prototype.wholeItemToggleable
	 * @since 1.0.0-rc.11
	 */
	@property({ type: Boolean })
	wholeItemToggleable!: boolean;

	/**
	 * Defines the tooltip of the component.
	 * @type {string}
	 * @defaultvalue ""
	 * @private
	 * @name sap.ui.webc.fiori.SideNavigationItem.prototype.title
	 * @since 1.0.0-rc.16
	 */
	@property()
	title!: string;

	/**
	 * Defines if the item should be collapsible or not.
	 * It is true, for example, for the items inside the Popover of the Side Navigation
	 * @private
	 * @type {boolean}
	 * @defaultvalue false
	 * @name sap.ui.webc.fiori.SideNavigationItem.prototype._fixed
	 * @since 1.10.0
	 */
	@property({ type: Boolean })
	_fixed!: boolean;

	/**
     * Defines nested items by passing <code>ui5-side-navigation-sub-item</code> to the default slot.
	 *
	 * @type {sap.ui.webc.fiori.ISideNavigationSubItem[]}
	 * @public
	 * @slot items
	 * @name sap.ui.webc.fiori.SideNavigationItem.prototype.default
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
	items!: Array<SideNavigationSubItem>;

	get _tooltip() {
		return this.title || this.text;
	}

	get _ariaHasPopup() {
		if ((this.parentNode as SideNavigation).collapsed && this.items.length) {
			return HasPopup.Tree;
		}

		return undefined;
	}
}

SideNavigationItem.define();

export default SideNavigationItem;
