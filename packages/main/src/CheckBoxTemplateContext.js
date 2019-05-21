import { isDesktop } from "@ui5/webcomponents-core/dist/sap/ui/Device.js";

class CheckBoxTemplateContext {
	static calculate(state) {
		const mainClasses = CheckBoxTemplateContext.getMainClasses(state);
		const innerClasses = CheckBoxTemplateContext.getInnerClasses(state);

		const context = {
			ctr: state,
			ariaReadonly: state.readonly,
			tabIndex: state.disabled ? undefined : "0",
			classes: { main: mainClasses, inner: innerClasses },
			styles: {
				main: {},
			},
		};

		return context;
	}

	static getMainClasses(state) {
		const hoverable = !state.disabled && !state.readonly && isDesktop();

		return {
			"ui5-checkbox-wrapper": true,
			"ui5-checkbox-with-label": !!state.text,
			"ui5-checkbox--disabled": state.disabled,
			"ui5-checkbox--readonly": state.readonly,
			"ui5-checkbox--error": state.valueState === "Error",
			"ui5-checkbox--warning": state.valueState === "Warning",
			"ui5-checkbox--wrap": state.wrap,
			"ui5-checkbox--hoverable": hoverable,
		};
	}

	static getInnerClasses(state) {
		return {
			"ui5-checkbox-inner": true,
			"ui5-checkbox-inner-mark": true,
			"ui5-checkbox-inner--checked": !!state.checked,
		};
	}
}

export default CheckBoxTemplateContext;
