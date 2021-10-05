import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import { isIE } from "@ui5/webcomponents-base/dist/Device.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import debounce from "@ui5/webcomponents-base/dist/util/debounce.js";
import isElementInView from "@ui5/webcomponents-base/dist/util/isElementInView.js";
import TableGrowingMode from "./types/TableGrowingMode.js";
import BusyIndicator from "./BusyIndicator.js";
import TableMode from "./types/TableMode.js";

// Texts
import {
	LOAD_MORE_TEXT,
	ARIA_LABEL_SELECT_ALL_CHECKBOX,
	TABLE_HEADER_ROW_TEXT,
	TABLE_ROW_POSITION,
} from "./generated/i18n/i18n-defaults.js";

// Template
import TableTemplate from "./generated/templates/TableTemplate.lit.js";

// Styles
import styles from "./generated/themes/Table.css.js";

const GROWING_WITH_SCROLL_DEBOUNCE_RATE = 250; // ms

/**
 * @public
 */
const metadata = {
	tag: "ui5-table",
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.Table.prototype */ {

		/**
		 * Defines the component rows.
		 * <br><br>
		 * <b>Note:</b> Use <code>ui5-table-row</code> for the intended design.
		 *
		 * @type {sap.ui.webcomponents.main.ITableRow[]}
		 * @slot rows
		 * @public
		 */
		"default": {
			propertyName: "rows",
			type: HTMLElement,
			individualSlots: true,
		},

		/**
		 * Defines the configuration for the columns of the component.
		 * <br><br>
		 * <b>Note:</b> Use <code>ui5-table-column</code> for the intended design.
		 *
		 * @type {sap.ui.webcomponents.main.ITableColumn[]}
		 * @slot
		 * @public
		 */
		columns: {
			type: HTMLElement,
			individualSlots: true,
			invalidateOnChildChange: {
				properties: true,
				slots: false,
			},
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.Table.prototype */ {

		/**
		 * Defines the text that will be displayed when there is no data and <code>hideNoData</code> is not present.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		noDataText: {
			type: String,
		},

		/**
		 * Defines the text that will be displayed inside the growing button at the bottom of the table,
		 * meant for loading more rows upon press.
		 *
		 * <br><br>
		 * <b>Note:</b> If not specified a built-in text will be displayed.
		 * <br>
		 * <b>Note:</b> This property takes effect if <code>growing</code> is set to <code>Button</code>.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @since 1.0.0-rc.15
		 * @public
		 */
		growingButtonText: {
			type: String,
		},

		/**
		 * Defines the subtext that will be displayed under the <code>growingButtonText</code>.
		 *
		 * <br><br>
		 * <b>Note:</b> This property takes effect if <code>growing</code> is set to <code>Button</code>.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @since 1.0.0-rc.15
		 * @public
		 */
		 growingButtonSubtext: {
			type: String,
		},

		/**
		 * Defines if the value of <code>noDataText</code> will be diplayed when there is no rows present in the table.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.15
		 */
		hideNoData: {
			type: Boolean,
		},

		/**
		 * Defines whether the table will have growing capability either by pressing a <code>More</code> button,
		 * or via user scroll. In both cases <code>load-more</code> event is fired.
		 * <br><br>
		 *
		 * Available options:
		 * <br><br>
		 * <code>Button</code> - Shows a <code>More</code> button at the bottom of the table, pressing of which triggers the <code>load-more</code> event.
		 * <br>
		 * <code>Scroll</code> - The <code>load-more</code> event is triggered when the user scrolls to the bottom of the table;
		 * <br>
		 * <code>None</code> (default) - The growing is off.
		 * <br><br>
		 *
		 * <b>Limitations:</b> <code>growing="Scroll"</code> is not supported for Internet Explorer,
		 * and the component will fallback to <code>growing="Button"</code>.
		 * @type {TableGrowingMode}
		 * @defaultvalue "None"
		 * @since 1.0.0-rc.12
		 * @public
		 */
		growing: {
			type: TableGrowingMode,
			defaultValue: TableGrowingMode.None,
		},

		/**
		 * Defines if the table is in busy state.
		 * <b>
		 *
		 * In this state the component's opacity is reduced
		 * and busy indicator is displayed at the bottom of the table.
		 * @type {boolean}
		 * @defaultvalue false
		 * @since 1.0.0-rc.12
		 * @public
		*/
		busy: {
			type: Boolean,
		},

		/**
		 * Defines the delay in milliseconds, after which the busy indicator will show up for this component.
		 *
		 * @type {Integer}
		 * @defaultValue 1000
		 * @public
		 */
		busyDelay: {
			type: Integer,
			defaultValue: 1000,
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

		/**
		 * Defines the mode of the component.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>MultiSelect</code></li>
		 * <li><code>SingleSelect</code></li>
		 * <li><code>None</code></li>
		 * <ul>
		 * @type {TableMode}
		 * @defaultvalue "None"
		 * @since 1.0.0-rc.15
		 * @public
		 */
		mode: {
			type: TableMode,
			defaultValue: TableMode.None,
		},

		_hiddenColumns: {
			type: Object,
			multiple: true,
		},

		_noDataDisplayed: {
			type: Boolean,
		},

		/**
		 * Defines the active state of the <code>More</code> button.
		 * @private
		 */
		_loadMoreActive: {
			type: Boolean,
		},

		/**
		 * Used to represent the table column header for the purpose of the item navigation as it does not work with DOM objects directly
		 * @private
		 */
		_columnHeader: {
			type: Object,
		},

		/**
		 * Defines if the entire table is in view port.
		 * @private
		 */
		_inViewport: {
			type: Boolean,
		},

		/**
		 * Defines whether all rows are selected or not when table is in MultiSelect mode.
		 * @type {Boolean}
		 * @defaultvalue false
		 * @since 1.0.0-rc.15
		 * @private
		 */
		_allRowsSelected: {
			type: Boolean,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Table.prototype */ {
		/**
		 * Fired when a row in <code>Active</code> mode is clicked or <code>Enter</code> key is pressed.
		 *
		 * @event sap.ui.webcomponents.main.Table#row-click
		 * @param {HTMLElement} row the activated row.
		 * @public
		 */
		"row-click": {
			detail: {
				row: { type: HTMLElement },
			},
		},

		/**
		 * Fired when <code>ui5-table-column</code> is shown as a pop-in instead of hiding it.
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

		/**
		 * Fired when the user presses the <code>More</code> button or scrolls to the table's end.
		 * <br><br>
		 *
		 * <b>Note:</b> The event will be fired if <code>growing</code> is set to <code>Button</code> or <code>Scroll</code>.
		 * @event sap.ui.webcomponents.main.Table#load-more
		 * @public
		 * @since 1.0.0-rc.11
		 */
		"load-more": {},

		/**
		 * Fired when selection is changed by user interaction
		 * in <code>SingleSelect</code> and <code>MultiSelect</code> modes.
		 *
		 * @event sap.ui.webcomponents.main.Table#selection-change
		 * @param {Array} selectedRows An array of the selected rows.
		 * @param {Array} previouslySelectedRows An array of the previously selected rows.
		 * @public
		 * @since 1.0.0-rc.15
		 */
		"selection-change": {
			detail: {
				selectedRows: { type: Array },
				previouslySelectedRows: { type: Array },
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
 * <h3>Selection</h3>
 * To benefit from the selection mechanism of <code>ui5-table</code> component, you can use the available selection modes:
 * <code>SingleSelect</code> and <code>MultiSelect</code>.
 * <br>
 * In additition to the used mode, you can also specify the <code>ui5-table-row</code> type choosing between
 * <code>Active</code> or <code>Inactive</code>.
 * <br><br>
 * In <code>SingleSelect</code> mode, you can select both an <code>Active</code> and <code>Inactive</code> row via mouse or
 * by pressing the <code>Space</code> or <code>Enter</code> keys.
 * <br>
 * In <code>MultiSelect</code> mode, you can select both an <code>Active</code> and <code>Inactive</code> row by pressing the
 * <code>Space</code> key when a row is on focus or via mouse click over the selection checkbox of the row.
 * In order to select all the available rows at once, you can use the selection checkbox presented in the table's header.
 * <br><br>
 * <b>Note:</b> Currently, when a column is shown as a pop-in, the visual indication for selection is not presented over it.
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
 * @appenddocs TableColumn TableRow TableGroupRow TableCell
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

	static get dependencies() {
		return [BusyIndicator];
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();

		// The ItemNavigation requires each item to 1) have a "_tabIndex" property and 2) be either a UI5Element, or have an id property (to find it in the component's shadow DOM by)
		this._columnHeader = {
			id: `${this._id}-columnHeader`,
			_tabIndex: "0",
		};

		this._itemNavigation = new ItemNavigation(this, {
			navigationMode: NavigationMode.Vertical,
			affectedPropertiesNames: ["_columnHeader"],
			getItemsCallback: () => [this._columnHeader, ...this.rows],
		});

		this.fnOnRowFocused = this.onRowFocused.bind(this);

		this._handleResize = this.popinContent.bind(this);

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");

		this.tableEndObserved = false;
		this.addEventListener("ui5-selection-requested", this._handleSelect.bind(this));
	}

	onBeforeRendering() {
		const columnSettings = this.getColumnPropagationSettings();
		const columnSettingsString = JSON.stringify(columnSettings);
		const rowsCount = this.rows.length;

		this.rows.forEach((row, index) => {
			if (row._columnsInfoString !== columnSettingsString) {
				row._columnsInfo = columnSettings;
				row._columnsInfoString = JSON.stringify(row._columnsInfo);
			}

			row._ariaPosition = this.i18nBundle.getText(TABLE_ROW_POSITION, index + 1, rowsCount);
			row._busy = this.busy;
			row.removeEventListener("ui5-_focused", this.fnOnRowFocused);
			row.addEventListener("ui5-_focused", this.fnOnRowFocused);
			row.mode = this.mode;
		});

		this.visibleColumns = this.columns.filter((column, index) => {
			column.sticky = this.stickyColumnHeader;
			return !this._hiddenColumns[index];
		});

		this._noDataDisplayed = !this.rows.length && !this.hideNoData;
		this.visibleColumnsCount = this.visibleColumns.length;
	}

	onAfterRendering() {
		if (this.growsOnScroll) {
			this.observeTableEnd();
		}

		this.checkTableInViewport();
	}

	onEnterDOM() {
		if (!isIE()) {
			this.growingIntersectionObserver = this.getIntersectionObserver();
		}

		ResizeHandler.register(this.getDomRef(), this._handleResize);
	}

	onExitDOM() {
		ResizeHandler.deregister(this.getDomRef(), this._handleResize);

		if (!isIE()) {
			this.growingIntersectionObserver.disconnect();
			this.growingIntersectionObserver = null;
			this.tableEndObserved = false;
		}
	}

	onRowFocused(event) {
		this._itemNavigation.setCurrentItem(event.target);
	}

	_onColumnHeaderClick(event) {
		this.getColumnHeader().focus();
		this._itemNavigation.setCurrentItem(this._columnHeader);
	}

	_onLoadMoreKeydown(event) {
		if (isSpace(event)) {
			event.preventDefault();
			this._loadMoreActive = true;
		}

		if (isEnter(event)) {
			this._onLoadMoreClick();
			this._loadMoreActive = true;
		}
	}

	_onLoadMoreKeyup(event) {
		if (isSpace(event)) {
			this._onLoadMoreClick();
		}
		this._loadMoreActive = false;
	}

	_onLoadMoreClick() {
		this.fireEvent("load-more");
	}

	observeTableEnd() {
		if (!this.tableEndObserved) {
			this.getIntersectionObserver().observe(this.tableEndDOM);
			this.tableEndObserved = true;
		}
	}

	onInteresection(entries) {
		if (entries.some(entry => entry.isIntersecting)) {
			debounce(this.loadMore.bind(this), GROWING_WITH_SCROLL_DEBOUNCE_RATE);
		}
	}

	loadMore() {
		this.fireEvent("load-more");
	}

	_handleSingleSelect(event) {
		const row = this.getRowParent(event.target);
		if (!row.selected) {
			const previouslySelectedRows = this.selectedRows;
			this.rows.forEach(item => {
				if (item.selected) {
					item.selected = false;
				}
			});
			row.selected = true;
			this.fireEvent("selection-change", {
				selectedRows: [row],
				previouslySelectedRows,
			});
		}
	}

	_handleMultiSelect(event) {
		const row = this.getRowParent(event.target);
		const previouslySelectedRows = this.selectedRows;

		row.selected = !row.selected;

		const selectedRows = this.selectedRows;

		if (selectedRows.length === this.rows.length) {
			this._allRowsSelected = true;
		} else {
			this._allRowsSelected = false;
		}

		this.fireEvent("selection-change", {
			selectedRows,
			previouslySelectedRows,
		});
	}

	_handleSelect(event) {
		this[`_handle${this.mode}`](event);
	}

	_selectAll(event) {
		const bAllSelected = event.target.checked;
		const previouslySelectedRows = this.rows.filter(row => row.selected);

		this._allRowsSelected = bAllSelected;

		this.rows.forEach(row => {
			row.selected = bAllSelected;
		});

		const selectedRows = bAllSelected ? this.rows : [];

		this.fireEvent("selection-change", {
			selectedRows,
			previouslySelectedRows,
		});
	}

	getRowParent(child) {
		const parent = child.parentElement;

		if (child.hasAttribute("ui5-table-row")) {
			return child;
		}

		if (parent && parent.hasAttribute("ui5-table-row")) {
			return parent;
		}

		this.getRowParent(parent);
	}

	getColumnHeader() {
		return this.getDomRef() && this.getDomRef().querySelector(`#${this._id}-columnHeader`);
	}

	handleResize(event) {
		this.checkTableInViewport();
		this.popinContent(event);
	}

	checkTableInViewport() {
		this._inViewport = isElementInView(this.getDomRef());
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
			if (!this.isMultiSelect) {
				this.columns[visibleColumnsIndexes[0]].first = true;
			}
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
				text: column.textContent,
				popinText: column.popinText,
				visible: !this._hiddenColumns[index],
			};
		}, this);
	}

	getIntersectionObserver() {
		if (!this.growingIntersectionObserver) {
			this.growingIntersectionObserver = new IntersectionObserver(this.onInteresection.bind(this), {
				root: document,
				rootMargin: "0px",
				threshold: 1.0,
			});
		}

		return this.growingIntersectionObserver;
	}

	get styles() {
		return {
			busy: {
				position: this.busyIndPosition,
			},
		};
	}

	get growsWithButton() {
		if (isIE()) {
			// On IE fallback to "More" button, even if growing of type "Scroll" is set.
			return this.growing === TableGrowingMode.Button || this.growing === TableGrowingMode.Scroll;
		}

		return this.growing === TableGrowingMode.Button;
	}

	get growsOnScroll() {
		return !isIE() && this.growing === TableGrowingMode.Scroll;
	}

	get _growingButtonText() {
		return this.growingButtonText || this.i18nBundle.getText(LOAD_MORE_TEXT);
	}

	get ariaLabelText() {
		const headerRowText = this.i18nBundle.getText(TABLE_HEADER_ROW_TEXT);
		const columnsTitle = this.columns.map(column => {
			return column.textContent.trim();
		}).join(" ");

		return `${headerRowText} ${columnsTitle}`;
	}

	get ariaLabelSelectAllText() {
		return this.i18nBundle.getText(ARIA_LABEL_SELECT_ALL_CHECKBOX);
	}

	get loadMoreAriaLabelledBy() {
		if (this.moreDataText) {
			return `${this._id}-growingButton-text ${this._id}-growingButton-subtext`;
		}

		return `${this._id}-growingButton-text`;
	}

	get tableEndDOM() {
		return this.shadowRoot.querySelector(".ui5-table-end-marker");
	}

	get busyIndPosition() {
		if (isIE()) {
			return "absolute";
		}

		return this._inViewport ? "absolute" : "sticky";
	}

	get isMultiSelect() {
		return this.mode === "MultiSelect";
	}

	get selectedRows() {
		return this.rows.filter(row => row.selected);
	}
}

Table.define();

export default Table;
