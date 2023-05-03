import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import {
	isTabNext,
	isTabPrevious,
	isSpace,
	isEnter,
	isCtrlA,
	isUpAlt,
	isDownAlt,
	isUpShift,
	isDownShift,
	isHomeCtrl,
	isEndCtrl,
	isHomeShift,
	isEndShift,
} from "@ui5/webcomponents-base/dist/Keys.js";
import getNormalizedTarget from "@ui5/webcomponents-base/dist/util/getNormalizedTarget.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import { getLastTabbableElement, getTabbableElements } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import debounce from "@ui5/webcomponents-base/dist/util/debounce.js";
import isElementInView from "@ui5/webcomponents-base/dist/util/isElementInView.js";
import TableGrowingMode from "./types/TableGrowingMode.js";
import BusyIndicator from "./BusyIndicator.js";
import type {
	TableRowSelectionRequestedEventDetail,
	TableRowF7PressEventDetail,
	TableRowForwardBeforeEventDetail,
	TableRowForwardAfterEventDetail,
} from "./TableRow.js";
import type TableCell from "./TableCell.js";
import type TableColumn from "./TableColumn.js";
import type TableColumnPopinDisplay from "./types/TableColumnPopinDisplay.js";
import TableMode from "./types/TableMode.js";
import CheckBox from "./CheckBox.js"; // Ensure the dependency as it is being used in the renderer

// Texts
import {
	LOAD_MORE_TEXT,
	ARIA_LABEL_SELECT_ALL_CHECKBOX,
	TABLE_HEADER_ROW_INFORMATION,
	TABLE_ROW_POSITION,
} from "./generated/i18n/i18n-defaults.js";

// Template
import TableTemplate from "./generated/templates/TableTemplate.lit.js";

// Styles
import tableStyles from "./generated/themes/Table.css.js";

const GROWING_WITH_SCROLL_DEBOUNCE_RATE = 250; // ms

const PAGE_UP_DOWN_SIZE = 20;

interface ITableRow extends UI5Element {
	mode: TableMode,
	selected: boolean,
	_busy: boolean,
	_tabIndex: string,
	_ariaPosition: string,
	_columnsInfoString: string,
	_columnsInfo: Array<TableColumnInfo>,
	_tabbables: Array<HTMLElement>,
}

type TableColumnInfo = {
	cell?: TableCell,
	index?: number,
	text?: string | null,
	visible?: boolean,
	demandPopin?: boolean,
	popinText?: string,
	popinDisplay?: TableColumnPopinDisplay,
	popinDisplayInline?: boolean,
	classes?: string,
	minWidth?: number,
}

type TableColumnHeaderInfo = ITabbable;

type TableSelectionChangeEvent = {
	selectedRows: Array<ITableRow>,
	previouslySelectedRows: Array<ITableRow>,
}

type TablePopinChangeEvent = {
	poppedColumns: Array<TableColumnInfo>;
}

enum TableFocusTargetElement {
	Row = "tableRow",
	GroupRow = "tableGroupRow",
	ColumnHeader = "columnHeader",
	MoreButton = "moreButton",
}

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
 * <h3>Keyboard Handling</h3>
 *
 * <h4>Fast Navigation</h4>
 * This component provides a build in fast navigation group which can be used via <code>F6 / Shift + F6</code> or <code> Ctrl + Alt(Option) + Down /  Ctrl + Alt(Option) + Up</code>.
 * In order to use this functionality, you need to import the following module:
 * <code>import "@ui5/webcomponents-base/dist/features/F6Navigation.js"</code>
 * <br><br>
 * Furthermore, you can interact with <code>ui5-table</code> via the following keys.
 * <br>
 *
 * <ul>
 * <li>[F7] - If focus is on an interactive control inside an item, moves focus to the corresponding item.</li>
 * <li>[CTRL]+[A] - Selects all items, if MultiSelect mode is enabled.</li>
 * <li>[HOME]/[END] - Focuses the first/last item.</li>
 * <li>[PAGEUP]/[PAGEDOWN] - Moves focus up/down by page size (20 items by default).</li>
 * <li>[ALT]+[DOWN]/[UP] - Switches focus between header, last focused item, and More button (if applies) in either direction.</li>
 * <li>[SHIFT]+[DOWN]/[UP] - Selects the next/previous item in a MultiSelect table, if the current item is selected (Range selection). Otherwise, deselects them (Range deselection).</li>
 * <li>[SHIFT]+[HOME]/[END] - Range selection to the first/last item of the List.</li>
 * <li>[CTRL]+[HOME]/[END] - Same behavior as HOME & END.</li>
 * </ul>
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
 * @alias sap.ui.webc.main.Table
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-table
 * @appenddocs sap.ui.webc.main.TableColumn sap.ui.webc.main.TableRow sap.ui.webc.main.TableGroupRow sap.ui.webc.main.TableCell
 * @public
 */
