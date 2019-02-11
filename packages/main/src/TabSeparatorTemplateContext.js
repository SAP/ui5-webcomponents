class TabSeparatorTemplateContext {
	static calculate(state) {
		const context = {
			ctr: state,
			isSeparator: true,
			classes: {
				main: {
					sapMITBItem: true,
					sapMITBSep: true,
					sapMITBSepLine: true,
				},
			},
		};


		return context;
	}
}

export default TabSeparatorTemplateContext;
