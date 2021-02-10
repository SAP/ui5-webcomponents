import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ProductSwitchTemplate from "./generated/templates/ProductSwitchTemplate.lit.js";

// Styles
import ProductSwitchCss from "./generated/themes/ProductSwitch.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-product-switch",
	properties: /** @lends sap.ui.webcomponents.fiori.ProductSwitch.prototype */ {
		/**
		 * Indicates how many columns are displayed.
		 * @private
		 */
		desktopColumns: {
			type: Integer,
		},
	},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.fiori.ProductSwitch.prototype */ {
		/**
		 * Defines the items of the <code>ui5-product-switch</code>.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		"default": {
			propertyName: "items",
			type: HTMLElement,
		},
	},
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-product-switch</code> is an SAP Fiori specific web component that is used in <code>ui5-shellbar</code>
 * and allows the user to easily switch between products.
 * <br><br>
 * <h3>ES6 Module Import</h3>
 * <code>import "@ui5/webcomponents-fiori/dist/ProductSwitch.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents-fiori/dist/ProductSwitchItem.js";</code> (for <code>ui5-product-switch-item</code>)
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.ProductSwitch
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-product-switch
 * @appenddocs ProductSwitchItem
 * @public
 * @since 1.0.0-rc.5
 */
class ProductSwitch extends UI5Element {
	constructor() {
		super();

		this._itemNavigation = new ItemNavigation(this, {
			rowSize: 4,
			getItemsCallback: () => this.items,
		});
	}

	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return ProductSwitchCss;
	}

	static get template() {
		return ProductSwitchTemplate;
	}

	static get ROW_MIN_WIDTH() {
		return {
			ONE_COLUMN: 600,
			THREE_COLUMN: 900,
		};
	}

	onEnterDOM() {
		this._handleResizeBound = this._handleResize.bind(this);

		ResizeHandler.register(document.body, this._handleResizeBound);
	}

	onExitDOM() {
		ResizeHandler.deregister(document.body, this._handleResizeBound);
	}

	onBeforeRendering() {
		this.desktopColumns = this.items.length > 6 ? 4 : 3;
	}

	_handleResize() {
		const documentWidth = document.body.clientWidth;

		if (documentWidth <= this.constructor.ROW_MIN_WIDTH.ONE_COLUMN) {
			this._itemNavigation.rowSize = 1;
		} else if (documentWidth <= this.constructor.ROW_MIN_WIDTH.THREE_COLUMN || this.items.length <= 6) {
			this._itemNavigation.rowSize = 3;
		} else {
			this._itemNavigation.rowSize = 4;
		}
	}

	_onfocusin(event) {
		const target = event.target;

		this._itemNavigation.update(target);
	}
}

ProductSwitch.define();

export default ProductSwitch;
