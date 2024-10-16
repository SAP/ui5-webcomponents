import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Icon from "./Icon.js";
import {
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
	VALUE_STATE_SUCCESS,
	VALUE_STATE_INFORMATION,
} from "./generated/i18n/i18n-defaults.js";

// Template
import ProgressIndicatorTemplate from "./generated/templates/ProgressIndicatorTemplate.lit.js";

// Styles
import ProgressIndicatorCss from "./generated/themes/ProgressIndicator.css.js";

/**
 * @class
 *
 * ### Overview
 * Shows the progress of a process in a graphical way. To indicate the progress,
 * the inside of the component is filled with a color.
 *
 * ### Responsive Behavior
 * You can change the size of the Progress Indicator by changing its `width` or `height` CSS properties.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/ProgressIndicator.js";`
 * @csspart bar - Used to style the main bar of the `ui5-progress-indicator`
 * @csspart remaining-bar - Used to style the remaining bar of the `ui5-progress-indicator`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.8
 */
@customElement({
	tag: "ui5-progress-indicator",
	renderer: litRender,
	styles: ProgressIndicatorCss,
	template: ProgressIndicatorTemplate,
	dependencies: [Icon],
})

class ProgressIndicator extends UI5Element {
	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 * @since 1.16.0
	*/
	@property()
	accessibleName?: string;

	/**
	 * Defines whether the component value is shown.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideValue = false;

	/**
	 * Specifies the numerical value in percent for the length of the component.
	 *
	 * **Note:**
	 * If a value greater than 100 is provided, the percentValue is set to 100. In other cases of invalid value, percentValue is set to its default of 0.
	 * @default 0
	 * @public
	 */
	@property({ type: Number })
	value = 0;

	/**
	 * Specifies the text value to be displayed in the bar.
	 *
	 * **Note:**
	 *
	 * - If there is no value provided or the value is empty, the default percentage value is shown.
	 * - If `hideValue` property is `true` both the `displayValue` and `value` property values are not shown.
	 * @default undefined
	 * @public
	 */
	@property()
	displayValue?: string;

	/**
	 * Defines the value state of the component.
	 * @default "None"
	 * @public
	 */
	@property()
	valueState: `${ValueState}` = "None";

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;
	_previousValue: number;
	_transitionDuration: number;

	constructor() {
		super();

		this._previousValue = 0;
		this._transitionDuration = 0;
	}

	onBeforeRendering() {
		this._transitionDuration = Math.abs(this._previousValue - this.validatedValue) * 20;
		this._previousValue = this.validatedValue;
	}

	valueStateTextMappings(): Record<string, string> {
		return {
			"Negative": ProgressIndicator.i18nBundle.getText(VALUE_STATE_ERROR),
			"Critical": ProgressIndicator.i18nBundle.getText(VALUE_STATE_WARNING),
			"Positive": ProgressIndicator.i18nBundle.getText(VALUE_STATE_SUCCESS),
			"Information": ProgressIndicator.i18nBundle.getText(VALUE_STATE_INFORMATION),
		};
	}

	valueStateIconMappings(): Record<string, string> {
		return {
			"Negative": "status-negative",
			"Critical": "status-critical",
			"Positive": "status-positive",
			"Information": "information",
		};
	}

	get styles() {
		return {
			bar: {
				"width": `${this.validatedValue}%`,
				"transition-duration": this.shouldAnimate ? `${this._transitionDuration}ms` : "none",
			},
		};
	}

	get classes() {
		return {
			root: {
				"ui5-progress-indicator-max-value": this.validatedValue === 100,
				"ui5-progress-indicator-min-value": this.validatedValue === 0,
			},
		};
	}

	get validatedValue() {
		if (this.value < 0) {
			return 0;
		}

		if (this.value > 100) {
			return 100;
		}

		return this.value;
	}

	get showValueInRemainingBar() {
		return this.value <= 50;
	}

	get shouldAnimate() {
		return getAnimationMode() !== AnimationMode.None;
	}

	get valueStateText() {
		const percentValue = `${this.validatedValue}%`;
		const valueText = this.valueStateTextMappings()[this.valueState];

		return valueText ? `${percentValue} ${valueText}` : percentValue;
	}

	get showIcon() {
		return this.valueState !== ValueState.None;
	}

	get valueStateIcon() {
		return this.valueStateIconMappings()[this.valueState];
	}
}

ProgressIndicator.define();

export default ProgressIndicator;
