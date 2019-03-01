import SwitchType from "./types/SwitchType";

class SwitchTemplateContext {
	static calculate(state) {
		const graphical = state.type === SwitchType.Graphical;
		const textOn = graphical ? "" : state.textOn;
		const textOff = graphical ? "" : state.textOff;
		const mainClasses = SwitchTemplateContext.getMainClasses(state);

		const context = {
			ctr: state,
			textOn,
			textOff,
			tabIndex: state.disabled ? undefined : "0",
			classes: { main: mainClasses },
		};

		return context;
	}

	static getMainClasses(state) {
		return {
			"ui5-switch": true,
			"ui5-switch--disabled": state.disabled,
			"ui5-switch--checked": state.checked,
			"ui5-switch--semantic": state.type === SwitchType.Graphical,
		};
	}
}

export default SwitchTemplateContext;
