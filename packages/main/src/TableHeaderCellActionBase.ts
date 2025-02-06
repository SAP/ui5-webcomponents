import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, eventStrict } from "@ui5/webcomponents-base/dist/decorators.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import TableHeaderCellActionBaseTemplate from "./generated/templates/TableHeaderCellActionBaseTemplate.lit.js";
import TableHeaderCellActionBaseStyles from "./generated/themes/TableHeaderCellActionBase.css.js";
import Button from "./Button.js";
import type TableCell from "./TableCell.js";

/**
 * Fired when a header cell action is clicked.
 *
 * @param {HTMLElement} targetRef The reference to the element that triggered the event
 * @public
 * @since 2.8.0
 */
type TableHeaderCellActionClickEventDetail = {
	targetRef: HTMLElement;
};

/**
 * Fired when a header cell action is clicked.
 *
 * @param {HTMLElement} targetRef The reference to the element that triggered the event
 * @public
 * @since 2.8.0
 */
@eventStrict("click", {
	bubbles: false,
})

/**
 * @class
 * The `TableHeaderCellActionBase` class serves as a foundation for table header cell actions.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @since 2.8.0
 * @public
 */
@customElement({
	renderer: litRender,
	styles: TableHeaderCellActionBaseStyles,
	template: TableHeaderCellActionBaseTemplate,
	dependencies: [Button],
})
abstract class TableHeaderCellActionBase extends UI5Element {
	eventDetails!: {
		"click": TableHeaderCellActionClickEventDetail,
	}

	abstract getRenderInfo(): {
		icon: string;
		tooltip: string;
	};

	onBeforeRendering() {
		this.toggleAttribute("_popin", !this.parentElement);
	}

	_onClick(e: MouseEvent) {
		const action = this.parentElement ? this : ((this.getRootNode() as ShadowRoot).host as TableCell)._headerCell.action[0] as this;
		action.fireDecoratorEvent("click", { targetRef: e.target as HTMLElement });
		e.stopPropagation();
	}

	get _tooltip() {
		return this.getRenderInfo().tooltip;
	}

	get _icon() {
		return this.getRenderInfo().icon;
	}
}

export default TableHeaderCellActionBase;

export type {
	TableHeaderCellActionClickEventDetail,
};
