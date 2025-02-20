import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import TableRowTemplate from "./TableRowTemplate.js";
import TableRowBase from "./TableRowBase.js";
import TableRowCss from "./generated/themes/TableRow.css.js";
import type TableCell from "./TableCell.js";
import type TableRowActionBase from "./TableRowActionBase.js";
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
 * @experimental This web component is available since 2.0 with an experimental flag and its API and behavior are subject to change.
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
	 * @default ""
	 * @public
	 */
	@property()
	rowKey = "";

	/**
	 * Defines the position of the row respect to the total number of rows within the table when the `ui5-table-virtualizer` feature is used.
	 *
     * @default -1
	 * @since 2.5.0
     * @public
     */
	@property({ type: Number })
	position = -1;

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

	@property({ type: Boolean, noAttribute: true })
	_renderNavigated = false;

	onBeforeRendering() {
		super.onBeforeRendering();
		this.toggleAttribute("_interactive", this._isInteractive);
		if (this.position !== -1) {
			this.setAttribute("aria-rowindex", `${this.position + 1}`);
		}
		if (this._renderNavigated && this.navigated) {
			this.setAttribute("aria-current", "true");
		} else {
			this.removeAttribute("aria-current");
		}
		if (this.movable) {
			this.setAttribute("draggable", "true");
		} else {
			this.removeAttribute("draggable");
		}
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
			this._table?._onRowClick(this);
		}
	}

	_onclick() {
		if (this._isInteractive && this === getActiveElement()) {
			this._table?._onRowClick(this);
		}
	}

	_onkeyup() {
		this.removeAttribute("_active");
	}

	_onfocusout() {
		this.removeAttribute("_active");
	}

	_onOverflowButtonClick(e: MouseEvent) {
		const ctor = this.actions[0].constructor as typeof TableRowActionBase;
		ctor.showMenu(this._overflowActions, e.target as HTMLElement);
	}

	get _isInteractive() {
		return this.interactive;
	}

	get _hasRowActions() {
		return this._rowActionCount > 0 && this.actions.some(action => action.isFixedAction() || !action.invisible);
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
