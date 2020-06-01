import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import TableTemplate from "./generated/templates/TableTemplate.lit.js";

// Styles
import styles from "./generated/themes/Table.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-table",
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.Table.prototype */ {

		/**
		 * Defines the <code>ui5-table</code> rows.
		 * <br><br>
		 * <b>Note:</b> Use <code>ui5-table-row</code> for the intended design.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		"default": {
			propertyName: "rows",
			type: HTMLElement,
			individualSlots: true,
		},

		/**
		 * Defines the configuration for the columns of the <code>ui5-table</code>.
		 * <br><br>
		 * <b>Note:</b> Use <code>ui5-table-column</code> for the intended design.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		columns: {
			type: HTMLElement,
			individualSlots: true,
			listenFor: { include: ["*"] },
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.Table.prototype */ {

		/**
		 * Defines the text that will be displayed when there is no data and <code>showNoData</code> is present.
		 *
		 * @type {string}
		 * @defaultvalue ""
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
		 * </ul>
		 * </li>
		 * <li>Scrolling behavior:
		 * <ul>
		 * <li>If the Web Component is placed in layout containers that have the <code>overflow: hidden</code>
		 * or <code>overflow: auto</code> style definition, this can
		 * prevent the sticky elements of the Web Component from becoming fixed at the top of the viewport.</li>
		 * </ul>
		 * </li>
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

		_noDataDisplayed: {
			type: Boolean,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Table.prototype */ {
		/**
		 * Fired when a row is clicked.
		 *
		 * @event sap.ui.webcomponents.main.Table#row-click
		 * @param {HTMLElement} row the clicked row.
		 * @public
		 */
		"row-click": {
			detail: {
				row: { type: HTMLElement },
			},
		},

		/**
		 * Fired when the <code>ui5-table-column</code> is shown as a pop-in instead of hiding it.
		 *
		 * @event sap.ui.webcomponents.main.Table#popin-change
		 * @param {Array} poppedColumns popped-in columns.
		 * @since 1.0.0-rc.6
		 * @public
		 */
		"popin-change": {
			detail: {
				poppedColumns: {},
			},
		},
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
 * <code>import "@ui5/webcomponents/dist/Table.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents/dist/TableColumn.js";</code> (for <code>ui5-table-column</code>)
 * <br>
 * <code>import "@ui5/webcomponents/dist/TableRow.js";</code> (for <code>ui5-table-row</code>)
 * <br>
 * <code>import "@ui5/webcomponents/dist/TableCell.js";</code> (for <code>ui5-table-cell</code>)
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

		this._itemNavigation = new ItemNavigation(this, {
			navigationMode: NavigationMode.Vertical,
		});

		this._itemNavigation.getItemsCallback = function getItemsCallback() {
			const columnHeader = this.getColumnHeader();
			return columnHeader ? [columnHeader, ...this.rows] : this.rows;
		}.bind(this);

		this.fnOnRowFocused = this.onRowFocused.bind(this);

		this._handleResize = this.popinContent.bind(this);
	}

	onBeforeRendering() {
		const columnSettings = this.getColumnPropagationSettings();
		const columnSettingsString = JSON.stringify(columnSettings);

		this.rows.forEach(row => {
			if (row._columnsInfoString !== columnSettingsString) {
				row._columnsInfo = columnSettings;
				row._columnsInfoString = JSON.stringify(row._columnsInfo);
			}

			row.removeEventListener("ui5-_focused", this.fnOnRowFocused);
			row.addEventListener("ui5-_focused", this.fnOnRowFocused);
		});

		this.visibleColumns = this.columns.filter((column, index) => {
			column.sticky = this.stickyColumnHeader;
			return !this._hiddenColumns[index];
		});

		this._noDataDisplayed = !this.rows.length && this.showNoData;
		this.visibleColumnsCount = this.visibleColumns.length;
	}

	onEnterDOM() {
		ResizeHandler.register(this.getDomRef(), this._handleResize);
	}

	onExitDOM() {
		ResizeHandler.deregister(this.getDomRef(), this._handleResize);
	}

	onRowFocused(event) {
		this._itemNavigation.update(event.target);
	}

	_onColumnHeaderClick(event) {
		this.getColumnHeader().focus();
		this._itemNavigation.update(event.target);
	}

	getColumnHeader() {
		return this.getDomRef() && this.getDomRef().querySelector(`#${this._id}-columnHeader`);
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
			this.columns[visibleColumnsIndexes[0]].first = true;
			this.columns[visibleColumnsIndexes[visibleColumnsIndexes.length - 1]].last = true;
		}

		// invalidate only if hidden columns count has changed
		if (this._hiddenColumns.length !== hiddenColumns.length) {
			this._hiddenColumns = hiddenColumns;
			if (hiddenColumns.length) {
				this.fireEvent("popin-change", {
					poppedColumns: this._hiddenColumns,
				});
			}
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
				minWidth: column.minWidth,
				demandPopin: column.demandPopin,
				popinText: column.popinText,
				visible: !this._hiddenColumns[index],
			};
		}, this);
	}
}

Table.define();

export default Table;
