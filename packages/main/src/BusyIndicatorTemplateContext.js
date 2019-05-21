class BusyIndicatorTemplateContext {
	static calculate(state) {
		return {
			ctr: state,
			tabindex: state._customAttributes.tabindex,
			classes: {
				main: BusyIndicatorTemplateContext.calculateClasses(state),
				circle: BusyIndicatorTemplateContext.calculateCircleClasses(state),
			},
		};
	}

	static calculateClasses(state) {
		return {
			"ui5-busy-indicator-wrapper": true,
			[`ui5-busy-indicator-${state.size.toLowerCase()}`]: true,
		};
	}

	static calculateCircleClasses(state) {
		return {
			"ui5-busy-indicator-circle": true,
		};
	}
}

export default BusyIndicatorTemplateContext;
