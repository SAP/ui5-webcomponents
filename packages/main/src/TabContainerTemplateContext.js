class TabContainerTemplateContext {
	static calculate(state) {
		const context = {
			ctr: state,
			classes: {
				main: {
					sapMITB: true,
					sapMITBCollapsed: state.collapsed,
				},
				tablist: {
					sapMITH: true,
					sapContrastPlus: true,
					sapMITHOverflowList: state.showOverflow,
					sapMITBScrollable: state._scrollable,
					sapMITBNotScrollable: !state._scrollable,

					sapMITBScrollForward: state._scrollable && state._scrollForward,
					sapMITBNoScrollForward: state._scrollable && !state._scrollForward,

					sapMITBScrollBack: state._scrollable && state._scrollBack,
					sapMITBNoScrollBack: state._scrollable && !state._scrollBack,
				},
				head: {
					sapMITBHead: true,
					sapMITBTextOnly: state._isNoIcon,
					sapMITBNoText: state._isNoText,
					sapMITBInLine: state._isInline,
				},
				content: {
					sapMITBContainerContent: true,
					sapMITBContentClosed: state.collapsed,
				},
			},
		};

		context.classes.tablist[`sapMITHBackgroundDesign${state.headerBackgroundDesign}`] = true;
		context.classes.main[`sapMITBBackgroundDesign${state.backgroundDesign}`] = true;

		return context;
	}
}

export default TabContainerTemplateContext;
