import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ColorPaletteItem from "./ColorPaletteItem.js";
import Button from "./Button.js";
import type Dialog from "./Dialog.js";
import type ColorPaletteMoreColors from "./features/ColorPaletteMoreColors.js";
import type ColorPicker from "./ColorPicker.js";
/**
 * Interface for components that may be used inside a `ui5-color-palette` or `ui5-color-palette-popover`
 * @public
 */
interface IColorPaletteItem extends HTMLElement, ITabbable {
    value?: string;
    index?: number;
}
type ColorPaletteNavigationItem = IColorPaletteItem | Button;
type ColorPaletteItemClickEventDetail = {
    color: string;
};
/**
 * @class
 *
 * ### Overview
 * The `ui5-color-palette` provides the users with a range of predefined colors. The colors are fixed and do not change with the theme.
 *
 * ### Usage
 *
 * The `ui5-color-palette` is meant for users that need to select a color from a predefined set.
 * To define the colors, use the `ui5-color-palette-item` component inside the default slot of the `ui5-color-palette`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/ColorPalette.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.12
 * @public
 */
declare class ColorPalette extends UI5Element {
    /**
     * Defines whether the user can see the last used colors in the bottom of the component
     * @private
     * @since 1.0.0-rc.15
     */
    showRecentColors: boolean;
    /**
     * Defines whether the user can choose a custom color from a color picker
     *
     * **Note:** In order to use this property you need to import the following module: `"@ui5/webcomponents/dist/features/ColorPaletteMoreColors.js"`
     * @private
     * @since 1.0.0-rc.15
     */
    showMoreColors: boolean;
    /**
     * Defines whether the user can choose the default color from a button.
     * @default false
     * @private
     * @since 1.0.0-rc.16
     */
    showDefaultColor: boolean;
    /**
     * Defines the default color of the color palette
     *
     * **Note:** The default color should be a part of the ColorPalette colors`
     * @private
     * @since 1.0.0-rc.16
     */
    defaultColor?: string;
    /**
     * Defines the selected color.
     * @private
     */
    _selectedColor?: string;
    /**
     * Defines if the palette is in Popup or Embeded mode.
     * @private
     */
    popupMode: boolean;
    /**
     * Defines if the palette is rendered on phone.
     * @private
     */
    onPhone: boolean;
    /**
     * Defines the `ui5-color-palette-item` elements.
     * @public
     */
    colors: Array<IColorPaletteItem>;
    _itemNavigation: ItemNavigation;
    _itemNavigationRecentColors: ItemNavigation;
    _recentColors: Array<string>;
    moreColorsFeature?: ColorPaletteMoreColors;
    static i18nBundle: I18nBundle;
    static onDefine(): Promise<void>;
    constructor();
    onBeforeRendering(): void;
    onAfterRendering(): void;
    selectColor(item: ColorPaletteItem): void;
    _setColor(color: string): void;
    _onclick(e: MouseEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    _onDefaultColorKeyDown(e: KeyboardEvent): void;
    _onMoreColorsKeyDown(e: KeyboardEvent): void;
    _onColorContainerKeyDown(e: KeyboardEvent): void;
    _onRecentColorsContainerKeyDown(e: KeyboardEvent): void;
    focusColorElement(element: ColorPaletteNavigationItem, itemNavigation: ItemNavigation): void;
    focusFirstDisplayColorElement(): void;
    focusFirstFocusableElement(): void;
    get firstFocusableElement(): ColorPaletteNavigationItem;
    _chooseCustomColor(): Promise<void>;
    _closeDialog(): Promise<void>;
    _openMoreColorsDialog(): Promise<void>;
    _onDefaultColorClick(): void;
    /**
     * Returns the selected color.
     */
    get selectedColor(): string | undefined;
    get displayedColors(): IColorPaletteItem[];
    get colorContainerLabel(): string;
    get colorPaletteMoreColorsText(): string;
    get colorPaletteDefaultColorText(): string;
    get _showMoreColors(): false | ColorPaletteMoreColors | undefined;
    get rowSize(): number;
    get hasRecentColors(): string | false;
    get recentColors(): string[];
    get recentColorsElements(): Array<ColorPaletteItem>;
    get colorPaletteNavigationElements(): ColorPaletteNavigationItem[];
    get classes(): {
        colorPaletteRoot: {
            "ui5-cp-root": boolean;
            "ui5-cp-root-phone": boolean;
        };
    };
    _getDialog(): Promise<Dialog>;
    getColorPicker(): Promise<ColorPicker>;
}
export default ColorPalette;
export type { ColorPaletteItemClickEventDetail, IColorPaletteItem, };
