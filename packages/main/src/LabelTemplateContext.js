class LabelTemplateContext {
	static calculate(state) {
		const mainClasses = LabelTemplateContext.getMainClasses(state);

		return {
			ctr: state,
			classes: { main: mainClasses },
			styles: { main: {} },
		};
	}

	static getMainClasses(state) {
		return {
			sapMLabel: true,
			sapMLabelNoText: !state._nodeText,
			sapMLabelWrapped: state.wrap,
			sapMLabelRequired: state.required,
		};
	}

	static getInnerClasses() {}
}

export default LabelTemplateContext;
