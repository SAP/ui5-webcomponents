import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type TableCellBase from "./TableCellBase.js";
import TableRowBaseCss from "./generated/themes/TableRowBase.css.js";
import type Table from "./Table.js";
import CheckBox from "./CheckBox.js";
import { isInstanceOfTable } from "./TableUtils.js";
import {
	TABLE_ROW_SELECTOR,
} from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 * A class to serve as a foundation for the `TableRow` and `TableHeaderRow` classes.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @since 2.0
 * @public
 */
@customElement({
	renderer: litRender,
	styles: TableRowBaseCss,
	dependencies: [CheckBox],
})
abstract class TableRowBase extends UI5Element {
	cells!: Array<TableCellBase>;

	@property({ type: Number, noAttribute: true })
	_invalidate = 0;

	static i18nBundle: I18nBundle;
	static async onDefine() {
		TableRowBase.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	onEnterDOM() {
		this.setAttribute("role", "row");
	}

	onBeforeRendering() {
		if (this._isSelectable) {
			this.setAttribute("aria-selected", `${this._isSelected}`);
		} else {
			this.removeAttribute("aria-selected");
		}
	}

	getFocusDomRef() {
		return this;
	}

	_informSelectionChange() {
		this._tableSelection?.informSelectionChange(this);
	}

	isHeaderRow(): boolean {
		return false;
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
		return this._tableSelection?.isMultiSelect();
	}

	get _hasRowSelector() {
		return this._tableSelection?.hasRowSelector();
	}

	get _selectionCell() {
		return this.shadowRoot!.getElementById("selection-cell");
	}

	get _visibleCells() {
		return this.cells.filter(c => !c._popin);
	}

	get _popinCells() {
		return this.cells.filter(c => c._popin);
	}

	get _i18nRowSelector(): string {
		return TableRowBase.i18nBundle.getText(TABLE_ROW_SELECTOR);
	}

	get isTableRowBase() {
		return true;
	}
}

export default TableRowBase;

const isInstanceOfTableHeaderRow = (obj: any) => "isHeaderRow" in obj && obj.isHeaderRow() as boolean;
const isInstanceOfTableRow = (obj: any) => "isHeaderRow" in obj && !obj.isHeaderRow() as boolean;

export { isInstanceOfTableHeaderRow, isInstanceOfTableRow };
