import LabelEnablement from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/LabelEnablement";

class LabelTemplateContext {
	static calculate(state) {
		const mainClasses = LabelTemplateContext.getMainClasses(state);
		let labelFor = "";

		if (state.for) {
			labelFor = LabelEnablement.getLabelableElementId(state.for);
		}

		return {
			ctr: state,
			labelFor,
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
