import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap.js";
import TableCellRenderer from "./build/compiled/TableCellRenderer.lit.js";

// Styles
import styles from "./themes/TableCell.css.js";

// all themes should work via the convenience import (inlined now, switch to json when elements can be imported individyally)
import "./ThemePropertiesProvider.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-table-cell",
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
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-table-cell
 * @public
 */
class TableCell extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return styles;
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
