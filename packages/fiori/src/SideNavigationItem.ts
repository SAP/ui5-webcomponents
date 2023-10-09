import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import HasPopup from "@ui5/webcomponents/dist/types/HasPopup.js";
import SideNavigationItemBase from "./SideNavigationItemBase.js";
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
 * @extends sap.ui.webc.fiori.SideNavigationItemBase
 * @abstract
 * @tagname ui5-side-navigation-item
 * @public
 * @implements sap.ui.webc.fiori.ISideNavigationItem
 * @since 1.0.0-rc.8
 */
@customElement("ui5-side-navigation-item")
class SideNavigationItem extends SideNavigationItemBase {
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

	get _ariaHasPopup() {
		if ((this.parentNode as SideNavigation).collapsed && this.items.length) {
			return HasPopup.Tree;
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

	get _collapsedClassName() {
		return this.items.length && !this.expanded ? "ui5-sn-list-li-collapsed" : "";
	}

	getDomRef() {
		return this.parentElement!.shadowRoot!.querySelector(`#${this._id}`) as HTMLElement;
	}

	_onToggleClick = () => {
		this.expanded = !this.expanded;
	}
}

SideNavigationItem.define();

export default SideNavigationItem;
