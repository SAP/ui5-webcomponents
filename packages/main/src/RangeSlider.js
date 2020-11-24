import Float from "@ui5/webcomponents-base/dist/types/Float.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import SliderBase from "./SliderBase.js";

// Template
import RangeSliderTemplate from "./generated/templates/RangeSliderTemplate.lit.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-range-slider",
	languageAware: true,
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.main.RangeSlider.prototype */  {
		/**
		 * Defines start point of a selection - position of a first handle on the slider.
		 * <br><br>
		 *
		 * @type {Float}
		 * @defaultvalue 0
		 * @public
		 */
		startValue: {
			type: Float,
			defaultValue: 0,
		},
		/**
		 * Defines end point of a selection - position of a second handle on the slider.
		 * <br><br>
		 *
		 * @type {Float}
		 * @defaultvalue 100
		 * @public
		 */
		endValue: {
			type: Float,
			defaultValue: 100,
		},
	},
};

/**
 * @class
 *
 * Represents a numerical interval and two handles (grips) to select a sub-range within it.
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The purpose of the component to enable visual selection of sub-ranges within a given interval.
 *
 * <h3>Structure</h3>
 * The most important properties of the Range Slider are:
 * <ul>
 * <li>min - The minimum value of the slider range</li>
 * <li>max - The maximum value of the slider range</li>
 * <li>value - The current value of the slider</li>
 * <li>step - Determines the increments in which the slider will move</li>
 * <li>showTooltip - Determines if a tooltip should be displayed above the handle</li>
 * <li>showTickmarks - Displays a visual divider between the step values</li>
 * <li>labelInterval - Labels some or all of the tickmarks with their values.</li>
 * </ul>
 * <h4>Notes:<h4>
 * <ul>
 * <li>The right and left handle can be moved individually and their positions could therefore switch.</li>
 * <li>The entire range can be moved along the interval.</li>
 * </ul>
 * <h3>Usage</h3>
 * The most common usecase is to select and move sub-ranges on a continuous numerical scale.
 *
 * <h3>Responsive Behavior</h3>
 * You can move the currently selected range by clicking on it and dragging it along the interval.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/RangeSlider";</code>
 *
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.RangeSlider
 * @extends SliderBase
 * @tagname ui5-range-slider
 * @since 1.0.0-rc.11
 * @public
 */
class RangeSlider extends SliderBase {
	static get metadata() {
		return metadata;
	}

	static get template() {
		return RangeSliderTemplate;
	}

