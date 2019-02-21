import SwitchType from "./types/SwitchType";

class SwitchTemplateContext {
	static calculate(state) {
		const semantic = SwitchType.isValid(state.type) && state.type !== SwitchType.Standard;
		const textOn = semantic ? "" : state.textOn;
		const textOff = semantic ? "" : state.textOff;
		const mainClasses = SwitchTemplateContext.getMainClasses(state, { semantic });

		const context = {
			ctr: state,
			textOn,
			textOff,
			tabIndex: state.disabled ? undefined : "0",
			classes: { main: mainClasses },
		};

		return context;
	}

	static getMainClasses(state, { semantic = false } = {}) {
		return {
			"ui5-switch": true,
			"ui5-switch--disabled": state.disabled,
			"ui5-switch--checked": state.checked,
			"ui5-switch--semantic": semantic,
		};
	}
}

export default SwitchTemplateContext;
