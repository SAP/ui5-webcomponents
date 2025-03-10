import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import type ColorPaletteItem from "./ColorPaletteItem.js";
import type Button from "./Button.js";
import "./ColorPaletteItem.js";
/**
 * Interface for components that may be used inside a `ui5-color-palette` or `ui5-color-palette-popover`
 * @public
 */
interface IColorPaletteItem extends UI5Element, ITabbable {
    value?: string;
    index?: number;
    selected?: boolean;
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
    eventDetails: {
        "item-click": ColorPaletteItemClickEventDetail;
    };
    /**
     * Defines whether the user can see the last used colors in the bottom of the component
     * @private
     * @since 1.0.0-rc.15
     */
    showRecentColors: boolean;
    /**
     * Defines whether the user can choose a custom color from a color picker
     *
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
     * Defines the default color of the color palette, only valid CSS color values accepted
     *
     * **Note:** The default color should be a part of the ColorPalette colors`
     * @private
     * @since 1.0.0-rc.16
     */
    defaultColor?: string;
    /**
     * Defines the selected color, only valid CSS color values accepted
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

     * The showMoreColors template.
     * @private
     */
    showMoreColorsTemplate?: JsxTemplate;
    /**
     * @private
     */
    dialogOpen: boolean;
    /**
     * @private
     */
    colorPickerValue: string;
    /**
     * Defines the `ui5-color-palette-item` elements.
     * @public
     */
    colors: Array<IColorPaletteItem>;
    _itemNavigation: ItemNavigation;
    _itemNavigationRecentColors: ItemNavigation;
    _recentColors: Array<string>;
    _currentlySelected?: ColorPaletteItem;
    _shouldFocusRecentColors: boolean;
    static i18nBundle: I18nBundle;
    constructor();
    onBeforeRendering(): void;
    onAfterRendering(): void;
    selectColor(item: ColorPaletteItem): void;
    _setColor(color: string): void;
    get effectiveColorItems(): IColorPaletteItem[];
    /**
     * Ensures that only one item is selected or only the last selected item remains active if more than one are explicitly set as 'selected'.
     * @private
     */
    _ensureSingleSelectionOrDeselectAll(): void;
    _onclick(e: MouseEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    handleSelection(target: ColorPaletteItem): void;
    _handleDefaultColorClick(e: KeyboardEvent): void;
    _onDefaultColorKeyUp(e: KeyboardEvent): void;
    _onDefaultColorKeyDown(e: KeyboardEvent): void;
    _onMoreColorsKeyDown(e: KeyboardEvent): void;
    _isUpOrDownNavigatableColorPaletteItem(e: KeyboardEvent): boolean | undefined;
    _onColorContainerKeyDown(e: KeyboardEvent): void;
    _onRecentColorsContainerKeyDown(e: KeyboardEvent): void;
    focusColorElement(element: ColorPaletteNavigationItem, itemNavigation: ItemNavigation): void;
    get firstFocusableElement(): ColorPaletteNavigationItem;
    onColorPickerChange(e: Event): void;
    _chooseCustomColor(): void;
    _addRecentColor(color: string): void;
    _closeDialog(): void;
    _openMoreColorsDialog(): void;
    _onDefaultColorClick(): void;
    /**
     * Returns the selected item.
     */
    get selectedItem(): ColorPaletteItem | IColorPaletteItem | undefined;
    get allColorsInPalette(): (ColorPaletteItem | IColorPaletteItem)[];
    get colorPaletteDialogTitle(): string;
    get colorPaletteDialogOKButton(): string;
    get colorPaletteCancelButton(): string;
    /**
     * Returns the selected color.
     */
    get selectedColor(): string | undefined;
    get displayedColors(): IColorPaletteItem[];
    get colorContainerLabel(): string;
    get colorPaletteMoreColorsText(): string;
    get colorPaletteDefaultColorText(): string;
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
    static ColorPaletteMoreColorsTemplate?: JsxTemplate;
}
export default ColorPalette;
export type { ColorPaletteItemClickEventDetail, IColorPaletteItem, };
