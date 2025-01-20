import { ComponentFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ColorPaletteMoreColorsTemplate from "./ColorPaletteMoreColorsTemplate.js";
declare class ColorPaletteMoreColors extends ComponentFeature {
    static i18nBundle: I18nBundle;
    get template(): typeof ColorPaletteMoreColorsTemplate;
    get colorPaletteDialogTitle(): string;
    get colorPaletteDialogOKButton(): string;
    get colorPaletteCancelButton(): string;
}
export default ColorPaletteMoreColors;
