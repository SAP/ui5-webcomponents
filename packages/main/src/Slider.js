import Float from "@ui5/webcomponents-base/dist/types/Float.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import SliderBase from "./SliderBase.js";

// Template
import SliderTemplate from "./generated/templates/SliderTemplate.lit.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-slider",
	languageAware: true,
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.main.Slider.prototype */  {
		/**
		 * Current value of the slider
		 *
		 * @type {Float}
		 * @defaultvalue 0
		 * @public
		 */
		value: {
			type: Float,
			defaultValue: 0,
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The Slider component represents a numerical range and a handle (grip).
 * The purpose of the component is to enable visual selection of a value in
 * a continuous numerical range by moving an adjustable handle.
 *
 * <h3>Structure</h3>
 * The most important properties of the Slider are:
 * <ul>
 * <li>min - The minimum value of the slider range</li>
 * <li>max - The maximum value of the slider range</li>
 * <li>value - The current value of the slider</li>
 * <li>step - Determines the increments in which the slider will move</li>
 * <li>showTooltip - Determines if a tooltip should be displayed above the handle</li>
 * <li>showTickmarks - Displays a visual divider between the step values</li>
 * <li>labelInterval - Labels some or all of the tickmarks with their values.</li>
 * </ul>
 *
 * <h3>Usage</h3>
 * The most common usecase is to select values on a continuous numerical scale (e.g. temperature, volume, etc. ).
 *
 * <h3>Responsive Behavior</h3>
 * The <code>ui5-slider</code> component adjusts to the size of its parent container by recalculating and
 * resizing the width of the control. You can move the slider handle in several different ways:
 * <ul>
 * <li>Drag and drop to the desired value</li>
 * <li>Click/tap on the range bar to move the handle to that location</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Slider";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Slider
 * @extends SliderBase
 * @tagname ui5-slider
 * @since 1.0.0-rc.11
 * @public
 */
class Slider extends SliderBase {
	static get metadata() {
		return metadata;
	}

	static get template() {
		return SliderTemplate;
	}

	constructor() {
		super();
		this._stateStorage.value = null;
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	/**
	 *
	 * Check if the previously saved state is outdated. That would mean
	 * either it is the initial rendering or that a property has been changed
	 * programatically - because the previous state is always updated in
	 * the interaction handlers.
	 *
	 * Normalize current properties, update the previously stored state.
	 * Update the visual UI representation of the Slider
	 *
	 */
	onBeforeRendering() {
		if (!this.isCurrentStateOutdated()) {
			return;
		}

		this.notResized = true;
		this.syncUIAndState("value");
		this._updateHandleAndProgress(this.value);
	}

	/**
	 * Called when the user starts interacting with the slider
	 *
	 * @private
	 */
	_onmousedown(event) {
		// If step is 0 no interaction is available because there is no constant
		// (equal for all user environments) quantitative representation of the value
		if (this.disabled || this.step === 0) {
			return;
		}

		const newValue = this.handleDownBase(event);
		this._valueOnInteractionStart = this.value;

		// Do not yet update the Slider if press is over a handle. It will be updated if the user drags the mouse.
		if (!this._isHandlePressed(this.constructor.getPageXValueFromEvent(event))) {
			this._updateHandleAndProgress(newValue);
			this.updateValue("value", newValue);
		}
	}

	/**
	 * Called when the user moves the slider
	 *
	 * @private
	 */
	_handleMove(event) {
		event.preventDefault();

		// If step is 0 no interaction is available because there is no constant
		// (equal for all user environments) quantitative representation of the value
		if (this.disabled || this._effectiveStep === 0) {
			return;
		}

		const newValue = this.constructor.getValueFromInteraction(event, this._effectiveStep, this._effectiveMin, this._effectiveMax, this.getBoundingClientRect(), this.directionStart);

		this._updateHandleAndProgress(newValue);
		this.updateValue("value", newValue);
	}

	/** Called when the user finish interacting with the slider
	 *
	 * @private
	 */
	_handleUp(event) {
		if (this._valueOnInteractionStart !== this.value) {
			this.fireEvent("change");
		}

		this.handleUpBase();
		this._valueOnInteractionStart = null;
	}

	/** Determines if the press is over the handle
	 *
	 * @private
	 */
	_isHandlePressed(clientX) {
		const sliderHandle = this.shadowRoot.querySelector(".ui5-slider-handle");
		const sliderHandleDomRect = sliderHandle.getBoundingClientRect();

		return clientX >= sliderHandleDomRect.left && clientX <= sliderHandleDomRect.right;
	}


	/** Updates the UI representation of the progress bar and handle position
	 *
	 * @private
	 */
	_updateHandleAndProgress(newValue) {
		const max = this._effectiveMax;
		const min = this._effectiveMin;

		// The progress (completed) percentage of the slider.
		this._progressPercentage = (newValue - min) / (max - min);
		// How many pixels from the left end of the slider will be the placed the affected  by the user action handle
		this._handlePositionFromStart = this._progressPercentage * 100;
	}

	get styles() {
		return {
			progress: {
				"transform": `scaleX(${this._progressPercentage})`,
				"transform-origin": `${this.directionStart} top`,
			},
			handle: {
				[this.directionStart]: `${this._handlePositionFromStart}%`,
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

	get labelItems() {
		return this._labelItems;
	}

	get tooltipValue() {
		const stepPrecision = this.constructor._getDecimalPrecisionOfNumber(this._effectiveStep);
		return this.value.toFixed(stepPrecision);
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}
}

Slider.define();

export default Slider;
