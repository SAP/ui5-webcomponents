import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Float from "@ui5/webcomponents-base/dist/types/Float.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";

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
		_labelsOverlapping: {
			type: Boolean,
		},
		_hiddenTickmarks: {
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
	constructor() {
		super();
		this._handleResize = this._handleResize.bind(this);
		this.DOWN_EVENTS = ['mousedown', 'pointerdown', 'touchstart'];
		this.UP_EVENTS = ['mouseup', 'pointerup', 'touchend'];
		this.MOVE_EVENT_MAP = {
			mousedown: 'mousemove',
			pointerdown: 'pointermove',
			touchstart: 'touchmove',
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

	get labelItems() {
		return this._labelItems;
	}

	get classes() {
		return {
			label: {
				"ui5-slider-hidden-labels": this._labelsOverlapping,
			}
		}
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResize);

		this._moveHandler = this._handleMove.bind(this);
		this._upHandler = this._handleUp.bind(this);

		this.addEventListener("mouseover", this._mouseOverHandler);
		this.addEventListener("mouseout", this._mouseOutHandler);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResize);
		this.removeEventListener("mouseover", this._mouseOverHandler);
		this.removeEventListener("mouseout", this._mouseOutHandler);
	}

	onBeforeRendering() {
		this._syncUIAndState();
	}

	onAfterRendering() {
		this._handleResize();
	}
	/**
	 * Handle the responsiveness of the Slider's UI elements when resing 
	 *
	 * @private
	 */
	_handleResize() {
		if (!this.tickmarks) {
			return;
		}

		// Convert the string represented calculation expression to a normal one
		// Check the distance  in pixels exist between every tickmark
		const tickmarksAmountStrCalc = this._tickmarksAmount.split("/");
		const tickmarksAmount = tickmarksAmountStrCalc[0] / tickmarksAmountStrCalc[1];
		const spaceBetweenTickmarks = this.getBoundingClientRect().width / tickmarksAmount;

		// If the pixels between the tickmarks are less than 8 only the first and the last one should be visible
		// In such case the labels must correspond to the tickmarks, only the first and the last one should exist.
		if (spaceBetweenTickmarks < 8) {
			this._tickmarksBackground = `linear-gradient(to right, currentColor 1px, transparent 0) 0 center / calc(100% - 1px) 100% repeat-x`;
			this._hiddenTickmarks = true;
			this._labelsOverlapping = true;
		} else {
			this._drawDefaultTickmarks(this.step, this.max, this.min);
			this._hiddenTickmarks = false;
		}

		if (this.labelInterval <= 0 || this._hiddenTickmarks) {
			return;
		}
		
		// Cache the labels if not yet fetched
		if (!this._labels) {
			this._labels = this.shadowRoot.querySelectorAll(".ui5-slider-labels li");
		}

		// Check if there are any overlapping labels.
		// If so - only the first and the last one should be visible
		this._labelsOverlapping = Array.prototype.some.call(this._labels, label => label.scrollWidth > label.clientWidth);
	}

	/**
	 * Called when the user starts interacting with the slider
	 * After a down event on the slider root, listen for move events on
	 * window, so the slider value is updated even if the user drags the pointer
	 * outside the slider root
	 * @private
	 */
	_handleDownBase(event, min, max) {
		// Only allow one type of move event to be listened to (the first one registered after the down event)
		this._moveEventType = !this._moveEventType ? this.MOVE_EVENT_MAP[event.type] : this._moveEventType;
		this.UP_EVENTS.forEach((upEventType) => window.addEventListener(upEventType, this._upHandler));
		window.addEventListener(this._moveEventType, this._moveHandler);

		this._boundingClientRect = this.getBoundingClientRect();
		const newValue = SliderBase._getValueFromInteraction(event, this.step, min, max, this._boundingClientRect);
		return newValue;
	}

	_handleUpBase() {
		this.fireEvent("change");
		this.UP_EVENTS.forEach((upEventType) => window.removeEventListener(upEventType, this._upHandler));

		window.removeEventListener(this._moveEventType, this._moveHandler);
		this._moveEventType = null;
	}

	_handleMouseOver(event) {
		if (!this.disabled || this.showTooltip) {
			this._tooltipVisibility = "visible";
		}
	}

	_handleMouseOut(event) {
		if (this.showTooltip) {
			this._tooltipVisibility = "hidden";
		}
	}

	_updateValue(valueType, value) {
		this[valueType] = value;
		this.fireEvent("input");
	}

	/**
	 * Locks the given value between min and max boundaries based on slider properties
	 *
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
	 * Update initial Slider UI representation and normalize internal state
	 * Normalize Range Slider values according to min/max properties
	 * Normalize the step value and draw tickmarks/labels if specified
	 * 
	 * Returns <code>true</code> if UI has to be updated further to sync 
	 * with the internal state and <code>undefined</code> otherwise
	 * @private
	 */
	_syncUIAndState() {
		// In this case the value prop is changed programatically (not by user interaction)
		// and it won't be "stepified" (rounded to the nearest step)
		if (this.step !== this._prevStepValue) {
			this._setStep(this.step);
			this._prevStepValue = this.step;
			return;
		}

		if (this.min !== this._prevMin || this.max !== this._prevMax) {
			this._drawDefaultTickmarks(this.step, this.max, this.min);
			this._prevMin = this.min;
			this._prevMax = this.max;
			return true;
		}
	}

	/**
	 * Calculates and draws the tickmarks with a CSS gradient style
	 *
	 * @private
	 */
	_drawDefaultTickmarks(step, max, min) {
		if (!this.tickmarks || !this.step) {
			return;
		}

		// Let the CSS do calculations for precise tickmarks distribution
		const stepStr = String(step);
		const maxStr = String(max);
		const minStr = String(min);
		const tickmarkWidth = "1px";

		this._tickmarksAmount = `${maxStr - minStr} / ${stepStr}`;
		this._hiddenTickmarks = false;

		// Transparent CSS gradient background
		const tickmarksGradientBase = `linear-gradient(to right, currentColor ${tickmarkWidth}, transparent 0) `;

		// Draw the tickmarks as a patern over the gradient background
		const tickmarksGradientdPattern = `0 center / calc((100% - ${tickmarkWidth}) / (${this._tickmarksAmount})) 100% repeat-x`;

		// Combine to get the complete CSS background gradient property value
		this._tickmarksBackground = `${tickmarksGradientBase + tickmarksGradientdPattern}`;

		// If labelsInterval is specified draw labels for the necessary tickmarks
		if (this.labelInterval > 0) {
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
			const labelItemNumber = ((i * step * labelInterval) + this.min).toFixed(stepPrecision);
			this._labelItems.push(document.createTextNode(labelItemNumber));
		}
	}

	_setStep(step) {
		if (step === 0) {
			return;
		}

		if (typeof step !== "number" || step < 0 || isNaN(step)) {
			step = 1;
		}

		if (this.tickmarks && !this._initialRendering) {
			this._drawDefaultTickmarks(step, this.max, this.min);
		}

		this.step = step;
	}
}

export default SliderBase;
