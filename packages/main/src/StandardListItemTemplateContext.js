import ListItemTemplateContext from "./ListItemTemplateContext";

class StandardListItemTemplateContext {
	static calculate(state) {
		const context = ListItemTemplateContext.calculate(state);
		const hasIcon = !!state.icon;
		const iconEnd = state.iconEnd;
		const hasImage = !!state.image;

		context.displayImage = hasImage;
		context.displayIconBegin = (hasIcon && !iconEnd);
		context.displayIconEnd = (hasIcon && iconEnd);

		return context;
	}
}

export default StandardListItemTemplateContext;
