import ButtonTemplateContext from "./ButtonTemplateContext.js";

class ToggleButtonTemplateContext {
	static calculate(state) {
		const calculatedState = ButtonTemplateContext.calculate(state);

		calculatedState.classes.main.sapMToggleBtnPressed = state.pressed;
		calculatedState.pressed = state.pressed;

		return calculatedState;
	}
}

export default ToggleButtonTemplateContext;
