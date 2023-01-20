import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { PassiveEventListenerObject } from "@ui5/webcomponents-base/dist/types.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import {
	isSpace,
	isEnter,
	isF7,
	isTabNext,
	isTabPrevious,
} from "@ui5/webcomponents-base/dist/Keys.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import { getLastTabbableElement } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import { getEventMark } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import type TableCell from "./TableCell.js";
import type { ITableRow, TableColumnInfo } from "./Table.js";

// @ts-ignore
import CheckBox from "./CheckBox.js";
import TableMode from "./types/TableMode.js";
import TableRowType from "./types/TableRowType.js";
import TableColumnPopinDisplay from "./types/TableColumnPopinDisplay.js";
import TableRowTemplate from "./generated/templates/TableRowTemplate.lit.js";
import {
	ARIA_LABEL_ROW_SELECTION,
	LIST_ITEM_NOT_SELECTED,
	LIST_ITEM_SELECTED,
// @ts-ignore
} from "./generated/i18n/i18n-defaults.js";

// Styles
import styles from "./generated/themes/TableRow.css.js";

type TableRowClickEventDetail = {
	row: TableRow,
}

type TableRowSelectionRequestedEventDetail = {
	row: TableRow,
}

type TableRowForwardBeforeEventDetail = {
	target: HTMLElement,
}

type TableRowForwardAfterEventDetail = {
	target: HTMLElement,
}

type TableRowF7PressEventDetail = {
	row: TableRow,
}

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-table-row</code> component represents a row in the <code>ui5-table</code>.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-table-row</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>row - Used to style the native <code>tr</code> element</li>
 * <li>popin-row - Used to style the <code>tr</code> element when a row pops in</li>
 * </ul>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.TableRow
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-table-row
 * @implements sap.ui.webc.main.ITableRow
 * @public
 */
@customElement("ui5-table-row")
/**
 * Fired when a row in <code>Active</code> mode is clicked or <code>Enter</code> key is pressed.
 *
 * @event sap.ui.webc.main.TableRow#row-click
 * @since 1.0.0-rc.15
 * @private
 */
@event("row-click")
@event("_focused")
/**
 * Fired on selection change of an active row.
 *
 * @event sap.ui.webc.main.TableRow#selection-requested
 * @since 1.0.0-rc.15
 * @private
 */
@event("selection-requested")
/**
 * Fired when F7 is pressed.
 *
 * @event sap.ui.webc.main.TableRow#f7-pressed
 * @since 1.2.0
 * @private
 */
@event("f7-pressed")
class TableRow extends UI5Element implements ITableRow, ITabbable {
	/**
	 * Defines the visual indication and behavior of the component.
	 * <br><br>
	 * Available options are:
	 * <ul>
	 * <li><code>Active</code></li>
	 * <li><code>Inactive</code></li>
	 * </ul>
	 * <br><br>
	 * <b>Note:</b> When set to <code>Active</code>, the item will provide visual response upon press,
	 * while with type <code>Inactive</code> - will not.
	 *
	 * @type {sap.ui.webc.main.types.TableRowType}
	 * @name sap.ui.webc.main.TableRow.prototype.type
	 * @defaultvalue "Inactive"
	 * @since 1.0.0-rc.15
	 * @public
	 */
	@property({ type: TableRowType, defaultValue: TableRowType.Inactive })
	type!: TableRowType;

	/**
	 * Defines the row's selected state.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.TableRow.prototype.selected
	 * @defaultvalue false
	 * @since 1.0.0-rc.15
	 * @public
	 */
	@property({ type: Boolean })
	selected!: boolean;

	/**
	 * Indicates if the table row is navigated.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.TableRow.prototype.navigated
	 * @defaultvalue false
	 * @since 1.9.0
	 * @public
	 */
	@property({ type: Boolean })
	navigated!: boolean;

	/**
	 * Defines the mode of the row (None, SingleSelect, MultiSelect).
	 * @type {sap.ui.webc.main.types.TableMode}
	 * @defaultvalue "None"
	 * @since 1.0.0-rc.15
	 * @private
	 */
	@property({ type: TableMode, defaultValue: TableMode.None })
	mode!: TableMode;

	/**
	 * Indicates if the table row is active.
	 *
	 * @type {boolean}
	 * @defaultvalue false
	 * @since 1.0.0-rc.15
	 * @private
	 */
	@property({ type: Boolean })
	active!: boolean;

	@property({ type: Object, multiple: true })
	_columnsInfo!: Array<TableColumnInfo>;

