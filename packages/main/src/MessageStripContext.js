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

	static mappings() {
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
		}
	}

	static getIcon(state) {
		return state.icon || MessageStripTemplateContext.mappings()[state.type];
	}

	static getLabelClasses(state) {
		return {
			sapMMesageStripLabel: true,
			sapMMessageStripNoIcon: state.hideIcon,
			sapMMessageStripNoCloseButton: state.hideCloseButton,
		};
	}

	static getTypeClasses(state) {
		return `sapMMessageStrip ${MessageStripTemplateContext.typeClasses()[state.type]}`;
	}
}

export default MessageStripTemplateContext;
