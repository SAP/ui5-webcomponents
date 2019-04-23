import { isDesktop } from "@ui5/webcomponents-core/dist/sap/ui/Device.js";
import ListMode from "./types/ListMode.js";
import ListItemType from "./types/ListItemType.js";
import ListItemBaseTemplateContext from "./ListItemBaseTemplateContext.js";

class ListItemTemplateContext {
	static calculate(state) {
		const context = {
			ctr: state,
			classes: {
				main: ListItemTemplateContext.getMainClasses(state),
				inner: ListItemTemplateContext.getInnerClasses(state),
				image: {},
			},
			styles: {
				main: {},
			},
		};

		const mode = state._mode;

		context.placeSelectionControlBefore = mode === ListMode.MultiSelect
			|| mode === ListMode.SingleSelectBegin;

		context.placeSelectionControlAfter = !context.placeSelectionControlBefore
			&& (mode === ListMode.SingleSelectEnd || mode === ListMode.Delete);

		context.modeSingleSelect = [
			ListMode.SingleSelectBegin,
			ListMode.SingleSelectEnd,
			ListMode.SingleSelect,
		].includes(mode);
		context.modeMultiSelect = mode === ListMode.MultiSelect;
		context.modeDelete = mode === ListMode.Delete;

		return context;
	}

	static getMainClasses(state) {
		const desktop = isDesktop();
		const isActionable = (state.type === ListItemType.Active) && (state._mode !== ListMode.Delete);
		const context = ListItemBaseTemplateContext.getMainClasses(state);

		context[`sapMLIBType${state.type}`] = true;
		context.sapMSLI = true;
		context.sapMLIBActionable = desktop && isActionable;
		context.sapMLIBHoverable = desktop && isActionable;
		context.sapMLIBSelected = state.selected;
		context.sapMLIBActive = state._active;

		return context;
	}

	static getInnerClasses(state) {
		return ListItemBaseTemplateContext.getInnerClasses(state);
	}
}

export default ListItemTemplateContext;
