import { isPhone } from "@ui5/webcomponents-core/dist/sap/ui/Device.js";

class DialogTemplateContext {
	static calculate(state) {
		const context = {
			ctr: state,
			headerId: state.hideHeader ? undefined : `${state.id}-header`,
			classes: {
				frame: {
					sapMPopupFrame: true,
					sapMPopupFrameOpen: state._isOpen,
				},
				dialogParent: {
					sapMDialogParent: true,
					sapMDialogStretched: state.stretch,
					"ui5-phone": isPhone(),
				},
				main: {
					sapMPopup: true,
					sapMDialog: true,
				},
				blockLayer: {
					sapUiBLy: true,
					sapMPopupBlockLayer: true,
					sapMPopupBlockLayerHidden: state._hideBlockLayer,
				},
			},
			styles: {
				zindex: {
					"z-index": state._zIndex + 1,
				},
				content: {},
				blockLayer: {
					"z-index": state._zIndex,
				},
			},
		};

		return context;
	}
}

export default DialogTemplateContext;
