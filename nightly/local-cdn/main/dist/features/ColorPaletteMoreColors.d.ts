import { ComponentFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Dialog from "../Dialog.js";
import Button from "../Button.js";
import ColorPicker from "../ColorPicker.js";
declare class ColorPaletteMoreColors extends ComponentFeature {
    static get dependencies(): (typeof Button | typeof Dialog | typeof ColorPicker)[];
    static i18nBundle: I18nBundle;
    get colorPaletteDialogTitle(): string;
    get colorPaletteDialogOKButton(): string;
    get colorPaletteCancelButton(): string;
}
export default ColorPaletteMoreColors;
