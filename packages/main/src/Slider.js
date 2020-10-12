import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Float from "@ui5/webcomponents-base/dist/types/Float.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
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
	altTag: "ui5-range-slider",
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
		 * Current value of the slider
		 * <br><br>
		 *
		 * @type {Float}
		 * @defaultvalue 0
		 * @public
		 */
		value: {
			type: Float,
			defaultValue: 0,
		},
		/**
		 * Determines end point of a selection - position of a second handle on the slider. Allows defining of a <b>selected range</b>.
		 * When <code>endValue</code> is specified to > 0, the <code>value</code> property is used as a "start value" to determine a selected range on the slider.
		 * If the values is lower/higher than the allowed minimum/maximum, they will be set to the corresponding min/max values of the slider.
		 * <br><br>
		 *
		 * @type {Float}
		 * @defaultvalue null
		 * @public
		 */
		 endValue: {
			type: Float,
			defaultValue: null,
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
 * <code>import "@ui5/webcomponents/dist/Label";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Slider
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-slider
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

	onEnterDOM() {
		this._moveHandler = this._onMouseMove.bind(this);
		this._upHandler = this._onMouseUp.bind(this);
		this._mouseOverHandler = this._onMouseOver.bind(this);
		this._mouseOutHandler = this._onMouseOut.bind(this);

		this.addEventListener("mouseover", this._mouseOverHandler);
		this.addEventListener("mouseout", this._mouseOutHandler);

		// Normalize Slider value according to min/max properties
		this.value = this._clipValue(this.value);
		this._initialUISync();
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
		if (this.disabled) {
			return;
		}

		const oldEndValue = this.endValue;
		const oldStartValue = this.value;
		const clientX = event.clientX != null ? event.clientX : event.targetTouches[0].clientX;

		this._boundingDOMRect = this.getBoundingClientRect();
		const newValue = this._calculateValueFromInteraction(event);
		this._isNewValueInCurrentRange = oldEndValue && newValue >= oldStartValue && newValue <= oldEndValue;

		// In case of Range Slider assign the handle clossest to the press point, otherwise - the single handle's DOM
		this._sliderHandle = this._correctHandleAndValue(clientX, newValue);

		// After a down event on the slider root, listen for move events on
		// body, so the slider value is updated even if the user drags the pointer
		// outside the slider root
		window.addEventListener("mousemove", this._moveHandler);
		window.addEventListener("mouseup", this._upHandler);

		// Do not update Slider if press is in range - only for range sliders (meaning that endValue property is set)
		if (this._isNewValueInCurrentRange) {
			return;
		}

		this._updateUI(newValue);

		if (this.valueAffected === "startValue") {
			this._setValue(newValue);
		} else {
			this._setEndValue(newValue);
		}
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

		// Do not update Slider if press is in range - only for range sliders (meaning that endValue property is set)
		if (this._isNewValueInCurrentRange) {
			return;
		}

		const value = this._calculateValueFromInteraction(event);
		// Update Slider UI in real-time (decoupled with rendering)
		this._updateUI(value);

		if (this.valueAffected === "startValue") {
			this._setValue(value);
		} else {
			this._setEndValue(value);
		}
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
		if (this.endValue) {
			this.shadowRoot.querySelector(".ui5-slider-end-tooltip").style.setProperty("visibility", "visible");
		}
	}

	_handleMouseOut(event) {
		if (!this.showTooltip) {
			return;
		}

		this.shadowRoot.querySelector(".ui5-slider-tooltip").style.setProperty("visibility", "hidden");
		if (this.endValue) {
			this.shadowRoot.querySelector(".ui5-slider-end-tooltip").style.setProperty("visibility", "hidden");
		}
	}

	/**
	 * Returns the correct handle DOM and sets the value that has to be modified after user interaction
	 * Returns that handle that is pressed or closer to the press point
	 *
	 * Determines which one from the value/endValue properties has to be updated after the user action (based on closest handle)
	 */
	_correctHandleAndValue(clientX, value) {
		const handleStart = this.shadowRoot.querySelector(".ui5-slider-handle");
		const handleEnd = this.shadowRoot.querySelector(".ui5-slider-end-handle");

		// If the slider is not a range slider return the single handle
		if (!this.endValue) {
			this.valueAffected = "startValue";
			return handleStart;
		}

		// Check if the press point is in the bounds of any handle
		const handleStartDomRect = handleStart.getBoundingClientRect();
		const handleEndDomRect = handleEnd.getBoundingClientRect();
		const inHandleStartDom = clientX >= handleStartDomRect.left && clientX <= handleStartDomRect.right;
		const inHandleEndDom = clientX >= handleEndDomRect.left && clientX <= handleEndDomRect.right;

		// Allow updating the slider even if the value is in current range,
		// but at the same time the press action is over one of the handles
		if (inHandleEndDom || inHandleStartDom) {
			this._isNewValueInCurrentRange = false;
		}

		// Return that handle that is closer to the press point
		// If the two handles are overlapping return the second (end) one as in general the more common drag move is to the right
		if (inHandleEndDom || value > this.endValue) {
			this.valueAffected = "endValue";
			return handleEnd;
		}

		// If one of the handle is pressed return that one
		if (inHandleStartDom || value < this.value) {
			this.valueAffected = "startValue";
			return handleStart;
		}
	}

	/**
	 * Sets the slider value from an event
	 */
	_calculateValueFromInteraction(event) {
		const pageX = this._getPageXValueFromEvent(event);
		const step = this.step;
		let value = this._computeValueFromPageX(pageX);

		// "Stepihfy" the raw value - calculate a step value
		// Steps are integers, so when Slider is "quantized" (stepped)
		// the value is also rounded to an integer.
		if (this.step !== 0) {
			const numSteps = Math.round(value / step);
			value = numSteps * step;
		}

		// Normalize value and keep it under constrains defined by the slider's properties
		return this._clipValue(value);
	}

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
		this.value = value;
		this.fireEvent("input");
	}

	_setEndValue(value) {
		this.endValue = value;
		this.fireEvent("input");
	}

	/**
	 * Locks the given value for the given handle between boundaries based on slider properties:
	 * 1. Restricts value within the min & max properties.
	 * 2. If range slider, keep start value lower than end value, and the opposite.
	 */
	_clipValue(value) {
		value = Math.min(Math.max(value, this.min), this.max);

		// If not a range slider return the value as it is
		if (!this.endValue) {
			return value;
		}

		// If the start value is become equal or greater than the endValue
		if (this.valueAffected === "startValue" && value > this.endValue) {
			return this.valueEnd;
		}

		// If the endValue is become equal or less than the start value
		if (this.valueAffected === "endValue" && value < this.value) {
			return this.value;
		}

		return value;
	}

	/**
	 * Computes the new value (in %) from the pageX position of the cursor.
	 * Returns the value with rounded to a precision of at most 2 digits after decimal point.
	 */
	_computeValueFromPageX(pageX) {
		const max = this.max;
		const min = this.min;

		// Determine pageX position relative to the Slider DOM
		const xPositionRelative = pageX - this._boundingDOMRect.left;
		// Calculate the percentage complete (the "progress")
		const percentageComplete = xPositionRelative / this._boundingDOMRect.width;
		// Fit (map) the complete percentage between the min/max value range
		return (min + percentageComplete * (max - min)).toFixed(2);
	}

	// Update UI after user interaction.
	_updateUI(newValue) {
		const max = this.max;
		const min = this.min;
		const oldStartValue = this.value;
		const oldEndValue = this.endValue;

		// The progress (completed) percentage of the slider. In case of a range slider it is the range selection
		let percentageComplete;
		// How many pixels from the left end of the slider will be the placed the affected  by the user action handle
		let handlePositionFromLeft;

		// The value according to which we update the UI can be either the (start) value
		// or the endValue property in case of a range.  It is determined in _getClosestHandle()
		// depending on to which handle is closer the user interaction.
		// Otherwise it's a single "value" prop (the single handle slider case).
		const sliderHandle = this._sliderHandle;
		const sliderDomRect = this._boundingDOMRect;
		const sliderProgressBar = this.shadowRoot.querySelector(".ui5-slider-progress");

		// In case of a range the newValue can be either the value (as a "startValue") or the endValue property
		// Update the progress indication width in case of a non-range slider with a single handle
		if (this.valueAffected === "startValue" && !oldEndValue) {
			percentageComplete = (newValue - min) / (max - min);
			handlePositionFromLeft = percentageComplete * sliderDomRect.width;
			sliderProgressBar.style.setProperty("transform", `scaleX(${percentageComplete})`);
		} else if (this.valueAffected === "startValue") {
			// In the case of a range slider when the value changing is the start value:
			percentageComplete = (oldEndValue - newValue) / (max - min);
			handlePositionFromLeft = ((newValue - min) / (max - min)) * sliderDomRect.width;
			sliderProgressBar.style.setProperty("transform", `scaleX(${percentageComplete})`);
			sliderProgressBar.style.setProperty("left", `${handlePositionFromLeft}px`);
		}

		// If the value modified by the user action is the endValue
		if (this.valueAffected === "endValue") {
			percentageComplete = ((newValue - oldStartValue) - min) / (max - min);
			handlePositionFromLeft = (newValue - min) / (max - min) * sliderDomRect.width;
			sliderProgressBar.style.setProperty("transform", `scaleX(${percentageComplete})`);
		}

		// Update the position of the handle whit the calculated left offset
		sliderHandle.style.setProperty("left", `${handlePositionFromLeft}px`);
	}

	/**
	 * Update initial Slider UI representation on entering the DOM
	 */
	_initialUISync() {
		const max = this.max;
		const min = this.min;
		const startValue = this.value;
		const endValue = this.endValue;
		const sliderDomRect = this.getBoundingClientRect();
		const sliderStartHandle = this.shadowRoot.querySelector(".ui5-slider-handle");
		const sliderEndHandle = this.shadowRoot.querySelector(".ui5-slider-end-handle");
		const sliderProgressBar = this.shadowRoot.querySelector(".ui5-slider-progress");

		// The progress (completed) percentage of the slider. In case of a range slider it is the range selection
		let percentageComplete;
		// How many pixels from the left end of the slider will be the placed the affected by the user action handle
		let handlePositionFromLeft;

		// Update the positions of the handle and the size and position of the progress bar
		// Note: In case of a Slider with a single handle the progress (completed) bar width
		// is the same as the position of the handle
		if (!endValue) {
			percentageComplete = (startValue - min) / (max - min);
			handlePositionFromLeft = percentageComplete * sliderDomRect.width;
			sliderStartHandle.style.setProperty("left", `${handlePositionFromLeft}px`);
			sliderProgressBar.style.setProperty("transform", `scaleX(${percentageComplete})`);
		} else {
			const startHandlePositionFromLeft = (startValue - min) / (max - min) * sliderDomRect.width;
			const endHandlePositionFromLeft = (endValue - min) / (max - min) * sliderDomRect.width;
			const rangeSelected = ((endValue - startValue) - min) / (max - min);

			sliderStartHandle.style.setProperty("left", `${startHandlePositionFromLeft}px`);
			sliderEndHandle.style.setProperty("left", `${endHandlePositionFromLeft}px`);
			sliderProgressBar.style.setProperty("left", `${startHandlePositionFromLeft}px`);
			sliderProgressBar.style.setProperty("transform", `scaleX(${rangeSelected})`);
		}
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
