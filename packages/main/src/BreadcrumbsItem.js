import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
* @public
*/
const metadata = {
	tag: "ui5-breadcrumbs-item",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.main.BreadcrumbsItem.prototype */ {

		/**
		 * Defines the link href.
		 * <br><br>
		 * <b>Note:</b> Standard hyperlink behavior is supported.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		 href: {
			type: String,
		},

		/**
		 * Defines the link target.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>_self</code></li>
		 * <li><code>_top</code></li>
		 * <li><code>_blank</code></li>
		 * <li><code>_parent</code></li>
		 * <li><code>_search</code></li>
		 * </ul>
		 * <br><br>
		 * <b>Note:<b> This property must only be used when the <code>href</code> property is set.
		 *
		 * @type {string}
		 * @defaultvalue undefined
		 * @public
		 */
		 target: {
			type: String,
			defaultValue: undefined,
		},

		/**
		 * Defines the accessible ARIA name of the item.
		 *
		 * @type {string}
		 * @defaultvalue undefined
		 * @public
		 */
		 accessibleName: {
			type: String,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.BreadcrumbsItem.prototype */ {
		/**
		 * Defines the text of the component.
		 * <br><br>
		 * <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.BreadcrumbsItem.prototype */ {},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-breadcrumbs-item</code> component defines the content of an item in <code>ui5-breadcrumbs</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.BreadcrumbsItem
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-breadcrumbs-item
 * @implements sap.ui.webcomponents.main.IBreadcrumbsItem
 * @public
 * @since 1.0.0-rc.15
 */
class BreadcrumbsItem extends UI5Element {
	static get metadata() {
		return metadata;
	}

	get stableDomRef() {
		return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
	}
}

BreadcrumbsItem.define();

export default BreadcrumbsItem;