@customElement({
	tag: "ui5-table",
	fastNavigation: true,
	styles: tableStyles,
	renderer: litRender,
	template: TableTemplate,
	dependencies: [BusyIndicator, CheckBox],
})
/** Fired when a row in <code>Active</code> mode is clicked or <code>Enter</code> key is pressed.
*
* @event sap.ui.webc.main.Table#row-click
* @param {HTMLElement} row the activated row.
* @public
*/
@event("row-click", {
	detail: {
		row: { type: HTMLElement },
	},
})

/**
* Fired when <code>ui5-table-column</code> is shown as a pop-in instead of hiding it.
*
* @event sap.ui.webc.main.Table#popin-change
* @param {Array} poppedColumns popped-in columns.
* @since 1.0.0-rc.6
* @public
*/
@event("popin-change", {
	detail: {
		poppedColumns: {
			type: Array,
		},
	},
})

/**
* Fired when the user presses the <code>More</code> button or scrolls to the table's end.
* <br><br>
*
* <b>Note:</b> The event will be fired if <code>growing</code> is set to <code>Button</code> or <code>Scroll</code>.
* @event sap.ui.webc.main.Table#load-more
* @public
* @since 1.0.0-rc.11
*/
@event("load-more")

/**
* Fired when selection is changed by user interaction
* in <code>SingleSelect</code> and <code>MultiSelect</code> modes.
*
* @event sap.ui.webc.main.Table#selection-change
* @param {Array} selectedRows An array of the selected rows.
* @param {Array} previouslySelectedRows An array of the previously selected rows.
* @public
* @since 1.0.0-rc.15
*/
@event("selection-change", {
	detail: {
		selectedRows: { type: Array },
		previouslySelectedRows: { type: Array },
	},
})
class Table extends UI5Element {
	/**
	 * Defines the text that will be displayed when there is no data and <code>hideNoData</code> is not present.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.Table.prototype.noDataText
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	noDataText!: string;

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
	 * @name sap.ui.webc.main.Table.prototype.growingButtonText
	 * @defaultvalue ""
	 * @since 1.0.0-rc.15
	 * @public
	 */
	@property()
	growingButtonText!: string;

	/**
	 * Defines the subtext that will be displayed under the <code>growingButtonText</code>.
	 *
	 * <br><br>
	 * <b>Note:</b> This property takes effect if <code>growing</code> is set to <code>Button</code>.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.Table.prototype.growingButtonSubtext
	 * @defaultvalue ""
	 * @since 1.0.0-rc.15
	 * @public
	 */
	@property()
	growingButtonSubtext!: string;

	/**
	 * Defines if the value of <code>noDataText</code> will be diplayed when there is no rows present in the table.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.Table.prototype.hideNoData
	 * @defaultvalue false
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property({ type: Boolean })
	hideNoData!: boolean;

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
	 * <b>Restrictions:</b> <code>growing="Scroll"</code> is not supported for Internet Explorer,
	 * and the component will fallback to <code>growing="Button"</code>.
	 * @type {sap.ui.webc.main.types.TableGrowingMode}
	 * @name sap.ui.webc.main.Table.prototype.growing
	 * @defaultvalue "None"
	 * @since 1.0.0-rc.12
	 * @public
	 */
	@property({ type: TableGrowingMode, defaultValue: TableGrowingMode.None })
	growing!: TableGrowingMode;

	/**
	 * Defines if the table is in busy state.
	 * <b>
	 *
	 * In this state the component's opacity is reduced
	 * and busy indicator is displayed at the bottom of the table.
	 * @type {boolean}
	 * @name sap.ui.webc.main.Table.prototype.busy
	 * @defaultvalue false
	 * @since 1.0.0-rc.12
	 * @public
	 */
	@property({ type: Boolean })
	busy!: boolean;

