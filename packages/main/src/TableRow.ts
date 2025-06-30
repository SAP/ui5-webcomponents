import { customElement, slot, property } from "@ui5/webcomponents-base/dist/decorators.js";
import { isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base";
import { toggleAttribute } from "./TableUtils.js";
import TableRowTemplate from "./TableRowTemplate.js";
import TableRowBase from "./TableRowBase.js";
import TableRowCss from "./generated/themes/TableRow.css.js";
import type TableCell from "./TableCell.js";
import type TableRowActionBase from "./TableRowActionBase.js";
import type Button from "./Button.js";
import "@ui5/webcomponents-icons/dist/overflow.js";

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
 * @since 2.0.0
 * @public
 */
@customElement({
	tag: "ui5-table-row",
	styles: [TableRowBase.styles, TableRowCss],
	template: TableRowTemplate,
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
			properties: ["_popin", "_popinHidden"],
			slots: false,
		},
	})
	cells!: Array<TableCell>;

	/**
	 * Defines the actions of the component.
	 *
	 * **Note:** Use `ui5-table-row-action` or `ui5-table-row-action-navigation` for the intended design.
	 *
	 * @since 2.7.0
	 * @public
	 */
	@slot({
		type: HTMLElement,
		individualSlots: true,
	})
	actions!: Array<TableRowActionBase>;

	/**
	 * Unique identifier of the row.
	 *
	 * **Note:** For selection features to work properly, this property is mandatory, and its value must not contain spaces.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	rowKey?: string;

	/**
	 * Defines the position of the row related to the total number of rows within the table when the `ui5-table-virtualizer` feature is used.
	 *
	 * @default undefined
	 * @since 2.5.0
	 * @public
	 */
	@property({ type: Number })
	position?: number;

	/**
	 * Defines the interactive state of the row.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	interactive = false;

	/**
	 * Defines the navigated state of the row.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	navigated = false;

	/**
	 * Defines whether the row is movable.
	 *
	 * @default false
	 * @since 2.6.0
	 * @public
	 */
	@property({ type: Boolean })
	movable = false;

	onBeforeRendering() {
		super.onBeforeRendering();
		toggleAttribute(this, "_interactive", this._isInteractive);
		toggleAttribute(this, "aria-rowindex", this.position !== undefined, `${this.position! + 1}`);
		toggleAttribute(this, "aria-current", this._renderNavigated && this.navigated, "true");
		toggleAttribute(this, "draggable", this.movable, "true");
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
			this._onclick();
		}
	}

	_onclick() {
		if (this === getActiveElement()) {
			if (this._isSelectable && !this._hasSelector) {
				this._onSelectionChange();
			} else 	if (this.interactive) {
				this._table?._onRowClick(this);
			}
		}
	}

	_onkeyup() {
		this.removeAttribute("_active");
	}

	_onfocusout() {
		this.removeAttribute("_active");
	}

	_onOverflowButtonClick(e: UI5CustomEvent<Button, "click">) {
		const ctor = this.actions[0].constructor as typeof TableRowActionBase;
		ctor.showMenu(this._overflowActions, e.target as HTMLElement);
		e.stopPropagation();
	}

	get _isInteractive() {
		return this.interactive || (this._isSelectable && !this._hasSelector);
	}

	get _hasOverflowActions() {
		let renderedActionsCount = 0;
		return this.actions.some(action => {
			if (action.isFixedAction() || !action.invisible) {
				renderedActionsCount++;
			}
			return renderedActionsCount > this._rowActionCount;
		});
	}

	get _flexibleActions() {
		const flexibleActions = this.actions.filter(action => !action.isFixedAction());
		const fixedActionsCount = this.actions.length - flexibleActions.length;
		let maxFlexibleActionsCount = this._rowActionCount - fixedActionsCount;
		if (maxFlexibleActionsCount < 1) {
			return []; // fixed actions occupy all the available space
		}
		if (flexibleActions.length <= maxFlexibleActionsCount) {
			return flexibleActions; // all actions fit the available space
		}

		const visibleFlexibleActions = flexibleActions.filter(action => !action.invisible);
		if (visibleFlexibleActions.length > maxFlexibleActionsCount) {
			maxFlexibleActionsCount--;	// preserve space for the overflow button
		}

		return visibleFlexibleActions.slice(0, maxFlexibleActionsCount);
	}

	get _fixedActions() {
		let maxFixedActionsCount = this._rowActionCount;
		if (this._hasOverflowActions) {
			maxFixedActionsCount--;
		}

		const fixedActions = this.actions.filter(action => action.isFixedAction());
		return fixedActions.slice(0, maxFixedActionsCount);
	}

	get _overflowActions() {
		const fixedActions = this._fixedActions;
		const flexibleActions = this._flexibleActions;
		const overflowActions: Array<TableRowActionBase> = [];
		this.actions.forEach(action => {
			if (!action.invisible && !fixedActions.includes(action) && !flexibleActions.includes(action)) {
				overflowActions.push(action);
			}
		});

		return overflowActions;
	}
}

TableRow.define();

export default TableRow;
