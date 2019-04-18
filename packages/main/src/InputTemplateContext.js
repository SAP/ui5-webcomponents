import { isIE } from "@ui5/webcomponents-core/dist/sap/ui/Device.js";

class InputTemplateContext {
	static calculate(state) {
		const mainClasses = InputTemplateContext.getMainClasses(state);
		const wrapperClasses = InputTemplateContext.getWrapperClasses(state);

		// We don`t support placeholder for IE,
		// because IE fires input events, when placeholder exists, leading to functional degredations.
		if (isIE()) {
			state.placeholder = "";
		}

		const context = {
			ctr: state,
			_readonly: state.readonly && !state.disabled,
			classes: { main: mainClasses, wrapper: wrapperClasses },
			styles: {
				main: { width: "100%" },
			},
			type: state.type.toLowerCase(),
			ariaInvalid: state.valueState === "Error" ? "true" : undefined,
		};

		return context;
	}

	static getMainClasses(state) {
		return {
			sapWCInputBase: true,
			sapWCInputBaseWidthPadding: true,
			sapWCInputBaseDisabled: state.disabled,
			sapWCInputBaseReadonly: state.readonly,
			sapWCInput: true,
			sapWCInputFocused: state._focused,
			sapWCFocus: state._focused,
		};
	}

	static getWrapperClasses(state) {
		const hasState = state.valueState !== "None";

		const classes = {
			sapWCInputBaseContentWrapper: true,
			sapWCInputBaseDisabledWrapper: state.disabled,
			sapWCInputBaseReadonlyWrapper: state.readonly && !state.disabled,
			sapWCInputBaseContentWrapperState: hasState,
		};

		if (hasState) {
			classes[`sapWCInputBaseContentWrapper${state.valueState}`] = true;
		}

		return classes;
	}
}

export default InputTemplateContext;
