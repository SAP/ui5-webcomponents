import { isDesktop } from "@ui5/webcomponents-core/dist/sap/ui/Device.js";

class ListItemBaseTemplateContext {
	static calculate(state) {
		const context = {
			ctr: state,
			classes: {
				main: ListItemBaseTemplateContext.getMainClasses(state),
				inner: ListItemBaseTemplateContext.getInnerClasses(state),
			},
			styles: {
				main: {},
			},
		};

		return context;
	}

	static getMainClasses(state) {
		return {
			sapMLIBBorder: !state._hideBorder,
			sapMLIB: true,
			"sapMLIB-CTX": true,
			sapMLIBShowSeparator: true,
			sapMLIBFocusable: isDesktop(),
		};
	}

	static getInnerClasses() {
		return { sapMLIBContent: true };
	}
}

export default ListItemBaseTemplateContext;
