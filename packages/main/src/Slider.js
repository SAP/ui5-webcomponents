import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import Float from "@ui5/webcomponents-base/dist/types/Float.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";

// Template
import SliderTemplate from "./generated/templates/SliderTemplate.lit.js";

// Styles
import SliderStyles from "./generated/themes/Slider.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-slider",
	altTag: "ui5-slider",
	languageAware: true,
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.main.Slider.prototype */  {
		/**
		 * Minimum value of the slider
		 * <br><br>
		 *
		 * @type {Float}
		 * @defaultvalue 0
		 * @public
		 */
		min: {
			type: Float,
		},
		/**
		 * Maximum value of the slider
		 * <br><br>
		 *
		 * @type {Float}
		 * @defaultvalue 100
		 * @public
		 */
		max: {
			type: Float,
		},
		/**
		 * Defines the size of the slider's selection intervals. (e.g. min = 0, max = 10, step = 5 would result in possible selection of the values 0, 5, 10).
		 * When 0 or a negative number, the component fallbacks to its default value.
		 * <br><br>
		 *
		 * @type {Integer}
		 * @defaultvalue 1
		 * @public
		 */
		step: {
			type: Float,
			defaultValue: 1,
		},
		/**
		 * Current value of the slider
		 * <br><br>
		 *
		 * @type {Float}
		 * @defaultvalue 0
		 * @public
		 */
		value: {
			type: Float,
		},
		/**
		 * Determines end point of a selection - position of a second handle on the slider. Allow defining of a <b>selected range</b>.
		 * When <code>endValue</code> is specified, the <code>value</code> property is used as a "start value" to determine a selected range on the slider.
		 * If the values is lower/higher than the allowed minimum/maximum, they will be set to the corresponding min/max values of the slider.
		 * <br><br>
		 *
		 * @type {Float}
		 * @defaultvalue [0, 0]
		 * @public
		 */
		 endValue: {
			type: Float,
		},
		/**
		 * Enables tick marks visualization for each step. The step value must not be set to 0
		 * <br><br>
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		 tickmarks: {
			type: Boolean,
		},
		/**
		 * Defines whether the <code>ui5-slider</code> is in disabled state.
		 * <br><br>
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.Slider.prototype */ {
		/**
		 * Defines the text of the <code>ui5-range-slider</code>.
		 * <br><b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Slider.prototype */ {
		/**
		 * Fired when the value changes and the user has finished interacting with the slider.
		 *
		 * @event
		 * @public
		*/
		change: {},
		/**
		 * Fired when the value changes due to user interaction.
		 *
		 * @event
		 * @public
		*/
		input: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-label</code> is a component used to represent a label,
 * providing valuable information to the user.
 * Usually it is placed next to a value holder, such as a text field.
 * It informs the user about what data is displayed or expected in the value holder.
 * <br><br>
 * The <code>ui5-label</code> appearance can be influenced by properties,
 * such as <code>required</code> and <code>wrap</code>.
 * The appearance of the Label can be configured in a limited way by using the design property.
 * For a broader choice of designs, you can use custom styles.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Label";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Slider
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-range-slider
 * @public
 */
class Slider extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return SliderTemplate;
	}

	static get styles() {
		return SliderStyles;
	}

	static async onDefine() {
		await Promise.all([
			fetchI18nBundle("@ui5/webcomponents"),
		]);
	}

	constructor() {
		super();
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	_handleChange() {

	}

	_handleInput() {

	}

	// TODO Include touch events
	/**
	 * Called when the user starts interacting with the slider
	 */
	_handleDown(event) {
		let _this = this;

		if (this.disabled) {
			return;
		}

		this.boundingDOMRect = this.getBoundingClientRect();
		const moveHandler = function (moveEvent) {
			_this._handleMove(moveEvent);
		};
		const upHandler = function () {
			_this._handleUp();
			_this.removeEventListener("mouseup", upHandler);
			document.body.removeEventListener("mousemove", moveHandler);
		};

		// After a down event on the slider root, listen for move events on
		// body, so the slider value is updated even if the user drags the pointer
		// outside the slider root
		document.body.addEventListener("mousemove", moveHandler);
		document.body.addEventListener("mouseup", upHandler);

		this._calculateValueFromInteraction(event);
	}

	/**
	 * Called when the user moves the slider
	 * @private
	 */
	_handleMove(event) {
		event.preventDefault();
		console.warn("move");

		this._calculateValueFromInteraction(event);
	};

	_handleUp() {
		console.warn("up");
	};

	/**
	 * Sets the slider value from an event
	 */
	_calculateValueFromInteraction(event) {
		let pageX = this._getPageXValueFromEvent(event);
		let value = this._computeValueFromPageX(pageX);
		this._setValue(value, true);
	};

	/**
	 * Gets pageX value from event on user interaction with the Slider
	 */
	_getPageXValueFromEvent(event) {
		if (event.targetTouches && event.targetTouches.length > 0) {
			return event.targetTouches[0].pageX;
		}
		return event.pageX;
	}
	
	_setValue(value) {
		let min = this.min, max = this.max, step = this.step;

		// "Stepihfy" the raw value - calculate a step value
		if (this.step !== 0) {
			let numSteps = Math.round(value / this.step);
			value = numSteps * this.step;
		}

		// Normalize value
		if (value < min) {
			value = min;
		}
		else if (value > max) {
			value = max;
		}

		this.value = value;
		this._updateUI();
	}

	/**
	 * Computes the new value (in %) from the pageX position of the cursor
	 */
	_computeValueFromPageX(pageX) {
		let max = this.max, min = this.min;

		// Determine pageX position relative to the Slider DOM
		let xPositionRelative = pageX - this.boundingDOMRect.left;
		// Calculate the percentage complete (the "progress")
		let percentageComplete = xPositionRelative / this.boundingDOMRect.width;

		//TODO RTL support?

		// Fit (map) the complete percentage between the min/max value range
		return min + percentageComplete * (max - min);
	};
	
	_updateUI() {
		let max = this.max, min = this.min, value = this.value;
		let percentageComplete = (value - min) / (max - min);
		let translatePx = percentageComplete * this.boundingDOMRect.width;

		// Update the position of the handle depending on the value
		// Center the Slider Handle position under the cursor/pointer
		this.shadowRoot.querySelector(".ui5-slider-handle").style.setProperty("left", translatePx + "px");
		this.shadowRoot.querySelector(".ui5-slider-progress").style.setProperty("transform", "scaleX(" + percentageComplete + ")");
	};
	
	/**
	 * Calculates and draws the tickmarks with a CSS gradient style
	 */
	drawDefaultTickmarks(step, max, min) {
		const stepStr = String(step);
		const maxStr = String(max);
		const minStr = String(min);

		// Calculate how many tickmarks have to be drawn (max - min / stepValue)
		const tickmarksAmount = `${maxStr - minStr} / ${stepStr}`;

		// TODO* Make it themable?
		const tickmarkWidth = "1px";

		// Transparent CSS gradient background
		const tickmarksGradientBase = `linear-gradient(to right, currentColor ${tickmarkWidth}, transparent 0)`;

		// Draw the tickmarks as a patern over the gradient background
		const tickmarksGradientdPattern = `0 center / calc((100% - ${tickmarkWidth}) / (${tickmarksAmount})) 100% repeat-x`;

		// Combine to get the complete CSS background gradient property value
		const tickmarksBackground = `${tickmarksGradientBase + tickmarksGradientdPattern}`;

		// Apply the style to the container
		this.shadowRoot.querySelector(".ui5-slider-tickmarks").style.setProperty('background', tickmarksBackground);
	};

	setStep(step) {
		if (typeof step !== 'number' || step < 0) {
			step = 1;
		}

		this.step = step;
	};

	onBeforeRendering() {
		if (this.step !== 1) {
			this.setStep(this.step)
		}
	};

	onAfterRendering() {
		if (this.step && this.tickmarks) {
			this.drawDefaultTickmarks(this.step, this.max, this.min);
		}
	};

}

Slider.define();

export default Slider;
