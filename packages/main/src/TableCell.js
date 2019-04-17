import WebComponent from "@ui5/webcomponents-base/src/WebComponent";
import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap";
import { addCustomCSS } from "@ui5/webcomponents-base/src/theming/CustomStyle";
import TableCellRenderer from "./build/compiled/TableCellRenderer.lit";

// Styles
import styles from "./themes/TableCell.css";

addCustomCSS("ui5-table-cell", "sap_fiori_3", styles);
addCustomCSS("ui5-table-cell", "sap_belize", styles);
addCustomCSS("ui5-table-cell", "sap_belize_hcb", styles);

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

Bootstrap.boot().then(_ => {
	TableCell.define();
});

export default TableCell;
