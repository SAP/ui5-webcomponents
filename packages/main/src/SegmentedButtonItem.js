import isLegacyBrowser from "@ui5/webcomponents-base/dist/isLegacyBrowser.js";
import Button from "./Button.js";
import SegmentedButtonItemTemplate from "./generated/templates/SegmentedButtonItemTemplate.lit.js";
import { SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION } from "./generated/i18n/i18n-defaults.js";

// Styles
import segmentedButtonItemCss from "./generated/themes/SegmentedButtonItem.css.js";
import segmentedButtonItemIECss from "./generated/themes/SegmentedButtonItem.ie11.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-segmentedbutton-item",
	properties: /** @lends  sap.ui.webcomponents.main.SegmentedButtonItem.prototype */ {
		/**
		 * Determines whether the <code>ui5-togglebutton</code> is displayed as pressed.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		pressed: {
			type: Boolean,
		},

		/**
		 * Defines the index of the item inside of the SegmentedButton.
		 * @private
		 * @type {String}
		 */
		posinset: {
			type: String,
		},

		/**
		 * Defines how many items are inside of the SegmentedButton.
		 * @private
		 * @type {String}
		 */
		setsize: {
			type: String,
		},
	},
};

/**
 * @class
 *
 *<h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-segmentedbutton-item</code> component is an enhanced <code>ui5-button</code>
 * that can be toggled between pressed and normal states.
 * Users can use the <code>ui5-segmentedbutton-item</code> as part of a <code>ui5-segmentedbutton</code>.
 * <br><br>
 * Clicking or tapping on a <code>ui5-segmentedbutton-item</code> changes its state to <code>pressed</code>.
 * The button returns to its initial state when the user clicks or taps on it again.
 * By applying additional custom CSS-styling classes, apps can give a different style to any
 * <code>ui5-segmentedbutton-item</code>.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/SegmentedButtonItem";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.SegmentedButtonItem
 * @extends Button
 * @tagname ui5-segmentedbutton-item
 * @public
 */
class SegmentedButtonItem extends Button {
	static get metadata() {
		return metadata;
	}

	static get template() {
		return SegmentedButtonItemTemplate;
	}

	static get styles() {
		return [Button.styles, segmentedButtonItemCss, isLegacyBrowser() && segmentedButtonItemIECss];
	}

	get ariaDescription() {
		return this.i18nBundle.getText(SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION);
	}

	_onclick() {
		this.pressed = !this.pressed;
	}
}

SegmentedButtonItem.define();

export default SegmentedButtonItem;
