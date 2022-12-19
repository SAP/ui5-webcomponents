import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import languageAware from "@ui5/webcomponents-base/dist/decorators/languageAware.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import Icon from "./Icon.js";
import CalendarHeaderTemplate from "./generated/templates/CalendarHeaderTemplate.lit.js";
import {
	CALENDAR_HEADER_NEXT_BUTTON,
	CALENDAR_HEADER_PREVIOUS_BUTTON,
// @ts-ignore
} from "./generated/i18n/i18n-defaults.js";

// Styles
import styles from "./generated/themes/CalendarHeader.css.js";

type SecondaryCalendarButtonTexts = {
	monthButtonText: string,
	monthButtonInfo: string,
	yearButtonText: string,
}

@customElement("ui5-calendar-header")
@languageAware
@event("next-press")
@event("previous-press")
@event("show-month-press")
@event("show-year-press")
class CalendarHeader extends UI5Element {
	/**
	 * Defines component's timestamp.
	 * <b>Note:</b> set by the Calendar component
	 * @type {sap.ui.webc.base.types.Integer}
	 * @name sap.ui.webc.main.CalendarHeader.prototype.timestamp
	 * @public
	 */
	@property({ validator: Integer })
	timestamp?: number;

	/**
	 * Defines component's primary calendar type.
	 * <b>Note:</b> set by the Calendar component
	 * @type {sap.ui.webc.base.types.CalendarType}
	 * @name sap.ui.webc.main.CalendarHeader.prototype.primaryCalendarType
	 * @public
	 */
	@property({ type: CalendarType })
	primaryCalendarType?: CalendarType;

	/**
	 * Defines component's secondary calendar type.
	 * <b>Note:</b> set by the Calendar component
	 * @sience 1.0.0-rc.16
	 * @defaultvalue undefined
	 * @type {sap.ui.webc.base.types.CalendarType}
	 * @name sap.ui.webc.main.CalendarHeader.prototype.secondaryCalendarType
	 * @public
	 */
	@property({ type: CalendarType })
	secondaryCalendarType?: CalendarType;

	/**
	 * Stores information for month button for secondary calendar type
	 * @type {object}
	 * @private
	*/
	@property({ type: Object })
	buttonTextForSecondaryCalendarType!: SecondaryCalendarButtonTexts;

	@property({ type: Boolean })
	isNextButtonDisabled!: boolean;

	@property({ type: Boolean })
	isPrevButtonDisabled!: boolean;

	@property({ type: Boolean })
	isMonthButtonHidden!: boolean;

	@property()
	_monthButtonText!: string;

	@property()
	_yearButtonText!: string;

	@property()
	_yearButtonTextSecType!: string;

	@property({ type: Boolean })
	isYearButtonHidden!: boolean;

	_prevButtonText?: string;
	_nextButtonText?: string;
	_secondMonthButtonText?: string;
	_secondYearButtonText?: string;

	static i18nBundle: I18nBundle;

	static get render() {
		return litRender;
	}

	static get template() {
		return CalendarHeaderTemplate;
	}

	static get styles() {
		return styles;
	}

	static get dependencies() {
		return [Icon];
	}

	static async onDefine() {
		CalendarHeader.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();
	}

	onBeforeRendering() {
		this._prevButtonText = CalendarHeader.i18nBundle.getText(CALENDAR_HEADER_PREVIOUS_BUTTON as I18nText);
		this._nextButtonText = CalendarHeader.i18nBundle.getText(CALENDAR_HEADER_NEXT_BUTTON as I18nText);

		if (this.hasSecondaryCalendarType) {
			this._secondMonthButtonText = this.buttonTextForSecondaryCalendarType.monthButtonText;
			this._secondYearButtonText = this.buttonTextForSecondaryCalendarType.yearButtonText;
		}
	}

	onPrevButtonClick(e: MouseEvent) {
		this.fireEvent("previous-press", e);
	}

	onNextButtonClick(e: MouseEvent) {
		this.fireEvent("next-press", e);
	}

	onMonthButtonClick(e: MouseEvent) {
		this.fireEvent("show-month-press", e);
	}

	onMonthButtonKeyDown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
		}

		if (isEnter(e)) {
			this.fireEvent("show-month-press", e);
		}
	}

	onMonthButtonKeyUp(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
			this.fireEvent("show-month-press", e);
		}
	}

	onYearButtonClick(e: MouseEvent) {
		this.fireEvent("show-year-press", e);
	}

	onYearButtonKeyDown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
		}

		if (isEnter(e)) {
			this.fireEvent("show-year-press", e);
		}
	}

	onYearButtonKeyUp(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
			this.fireEvent("show-year-press", e);
		}
	}

	get hasSecondaryCalendarType() {
		return !!this.secondaryCalendarType;
	}

	get classes() {
		return {
			prevButton: {
				"ui5-calheader-arrowbtn": true,
				"ui5-calheader-arrowbtn-disabled": this.isPrevButtonDisabled,
			},
			nextButton: {
				"ui5-calheader-arrowbtn": true,
				"ui5-calheader-arrowbtn-disabled": this.isNextButtonDisabled,
			},
		};
	}

	get accInfo() {
		return {
			ariaLabelMonthButton: this.hasSecondaryCalendarType
				? `${this._monthButtonText}, ${this.buttonTextForSecondaryCalendarType.monthButtonInfo}` : `${this._monthButtonText}`,
		};
	}
}

CalendarHeader.define();

export default CalendarHeader;
