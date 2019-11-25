import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/events/PseudoEvents.js";
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
		 * Defines the icon to be displayed as a graphical element within the <code>ui5-product-switch-item</code>.
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
		 * Specifies a target where the <code>targetSrc</code> content must be open.
		 * Options are the standard values for window.open() supported by browsers: _self, _top, _blank, _parent, _search. Alternatively, a frame name can be entered.
		 * @type {string}
		 * @defaultvalue "_self"
		 * @public
		 */
		target: {
			type: String,
			defaultValue: "_self",
		},
		/**
		 * Defines the <code>ui5-product-switch-item</code> target URI. Supports standard hyperlink behavior.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		targetSrc: {
			type: String,
		},
		/**
		 * Used to switch the active state (pressed or not) of the <code>ui5-product-switch-item</code>.
		 * @private
		 */
		active: {
			type: Boolean,
		},
		/**
		 * Indicates whether the element is focused.
		 * @private
		 */
		focused: {
			type: Boolean,
		},
		_tabIndex: {
			type: String,
			defaultValue: "-1",
			noAttribute: true,
		},
	},
	slots: {
		//
	},
	events: {
		/**
		 * Fired when the <code>ui5-product-switch-item</code> is activated either with a
		 * click/tap or by using the Enter or Space key.
		 *
		 * @event
		 * @public
		 */
		click: {},
		_focused: {},
	},
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-product-switch-item</code> represents the items displayed in the <code>ui5-product-switch</code> web component
 * <b>Note:</b> <code>ui5-product-switch-item</code> is not supported when used outside of <code>ui5-product-switch</code>.
 * <br><br>
 * <h3>ES6 Module Import</h3>
 * <code>import "@ui5/webcomponents-fiori/dist/ProductSwitchItem";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ProductSwitchItem
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-product-switch-item
 * @public
 * @since 1.0.0-rc.5
 */
class ProductSwitchItem extends UI5Element {
	constructor() {
		super();

		this._deactivate = () => {
			if (this.active) {
				this.active = false;
			}
		};
	}

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

	onEnterDOM() {
		document.addEventListener("mouseup", this._deactivate);
	}

	onExitDOM() {
		document.removeEventListener("mouseup", this._deactivate);
	}

	_onmousedown() {
		this.active = true;
	}

	_onkeydown(event) {
		if (isSpace(event) || isEnter(event)) {
			this.active = true;
		}

		if (isSpace(event)) {
			event.preventDefault();
		}

		if (isEnter(event)) {
			this._fireItemClick();
		}
	}

	_onkeyup(event) {
		if (isSpace(event) || isEnter(event)) {
			this.active = false;
		}

		if (isSpace(event)) {
			this._fireItemClick();
		}
	}

	_onfocusout() {
		this.active = false;
		this.focused = false;
	}

	_onfocusin(event) {
		this.focused = true;

		this.fireEvent("_focused", event);
	}

	_fireItemClick() {
		this.fireEvent("click", { item: this });
	}
}

ProductSwitchItem.define();

export default ProductSwitchItem;
