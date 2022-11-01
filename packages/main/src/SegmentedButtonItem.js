import SegmentedButtonItemTemplate from "./generated/templates/SegmentedButtonItemTemplate.lit.js";
import ToggleButton from "./ToggleButton.js";
import ButtonDesign from "./types/ButtonDesign.js";
import Icon from "./Icon.js";

import { SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION } from "./generated/i18n/i18n-defaults.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-segmented-button-item",
	properties: /** @lends sap.ui.webcomponents.main.SegmentedButtonItem.prototype */ {
		/**
		 * <b>Note:</b> The property is inherited and not supported. If set, it won't take any effect.
		 *
		 * @type {sap.ui.webcomponents.main.types.ButtonDesign}
		 * @defaultvalue "Default"
		 * @public
		 */
		design: {
			type: ButtonDesign,
			defaultValue: ButtonDesign.Default,
		},

		/**
		 * <b>Note:</b> The property is inherited and not supported. If set, it won't take any effect.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		iconEnd: {
			type: Boolean,
		},

		/**
		 * <b>Note:</b> The property is inherited and not supported. If set, it won't take any effect.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		submits: {
			type: Boolean,
		},

		/**
		 * Defines the index of the item inside of the SegmentedButton.
		 *
		 * @private
		 * @type {string}
		 */
		posInSet: {
			type: String,
		},

		/**
		 * Defines how many items are inside of the SegmentedButton.
		 *
		 * @private
		 * @type {string}
		 */
		sizeOfSet: {
			type: String,
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * Users can use the <code>ui5-segmented-button-item</code> as part of a <code>ui5-segmented-button</code>.
 * <br><br>
 * Clicking or tapping on a <code>ui5-segmented-button-item</code> changes its state to <code>pressed</code>.
 * The item returns to its initial state when the user clicks or taps on it again.
 * By applying additional custom CSS-styling classes, apps can give a different style to any
 * <code>ui5-segmented-button-item</code>.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/SegmentedButtonItem";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.SegmentedButtonItem
 * @extends sap.ui.webcomponents.main.ToggleButton
 * @tagname ui5-segmented-button-item
 * @implements sap.ui.webcomponents.main.ISegmentedButtonItem
 * @public
 */
class SegmentedButtonItem extends ToggleButton {
	static get metadata() {
		return metadata;
	}

	static get template() {
		return SegmentedButtonItemTemplate;
	}

	static get dependencies() {
		return [Icon];
	}

	get ariaDescription() {
		return SegmentedButtonItem.i18nBundle.getText(SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION);
	}
}

SegmentedButtonItem.define();

export default SegmentedButtonItem;
