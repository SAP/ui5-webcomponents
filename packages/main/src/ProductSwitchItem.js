import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ProductSwitchItemTemplate from "./generated/templates/ProductSwitchItemTemplate.lit.js";

// Styles
import ProductSwitchItemCss from "./generated/themes/ProductSwitchItem.css.js";


const metadata = {
	tag: "ui5-product-switch-item",
	properties: {
		/**
		  * Defines the title of the <code>ui5-product-switch-item</code>.
		  * @type {string}
		  * @defaultvalue ""
		  * @public
		  */
		heading: {
			type: String,
		},
		/**
		 * Defines the subtitle of the <code>ui5-product-switch-item</code>.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		subtitle: {
			type: String,
		},
		/**
		 * Defines the icon to be displayed as graphical element within the <code>ui5-product-switch-item</code>.
		 * The SAP-icons font provides numerous options.
		 * <br><br>
		 * Example:
		 * <br>
		 * <pre>ui5-product-switch-item icon="sap-icon://palette"</pre>
		 *
		 * See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		icon: {
			type: String,
		},
		/**
		 * Specifies a target where the targetSrc content must be open.
		 * Options are the standard values for window.open() supported by browsers: _self, _top, _blank, _parent, _search. Alternatively, a frame name can be entered.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		target: {
			type: String,
		},
		/**
		 *Defines the ProductSwitchItem target URI. Supports standard hyperlink behavior.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		targetSrc: {
			type: String,
		},
		_tabIndex: {
			type: String,
			defaultValue: "-1",
			noAttribute: true,
		},
	},
};

class ProductSwitchItem extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return ProductSwitchItemCss;
	}

	static get template() {
		return ProductSwitchItemTemplate;
	}

	get _check() {
		return this._tabIndex !== "0";
	}
}

ProductSwitchItem.define();

export default ProductSwitchItem;
