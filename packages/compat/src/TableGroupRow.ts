import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import CheckBox from "@ui5/webcomponents/dist/CheckBox.js";
import type { ITableRow, TableColumnInfo } from "./Table.js";
import TableGroupRowTemplate from "./generated/templates/TableGroupRowTemplate.lit.js";
import TableMode from "./types/TableMode.js";

// Texts
import {
	TABLE_GROUP_ROW_ARIA_LABEL,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import tableGroupRowStyles from "./generated/themes/TableGroupRow.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-group-row` component represents a group row in the `ui5-table`.
 * @constructor
 * @since 2.0.0
 * @implements {ITableRow}
 * @extends UI5Element
 * @public
 * @slot {Node[]} default - Defines the text of the component.
 *
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 * @csspart group-row - Used to style the native `tr` element
 */
@customElement({
	tag: "ui5-table-group-row",
	styles: tableGroupRowStyles,
	renderer: litRender,
	template: TableGroupRowTemplate,
	dependencies: [
		CheckBox,
	],
})
@event("_focused")
class TableGroupRow extends UI5Element implements ITableRow {
	/**
	 * Defines the mode of the row
	 * @default "None"
	 * @private
	 */
	@property()
	mode: `${TableMode}` = "None";

	@property({ type: Array })
	_columnsInfo?: Array<TableColumnInfo>;

	@property()
	forcedTabIndex?: string;

	@property({ type: Boolean })
	forcedBusy = false;

	@property()
	forcedAriaPosition?: string;

	// Properties, set and handled by the Table
	selected = false;
	tabbableElements: Array<HTMLElement> = [];
	_columnsInfoString = "";

	static i18nBundle: I18nBundle;

	_colSpan?: number;

	get colSpan() {
		return this._colSpan;
	}

	get ariaLabelText() {
		return `${TableGroupRow.i18nBundle.getText(TABLE_GROUP_ROW_ARIA_LABEL)} ${this.textContent}. ${this.forcedAriaPosition}`;
	}

	visibleColCount(): number {
		let count = this._columnsInfo?.reduce((acc, column) => {
			return column.visible ? ++acc : acc;
		}, 0) || 0;

		if (this.mode === TableMode.MultiSelect) {
			count++;
		}

		return count;
	}

	onBeforeRendering() {
		if (!this._columnsInfo || this._columnsInfo.length === 0) {
			return;
		}
		this._colSpan = this.visibleColCount();
	}

	_onfocusin(e: FocusEvent) {
		this.fireEvent("_focused", e);
	}

	static async onDefine() {
		TableGroupRow.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

TableGroupRow.define();

export default TableGroupRow;
