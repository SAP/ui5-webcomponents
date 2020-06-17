import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import {
	isDown,
	isUp,
	isLeft,
	isRight,
	isSpace,
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import Float from "@ui5/webcomponents-base/dist/types/Float.js";
import {
	RATING_INDICATOR_TEXT,
	RATING_INDICATOR_TOOLTIP_TEXT,
} from "./generated/i18n/i18n-defaults.js";
import RatingIndicatorTemplate from "./generated/templates/RatingIndicatorTemplate.lit.js";

// Styles
import RatingIndicatorCss from "./generated/themes/RatingIndicator.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-rating-indicator",
	languageAware: true,
	properties: /** @lends sap.ui.webcomponents.main.RatingIndicator.prototype */ {

		/**
		 * The indicated value of the rating
		 * <br><br>
		 * <b>Note:</b> If you set a number which is not round, it would be shown as follows:
		 * <ul>
		 * <li>1.0 - 1.2 -> 1</li>
		 * <li>1.3 - 1.7 -> 1.5</li>
		 * <li>1.8 - 1.9 -> 2</li>
		 * <ul>
		 * @type {Float}
		 * @defaultvalue 0
		 * @public
		 */
		value: {
			type: Float,
			defaultValue: 0,
		},

		/**
		 * The number of displayed rating symbols
		 * @type {Integer}
		 * @defaultvalue 5
		 * @public
		 */
		maxValue: {
			type: Integer,
			defaultValue: 5,
		},

		/**
		 * Defines whether the <code>ui5-rating-indicator</code> is disabled.
		 *
		 * <br><br>
		 * <b>Note:</b> A disabled <code>ui5-rating-indicator</code> is completely noninteractive.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines whether the <code>ui5-rating-indicator</code> is read-only.
		 * <br><br>
		 * <b>Note:</b> A read-only <code>ui5-rating-indicator</code> is not editable,
		 * but still provides visual feedback upon user interaction.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		readonly: {
			type: Boolean,
		},

		/**
		 * Defines the aria-label attribute for the rating indicator.
		 * @type {String}
		 * @defaultvalue: undefined
		 * @private
		 * @since 1.0.0-rc.8
		 */
		ariaLabel: {
			type: String,
			defaultValue: undefined,
		},

		/**
		 * Defines the tooltip for the rating indicator.
		 * @type {String}
		 * @defaultvalue: undefined
		 * @private
		 * @since 1.0.0-rc.8
		 */
		title: {
			type: String,
			defaultValue: undefined,
		},

		/**
		 * @private
		 */
		_stars: {
			type: Object,
			multiple: true,
		},

		/**
		 * @private
		 */
		_focused: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.RatingIndicator.prototype */ {
		//
	},
	events: /** @lends sap.ui.webcomponents.main.RatingIndicator.prototype */ {

		/**
		 * The event is fired when the value changes.
		 *
		 * @event
		 * @public
		 */
		change: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The rating indicator is used to display a specific number of icons that are used to rate an item.
 * Additionally, it is also used to display the average and overall ratings.
 *
 * <h3>Usage</h3>
 * The reccomended number of icons is between 5 and 7.
 *
 * <h3>Responsive Behavior</h3>
 * You can change the size of the Rating Indicator by changing its <code>font-size</code> CSS property.
 * <br>
 * Example: <code>&lt;ui5-rating-indicator style="font-size: 3rem;">&lt;/ui5-rating-indicator></code>
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-rating-indicator</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/RatingIndicator.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.RatingIndicator
 * @extends UI5Element
 * @tagname ui5-rating-indicator
 * @public
 * @since 1.0.0-rc.8
 */
class RatingIndicator extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return RatingIndicatorCss;
	}

	static get template() {
		return RatingIndicatorTemplate;
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();

		this._liveValue = null; // stores the value to determine when to fire change
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	onBeforeRendering() {
		this.calcState();
	}

	calcState() {
		this._stars = [];

		for (let i = 1; i < this.maxValue + 1; i++) {
			const remainder = Math.round((this.value - Math.floor(this.value)) * 10);
			let halfStar = false,
				tempValue = this.value;

			if (Math.floor(this.value) + 1 === i && remainder > 2 && remainder < 8) {
				halfStar = true;
			} else if (remainder <= 2) {
				tempValue = Math.floor(this.value);
			} else if (remainder >= 8) {
				tempValue = Math.ceil(this.value);
			}

			this._stars.push({
				selected: i <= tempValue,
				index: i,
				halfStar,
			});
		}
	}

	_onclick(event) {
		if (this.disabled || this.readonly) {
			return;
		}

		this.value = parseInt(event.target.getAttribute("data-value"));

		if (this.value === 1 && this._liveValue === 1) {
			this.value = 0;
		}

		if (this._liveValue !== this.value) {
			this.fireEvent("change");
			this._liveValue = this.value;
		}
	}

	_onkeydown(event) {
		if (this.disabled || this.readonly) {
			return;
		}

		const down = isDown(event) || isLeft(event);
		const up = isRight(event) || isUp(event) || isSpace(event) || isEnter(event);

		if (down || up) {
			event.preventDefault();

			if (down && this.value > 0) {
				this.value = Math.round(this.value - 1);
				this.fireEvent("change");
			} else if (up && this.value < this.maxValue) {
				this.value = Math.round(this.value + 1);
				this.fireEvent("change");
			}
		}
	}

	_onfocusin() {
		if (this.disabled) {
			return;
		}

		this._focused = true;
		this._liveValue = this.value;
	}

	_onfocusout() {
		this._focused = false;
	}

	get tabIndex() {
		return this.disabled ? "-1" : "0";
	}

	get tooltip() {
		return this.title || this.defaultTooltip;
	}

	get defaultTooltip() {
		return this.i18nBundle.getText(RATING_INDICATOR_TOOLTIP_TEXT);
	}

	get _ariaRoleDescription() {
		return this.i18nBundle.getText(RATING_INDICATOR_TEXT);
	}
}

RatingIndicator.define();

export default RatingIndicator;
