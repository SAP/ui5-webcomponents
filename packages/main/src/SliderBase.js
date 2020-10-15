import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Float from "@ui5/webcomponents-base/dist/types/Float.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";

// Styles
import styles from "./generated/themes/SliderBase.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-slider-base",
	properties: /** @lends sap.ui.webcomponents.main.SliderBase.prototype */  {
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
		 * @defaultvalue 50
		 * @public
		 */
		max: {
			type: Float,
			defaultValue: 50,
		},
		/**
		 * Defines the size of the slider's selection intervals. (e.g. min = 0, max = 10, step = 5 would result in possible selection of the values 0, 5, 10).
		 * If 0 no visible interval between value changes will appear. When negative number, the component fallbacks to its default value.
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
		 * Put a label with a value on every N-th step. The step and tickmarks properties must be enabled.
		 * Example - if the step value is set to 2 and the label interval is also specified to 2 - than every second
		 * tickmark will be labelled, which means every 4th round value number.
		 *
		 * @type {Integer}
		 * @defaultvalue 1
		 * @public
		 */
		labelInterval: {
			type: Integer,
			defaultValue: 0,
		},
		/**
		 * Enables tick marks visualization for each step. The step value must not be set to 0.
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
		 * Enables handle tooltip displaying the current value.
		 * <br><br>
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		showTooltip: {
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
			type: Boolean,
		},
		/**
		 * @private
		 */
		_tooltipVisibility: {
			type: String,
			defaultValue: "hidden",
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.SliderBase.prototype */ {
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
		 * Fired when the value changes due to user interaction that is not yet finished - during mouse/touch dragging.
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
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.SliderBase
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-slider
 * @public
 */
class SliderBase extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return styles;
	}

	_onMouseUp() {
		this._handleUp();
		window.removeEventListener("mouseup", this._upHandler);
		window.removeEventListener("mousemove", this._moveHandler);
	}

	_onMouseMove(event) {
		this._handleMove(event);
	}

	/**
	 * Called when the user starts interacting with the slider
	 *
	 * @private
	 */
	_handleDownBase(event, min, max) {
		this._boundingClientRect = this.getBoundingClientRect();
		const newValue = SliderBase._getValueFromInteraction(event, this.step, min, max, this._boundingClientRect);

		// After a down event on the slider root, listen for move events on
		// body, so the slider value is updated even if the user drags the pointer
		// outside the slider root
		window.addEventListener("mousemove", this._moveHandler);
		window.addEventListener("mouseup", this._upHandler);

		return newValue;
	}

	/**
	 * Called when the user moves the slider
	 *
	 * @private
	 */
	_handleMoveBase(event, valueType, min, max) {
		const newValue = SliderBase._getValueFromInteraction(event, this.step, min, max, this.getBoundingClientRect());

		// Update Slider UI and internal state
		this._updateUI(newValue);
		this._updateValue(valueType, newValue);
	}

	_handleUp() {
		if (this.disabled) {
			return;
		}

		this.fireEvent("change");
	}

	_handleMouseOver(event) {
		if (this.disabled || !this.showTooltip) {
			return;
		}

		this._tooltipVisibility = "visible";
	}

	_handleMouseOut(event) {
		if (!this.showTooltip) {
			return;
		}

		this._tooltipVisibility = "hidden";
	}

	_updateValue(valueType, value) {
		this[valueType] = value;
		this.fireEvent("input");
	}

	/**
	 * Locks the given value between boundaries based on slider properties:
	 * Restricts value within the min & max properties.
	 * @private
	 */
	static _clipValue(value, min, max) {
		value = Math.min(Math.max(value, min), max);
		return value;
	}

	/**
	 * Sets the slider value from an event
	 *
	 * @private
	 */
	static _getValueFromInteraction(event, stepSize, min, max, boundingClientRect) {
		const pageX = this._getPageXValueFromEvent(event);
		const value = this._computedValueFromPageX(pageX, min, max, boundingClientRect);
		const steppedValue = this._getSteppedValue(value, stepSize, min);

		// Normalize value and keep it under constrains defined by the slider's properties
		return this._clipValue(steppedValue, min, max);
	}

	/**
	 * "Stepify" the raw value - calculate the new value depending on the specified step property
	 *
	 * @private
	 */
	static _getSteppedValue(value, stepSize, min) {
		const stepModuloValue = Math.abs((value - min) % stepSize);

		if (stepSize === 0 || stepModuloValue === 0) {
			return value;
		}

		// Clip (snap) the new value to the nearest step
		value = (stepModuloValue * 2 >= stepSize) ? (value + stepSize) - stepModuloValue : value - stepModuloValue;
		
		// If the step value is not a round number get its precision
		const stepPrecision = SliderBase._getDecimalPrecisionOfNumber(stepSize);
		return value.toFixed(stepPrecision);
	}

	/**
	 * Gets pageX value from event on user interaction with the Slider
	 *
	 * @private
	 */
	static _getPageXValueFromEvent(event) {
		if (event.targetTouches && event.targetTouches.length > 0) {
			return event.targetTouches[0].pageX;
		}
		return event.pageX;
	}

	/**
	 * Computes the new value (in %) from the pageX position of the cursor.
	 * Returns the value with rounded to a precision of at most 2 digits after decimal point.
	 *
	 * @private
	 */
	static _computedValueFromPageX(pageX, min, max, boundingClientRect) {
		// Determine pageX position relative to the Slider DOM
		const xPositionRelative = pageX - boundingClientRect.left;
		// Calculate the percentage complete (the "progress")
		const percentageComplete = xPositionRelative / boundingClientRect.width;
		// Fit (map) the complete percentage between the min/max value range
		return min + percentageComplete * (max - min);
	}

	/**
	 * Calculates the precision (decimal places) of a number, returns 0 if integer
	 * Handles scientific notation cases.
	 * @private
	 */
	static _getDecimalPrecisionOfNumber(value) {
		if (Number.isInteger(value)) {
			return 0;
		}

		const match = (String(value)).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
		return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? Number(match[2]) : 0));
	}

	/**
	 * Calculates and draws the tickmarks with a CSS gradient style
	 *
	 * @private
	 */
	_drawDefaultTickmarks(step, max, min) {
		if (!this.tickmarks) {
			return;
		}

		// Let the CSS do calculations for precise tickmarks distribution
		const stepStr = String(step);
		const maxStr = String(max);
		const minStr = String(min);
		const tickmarksAmount = `${maxStr - minStr} / ${stepStr}`;
		const tickmarkWidth = "1px";

		// Transparent CSS gradient background
		const tickmarksGradientBase = `linear-gradient(to right, currentColor ${tickmarkWidth}, transparent 0) `;

		// Draw the tickmarks as a patern over the gradient background
		const tickmarksGradientdPattern = `0 center / calc((100% - ${tickmarkWidth}) / (${tickmarksAmount})) 100% repeat-x`;

		// Combine to get the complete CSS background gradient property value
		this._tickmarksBackground = `${tickmarksGradientBase + tickmarksGradientdPattern}`;

		// If labelsInterval is specified draw labels for the necessary tickmarks
		if (this.labelInterval) {
			this._drawDefaultLabels(parseInt(tickmarkWidth));
		}
	}

	/**
	 * Calculates the labels amout, width and text and creates them
	 *
	 * @private
	 */
	_drawDefaultLabels(tickmarkWidth) {
		const labelInterval = this.labelInterval;
		const step = this.step;
		const newNumberOfLabels = (this.max - this.min) / (step * labelInterval);

		// If the required labels are already rendered
		if (newNumberOfLabels === this._oldNumberOfLabels) {
			return;
		}

		this._oldNumberOfLabels = newNumberOfLabels;
		this._labelWidth = 100 / newNumberOfLabels;
		this._labelItems = [];

		// If the step value is not a round number get its precision
		const stepPrecision = SliderBase._getDecimalPrecisionOfNumber(step);

		// numberOfLabels below can be float so that the "distance betweenlabels labels"
		// calculation to be precize (exactly the same as the distance between the tickmarks).
		// That's ok as the loop stop condition is set to an integer, so it will practically
		// "floor" the number of labels anyway.
		for (let i = 0; i <= newNumberOfLabels; i++) {
			// Format the label numbers with the same decimal precision as the value of the step property
			let labelItemNumber = ((i * step * labelInterval) + this.min).toFixed(stepPrecision);
			this._labelItems.push(document.createTextNode(labelItemNumber));
		}
	}

	_setStep(step) {
		if (typeof step !== "number" || step < 0) {
			step = 1;
		}

		if (this.tickmarks && !this._initialRendering) {
			this._drawDefaultTickmarks(step, this.max, this.min);
		}

		this.step = step;
	}
}

export default SliderBase;
