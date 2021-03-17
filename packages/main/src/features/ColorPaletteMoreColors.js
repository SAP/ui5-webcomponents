import { registerFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";

import Dialog from "../Dialog.js";
import Button from "../Button.js";
import ColorPicker from "../ColorPicker.js";

import {
	COLOR_PALETTE_DIALOG_CANCEL_BUTTON,
	COLOR_PALETTE_DIALOG_OK_BUTTON,
	COLOR_PALETTE_DIALOG_TITLE,
} from "../generated/i18n/i18n-defaults.js";

class ColorPaletteMoreColors {
	constructor() {
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	static get dependencies() {
		return [
			Dialog,
			Button,
			ColorPicker,
		];
	}

	get colorPaletteDialogTitle() {
		return this.i18nBundle.getText(COLOR_PALETTE_DIALOG_TITLE);
	}

	get colorPaletteDialogOKButton() {
		return this.i18nBundle.getText(COLOR_PALETTE_DIALOG_OK_BUTTON);
	}

	get colorPaletteCancelButton() {
		return this.i18nBundle.getText(COLOR_PALETTE_DIALOG_CANCEL_BUTTON);
	}
}

registerFeature("ColorPaletteMoreColors", ColorPaletteMoreColors);

export default ColorPaletteMoreColors;
