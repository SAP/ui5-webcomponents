import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import Icon from "./Icon.js";
import CalendarHeaderTemplate from "./generated/templates/CalendarHeaderTemplate.lit.js";
import {
	CALENDAR_HEADER_NEXT_BUTTON,
	CALENDAR_HEADER_PREVIOUS_BUTTON,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import calendarHeaderStyles from "./generated/themes/CalendarHeader.css.js";

type SecondaryCalendarButtonTexts = {
	monthButtonText: string,
	monthButtonInfo: string,
	yearButtonText: string,
}

@customElement({
	tag: "ui5-calendar-header",
	languageAware: true,
	renderer: litRender,
	template: CalendarHeaderTemplate,
	styles: calendarHeaderStyles,
	dependencies: [Icon],
})
@event("next-press")
@event("previous-press")
@event("show-month-view")
@event("show-year-view")
class CalendarHeader extends UI5Element {
	/**
	 * Defines component's timestamp.
	 *
	 * **Note:** set by the Calendar component
	 * @public
	 * @default undefined
	 */
	@property({ validator: Integer })
	timestamp?: number;

	/**
	 * Defines component's primary calendar type.
	 *
	 * **Note:** set by the Calendar component
	 * @public
	 * @default undefined
	 */
	@property({ type: CalendarType })
	primaryCalendarType?: `${CalendarType}`;

	/**
	 * Defines component's secondary calendar type.
	 *
	 * **Note:** set by the Calendar component
	 * @since 1.0.0-rc.16
	 * @default undefined
	 * @public
	 */
	@property({ type: CalendarType })
	secondaryCalendarType?: `${CalendarType}`;

	/**
	 * Stores information for month button for secondary calendar type
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

	static async onDefine() {
		CalendarHeader.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();
	}

	onBeforeRendering() {
		this._prevButtonText = CalendarHeader.i18nBundle.getText(CALENDAR_HEADER_PREVIOUS_BUTTON);
		this._nextButtonText = CalendarHeader.i18nBundle.getText(CALENDAR_HEADER_NEXT_BUTTON);

		if (this.hasSecondaryCalendarType) {
			this._secondMonthButtonText = this.buttonTextForSecondaryCalendarType.monthButtonText;
			this._secondYearButtonText = this.buttonTextForSecondaryCalendarType.yearButtonText;
		}
	}

	onPrevButtonClick(e: MouseEvent) {
		if (this.isPrevButtonDisabled) {
			e.preventDefault();
			return;
		}

		this.fireEvent("previous-press", e);
		e.preventDefault();
	}

	onNextButtonClick(e: MouseEvent) {
		if (this.isNextButtonDisabled) {
			e.preventDefault();
			return;
		}

		this.fireEvent("next-press", e);
		e.preventDefault();
	}

	onMonthButtonClick(e: MouseEvent) {
		this.fireEvent("show-month-view", e);
	}

	onMonthButtonKeyDown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
		}

		if (isEnter(e)) {
			this.fireEvent("show-month-view", e);
		}
	}

	onMonthButtonKeyUp(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
			this.fireEvent("show-month-view", e);
		}
	}

	onYearButtonClick(e: MouseEvent) {
		this.fireEvent("show-year-view", e);
	}

	onYearButtonKeyDown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
		}

		if (isEnter(e)) {
			this.fireEvent("show-year-view", e);
		}
	}

	onYearButtonKeyUp(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
			this.fireEvent("show-year-view", e);
		}
	}

	get hasSecondaryCalendarType() {
		return !!this.secondaryCalendarType && this.secondaryCalendarType !== this.primaryCalendarType;
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