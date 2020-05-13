import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import { addOpenedPopup, removeOpenedPopup } from "./popup-utils/OpenedPopupsRegistry.js";

import Popup from "./Popup.js";
// Template
import DialogTemplate from "./generated/templates/DialogTemplate.lit.js";

// Styles
import dialogCSS from "./generated/themes/Dialog.css.js";
import { getFocusedElement } from "./popup-utils/PopupUtils.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-dialog",
	properties: /** @lends  sap.ui.webcomponents.main.Dialog.prototype */ {
		/**
		 * Determines whether the <code>ui5-dialog</code> should be stretched to fullscreen.
		 * <br><br>
		 * <b>Note:</b> The <code>ui5-dialog</code> will be stretched to aproximetly
		 * 90% of the viewport.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		stretch: {
			type: Boolean,
		},

		onPhone: {
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
 * The <code>ui5-dialog</code> interrupts the current app processing as it is the only focused UI element and
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

	static get render() {
		return litRender;
	}

	static get template() {
		return DialogTemplate;
	}

	static get styles() {
		return [dialogCSS, Popup.styles];
	}

	constructor() {
		super();

		this.onPhone = isPhone();
	}

	/**
	* Opens the <code>ui5-dialog</code>.
	* @public
	*/
	open() {
		super.open();

		this._focusedElementBeforeOpen = getFocusedElement();
		this.fireEvent("beforeOpen", {});
		this.show();
		this.applyInitialFocus();

		Dialog.blockBodyScrolling();

		addOpenedPopup(this);
		this.opened = true;
		this.fireEvent("afterOpen", {});
	}

	/**
	* Closes the <code>ui5-dialog</code>.
	* @public
	*/
	close(escPressed) {
		const prevented = !this.fireEvent("beforeClose", { escPressed }, true);

		if (prevented || !this.opened) {
			return;
		}

		super.close();
		this.hide();
		this.opened = false;

		this.fireEvent("afterClose", {});

		removeOpenedPopup(this);
		Dialog.unblockBodyScrolling();

		if (this._focusedElementBeforeOpen && !this._disableInitialFocus) {
			this._focusedElementBeforeOpen.focus();
		}
	}

	get isModal() {
		return true;
	}

	get _displayFooter() {
		return true;
	}

	get _displayHeader() {
		return true;
	}
}

Dialog.define();

export default Dialog;
