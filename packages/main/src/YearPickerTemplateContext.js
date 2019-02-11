class YearPickerTemplateContext {
	static calculate(state) {
		const context = {
			ctr: state,
			styles: {
				main: {
					display: state._hidden ? "none" : "",
				},
			},
			classes: {
				yearInterval: {
					sapWCYearPickerIntervalContainer: true,
				},
			},
		};

		return context;
	}
}

export default YearPickerTemplateContext;
