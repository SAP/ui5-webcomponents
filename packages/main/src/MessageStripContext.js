class MessageStripTemplateContext {
	static calculate(state) {
		return {
			ctr: state,
			classes: {
				label: MessageStripTemplateContext.getLabelClasses(state),
			},
			type: MessageStripTemplateContext.getTypeClasse(state),
			icon: MessageStripTemplateContext.getIcon(state),
		};
	}

	static iconMappings() {
		return {
			"Information": "sap-icon://hint",
			"Positive": "sap-icon://message-success",
			"Negative": "sap-icon://message-error",
			"Warning": "sap-icon://message-warning",
		};
	}

	static typeClasses() {
		return {
			"Information": "sapMMessageStripInfo",
			"Positive": "sapMMessageStripPositive",
			"Negative": "sapMMessageStripNegative",
			"Warning": "sapMMessageStripWarning",
		};
	}

	static getIcon(state) {
		return state.icon || MessageStripTemplateContext.iconMappings()[state.type];
	}

	static getLabelClasses(state) {
		return {
			sapMMesageStripLabel: true,
			sapMMessageStripNoIcon: state.hideIcon,
			sapMMessageStripNoCloseButton: state.hideCloseButton,
		};
	}

	static getTypeClasse(state) {
		return MessageStripTemplateContext.typeClasses()[state.type];
	}
}

export default MessageStripTemplateContext;
