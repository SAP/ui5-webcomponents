import PopoverPlacementType from "./types/PopoverPlacementType.js";

class PopoverTemplateContext {
	static calculate(state) {
		const placementType = state._actualPlacementType;
		const context = {
			ctr: state,
			headerId: state.hideHeader ? undefined : `${state._id}-header`,
			focusHelper: {
				forwardToLast: state._focusElementsHandlers.forwardToLast,
				forwardToFirst: state._focusElementsHandlers.forwardToFirst,
			},
			classes: {
				frame: {
					sapMPopupFrame: true,
					sapMPopupFrameOpen: state._isOpen,
				},
				main: {
					sapMPopup: true,
					sapMPopover: true,
				},
				blockLayer: {
					sapUiBLy: true,
					sapMPopupBlockLayer: true,
					sapMPopupBlockLayerHidden: !state.modal || state._hideBlockLayer,
				},
				arrow: {
					sapMPopoverArr: true,
					sapMPopoverArrHidden: state.hideArrow,
					sapMPopoverArrLeft: placementType === PopoverPlacementType.Right,
					sapMPopoverArrRight: placementType === PopoverPlacementType.Left,
					sapMPopoverArrUp: placementType === PopoverPlacementType.Bottom,
					sapMPopoverArrDown: placementType === PopoverPlacementType.Top,
				},
			},
			styles: {
				main: {
					left: `${state._left}px`,
					top: `${state._top}px`,
					width: state._width,
					height: state._height,
					"z-index": state._zIndex + 1,
				},
				content: {
					"max-height": `${state._maxContentHeight}px`,
				},
				arrow: {
					transform: `translate(${state._arrowTranslateX}px, ${state._arrowTranslateY}px)`,
				},
				blockLayer: {
					"z-index": state._zIndex,
				},
			},
		};

		return context;
	}
}

export default PopoverTemplateContext;
