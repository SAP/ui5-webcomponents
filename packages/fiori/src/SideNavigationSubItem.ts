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
 * @extends UI5Element
 * @public
 * @abstract
 * @since 1.0.0-rc.8
 */
@customElement("ui5-side-navigation-sub-item")
/**
 * Fired when the component is activated either with a
 * click/tap or by using the Enter or Space key.
 *
 * @public
 */
@event("click")
class SideNavigationSubItem extends UI5Element {
	/**
	 * Defines the text of the item.
	 *
	 * @public
	 * @type {string}
	 * @default ""
	 */
	@property()
	text!: string;

	/**
	 * Defines whether the subitem is selected.
	 *
	 * @public
	 * @type {boolean}
	 * @default false
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
	 * @default ""
	 */
	@property()
	icon!: string;

	/**
	 * Defines the tooltip of the component.
	 * @type {string}
	 * @default ""
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
