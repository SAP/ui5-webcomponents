import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter, isSpaceShift } from "@ui5/webcomponents-base/dist/Keys.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";

import ProductSwitchItemTemplate from "./generated/templates/ProductSwitchItemTemplate.lit.js";
// Styles
import ProductSwitchItemCss from "./generated/themes/ProductSwitchItem.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-product-switch-item",
	properties: /** @lends sap.ui.webcomponents.fiori.ProductSwitchItem.prototype */ {
		/**
		  * Defines the title of the component.
		  * @type {string}
		  * @defaultvalue ""
		  * @since 1.0.0-rc.15
		  * @public
		  */
		titleText: {
			type: String,
		},

		/**
		 * Defines the subtitle of the component.
		 * @type {string}
		 * @defaultvalue ""
		 * @since 1.0.0-rc.15
		 * @public
		 */
		 subtitleText: {
			type: String,
		},

		/**
		 * Defines the icon to be displayed as a graphical element within the component.
		 * <br><br>
		 * Example:
		 * <br>
		 * <pre>ui5-product-switch-item icon="palette"</pre>
		 *
		 * See all the available icons in the <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		icon: {
			type: String,
		},

		/**
		 * Defines a target where the <code>targetSrc</code> content must be open.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>_self</code></li>
		 * <li><code>_top</code></li>
		 * <li><code>_blank</code></li>
		 * <li><code>_parent</code></li>
		 * <li><code>_search</code></li>
		 * </ul>
		 *
		 * @type {string}
		 * @defaultvalue "_self"
		 * @public
		 */
		target: {
			type: String,
			defaultValue: "_self",
		},

		/**
		 * Defines the component target URI. Supports standard hyperlink behavior.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		targetSrc: {
			type: String,
		},

		/**
		 * Used to switch the active state (pressed or not) of the component.
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

		/**
		 * Used to set the selected state of the component. Only one selected in a sequence.
		 * @private
		 */
		selected: {
			type: Boolean,
		},

		_tabIndex: {
			type: String,
			defaultValue: "-1",
			noAttribute: true,
		},
	},
	slots: /** @lends sap.ui.webcomponents.fiori.ProductSwitchItem.prototype */ {
	},
	events: /** @lends sap.ui.webcomponents.fiori.ProductSwitchItem.prototype */ {
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
 * The <code>ui5-product-switch-item</code> web component represents the items displayed in the
 * <code>ui5-product-switch</code> web component.
 * <br><br>
 * <b>Note:</b> <code>ui5-product-switch-item</code> is not supported when used outside of <code>ui5-product-switch</code>.
 * <br><br>
 *
 * <h3>Keyboard Handling</h3>
 * The <code>ui5-product-switch</code> provides advanced keyboard handling.
 * When focused, the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 * <br>
 * <ul>
 * <li>[SPACE/ENTER/RETURN] - Trigger <code>ui5-click</code> event</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 * <code>import "@ui5/webcomponents-fiori/dist/ProductSwitchItem.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.ProductSwitchItem
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-product-switch-item
 * @public
 * @implements sap.ui.webcomponents.fiori.IProductSwitchItem
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
			if (isSpaceShift(event)) {
				event.stopPropagation();
			}
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

	static get dependencies() {
		return [Icon];
	}
}

ProductSwitchItem.define();

export default ProductSwitchItem;
