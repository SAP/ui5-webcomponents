import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Float from "@ui5/webcomponents-base/dist/types/Float.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";

// Styles
import SliderStyles from "./generated/themes/SliderBase.css.js";

/**
 * @public
 */
const metadata = {
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
		 * If 0 no visible interval between value changes will apppear. When negative number, the component fallbacks to its default value.
		 * <br><br>
		 *
		 * @type {Integer}
		 * @defaultvalue 1
		 * @public
		 */
		step: {
			type: Integer,
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

	onEnterDOM() {
		this._moveHandler = this._onMouseMove.bind(this);
		this._upHandler = this._onMouseUp.bind(this);
		this._mouseOverHandler = this._onMouseOver.bind(this);
		this._mouseOutHandler = this._onMouseOut.bind(this);

		this.addEventListener("mouseover", this._mouseOverHandler);
		this.addEventListener("mouseout", this._mouseOutHandler);

		// Normalize Slider value according to min/max properties
		this.value = this._clipValue(this.value);
		// Update initial Slider UI representation on entering the DOM
		this._updateUI(this.value);
		// Initial normalization of the step value
		this._setStep();
	}

	_onMouseMove(event) {
		this._handleMove(event);
	}

	_onMouseUp() {
		this._handleUp();
		window.removeEventListener("mouseup", this._upHandler);
		window.removeEventListener("mousemove", this._moveHandler);
	}

	_onMouseOver() {
		this._handleMouseOver();
	}

	_onMouseOut() {
		this._handleMouseOut();
	}

	/**
	 * Called when the user starts interacting with the slider
	 */
	_handleDown(event) {
		this._boundingClientRect = this.getBoundingClientRect()
		const newValue = SliderBase._getValueFromInteraction(event, this.step, this._boundingClientRect);

		// After a down event on the slider root, listen for move events on
		// body, so the slider value is updated even if the user drags the pointer
		// outside the slider root
		window.addEventListener("mousemove", this._moveHandler);
		window.addEventListener("mouseup", this._upHandler);
		
		// Update Slider UI and internal state
		this._updateUI(newValue);
		this._updateValue(valueType, newValue);
	}

	/**
	 * Called when the user moves the slider
	 * @private
	 */
	_handleMove(event) {
		event.preventDefault();

		if (this.disabled) {
			return;
		}

		const value = SliderBase._getValueFromInteraction(event, this.step, this.getBoundingClientRect());

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

		this.shadowRoot.querySelector(".ui5-slider-tooltip").style.setProperty("visibility", "visible");
	}

	_handleMouseOut(event) {
		if (!this.showTooltip) {
			return;
		}

		this.shadowRoot.querySelector(".ui5-slider-tooltip").style.setProperty("visibility", "hidden");
	}

	_updateValue(valueType, value) {
		this[valueType] = value;
	}

	/**
	 * Locks the given value for the given handle between boundaries based on slider properties:
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
	static _getValueFromInteraction(event, stepSize, boundingClientRect) {
		const pageX = this._getPageXValueFromEvent(event);
		const value = this._computedValueFromPageX(pageX, boundingClientRect);

		this._getSteppedValue(value, stepSize);

		// Normalize value and keep it under constrains defined by the slider's properties
		return this._clipValue(value);
	}

	/**
	 * "Stepihfy" the raw value - calculate a step value
	 * Steps are integers, so when Slider is "quantized" (stepped)
	 * the value is also rounded to an integer.
	 * 
	 * @private
	 */
	static _getSteppedValue(value, stepSize) {
		if (stepSize !== 0) {
			const numSteps = Math.round(value / stepSize);
			return value = numSteps * step;
		}
		else {
			return value;
		}
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
	static _computedValueFromPageX(pageX, boundingClientRect) {
		const max = this.max;
		const min = this.min;

		// Determine pageX position relative to the Slider DOM
		const xPositionRelative = pageX - boundingClientRect.left;
		// Calculate the percentage complete (the "progress")
		const percentageComplete = xPositionRelative / boundingClientRect.width;
		// Fit (map) the complete percentage between the min/max value range
		return (min + percentageComplete * (max - min)).toFixed(2);
	}

	// Update UI after user interaction.
	_updateUI(newValue) {
		const max = this.max;
		const min = this.min;
		const boundingClientRect = this._boundingClientRect || this.getBoundingClientRect();

		// The progress (completed) percentage of the slider.
		const percentageComplete = (newValue - min) / (max - min);
		// How many pixels from the left end of the slider will be the placed the affected  by the user action handle
		const handlePositionFromLeft = percentageComplete * this._boundingClientRect.width;

		// Update the progress indication width
		this.shadowRoot.querySelector(".ui5-slider-progress").style.setProperty("transform", `scaleX(${percentageComplete})`);

		// Update the position of the handle with the calculated left offset
		this.shadowRoot.querySelector(".ui5-slider-handle").style.setProperty("left", `${handlePositionFromLeft}px`);
	}

	/**
	 * Calculates and draws the tickmarks with a CSS gradient style
	 */
	_drawDefaultTickmarks(step, max, min) {
		// Let the CSS do all calculations for more precise browser results
		const stepStr = String(step);
		const maxStr = String(max);
		const minStr = String(min);
		const tickmarksAmount = `${maxStr - minStr} / ${stepStr}`;
		const tickmarkWidth = "1px";

		// Transparent CSS gradient background
		const tickmarksGradientBase = `linear-gradient(to right, currentColor ${tickmarkWidth}, transparent 0)`;

		// Draw the tickmarks as a patern over the gradient background
		const tickmarksGradientdPattern = `0 center / calc((100% - ${tickmarkWidth}) / (${tickmarksAmount})) 100% repeat-x`;

		// Combine to get the complete CSS background gradient property value
		const tickmarksBackground = `${tickmarksGradientBase + tickmarksGradientdPattern}`;

		// Apply the style to the container
		this.shadowRoot.querySelector(".ui5-slider-tickmarks").style.setProperty("background", tickmarksBackground);

		// If labelsInterval is specified draw labels for the necessary tickmarks
		if (this.labelInterval) {
			this._drawDefaultLabels(parseInt(tickmarkWidth));
		}
	}

	/**
	 * Calculates the labels amout, width and text and creates them
	 */
	_drawDefaultLabels(tickmarkWidth) {
		const labelContainer = this.shadowRoot.querySelector(".ui5-slider-labels");
		const labelInterval = this.labelInterval;
		const numberOfLabels = (this.max - this.min) / (this.step * labelInterval);

		// If the required labels are already rendered return
		if (labelContainer.childElementCount === numberOfLabels) {
			return;
		}

		// numberOfLabels below can be float so that the "distance betweenlabels labels"
		// calculation to be precize (exactly the same as the distance between the tickmarks).
		// That's ok as the loop stop condition is set to an int, so it will "floor"
		// the number of labels anyway.
		const spaceBetweenLabelsPx = this.getBoundingClientRect().width / numberOfLabels;

		for (let i = 0; i <= numberOfLabels; i++) {
			const labelItem = document.createElement("li");
			labelItem.textContent = (i * labelInterval) + Math.round(this.min);
			labelContainer.appendChild(labelItem);

			// Make every label width as the distance between the tickmarks
			labelItem.style.setProperty("width", `${spaceBetweenLabelsPx}px`);
			// Set negative left offset to center evey label to be in the middle of the tickmark above it
			labelContainer.style.setProperty("left", `-${spaceBetweenLabelsPx / 2}px`);
			// Set additional width space of the label container to contain the centered labels
			labelContainer.style.setProperty("width", `calc(100% + ${spaceBetweenLabelsPx}px)`);
		}
	}

	_setStep(step) {
		if (typeof step !== "number" || step < 0) {
			step = 1;
		}
		this.step = step;

		if (this.tickmarks) {
			this._drawDefaultTickmarks(this.step, this.max, this.min);
		}
	}
}

Slider.define();

export default Slider;
