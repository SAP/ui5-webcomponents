import Popup from "./Popup.js";
import { getFocusedElement } from "./popup-utils/PopupUtils.js";
import {
	addOpenedPopup,
	removeOpenedPopup,
} from "./popup-utils/OpenedPopupsRegistry.js";

import CustomPopupTemplate from "./generated/templates/CustomPopupTemplate.lit.js";
import styles from "./generated/themes/CustomPopup.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-custom-popup",
	properties: {
		modal: {
			type: Boolean,
		},
	},
	slots: {
		"default": {
			type: HTMLElement,
		},
	},
};

/**
 * @class
 *
 * @constructor
 * @author SAP SE
 * @extends Popup
 * @tagname hp4-card-popup
 * @public
 */
class CustomPopup extends Popup {
	static get metadata() {
		return metadata;
	}

	static get template() {
		return CustomPopupTemplate;
	}

	static get styles() {
		return styles;
	}

	get isModal() {
		return this.modal;
	}

	/**
	 * Opens the <code>ui5-dialog</code>.
	 * @public
	 */
	open() {
		super.open();

		this._focusedElementBeforeOpen = getFocusedElement();
		this.fireEvent("before-open", {});
		this.show();
		this.applyInitialFocus();

		Popup.blockBodyScrolling();

		addOpenedPopup(this);
		this.opened = true;
		this.fireEvent("after-open", {});
	}

	/**
	 * Closes the <code>ui5-dialog</code>.
	 * @public
	 */
	close(escPressed) {
		const prevented = !this.fireEvent("before-close", { escPressed }, true);

		if (prevented || !this.opened) {
			return;
		}

		super.close();
		this.hide();
		this.opened = false;

		this.fireEvent("after-close", {});

		removeOpenedPopup(this);
		Popup.unblockBodyScrolling();

		if (this._focusedElementBeforeOpen && !this._disableInitialFocus) {
			this._focusedElementBeforeOpen.focus();
		}
	}
}

CustomPopup.define();

export default CustomPopup;
