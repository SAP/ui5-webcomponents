import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import litRender from "@ui5/webcomponents-base/src/renderer/LitRenderer.js";
import TableCell from "./TableCell.js";
import TableRowTemplate from "./build/compiled/TableRowTemplate.lit.js";

// Styles
import styles from "./themes/TableRow.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-table-row",
	defaultSlot: "cells",
	slots: /** @lends sap.ui.webcomponents.main.TableRow.prototype */ {
		/**
		 * Defines the cells of the <code>ui5-table-row</code>.
		 * <br><b>Note:</b> Only <code>ui5-table-cell</code> is allowed.
		 *
		 * @type {TableCell[]}
		 * @slot
		 * @public
		 */
		cells: {
			type: TableCell,
			multiple: true,
			individualSlots: true,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.TableRow.prototype */ {
		_columnsInfo: {
			type: Object,
			multiple: true,
			deepEqual: true,
		},
		_tabIndex: {
			type: String,
			defaultValue: "-1",
		},
	},
	events: /** @lends sap.ui.webcomponents.main.TableRow.prototype */ {
		_focused: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-table-row</code> component represents a row in the <code>ui5-table</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.TableRow
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-table-row
 * @public
 */
class TableRow extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return styles;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return TableRowTemplate;
	}

	onBeforeRendering() {
		this.visibleCells = [];
		this.popinCells = [];

		this._columnsInfo.forEach((info, index) => {
			if (info.visible) {
				this.visibleCells.push(this.cells[index]);
				this.cells[index]._firstInRow = (index === 0);
			} else if (info.demandPopin) {
				this.popinCells.push({
					cell: this.cells[index],
					popinText: info.popinText,
				});
			}
		}, this);

		this.visibleColumnLength = this.visibleCells.length + 1;

		const lastVisibleCell = this.visibleCells[this.visibleCells.length - 1];

		if (lastVisibleCell) {
			lastVisibleCell._lastInRow = true;
		}
	}

	get classes() {
		return {
			main: {
				sapWCTableRow: true,
				sapWCTableRowWithBorder: true,
			},
			popin: {
				sapWCTablePopinRow: true,
			},
			popinTitle: {
				sapWCTablePopinTitle: true,
			},
			cellWrapper: {
				sapMWCTableRowCellContainer: true,
			},
		};
	}

	get styles() {
		const gridTemplateColumns = this._columnsInfo.reduce((acc, info) => {
			return info.visible ? `${acc}minmax(0, ${info.width || "1fr"}) ` : acc;
		}, "");

		return {
			main: {
				"grid-template-columns": gridTemplateColumns,
			},
			popin: {
				"grid-column-end": 6,
			},
		};
	}

	onfocusin(event) {
		this.fireEvent("_focused", event);
	}
}

TableRow.define();

export default TableRow;
