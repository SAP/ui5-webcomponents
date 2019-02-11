import ListItemTemplateContext from "./ListItemTemplateContext";

class CustomListItemTemplateContext {
	static calculate(state) {
		const calculatedState = ListItemTemplateContext.calculate(state);
		calculatedState.classes.main.sapMCustomLI = true;
		return calculatedState;
	}
}

export default CustomListItemTemplateContext;
