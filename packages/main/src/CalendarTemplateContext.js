import CalendarType from "@ui5/webcomponents-base/src/dates/CalendarType.js";

class CalendarTemplateContext {
	static calculate(state) {
		const context = {
			ctr: state,
			classes: {
				main: {
					sapUiCal: true,
					sapUiCalIslamic: state.primaryCalendarType === CalendarType.Islamic,
				},
				dayPicker: {
					"sapWCDayPickerHidden": !state._yearPicker._hidden || !state._monthPicker._hidden,
				},
				yearPicker: {
					"sapWCYearPickerHidden": state._yearPicker._hidden,
				},
				monthPicker: {
					"sapWCMonthPickerHidden": state._monthPicker._hidden,
				},
			},
			styles: {
				main: {
					"height": `${state._calendarHeight ? `${state._calendarHeight}px` : "auto"}`,
					"width": `${state._calendarWidth ? `${state._calendarWidth}px` : "auto"}`,
				},
			},
		};

		return context;
	}
}

export default CalendarTemplateContext;
