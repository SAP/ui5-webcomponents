import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResponsivePopoverTemplate from "./generated/templates/ResponsivePopoverTemplate.lit.js";

import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import Popover from "./Popover.js";
import Dialog from "./Dialog.js";
import Button from "./Button.js";

// Styles
import ResponsivePopoverCss from "./generated/themes/ResponsivePopover.css.js";

/**
 * @private
 */
const metadata = {
	tag: "ui5-responsive-popover",
	properties: /** @lends sap.ui.webcomponents.main.ResponsivePopover.prototype */ {
		opened: {
			type: Boolean 
		},

		stayOpenOnScroll: {
			type: Boolean 
		},

		allowTargetOverlap: {
			type: Boolean 
		},

		/**
		 * Title of the Dialog on phone.
		 */
		headerTitle: {
			type: String
		},

		/**
		 * Determines whether to show "Confirm" button on phone.
		 */
		showConfirmButton: {
			type: Boolean
		},

		/**
		 * Determines whether to show "Cancel" button on phone.
		 */
		showCancelButton: {
			type: Boolean
		},
		initialFocus: {
			type: String
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.ResponsivePopover.prototype */ {
	
		"default": {
			type: HTMLElement,
		},

		"phoneHeader": {
			type: HTMLElement
		}
	},
	events: /** @lends sap.ui.webcomponents.main.ResponsivePopover.prototype */ {
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
 * ResponsivePopover is UI5Element, which shows Dialog on mobile devices and Popover otherwise.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ResponsivePopover
 * @extends UI5Element
 * @tagname ui5-responsive-popover
 * @private
 */
class ResponsivePopover extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		
		return litRender;
	}

	static get styles() {
		return ResponsivePopoverCss;
	}

	static get template() {
		return ResponsivePopoverTemplate;
	}

	static async define(...params) {
		await Promise.all([
			Popover.define(),
			Dialog.define(),
			Button.define()
		]);

		super.define(...params);
	}

	get isPhone() {
		return isPhone();
	}

	open(opener) {

		this._width = opener.getBoundingClientRect().width;

		const dialog = this.shadowRoot.querySelector("ui5-dialog");
		const popover = this.shadowRoot.querySelector("ui5-popover");

	
		// popover._initialFocusElement = this.getRootNode().getElementById(this.initialFocus);

		if (dialog) {
			dialog.open();
		} else {
			popover.openBy(opener);
		}

		this.opened = true;
	}

	close() {
		this._container.close();
		this.opened = false;
	}

	_fireEvent(event) {
		const type = event.type.replace("ui5-", "")
		this.fireEvent(type, {
			...event.detail,
			confirmButtonPressed: this._confirmButtonPressed,
			_cancelButtonPressed: this._cancelButtonPressed
		});
	
		this._confirmButtonPressed = false;
		this._cancelButtonPressed = false;
	}

	_handleClose(event) {
		if (event.target.hasAttribute("confirm")) {
			this._confirmButtonPressed = true;
		}

		if (event.target.hasAttribute("cancel")) {
			this._cancelButtonPressed = true;
		}

		this.close();
	}

	get _container() {
		return this.shadowRoot.querySelector("ui5-dialog") || this.shadowRoot.querySelector("ui5-popover");
	}

	get _hasFooter() {
		return this.showCancelButton || this.showConfirmButton;
	}
}

ResponsivePopover.define();

export default ResponsivePopover;
