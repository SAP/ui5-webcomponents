import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import { isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import CSSColor from "@ui5/webcomponents-base/dist/types/CSSColor.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import Float from "@ui5/webcomponents-base/dist/types/Float.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	getRGBColor,
	HSLToRGB,
	HEXToRGB,
	RGBToHSL,
} from "@ui5/webcomponents-base/dist/util/ColorConversion.js";
import type {
	ColorHSL,
	ColorRGB,
} from "@ui5/webcomponents-base/dist/util/ColorConversion.js";
import ColorPickerTemplate from "./generated/templates/ColorPickerTemplate.lit.js";
// @ts-ignore
import Input from "./Input.js";
// @ts-ignore
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
// @ts-ignore
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
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-color-picker</code> allows users to choose any color and provides different input options for selecting colors.
 *
 * <h3>Usage</h3>
 *
 * <h4>When to use:</h4
 * Use the color picker if:
 * <ul>
 * <li> users need to select any color freely.</li>
 * </ul>
 *
 * <h4>When not to use:</h4>
 * <ul>
 * <li> Users need to select one color from a predefined set of colors. Use the ColorPalette component instead.</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/ColorPicker.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @since 1.0.0-rc.12
 * @alias sap.ui.webc.main.ColorPicker
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-color-picker
 * @public
 */

@customElement("ui5-color-picker")
/**
 * Fired when the the selected color is changed
 *
 * @event sap.ui.webc.main.ColorPicker#change
 * @public
 */
@event("change")
class ColorPicker extends UI5Element {
	/**
	 * Defines the currently selected color of the component.
	 * <br><br>
	 * <b>Note</b>: use HEX, RGB, RGBA, HSV formats or a CSS color name when modifying this property.
	 * @type {sap.ui.webc.base.types.CSSColor}
	 * @name sap.ui.webc.main.ColorPicker.prototype.color
	 * @public
	 */
	@property({ validator: CSSColor, defaultValue: "rgba(255, 255, 255, 1)" })
	color!: string;

	/**
	 * Defines the HEX code of the currently selected color
	 * *Note*: If Alpha(transperancy) is set it is not included in this property. Use <code>color</code> property.
	 * @type {string}
	 * @private
	 */
	@property({ defaultValue: "ffffff", noAttribute: true })
	hex!: string;

	/**
	 * Defines the current main color which is selected via the hue slider and is shown in the main color square.
	 * @type {string}
	 * @private
	 */
	@property({ type: Object })
	_mainColor!: ColorRGB;

	/**
	 * Defines the currenty selected color from the main color section.
	 * @private
	 */
	@property({ type: Object })
	_color!: ColorRGB;

	/**
	 * @private
	 */
	@property({ type: Object })
	_selectedCoordinates!: ColorCoordinates;

	/**
	 * @private
	 */
	@property({ validator: Float, defaultValue: 1 })
	_alpha!: number;

	/**
	 * @private
	 */
	@property({ validator: Integer, defaultValue: 0 })
	_hue!: number;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_isSelectedColorChanged!: boolean;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_isHueValueChanged!: boolean;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_wrongHEX!: boolean;

	selectedHue: number;

	mouseDown: boolean;

	mouseIn: boolean;

	static i18nBundle: I18nBundle;

	static get render() {
		return litRender;
	}

	static get styles() {
		return ColorPickerCss;
	}

	static get template() {
		return ColorPickerTemplate;
	}

	static get dependencies() {
		return [
			Input,
			Slider,
			Label,
		];
	}

	static async onDefine() {
		ColorPicker.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();

		// Bottom Right corner
		this._selectedCoordinates = {
			x: 256 - PICKER_POINTER_WIDTH,
			y: 256 - PICKER_POINTER_WIDTH,
		};

		// Default main color is red
		this._mainColor = {
			r: 255,
			g: 0,
			b: 0,
		};

		this.selectedHue = 0;

		this.mouseDown = false;
		this.mouseIn = false;
	}

	onBeforeRendering() {
		// we have the color & _mainColor properties here
		this._color = getRGBColor(this.color);
		const tempColor = `rgba(${this._color.r}, ${this._color.g}, ${this._color.b}, 1)`;
		this._setHex();
		this._setValues();
		this.style.setProperty("--ui5_Color_Picker_Progress_Container_Color", tempColor);
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
		this._setColor(this._color);
	}

