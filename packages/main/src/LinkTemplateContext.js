import LinkType from "./types/LinkType.js";

class LinkTemplateContext {
	static calculate(state) {
		const mainClasses = LinkTemplateContext.getMainClasses(state);

		const context = {
			tabIndex: (state.disabled || !state.text.length) ? "-1" : "0",
			ctr: state,
			classes: { main: mainClasses },
			styles: {},
			ariaDisabled: state.disabled ? "true" : undefined,
		};

		return context;
	}

	static getMainClasses(state) {
		return {
			sapMLnk: true,
			sapMLnkSubtle: state.type === LinkType.Subtle,
			sapMLnkEmphasized: state.type === LinkType.Emphasized,
			sapMLnkWrapping: state.wrap,
			sapMLnkDsbl: state.disabled,
			sapMLnkMaxWidth: true,
		};
	}

	static getInnerClasses() {}
}

export default LinkTemplateContext;
