import { isDesktop } from "@ui5/webcomponents-core/dist/sap/ui/Device.js";
import SwitchType from "./types/SwitchType.js";

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
		const graphical = state.type === SwitchType.Graphical;
		const hasLabel = graphical || state.textOn || state.textOff;

		return {
			"ui5-switch-wrapper": true,
			"ui5-switch-desktop": isDesktop(),
			"ui5-switch--disabled": state.disabled,
			"ui5-switch--checked": state.checked,
			"ui5-switch--semantic": graphical,
			"ui5-switch--no-label": !hasLabel,
		};
	}
}

export default SwitchTemplateContext;