	constructor() {
		super();
		this._stateStorage.startValue = null;
		this._stateStorage.endValue = null;
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	get tooltipStartValue() {
		const stepPrecision = this.constructor._getDecimalPrecisionOfNumber(this._effectiveStep);
		return this.startValue.toFixed(stepPrecision);
	}

	get tooltipEndValue() {
		const stepPrecision = this.constructor._getDecimalPrecisionOfNumber(this._effectiveStep);
		return this.endValue.toFixed(stepPrecision);
	}

	/**
	 * Check if the previously saved state is outdated. That would mean
	 * either it is the initial rendering or that a property has been changed
	 * programatically - because the previous state is always updated in
	 * the interaction handlers.
	 *
	 * Normalize current properties, update the previously stored state.
	 * Update the visual UI representation of the Slider.
	 *
	 */
	onBeforeRendering() {
		if (!this.isCurrentStateOutdated()) {
			return;
		}

		this.notResized = true;
		this.syncUIAndState("startValue", "endValue");
		this._updateHandlesAndRange(null);
	}

	/**
	 * Called when the user starts interacting with the slider
	 *
	 * @private
	 */
	_onmousedown(event) {
		// If step is 0 no interaction is available because there is no constant
		// (equal for all user environments) quantitative representation of the value
		if (this.disabled || this._effectiveStep === 0) {
			return;
		}

		// Calculate the new value from the press position of the event
		const newValue = this.handleDownBase(event);

		// Determine the rest of the needed details from the start of the interaction.
		this._saveInteractionStartData(event, newValue);

		// Do not yet update the RangeSlider if press is in range or over a handle.
		if (this._inCurrentRange || this._handeIsPressed) {
			this._handeIsPressed = false;
			return;
		}

		// Update Slider UI and internal state
		this._updateHandlesAndRange(newValue);
		this.updateValue(this._valueAffected, newValue);
		this.storePropertyState(this._valueAffected);
	}


	/**
	 * Determines and saves needed values from the start of the interaction:
	 *
	 * Is the value calculated is within the currently selected range;
	 * Initial pageX position of the start handle affected by the interaction;
	 * Initial pageX value of the pressed postion;
	 * Affected value property by the action;
	 *
	 * @private
	 */
	_saveInteractionStartData(event, newValue) {
		const progressBarDom = this.shadowRoot.querySelector(".ui5-slider-progress").getBoundingClientRect();

		// Save the state of the value properties on the start of the interaction
		this._prevStartValue = this.startValue;
		this._prevEndValue = this.endValue;

		// Check if the new value is in the current select range of values
		this._inCurrentRange = newValue > this._prevStartValue && newValue < this._prevEndValue;
		// Save the initial press point coordinates (position)
		this._initialPageXPosition = this.constructor.getPageXValueFromEvent(event);
		// Which element of the Range Slider is pressed and which value property to be modified on further interaction
		this._pressTargetAndAffectedValue(this._initialPageXPosition, newValue);

		// Use the progress bar to save the initial coordinates of the start-handle when the interaction begins.
		// We will use it as a reference to calculate a moving offset if the whole range selection is dragged.
		this._initialStartHandlePageX = this.directionStart === "left" ? progressBarDom.left : progressBarDom.right;
	}


	/**
	 * Called when the user moves the slider
	 *
	 * @private
	 */
	_handleMove(event) {
		event.preventDefault();

		// If 'step' is 0 no interaction is available as there is no constant quantitative representation of the value
		if (this.disabled || this._effectiveStep === 0) {
			return;
		}

		// Update UI and state when dragging a single Range Slider handle
		if (!this._inCurrentRange) {
			this._updateValueOnHandleDrag(event);
			return;
		}

		// Updates UI and state when dragging of the whole selected range
		this._updateValueOnRangeDrag(event);
	}

	/**
	 * Updates UI and state when dragging a single Range Slider handle
	 *
	 * @private
	 */
	_updateValueOnHandleDrag(event) {
		const newValue = this.constructor.getValueFromInteraction(event, this._effectiveStep, this._effectiveMin, this._effectiveMax, this.getBoundingClientRect(), this.directionStart);

		this._updateHandlesAndRange(newValue);
		this.updateValue(this._valueAffected, newValue);
		this.storePropertyState(this._valueAffected);
	}

	/**
	 * Updates UI and state when dragging of the whole selected range
	 *
	 * @private
	 */
	_updateValueOnRangeDrag(event) {
		// Calculate the new 'start' and 'end' values from the offset between the original press point and the current position of the mouse
		const currentPageXPos = this.constructor.getPageXValueFromEvent(event);
		const newValues = this._calculateRangeOffset(currentPageXPos, this._initialStartHandlePageX);

		// No matter the which value is set as the one to be modified (this._valueAffected) we want to modify both of them
		this._valueAffected = null;

		// Update the UI and the state acccording to the calculated new values
		this.updateValue("startValue", newValues[0]);
		this.updateValue("endValue", newValues[1]);
		this._updateHandlesAndRange(null);
		this.storePropertyState("startValue", "endValue");
	}

	_handleUp() {
		if (this.startValue !== this._prevStartValue || this.endValue !== this._prevEndValue) {
			this.fireEvent("change");
		}

		this._swapValues();
		this.handleUpBase();

		this._valueAffected = null;
		this._prevStartValue = null;
		this._prevEndValue = null;
	}

	/**
	 * Determines where the press occured and which values of the Range Slider
	 * handles should be updated on further interaction.
	 *
	 * If the press is not in the selected range or over one of the Range Slider handles
	 * determines which one from the value/endValue properties has to be updated
	 * after the user action (based on closest handle).
	 *
	 * Set flags if the press is over a handle or in the selected range,
	 * in such cases no values are changed on interaction start, but could be
	 * updated later when dragging.
	 *
	 * @private
	 */
	_pressTargetAndAffectedValue(clientX, value) {
		const startHandle = this.shadowRoot.querySelector(".ui5-slider-handle--start");
		const endHandle = this.shadowRoot.querySelector(".ui5-slider-handle--end");

		// Check if the press point is in the bounds of any of the Range Slider handles
		const handleStartDomRect = startHandle.getBoundingClientRect();
		const handleEndDomRect = endHandle.getBoundingClientRect();
		const inHandleStartDom = clientX >= handleStartDomRect.left && clientX <= handleStartDomRect.right;
		const inHandleEndDom = clientX >= handleEndDomRect.left && clientX <= handleEndDomRect.right;

		// Remove the flag for value in current range if the press action is over one of the handles
		if (inHandleEndDom || inHandleStartDom) {
			this._inCurrentRange = false;
			this._handeIsPressed = true;
		}

		// Return that handle that is closer to the press point
		if (inHandleEndDom || value > this.endValue) {
			this._valueAffected = "endValue";
		}

		// If one of the handle is pressed return that one
		if (inHandleStartDom || value < this.startValue) {
			this._valueAffected = "startValue";
		}
	}

	/**
	 * Calculates startValue/endValue properties when the whole range is moved.
	 *
	 * Uses the change of the position of the start handle and adds the initially
	 * selected range to it, to determine the whole range offset.
	 *
	 * @param {Integer} currentPageXPos The current horizontal position of the cursor/touch
	 * @param {Integer} initialStartHandlePageXPos The initial horizontal position of the start handle
	 *
	 * @private
	 */
	_calculateRangeOffset(currentPageXPos, initialStartHandlePageXPos) {
		// Return the current values if there is no difference in the
		// possitions of the initial press and the current pointer
		if (this._initialPageXPosition === currentPageXPos) {
			return [this.startValue, this.endValue];
		}

		const min = this._effectiveMin;
		const max = this._effectiveMax;
		const selectedRange = this.endValue - this.startValue;

		// Computes the new value based on the difference of the current cursor location from the start of the interaction
		let startValue = this._calculateStartValueByOffset(currentPageXPos, initialStartHandlePageXPos);

		// When the end handle reaches the max possible value prevent the start handle from moving
		// And the opposite - if the start handle reaches the beginning of the slider keep the initially selected range.
		startValue = this.constructor.clipValue(startValue, min, max - selectedRange);

		return [startValue, startValue + selectedRange];
	}

	/**
	 * Computes the new value based on the difference of the current cursor location from the
	 * start of the interaction.
	 *
	 * @param {Integer} currentPageXPos The current horizontal position of the cursor/touch
	 * @param {Integer} initialStartHandlePageXPos The initial horizontal position of the start handle
	 *
	 * @private
	 */
	_calculateStartValueByOffset(currentPageXPos, initialStartHandlePageXPos) {
		const min = this._effectiveMin;
		const max = this._effectiveMax;
		const step = this._effectiveStep;
		const dom = this.getBoundingClientRect();

		let startValue;
		let startValuePageX;
		let positionOffset;

		/* Depending on the dragging direction:
		- calculate the new position of the start handle from its old pageX value combined with the movement offset;
		- calculate the start value based on its new pageX coordinates;
		- 'stepify' the calculated value based on the specified step property; */
		if (currentPageXPos > this._initialPageXPosition) {
			// Difference between the new position of the pointer and when the press event initial occured
			positionOffset = currentPageXPos - this._initialPageXPosition;

			startValuePageX = initialStartHandlePageXPos + positionOffset;
			startValue = this.constructor.computedValueFromPageX(startValuePageX, min, max, dom, this.directionStart);
			startValue = this.constructor.getSteppedValue(startValue, step, min);
		} else {
			positionOffset = this._initialPageXPosition - currentPageXPos;
			startValuePageX = initialStartHandlePageXPos - positionOffset;
			startValue = this.constructor.computedValueFromPageX(startValuePageX, min, max, dom, this.directionStart);
			startValue = this.constructor.getSteppedValue(startValue, step, min);
		}

		return startValue;
	}

	_updateHandlesAndRange(newValue) {
		const max = this._effectiveMax;
		const min = this._effectiveMin;
		const prevStartValue = this.getStoredPropertyState("startValue");
		const prevEndValue = this.getStoredPropertyState("endValue");

		// The value according to which we update the UI can be either the startValue
		// or the endValue property. It is determined in _getClosestHandle()
		// depending on to which handle is closer the user interaction.
		if (this._valueAffected === "startValue") {
			// When the value changing is the start value:
			this._selectedRange = (prevEndValue - newValue) / (max - min);
			this._firstHandlePositionFromStart = ((newValue - min) / (max - min)) * 100;
		} else if (this._valueAffected === "endValue") {
			// Wen the value changing is the end value:
			this._selectedRange = ((newValue - prevStartValue)) / (max - min);
			this._secondHandlePositionFromStart = (newValue - min) / (max - min) * 100;
		} else {
			// When both values are changed - UI sync or moving the whole selected range:
			this._selectedRange = ((this.endValue - this.startValue)) / (max - min);
			this._firstHandlePositionFromStart = ((this.startValue - min) / (max - min)) * 100;
			this._secondHandlePositionFromStart = (this.endValue - min) / (max - min) * 100;
		}
	}

	/**
	 * Swaps start and end values and handles (thumbs), if one came accros the other
	 *
	 * @private
	 */
	_swapValues() {
		// If the start value is greater than the endValue swap them and their handles
		if (this._valueAffected === "startValue" && this.startValue > this.endValue) {
			const oldEndValue = this.endValue;
			this.endValue = this.startValue;
			this.startValue = oldEndValue;
			return;
		}

		// If the endValue become less than the start value swap them and their handles
		if (this._valueAffected === "endValue" && this.endValue < this.startValue) {
			const oldStartValue = this.startValue;
			this.startValue = this.endValue;
			this.endValue = oldStartValue;
		}
	}

	get styles() {
		return {
			progress: {
				"transform": `scaleX(${this._selectedRange})`,
				"transform-origin": `${this.directionStart} top`,
				[this.directionStart]: `${this._firstHandlePositionFromStart}%`,
			},
			startHandle: {
				[this.directionStart]: `${this._firstHandlePositionFromStart}%`,
			},
			endHandle: {
				[this.directionStart]: `${this._secondHandlePositionFromStart}%`,
			},
			tickmarks: {
				"background": `${this._tickmarks}`,
			},
			label: {
				"width": `${this._labelWidth}%`,
			},
			labelContainer: {
				"width": `100%`,
				[this.directionStart]: `-${this._labelWidth / 2}%`,
			},
			tooltip: {
				"visibility": `${this._tooltipVisibility}`,
			},
		};
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}
}

RangeSlider.define();

export default RangeSlider;
