import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
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
			defaultValue: 0,
		},
		/**
		 * Determines end point of a selection - position of a second handle on the slider. Allows defining of a <b>selected range</b>.
		 * When <code>endValue</code> is specified to > 0, the <code>value</code> property is used as a "start value" to determine a selected range on the slider.
		 * If the values is lower/higher than the allowed minimum/maximum, they will be set to the corresponding min/max values of the slider.
		 * <br><br>
		 *
		 * @type {Float}
		 * @defaultvalue 0
		 * @public
		 */
		 endValue: {
			type: Float,
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

	// TODO Include touch/pointer events, keyboard handling
	/**
	 * Called when the user starts interacting with the slider
	 */
	_handleDown(event) {
		const _this = this;

		if (this.disabled) {
			return;
		}

		const oldEndValue = _this.endValue;
		const oldStartValue = _this.value;
		const clientX = event.clientX != null ? event.clientX : event.targetTouches[0].clientX;

		_this.boundingDOMRect = _this.getBoundingClientRect();
		const newValue = _this._calculateValueFromInteraction(event);

		// In case of Range Slider assign the handle clossest to the press point, otherwise - the single handle's DOM
		_this.handle = _this._getClosestHandle(clientX, newValue);

		const moveHandler = moveEvent => {
			_this._handleMove(moveEvent);
		};
		const upHandler = () => {
			_this._handleUp();
			_this.removeEventListener("mouseup", upHandler);
			document.body.removeEventListener("mousemove", moveHandler);
		};

		// After a down event on the slider root, listen for move events on
		// body, so the slider value is updated even if the user drags the pointer
		// outside the slider root
		document.body.addEventListener("mousemove", moveHandler);
		document.body.addEventListener("mouseup", upHandler);

		// Do not update Slider if press is in range - only for range sliders (meaning that endValue property is set)
		if (oldEndValue && newValue >= oldStartValue && newValue <= oldEndValue) {
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

		const value = this._calculateValueFromInteraction(event);
		const updateValueAndFireEvent = () => {
			if (this.valueAffected === "startValue") {
				this._setValue(value);
			} else {
				this._setEndValue(value);
			}
		}

		// Update Slider UI in real-time (decoupled with rendering)
		this._updateUI(value);
		// Prevent re-rendering on every move event fired
		this.debounce(updateValueAndFireEvent, 100);
	}

	_handleUp() {
		this.fireEvent("change");
	}

	_getClosestHandle(clientX, value) {
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
		const min = this.min;
		const max = this.max;
		const step = this.step;
		let value = this._computeValueFromPageX(pageX);

		// "Stepihfy" the raw value - calculate a step value
		if (this.step !== 0) {
			const numSteps = Math.round(value / step);
			value = numSteps * step;
		}

		// Normalize value
		if (value < min) {
			value = min;
		} else if (value > max) {
			value = max;
		}

		return value;
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
	 * Computes the new value (in %) from the pageX position of the cursor
	 */
	// TODO RTL support?
	_computeValueFromPageX(pageX) {
		const max = this.max;
		const min = this.min;

		// Determine pageX position relative to the Slider DOM
		const xPositionRelative = pageX - this.boundingDOMRect.left;
		// Calculate the percentage complete (the "progress")
		const percentageComplete = xPositionRelative / this.boundingDOMRect.width;
		// Fit (map) the complete percentage between the min/max value range
		return min + percentageComplete * (max - min);
	}

	// TODO Refactor the 2 functions below

	// Update UI after user interaction
	_updateUI(value) {
		const max = this.max;
		const min = this.min;
		const startValue = this.value;
		const endValue = this.endValue;

		// The value according to which we update the UI can be either the (start) value
		// or the endValue property in case of a range. Otherwise just the single "value" prop in case
		// specified (the single handle slider case). It is determined in _getClosestHandle()
		// depending on to which handle is closer the user interaction. The same goes for the handle.
		const handleDom = this.handle;
		const sliderDomRect = this.boundingDOMRect;
		let percentageComplete = (value - min) / (max - min);
		let translateProgressPx = percentageComplete * sliderDomRect.width;
		// Update the progress indication width. In the case of a range slider
		// Use the already calculated progress of the first handle to determine 
		// starting point of the progress indicator.
		if (this.valueAffected === "startValue") {
			this.shadowRoot.querySelector(".ui5-slider-progress").style.setProperty("transform", `scaleX(${percentageComplete})`);
		} else {
			let percentageComplete = (endValue - min) / (max - min);
			let translateProgressPx = percentageComplete * sliderDomRect.width;
			const startProgressPoint = translateProgressPx;
			const translateRangeProgressPx = ((value - startValue) - min) / (max - min);
			this.shadowRoot.querySelector(".ui5-slider-progress").style.setProperty("transform", `scaleX(${translateRangeProgressPx})`);
			this.shadowRoot.querySelector(".ui5-slider-progress").style.setProperty("left", `${startProgressPoint}`);
		}

		// Update the position of the handle depending on the value
		handleDom.style.setProperty("left", `${translateProgressPx}px`);
	}

	// Update Slider UI after entering the DOM
	// TODO Refactor this
	_initialUISync() {
		const max = this.max;
		const min = this.min;
		const startValue = this.value;
		const endValue = this.endValue;
		const sliderDomRect = this.getBoundingClientRect();

		if (!endValue) {
			const handleDom = this.shadowRoot.querySelector(".ui5-slider-handle");
			const percentageComplete = (startValue - min) / (max - min);
			const translatePx = percentageComplete * sliderDomRect.width;

			// Update the position of the handle depending on the value
			// Center the Slider Handle position under the cursor/pointer
			handleDom.style.setProperty("left", `${translatePx}px`);
			this.shadowRoot.querySelector(".ui5-slider-progress").style.setProperty("transform", `scaleX(${percentageComplete})`);
		} else {
			const percentageCompleteSecondHandle = (endValue - min) / (max - min);
			const percentageComplete = (startValue - min) / (max - min);
			const translatePx = percentageComplete * sliderDomRect.width;
			const translatePxSecondHandle = percentageCompleteSecondHandle * sliderDomRect.width;
			const rangeProgress = ((endValue - startValue) - min) / (max - min);
			this.shadowRoot.querySelector(".ui5-slider-handle").style.setProperty("left", `${translatePx}px`);
			this.shadowRoot.querySelector(".ui5-slider-end-handle").style.setProperty("left", `${translatePxSecondHandle}px`);
			this.shadowRoot.querySelector(".ui5-slider-progress").style.setProperty("left", `${translatePx}px`);
			this.shadowRoot.querySelector(".ui5-slider-progress").style.setProperty("transform", `scaleX(${rangeProgress})`);
		}
	}

	// TODO Allow tickmark labeling?
	/**
	 * Calculates and draws the tickmarks with a CSS gradient style
	 */
	drawDefaultTickmarks(step, max, min) {
		const stepStr = String(step);
		const maxStr = String(max);
		const minStr = String(min);

		// Calculate how many tickmarks have to be drawn (max - min / stepValue)
		const tickmarksAmount = `${maxStr - minStr} / ${stepStr}`;

		// TODO* Make it themable
		const tickmarkWidth = "1px";

		// Transparent CSS gradient background
		const tickmarksGradientBase = `linear-gradient(to right, currentColor ${tickmarkWidth}, transparent 0)`;

		// Draw the tickmarks as a patern over the gradient background
		const tickmarksGradientdPattern = `0 center / calc((100% - ${tickmarkWidth}) / (${tickmarksAmount})) 100% repeat-x`;

		// Combine to get the complete CSS background gradient property value
		const tickmarksBackground = `${tickmarksGradientBase + tickmarksGradientdPattern}`;

		// Apply the style to the container
		this.shadowRoot.querySelector(".ui5-slider-tickmarks").style.setProperty("background", tickmarksBackground);
	}

	setStep(step) {
		if (typeof step !== "number" || step < 0) {
			step = 1;
		}
		this.step = step;
	}

	onEnterDOM() {
		this._initialUISync() 
	}

	onBeforeRendering() {
		if (this.step !== 1) {
			this.setStep(this.step);
		}
	}

	onAfterRendering() {
		if (this.step && this.tickmarks) {
			this.drawDefaultTickmarks(this.step, this.max, this.min);
		}
	}

	debounce(fn, delay) {
		clearTimeout(this.debounceFn);
		this.debounceFn = setTimeout(() => {
			this.debounceFn = null;
			fn();
		}, delay);
	}
}

Slider.define();

export default Slider;
