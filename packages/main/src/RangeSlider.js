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
		 * @defaultvalue 0
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
 * The purpose of the control is to enable visual selection of sub-ranges within a given interval.
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
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-range-slider
 * @since 1.0.0-rc.11
 * @appenddocs SliderBase
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

		const oldEndValue = this.endValue;
		const oldStartValue = this.startValue;
		const newValue = this.handleDownBase(event, this._effectiveMin, this._effectiveMax);

		// Check if the new value is in the current select range of values
		this._isNewValueInCurrentRange = newValue > oldStartValue && newValue < oldEndValue;
		// Save the initial press point coordinates (position).
		this._initialPageXPosition = this.constructor.getPageXValueFromEvent(event);
		// Determine value to be modified depending on the the handle clossest to the press point
		this._setCurrentValueType(this._initialPageXPosition, newValue);

		// Use the progress bar to save the initial coordinates of the start-handle when the interaction begins.
		// We will use it as a reference to calculate a moving offset if the whole range selection is dragged.
		this._initialStartHandlePageX = this.directionStart === "left" ? this.shadowRoot.querySelector(".ui5-slider-progress").getBoundingClientRect().left : this.shadowRoot.querySelector(".ui5-slider-progress").getBoundingClientRect().right;

		// Do not yet update the RangeSlider if press is in range or over a handle. It will be updated if the user drags the mouse.
		if (this._isNewValueInCurrentRange || this._handeIsPressed) {
			this._handeIsPressed = false;
			return;
		}

		// Update Slider UI and internal state
		this._updateHandlesAndRange(newValue);
		this.updateValue(this._valueAffected, newValue);
		this.storePropertyState(this._valueAffected);
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

		// If the user does not drag the whole range selection,
		// sync the internal state and the UI with the corresponding value change
		if (!this._isNewValueInCurrentRange) {
			const newValue = this.constructor.getValueFromInteraction(event, this._effectiveStep, this._effectiveMin, this._effectiveMax, this.getBoundingClientRect(), this.directionStart);

			this._updateHandlesAndRange(newValue);
			this.updateValue(this._valueAffected, newValue);
			this.storePropertyState(this._valueAffected);

			return;
		}

		/* If the press is in current range when dragging occurs we move the whole selected range (progress indicator).
		Calculate the new 'start' and 'end' values from the offset between the original press point and the current position of the mouse */
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
		this._swapValues();
		this.handleUpBase();
		this._valueAffected = null;
	}

	/**
	 * Determines which one from the value/endValue properties has to be updated after the user action (based on closest handle)
	 *
	 * @private
	 */
	_setCurrentValueType(clientX, value) {
		const startHandle = this.shadowRoot.querySelector(".start-handle");
		const endHandle = this.shadowRoot.querySelector(".end-handle");

		// Check if the press point is in the bounds of any handle
		const handleStartDomRect = startHandle.getBoundingClientRect();
		const handleEndDomRect = endHandle.getBoundingClientRect();
		const inHandleStartDom = clientX >= handleStartDomRect.left && clientX <= handleStartDomRect.right;
		const inHandleEndDom = clientX >= handleEndDomRect.left && clientX <= handleEndDomRect.right;

		// Remove the flag for value in current range if the press action is over one of the handles
		if (inHandleEndDom || inHandleStartDom) {
			this._isNewValueInCurrentRange = false;
			this._handeIsPressed = true;
		}

		// Return that handle that is closer to the press point
		// If the two handles are overlapping return the second (end) one as in general the more common drag move is to the right
		if (inHandleEndDom || value > this.endValue) {
			this._valueAffected = "endValue";
		}

		// If one of the handle is pressed return that one
		if (inHandleStartDom || value < this.startValue) {
			this._valueAffected = "startValue";
		}
	}

	/**
	 * Computes new 'start' and 'end' values in case the user is moving the whole range progress indicator.
	 * Returns an array with the values
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
		const step = this._effectiveStep;
		const dom = this.getBoundingClientRect();
		const selectedRange = this.endValue - this.startValue;

		// The difference between the new position of the pointer and when the press event initial occured, based on the dragging direction
		const positionOffset = currentPageXPos > this._initialPageXPosition ? currentPageXPos - this._initialPageXPosition : this._initialPageXPosition - currentPageXPos;
		let startValue;
		let	startValuePageX;

		/* If the dragging direction is from min to max (left to right, by LTR default):
		- calculate the new position of the start handle from its old pageX value combined with the movement offset;
		- calculate the start value based on its new pageX coordinates;
		- stepify the calculated value based on the specified step property;
		Repeat the same calculations in case of a dragging in the opposite direction */
		if (currentPageXPos > this._initialPageXPosition) {
			startValuePageX = initialStartHandlePageXPos + positionOffset;
			startValue = this.constructor.computedValueFromPageX(startValuePageX, min, max, dom, this.directionStart);
			startValue = this.constructor.getSteppedValue(startValue, step, min);
		} else {
			startValuePageX = initialStartHandlePageXPos - positionOffset;
			startValue = this.constructor.computedValueFromPageX(startValuePageX, min, max, dom, this.directionStart);
			startValue = this.constructor.getSteppedValue(startValue, step, min);
		}

		// When the end handle reaches the max possible value prevent the start handle from moving
		// And the opposite - if the start handle reaches the beginning of the slider keep the initially selected range.
		startValue = this.constructor.clipValue(startValue, min, max - selectedRange);
		const endValue = startValue + selectedRange;

		this._prevCursorPosition = currentPageXPos;
		return [startValue, endValue];
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
