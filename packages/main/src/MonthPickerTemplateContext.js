class MonthPickerTemplateContext {
	static calculate(state) {
		const context = {
			ctr: state,
			styles: {
				main: {
					display: state._hidden ? "none" : "",
				},
			},
			classes: {
				quarter: {
					"sapWCMonthPickerQuarter": true,
				},
			},
		};

		return context;
	}
}

export default MonthPickerTemplateContext;
