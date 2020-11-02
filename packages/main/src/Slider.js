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
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Slider
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-slider
 * @public
 */
class Slider extends SliderBase {
	static get metadata() {
		return metadata;
	}

	static get template() {
		return SliderTemplate;
	}

	static get styles() {
		return super.styles;
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
		this._updateUI(this.value);
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

		const newValue = this.handleDownBase(event, this.min, this.max);

		// Update Slider UI and internal state
		this._updateUI(newValue);
		this.updateValue("value", newValue);
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
		if (this.disabled || this.step === 0) {
			return;
		}

		const newValue = SliderBase.getValueFromInteraction(event, this.step, this.min, this.max, this.getBoundingClientRect());

		this._updateUI(newValue);
		this.updateValue("value", newValue);
	}

	/** Called when the user finish interacting with the slider
	 *
	 * @private
	 */
	_handleUp(event) {
		this.handleUpBase();
	}

	/** Updates the UI representation of the Slider according to its internal state.
	 *
	 * @private
	 */
	_updateUI(newValue) {
		const max = this.max;
		const min = this.min;

		// The progress (completed) percentage of the slider.
		this._percentageComplete = (newValue - min) / (max - min);
		// How many pixels from the left end of the slider will be the placed the affected  by the user action handle
		this._handlePositionFromStart = this._percentageComplete * 100;
	}

	get styles() {
		return {
			progress: {
				"transform": `scaleX(${this._percentageComplete})`,
			},
			handle: {
				"left": `${this._handlePositionFromStart}%`,
			},
			tickmarks: {
				"background": `${this._tickmarksBackground}`,
			},
			label: {
				"width": `${this._labelWidth}%`,
			},
			labelContainer: {
				"width": `100%`,
				"left": `-${this._labelWidth / 2}%`,
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
		const stepPrecision = SliderBase._getDecimalPrecisionOfNumber(this.step);
		return this.value.toFixed(stepPrecision);
	}

	static async onDefine() {
		await Promise.all([
			fetchI18nBundle("@ui5/webcomponents"),
		]);
	}
}

Slider.define();

export default Slider;
