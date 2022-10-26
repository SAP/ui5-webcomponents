import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Icon from "./Icon.js";
import ProgressIndicatorTemplate from "./generated/templates/ProgressIndicatorTemplate.lit.js";
import {
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
	VALUE_STATE_SUCCESS,
	VALUE_STATE_INFORMATION,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import ProgressIndicatorCss from "./generated/themes/ProgressIndicator.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-progress-indicator",
	properties: /** @lends sap.ui.webcomponents.main.ProgressIndicator.prototype */ {
		/**
		 * Defines whether component is in disabled state.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},
		/**
		 * Defines whether the component value is shown.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		hideValue: {
			type: Boolean,
		},
		/**
		 * Specifies the numerical value in percent for the length of the component.
		 *
		 * <b>Note:</b>
		 * If a value greater than 100 is provided, the percentValue is set to 100. In other cases of invalid value, percentValue is set to its default of 0.
		 * @type {sap.ui.webcomponents.base.types.Integer}
		 * @defaultvalue 0
		 * @public
		 */
		value: {
			type: Integer,
			defaultValue: 0,
		},
		/**
		 * Specifies the text value to be displayed in the bar.
		 *
		 * <b>Note:</b>
		 * <ul>
		 * <li>If there is no value provided or the value is empty, the default percentage value is shown.</li>
		 * <li>If <code>hideValue</code> property is <code>true</code> both the <code>displayValue</code> and <code>value</code> property values are not shown.</li>
		 * </ul>
		 *
		 * @type {string}
		 * @public
		 */
		displayValue: {
			type: String,
		},
		/**
		 * Defines the value state of the component.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>None</code></li>
		 * <li><code>Error</code></li>
		 * <li><code>Warning</code></li>
		 * <li><code>Success</code></li>
		 * <li><code>Information</code></li>
		 * </ul>
		 *
		 * @type {sap.ui.webcomponents.base.types.ValueState}
		 * @defaultvalue "None"
		 * @public
		 */
		valueState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.ProgressIndicator.prototype */ {
		//
	},
	events: /** @lends sap.ui.webcomponents.main.ProgressIndicator.prototype */ {
		//
	},
};

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
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ProgressIndicator
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-progress-indicator
 * @public
 * @since 1.0.0-rc.8
 */
class ProgressIndicator extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return ProgressIndicatorCss;
	}

	static get template() {
		return ProgressIndicatorTemplate;
	}

	static get dependencies() {
		return [Icon];
	}

	constructor() {
		super();

		this._previousValue = 0;
		this._transitionDuration = 0;
	}

	onBeforeRendering() {
		this._transitionDuration = Math.abs(this._previousValue - this.validatedValue) * 20;
		this._previousValue = this.validatedValue;
	}

	valueStateTextMappings() {
		return {
			"Error": ProgressIndicator.i18nBundle.getText(VALUE_STATE_ERROR),
			"Warning": ProgressIndicator.i18nBundle.getText(VALUE_STATE_WARNING),
			"Success": ProgressIndicator.i18nBundle.getText(VALUE_STATE_SUCCESS),
			"Information": ProgressIndicator.i18nBundle.getText(VALUE_STATE_INFORMATION),
		};
	}

	valueStateIconMappings() {
		return {
			"Error": "status-negative",
			"Warning": "status-critical",
			"Success": "status-positive",
			"Information": "hint",
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