	/**
	 * Defines the delay in milliseconds, after which the busy indicator will show up for this component.
	 *
	 * @type {sap.ui.webc.base.types.Integer}
	 * @name sap.ui.webc.main.Table.prototype.busyDelay
	 * @defaultValue 1000
	 * @public
	 */
	@property({ validator: Integer, defaultValue: 1000 })
	busyDelay!: number;

	/**
	 * Determines whether the column headers remain fixed at the top of the page during
	 * vertical scrolling as long as the Web Component is in the viewport.
	 * <br><br>
	 * <b>Restrictions:</b>
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
	 * @name sap.ui.webc.main.Table.prototype.stickyColumnHeader
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	stickyColumnHeader!: boolean;

	/**
	 * Defines the mode of the component.
	 * <br><br>
	 * Available options are:
	 * <ul>
	 * <li><code>MultiSelect</code></li>
	 * <li><code>SingleSelect</code></li>
	 * <li><code>None</code></li>
	 * <ul>
	 * @type {sap.ui.webc.main.types.TableMode}
	 * @name sap.ui.webc.main.Table.prototype.mode
	 * @defaultvalue "None"
	 * @since 1.0.0-rc.15
	 * @public
	 */
	@property({ type: TableMode, defaultValue: TableMode.None })
	mode!: TableMode;

	/**
	 * Defines the accessible ARIA name of the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.Table.prototype.accessibleName
	 * @defaultvalue: ""
	 * @public
	 * @since 1.3.0
	 */
	@property({ defaultValue: undefined })
	accessibleName?: string;

	/**
	 * Receives id(or many ids) of the elements that label the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.Table.prototype.accessibleNameRef
	 * @defaultvalue ""
	 * @public
	 * @since 1.3.0
	 */
	@property({ defaultValue: "" })
	accessibleNameRef!: string;

	@property({	type: Object, multiple: true })
	_hiddenColumns!: Array<TableColumnInfo>;

	@property({ type: Boolean })
	_noDataDisplayed!: boolean;

	/**
	 * Defines the active state of the <code>More</code> button.
	 * @private
	 */
	@property({ type: Boolean })
	_loadMoreActive!: boolean;

	/**
	 * Used to represent the table column header for the purpose of the item navigation as it does not work with DOM objects directly
	 * @private
	 */
	@property({ type: Object })
	_columnHeader: TableColumnHeaderInfo;

	/**
	 * Defines if the entire table is in view port.
	 * @private
	 */
	@property({ type: Boolean })
	_inViewport!: boolean;

	/**
	 * Defines whether all rows are selected or not when table is in MultiSelect mode.
	 * @type {boolean}
	 * @defaultvalue false
	 * @since 1.0.0-rc.15
	 * @private
	 */
	@property({ type: Boolean })
	_allRowsSelected!: boolean;

	/**
	 * Defines the component rows.
	 * <br><br>
	 * <b>Note:</b> Use <code>ui5-table-row</code> for the intended design.
	 *
	 * @type {sap.ui.webc.main.ITableRow[]}
	 * @name sap.ui.webc.main.Table.prototype.default
	 * @slot rows
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
		individualSlots: true,
		invalidateOnChildChange: true,
	})
	rows!: Array<ITableRow>;

	/**
	 * Defines the configuration for the columns of the component.
	 * <br><br>
	 * <b>Note:</b> Use <code>ui5-table-column</code> for the intended design.
	 *
	 * @type {sap.ui.webc.main.ITableColumn[]}
	 * @name sap.ui.webc.main.Table.prototype.columns
	 * @slot
	 * @public
	 */
	@slot({
		type: HTMLElement,
		individualSlots: true,
		invalidateOnChildChange: {
			properties: true,
			slots: false,
		},
	})
	columns!: Array<TableColumn>;

