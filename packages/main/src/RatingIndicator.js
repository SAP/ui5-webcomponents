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
import {
	RATING_INDICATOR_TEXT,
} from "./generated/i18n/i18n-defaults.js";
import Size from "./types/Size.js";
import RatingIndicatorTemplate from "./generated/templates/RatingIndicatorTemplate.lit.js";

// Styles
import RatingIndicatorCss from "./generated/themes/RatingIndicator.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-rating-indicator",
	properties: /** @lends sap.ui.webcomponents.main.RatingIndicator.prototype */ {

		/**
		 * The indicated value of the rating
		 * @type {Integer}
		 * @defaultvalue 0
		 * @public
		 */
		value: {
			type: Integer,
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
		 * Defines the size of the <code>ui5-rating-indicator</code>.
		 * <br><br>
		 * <b>Note:</b> Available options are "Small", "Medium", and "Large".
		 *
		 * @type {Size}
		 * @defaultvalue "Medium"
		 * @public
		 */
		size: {
			type: Size,
			defaultValue: Size.Medium,
		},

		/**
		 * Defines whether the <code>ui5-rating-indicator</code> is disabled.
		 */
		/**
		 * @type {Boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * @type {Boolean}
		 * @defaultvalue falase
		 * @public
		 */
		readOnly: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		_stars: {
			type: Integer,
			multiple: true,
		},

		_focused: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.RatingIndicator.prototype */ {
		//
	},
	events: /** @lends sap.ui.webcomponents.main.RatingIndicator.prototype */ {

		/**
		 * This event is triggered each time the rating value changes.
		 *
		 * @event
		 * @public
		 */
		input: {},

		/**
		 * The event is fired on focuseout if the value has changed.
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
 *
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
		await Promise.all([
			fetchI18nBundle("@ui5/webcomponents"),
		]);
	}

	constructor() {
		super();
		this._prevValue = undefined;

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	onBeforeRendering() {
		this._stars = [];

		for (let i = 1; i < this.maxValue + 1; i++) {
			this._stars.push({
				selected: i <= this.value,
				index: i,
			});
		}
	}

	_onclick(event) {
		if (this.disabled || this.readOnly) {
			return;
		}

		this.value = parseInt(event.target.getAttribute("data-value"));
		if (this.value === 1 && this._prevValue === 1) {
			this.value = 0;
		}

		if (this._prevValue !== this.value) {
			this.fireEvent("input");
		}
	}

	_onkeydown(event) {
		if (this.disabled || this.readOnly) {
			return;
		}

		const down = isDown(event) || isLeft(event);
		const up = isRight(event) || isUp(event) || isSpace(event) || isEnter(event);

		if (down || up) {
			event.preventDefault();

			if (down && this.value > 0) {
				--this.value;
				this.fireEvent("input");
			} else if (up && this.value < this.maxValue) {
				++this.value;
				this.fireEvent("input");
			}
		}
	}

	_onfocusin(event) {
		if (!(this.disabled)) {
			this._focused = true;
			this._prevValue = this.value;
		}
	}

	_onfocusout(event) {
		if (this._focused && !this.disabled && !this.readOnly && this._prevValue !== this.value) {
			this.fireEvent("change");
		}

		this._focused = false;
	}

	get tabIndex() {
		return this.disabled ? "-1" : "0";
	}

	get _ariaRoleDescription() {
		return this.i18nBundle.getText(RATING_INDICATOR_TEXT);
	}
}

RatingIndicator.define();

export default RatingIndicator;
