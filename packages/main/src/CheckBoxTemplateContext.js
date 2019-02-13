import Device from "@ui5/webcomponents-core/dist/sap/ui/Device";

class CheckBoxTemplateContext {
	static calculate(state) {
		const mainClasses = CheckBoxTemplateContext.getMainClasses(state);
		const innerClasses = CheckBoxTemplateContext.getInnerClasses(state);
		let tabIndex;

		if (!state.disabled) {
			tabIndex = state._control.tabIndex ? state._control.tabIndex.toString() : "0";
		}

		const context = {
			ctr: state,
			readOnly: !state.disabled,
			tabIndex,
			classes: { main: mainClasses, inner: innerClasses },
			styles: {
				main: {},
			},
		};

		context.ariaReadonly = context.readOnly ? "true" : undefined;

		return context;
	}

	static getMainClasses(state) {
		return {
			sapMCb: true,
			sapMCbHasLabel: !!state.text,
			sapMCbBgDis: state.disabled,
			sapMCbRo: state.readOnly,
			sapMCbErr: state.valueState === "Error",
			sapMCbWarn: state.valueState === "Warning",
			sapMCbWrapped: state.wrap,
		};
	}

	static getInnerClasses(state) {
		const hoverable = !state.disabled && !state.readOnly && Device.system.desktop;

		return {
			sapMCbBg: true,
			sapMCbHoverable: hoverable,
			sapMCbMark: true,
			sapMCbMarkChecked: !!state.checked,
		};
	}
}

export default CheckBoxTemplateContext;
