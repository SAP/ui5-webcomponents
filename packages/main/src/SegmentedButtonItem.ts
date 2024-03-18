import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import type { ISegmentedButtonItem } from "./SegmentedButton.js";
import SegmentedButtonItemTemplate from "./generated/templates/SegmentedButtonItemTemplate.lit.js";

import ToggleButton from "./ToggleButton.js";
import ButtonDesign from "./types/ButtonDesign.js";
import Icon from "./Icon.js";

import { SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION } from "./generated/i18n/i18n-defaults.js";
import { isSafari } from "@ui5/webcomponents-base/dist/Device.js";
import { isSpaceShift } from "@ui5/webcomponents-base/dist/Keys.js";

/**
 * @class
 *
 * ### Overview
 *
 * Users can use the `ui5-segmented-button-item` as part of a `ui5-segmented-button`.
 *
 * Clicking or tapping on a `ui5-segmented-button-item` changes its state to `pressed`.
 * The item returns to its initial state when the user clicks or taps on it again.
 * By applying additional custom CSS-styling classes, apps can give a different style to any
 * `ui5-segmented-button-item`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/SegmentedButtonItem.js";`
 * @constructor
 * @extends ToggleButton
 * @implements { ISegmentedButtonItem }
 * @public
 */
@customElement({
	tag: "ui5-segmented-button-item",
	template: SegmentedButtonItemTemplate,
	dependencies: [Icon],
})
class SegmentedButtonItem extends ToggleButton implements ISegmentedButtonItem {
	
	/**
	 * Determines whether the component is displayed as pressed.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected!: boolean;

	/**
	 * Defines the index of the item inside of the SegmentedButton.
	 * @default 0
	 * @private
	 */
	@property({ validator: Integer, defaultValue: 0 })
	posInSet!: number;

	/**
	 * Defines how many items are inside of the SegmentedButton.
	 * @default 0
	 * @private
	 */
	@property({ validator: Integer, defaultValue: 0 })
	sizeOfSet!: number;

	_onclick() {
		this.pressed = !this.pressed;

		if (isSafari()) {
			this.getDomRef()!.focus();
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpaceShift(e)) {
			e.preventDefault();
			return;
		}

		super._onkeyup(e);
	}

	get ariaDescription() {
		return SegmentedButtonItem.i18nBundle.getText(SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION);
	}
}

SegmentedButtonItem.define();

export default SegmentedButtonItem;
