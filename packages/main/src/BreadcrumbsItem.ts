import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import { IBreadcrumbsItem } from "./Interfaces.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-breadcrumbs-item</code> component defines the content of an item in <code>ui5-breadcrumbs</code>.
 *
 * @constructor
 * @author SAP SE
 * @extends UI5Element
 * @implements {IBreadcrumbsItem}
 * @public
 * @since 1.0.0-rc.15
 */
@customElement("ui5-breadcrumbs-item")
class BreadcrumbsItem extends UI5Element implements IBreadcrumbsItem {
	/**
	 * Defines the link href.
	 * <br><br>
	 * <b>Note:</b> Standard hyperlink behavior is supported.
	 *
	 * @type {string}
	 * @default ""
	 * @public
	 */
	@property()
	href!: string;

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
	 * @default undefined
	 * @public
	 */
	@property({ defaultValue: undefined })
	target?: string;

	/**
	 * Defines the accessible ARIA name of the item.
	 *
	 * @type {string}
	 * @default undefined
	 * @public
	 */
	@property()
	accessibleName!: string

	/**
	 * Defines the text of the component.
	 * <br><br>
	 * <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 *
	 * @type {Node[]}
	 * @public
	 */
	@slot({ type: Node, "default": true })
	text!: Array<Node>;

	_accessibleNameText?: string;

	get stableDomRef() {
		return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
	}
}

BreadcrumbsItem.define();

export default BreadcrumbsItem;