	@property({ defaultValue: "-1" })
	_tabIndex!: string;

	@property({ type: Boolean })
	_busy!: boolean;

	@property({ defaultValue: "", noAttribute: true })
	_ariaPosition!: string;

	/**
	 * Defines the cells of the component.
	 * <br><br>
	 * <b>Note:</b> Use <code>ui5-table-cell</code> for the intended design.
	 *
	 * @type {sap.ui.webc.main.ITableCell[]}
	 * @name sap.ui.webc.main.TableRow.prototype.default
	 * @slot cells
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true, individualSlots: true })
	cells!: Array<TableCell>;

	static get styles() {
		return styles;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return TableRowTemplate;
	}

	static get dependencies() {
		return [CheckBox];
	}

	static i18nBundle: I18nBundle;

	visibleCells: Array<TableCell> = [];
	popinCells: Array<TableColumnInfo> = [];

	_ontouchstart: PassiveEventListenerObject;

	// Properties, set and handled by the Table
	_tabbables: Array<HTMLElement> = [];
	_columnsInfoString = "";

	constructor() {
		super();

		const handleToushStartEvent = () => {
			this.activate();
		};

		this._ontouchstart = {
			handleEvent: handleToushStartEvent,
			passive: true,
		};
	}

	_onmouseup() {
		this.deactivate();
	}

	_onkeydown(e: KeyboardEvent) {
		const activeElement = getActiveElement() as HTMLElement;
		const itemActive = this.type === TableRowType.Active;
		const isSingleSelect = this.isSingleSelect;
		const itemSelectable = isSingleSelect || this.isMultiSelect;
		const isRowFocused = this._activeElementHasAttribute("ui5-table-row");
		const target = e.target as HTMLElement;
		const checkboxPressed = target.classList.contains("ui5-multi-select-checkbox");
		const rowElements = Array.from(this.shadowRoot!.querySelectorAll("tr") || []);
		const elements = rowElements.map(getLastTabbableElement);
		const lastFocusableElement = elements.pop();

		if (isTabNext(e) && activeElement === (lastFocusableElement || this.root)) {
			this.fireEvent<TableRowForwardAfterEventDetail>("_forward-after", { target: activeElement });
		}

		if (isTabPrevious(e) && activeElement === this.root) {
			this.fireEvent<TableRowForwardBeforeEventDetail>("_forward-before", { target: activeElement });
		}

		if (isSpace(e) && target.tagName.toLowerCase() === "tr") {
			e.preventDefault();
		}

		if (isRowFocused && !checkboxPressed) {
			if ((isSpace(e) && itemSelectable) || (isEnter(e) && isSingleSelect)) {
				this.fireEvent<TableRowSelectionRequestedEventDetail>("selection-requested", { row: this });
			}

			if (isEnter(e) && itemActive) {
				this.fireEvent<TableRowClickEventDetail>("row-click", { row: this });
				if (!isSingleSelect) {
					this.activate();
				}
			}
		}

		if (isF7(e)) {
			e.preventDefault();
			this.fireEvent<TableRowF7PressEventDetail>("f7-pressed", { row: this });
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpace(e) || isEnter(e)) {
			this.deactivate();
		}
	}

	_ontouchend() {
		this.deactivate();
	}

	_onfocusout() {
		this.deactivate();
	}

	_onfocusin(e: FocusEvent, forceSelfFocus = false) {
		if (forceSelfFocus || this._activeElementHasAttribute("ui5-table-cell")) {
			this.root.focus();
			this.activate();
		}

		this.fireEvent("_focused");
	}

	_onrowclick(e: MouseEvent) {
		const checkboxPressed = (e.target as HTMLElement).classList.contains("ui5-multi-select-checkbox");
		// If the user tab over a button on IOS device, the document.activeElement
		// is the ui5-table-row. The check below ensure that, if a button within the row is pressed,
		// the row will not be selected.
		if (getEventMark(e) === "button") {
			return;
		}

		const activeElement = (this.getRootNode() as Document).activeElement;
		if (!this.contains(activeElement)) {
			// If the user clickes on non-focusable element within the ui5-table-cell,
			// the focus goes to the body, se we have to bring it back to the row.
			// If the user clicks on input, button or similar clickable element,
			// the focus remains on that element.
			this._onfocusin(e, true /* force row focus */);
			this.deactivate();
		}

		if (this._activeElementHasAttribute("ui5-table-row")) {
			if (this.isSingleSelect) {
				this._handleSelection();
			}

			if (this.type === TableRowType.Active && !checkboxPressed) {
				this.fireEvent<TableRowClickEventDetail>("row-click", { row: this });
			}
		}
	}

	_handleSelection() {
		this.fireEvent<TableRowSelectionRequestedEventDetail>("selection-requested", { row: this });
	}

	_activeElementHasAttribute(attr: string) {
		return (this.getRootNode() as Document).activeElement!.hasAttribute(attr);
	}

	get _ariaCurrent() {
		return this.navigated ? true : undefined;
	}

	activate() {
		if (this.type === TableRowType.Active) {
			this.active = true;
		}
	}

	deactivate() {
		if (this.active) {
			this.active = false;
		}
	}

	get shouldPopin() {
		return this._columnsInfo.filter(el => {
			return el.demandPopin || !el.visible;
		}).length;
	}

	get allColumnsPoppedIn() {
		return this._columnsInfo.every(el => el.demandPopin && !el.visible);
	}

	onBeforeRendering() {
		if (!this.shouldPopin) {
			return;
		}

		this.visibleCells = [];
		this.popinCells = [];

		if (this.cells.length === 0) {
			return;
		}

		const allColumnsPoppedInClass = this.allColumnsPoppedIn ? "all-columns-popped-in" : "";
		this._columnsInfo.forEach((info, index) => {
			const cell = this.cells[index];
			const popinDisplay = info.popinDisplay === TableColumnPopinDisplay.Inline;

			if (!cell) {
				return;
			}

			if (info.visible) {
				this.visibleCells.push(cell);
				cell.popined = false;
				cell._popinedInline = false;
			} else if (info.demandPopin) {
				const popinHeaderClass = this.popinCells.length === 0 ? "popin-header" : "";
				this.popinCells.push({
					cell,
					popinText: info.popinText,
					classes: `ui5-table-popin-row ${allColumnsPoppedInClass} ${popinHeaderClass}`,
					popinDisplayInline: popinDisplay,
				});
				cell.popined = true;
				if (info.popinDisplay === TableColumnPopinDisplay.Inline) {
					cell._popinedInline = true;
				}
			} else {
				cell.popined = false;
				cell._popinedInline = false;
			}
		});

		const lastVisibleCell = this.visibleCells[this.visibleCells.length - 1];

		if (lastVisibleCell) {
			lastVisibleCell.lastInRow = true;
		}
	}

	get visibleCellsCount() {
		let visibleCellsCount = this.visibleCells.length;

		if (this.isMultiSelect) {
			visibleCellsCount += 1;
		}

		return visibleCellsCount;
	}

	get ariaLabelText() {
		const isSelected = this.selected ? TableRow.i18nBundle.getText(LIST_ITEM_SELECTED as I18nText) : TableRow.i18nBundle.getText(LIST_ITEM_NOT_SELECTED as I18nText);
		const isRowSelectable = this.isSingleSelect || this.isMultiSelect;
		const ariaLabel = this.cells.map((cell, index) => {
			const columText = this.getColumnTextByIdx(index);
			const cellText = this.getCellText(cell);
			return `${columText} ${cellText}`;
		}).join(" ");

		if (isRowSelectable) {
			return `${ariaLabel}. ${this._ariaPosition}. ${isSelected}`;
		}

		return `${ariaLabel}. ${this._ariaPosition}`;
	}

	get ariaLabelRowSelection() {
		return TableRow.i18nBundle.getText(ARIA_LABEL_ROW_SELECTION as I18nText);
	}

	get isSingleSelect() {
		return this.mode === TableMode.SingleSelect;
	}

	get isMultiSelect() {
		return this.mode === TableMode.MultiSelect;
	}

	get root() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-table-row-root")!;
	}

	getCellText(cell: TableCell): string {
		const cellTextContent = cell.textContent;

		return cellTextContent ? this.getNormilzedTextContent(cellTextContent) : "";
	}

	getColumnTextByIdx(index: number): string {
		const columnInfo: TableColumnInfo = this._columnsInfo[index];

		if (!columnInfo) {
			return "";
		}

		return columnInfo.text ? this.getNormilzedTextContent(columnInfo.text) : "";
	}

	getNormilzedTextContent(textContent: string): string {
		return textContent.replace(/[\n\r\t]/g, "").trim();
	}

	static async onDefine() {
		TableRow.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

TableRow.define();

export default TableRow;

export type {
	TableRowClickEventDetail,
	TableRowSelectionRequestedEventDetail,
	TableRowForwardBeforeEventDetail,
	TableRowForwardAfterEventDetail,
	TableRowF7PressEventDetail,
};
