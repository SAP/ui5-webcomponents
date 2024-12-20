import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import { isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import {
	getRGBColor,
	getAlpha,
	HSLToRGB,
	HEXToRGB,
	RGBToHSL,
} from "@ui5/webcomponents-base/dist/util/ColorConversion.js";
import type {
	ColorHSL,
	ColorRGB,
} from "@ui5/webcomponents-base/dist/util/ColorConversion.js";
import ColorPickerTemplate from "./ColorPickerTemplate.js";
import Input from "./Input.js";
import Slider from "./Slider.js";
import Label from "./Label.js";

import {
	COLORPICKER_ALPHA_SLIDER,
	COLORPICKER_HUE_SLIDER,
	COLORPICKER_HEX,
	COLORPICKER_RED,
	COLORPICKER_GREEN,
	COLORPICKER_BLUE,
	COLORPICKER_ALPHA,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import ColorPickerCss from "./generated/themes/ColorPicker.css.js";

const PICKER_POINTER_WIDTH = 6.5;

type ColorCoordinates = {
	x: number,
	y: number,
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
	renderer: jsxRenderer,
	formAssociated: true,
	styles: ColorPickerCss,
	template: ColorPickerTemplate,
	dependencies: [
		Input,
		Slider,
		Label,
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
	eventDetails!: {
		change: void;
	}
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
	 * When set to `true`, the alpha slider and inputs for RGB values will not be displayed.
	 * @default false
	 * @public
	 * @since 2.5.0
	 */
	@property({ type: Boolean })
	simplified = false;

	/**
	 * Defines the HEX code of the currently selected color
	 *
	 * **Note**: If Alpha(transperancy) is set it is not included in this property. Use `color` property.
	 * @private
	 */
	@property({ noAttribute: true })
	hex = "ffffff";

	/**
	 * Defines the current main color which is selected via the hue slider and is shown in the main color square.
	 * @private
	 */
	@property({ type: Object })
	_mainValue: ColorRGB;

	/**
	 * Defines the currenty selected color from the main color section.
	 * @private
	 */
	@property({ type: Object })
	_value: ColorRGB = getRGBColor(this.value);

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
		// we have the color & ._mainValue properties here
		this._value = getRGBColor(this.value);
		this._alpha = getAlpha(this.value);
		const tempColor = `rgba(${this._value.r},${this._value.g},${this._value.b},${this._alpha})`;
		this._setHex();
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

	_handleAlphaInputFromSlider(e: CustomEvent) {
		const aphaInputValue: string = (e.target as Input).value;
		this._alpha = parseFloat(aphaInputValue);
		if (Number.isNaN(this._alpha)) {
			this._alpha = 1;
		}
		this._isHueValueChanged = true;
		this._setColor(this._value);
	}

	_handleHueInput(e: CustomEvent) {
		this.selectedHue = (e.target as Slider).value;
		this._hue = this.selectedHue;
		this._setMainColor(this._hue);
		// Idication that changes to the hue value triggered as a result of user pressing over the hue slider.
		this._isHueValueChanged = true;

		const x: number = this._selectedCoordinates.x + PICKER_POINTER_WIDTH;
		const y: number = this._selectedCoordinates.y + PICKER_POINTER_WIDTH;
		const tempColor = this._calculateColorFromCoordinates(x, y);

		if (tempColor) {
			this._setColor(HSLToRGB(tempColor));
		}
	}

	_handleHEXChange(e: CustomEvent | KeyboardEvent) {
		const hexRegex = new RegExp("^[<0-9 abcdef]+$");
		const input: Input = (e.target as Input);
		let inputValueLowerCase = input.value.toLowerCase();

		// Shorthand Syntax
		if (inputValueLowerCase.length === 3) {
			inputValueLowerCase = `${inputValueLowerCase[0]}${inputValueLowerCase[0]}${inputValueLowerCase[1]}${inputValueLowerCase[1]}${inputValueLowerCase[2]}${inputValueLowerCase[2]}`;
		}

		const isNewValueValid = inputValueLowerCase.length === 6 && hexRegex.test(inputValueLowerCase);

		if (isNewValueValid && input.value !== inputValueLowerCase) {
			this._wrongHEX = false;
			input.value = inputValueLowerCase;
		}

		if (inputValueLowerCase === this.hex) {
			return;
		}

		this.hex = inputValueLowerCase;

		if (!isNewValueValid) {
			this._wrongHEX = true;
		} else {
			this._wrongHEX = false;
			this._setColor(HEXToRGB(this.hex));
		}
	}

	_handleRGBInputsChange(e: Event) {
		const target = e.target as Input;
		const targetValue = parseInt(target.value) || 0;
		let tempColor;
		switch (target.id) {
		case "red":
			tempColor = { ...this._value, r: targetValue };
			break;

		case "green":
			tempColor = { ...this._value, g: targetValue };
			break;

		case "blue":
			tempColor = { ...this._value, b: targetValue };
			break;
		default:
			tempColor = { ...this._value };
		}

		this._setColor(tempColor);
	}

	_setMainColor(hueValue: number) {
		const hueValueMod = hueValue * 4.251;

		if (hueValueMod <= 255) {
			this._mainValue = {
				r: 255,
				g: hueValueMod,
				b: 0,
			};
		} else if (hueValueMod <= 510) {
			this._mainValue = {
				r: 255 - (hueValueMod - 255),
				g: 255,
				b: 0,
			};
		} else if (hueValueMod <= 765) {
			this._mainValue = {
				r: 0,
				g: 255,
				b: hueValueMod - 510,
			};
		} else if (hueValueMod <= 1020) {
			this._mainValue = {
				r: 0,
				g: 765 - (hueValueMod - 255),
				b: 255,
			};
		} else if (hueValueMod <= 1275) {
			this._mainValue = {
				r: hueValueMod - 1020,
				g: 0,
				b: 255,
			};
		} else {
			this._mainValue = {
				r: 255,
				g: 0,
				b: 1275 - (hueValueMod - 255),
			};
		}
	}

	_handleAlphaChange(e: CustomEvent) {
		this._handleAlphaInputFromSlider(e);

		this._alpha = this._alpha < 0 ? 0 : this._alpha;
		this._alpha = this._alpha > 1 ? 1 : this._alpha;
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
			this._setColor(HSLToRGB(tempColor));
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
		const h = this._hue;

		// 0 ≤ S ≤ 1
		const s = 1 - +(Math.round(parseFloat((y / 256) + "e+2")) + "e-2"); // eslint-disable-line

		// 0 ≤ V ≤ 1
		const l = +(Math.round(parseFloat((x / 256) + "e+2")) + "e-2"); // eslint-disable-line

		if (!s || !l) {
			// The event is finished out of the main color section
			return;
		}

		return {
			h,
			s,
			l,
		};
	}

	_setColor(color: ColorRGB = { r: 0, g: 0, b: 0 }) {
		this.value = `rgba(${color.r}, ${color.g}, ${color.b}, ${this._alpha})`;
		this._wrongHEX = !this.isValidRGBColor(color);
		this.fireDecoratorEvent("change");
	}

	isValidRGBColor(color: ColorRGB) {
		return color.r >= 0 && color.r <= 255 && color.g >= 0 && color.g <= 255 && color.b >= 0 && color.b <= 255;
	}

	_setHex() {
		let red = this._value.r.toString(16),
			green = this._value.g.toString(16),
			blue = this._value.b.toString(16);

		if (red.length === 1) {
			red = `0${red}`;
		}
		if (green.length === 1) {
			green = `0${green}`;
		}
		if (blue.length === 1) {
			blue = `0${blue}`;
		}

		this.hex = red + green + blue;
	}

	_setValues() {
		const hslColours: ColorHSL = RGBToHSL(this._value);
		this._selectedCoordinates = {
			x: ((Math.round(hslColours.l * 100) * 2.56)) - PICKER_POINTER_WIDTH, // Center the coordinates, because of the width of the circle
			y: (256 - (Math.round(hslColours.s * 100) * 2.56)) - PICKER_POINTER_WIDTH, // Center the coordinates, because of the height of the circle
		};

		if (this._isSelectedColorChanged) { // We shouldn't update the hue value when user presses over the main color section.
			this._isSelectedColorChanged = false;
		} else if (this._isHueValueChanged) { // We shouldn't recalculate the hue value when user changes the hue slider.
			this._isHueValueChanged = false;
			this._hue = this.selectedHue ? this.selectedHue : this._hue;
		} else {
			this._hue = Math.round(hslColours.h);
		}

		this._setMainColor(this._hue);
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

	get alphaInputLabel() {
		return ColorPicker.i18nBundle.getText(COLORPICKER_ALPHA);
	}

	get inputsDisabled() {
		return this._wrongHEX ? true : undefined;
	}

	get hexInputErrorState(): `${ValueState}` {
		return this._wrongHEX ? "Negative" : "None";
	}

	get _isDefaultPickerMode() {
		return !this.simplified;
	}

	get styles() {
		// Remove after deleting the hbs template as the styles are added via the jsx template
		return {
			mainColor: {
				"background-color": `rgb(${this._mainValue.r}, ${this._mainValue.g}, ${this._mainValue.b})`,
			},
			circle: {
				left: `${this._selectedCoordinates.x}px`,
				top: `${this._selectedCoordinates.y}px`,
			},
			colorSpan: {
				"background-color": `rgba(${this._value.r}, ${this._value.g}, ${this._value.b}, ${this._alpha})`,
			},
		};
	}
}

ColorPicker.define();

export default ColorPicker;
