import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ITableRow from "./ITableRow.js";
import ITableCell from "./ITableCell.js";
import TableRowTemplate from "./generated/templates/TableRowTemplate.lit.js";

// Styles
import styles from "./generated/themes/TableRow.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-table-row",
	"implements": [ITableRow],
	slots: /** @lends sap.ui.webcomponents.main.TableRow.prototype */ {
		/**
		 * Defines the cells of the <code>ui5-table-row</code>.
		 * <br><b>Note:</b> Currently only <code>ui5-table-cell</code> implements the <code>ITableCell</code> interface.
		 *
		 * @type {ITableCell[]}
		 * @slot
		 * @public
		 */
		"default": {
			propertyName: "cells",
			type: ITableCell,
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

		if (this.cells.length === 0) {
			return;
		}

		this._columnsInfo.forEach((info, index) => {
			if (info.visible) {
				this.visibleCells.push(this.cells[index]);
				this.cells[index].firstInRow = (index === 0);
				this.cells[index].popined = false;
			} else if (info.demandPopin) {
				this.popinCells.push({
					cell: this.cells[index],
					popinText: info.popinText,
				});

				this.cells[index].popined = true;
			} else {
				this.cells[index].popined = false;
			}
		}, this);

		const lastVisibleCell = this.visibleCells[this.visibleCells.length - 1];

		if (lastVisibleCell) {
			lastVisibleCell.lastInRow = true;
		}
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

	get visibleCellsCount() {
		return this.visibleCells.length;
	}

	onfocusin(event) {
		this.fireEvent("_focused", event);
	}
}

TableRow.define();

export default TableRow;
