import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Float from "@ui5/webcomponents-base/dist/types/Float.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";

import { getTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

// Styles
import styles from "./generated/themes/SliderBase.css.js";

/**
 * @public
 */
const metadata = {
	properties: /** @lends sap.ui.webcomponents.main.SliderBase.prototype */  {
		/**
		 * Defines the minimum value of the slider
		 *
		 * @type {Float}
		 * @defaultvalue 0
		 * @public
		 */
		min: {
			type: Float,
			defaultValue: 0,
		},
		/**
		 * Defines the maximum value of the slider
		 *
		 * @type {Float}
		 * @defaultvalue 100
		 * @public
		 */
		max: {
			type: Float,
			defaultValue: 100,
		},
		/**
		 * Defines the size of the slider's selection intervals (e.g. min = 0, max = 10, step = 5 would result in possible selection of the values 0, 5, 10).
		 * <br><br>
		 * <b>Note:</b> If set to 0 the slider handle movement is disabled. When negative number or value other than a number, the component fallbacks to its default value.
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
		 * Displays a label with a value on every N-th step.
		 * <br><br>
		 * <b>Note:</b> The step and tickmarks properties must be enabled.
		 * Example - if the step value is set to 2 and the label interval is also specified to 2 - then every second
		 * tickmark will be labelled, which means every 4th value number.
		 *
		 * @type {Integer}
		 * @defaultvalue 0
		 * @public
		 */
		labelInterval: {
			type: Integer,
			defaultValue: 0,
		},
		/**
		 * Enables tick marks visualization for each step.
		 * <br><br>
		 * <b>Note:</b> The step must be a positive number.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		showTickmarks: {
			type: Boolean,
		},
		/**
		 * Enables handle tooltip displaying the current value.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		showTooltip: {
			type: Boolean,
		},
		/**
		 * Defines whether the slider is in disabled state.
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
		_labelsOverlapping: {
			type: Boolean,
		},
		_hiddenTickmarks: {
			type: Boolean,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.SliderBase.prototype */ {
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
	constructor() {
		super();
		this._resizeHandler = this._handleResize.bind(this);
		this._moveHandler = this._handleMove.bind(this);
		this._upHandler = this._handleUp.bind(this);

		this._stateStorage = {
			step: null,
			min: null,
			max: null,
			labelInterval: null,
		};
	}

	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return styles;
	}

	static get TICKMARK_COLOR_MAP() {
		return {
			sap_fiori_3: "#89919a",
			sap_fiori_3_dark: "#89919a",
			sap_fiori_3_hcw: "#000000",
			sap_fiori_3_hcb: "#ffffff",
			sap_belize: "#bfbfbf",
			sap_belize_hcw: "#000000",
			sap_belize_hcb: "#ffffff",
		};
	}

	static get UP_EVENTS() {
		return ["mouseup", "touchend"];
	}

	static get MOVE_EVENT_MAP() {
		return {
			mousedown: "mousemove",
			touchstart: "touchmove",
		};
	}

	static get MIN_SPACE_BETWEEN_TICKMARKS() {
		return 8;
	}

	get classes() {
		return {
			labelContainer: {
				"ui5-slider-hidden-labels": this._labelsOverlapping,
			},
		};
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._resizeHandler);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResize);
	}

	onAfterRendering() {
		// Only call if the resize is triggered by a state changes other than
		// the ones that occured on the previous resize and those caused by user interaction.
		if (this.notResized) {
			this._resizeHandler();
		}
	}

	_ontouchstart(event) {
		this._onmousedown(event);
	}

	/** Shows the tooltip(s) if the <code>showTooltip</code> property is set to true
	 *
	 * @private
	 */
	_onmouseover(event) {
		if (this.showTooltip) {
			this._tooltipVisibility = "visible";
		}
	}

	/**
	 * Hides the tooltip(s) if the <code>showTooltip</code> property is set to true
	 *
	 * @private
	 */
	_onmouseout(event) {
		if (this.showTooltip) {
			this._tooltipVisibility = "hidden";
		}
	}

	/**
	 * Handle the responsiveness of the Slider's UI elements when resizing
	 *
	 * @private
	 */
	_handleResize() {
		if (!this.showTickmarks) {
			return;
		}

		// Mark resizing to avoid unneccessary calls to that function after rendering
		this.notResized = false;

		// Convert the string represented calculation expression to a normal one
		// Check the distance  in pixels exist between every tickmark
		const spaceBetweenTickmarks = this._spaceBetweenTickmarks();

		// If the pixels between the tickmarks are less than 8 only the first and the last one should be visible
		// In such case the labels must correspond to the tickmarks, only the first and the last one should exist.
		if (spaceBetweenTickmarks < SliderBase.MIN_SPACE_BETWEEN_TICKMARKS) {
			this._hiddenTickmarks = true;
			this._labelsOverlapping = true;
		} else {
			this._hiddenTickmarks = false;
		}

		if (this.labelInterval <= 0 || this._hiddenTickmarks) {
			return;
		}


		// Check if there are any overlapping labels.
		// If so - only the first and the last one should be visible
		const labelItems = this.shadowRoot.querySelectorAll(".ui5-slider-labels li");
		this._labelsOverlapping = [...labelItems].some(label => label.scrollWidth > label.clientWidth);
	}

	/**
	 * Called when the user starts interacting with the slider.
	 * After a down event on the slider root, listen for move events on window, so the slider value
	 * is updated even if the user drags the pointer outside the slider root.
	 *
	 * @protected
	 */
	handleDownBase(event) {
		const min = this._effectiveMin;
		const max = this._effectiveMax;
		const domRect = this.getBoundingClientRect();
		const directionStart = this.directionStart;
		const step = this._effectiveStep;
		const newValue = SliderBase.getValueFromInteraction(event, step, min, max, domRect, directionStart);

		if (isPhone() && this.showTooltip) {
			this._tooltipVisibility = "visible";
		}

		// Mark start of a user interaction
		this._isUserInteraction = true;
		// Only allow one type of move event to be listened to (the first one registered after the down event)
		this._moveEventType = !this._moveEventType ? SliderBase.MOVE_EVENT_MAP[event.type] : this._moveEventType;

		SliderBase.UP_EVENTS.forEach(upEventType => window.addEventListener(upEventType, this._upHandler));
		window.addEventListener(this._moveEventType, this._moveHandler);

		return newValue;
	}

	/**
	 * Called when the user finish interacting with the slider
	 * Fires an <code>change</code> event indicating a final value change, after user interaction is finished.
	 *
	 * @protected
	 */
	handleUpBase(valueType) {
		if (isPhone() && this.showTooltip) {
			this._tooltipVisibility = "hidden";
		}

		SliderBase.UP_EVENTS.forEach(upEventType => window.removeEventListener(upEventType, this._upHandler));
		window.removeEventListener(this._moveEventType, this._moveHandler);

		this._moveEventType = null;
		this._isUserInteraction = false;
	}

	/**
	 * Updates value property of the component that has been changed due to a user action.
	 * Fires an <code>input</code> event indicating a value change via interaction that is not yet finished.
	 *
	 * @protected
	 */
	updateValue(valueType, value) {
		this[valueType] = value;
		this.storePropertyState(valueType);
		if (this._isUserInteraction) {
			this.fireEvent("input");
		}
	}

	/**
	 * Locks the given value between min and max boundaries based on slider properties
	 *
	 * @protected
	 */
	static clipValue(value, min, max) {
		value = Math.min(Math.max(value, min), max);
		return value;
	}

	/**
	 * Sets the slider value from an event
	 *
	 * @protected
	 */
	static getValueFromInteraction(event, stepSize, min, max, boundingClientRect, directionStart) {
		const pageX = this.getPageXValueFromEvent(event);
		const value = this.computedValueFromPageX(pageX, min, max, boundingClientRect, directionStart);
		const steppedValue = this.getSteppedValue(value, stepSize, min);

		return this.clipValue(steppedValue, min, max);
	}

	/**
	 * "Stepify" the raw value - calculate the new value depending on the specified step property
	 *
	 * @protected
	 */
	static getSteppedValue(value, stepSize, min) {
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
	 * @protected
	 */
	static getPageXValueFromEvent(event) {
		if (event.targetTouches && event.targetTouches.length > 0) {
			return event.targetTouches[0].pageX;
		}

		return event.pageX;
	}

	/**
	 * Computes the new value (in %) from the pageX position of the cursor.
	 * Returns the value rounded to a precision of at most 2 digits after decimal point.
	 *
	 * @protected
	 */
	static computedValueFromPageX(pageX, min, max, boundingClientRect, directionStart) {
		// Determine pageX position relative to the Slider DOM
		const xRelativePosition = directionStart === "left" ? pageX - boundingClientRect[directionStart] : boundingClientRect[directionStart] - pageX;
		// Calculate the percentage complete (the "progress")
		const percentageComplete = xRelativePosition / boundingClientRect.width;
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
	 * Normalize current properties, update the previously stored state.
	 *
	 * @protected
	 */
	syncUIAndState(...values) {
		// Validate step and update the stored state for the step property.
		if (this.isPropertyUpdated("step")) {
			this._validateStep(this.step);
			this.storePropertyState("step");
		}

		// Recalculate the tickmarks and labels and update the stored state.
		if (this.isPropertyUpdated("min", "max", ...values)) {
			this.storePropertyState("min", "max");

			// Here the value props are changed programatically (not by user interaction)
			// and it won't be "stepified" (rounded to the nearest step). 'Clip' them within
			// min and max bounderies and update the previous state reference.
			values.forEach(valueType => {
				const normalizedValue = SliderBase.clipValue(this[valueType], this._effectiveMin, this._effectiveMax);
				this.updateValue(valueType, normalizedValue);
				this.storePropertyState(valueType);
			});
		}

		// Labels must be updated if any of the min/max/step/labelInterval props are changed
		if (this.labelInterval && this.showTickmarks) {
			this._createLabels();
		}

		// Update the stored state for the labelInterval, if changed
		if (this.isPropertyUpdated("labelInterval")) {
			this.storePropertyState("labelInterval");
		}
	}

	/**
	 * In order to always keep the visual UI representation and the internal
	 * state in sync, the component has a 'state storage' that is updated when the
	 * current state is changed due to a user action.
	 *
	 * Check if the previously saved state is outdated. That would mean
	 * a property has been changed programatically because the previous state
	 * is always updated in the interaction handlers.
	 *
	 * Will return true if any of the properties is not equal to its previously
	 * stored value.
	 *
	 * @protected
	 */
	isCurrentStateOutdated() {
		return Object.entries(this._stateStorage).some(([propName, propValue]) => this[propName] !== propValue);
	}

	/**
	 * Returns the last stored value of a property
	 *
	 * @protected
	 */
	getStoredPropertyState(property) {
		return this._stateStorage[property];
	}

	/**
	 * Check if one or more properties have been updated compared to their last
	 * saved values in the state storage.
	 *
	 * @protected
	 */
	isPropertyUpdated(...properties) {
		return properties.some(prop => this.getStoredPropertyState(prop) !== this[prop]);
	}

	/**
	 * Updates the previously saved in the _stateStorage values of one or more properties.
	 *
	 * @protected
	 */
	storePropertyState(...props) {
		props.forEach(property => {
			this._stateStorage[property] = this[property];
		});
	}

	/**
	 * Returns the start side of a direction - left for LTR, right for RTL
	 */
	get directionStart() {
		return this.effectiveDir === "rtl" ? "right" : "left";
	}

	/**
	 * Calculates and draws the tickmarks with a CSS gradient style
	 *
	 * @private
	 */
	get _tickmarks() {
		if (!this.showTickmarks || !this._effectiveStep) {
			return;
		}

		if (this._hiddenTickmarks) {
			return `linear-gradient(to right, currentColor 1px, transparent 0) 0 center / calc(100% - 1px) 100% repeat-x`;
		}

		// Convert number values to strings to let the CSS do calculations better
		// rounding/subpixel behavior" and the most precise tickmarks distribution
		const maxStr = String(this._effectiveMax);
		const minStr = String(this._effectiveMin);
		const stepStr = String(this._effectiveStep);
		const tickmarkWidth = "1px";

		// There is a CSS bug with the 'currentcolor' value of a CSS gradient that does not
		// respect the variable for more than one theme. It has to be set here for now.
		const currentTheme = getTheme();
		const currentColor = SliderBase.TICKMARK_COLOR_MAP[currentTheme];

		this._tickmarksAmount = `${maxStr - minStr} / ${stepStr}`;
		this._hiddenTickmarks = false;

		// Transparent CSS gradient background
		const tickmarksGradientBase = `linear-gradient(to right, ${currentColor} ${tickmarkWidth}, transparent 0) `;

		// Draw the tickmarks as a patern over the gradient background
		const tickmarksGradientdPattern = `0 center / calc((100% - ${tickmarkWidth}) / (${this._tickmarksAmount})) 100% repeat-x`;

		// Combine to get the complete CSS background gradient property value
		return `${tickmarksGradientBase + tickmarksGradientdPattern}`;
	}

	/**
	 * Calculates the labels amout, width and text and creates them
	 *
	 * @private
	 */
	_createLabels() {
		if (!this.labelInterval || !this.showTickmarks) {
			return;
		}

		const labelInterval = this.labelInterval;
		const step = this._effectiveStep;
		const newNumberOfLabels = (this._effectiveMax - this._effectiveMin) / (step * labelInterval);

		// If the required labels are already rendered
		if (newNumberOfLabels === this._oldNumberOfLabels) {
			return;
		}

		this._oldNumberOfLabels = newNumberOfLabels;
		this._labelWidth = 100 / newNumberOfLabels;
		this._labelValues = [];

		// If the step value is not a round number get its precision
		const stepPrecision = SliderBase._getDecimalPrecisionOfNumber(step);

		// numberOfLabels below can be float so that the "distance betweenlabels labels"
		// calculation to be precize (exactly the same as the distance between the tickmarks).
		// That's ok as the loop stop condition is set to an integer, so it will practically
		// "floor" the number of labels anyway.
		for (let i = 0; i <= newNumberOfLabels; i++) {
			// Format the label numbers with the same decimal precision as the value of the step property
			const labelItemNumber = ((i * step * labelInterval) + this._effectiveMin).toFixed(stepPrecision);
			this._labelValues.push(labelItemNumber);
		}
	}

	get _labels() {
		return this._labelValues || [];
	}

	/**
	 * Calculates space between tickmarks
	 *
	 * @private
	 */
	_spaceBetweenTickmarks() {
		const tickmarksAmountStrCalc = this._tickmarksAmount.split("/");
		const tickmarksAmount = tickmarksAmountStrCalc[0] / tickmarksAmountStrCalc[1];

		return this.getBoundingClientRect().width / tickmarksAmount;
	}

	/**
	 * Notify in case of a invalid step value type
	 *
	 * @private
	 */
	_validateStep(step) {
		if (step === 0) {
			console.warn("The 'step' property must be a positive float number"); // eslint-disable-line
		}

		if (step < 0) {
			console.warn("The 'step' property must be a positive float number. The provided negative number has been converted to its positve equivalent"); // eslint-disable-line
		}

		if (typeof step !== "number" || Number.isNaN(step)) {
			console.warn("The 'step' property must be a positive float number. It has been set to its default value of 1"); // eslint-disable-line
		}
	}

	/**
	 * Normalizes a new <code>step</code> property value.
	 * If tickmarks are enabled recreates them according to it.
	 *
	 * @private
	 */
	get _effectiveStep() {
		let step = this.step;

		if (step < 0) {
			step = Math.abs(step);
		}

		if (typeof step !== "number" || Number.isNaN(step)) {
			step = 1;
		}

		return step;
	}

	get _effectiveMin() {
		return Math.min(this.min, this.max);
	}

	get _effectiveMax() {
		return Math.max(this.min, this.max);
	}
}

export default SliderBase;
