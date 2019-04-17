import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap";
import { addCustomCSS } from "@ui5/webcomponents-base/src/theming/CustomStyle";

import DialogTemplateContext from "./DialogTemplateContext";
import Popup from "./Popup";
// Template
import DialogRenderer from "./build/compiled/DialogRenderer.lit";

// Styles
import dialogCss from "./themes/Dialog.css";

addCustomCSS("ui5-dialog", "sap_fiori_3", dialogCss);
addCustomCSS("ui5-dialog", "sap_belize", dialogCss);
addCustomCSS("ui5-dialog", "sap_belize_hcb", dialogCss);

/**
 * @public
 */
const metadata = {
	tag: "ui5-dialog",
	styleUrl: [
		"Popup.css",
		"Dialog.css",
	],
	properties: /** @lends  sap.ui.webcomponents.main.Dialog.prototype */ {
		/**
		 * Determines whether the <code>ui5-dialog</code> should be stretched to fullscreen.
		 * <br><br>
		 * <b>Note:</b> The <code>ui5-dialog</code> will be stretched to aproximetly
		 * 90% of the viewport.
		 *
		 * @type {Boolean}
		 * @public
		 */
		stretch: {
			type: Boolean,
		},
	},
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-dialog</code> component is used to temporarily display some information in a
 * size-limited window in front of the regular app screen.
 * It is used to prompt the user for an action or a confirmation.
 * The code>ui5-dialog</code> interrupts the current app processing as it is the only focused UI element and
 * the main screen is dimmed/blocked.
 * The dialog combines concepts known from other technologies where the windows have
 * names such as dialog box, dialog window, pop-up, pop-up window, alert box, or message box.
 * <br><br>
 * The <code>ui5-dialog</code> is modal, which means that user action is required before returning to the parent window is possible.
 * The content of the <code>ui5-dialog</code> is fully customizable.
 *
 * <h3>Structure</h3>
 * A <code>ui5-dialog</code> consists of a header, content, and a footer for action buttons.
 * The <code>ui5-dialog</code> is usually displayed at the center of the screen.
 *
 * <h3>Responsive Behavior</h3>
 * The <code>stretch</code> property can be used to stretch the
 * <code>ui5-dialog</code> on full screen.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Dialog";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Dialog
 * @extends Popup
 * @tagname ui5-dialog
 * @public
 */
class Dialog extends Popup {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return DialogRenderer;
	}

	/**
	* Opens the <code>ui5-dialog</code>.
	* @public
	*/
	open() {
		if (this._isOpen) {
			return;
		}

		const cancelled = super.open();
		if (cancelled) {
			return true;
		}

		this.storeCurrentFocus();

		this._isOpen = true;
	}

	/**
	* Closes the <code>ui5-dialog</code>.
	* @public
	*/
	close() {
		if (!this._isOpen) {
			return;
		}

		const cancelled = super.close();
		if (cancelled) {
			return;
		}

		this._isOpen = false;

		this.resetFocus();

		this.fireEvent("afterClose", { });
	}

	static get calculateTemplateContext() {
		return DialogTemplateContext.calculate;
	}
}

Bootstrap.boot().then(_ => {
	Dialog.define();
});

export default Dialog;
