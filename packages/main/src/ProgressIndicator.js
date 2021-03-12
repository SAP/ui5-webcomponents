import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
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
		 * Defines whether <code>ui5-progress-indicator</code> is in disabled state.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},
		/**
		 * Defines whether <code>ui5-progress-indicator</code> value is shown.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		hideValue: {
			type: Boolean,
		},
		/**
		 * Specifies the numerical value in percent for the length of the <code>ui5-progress-indicator</code>.
		 *
		 * <b>Note:</b>
		 * If a value greater than 100 is provided, the percentValue is set to 100. In other cases of invalid value, percentValue is set to its default of 0.
		 * @type {Integer}
		 * @defaultvalue 0
		 * @public
		 */
		value: {
			type: Integer,
			defaultValue: 0,
		},
		/**
		 * Defines the value state of the <code>ui5-progress-indicator</code>.
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
		 * @type {ValueState}
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
 * the inside of the <code>ui5-progress-indicator</code> is filled with a color.
 *
 * <h3>Responsive Behavior</h3>
 * You can change the size of the Rating Indicator by changing its <code>width</code> or <code>height</code> CSS properties.
 * <br>
 * Example: <code>&lt;ui5-progress-indicator style="height: 2rem; width: 6rem;">&lt;/ui5-progress-indicator></code>
 *
 * For the <code>ui5-progress-indicator</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/ProgressIndicator.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ProgressIndicator
 * @extends UI5Element
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

	constructor() {
		super();

		this._previousValue = 0;
		this._transitionDuration = 0;

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	onBeforeRendering() {
		this._transitionDuration = Math.abs(this._previousValue - this.validatedValue) * 20;
		this._previousValue = this.validatedValue;
	}

	valueStateTextMappings() {
		const i18nBundle = this.i18nBundle;

		return {
			"Error": i18nBundle.getText(VALUE_STATE_ERROR),
			"Warning": i18nBundle.getText(VALUE_STATE_WARNING),
			"Success": i18nBundle.getText(VALUE_STATE_SUCCESS),
			"Information": i18nBundle.getText(VALUE_STATE_INFORMATION),
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
		await fetchI18nBundle("@ui5/webcomponents");
	}
}

ProgressIndicator.define();

export default ProgressIndicator;
