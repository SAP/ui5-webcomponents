import SliderBase from "./SliderBase.js";
import Float from "@ui5/webcomponents-base/dist/types/Float.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";

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
		value: {
			type: Float,
			defaultValue: 0,
		}
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
class Slider extends SliderBase {
	static get metadata() {
		return metadata;
	}

	static get template() {
		return SliderTemplate;
	}

	static get styles() {
		return SliderBase.styles;
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
		this.value = SliderBase._clipValue(this.value, this.min, this.max);
		// Update initial Slider UI representation on entering the DOM
		this._initialUISync();
		// Initial normalization of the step value
		this._setStep(this.step);
	}

	get progressIndicatorWidth() {
		return this._percentageComplete;
	}

	get handlePosition() {
		return this._handlePositionFromLeft;
	}
	/**
	 * Called when the user starts interacting with the slider
	 */
	_handleDown(event) {
		if (this.disabled) {
			return;
		}

		this._handleDownBase(event, "value", this.min, this.max);
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

		this._handleMoveBase(event, "value", this.min, this.max);
	}

	// Update UI after user interaction.
	_updateUI(newValue) {
		const max = this.max;
		const min = this.min;
		const boundingClientRect = this._boundingClientRect || this.getBoundingClientRect();

		// The progress (completed) percentage of the slider.
		this._percentageComplete = (newValue - min) / (max - min);
		// How many pixels from the left end of the slider will be the placed the affected  by the user action handle
		this._handlePositionFromLeft = this._percentageComplete * boundingClientRect.width;
	}

	/**
	 * Update initial Slider UI representation on entering the DOM
	 */
	_initialUISync() {
		this._updateUI(this.value)
	}
	
	static async onDefine() {
		await Promise.all([
			fetchI18nBundle("@ui5/webcomponents"),
		]);
	}
}

Slider.define();

export default Slider;