	_handleHueInput(e: CustomEvent) {
		this.selectedHue = (e.target as Input).value;
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
		let newValue: string = (e.target as Input).value.toLowerCase();
		const hexRegex = new RegExp("^[<0-9 abcdef]+$");

		// Shorthand Syntax
		if (newValue.length === 3) {
			newValue = `${newValue[0]}${newValue[0]}${newValue[1]}${newValue[1]}${newValue[2]}${newValue[2]}`;
		}

		if (newValue === this.hex) {
			return;
		}

		this.hex = newValue;
		if (newValue.length !== 6 || !hexRegex.test(newValue)) {
			this._wrongHEX = true;
		} else {
			this._wrongHEX = false;
			this._setColor(HEXToRGB(this.hex));
		}
	}

	_handleRGBInputsChange(e: CustomEvent) {
		const target = e.target as Input;
		const targetValue: number = parseInt(target.value as string) || 0;
		let tempColor;
		switch (target.id) {
		case "red":
			tempColor = { ...this._color, r: targetValue };
			break;

		case "green":
			tempColor = { ...this._color, g: targetValue };
			break;

		case "blue":
			tempColor = { ...this._color, b: targetValue };
			break;
		default:
			tempColor = { ...this._color };
		}

		this._setColor(tempColor);
	}

	_setMainColor(hueValue: number) {
		if (hueValue <= 255) {
			this._mainColor = {
				r: 255,
				g: hueValue,
				b: 0,
			};
		} else if (hueValue <= 510) {
			this._mainColor = {
				r: 255 - (hueValue - 255),
				g: 255,
				b: 0,
			};
		} else if (hueValue <= 765) {
			this._mainColor = {
				r: 0,
				g: 255,
				b: hueValue - 510,
			};
		} else if (hueValue <= 1020) {
			this._mainColor = {
				r: 0,
				g: 765 - (hueValue - 255),
				b: 255,
			};
		} else if (hueValue <= 1275) {
			this._mainColor = {
				r: hueValue - 1020,
				g: 0,
				b: 255,
			};
		} else {
			this._mainColor = {
				r: 255,
				g: 0,
				b: 1275 - (hueValue - 255),
			};
		}
	}

	_handleAlphaChange() {
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
		const h = this._hue / 4.25;

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
		this.color = `rgba(${color.r}, ${color.g}, ${color.b}, ${this._alpha})`;

		this.fireEvent("change");
	}

	_setHex() {
		let red = this._color.r.toString(16),
			green = this._color.g.toString(16),
			blue = this._color.b.toString(16);

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
		const hslColours: ColorHSL = RGBToHSL(this._color);
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
			this._hue = Math.round(hslColours.h * 4.25);
		}

		this._setMainColor(this._hue);
	}

	get hueSliderLabel() {
		return ColorPicker.i18nBundle.getText(COLORPICKER_HUE_SLIDER as I18nText);
	}

	get alphaSliderLabel() {
		return ColorPicker.i18nBundle.getText(COLORPICKER_ALPHA_SLIDER as I18nText);
	}

	get hexInputLabel() {
		return ColorPicker.i18nBundle.getText(COLORPICKER_HEX as I18nText);
	}

	get redInputLabel() {
		return ColorPicker.i18nBundle.getText(COLORPICKER_RED as I18nText);
	}

	get greenInputLabel() {
		return ColorPicker.i18nBundle.getText(COLORPICKER_GREEN as I18nText);
	}

	get blueInputLabel() {
		return ColorPicker.i18nBundle.getText(COLORPICKER_BLUE as I18nText);
	}

	get alphaInputLabel() {
		return ColorPicker.i18nBundle.getText(COLORPICKER_ALPHA as I18nText);
	}

	get inputsDisabled() {
		return this._wrongHEX ? true : undefined;
	}

	get hexInputErrorState() {
		return this._wrongHEX ? "Error" : undefined;
	}

	get styles() {
		return {
			mainColor: {
				"background-color": `rgb(${this._mainColor.r}, ${this._mainColor.g}, ${this._mainColor.b})`,
			},
			circle: {
				left: `${this._selectedCoordinates.x}px`,
				top: `${this._selectedCoordinates.y}px`,
			},
			colorSpan: {
				"background-color": `rgba(${this._color.r}, ${this._color.g}, ${this._color.b}, ${this._alpha})`,
			},
		};
	}
}

ColorPicker.define();

export default ColorPicker;
