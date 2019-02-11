class DatePickerTemplateContext {
	static calculate(state) {
		const context = {
			showIcon: !state.readonly,
			ctr: state,
			classes: {
				main: {
					sapMDP: true,
				},
				icon: {
					sapWCDPIcon: true,
					sapWCDPIconPressed: state._isPickerOpen,
				},
			},
			styles: {
				main: {
					width: "100%",
				},
			},
		};

		return context;
	}
}

export default DatePickerTemplateContext;
