import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

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
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import Float from "@ui5/webcomponents-base/dist/types/Float.js";
import {
	RATING_INDICATOR_TEXT,
	RATING_INDICATOR_TOOLTIP_TEXT,
} from "./generated/i18n/i18n-defaults.js";
import RatingIndicatorTemplate from "./generated/templates/RatingIndicatorTemplate.lit.js";
import Icon from "./Icon.js";
import "@ui5/webcomponents-icons/dist/favorite.js";
import "@ui5/webcomponents-icons/dist/unfavorite.js";

// Styles
import RatingIndicatorCss from "./generated/themes/RatingIndicator.css.js";

type Star = {
	selected: boolean,
	index: number,
	halfStar: boolean
}

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
 * @alias sap.ui.webc.main.RatingIndicator
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-rating-indicator
 * @public
 * @since 1.0.0-rc.8
 */

@customElement({
	tag: "ui5-rating-indicator",
	languageAware: true,
	renderer: litRender,
	styles: RatingIndicatorCss,
	template: RatingIndicatorTemplate,
	dependencies: [Icon],
})
/**
 * The event is fired when the value changes.
 *
 * @event sap.ui.webc.main.RatingIndicator#change
 * @public
 */
@event("change")

class RatingIndicator extends UI5Element {
	/**
	 * The indicated value of the rating.
	 * <br><br>
	 * <b>Note:</b> If you set a number which is not round, it would be shown as follows:
	 * <ul>
	 * <li>1.0 - 1.2 -> 1</li>
	 * <li>1.3 - 1.7 -> 1.5</li>
	 * <li>1.8 - 1.9 -> 2</li>
	 * <ul>
	 * @type {sap.ui.webc.base.types.Float}
	 * @name sap.ui.webc.main.RatingIndicator.prototype.value
	 * @defaultvalue 0
	 * @public
	 */
	@property({ validator: Float, defaultValue: 0 })
	value!: number;

	/**
	 * The number of displayed rating symbols.
	 * @type {sap.ui.webc.base.types.Integer}
	 * @name sap.ui.webc.main.RatingIndicator.prototype.max
	 * @defaultvalue 5
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property({ validator: Integer, defaultValue: 5 })
	max!: number;

	/**
	 * Defines whether the component is disabled.
	 *
	 * <br><br>
	 * <b>Note:</b> A disabled component is completely noninteractive.
	 * @type {boolean}
	 * @name sap.ui.webc.main.RatingIndicator.prototype.disabled
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines whether the component is read-only.
	 * <br><br>
	 * <b>Note:</b> A read-only component is not editable,
	 * but still provides visual feedback upon user interaction.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.RatingIndicator.prototype.readonly
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	readonly!: boolean;

	/**
	 * Defines the accessible ARIA name of the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.RatingIndicator.prototype.accessibleName
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleName!: string;

	/**
	 * @private
	 */
	@property({ type: Object, multiple: true })
	_stars!: Array<Star>;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_focused!: boolean;

	_liveValue?: number;

	static i18nBundle: I18nBundle;

	static async onDefine() {
		RatingIndicator.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();
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

	_onclick(e: MouseEvent) {
		const target = e.target as UI5Element;

		if (!(target instanceof HTMLElement) || this.disabled || this.readonly) {
			return;
		}

		const targetValue = target.getAttribute("data-ui5-value");

		if (targetValue !== null) {
			this.value = parseInt(targetValue);

			if (this.value === 1 && this._liveValue === 1) {
				this.value = 0;
			}

			if (this._liveValue !== this.value) {
				this.fireEvent("change");
				this._liveValue = this.value;
			}
		}
	}

	_onkeydown(e: KeyboardEvent) {
		if (this.disabled || this.readonly) {
			return;
		}

		const isDecrease = isDown(e) || isLeft(e);
		const isIncrease = isRight(e) || isUp(e);
		const isIncreaseWithReset = isSpace(e) || isEnter(e);
		const isMin = isHome(e);
		const isMax = isEnd(e);
		const isNumber = (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105);

		if (isDecrease || isIncrease || isIncreaseWithReset || isMin || isMax || isNumber) {
			e.preventDefault();

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
				const pressedNumber = parseInt(e.key);
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

	get effectiveTabIndex() {
		const tabindex = this.getAttribute("tabindex");
		return this.disabled ? "-1" : tabindex || "0";
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
