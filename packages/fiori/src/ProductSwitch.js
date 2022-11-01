import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";

import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import {
	isDown,
	isUp,
} from "@ui5/webcomponents-base/dist/Keys.js";

import ProductSwitchTemplate from "./generated/templates/ProductSwitchTemplate.lit.js";

import {
	PRODUCT_SWITCH_CONTAINER_LABEL,
} from "./generated/i18n/i18n-defaults.js";

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
		 * @type {sap.ui.webcomponents.fiori.IProductSwitchItem[]}
		 * @slot items
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
 *
 * <h3>Keyboard Handling</h3>
 * The <code>ui5-product-switch</code> provides advanced keyboard handling.
 * When focused, the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 * <br>
 * <ul>
 * <li>[TAB] - Move focus to the next interactive element after the <code>ui5-product-switch</code></li>
 * <li>[UP/DOWN] - Navigates up and down the items </li>
 * <li>[LEFT/RIGHT] - Navigates left and right the items</li>
 * </ul>
 * <br>
 * <br>
 *
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

		this._currentIndex = 0;
		this._rowSize = 4;

		this._itemNavigation = new ItemNavigation(this, {
			rowSize: this._rowSize,
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

	static async onDefine() {
		ProductSwitch.i18nBundle = await getI18nBundle("@ui5/webcomponents-fiori");
	}

	get _ariaLabelText() {
		return ProductSwitch.i18nBundle.getText(PRODUCT_SWITCH_CONTAINER_LABEL);
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
			this._setRowSize(1);
		} else if (documentWidth <= this.constructor.ROW_MIN_WIDTH.THREE_COLUMN || this.items.length <= 6) {
			this._setRowSize(3);
		} else {
			this._setRowSize(4);
		}
	}

	handleProductSwitchItemClick(event) {
		this.items.forEach(item => { item.selected = false; });
		event.target.selected = true;
	}

	_onfocusin(event) {
		const target = event.target;

		this._itemNavigation.setCurrentItem(target);
		this._currentIndex = this.items.indexOf(target);
	}

	_setRowSize(size) {
		this._rowSize = size;
		this._itemNavigation.setRowSize(size);
	}

	_onkeydown(event) {
		if (isDown(event)) {
			this._handleDown(event);
		} else if (isUp(event)) {
			this._handleUp(event);
		}
	}

	_handleDown(event) {
		const itemsLength = this.items.length;
		if (this._currentIndex + this._rowSize > itemsLength) { // border reached, do nothing
			event.stopPropagation();
		}
	}

	_handleUp(event) {
		if (this._currentIndex - this._rowSize < 0) { // border reached, do nothing
			event.stopPropagation();
		}
	}
}

ProductSwitch.define();

export default ProductSwitch;
