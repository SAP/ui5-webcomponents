import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import litRender from "@ui5/webcomponents-base/src/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/src/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/src/delegate/ItemNavigation.js";
import { isSpace } from "@ui5/webcomponents-base/src/events/PseudoEvents.js";
import { getCompactSize } from "@ui5/webcomponents-base/src/Configuration.js";
import TableColumn from "./TableColumn.js";
import TableRow from "./TableRow.js";
import TableTemplate from "./build/compiled/TableTemplate.lit.js";

// Styles
import styles from "./themes/Table.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-table",
	slots: /** @lends sap.ui.webcomponents.main.Table.prototype */ {

		/**
		 * Defines the <code>ui5-table</code> rows.
		 * <br><b>Note:</b> Only <code>ui5-table-row</code> is allowed.
		 *
		 * @type {TableRow[]}
		 * @slot
		 * @public
		 */
		rows: {
			type: TableRow,
			multiple: true,
			individualSlots: true,
		},

		/**
		 * Defines the configuration for the columns of the <code>ui5-table</code>.
		 * <br><b>Note:</b> Only <code>ui5-table-column</code> is allowed.
		 *
		 * @type {TableColumn[]}
		 * @slot
		 * @public
		 */
		columns: {
			type: TableColumn,
			multiple: true,
			individualSlots: true,
			listenFor: { exclude: ["header"] },
		},
	},
	defaultSlot: "rows",
	properties: /** @lends sap.ui.webcomponents.main.Table.prototype */ {

		/**
		 * Defines the text that will be displayed when there is no data and <code>showNoData</code> is present.
		 *
		 * @type {string}
		 * @defaultvalue: ""
		 * @public
		 */
		noDataText: {
			type: String,
		},

		/**
		 * Defines if the value of <code>noDataText</code> will be diplayed when there is no rows present in the table.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		showNoData: {
			type: Boolean,
		},
		/**
		 * Determines whether the column headers remain fixed at the top of the page during
		 * vertical scrolling as long as the Web Component is in the viewport.
		 * <br><br>
		 * <b>Limitations:</b>
		 * <ul>
		 * <li>Browsers that do not support this feature:
		 * <ul>
		 * <li>Internet Explorer</li>
		 * <li>Microsoft Edge lower than version 41 (EdgeHTML 16)</li>
		 * <li>Mozilla Firefox lower than version 59</li>
		 * </ul></li>
		 * <li>Scrolling behavior:
		 * <ul>
		 * <li>If the Web Component is placed in layout containers that have the <code>overflow: hidden</code>
		 * or <code>overflow: auto</code> style definition, this can
		 * prevent the sticky elements of the Web Component from becoming fixed at the top of the viewport.</li>
		 * </ul></li>
		 * </ul>
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		stickyColumnHeader: {
			type: Boolean,
		},

		_hiddenColumns: {
			type: Object,
			multiple: true,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Table.prototype */ {
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-table</code> component provides a set of sophisticated and convenient functions for responsive table design.
 * It provides a comprehensive set of features for displaying and dealing with vast amounts of data.
 * <br><br>
 * To render the <code>Table</code> properly, the order of the <code>columns</code> should match with the
 * order of the item <code>cells</code> in the <code>rows</code>.
 * <br><br>
 * Desktop and tablet devices are supported.
 * On tablets, special consideration should be given to the number of visible columns
 * and rows due to the limited performance of some devices.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Table";</code>
 * <br>
 * <b>Note:</b> This also includes the <code>ui5-table-column</code>, <code>ui5-table-row</code> and <code>ui5-table-cell</code> Web Components.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Table
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-table
 * @appenddocs TableColumn TableRow TableCell
 * @public
 */
class Table extends UI5Element {
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
		return TableTemplate;
	}

	constructor() {
		super();

		this._itemNavigation = new ItemNavigation(this);

		this._itemNavigation.getItemsCallback = function getItemsCallback() {
			return this.rows;
		}.bind(this);

		this._delegates.push(this._itemNavigation);

		this.fnOnRowFocused = this.onRowFocused.bind(this);
	}

	onBeforeRendering() {
		const columnSettings = this.getColumnPropagationSettings();

		this._itemNavigation.init();

		this.rows.forEach(row => {
			row._columnsInfo = columnSettings;
			row.removeEventListener("ui5-_focused", this.fnOnRowFocused);
			row.addEventListener("ui5-_focused", this.fnOnRowFocused);
		});

		this.visibleColumns = this.columns.filter((column, index) => {
			return !this._hiddenColumns[index];
		});
	}

	onEnterDOM() {
		ResizeHandler.register(this.getDomRef(), this.popinContent.bind(this));
	}

	onExitDOM() {
		ResizeHandler.deregister(this.getDomRef(), this.popinContent.bind(this));
	}

	onRowFocused(event) {
		this._itemNavigation.update(event.target);
	}

	onkeydown(event) {
		if (isSpace(event)) {
			event.preventDefault();
		}
	}

	popinContent(_event) {
		const clientRect = this.getDomRef().getBoundingClientRect();
		const tableWidth = clientRect.width;
		const hiddenColumns = [];
		const visibleColumnsIndexes = [];

		// store the hidden columns
		this.columns.forEach((column, index) => {
			if (tableWidth < column.minWidth && column.minWidth !== Infinity) {
				hiddenColumns[index] = {
					index,
					popinText: column.popinText,
					demandPopin: column.demandPopin,
				};
			} else {
				visibleColumnsIndexes.push(index);
			}
		});

		if (visibleColumnsIndexes.length) {
			this.columns[visibleColumnsIndexes[0]]._first = true;
			this.columns[visibleColumnsIndexes[visibleColumnsIndexes.length - 1]]._last = true;
		}

		// invalidate only if hidden columns count has changed
		if (this._hiddenColumns.length !== hiddenColumns.length) {
			this._hiddenColumns = hiddenColumns;
		}
	}

	/**
	 * Gets settings to be propagated from columns to rows.
	 *
	 * @returns {object}
	 * @memberof Table
	 */
	getColumnPropagationSettings() {
		return this.columns.map((column, index) => {
			return {
				index,
				width: column.width,
				minWidth: column.minWidth,
				demandPopin: column.demandPopin,
				popinText: column.popinText,
				visible: !this._hiddenColumns[index],
			};
		}, this);
	}

	get classes() {
		return {
			main: {
				sapWCTableHeader: true,
				sapUiSizeCompact: getCompactSize(),
			},
			columns: {
				sapWCTableColumnWrapper: true,
			},
		};
	}

	get styles() {
		const gridTemplateColumns = this.visibleColumns.reduce((acc, column) => {
			return `${acc}minmax(0, ${column.width || "1fr"}) `;
		}, "");

		return {
			main: {
				"grid-template-columns": gridTemplateColumns,
				position: this.stickyColumnHeader ? "sticky" : "",
				top: this.stickyColumnHeader ? "0px" : "",
				"z-index": this.stickyColumnHeader ? "1" : "",
			},
		};
	}
}

Table.define();

export default Table;
