import {
	getRGBColor,
	HSLToRGB,
	HEXToRGB,
	RGBToHSL,
	RGBtoHEX,
} from "@ui5/webcomponents-base/dist/util/ColorConversion.js";
import type {
	ColorHSL,
	ColorRGB,
} from "@ui5/webcomponents-base/dist/util/ColorConversion.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-color` class represents the `value` used in `ui5-color-picker`
 *
 * A color can be represented using rgb, hsl, or hex values. A color also has an alpha value.
 * @public
 */
class ColorValue {
	_rgb: ColorRGB;
	_hsl: ColorHSL;
	_alpha: number;
	_hex: string;
	_valid: boolean;

	constructor(color: string = "rgba(255,255,255,1)") {
		this._rgb = getRGBColor(color);
		this._hsl = RGBToHSL(this._rgb);
		this._hex = RGBtoHEX(this._rgb);
		this._alpha = 1;
		this._valid = true;
	}

	get RGB() {
		return this._rgb;
	}

	get HSL() {
		return this._hsl;
	}

	get H() {
		return this._hsl.h;
	}

	get S() {
		return this._hsl.s;
	}

	get L() {
		return this._hsl.l;
	}

	get R() {
		return this._rgb.r;
	}

	get G() {
		return this._rgb.g;
	}

	get B() {
		return this._rgb.b;
	}

	get Alpha(): number {
		return this._alpha;
	}

	get HEX() {
		return this._hex;
	}

	set RGB(value: ColorRGB) {
		this._rgb = value;
		if (this._valid) {
			this._hsl = RGBToHSL(value);
			this._hex = RGBtoHEX(value);
		}
	}

	set HSL(value: ColorHSL) {
		this._hsl = value;
		if (this._valid) {
			this._rgb = HSLToRGB(value);
			this._hex = RGBtoHEX(this._rgb);
		}
	}

	set HEX(value: string) {
		this._hex = value;
		this.validateHEX(value);
		if (this._valid) {
			this._rgb = HEXToRGB(value);
			this._hsl = RGBToHSL(this._rgb);
		}
	}

	set H(value: number) {
		this.validateHSLValue(value, true);
		this.HSL = { h: value, s: this.S, l: this.L };
	}

	set S(value: number) {
		this.validateHSLValue(value);
		this.HSL = { h: this.H, s: value, l: this.L };
	}

	set L(value: number) {
		this.validateHSLValue(value);
		this.HSL = { h: this.H, s: this.S, l: value };
	}

	set R(value: number) {
		this.validateRGBValue(value);
		this.RGB = { r: value, g: this.G, b: this.B };
	}

	set G(value: number) {
		this.validateRGBValue(value);
		this.RGB = { r: this.R, g: value, b: this.B };
	}

	set B(value: number) {
		this.validateRGBValue(value);
		this.RGB = { r: this.R, g: this.G, b: value };
	}

	set Alpha(value: number) {
		this._alpha = value;
	}

	isColorValueValid(): boolean {
		return this._valid;
	}

	validateRGBValue(value: number) {
		this._valid = this._isValidRGBValue(value);
	}

	validateHSLValue(value: number, validateHue: boolean = false) {
		this._valid = validateHue ? this._isValidHValue(value) : this._isValidSLValue(value);
	}

	validateHEX(value: string) {
		const hexRegex = new RegExp("^[<0-9 abcdef]+$");
		this._valid = value.length === 6 && hexRegex.test(value);
	}

	_isValidRGBValue(value: number): boolean {
		return value >= 0 && value <= 255;
	}

	_isValidHValue(value: number): boolean {
		return value >= 0 && value <= 360;
	}

	_isValidSLValue(value: number): boolean {
		return value >= 0 && value <= 100;
	}

	toString(): string {
		return `rgba(${this._rgb.r}, ${this._rgb.g}, ${this._rgb.b}, ${this._alpha})`;
	}
}

export default ColorValue;
