import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import {
	isDown,
	isUp,
	isLeft,
	isRight,
	isSpace,
	isEnter,
	isHome,
	isEnd,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import Float from "@ui5/webcomponents-base/dist/types/Float.js";
import {
	RATING_INDICATOR_TEXT,
	RATING_INDICATOR_TOOLTIP_TEXT,
} from "./generated/i18n/i18n-defaults.js";
import RatingIndicatorTemplate from "./generated/templates/RatingIndicatorTemplate.lit.js";
import "@ui5/webcomponents-icons/dist/favorite.js";
import "@ui5/webcomponents-icons/dist/unfavorite.js";

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
		 * The indicated value of the rating.
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
		 * The number of displayed rating symbols.
		 * @type {Integer}
		 * @defaultvalue 5
		 * @public
		 * @since 1.0.0-rc.15
		 */
		max: {
			type: Integer,
			defaultValue: 5,
		},

		/**
		 * Defines whether the component is disabled.
		 *
		 * <br><br>
		 * <b>Note:</b> A disabled component is completely noninteractive.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines whether the component is read-only.
		 * <br><br>
		 * <b>Note:</b> A read-only component is not editable,
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
		 * Defines the accessible aria name of the component.
		 *
		 * @type {string}
		 * @defaultvalue: undefined
		 * @public
		 * @since 1.0.0-rc.15
		 */
		accessibleName: {
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
 * The Rating Indicator is used to display a specific number of icons that are used to rate an item.
 * Additionally, it is also used to display the average and overall ratings.
 *
 * <h3>Usage</h3>
 * The recommended number of icons is between 5 and 7.
 *
 * <h3>Responsive Behavior</h3>
 * You can change the size of the Rating Indicator by changing its <code>font-size</code> CSS property.
 * <br>
 * Example: <code>&lt;ui5-rating-indicator style="font-size: 3rem;">&lt;/ui5-rating-indicator></code>
 *
 * <h3>Keyboard Handling</h3>
 * When the <code>ui5-rating-indicator</code> is focused, the user can change the rating
 * with the following keyboard shortcuts:
 * <br>
 *
 * <ul>
 * <li>[RIGHT/UP] - Increases the value of the rating by one step. If the highest value is reached, does nothing</li>
 * <li>[LEFT/DOWN] - Decreases the value of the rating by one step. If the lowest value is reached, does nothing.</li>
 * <li>[HOME] - Sets the lowest value.</li>
 * <li>[END] - Sets the highest value.</li>
 * <li>[SPACE/ENTER/RETURN] - Increases the value of the rating by one step. If the highest value is reached, sets the rating to the lowest value.</li>
 * <li>Any number - Changes value to the corresponding number. If typed number is larger than the number of values, sets the highest value.</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/RatingIndicator.js";</code>
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
		RatingIndicator.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();

		this._liveValue = null; // stores the value to determine when to fire change
	}

	onBeforeRendering() {
		this.calcState();
	}

	calcState() {
		this._stars = [];

		for (let i = 1; i < this.max + 1; i++) {
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

		this.value = parseInt(event.target.getAttribute("data-ui5-value"));

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

		const isDecrease = isDown(event) || isLeft(event);
		const isIncrease = isRight(event) || isUp(event);
		const isIncreaseWithReset = isSpace(event) || isEnter(event);
		const isMin = isHome(event);
		const isMax = isEnd(event);
		const isNumber = (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105);

		if (isDecrease || isIncrease || isIncreaseWithReset || isMin || isMax || isNumber) {
			event.preventDefault();

			if (isDecrease && this.value > 0) {
				this.value = Math.round(this.value - 1);
			} else if (isIncrease && this.value < this.max) {
				this.value = Math.round(this.value + 1);
			} else if (isIncreaseWithReset) {
				const proposedValue = Math.round(this.value + 1);
				this.value = proposedValue > this.max ? 0 : proposedValue;
			} else if (isMin) {
				this.value = 0;
			} else if (isMax) {
				this.value = this.max;
			} else if (isNumber) {
				const pressedNumber = parseInt(event.key);
				this.value = pressedNumber > this.max ? this.max : pressedNumber;
			}

			this.fireEvent("change");
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
		return this.getAttribute("title") || this.defaultTooltip;
	}

	get defaultTooltip() {
		return RatingIndicator.i18nBundle.getText(RATING_INDICATOR_TOOLTIP_TEXT);
	}

	get _ariaRoleDescription() {
		return RatingIndicator.i18nBundle.getText(RATING_INDICATOR_TEXT);
	}

	get _ariaDisabled() {
		return this.disabled || undefined;
	}

	get ariaReadonly() {
		return this.readonly ? "true" : undefined;
	}
}

RatingIndicator.define();

export default RatingIndicator;