	static async onDefine() {
		Table.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	static i18nBundle: I18nBundle;

	fnHandleF7: (e: CustomEvent) => void;
	fnOnRowFocused: (e: CustomEvent) => void;
	_handleResize: ResizeObserverCallback;

	moreDataText?: string;
	tableEndObserved: boolean;
	visibleColumns: Array<TableColumn>;
	visibleColumnsCount?: number;
	lastFocusedElement: HTMLElement | null;
	growingIntersectionObserver?: IntersectionObserver | null;

	_forwardingFocus: boolean;
	_prevNestedElementIndex: number;
	_itemNavigation: ItemNavigation;
	_prevFocusedRow?: ITableRow;

	_afterElement?: HTMLElement;
	_beforeElement?: HTMLElement;

	constructor() {
		super();

		this.visibleColumns = []; // template loop should always have a defined array
		// The ItemNavigation requires each item to 1) have a "_tabIndex" property and 2) be either a UI5Element, or have an id property (to find it in the component's shadow DOM by)
		this._columnHeader = {
			id: `${this._id}-columnHeader`,
			_tabIndex: "0",
		};

		this._itemNavigation = new ItemNavigation(this, {
			navigationMode: NavigationMode.Vertical,
			affectedPropertiesNames: ["_columnHeader"],
			getItemsCallback: () => [this._columnHeader, ...this.rows],
			skipItemsSize: PAGE_UP_DOWN_SIZE,
		});

		this._handleResize = this.popinContent.bind(this);
		this.fnOnRowFocused = this.onRowFocused.bind(this);
		this.fnHandleF7 = this._handleF7.bind(this);

		this.tableEndObserved = false;

		// Stores the last focused element within the table.
		this.lastFocusedElement = null;

		// Indicates whether the table is forwarding focus before or after the current table row.
		this._forwardingFocus = false;

		// Stores the last focused nested element index (within a table row) for F7 navigation.
		this._prevNestedElementIndex = 0;
	}

	onBeforeRendering() {
		const columnSettings = this.getColumnPropagationSettings();
		const columnSettingsString = JSON.stringify(columnSettings);
		const rowsCount = this.rows.length + 1;
		const selectedRows = this.selectedRows;

		this.rows.forEach((row, index) => {
			if (row._columnsInfoString !== columnSettingsString) {
				row._columnsInfo = columnSettings;
				row._columnsInfoString = JSON.stringify(row._columnsInfo);
			}

			row._ariaPosition = Table.i18nBundle.getText(TABLE_ROW_POSITION, index + 2, rowsCount);
			row._busy = this.busy;
			row.removeEventListener("ui5-_focused", this.fnOnRowFocused as EventListener);
			row.addEventListener("ui5-_focused", this.fnOnRowFocused as EventListener);
			row.removeEventListener("ui5-f7-pressed", this.fnHandleF7 as EventListener);
			row.addEventListener("ui5-f7-pressed", this.fnHandleF7 as EventListener);
			row.mode = this.mode;
		});

		this.visibleColumns = this.columns.filter((column, index) => {
			return !this._hiddenColumns[index];
		});

		this._noDataDisplayed = !this.rows.length && !this.hideNoData;
		this.visibleColumnsCount = this.visibleColumns.length;

		if (this.isMultiSelect) {
			// we have to count the selection column as well
			this.visibleColumnsCount += 1;
		}

		this._allRowsSelected = selectedRows.length === this.rows.length;

		this._prevFocusedRow = this._prevFocusedRow || this.rows[0];
	}

	onAfterRendering() {
		if (this.growsOnScroll) {
			this.observeTableEnd();
		}

		this.checkTableInViewport();
	}

	onEnterDOM() {
		this.growingIntersectionObserver = this.getIntersectionObserver();

		ResizeHandler.register(this.getDomRef()!, this._handleResize);

		this._itemNavigation.setCurrentItem(this.rows.length ? this.rows[0] : this._columnHeader);
	}

	onExitDOM() {
		ResizeHandler.deregister(this.getDomRef()!, this._handleResize);

		this.growingIntersectionObserver!.disconnect();
		this.growingIntersectionObserver = null;
		this.tableEndObserved = false;
	}

	_onkeydown(e: KeyboardEvent) {
		if (isTabNext(e) || isTabPrevious(e)) {
			this._handleTab(e);
		}

		if (isCtrlA(e)) {
			e.preventDefault();
			this.isMultiSelect && this._selectAll();
		}

		if (isUpAlt(e) || isDownAlt(e)) {
			this._handleArrowAlt(e);
		}

		if ((isUpShift(e) || isDownShift(e)) && this.isMultiSelect) {
			this._handleArrowNav(e);
		}

		if (isHomeCtrl(e)) {
			e.preventDefault();

			this._itemNavigation._handleHome();
			this._itemNavigation._applyTabIndex();
			this._itemNavigation._focusCurrentItem();
		}

		if (isEndCtrl(e)) {
			e.preventDefault();

			this._itemNavigation._handleEnd();
			this._itemNavigation._applyTabIndex();
			this._itemNavigation._focusCurrentItem();
		}

		if ((isHomeShift(e) || isEndShift(e)) && this.isMultiSelect) {
			this._handleHomeEndSelection(e);
		}
	}

	_handleTab(e: KeyboardEvent) {
		const isNext = isTabNext(e);
		const target = getNormalizedTarget(e.target as HTMLElement);
		const targetType: TableFocusTargetElement | undefined = this.getFocusedElementType(e.target as HTMLElement);

		if (this.columnHeaderTabbables.includes(target)) {
			if (isNext && this.columnHeaderLastElement === target) {
				return this._focusNextElement();
			}

			return;
		}

		if (isNext && targetType === TableFocusTargetElement.ColumnHeader && !this.columnHeaderTabbables.length) {
			return this._focusNextElement();
		}

		if (targetType === TableFocusTargetElement.Row || !targetType) {
			return;
		}

		switch (targetType) {
		case TableFocusTargetElement.GroupRow:
			return isNext ? this._focusNextElement() : this._focusForwardElement(false);
		case TableFocusTargetElement.ColumnHeader:
			return !isNext && this._focusForwardElement(false);
		case TableFocusTargetElement.MoreButton:
			if (isNext) {
				this._focusForwardElement(true);
			} else {
				e.preventDefault();
				this.currentElement?.focus();
			}
		}
	}

	_focusNextElement() {
		if (!this.growsWithButton) {
			this._focusForwardElement(true);
		} else {
			this.morеBtn!.focus();
		}
	}

	_handleArrowNav(e: KeyboardEvent) {
		const isRowFocused = this.currentElement!.localName === "tr";

		if (!isRowFocused) {
			return;
		}

		const previouslySelectedRows: Array<ITableRow> = this.selectedRows;
		const currentItem: ITableRow = this.currentItem;
		const currentItemIdx: number = this.currentItemIdx;

		const prevItemIdx = currentItemIdx - 1;
		const nextItemIdx = currentItemIdx + 1;

		const prevItem: ITableRow = this.rows[prevItemIdx];
		const nextItem: ITableRow = this.rows[nextItemIdx];
		const wasSelected = !!currentItem.selected;

		if ((isUpShift(e) && !prevItem) || (isDownShift(e) && !nextItem)) {
			return;
		}

		if (isUpShift(e)) {
			currentItem.selected = currentItem.selected && !prevItem.selected;
			prevItem.selected = currentItem.selected || (wasSelected && !currentItem.selected);
			prevItem.focus();
		}

		if (isDownShift(e)) {
			currentItem.selected = currentItem.selected && !nextItem.selected;
			nextItem.selected = currentItem.selected || (wasSelected && !currentItem.selected);
			nextItem.focus();
		}

		const selectedRows = this.selectedRows;

		this.fireEvent<TableSelectionChangeEvent>("selection-change", {
			selectedRows,
			previouslySelectedRows,
		});
	}

	_handleHomeEndSelection(e: KeyboardEvent) {
		const isRowFocused = this.currentElement!.localName === "tr";

		if (!isRowFocused) {
			return;
		}
		const rows = this.rows;
		const previouslySelectedRows: Array<ITableRow> = this.selectedRows;
		const currentItemIdx = this.currentItemIdx;

		if (isHomeShift(e)) {
			rows.slice(0, currentItemIdx + 1).forEach(item => {
				item.selected = true;
			});
			rows[0].focus();
		}

		if (isEndShift(e)) {
			rows.slice(currentItemIdx).forEach(item => {
				item.selected = true;
			});
			rows[rows.length - 1].focus();
		}

		const selectedRows: Array<ITableRow> = this.selectedRows;

		this.fireEvent<TableSelectionChangeEvent>("selection-change", {
			selectedRows,
			previouslySelectedRows,
		});
	}

	/**
	 * Handles Alt + Up/Down.
	 * Switches focus between column header, last focused item, and "More" button (if applicable).
	 * @private
	 * @param { KeyboardEvent } e
	 */
	_handleArrowAlt(e: KeyboardEvent) {
		const shouldMoveUp: boolean = isUpAlt(e);
		const target = e.target as ITableRow;
		const focusedElementType = this.getFocusedElementType(target);

		if (shouldMoveUp) {
			switch (focusedElementType) {
			case TableFocusTargetElement.Row:
			case TableFocusTargetElement.GroupRow:
				this._prevFocusedRow = target;
				return this._onColumnHeaderClick(e);
			case TableFocusTargetElement.ColumnHeader:
				return this.morеBtn ? this.morеBtn.focus() : this._prevFocusedRow?.focus();
			case TableFocusTargetElement.MoreButton:
				return this._prevFocusedRow ? this._prevFocusedRow.focus() : this._onColumnHeaderClick(e);
			}
		} else {
			switch (focusedElementType) {
			case TableFocusTargetElement.Row:
			case TableFocusTargetElement.GroupRow:
				this._prevFocusedRow = target;
				return this.morеBtn ? this.morеBtn.focus() : this._onColumnHeaderClick(e);
			case TableFocusTargetElement.ColumnHeader:
				if (this._prevFocusedRow) {
					this._prevFocusedRow.focus();
				} else if (this.morеBtn) {
					this.morеBtn.focus();
				}

				return;
			case TableFocusTargetElement.MoreButton:
				return this._onColumnHeaderClick(e);
			}
		}
	}

	/**
	 * Determines the type of the currently focused element.
	 * @private
	 * @param {object} element The DOM element
	 * @returns {("columnHeader"|"tableRow"|"tableGroupRow"|"moreButton")} A string identifier
	 */
	getFocusedElementType(element: HTMLElement): TableFocusTargetElement | undefined {
		if (element === this.columnHeader) {
			return TableFocusTargetElement.ColumnHeader;
		}

		if (element === this.morеBtn) {
			return TableFocusTargetElement.MoreButton;
		}

		if (this.rows.includes(element as ITableRow)) {
			const isGroupRow = element.hasAttribute("ui5-table-group-row");
			return isGroupRow ? TableFocusTargetElement.GroupRow : TableFocusTargetElement.Row;
		}
	}

	/**
	 * Toggles focus between the table row's root and the last focused nested element.
	 * @private
	 * @param { CustomEvent } e "ui5-f7-pressed"
	 */
	_handleF7(e: CustomEvent<TableRowF7PressEventDetail>) {
		const row = e.detail.row;
		row._tabbables = getTabbableElements(row);
		const activeElement = getActiveElement();
		const lastFocusedElement = row._tabbables[this._prevNestedElementIndex] || row._tabbables[0];
		const targetIndex = row._tabbables.indexOf(activeElement as HTMLElement);

		if (!row._tabbables.length) {
			return;
		}

		if (activeElement === row.root) {
			lastFocusedElement.focus();
		} else if (targetIndex > -1) {
			this._prevNestedElementIndex = targetIndex;
			row.root.focus();
		}
	}

	_onfocusin(e: FocusEvent) {
		const target = getNormalizedTarget(e.target as HTMLElement);

		if (!this._isForwardElement(target)) {
			this.lastFocusedElement = target;
			return;
		}

		if (!this._forwardingFocus) {
			if (this.lastFocusedElement) {
				this.lastFocusedElement.focus();
			} else {
				this.currentElement!.focus();
			}

			e.stopImmediatePropagation();
		}

		this._forwardingFocus = false;
	}

	_onForwardBefore(e: CustomEvent<TableRowForwardBeforeEventDetail>) {
		this.lastFocusedElement = e.detail.target;
		this._focusForwardElement(false);
		e.stopImmediatePropagation();
	}

	_onForwardAfter(e: CustomEvent<TableRowForwardAfterEventDetail>) {
		this.lastFocusedElement = e.detail.target;

		if (!this.growsWithButton) {
			this._focusForwardElement(true);
		} else {
			this.morеBtn!.focus();
		}
	}

	_focusForwardElement(isAfter: boolean) {
		this._forwardingFocus = true;
		this.shadowRoot!.querySelector<HTMLElement>(`#${this._id}-${isAfter ? "after" : "before"}`)!.focus();
	}

	_isForwardElement(element: HTMLElement): boolean {
		const elementId = element.id;
		const afterElement = this._getForwardElement(true);
		const beforeElement = this._getForwardElement(false);

		if (this._id === elementId || (beforeElement && beforeElement.id === elementId)) {
			return true;
		}

		return !!(afterElement && afterElement.id === elementId);
	}

	_getForwardElement(isAfter: boolean): HTMLElement | null {
		if (isAfter) {
			return this._getAfterForwardElement();
		}

		return this._getBeforeForwardElement();
	}

	_getAfterForwardElement(): HTMLElement {
		if (!this._afterElement) {
			this._afterElement = this.shadowRoot!.querySelector(`#${this._id}-after`)!;
		}

		return this._afterElement;
	}

	_getBeforeForwardElement(): HTMLElement {
		if (!this._beforeElement) {
			this._beforeElement = this.shadowRoot!.querySelector(`#${this._id}-before`)!;
		}

		return this._beforeElement;
	}

	onRowFocused(e: CustomEvent) {
		this._itemNavigation.setCurrentItem(e.target as ITableRow);
	}

	_onColumnHeaderFocused() {
		this._itemNavigation.setCurrentItem(this._columnHeader);
	}

	_onColumnHeaderClick(e: MouseEvent| KeyboardEvent) {
		if (!e.target) {
			this.columnHeader!.focus();
		}

		const target = getNormalizedTarget(e.target as HTMLElement);
		const isNestedElement = this.columnHeaderTabbables.includes(target);

		if (!isNestedElement) {
			this.columnHeader!.focus();
		}
	}

	_onColumnHeaderKeydown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
			this.isMultiSelect && this._selectAll();
		}
	}

	_onLoadMoreKeydown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
			this._loadMoreActive = true;
		}

		if (isEnter(e)) {
			this._onLoadMoreClick();
			this._loadMoreActive = true;
		}
	}

	_onLoadMoreKeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
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

	onInteresection(entries: Array<IntersectionObserverEntry>) {
		if (entries.some(entry => entry.isIntersecting)) {
			debounce(this.loadMore.bind(this), GROWING_WITH_SCROLL_DEBOUNCE_RATE);
		}
	}

	loadMore() {
		this.fireEvent("load-more");
	}

	_handleSingleSelect(e: CustomEvent<TableRowSelectionRequestedEventDetail>) {
		const row: ITableRow | undefined = this.getRowParent(e.target as HTMLElement);

		if (!row) {
			return;
		}

		if (!row.selected) {
			const previouslySelectedRows = this.selectedRows;
			this.rows.forEach(item => {
				if (item.selected) {
					item.selected = false;
				}
			});
			row.selected = true;
			this.fireEvent<TableSelectionChangeEvent>("selection-change", {
				selectedRows: [row],
				previouslySelectedRows,
			});
		}
	}

	_handleMultiSelect(e: CustomEvent<TableRowSelectionRequestedEventDetail>) {
		const row: ITableRow | undefined = this.getRowParent(e.target as HTMLElement);
		const previouslySelectedRows: Array<ITableRow> = this.selectedRows;

		if (!row) {
			return;
		}

		row.selected = !row.selected;

		const selectedRows = this.selectedRows;

		if (selectedRows.length === this.rows.length) {
			this._allRowsSelected = true;
		} else {
			this._allRowsSelected = false;
		}

		this.fireEvent<TableSelectionChangeEvent>("selection-change", {
			selectedRows,
			previouslySelectedRows,
		});
	}

	_handleSelect(e: CustomEvent<TableRowSelectionRequestedEventDetail>) {
		if (this.isSingleSelect) {
			this._handleSingleSelect(e);
			return;
		}

		if (this.isMultiSelect) {
			this._handleMultiSelect(e);
		}
	}

	_selectAll() {
		const bAllSelected = !this._allRowsSelected;
		const previouslySelectedRows: Array<ITableRow> = this.rows.filter(row => row.selected);

		this._allRowsSelected = bAllSelected;

		this.rows.forEach(row => {
			row.selected = bAllSelected;
		});

		const selectedRows = bAllSelected ? this.rows : [];

		this.fireEvent<TableSelectionChangeEvent>("selection-change", {
			selectedRows,
			previouslySelectedRows,
		});
	}

	getRowParent(child: HTMLElement): ITableRow | undefined {
		if (child.hasAttribute("ui5-table-row")) {
			return child as ITableRow;
		}

		const parent = child.parentElement;

		if (!parent) {
			return;
		}

		if (parent.hasAttribute("ui5-table-row")) {
			return parent as ITableRow;
		}

		return this.getRowParent(parent);
	}

	get columnHeader(): HTMLElement | null {
		const domRef = this.getDomRef();
		return domRef ? domRef.querySelector<HTMLElement>(`#${this._id}-columnHeader`) : null;
	}

	get morеBtn(): HTMLElement | null {
		const domRef = this.getDomRef();

		if (this.growsWithButton && domRef) {
			return domRef.querySelector<HTMLElement>(`#${this._id}-growingButton`);
		}

		return null;
	}

	handleResize() {
		this.checkTableInViewport();
		this.popinContent();
	}

	checkTableInViewport() {
		this._inViewport = isElementInView(this.getDomRef()!);
	}

	popinContent() {
		const clientRect: DOMRect = this.getDomRef()!.getBoundingClientRect();
		const tableWidth: number = clientRect.width;
		const hiddenColumns: Array<TableColumnInfo> = [];
		const visibleColumnsIndexes: Array<number> = [];

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

		const hiddenColumnsChange = (this._hiddenColumns.length !== hiddenColumns.length) || this._hiddenColumns.some((column, index) => column !== hiddenColumns[index]);

		// invalidate only if hidden columns count has changed
		if (hiddenColumnsChange) {
			this._hiddenColumns = hiddenColumns;
			if (hiddenColumns.length) {
				this.fireEvent<TablePopinChangeEvent>("popin-change", {
					poppedColumns: this._hiddenColumns,
				});
			}
		}
	}

	/**
	 * Gets settings to be propagated from columns to rows.
	 *
	 * @returns { array }
	 * @memberof Table
	 */
	getColumnPropagationSettings(): Array<TableColumnInfo> {
		return this.columns.map((column, index) => {
			return {
				index,
				minWidth: column.minWidth,
				demandPopin: column.demandPopin,
				text: column.textContent,
				popinText: column.popinText,
				popinDisplay: column.popinDisplay,
				visible: !this._hiddenColumns[index],
			};
		}, this);
	}

	getIntersectionObserver(): IntersectionObserver {
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

	get growsWithButton(): boolean {
		return this.growing === TableGrowingMode.Button;
	}

	get growsOnScroll(): boolean {
		return this.growing === TableGrowingMode.Scroll;
	}

	get _growingButtonText(): string {
		return this.growingButtonText || Table.i18nBundle.getText(LOAD_MORE_TEXT);
	}

	get ariaLabelText(): string {
		const rowsCount = this.rows.length + 1;
		const headerRowText = Table.i18nBundle.getText(TABLE_HEADER_ROW_INFORMATION, rowsCount);
		const columnsTitle = this.columns.map(column => {
			return column.textContent!.trim();
		}).join(" ");

		return `${headerRowText} ${columnsTitle}`;
	}

	get tableAriaLabelText(): string | undefined {
		return getEffectiveAriaLabelText(this);
	}

	get ariaLabelSelectAllText(): string {
		return Table.i18nBundle.getText(ARIA_LABEL_SELECT_ALL_CHECKBOX);
	}

	get loadMoreAriaLabelledBy(): string {
		if (this.moreDataText) {
			return `${this._id}-growingButton-text ${this._id}-growingButton-subtext`;
		}

		return `${this._id}-growingButton-text`;
	}

	get tableEndDOM(): Element {
		return this.shadowRoot!.querySelector(".ui5-table-end-marker")!;
	}

	get busyIndPosition(): string {
		return this._inViewport ? "absolute" : "sticky";
	}

	get isMultiSelect(): boolean {
		return this.mode === TableMode.MultiSelect;
	}

	get isSingleSelect(): boolean {
		return this.mode === TableMode.SingleSelect;
	}

	get selectedRows(): Array<ITableRow> {
		return this.rows.filter(row => row.selected);
	}

	get currentItemIdx(): number {
		return this.rows.indexOf(this.currentItem);
	}

	get currentItem(): ITableRow {
		return (this.getRootNode() as Document).activeElement as ITableRow;
	}

	get currentElement(): HTMLElement | undefined {
		return this._itemNavigation._getCurrentItem();
	}

	get columnHeaderTabbables(): Array<HTMLElement> {
		return this.columnHeader ? getTabbableElements(this.columnHeader) : [];
	}

	get columnHeaderLastElement(): HTMLElement | null {
		return this.columnHeader && getLastTabbableElement(this.columnHeader);
	}
}

Table.define();

export default Table;

export type {
	ITableRow,
	TableColumnInfo,
};
