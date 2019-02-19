import WebComponent from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent";
import Bootstrap from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Bootstrap";
import ShadowDOM from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/compatibility/ShadowDOM";
import TableCell from "./TableCell";
import TableRowRenderer from "./build/compiled/TableRowRenderer.lit";

// Styles
import belize from "./themes/sap_belize/TableRow.less";
import belizeHcb from "./themes/sap_belize_hcb/TableRow.less";
import fiori3 from "./themes/sap_fiori_3/TableRow.less";

ShadowDOM.registerStyle("sap_belize", "TableRow.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "TableRow.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "TableRow.css", fiori3);

/**
 * @public
 */
const metadata = {
	tag: "ui5-table-row",
	styleUrl: [
		"TableRow.css",
	],
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
 * @extends sap.ui.webcomponents.base.WebComponent
 * @tagname ui5-table-row
 * @public
 */
class TableRow extends WebComponent {
	static get metadata() {
		return metadata;
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
