import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { isIOS, isSafari } from "@ui5/webcomponents-base/dist/Device.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import Button from "./Button.js";
import Popover from "./Popover.js";
import RadioButton from "./RadioButton.js";
import TableRowAction from "./TableRowAction.js";
import TableRowTemplate from "./generated/templates/TableRowTemplate.lit.js";
import TableRowBase from "./TableRowBase.js";
import TableRowCss from "./generated/themes/TableRow.css.js";
import TableCell from "./TableCell.js";
import type Menu from "./Menu.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-row` component represents a row in the `ui5-table`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableRow.js";`
 *
 * @constructor
 * @extends TableRowBase
 * @since 2.0
 * @public
 */
@customElement({
	tag: "ui5-table-row",
	styles: [TableRowBase.styles, TableRowCss],
	template: TableRowTemplate,
	dependencies: [...TableRowBase.dependencies, RadioButton, TableCell, Button, Popover, TableRowAction],
})
class TableRow extends TableRowBase {
	/**
	 * Defines the cells of the component.
	 *
	 * **Note:** Use `ui5-table-cell` for the intended design.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
		individualSlots: true,
		invalidateOnChildChange: {
			properties: ["_popin"],
			slots: false,
		},
	})
	cells!: Array<TableCell>;

	/**
	 * Defines the actions of the component.
	 *
	 * **Note:** Use `ui5-table-row-action` for the intended design.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement,
		individualSlots: true,
		invalidateOnChildChange: true,
	})
	actions!: Array<TableRowAction>;

	/**
	 * Defines the visible actions of the component.
	 *
	 * **Note:** Use `ui5-table-row-action` for the intended design.
	 *
	 * @public
	 */
	visibleActions : Array<TableRowAction> = [];

	/**
	 * Defines the visible actions of the component.
	 *
	 * **Note:** Use `ui5-table-row-action` for the intended design.
	 *
	 * @public
	 */
	popoverActions : Array<TableRowAction> = [];

	/**
	 * Unique identifier of the component.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	key = "";

	/**
	 * Defines the interactive state of the row.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	interactive = false;

	static async onDefine() {
		await super.onDefine();
		if (isSafari() && isIOS()) {
			// Safari on iOS does not use the :active state unless there is a touchstart event handler on the <body> element
			document.body.addEventListener("touchstart", () => {});
		}
	}

	onBeforeRendering() {
		super.onBeforeRendering();
		this._updateActions();
		this.toggleAttribute("_interactive", this._isInteractive);
	}

	async focus(focusOptions?: FocusOptions | undefined): Promise<void> {
		this.setAttribute("tabindex", "-1");
		HTMLElement.prototype.focus.call(this, focusOptions);
		return Promise.resolve();
	}

	_onkeydown(e: KeyboardEvent, eventOrigin: HTMLElement) {
		super._onkeydown(e, eventOrigin);
		if (e.defaultPrevented) {
			return;
		}

		if (eventOrigin === this && this._isInteractive && isEnter(e)) {
			this.toggleAttribute("_active", true);
			this._table?._onRowPress(this);
		}
	}

	_onclick() {
		if (this._isInteractive && this === getActiveElement()) {
			this._table?._onRowPress(this);
		}
	}

	_onTableRowActionClick(e: MouseEvent) {
		e?.stopImmediatePropagation();

		this._table?._onTableRowActionPress(e.currentTarget as TableRowAction);
	}

	_handleRowActionPopoverClick(e: KeyboardEvent) {
		const tableRowActionPopoverButton = e.currentTarget as HTMLElement;
		const tableRowActionPopover = tableRowActionPopoverButton.nextSibling as Menu;

		if (tableRowActionPopoverButton && tableRowActionPopover) {
			tableRowActionPopover.opener = tableRowActionPopoverButton;
			tableRowActionPopover.open = !tableRowActionPopover.open;
		}
	}

	_onkeyup() {
		this.removeAttribute("_active");
	}

	_onfocusout() {
		this.removeAttribute("_active");
	}

	_updateActions() {
		if (this.visibleActions.length === 0 && this.popoverActions.length === 0) { // onBeforeRendering is called twice
			const actionsLength = this.actions.filter(action => { return action.type !== "Navigation"; }).length;
			const visibleActionsCount = this._visibleActionsCount;
			let actionCounter = 0;
			while (this.visibleActions.length < visibleActionsCount && actionCounter < this.actions.length && this.visibleActions.length < actionsLength) {
				if (this.actions[actionCounter].type !== "Navigation") {
					this.visibleActions.push(this.actions[actionCounter]);
				}
				actionCounter++;
			}
			for (let i = visibleActionsCount; i < this.actions.length; i++) {
				if (this.actions[i].type !== "Navigation") {
					this.popoverActions.push(this.actions[i]);
				}
			}
			this.popoverActions.forEach(action => { action.menuItem = true; });
		}
	}

	get _visibleActionsCount() {
		const actionsLength = this.actions.filter(action => { return action.type !== "Navigation"; }).length;
		const visibleActionsPerRowDefault = 2;
		// handle case with only one visible rowaction
		const actionlengthRowActionCount = (actionsLength > 1 ? 0 : 1);
		let rowActionCount = this._table?.rowActionCount ?? visibleActionsPerRowDefault;
		rowActionCount = rowActionCount === 1 ? actionlengthRowActionCount : rowActionCount;

		let visibleActionsCount = Math.min(rowActionCount, actionsLength, visibleActionsPerRowDefault);
		if (this._hasRowActionNavigation && visibleActionsCount === 2 && actionsLength > 2) {
			visibleActionsCount = 1;
		}
		return visibleActionsCount;
	}

	get _isInteractive() {
		return this.interactive;
	}

	get _hasRowActions() {
		return this._table?.querySelector("ui5-table-row-action") !== null;
	}

	get _hasRowActionNavigation() {
		return this.actions.find(action => action.type === "Navigation") !== undefined;
	}

	get _hasRowActionPopover() {
		return this.popoverActions.length !== 0;
	}

	get _actionCount() {
		return this.actions.length;
	}
}

TableRow.define();

export default TableRow;
