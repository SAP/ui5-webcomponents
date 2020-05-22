import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import TableCellTemplate from "./generated/templates/TableCellTemplate.lit.js";

// Styles
import styles from "./generated/themes/TableCell.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-table-cell",
	slots: /** @lends sap.ui.webcomponents.main.TableCell.prototype */ {
		/**
		 * Specifies the content of the <code>ui5-table-cell</code>.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.TableCell.prototype */ {

		/**
		 * @private
		 */
		firstInRow: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		lastInRow: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		popined: {
			type: Boolean,
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

	static get render() {
		return litRender;
	}

	static get template() {
		return TableCellTemplate;
	}
}

TableCell.define();

export default TableCell;
