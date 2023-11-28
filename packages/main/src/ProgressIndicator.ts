import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
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
 * <h3 class="comment-api-title">Overview</h3>
 * Shows the progress of a process in a graphical way. To indicate the progress,
 * the inside of the component is filled with a color.
 *
 * <h3>Responsive Behavior</h3>
 * You can change the size of the Progress Indicator by changing its <code>width</code> or <code>height</code> CSS properties.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/ProgressIndicator.js";</code>
 *
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
	 *
	 * @default ""
	 * @public
	 * @since 1.16.0
	*/
	@property()
	accessibleName!: string;

	/**
	 * Defines whether component is in disabled state.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines whether the component value is shown.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideValue!: boolean;

	/**
	 * Specifies the numerical value in percent for the length of the component.
	 *
	 * <b>Note:</b>
	 * If a value greater than 100 is provided, the percentValue is set to 100. In other cases of invalid value, percentValue is set to its default of 0.
	 * @default 0
	 * @public
	 */
	@property({ validator: Integer, defaultValue: 0 })
	value!: number;

	/**
	 * Specifies the text value to be displayed in the bar.
	 *
	 * <b>Note:</b>
	 * <ul>
	 * <li>If there is no value provided or the value is empty, the default percentage value is shown.</li>
	 * <li>If <code>hideValue</code> property is <code>true</code> both the <code>displayValue</code> and <code>value</code> property values are not shown.</li>
	 * </ul>
	 *
	 * @default null
	 * @public
	 */
	@property({ defaultValue: null })
	displayValue!: string;

	/**
	 * Defines the value state of the component.
	 *
	 * @default "None"
	 * @public
	 */
	@property({ type: ValueState, defaultValue: ValueState.None })
	valueState!: `${ValueState}`;

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
			"Error": ProgressIndicator.i18nBundle.getText(VALUE_STATE_ERROR),
			"Warning": ProgressIndicator.i18nBundle.getText(VALUE_STATE_WARNING),
			"Success": ProgressIndicator.i18nBundle.getText(VALUE_STATE_SUCCESS),
			"Information": ProgressIndicator.i18nBundle.getText(VALUE_STATE_INFORMATION),
		};
	}

	valueStateIconMappings(): Record<string, string> {
		return {
			"Error": "status-negative",
			"Warning": "status-critical",
			"Success": "status-positive",
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

	get _ariaDisabled() {
		return this.disabled || undefined;
	}

	static async onDefine() {
		ProgressIndicator.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

ProgressIndicator.define();

export default ProgressIndicator;
