class MessageStripTemplateContext {
	static calculate(state) {
		return {
			ctr: state,
			classes: {
				label: MessageStripTemplateContext.getLabelClasses(state),
				closeIcon: {
					"ui5-messagestrip-close-icon": true,
				},
				main: {
					"ui5-messagestrip-root": true,
					"ui5-messagestrip-icon--hidden": state.hideIcon,
					"ui5-messagestrip-close-icon--hidden": state.hideCloseButton,
					[MessageStripTemplateContext.getTypeClasses(state)]: true,
				},
			},
			icon: MessageStripTemplateContext.getIcon(state),
		};
	}

	static iconMappings() {
		return {
			"Information": "sap-icon://message-information",
			"Positive": "sap-icon://message-success",
			"Negative": "sap-icon://message-error",
			"Warning": "sap-icon://message-warning",
		};
	}

	static typeClasses() {
		return {
			"Information": "ui5-messagestrip--info",
			"Positive": "ui5-messagestrip--positive",
			"Negative": "ui5-messagestrip--negative",
			"Warning": "ui5-messagestrip--warning",
		};
	}

	static getIcon(state) {
		return state.icon || MessageStripTemplateContext.iconMappings()[state.type];
	}

	static getLabelClasses(state) {
		return {
			"ui5-messagestrip-text": true,
			"ui5-messagestripNoCloseButton": state.hideCloseButton,
		};
	}

	static getTypeClasses(state) {
		return MessageStripTemplateContext.typeClasses()[state.type];
	}
}

export default MessageStripTemplateContext;
