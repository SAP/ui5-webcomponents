import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
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
	// @ts-ignore
} from "./generated/i18n/i18n-defaults.js";

// Styles
import ProductSwitchCss from "./generated/themes/ProductSwitch.css.js";
import type ProductSwitchItem from "./ProductSwitchItem.js";

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
 * @alias sap.ui.webc.fiori.ProductSwitch
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-product-switch
 * @appenddocs ProductSwitchItem
 * @public
 * @since 1.0.0-rc.5
 */
@customElement("ui5-product-switch")
class ProductSwitch extends UI5Element {
	constructor() {
		super();

		this._currentIndex = 0;
		this._rowSize = 4;

		this._itemNavigation = new ItemNavigation(this, {
			rowSize: this._rowSize,
			getItemsCallback: () => this.items,
		});

		this._handleResizeBound = this._handleResize.bind(this);
	}

	/**
	 * Indicates how many columns are displayed.
	 * @private
	 */
	@property({ validator: Integer })
	desktopColumns?: number;

	/**
	 * Defines the items of the <code>ui5-product-switch</code>.
	 *
	 * @type {sap.ui.webc.fiori.IProductSwitchItem[]}
	 * @name sap.ui.webc.fiori.ProductSwitch.prototype.default
	 * @slot items
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	items!: Array<ProductSwitchItem>

	_itemNavigation: ItemNavigation;
	_currentIndex: number;
	_rowSize: number;
	_handleResizeBound: () => void;

	static i18nBundle: I18nBundle;

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
		return ProductSwitch.i18nBundle.getText(PRODUCT_SWITCH_CONTAINER_LABEL as I18nText);
	}

	onEnterDOM() {
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

		if (documentWidth <= (this.constructor as typeof ProductSwitch).ROW_MIN_WIDTH.ONE_COLUMN) {
			this._setRowSize(1);
		} else if (documentWidth <= (this.constructor as typeof ProductSwitch).ROW_MIN_WIDTH.THREE_COLUMN || this.items.length <= 6) {
			this._setRowSize(3);
		} else {
			this._setRowSize(4);
		}
	}

	handleProductSwitchItemClick(e: MouseEvent) {
		this.items.forEach(item => { item.selected = false; });
		(e.target as ProductSwitchItem).selected = true;
	}

	_onfocusin(e: FocusEvent) {
		const target = e.target as ProductSwitchItem;

		this._itemNavigation.setCurrentItem(target);
		this._currentIndex = this.items.indexOf(target);
	}

	_setRowSize(size: number) {
		this._rowSize = size;
		this._itemNavigation.setRowSize(size);
	}

	_onkeydown(e: KeyboardEvent) {
		if (isDown(e)) {
			this._handleDown(e);
		} else if (isUp(e)) {
			this._handleUp(e);
		}
	}

	_handleDown(e: KeyboardEvent) {
		const itemsLength = this.items.length;
		if (this._currentIndex + this._rowSize > itemsLength) { // border reached, do nothing
			e.stopPropagation();
		}
	}

	_handleUp(e: KeyboardEvent) {
		if (this._currentIndex - this._rowSize < 0) { // border reached, do nothing
			e.stopPropagation();
		}
	}
}

ProductSwitch.define();

export default ProductSwitch;
