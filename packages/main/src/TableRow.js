import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap.js";
import TableCell from "./TableCell.js";
import TableRowRenderer from "./build/compiled/TableRowRenderer.lit.js";

// Styles
import styles from "./themes/TableRow.css.js";

// all themes should work via the convenience import (inlined now, switch to json when elements can be imported individyally)
import "./ThemePropertiesProvider.js";

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

	static get renderer() {
		return TableRowRenderer;
	}

	static get calculateTemplateContext() {
		return state => {
			const context = {
				ctr: state,
				visibleCells: [],
				popinCells: [],
				columnInfo: state._columnsInfo,
				classes: {
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
				},
				styles: {
					main: {
						"grid-template-columns": "",
					},
					popin: {
						"grid-column-end": 6,
					},
				},
			};

			this.calculateCellsStyles(context);

			context.visibleColumnLength = context.visibleCells.length + 1;


			return context;
		};
	}

	static calculateCellsStyles(context) {
		context.columnInfo.forEach((info, index) => {
			if (info.visible) {
				// width of cells
				context.styles.main["grid-template-columns"] += `minmax(0, ${info.width || "1fr"}) `;

				context.visibleCells.push(context.ctr.cells[index]);

				context.ctr.cells[index]._firstInRow = (index === 0);
			} else if (info.demandPopin) {
				context.popinCells.push({
					cell: context.ctr.cells[index],
					popinText: info.popinText,
				});
			}
		}, this);

		const lastVisibleCell = context.visibleCells[context.visibleCells.length - 1];

		if (lastVisibleCell) {
			lastVisibleCell._lastInRow = true;
		}
	}

	onfocusin(event) {
		this.fireEvent("_focused", event);
	}
}

Bootstrap.boot().then(_ => {
	TableRow.define();
});

export default TableRow;
