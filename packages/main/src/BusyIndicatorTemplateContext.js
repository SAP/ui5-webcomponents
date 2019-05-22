class BusyIndicatorTemplateContext {
	static calculate(state) {
		return {
			ctr: state,
			classes: {
				main: BusyIndicatorTemplateContext.calculateClasses(state),
			},
		};
	}

	static calculateClasses(state) {
		return {
			"ui5-busy-indicator-wrapper": true,
			[`ui5-busy-indicator-${state.size.toLowerCase()}`]: true,
		};
	}
}

export default BusyIndicatorTemplateContext;
