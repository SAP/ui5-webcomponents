import Popup from "./Popup.js";

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
}

CustomPopup.define();

export default CustomPopup;
