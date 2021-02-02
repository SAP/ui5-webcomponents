import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import Float from "@ui5/webcomponents-base/dist/types/Float.js";
import ColorPickerTemplate from "./generated/templates/ColorPickerTemplate.lit.js";
import Input from "./Input.js";
import Slider from "./Slider.js";
import Label from "./Label.js";

// Styles
import ColorPickerCss from "./generated/themes/ColorPicker.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-color-picker",
	properties: /** @lends sap.ui.webcomponents.main.ColorPicker.prototype */ {

		/**
		 * Defines the currently selected color of the <code>ui5-color-picker</code>.
		 * *Note*:  If you need to have initially set color, or change the color programmatically, use this property
		 * *Important*: Use RGBA format when modifying this property.
		 * @type {String}
		 * @public
		 */
		color: {
			type: String,
			defaultValue: "rgba(255, 0, 0, 1)",
		},

		/**
		 * Defines the HEX code of the currently selected color
		 * *Note*: If Alpha(transperancy) is set it is not included in this property. Use <code>color</code> property.
		 * @type {String}
		 * @public
		 */
		hex: {
			type: String,
			defaultValue: "000000",
		},

		/**
		 * Defines the current main color which is selected via the hue slider and is shown in the main color square.
		 * @type {String}
		 * @private
		 */
		_mainColor: {
			type: Object,
		},

		// Defines the currenty selected color from the main color section.
		_color: {
			type: Object,
		},

		/**
		 * @private
		 */
		_selectedCoordinates: {
			type: Object,
		},

		/**
		 * @private
		 */
		_alpha: {
			type: Float,
			defaultValue: 1,
		},

		/**
		 * @private
		 */
		_hue: {
			type: Integer,
			defaultValue: 0,
		},

		/**
		 * @private
		 */
		_wrongHEX: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.ColorPicker.prototype */ {
		//
	},
	events: /** @lends sap.ui.webcomponents.main.ColorPicker.prototype */ {
		change: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-color-picker</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/ColorPicker.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @since 1.0.0-rc12
 * @alias sap.ui.webcomponents.main.ColorPicker
 * @extends UI5Element
 * @tagname ui5-color-picker
 * @public
 */
class ColorPicker extends UI5Element {
	static get metadata() {
		return metadata;
	}

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

	constructor() {
		super();

		// Top Left corner
		this._selectedCoordinates = {
			x: -6.5,
			y: -6.5,
		};

		// Default color is red
		this._mainColor = {
			r: 255,
			g: 0,
			b: 0,
		};

		this._color = {
			r: 0,
			g: 0,
			b: 0,
		};

		this.mouseDown = false;
	}

	onBeforeRendering() {
		this.color = `rgba(${this._color.r}, ${this._color.g}, ${this._color.b}, ${this._alpha})`;
		this.style.setProperty("--ui5_Color_Picker_Progress_Container_Color", this.color);
	}

	_handleMouseDown(event) {
		this.mouseDown = true;
		this.mouseIn = true;
		this._changeSelectedColor(event.offsetX, event.offsetY);
	}

	_handleMouseUp() {
		this.mouseDown = false;
	}

	_handleMouseOut(event) {
		if (!this.mouseIn || !this.mouseDown) {
			return;
		}

		const isLeft = event.offsetX <= 0;
		const isUp = event.offsetY <= 0;
		const isDown = event.offsetY >= event.target.offsetHeight;
		const isRight = event.offsetX >= event.target.offsetWidth;

		let x,
			y;

		if (isLeft) {
			x = 0;
		} else if (isRight) {
			x = event.offsetWidth;
		} else {
			x = event.offsetX;
		}

		if (isUp) {
			y = 0;
		} else if (isDown) {
			y = event.offsetHeight;
		} else {
			y = event.offsetY;
		}

		this._changeSelectedColor(x, y);
		this.mouseIn = false;
		this.mouseDown = false;
	}

	_handleMouseMove(event) {
		if (!this.mouseDown || !this.mouseIn) {
			return;
		}

		this._changeSelectedColor(event.offsetX, event.offsetY);
	}

	_handleAlphaInput(event) {
		this._alpha = parseFloat(event.target.value);
	}

	_handleHueInput(event) {
		this._hue = event.target.value;
		this._setMainColor(this._hue);
	}

	_handleHEXChange(event) {
		const newValue = event.target.value.toLowerCase();
		const hexRegex = new RegExp("^[<0-9 abcdef]+$");

		this.hex = newValue;
		if (newValue.length !== 6 || !hexRegex.test(newValue)) {
			this._wrongHEX = true;
		} else {
			this._wrongHEX = false;
			this._color = this._hexToRGB(this.hex);
			this._setValuesFromHEX();
		}
	}

	_handleRGBInputsChange(event) {
		const targetValue = parseInt(event.target.value);

		switch (event.target.id) {
		case "red":
			this._color = Object.assign({ }, this._color, { r: targetValue });
			break;

		case "green":
			this._color = Object.assign({ }, this._color, { g: targetValue });
			break;

		case "blue":
			this._color = Object.assign({ }, this._color, { b: targetValue });
			break;
		}

		this._setHex();
		this._setValuesFromHEX();
	}

	_setMainColor(hueValue) {
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

	_handleAlphaChange(event) {
		this._alpha = this._alpha < 0 ? 0 : this._alpha;
		this._alpha = this._alpha > 1 ? 1 : this._alpha;
	}

	_changeSelectedColor(x, y) {
		this._selectedCoordinates = {
			x: x - 6.5, // Center the coordinates, because of the width of the circle
			y: y - 6.5, // Center the coordinates, because of the height of the circle
		};

		this._setColor(x, y);
		this._setHex();
	}

	_setColor(x, y) {
		// By using the selected coordinates(x = Lightness, y = Saturation) and hue(selected from the hue slider)
		// and HSL format, the color will be parsed to RGB

		const h = Math.round(this._hue / 4.25), // 0 ≤ H < 360
			s = 1 - (Math.round(((y / 256) + Number.EPSILON) * 100) / 100), // 0 ≤ S ≤ 1
			l = Math.round(((x / 256) + Number.EPSILON) * 100) / 100; // 0 ≤ V ≤ 1

		if (!s || !l) {
			// The event is finished out of the main color section
			return;
		}

		this._color = this._HSLToRGB({ h, s, l });
	}

	_HSLToRGB(color = {
		h: undefined,
		s: undefined,
		l: undefined,
	}) {
		// Formula taken from https://www.rapidtables.com/convert/color/hsl-to-rgb.html
		const C = (1 - Math.abs((2 * color.l) - 1)) * color.s,
			X = C * (1 - Math.abs(((color.h / 60) % 2) - 1)),
			m = color.l - C / 2;

		let tempColor = {};
		switch (Math.round(color.h / 60)) {
		// 0 ≤ H < 60
		case 0:
			tempColor = {
				r: C,
				g: X,
				b: 0,
			};
			break;

		// 60 ≤ H < 120
		case 1:
			tempColor = {
				r: X,
				g: C,
				b: 0,
			};
			break;

		// 120 ≤ H < 180
		case 2:
			tempColor = {
				r: 0,
				g: C,
				b: X,
			};
			break;

		// 180 ≤ H < 240
		case 3:
			tempColor = {
				r: 0,
				g: X,
				b: C,
			};
			break;

		// 240 ≤ H < 300
		case 4:
			tempColor = {
				r: X,
				g: 0,
				b: C,
			};
			break;

		// 300 ≤ H < 360
		default:
			tempColor = {
				r: C,
				g: 0,
				b: X,
			};
			break;
		}

		return {
			r: Math.floor((tempColor.r + m) * 255),
			g: Math.floor((tempColor.g + m) * 255),
			b: Math.floor((tempColor.b + m) * 255),
		};
	}

	_hexToRGB(hex) {
		// Please make sure you pass a valid 6 digit hex color
		// In the implementation of this method we assume that the hex argument is a 6 digit valid hex color

		const rgbValues = {
			r: hex.substr(0, 2),
			g: hex.substr(2, 2),
			b: hex.substr(4, 2),
		};

		const rgbKeys = Object.keys(rgbValues);

		rgbKeys.forEach(key => {
			rgbValues[key] = parseInt(rgbValues[key], 16);
		});

		return rgbValues;
	}

	_RGBToHSL(color = {
		r: undefined,
		g: undefined,
		b: undefined,
	}) {
		const R = color.r / 255,
			G = color.g / 255,
			B = color.b / 255,
			max = Math.max(R, G, B),
			min = Math.min(R, G, B),
			delta = max - min;

		let h,
			s;

		// Hue calculation
		if (delta === 0) {
			h = 0;
		} else if (max === R) {
			h = 60 * (((G - B) / delta) % 6);
		} else if (max === G) {
			h = 60 * (((B - R) / delta) + 2);
		} else if (max === B) {
			h = 60 * (((R - G) / delta) + 4);
		}

		// Lightness calculation
		const l = (max + min) / 2;

		// Saturation calculation
		if (delta === 0) {
			s = 0;
		} else {
			s = delta / (1 - Math.abs(2 * l - 1));
		}

		return {
			h,
			s,
			l,
		};
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

	_setValuesFromHEX() {
		const hslColours = this._RGBToHSL(this._color);
		this._selectedCoordinates = {
			x: ((Math.round(hslColours.l * 100) * 2.56)) - 6.5, // Center the coordinates, because of the width of the circle
			y: (256 - (Math.round(hslColours.s * 100) * 2.56)) - 6.5, // Center the coordinates, because of the height of the circle
		};
		this._hue = Math.round(hslColours.h * 4.25);
		this._setMainColor(this._hue);
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
			progressContainer: {
				"background-image": `-webkit-linear-gradient(left, rgba(65, 120, 13, 0), ${this._mainColor}, url('data:image/png;base64,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')`,
			},
			colorSpan: {
				"background-color": `rgba(${this._color.r}, ${this._color.g}, ${this._color.b}, ${this._alpha})`,
			},
		};
	}
}

ColorPicker.define();

export default ColorPicker;
