import { ComponentFeature, registerComponentFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import ColorPaletteMoreColorsTemplate from "./ColorPaletteMoreColorsTemplate.js";
import { COLOR_PALETTE_DIALOG_CANCEL_BUTTON, COLOR_PALETTE_DIALOG_OK_BUTTON, COLOR_PALETTE_DIALOG_TITLE, } from "../generated/i18n/i18n-defaults.js";
class ColorPaletteMoreColors extends ComponentFeature {
    get template() {
        return ColorPaletteMoreColorsTemplate;
    }
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
//# sourceMappingURL=ColorPaletteMoreColors.js.map