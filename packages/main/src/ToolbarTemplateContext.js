import ToolbarSpacer from "./ToolbarSpacer";

class ToolbarTemplateContext {
	static calculate(state) {
		const context = {
			ctr: state,
			content: ToolbarTemplateContext.buildContent(state),
			classes: {
				main: {
					sapMIBar: true,
					sapMTB: true,
					sapMTBNewFlex: true,
					[`sapMTB${state.toolbarStyle}`]: true,
					[`sapMTB-${state.design}-CTX`]: true,
				},
			},
			styles: {
			},
		};

		return context;
	}

	static buildContent(state) {
		const content = (state.content || []).map(child => {
			let classes = "sapMBarChild";

			if (child instanceof ToolbarSpacer) {
				classes += " sapMTBSpacer sapMTBSpacerFlex";
			} else {
				classes += " sapMTBShrinkItem";
			}

			return {
				id: child.id,
				classes,
				child,
			};
		});
		return content;
	}
}

export default ToolbarTemplateContext;
