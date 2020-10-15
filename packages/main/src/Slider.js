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
 *
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

		this.addEventListener("mouseover", this._mouseOverHandler);
		this.addEventListener("mouseout", this._mouseOutHandler);
	}

	onBeforeRendering() {
		// Update initial Slider UI representation and normalize internal state
		// Normalize Slider value according to min/max properties
		// Normalize the step value and draw tickmarks/labels if specified
		if (this.step !== this._prevStepValue) {
			this._setStep(this.step);
			this._prevStepValue = this.step;
		}

		if (this.value !== this._prevValue) {
			this.value = SliderBase._clipValue(this.value, this.min, this.max);
			this._updateUI(this.value);
			this._prevValue = this.value;
		}
	}

	get styles() {
		return {
			progress: {
				"transform": `scaleX(${this._percentageComplete})`
			},
			handlePosition: {
				"left": `${this._handlePositionFromLeft}%`
			},
			tickmarks: {
				"background": `${this._tickmarksBackground}`
			},
			label: {
				"width": `${this._labelWidth}%`
			},
			labelContainer: {
				"width": `100%`,
				"left": `-${this._labelWidth / 2}%`
			},
			tooltipVisibility: {
				"visibility": `${this._tooltipVisibility}`
			}
		}
	}

	get labelItems() {
		return this._labelItems;
	}

	/**
	 * Called when the user starts interacting with the slider
	 *
	 * @private
	 */
	_handleDown(event) {
		if (this.disabled) {
			return;
		}

		const newValue = this._handleDownBase(event, this.min, this.max);

		// Update Slider UI and internal state
		this._updateUI(newValue);
		this._updateValue("value", newValue);
	}

	/**
	 * Called when the user moves the slider
	 *
	 * @private
	 */
	_handleMove(event) {
		event.preventDefault();

		if (this.disabled) {
			return;
		}

		this._handleMoveBase(event, "value", this.min, this.max);
	}

	_updateUI(newValue) {
		const max = this.max;
		const min = this.min;

		// The progress (completed) percentage of the slider.
		this._percentageComplete = (newValue - min) / (max - min);
		// How many pixels from the left end of the slider will be the placed the affected  by the user action handle
		this._handlePositionFromLeft = this._percentageComplete * 100;
	}

	static async onDefine() {
		await Promise.all([
			fetchI18nBundle("@ui5/webcomponents"),
		]);
	}
}

Slider.define();

export default Slider;
