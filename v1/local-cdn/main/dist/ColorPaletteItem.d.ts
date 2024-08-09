import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { IColorPaletteItem } from "./ColorPalette.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-color-palette-item` component represents a color in the the `ui5-color-palette`.
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.12
 * @implements { IColorPaletteItem }
 * @public
 */
declare class ColorPaletteItem extends UI5Element implements IColorPaletteItem {
    /**
     * Defines the colour of the component.
     *
     * **Note:** The value should be a valid CSS color.
     * @default undefined
     * @public
     */
    value?: string;
    /**
     * Defines the tab-index of the element, helper information for the ItemNavigation.
     * @private
     */
    forcedTabIndex: string;
    /**
     * Defines the index of the item inside of the ColorPalette.
     * @private
     */
    index?: number;
    /**
     * Defines if the ColorPalette is on phone mode.
     * @private
     */
    onPhone: boolean;
    /**
     * @private
     * @since 1.0.0-rc.15
     */
    _disabled: boolean;
    static i18nBundle: I18nBundle;
    static onDefine(): Promise<void>;
    constructor();
    onBeforeRendering(): void;
    get colorLabel(): string;
    get styles(): {
        root: {
            "background-color": string | undefined;
        };
    };
}
export default ColorPaletteItem;
