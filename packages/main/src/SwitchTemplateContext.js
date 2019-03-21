import SwitchType from "./types/SwitchType";
import { isDesktop } from "@ui5/webcomponents-core/dist/sap/ui/Device";

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
			"ui5-switch-wrapper": true,
			"ui5-switch--disabled": state.disabled,
			"ui5-switch--checked": state.checked,
			"ui5-switch--semantic": state.type === SwitchType.Graphical,
			"ui5-switch__desktop": isDesktop(),
		};
	}
}

export default SwitchTemplateContext;
