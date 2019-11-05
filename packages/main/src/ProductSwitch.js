import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ProductSwitchTemplate from "./generated/templates/ProductSwitchTemplate.lit.js";

// Styles
import ProductSwitchCss from "./generated/themes/ProductSwitch.css.js";


const metadata = {
	tag: "ui5-productswitch",
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
		 * Defines the items of the <code>ui5-productswitch</code>.
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
	events: {
		/**
		 * Fired when an item is activated.
		 *
		 * @event
		 * @param {HTMLElement} item the clicked item.
		 * @public
		 */
		itemClick: {
			detail: {
				item: { type: HTMLElement },
			},
		},
	},
};

class ProductSwitch extends UI5Element {
	constructor() {
		super();
		this.initItemNavigation();

		this.addEventListener("ui5-_press", this._onItemPress.bind(this));
		this.addEventListener("ui5-_focused", this._onItemFocused.bind(this));
	}

	initItemNavigation() {
		this._itemNavigation = new ItemNavigation(this);
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

	static async define(...params) {
		super.define(...params);
	}

	onBeforeRendering() {
		this.desktopColumns = this.items.length > 6 ? 4 : 3;
	}

	_onItemPress(event) {
		this.fireEvent("itemClick", { item: event.detail.item });
	}

	_onItemFocused(event) {
		const target = event.target;

		this._itemNavigation.update(target);
	}
}

ProductSwitch.define();

export default ProductSwitch;
