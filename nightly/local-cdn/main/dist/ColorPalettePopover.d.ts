import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ResponsivePopover from "./ResponsivePopover.js";
import type { ColorPaletteItemClickEventDetail, IColorPaletteItem } from "./ColorPalette.js";
import type ColorPaletteItem from "./ColorPaletteItem.js";
type ColorPalettePopoverItemClickEventDetail = ColorPaletteItemClickEventDetail;
/**
 * @class
 *
 * ### Overview
 * Represents a predefined range of colors for easier selection.
 *
 * Overview
 * The ColorPalettePopover provides the users with a slot to predefine colors.
 *
 * You can customize them with the use of the colors property. You can specify a defaultColor and display a "Default color" button for the user to choose directly.
 * You can display a "More colors..." button that opens an additional color picker for the user to choose specific colors that are not present in the predefined range.
 *
 * ### Usage
 *
 * The palette is intended for users, who don't want to check and remember the different values of the colors and spend large amount of time to configure the right color through the color picker.
 *
 * For the `ui5-color-palette-popover`
 * ### ES6 Module Import
 *
 * `import @ui5/webcomponents/dist/ColorPalettePopover.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.16
 */
declare class ColorPalettePopover extends UI5Element {
    /**
     * Defines whether the user can see the last used colors in the bottom of the component
     * @default false
     * @public
     */
    showRecentColors: boolean;
    /**
     * Defines whether the user can choose a custom color from a component.
     *
     * **Note:** In order to use this property you need to import the following module: `"@ui5/webcomponents/dist/features/ColorPaletteMoreColors.js"`
     * @default false
     * @public
     */
    showMoreColors: boolean;
    /**
     * Defines whether the user can choose the default color from a button.
     * @default false
     * @public
     */
    showDefaultColor: boolean;
    /**
     * Defines the default color of the component.
     *
     * **Note:** The default color should be a part of the ColorPalette colors`
     * @default undefined
     * @public
     */
    defaultColor?: string;
    /**
     * Defines the open | closed state of the popover.
     * @public
     * @default false
     * @since 1.21.0
     */
    open: boolean;
    /**
     * Defines the ID or DOM Reference of the element that the popover is shown at.
     * @public
     * @default undefined
     * @since 1.21.0
     */
    opener?: HTMLElement | string;
    /**
     * Defines the content of the component.
     * @public
     */
    colors: Array<IColorPaletteItem>;
    static i18nBundle: I18nBundle;
    static onDefine(): Promise<void>;
    constructor();
    get responsivePopover(): ResponsivePopover;
    get respPopover(): ResponsivePopover;
    /**
     * Shows the ColorPalettePopover.
     * @param opener the element that the popover is shown at
     * @public
     * @deprecated The method is deprecated in favour of `open` and `opener` properties.
     * @since 1.1.1
     */
    showAt(opener: HTMLElement): void;
    /**
     * Shows the ColorPalettePopover.
     * @param opener the element that the popover is shown at
     * @public
     * @since 1.0.0-rc.16
     * @deprecated The method is deprecated in favour of `open` and `opener` properties.
     */
    openPopover(opener: HTMLElement): void;
    closePopover(): void;
    onAfterClose(): void;
    onSelectedColor(e: CustomEvent<ColorPaletteItemClickEventDetail>): void;
    /**
     * Returns if the component is opened.
     * @protected
     * @since 1.0.0-rc.16
     */
    isOpen(): boolean;
    get colorPaletteColors(): ColorPaletteItem[];
    get _colorPaletteTitle(): string;
    get _cancelButtonLabel(): string;
    get _open(): true | undefined;
}
export default ColorPalettePopover;
export type { ColorPalettePopoverItemClickEventDetail };
