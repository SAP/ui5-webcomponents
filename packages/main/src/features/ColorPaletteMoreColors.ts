import { ComponentFeature, registerComponentFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";

import Dialog from "../Dialog.js";
import Button from "../Button.js";
import ColorPicker from "../ColorPicker.js";

import {
	COLOR_PALETTE_DIALOG_CANCEL_BUTTON,
	COLOR_PALETTE_DIALOG_OK_BUTTON,
	COLOR_PALETTE_DIALOG_TITLE,
} from "../generated/i18n/i18n-defaults.js";

class ColorPaletteMoreColors extends ComponentFeature {
	static get dependencies() {
		return [
			Dialog,
			Button,
			ColorPicker,
		];
	}

	static i18nBundle: I18nBundle;

	get colorPaletteDialogTitle() {
		return ColorPaletteMoreColors.i18nBundle.getText(COLOR_PALETTE_DIALOG_TITLE);
	}

	get colorPaletteDialogOKButton() {
		return ColorPaletteMoreColors.i18nBundle.getText(COLOR_PALETTE_DIALOG_OK_BUTTON);
	}

	get colorPaletteCancelButton() {
		return ColorPaletteMoreColors.i18nBundle.getText(COLOR_PALETTE_DIALOG_CANCEL_BUTTON);
	}
}

registerComponentFeature("ColorPaletteMoreColors", ColorPaletteMoreColors);

export default ColorPaletteMoreColors;
