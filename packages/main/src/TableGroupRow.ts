import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import CheckBox from "./CheckBox.js";
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
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-table-group-row</code> component represents a group row in the <code>ui5-table</code>.
 *
 * @constructor
 * @since 1.0.0-rc.15
 * @implements {ITableRow}
 * @extends UI5Element
 * @public
 * @slot {Node[]} default - Defines the text of the component. <br> <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 * @csspart group-row - Used to style the native <code>tr</code> element
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
	 *
	 * <br><br>
	 * <b>Note:</b>
	 * Available options are:
	 * <ul>
	 * <li><code>None</code></li>
	 * <li><code>SingleSelect</code></li>
	 * <li><code>MultiSelect</code></li>
	 * </ul>
	 *
	 * @default "None"
	 * @private
	 */
	@property({ type: TableMode, defaultValue: TableMode.None })
	mode!: `${TableMode}`;

	@property({ type: Object, multiple: true })
	_columnsInfo!: Array<TableColumnInfo>;

	@property({ defaultValue: "-1" })
	_tabIndex!: string;

	@property({ type: Boolean })
	_busy!: boolean;

	@property({ defaultValue: "", noAttribute: true })
	_ariaPosition!: string;

	// Properties, set and handled by the Table
	selected = false;
	_tabbables: Array<HTMLElement> = [];
	_columnsInfoString = "";

	static i18nBundle: I18nBundle;

	_colSpan?: number;

	get colSpan() {
		return this._colSpan;
	}

	get ariaLabelText() {
		return `${TableGroupRow.i18nBundle.getText(TABLE_GROUP_ROW_ARIA_LABEL)} ${this.innerText}. ${this._ariaPosition}`;
	}

	visibleColCount(): number {
		let count = this._columnsInfo.reduce((acc, column) => {
			return column.visible ? ++acc : acc;
		}, 0);

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
