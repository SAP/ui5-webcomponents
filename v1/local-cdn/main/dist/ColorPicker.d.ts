import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ColorRGB } from "@ui5/webcomponents-base/dist/util/ColorConversion.js";
type ColorCoordinates = {
    x: number;
    y: number;
};
/**
 * @class
 *
 * ### Overview
 * The `ui5-color-picker` allows users to choose any color and provides different input options for selecting colors.
 *
 * ### Usage
 *
 * #### When to use
 * Use the color picker if:
 *
 * -  users need to select any color freely.
 *
 * #### When not to use
 *
 * -  Users need to select one color from a predefined set of colors. Use the ColorPalette component instead.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/ColorPicker.js";`
 * @constructor
 * @since 1.0.0-rc.12
 * @extends UI5Element
 * @public
 */
declare class ColorPicker extends UI5Element {
    /**
     * Defines the currently selected color of the component.
     *
     * **Note**: use HEX, RGB, RGBA, HSV formats or a CSS color name when modifying this property.
     * @default "rgba(255, 255, 255, 1)"
     * @public
     */
    color: string;
    /**
     * Defines the HEX code of the currently selected color
     *
     * **Note**: If Alpha(transperancy) is set it is not included in this property. Use `color` property.
     * @private
     */
    hex: string;
    /**
     * Defines the current main color which is selected via the hue slider and is shown in the main color square.
     * @private
     */
    _mainColor: ColorRGB;
    /**
     * Defines the currenty selected color from the main color section.
     * @private
     */
    _color: ColorRGB;
    /**
     * @private
     */
    _selectedCoordinates: ColorCoordinates;
    /**
     * @private
     */
    _alpha: number;
    /**
     * @private
     */
    _hue: number;
    /**
     * @private
     */
    _isSelectedColorChanged: boolean;
    /**
     * @private
     */
    _isHueValueChanged: boolean;
    /**
     * @private
     */
    _wrongHEX: boolean;
    selectedHue: number;
    mouseDown: boolean;
    mouseIn: boolean;
    static i18nBundle: I18nBundle;
    static onDefine(): Promise<void>;
    constructor();
    onBeforeRendering(): void;
    _handleMouseDown(e: MouseEvent): void;
    _handleMouseUp(): void;
    _handleMouseOut(e: MouseEvent): void;
    _handleMouseMove(e: MouseEvent): void;
    _handleAlphaInput(e: CustomEvent): void;
    _handleHueInput(e: CustomEvent): void;
    _handleHEXChange(e: CustomEvent | KeyboardEvent): void;
    _handleRGBInputsChange(e: CustomEvent): void;
    _setMainColor(hueValue: number): void;
    _handleAlphaChange(): void;
    _changeSelectedColor(x: number, y: number): void;
    _onkeydown(e: KeyboardEvent): void;
    _calculateColorFromCoordinates(x: number, y: number): {
        h: number;
        s: number;
        l: number;
    } | undefined;
    _setColor(color?: ColorRGB): void;
    isValidRGBColor(color: ColorRGB): boolean;
    _setHex(): void;
    _setValues(): void;
    get hueSliderLabel(): string;
    get alphaSliderLabel(): string;
    get hexInputLabel(): string;
    get redInputLabel(): string;
    get greenInputLabel(): string;
    get blueInputLabel(): string;
    get alphaInputLabel(): string;
    get inputsDisabled(): true | undefined;
    get hexInputErrorState(): "Error" | undefined;
    get styles(): {
        mainColor: {
            "background-color": string;
        };
        circle: {
            left: string;
            top: string;
        };
        colorSpan: {
            "background-color": string;
        };
    };
}
export default ColorPicker;
