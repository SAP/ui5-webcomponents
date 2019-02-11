class DayPickerTemplateContext {
	static calculate(state) {
		const context = {
			ctr: state,
			classes: {
				wrapper: {
					"sapWCDayPicker": true,
				},
				weekNumberContainer: {
					"sapWCDayPickerWeekNumberContainer": true,
					"sapWCDayPickerHideWeekNumbers": state.primaryCalendarType === "Islamic",
				},
				weekDaysContainer: {
					"sapWCDayPickerDaysNamesContainer": true,
				},
				content: {
					"sapWCDayPickerContent": true,
				},
			},
			styles: {
				wrapper: {
					display: state._hidden ? "none" : "flex",
				},
				main: {
					width: "100%",
				},
			},
		};

		return context;
	}
}

export default DayPickerTemplateContext;
