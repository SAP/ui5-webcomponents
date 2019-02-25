import MessageStripType from "./types/MessageStripType";

class MessageStripTemplateContext {
	static calculate(state) {
		return {
			ctr: state,
			classes: {
				type: MessageStripTemplateContext.getTypeClasses(state),
				label: MessageStripTemplateContext.getLabelClasses(state),
			},
			icon: MessageStripTemplateContext.getIcon(state),
		};
	}

	static getIcon(state) {
		const mappings = {
			"Positive": "sap-icon://message-success",
			"Negative": "sap-icon://message-error",
			"Warning": "sap-icon://message-warning",
			"Information": "sap-icon://hint",
		};

		return state.icon || mappings[state.type];
	}

	static getLabelClasses(state) {
		return {
			sapMMesageStripLabel: true,
			sapMMessageStripNoIcon: state.hideIcon,
			sapMMessageStripNoCloseButton: state.hideCloseButton,
		};
	}

	static getTypeClasses(state) {
		return {
			sapMMessageStrip: true,
			sapMMessageStripInfo: state.type === MessageStripType.Information,
			sapMMessageStripPositive: state.type === MessageStripType.Positive,
			sapMMessageStripNegative: state.type === MessageStripType.Negative,
			sapMMessageStripWarning: state.type === MessageStripType.Warning,
		};
	}
}

export default MessageStripTemplateContext;
