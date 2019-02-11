import ButtonTemplateContext from "./ButtonTemplateContext";

class ToggleButtonTemplateContext {
	static calculate(state) {
		const calculatedState = ButtonTemplateContext.calculate(state);

		calculatedState.classes.main.sapMToggleBtnPressed = state.pressed;
		calculatedState.classes.main.sapMBtnActive = false;
		calculatedState.pressed = state.pressed ? "true" : undefined;

		return calculatedState;
	}
}

export default ToggleButtonTemplateContext;
