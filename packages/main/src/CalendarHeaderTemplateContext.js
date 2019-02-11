class CalendarHeaderTemplateContext {
	static calculate(state) {
		const context = {
			ctr: state,
			classes: {
				main: {
					sapWCCalHead: true,
				},
				buttons: {
					sapWCCalHeadArrowButton: true,
				},
				middleButtons: {
					sapWCCalHeadMiddleButton: true,
					sapWCCalHeadArrowButton: true,
				},
			},
			styles: {},
		};

		return context;
	}
}

export default CalendarHeaderTemplateContext;
