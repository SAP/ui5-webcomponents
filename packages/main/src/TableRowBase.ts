import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, property, i18n } from "@ui5/webcomponents-base/dist/decorators.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import { isInstanceOfTable, toggleAttribute } from "./TableUtils.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import TableRowBaseCss from "./generated/themes/TableRowBase.css.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type TableCellBase from "./TableCellBase.js";
import type Table from "./Table.js";
import {
	TABLE_ROW_SELECTOR,
} from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 * A class to serve as a foundation for the `TableRow` and `TableHeaderRow` classes.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @since 2.0.0
 * @public
 */
@customElement({
	renderer: jsxRenderer,
	styles: TableRowBaseCss,
})
abstract class TableRowBase extends UI5Element {
	cells!: Array<TableCellBase>;

	@property({ type: Number, noAttribute: true })
	_invalidate = 0;

	@property({ type: Number, noAttribute: true })
	_rowActionCount = 0;

	@property({ type: Boolean, noAttribute: true })
	_renderNavigated = false;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	onEnterDOM() {
		this.setAttribute("role", "row");
		this.toggleAttribute("ui5-table-row-base", true);
	}

	onBeforeRendering() {
		toggleAttribute(this, "aria-selected", this._isSelectable, `${this._isSelected}`);
	}

	getFocusDomRef() {
		return this;
	}

	isHeaderRow(): boolean {
		return false;
	}

	_onSelectionChange() {
		const tableSelection = this._tableSelection!;
		const selected = tableSelection.isMultiSelectable() ? !this._isSelected : true;
		tableSelection.setSelected(this, selected, true);
	}

	_onkeydown(e: KeyboardEvent, eventOrigin: HTMLElement) {
		if ((eventOrigin === this && this._isSelectable && isSpace(e)) || (eventOrigin === this._selectionCell && (isSpace(e) || isEnter(e)))) {
			this._onSelectionChange();
			e.preventDefault();
		}
	}

	get _table(): Table | undefined {
		const element = this.parentElement;
		return isInstanceOfTable(element) ? element : undefined;
	}

	get _tableId() {
		return this._table?._id;
	}

	get _tableSelection() {
		return this._table?._getSelection();
	}

	get _isSelected() {
		return this._tableSelection?.isSelected(this);
	}

	get _isSelectable() {
		return this._tableSelection?.isSelectable();
	}

	get _isMultiSelect() {
		return !!this._tableSelection?.isMultiSelectable();
	}

	get _hasRowSelector() {
		return !!this._tableSelection?.isRowSelectorRequired();
	}

	get _selectionCell() {
		return this.shadowRoot!.getElementById("selection-cell");
	}

	get _navigatedCell() {
		return this.shadowRoot!.getElementById("navigated-cell");
	}

	get _visibleCells() {
		return this.cells.filter(c => !c._popin);
	}

	get _popinCells() {
		return this.cells.filter(c => c._popin && !c._popinHidden);
	}

	get _stickyCells() {
		return [this._selectionCell, ...this.cells, this._navigatedCell].filter(cell => cell?.hasAttribute("fixed"));
	}

	get _i18nRowSelector(): string {
		return TableRowBase.i18nBundle.getText(TABLE_ROW_SELECTOR);
	}
}

export default TableRowBase;
