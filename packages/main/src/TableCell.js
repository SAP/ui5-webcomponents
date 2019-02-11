import WebComponent from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent";
import Core from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Core";
import ShadowDOM from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/compatibility/ShadowDOM";
import TableCellRenderer from "./build/compiled/TableCellRenderer.lit";

// Styles
import belize from "./themes/sap_belize/TableCell.less";
import belizeHcb from "./themes/sap_belize_hcb/TableCell.less";
import fiori3 from "./themes/sap_fiori_3/TableCell.less";

ShadowDOM.registerStyle("sap_belize", "TableCell.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "TableCell.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "TableCell.css", fiori3);

/**
 * @public
 */
const metadata = {
	tag: "ui5-table-cell",
	styleUrl: [
		"TableCell.css",
	],
	slots: /** @lends sap.ui.webcomponents.main.TableCell.prototype */ {
		/**
		 * Specifies the content of the <code>ui5-table-cell</code>.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		content: {
			type: HTMLElement,
			multiple: true,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.TableCell.prototype */ {

		_firstInRow: {
			type: Boolean,
			defaultValue: false,
		},
		_lastInRow: {
			type: Boolean,
			defaultValue: false,
		},
		_hasBorder: {
			type: Boolean,
			defaultValue: false,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.TableCell.prototype */ {
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-table-cell</code> component defines the structure of the data in a single <code>ui5-table</code> cell.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.TableCell
 * @extends sap.ui.webcomponents.base.WebComponent
 * @tagname ui5-table-cell
 * @public
 */
class TableCell extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return TableCellRenderer;
	}

	static calculateTemplateContext(state) {
		const context = {
			ctr: state,
			classes: {
				main: {
					sapWCTableCell: true,
					sapWCTableCellFirst: state._firstInRow,
					sapWCTableCellLast: state._lastInRow,
					sapWCTableCellWithBorder: state._hasBorder,
				},
			},
			styles: {
				main: {
				},
			},
		};

		return context;
	}
}

Core.boot().then(_ => {
	TableCell.define();
});

export default TableCell;
