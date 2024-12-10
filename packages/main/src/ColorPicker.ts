import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import { isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import {
	getRGBColor,
} from "@ui5/webcomponents-base/dist/util/ColorConversion.js";
import type {
	ColorHSL,
	ColorRGB,
} from "@ui5/webcomponents-base/dist/util/ColorConversion.js";
import "@ui5/webcomponents-icons/dist/expand.js";
import ColorPickerTemplate from "./generated/templates/ColorPickerTemplate.lit.js";
import Input from "./Input.js";
import Slider from "./Slider.js";
import Label from "./Label.js";
import Button from "./Button.js";
import Icon from "./Icon.js";
import ColorPickerDisplayMode from "./types/ColorPickerDisplayMode.js";
import ColorValue from "./ColorValue.js";

import {
	COLORPICKER_ALPHA_SLIDER,
	COLORPICKER_HUE_SLIDER,
	COLORPICKER_HEX,
	COLORPICKER_RED,
	COLORPICKER_GREEN,
	COLORPICKER_BLUE,
	COLORPICKER_ALPHA,
	COLORPICKER_SATURATION,
	COLORPICKER_LIGHT,
	COLORPICKER_HUE,
	COLORPICKER_TOGGLE_MODE_TOOLTIP,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import ColorPickerCss from "./generated/themes/ColorPicker.css.js";

const PICKER_POINTER_WIDTH = 6.5;

type ColorCoordinates = {
	x: number,
	y: number,
}

type ColorChannelInput = {
	id: string,
	value: number,
	accessibleName: string
	label: string,
	showPercentSymbol?: boolean,
}

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

@customElement({
	tag: "ui5-color-picker",
	renderer: litRender,
	formAssociated: true,
	styles: ColorPickerCss,
	template: ColorPickerTemplate,
	dependencies: [
		Input,
		Slider,
		Label,
		Button,
		Icon,
	],
	shadowRootOptions: { delegatesFocus: true },
})
/**
 * Fired when the the selected color is changed
 * @public
 */
@event("change", {
	bubbles: true,
})
class ColorPicker extends UI5Element implements IFormInputElement {
	/**
	 * Defines the currently selected color of the component.
	 *
	 * **Note**: use HEX, RGB, RGBA, HSV formats or a CSS color name when modifying this property.
	 * @default "rgba(255,255,255,1)"
	 * @public
	 */
	@property()
	value = "rgba(255,255,255,1)";

	/**
	 * Determines the name by which the component will be identified upon submission in an HTML form.
	 *
	 * **Note:** This property is only applicable within the context of an HTML Form element.
	 * @default undefined
	 * @public
	 * @since 2.0.0
	 */
	@property()
	name?: string;

	/**
	 * Defines the display mode of the component.
	 * @default "Default"
	 * @public
	 * @since 2.5.0
	 */
	@property()
	displayMode: `${ColorPickerDisplayMode}` = "Default";

	/**
	 * Defines the current main color which is selected via the hue slider and is shown in the main color square.
	 * @private
	 */
	@property({ type: Object })
	_mainValue: ColorRGB;

	/**
	 * Defines the currenty selected color.
	 * @private
	 */
	@property({ type: Boolean })
	_colorValue: ColorValue;

	/**
	 * @private
	 */
	@property({ type: Object })
	_selectedCoordinates: ColorCoordinates;

	/**
	 * @private
	 */
	@property({ type: Number })
	_alpha = 1;

	/**
	 * @private
	 */
	@property({ type: Number })
	_hue = 0;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_isSelectedColorChanged = false;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_isHueValueChanged = false;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_wrongHEX = false;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_displayHSL = false;

	selectedHue: number;

	mouseDown: boolean;

	mouseIn: boolean;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	async formElementAnchor() {
		return this.getFocusDomRefAsync();
	}

	get formFormattedValue() {
		return this.value;
	}

	constructor() {
		super();
		this._colorValue = new ColorValue();

		// Bottom Right corner
		this._selectedCoordinates = {
			x: 256 - PICKER_POINTER_WIDTH,
			y: 256 - PICKER_POINTER_WIDTH,
		};

		// Default main color is red
		this._mainValue = {
			r: 255,
			g: 0,
			b: 0,
		};

		this.selectedHue = 0;

		this.mouseDown = false;
		this.mouseIn = false;
	}

	onBeforeRendering() {
		const valueAsRGB = getRGBColor(this.value);
		if (!this._isColorValueEqual(valueAsRGB)) {
			this._colorValue.RGB = valueAsRGB;
		}
		const tempColor = this._colorValue.toRGBString();
		this._setValues();
		this.style.setProperty(getScopedVarName("--ui5_Color_Picker_Progress_Container_Color"), tempColor);
	}

	_handleMouseDown(e: MouseEvent) {
		this.mouseDown = true;
		this.mouseIn = true;
		this._changeSelectedColor(e.offsetX, e.offsetY);
	}

	_handleMouseUp() {
		this.mouseDown = false;
	}

	_handleMouseOut(e: MouseEvent) {
		if (!this.mouseIn || !this.mouseDown) {
			return;
		}

		const target = e.target as HTMLElement;
		const offsetHeight: number = target.offsetHeight;
		const offsetWidth: number = target.offsetWidth;
		const isLeft: boolean = e.offsetX <= 0;
		const isUp: boolean = e.offsetY <= 0;
		const isDown: boolean = e.offsetY >= target.offsetHeight;
		const isRight: boolean = e.offsetX >= target.offsetWidth;

		let x: number,
			y: number;

		if (isLeft) {
			x = 0;
		} else if (isRight) {
			// Note: - e.offsetWidth has been changed to e.target.offsetWidth as offsetWidth does not exist on the event object
			x = offsetWidth;
		} else {
			x = e.offsetX;
		}

		if (isUp) {
			y = 0;
		} else if (isDown) {
			// Note: - e.offsetWidth has been changed to e.target.offsetWidth as offsetWidth does not exist on the event object
			y = offsetHeight;
		} else {
			y = e.offsetY;
		}

		this._changeSelectedColor(x, y);
		this.mouseIn = false;
		this.mouseDown = false;
	}

	_handleMouseMove(e: MouseEvent) {
		if (!this.mouseDown || !this.mouseIn) {
			return;
		}

		this._changeSelectedColor(e.offsetX, e.offsetY);
	}

	_handleAlphaInput(e: CustomEvent) {
		const aphaInputValue: string = (e.target as Input).value;
		this._alpha = parseFloat(aphaInputValue);
		if (Number.isNaN(this._alpha)) {
			this._alpha = 1;
		}
		this._colorValue.Alpha = this._alpha;
		this._isHueValueChanged = true;
		this._setValue(this._colorValue.toRGBString());
	}

	_handleHueInput(e: CustomEvent) {
		this.selectedHue = (e.target as Slider).value;
		this._hue = this.selectedHue;
		this._setMainColor(this._hue);
		// Idication that changes to the hue value triggered as a result of user pressing over the hue slider.
		this._isHueValueChanged = true;

		const hue = Math.round(this._hue / 4.251);
		const normalizedHue = ((hue % 360) + 360) % 360;

		this._colorValue.H = normalizedHue;
		this._setValue(this._colorValue.toRGBString());
	}

	_handleHEXChange(e: CustomEvent | KeyboardEvent) {
		const input: Input = (e.target as Input);
		let inputValueLowerCase = input.value.toLowerCase();

		// Shorthand Syntax
		if (inputValueLowerCase.length === 3) {
			inputValueLowerCase = `${inputValueLowerCase[0]}${inputValueLowerCase[0]}${inputValueLowerCase[1]}${inputValueLowerCase[1]}${inputValueLowerCase[2]}${inputValueLowerCase[2]}`;
		}

		this._colorValue.HEX = inputValueLowerCase;
		const isValidColor = this._colorValue.isColorValueValid();

		if (isValidColor && input.value !== inputValueLowerCase) {
			this._wrongHEX = false;
			input.value = inputValueLowerCase;
		}

		if (!isValidColor) {
			this._wrongHEX = true;
		} else {
			this._wrongHEX = false;
			this._setValue(this._colorValue.toRGBString());
		}
	}

	_togglePickerMode() {
		this._displayHSL = !this._displayHSL;
	}

	_handleColorInputChange(e: CustomEvent) {
		const target = e.target as Input;
		const targetValue = parseInt(target.value) || 0;

		switch (target.id) {
		case "red":
			this._colorValue.R = targetValue;
			break;

		case "green":
			this._colorValue.G = targetValue;
			break;

		case "blue":
			this._colorValue.B = targetValue;
			break;

		case "hue":
			this._colorValue.H = targetValue;
			break;

		case "saturation":
			this._colorValue.S = targetValue;
			break;

		case "light":
			this._colorValue.L = targetValue;
			break;
		}

		this._setValue(this._colorValue.toRGBString());
		this._setValues();
	}

	_setMainColor(hueValue: number) {
		if (hueValue <= 255) {
			this._mainValue = {
				r: 255,
				g: hueValue,
				b: 0,
			};
		} else if (hueValue <= 510) {
			this._mainValue = {
				r: 255 - (hueValue - 255),
				g: 255,
				b: 0,
			};
		} else if (hueValue <= 765) {
			this._mainValue = {
				r: 0,
				g: 255,
				b: hueValue - 510,
			};
		} else if (hueValue <= 1020) {
			this._mainValue = {
				r: 0,
				g: 765 - (hueValue - 255),
				b: 255,
			};
		} else if (hueValue <= 1275) {
			this._mainValue = {
				r: hueValue - 1020,
				g: 0,
				b: 255,
			};
		} else {
			this._mainValue = {
				r: 255,
				g: 0,
				b: 1275 - (hueValue - 255),
			};
		}
	}

	_handleAlphaChange() {
		this._alpha = this._alpha < 0 ? 0 : this._alpha;
		this._alpha = this._alpha > 1 ? 1 : this._alpha;
		this._colorValue.Alpha = this._alpha;
	}

	_changeSelectedColor(x: number, y: number) {
		this._selectedCoordinates = {
			x: x - PICKER_POINTER_WIDTH, // Center the coordinates, because of the width of the circle
			y: y - PICKER_POINTER_WIDTH, // Center the coordinates, because of the height of the circle
		};

		// Idication that changes to the color settings are triggered as a result of user pressing over the main color section.
		this._isSelectedColorChanged = true;

		const tempColor = this._calculateColorFromCoordinates(x, y);
		if (tempColor) {
			this._colorValue.HSL = tempColor;
			this._setValue(this._colorValue.toRGBString());
		}
	}

	_onkeydown(e: KeyboardEvent) {
		if (isEnter(e)) {
			this._handleHEXChange(e);
		}
	}

	_calculateColorFromCoordinates(x: number, y: number) {
		// By using the selected coordinates(x = Lightness, y = Saturation) and hue(selected from the hue slider)
		// and HSL format, the color will be parsed to RGB
		// 0 ≤ H < 360
		// 4.251 because with 4.25 we get out of the colors range.
		const h = this._hue / 4.251;

		let s = +(1 - (y / 256)).toFixed(2);

		let l = +(x / 256).toFixed(2);

		if (Number.isNaN(s) || Number.isNaN(l)) {
			// The event is finished out of the main color section
			return;
		}

		// Normalize values to be between 0 and 1 in case of rounding issues
		s = Math.max(0, Math.min(1, s));
		l = Math.max(0, Math.min(1, l));

		return {
			h: Math.round(h),
			s: Math.round(s * 100),
			l: Math.round(l * 100),
		};
	}

	_setValue(color: string) {
		this.value = color;
		this._wrongHEX = !this._colorValue.isColorValueValid();
		this.fireDecoratorEvent("change");
	}

	_setValues() {
		const hslColours: ColorHSL = this._colorValue.HSL;
		this._selectedCoordinates = {
			x: ((hslColours.l * 2.56)) - PICKER_POINTER_WIDTH, // Center the coordinates, because of the width of the circle
			y: (256 - (hslColours.s * 2.56)) - PICKER_POINTER_WIDTH, // Center the coordinates, because of the height of the circle
		};

		if (this._isSelectedColorChanged) { // We shouldn't update the hue value when user presses over the main color section.
			this._isSelectedColorChanged = false;
		} else if (this._isHueValueChanged) { // We shouldn't recalculate the hue value when user changes the hue slider.
			this._isHueValueChanged = false;
			this._hue = this.selectedHue ? this.selectedHue : this._hue;
		} else {
			this._hue = Math.round(hslColours.h * 4.25);
		}

		this._setMainColor(this._hue);
	}

	_isColorValueEqual(value: ColorRGB): boolean {
		return this._colorValue.R === value.r
			&& this._colorValue.G === value.g
			&& this._colorValue.B === value.b;
	}

	get hueSliderLabel() {
		return ColorPicker.i18nBundle.getText(COLORPICKER_HUE_SLIDER);
	}

	get alphaSliderLabel() {
		return ColorPicker.i18nBundle.getText(COLORPICKER_ALPHA_SLIDER);
	}

	get hexInputLabel() {
		return ColorPicker.i18nBundle.getText(COLORPICKER_HEX);
	}

	get redInputLabel() {
		return ColorPicker.i18nBundle.getText(COLORPICKER_RED);
	}

	get greenInputLabel() {
		return ColorPicker.i18nBundle.getText(COLORPICKER_GREEN);
	}

	get blueInputLabel() {
		return ColorPicker.i18nBundle.getText(COLORPICKER_BLUE);
	}

	get hueInputLabel() {
		return ColorPicker.i18nBundle.getText(COLORPICKER_HUE);
	}

	get saturationInputLabel() {
		return ColorPicker.i18nBundle.getText(COLORPICKER_SATURATION);
	}

	get lightInputLabel() {
		return ColorPicker.i18nBundle.getText(COLORPICKER_LIGHT);
	}

	get alphaInputLabel() {
		return ColorPicker.i18nBundle.getText(COLORPICKER_ALPHA);
	}

	get toggleModeTooltip() {
		return ColorPicker.i18nBundle.getText(COLORPICKER_TOGGLE_MODE_TOOLTIP);
	}

	get inputsDisabled() {
		return this._wrongHEX ? true : undefined;
	}

	get hexInputErrorState() {
		return this._wrongHEX ? "Error" : undefined;
	}

	get rgbInputs(): Array<ColorChannelInput> {
		const redInput = {
			id: "red",
			value: this._colorValue.R,
			disabled: this.inputsDisabled,
			label: "R",
			accessibleName: this.redInputLabel,
		};

		const greenInput = {
			id: "green",
			value: this._colorValue.G,
			disabled: this.inputsDisabled,
			label: "G",
			accessibleName: this.greenInputLabel,
		};

		const blueInput = {
			id: "blue",
			value: this._colorValue.B,
			disabled: this.inputsDisabled,
			label: "B",
			accessibleName: this.blueInputLabel,
		};

		return [redInput, greenInput, blueInput];
	}

	get hslInputs(): Array<ColorChannelInput> {
		const hueInput = {
			id: "hue",
			value: this._colorValue.H,
			disabled: this.inputsDisabled,
			label: "H",
			accessibleName: this.hueInputLabel,
		};

		const saturationInput = {
			id: "saturation",
			value: this._colorValue.S,
			disabled: this.inputsDisabled,
			label: "S",
			accessibleName: this.saturationInputLabel,
			showPercentSymbol: true,
		};

		const lightInput = {
			id: "light",
			value: this._colorValue.L,
			disabled: this.inputsDisabled,
			label: "L",
			accessibleName: this.lightInputLabel,
			showPercentSymbol: true,
		};

		return [hueInput, saturationInput, lightInput];
	}

	get HEX(): string {
		return this._colorValue.HEX;
	}

	get colorChannelInputs() {
		return this._displayHSL ? this.hslInputs : this.rgbInputs;
	}

	get _isDefaultPickerMode() {
		return this.displayMode === ColorPickerDisplayMode.Default;
	}

	get styles() {
		return {
			mainColor: {
				"background-color": `rgb(${this._mainValue.r}, ${this._mainValue.g}, ${this._mainValue.b})`,
			},
			circle: {
				left: `${this._selectedCoordinates.x}px`,
				top: `${this._selectedCoordinates.y}px`,
			},
			colorSpan: {
				"background-color": this._colorValue.toString(),
			},
		};
	}
}

ColorPicker.define();

export default ColorPicker;
