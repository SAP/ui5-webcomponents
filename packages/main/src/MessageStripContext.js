import MessageStripType from "./types/MessageStripType";

class MessageStripTemplateContext {
	static calculate(state) {
		return {
			ctr: state,
			classes: {
				type: MessageStripTemplateContext.getTypeClasses(state),
				label: MessageStripTemplateContext.getLabelClasses(state),
			},
		};
	}

	static getLabelClasses(state) {
		return {
			sapMMesageStripLabel: true,
			sapMMessageStripNoIcon: state._data.hideIcon,
			sapMMessageStripNoCloseButton: state._data.hideCloseButton,
		};
	}

	static getTypeClasses(state) {
		return {
			sapMMessageStrip: true,
			sapMMessageStripInfo: state._data.type === MessageStripType.Information,
			sapMMessageStripPositive: state._data.type === MessageStripType.Positive,
			sapMMessageStripNegative: state._data.type === MessageStripType.Negative,
			sapMMessageStripWarning: state._data.type === MessageStripType.Warning,
		};
	}
}

export default MessageStripTemplateContext;
