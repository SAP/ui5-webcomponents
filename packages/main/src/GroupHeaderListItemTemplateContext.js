import ListItemBaseTemplateContext from "./ListItemBaseTemplateContext.js";

class GroupHeaderListItemTemplateContext {
	static calculate(state) {
		return {
			ctr: state,
			classes: {
				main: GroupHeaderListItemTemplateContext.getMainClasses(state),
				inner: GroupHeaderListItemTemplateContext.getInnerClasses(state),
				span: { sapMGHLITitle: true },
			},
			styles: {
				main: {},
			},
		};
	}

	static getMainClasses(state) {
		const context = ListItemBaseTemplateContext.getMainClasses(state);
		context.sapMGHLI = true;
		context.sapMLIBTypeInactive = true;
		return context;
	}

	static getInnerClasses(state) {
		return ListItemBaseTemplateContext.getInnerClasses(state);
	}
}

export default GroupHeaderListItemTemplateContext;
