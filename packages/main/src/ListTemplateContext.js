import { isDesktop } from "@ui5/webcomponents-core/dist/sap/ui/Device.js";

class ListTemplateContext {
	static calculate(state) {
		const context = {
			ctr: state,
			classes: {
				main: ListTemplateContext.getMainClasses(state),
				ul: ListTemplateContext.getULClasses(state),
				noData: ListTemplateContext.getNoDataClasses(state),
			},
			styles: {
				main: {

				},
			},
			shouldRenderH1: !state.header && state.headerText,
			showNoDataText: state.items.length === 0 && state.noDataText,
		};

		return context;
	}

	static getMainClasses(state) {
		return {
			sapMList: true,
			sapMListInsetBG: state.inset,
		};
	}

	static getULClasses(state) {
		return {
			sapMListItems: true,
			sapMListUl: true,
			[`sapMListShowSeparators${state.separators}`]: true,
			[`sapMListMode${state.mode}`]: true,
			sapMListInset: state.inset,
		};
	}

	static getNoDataClasses() {
		return {
			sapMLIB: true,
			sapMListNoData: true,
			sapMLIBTypeInactive: true,
			sapMLIBFocusable: isDesktop(),
		};
	}
}

export default ListTemplateContext;
