// Styles
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { getFirstFocusableElement } from "@ui5/webcomponents-base/dist/util/FocusableElements.js";
import styles from "./generated/themes/Popup.css.js";

import { addOpenedPopup, removeOpenedPopup } from "./popup-utils/OpenedPopupsRegistry.js";
import { getFocusedElement, forwardToFirst, forwardToLast } from "./popup-utils/PopupUtils.js";

/**
 * @public
 */
const metadata = {
	slots: /** @lends  sap.ui.webcomponents.main.Popup.prototype */ {

		/**
		 * Defines the content of the Web Component.
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},

		/**
		 * Defines the header HTML Element.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		header: {
			type: HTMLElement,
		},

		/**
		 * Defines the footer HTML Element.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		footer: {
			type: HTMLElement,
		},
	},
	properties: /** @lends  sap.ui.webcomponents.main.Popup.prototype */ {
		/**
		 * Defines the ID of the HTML Element, which will get the initial focus.
		 *
		 * @type {string}
		 * @defaultvalue: ""
		 * @public
		 */
		initialFocus: {
			type: String,
		},

		/**
		 * Defines the header text.
		 * <br><b>Note:</b> If <code>header</code> slot is provided, the <code>headerText</code> is ignored.
		 *
		 * @type {string}
		 * @defaultvalue: ""
		 * @public
		 */
		headerText: {
			type: String,
		},

		/**
		 * Indicates if the elements is on focus
		 * @private
		 */
		opened: {
			type: Boolean,
		},

		/**
		 * Indicates if the element can show a block layer (be modal)
		 * @private
		 */
		showBlockLayer: {
			type: Boolean,
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.Popup.prototype */ {

		/**
		 * Fired before the component is opened.
		 *
		 * @public
		 * @event
		 */

		beforeOpen: {},
		/**
		 * Fired after the component is opened.
		 *
		 * @public
		 * @event
		 */

		afterOpen: {},
		/**
		 * Fired before the component is closed.
		 *
		 * @public
		 * @event
		 * @param {Boolean} escPressed Indicates that <code>ESC</code> key has triggered the event.
		 */

		beforeClose: {
			escPressed: { type: Boolean },
		},

		/**
		 * Fired after the component is closed.
		 *
		 * @public
		 * @event
		 */
		afterClose: {},
	},
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 * Represents a base class for all popup Web Components.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Popup
 * @extends sap.ui.webcomponents.base.UI5Element
 * @public
 */
class Popup extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return styles;
	}

	forwardToFirst() {
		forwardToFirst(this.headerDOM)
			|| forwardToFirst(this.contentDOM)
			|| forwardToFirst(this.footerDOM);
	}

	forwardToLast() {
		forwardToLast(this.footerDOM)
			|| forwardToLast(this.contentDOM)
			|| forwardToLast(this.headerDOM);
	}

	resetFocus() {
		if (!this._focusedElementBeforeOpen) {
			return;
		}

		this._focusedElementBeforeOpen.focus();
		this._focusedElementBeforeOpen = null;
	}

	applyInitialFocus() {
		const element = this.getRootNode().getElementById(this.initialFocus)
			|| document.getElementById(this.initialFocus)
			|| getFirstFocusableElement(this.rootDom);

		if (element) {
			element.focus();
		}
	}

	_open() {
		this.beforeReposition();
		this.reposition();
		this.afterReposition();
	}

	/**
	* Closes the <code>ui5-dialog</code>.
	* @protected
	*/
	_close(escPressed = false, preventRegitryUpdate = false) {
		if (!this.opened) {
			return;
		}

		const prevented = !this.fireEvent("beforeClose", { escPressed }, true);

		if (prevented) {
			return;
		}

		if (!preventRegitryUpdate) {
			removeOpenedPopup(this);
		}

		this.opened = false;

		this.resetFocus();
	}

	reposition() {}

	afterReposition() {
		this.applyInitialFocus();

		addOpenedPopup(this);

		this.opened = true;
		this.fireEvent("afterOpen", {});
	}

	beforeReposition() {
		if (this.opened) {
			return;
		}

		this._focusedElementBeforeOpen = getFocusedElement();

		this.fireEvent("beforeOpen", {});
	}

	get styles() {
		return {
			content: {},
		};
	}

	get rootDom() {
		return this.shadowRoot.querySelector(".ui5-popup-root");
	}

	get headerDOM() {
		return this.shadowRoot.querySelector(".ui5-popup-header-root");
	}

	get contentDOM() {
		return this.shadowRoot.querySelector(".ui5-popup-content");
	}

	get footerDOM() {
		return this.shadowRoot.querySelector(".ui5-popup-footer-root");
	}
}

export default Popup;
