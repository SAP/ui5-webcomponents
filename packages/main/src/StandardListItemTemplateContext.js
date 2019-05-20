import ListItemTemplateContext from "./ListItemTemplateContext.js";

class StandardListItemTemplateContext {
	static calculate(state) {
		const context = ListItemTemplateContext.calculate(state);
		const hasIcon = !!state.icon;
		const iconEnd = state.iconEnd;
		const hasImage = !!state.image;
		const hasDesc = state.description && !!state.description.length;
		const hasTitle = state._control.textContent && !!state._control.textContent.length;

		context.displayImage = hasImage;
		context.displayIconBegin = (hasIcon && !iconEnd);
		context.displayIconEnd = (hasIcon && iconEnd);
		context.classes.main.sapMSLIWithTitleAndDescription = hasDesc && hasTitle;

		return context;
	}
}

export default StandardListItemTemplateContext;
