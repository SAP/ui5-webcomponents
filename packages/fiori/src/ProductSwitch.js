import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ProductSwitchTemplate from "./generated/templates/ProductSwitchTemplate.lit.js";

// Styles
import ProductSwitchCss from "./generated/themes/ProductSwitch.css.js";


const metadata = {
	tag: "ui5-product-switch",
	properties: {
		/**
		 * Indicates how much columns should be displayed.
		 * @private
		 */
		desktopColumns: {
			type: Integer,
		},
	},
	slots: {
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

class ProductSwitch extends UI5Element {
	constructor() {
		super();

		this.initItemNavigation();
	}

	initItemNavigation() {
		this._itemNavigation = new ItemNavigation(this, { rowSize: 4 });
		this._itemNavigation.getItemsCallback = () => this.items;
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

	onEnterDOM() {
		ResizeHandler.register(document.body, this._handleResize.bind(this));
	}

	onExitDOM() {
		ResizeHandler.deregister(document.body, this._handleResize);
	}


	onBeforeRendering() {
		this.desktopColumns = this.items.length > 6 ? 4 : 3;
	}

	_handleResize() {
		if (!this._itemNavigation) {
			return;
		}

		const iWidth = document.body.clientWidth;

		if (iWidth <= 600) {
			this._itemNavigation.rowSize = 1;
		} else if (iWidth <= 900 || this.items.length <= 6) {
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
