import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import TableCellTemplate from "./TableCellTemplate.js";
import TableCellStyles from "./generated/themes/TableCell.css.js";
import TableCellBase from "./TableCellBase.js";
import type TableRow from "./TableRow.js";
import type Table from "./Table.js";
import { LABEL_COLON } from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-cell` represents a cell inside of a `ui5-table`.
 * It is tightly coupled to the `ui5-table` and thus should only be used in the table component.
 *
 * ### ES6 Module Import
 *
 * `import @ui5/webcomponents/dist/TableCell.js;`
 *
 * @constructor
 * @extends TableCellBase
 * @since 2.0.0
 * @public
 * @experimental This web component is available since 2.0 with an experimental flag and its API and behavior are subject to change.
 */
@customElement({
	tag: "ui5-table-cell",
	renderer: jsxRenderer,
	styles: [TableCellBase.styles, TableCellStyles],
	template: TableCellTemplate,
})
class TableCell extends TableCellBase {
	popinRef!: HTMLElement;

	onBeforeRendering() {
		super.onBeforeRendering();
		if (this.horizontalAlign) {
			this.style.justifyContent = this.horizontalAlign;
		} else if (this._individualSlot) {
			this.style.justifyContent = `var(--horizontal-align-${this._individualSlot})`;
		}
	}

	onAfterRendering(): void {
		if (this._popin && this.popinRef) {
			if (!this.popinRef.hasChildNodes()) {
				this._popinHeaderNodes.forEach(popinNode => {
					this.popinRef.append(popinNode);
				});
			}
		}
	}

	captureRef(ref: HTMLElement | null) {
		if (ref) {
			this.popinRef = ref;
		}
	}

	get _headerCell() {
		const row = this.parentElement as TableRow;
		const table = row.parentElement as Table;
		const index = row.cells.indexOf(this);
		return table.headerRow[0].cells[index];
	}

	get _popinHeaderNodes() {
		const nodes = [];
		const headerCell = this._headerCell;
		if (headerCell.popinText) {
			nodes.push(headerCell.popinText);
		} else {
			nodes.push(...this._headerCell.content.map(node => node.cloneNode(true)));
		}
		if (headerCell.action[0]) {
			nodes.push(headerCell.action[0].cloneNode(true));
		}
		return nodes;
	}

	get _i18nPopinColon() {
		return TableCellBase.i18nBundle.getText(LABEL_COLON);
	}
}

TableCell.define();

export default TableCell;
