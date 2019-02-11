import Device from "@ui5/webcomponents-core/dist/sap/ui/Device";

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
		const isDesktop = Device.system.desktop;

		return {
			sapMLIBBorder: !state._hideBorder,
			sapMLIB: true,
			"sapMLIB-CTX": true,
			sapMLIBShowSeparator: true,
			sapMLIBFocusable: isDesktop,
			[`sapMLIB${state._background}`]: !!state._background,
		};
	}

	static getInnerClasses() {
		return { sapMLIBContent: true };
	}
}

export default ListItemBaseTemplateContext;
