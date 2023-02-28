import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import SegmentedButtonItemTemplate from "./generated/templates/SegmentedButtonItemTemplate.lit.js";

import ToggleButton from "./ToggleButton.js";
import ButtonDesign from "./types/ButtonDesign.js";
import Icon from "./Icon.js";

import { SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION } from "./generated/i18n/i18n-defaults.js";

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
 * @alias sap.ui.webc.main.SegmentedButtonItem
 * @extends sap.ui.webc.main.ToggleButton
 * @abstract
 * @tagname ui5-segmented-button-item
 * @implements sap.ui.webc.main.ISegmentedButtonItem
 * @public
 */
@customElement({
	tag: "ui5-segmented-button-item",
	template: SegmentedButtonItemTemplate,
	dependencies: [Icon],
})
class SegmentedButtonItem extends ToggleButton {
	/**
	 * <b>Note:</b> The property is inherited and not supported. If set, it won't take any effect.
	 *
	 * @type {sap.ui.webc.main.types.ButtonDesign}
	 * @defaultvalue "Default"
	 * @name sap.ui.webc.main.SegmentedButtonItem.prototype.design
	 * @public
	 */
	@property({ type: ButtonDesign, defaultValue: ButtonDesign.Default })
	design!: ButtonDesign;

	/**
	 * <b>Note:</b> The property is inherited and not supported. If set, it won't take any effect.
	 *
	 * @type {boolean}
	 * @defaultvalue false
	 * @name sap.ui.webc.main.SegmentedButtonItem.prototype.iconEnd
	 * @public
	 */
	@property({ type: Boolean })
	iconEnd!: boolean;

	/**
	 * <b>Note:</b> The property is inherited and not supported. If set, it won't take any effect.
	 *
	 * @type {boolean}
	 * @defaultvalue false
	 * @name sap.ui.webc.main.SegmentedButtonItem.prototype.submits
	 * @public
	 */
	@property({ type: Boolean })
	submits!: boolean;

	/**
	 * Defines the index of the item inside of the SegmentedButton.
	 *
	 * @type {sap.ui.webc.base.types.Integer}
	 * @defaultvalue 0
	 * @private
	 */
	@property({ validator: Integer, defaultValue: 0 })
	posInSet!: number;

	/**
	 * Defines how many items are inside of the SegmentedButton.
	 *
	 * @type {sap.ui.webc.base.types.Integer}
	 * @defaultvalue 0
	 * @private
	 */
	@property({ validator: Integer, defaultValue: 0 })
	sizeOfSet!: number;

	get ariaDescription() {
		return SegmentedButtonItem.i18nBundle.getText(SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION);
	}
}

SegmentedButtonItem.define();

export default SegmentedButtonItem;
