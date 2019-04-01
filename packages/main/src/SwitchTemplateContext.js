import { isDesktop } from "@ui5/webcomponents-core/dist/sap/ui/Device";
import SwitchType from "./types/SwitchType";

class SwitchTemplateContext {
	static calculate(state) {
		const graphical = state.type === SwitchType.Graphical;
		const textOn = graphical ? "" : state.textOn;
		const textOff = graphical ? "" : state.textOff;
		const mainClasses = SwitchTemplateContext.getMainClasses(state);
		const hasLabel = graphical || textOn || textOff;

		const context = {
			ctr: state,
			textOn,
			textOff,
			tabIndex: state.disabled ? undefined : "0",
			classes: { main: mainClasses },
		};

		context.classes.main["ui5-switch--no-label"] = !hasLabel;

		return context;
	}

	static getMainClasses(state) {
		return {
			"ui5-switch-wrapper": true,
			"ui5-switch-desktop": isDesktop(),
			"ui5-switch--disabled": state.disabled,
			"ui5-switch--checked": state.checked,
			"ui5-switch--semantic": state.type === SwitchType.Graphical,
		};
	}
}

export default SwitchTemplateContext;
