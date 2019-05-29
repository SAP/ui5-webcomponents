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
			"ui5-busyindicator-wrapper": true,
			[`ui5-busyindicator-${state.size.toLowerCase()}`]: true,
		};
	}
}

export default BusyIndicatorTemplateContext;
