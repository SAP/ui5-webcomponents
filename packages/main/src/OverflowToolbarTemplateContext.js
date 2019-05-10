class MessageStripTemplateContext {
	static calculate(state) {
		return {
			ctr: state,
			classes: {
				closeIcon: {
					"ui5-messagestrip-close-icon": true,
				},
				main: {
					"ui5-messagestrip": true,
				},
			},
		};
	}
}

export default MessageStripTemplateContext;
