class TokenizerTemplateContext {
	static calculate(state) {
		const context = {
			ctr: state,
			showNMore: state.showMore && state._hiddenTokens.length,
			hiddenTokensCount: state._hiddenTokens.length,
			classes: {
				content: {
					"ui5-tokenizer--content": true,
					"ui5-tokenizer-nmore--content": state.showMore,
				},
			},
		};

		return context;
	}
}

export default TokenizerTemplateContext;
