import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-side-navigation-sub-item</code> is intended to be used inside a <code>ui5-side-navigation-item</code> only.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.fiori.SideNavigationSubItem
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-side-navigation-sub-item
 * @public
 * @abstract
 * @implements sap.ui.webc.fiori.ISideNavigationSubItem
 * @since 1.0.0-rc.8
 */
@customElement("ui5-side-navigation-sub-item")
/**
 * Fired when the component is activated either with a
 * click/tap or by using the Enter or Space key.
 *
 * @event sap.ui.webc.fiori.SideNavigationSubItem#click
 * @public
 */
@event("click")
class SideNavigationSubItem extends UI5Element {
	/**
	 * Defines the text of the item.
	 *
	 * @public
	 * @type {string}
	 * @defaultvalue ""
	 * @name sap.ui.webc.fiori.SideNavigationSubItem.prototype.text
	 */
	@property()
	text!: string;

	/**
	 * Defines whether the subitem is selected.
	 *
	 * @public
	 * @type {boolean}
	 * @defaultvalue false
	 * @name sap.ui.webc.fiori.SideNavigationSubItem.prototype.selected
	 */
	@property({ type: Boolean })
	selected!: boolean;

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
	 * @name sap.ui.webc.fiori.SideNavigationSubItem.prototype.icon
	 */
	@property()
	icon!: string;

	/**
	 * Defines the tooltip of the component.
	 * @type {string}
	 * @defaultvalue ""
	 * @name sap.ui.webc.fiori.SideNavigationSubItem.prototype.title
	 * @private
	 * @since 1.0.0-rc.16
	 */
	@property()
	title!: string

	get _tooltip() {
		return this.title || this.text;
	}
}

SideNavigationSubItem.define();

export default SideNavigationSubItem;
