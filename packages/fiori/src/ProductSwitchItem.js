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
		/**
		 * Used to switch the active state (pressed or not) of the <code>ui5-product-switch-item</code>.
		 * @private
		 */
		active: {
			type: Boolean,
		},
		/**
		 * Indicates if the elements is on focus
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
		 * mouse/tap or by using the Enter or Space key.
		 * <br><br>
		 * <b>Note:</b> The event will not be fired if the <code>disabled</code>
		 * property is set to <code>true</code>.
		 *
		 * @event
		 * @public
		 */
		click: {},
		_focused: {},
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

	onEnterDOM() {
		document.addEventListener("mouseup", this._deactivate.bind(this));
	}

	onExitDOM() {
		document.removeEventListener("mouseup", this._deactivate.bind(this));
	}

	_deactivate() {
		if (this.active) {
			this.active = false;
		}
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
