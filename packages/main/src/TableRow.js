import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import TableMode from "./types/TableMode.js";
import TableRowType from "./types/TableRowType.js";
import TableRowTemplate from "./generated/templates/TableRowTemplate.lit.js";
import { ARIA_LABEL_ROW_SELECTION } from "./generated/i18n/i18n-defaults.js";

// Styles
import styles from "./generated/themes/TableRow.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-table-row",
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.TableRow.prototype */ {
		/**
		 * Defines the cells of the <code>ui5-table-row</code>.
		 * <br><br>
		 * <b>Note:</b> Use <code>ui5-table-cell</code> for the intended design.
		 *
		 * @type {sap.ui.webcomponents.main.ITableCell[]}
		 * @slot cells
		 * @public
		 */
		"default": {
			propertyName: "cells",
			type: HTMLElement,
			individualSlots: true,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.TableRow.prototype */ {
		/**
		 * Defines the mode of the row (None, SingleSelect, MultiSelect).
		 * @type {TableMode}
		 * @defaultvalue "None"
		 * @private
		 */
		mode: {
			type: TableMode,
			defaultValue: TableMode.None,
		},
		/**
		 * Defines the visual indication and behavior of the table row.
		 * Available options are <code>Inactive</code> (by default) and <code>Active</code>.
		 * <br><br>
		 * <b>Note:</b> When set to <code>Active</code>, the item will provide visual response upon press,
		 * while with type <code>Inactive</code> - will not.
		 *
		 * @type {TableRowType}
		 * @defaultvalue "Inactive"
		 * @public
		*/
		type: {
			type: TableRowType,
			defaultValue: TableRowType.Inactive,
		},

		/**
		 * Defines the row's selected state.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @since 1.0.0-rc.13
		 * @public
		 */
		selected: {
			type: Boolean,
		},

		/**
		 * Indicates if the table row is active.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @private
		*/
		active: {
			type: Boolean,
		},

		_columnsInfo: {
			type: Object,
			multiple: true,
		},
		_tabIndex: {
			type: String,
			defaultValue: "-1",
		},
		_busy: {
			type: Boolean,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.TableRow.prototype */ {
		"row-click": {},
		_focused: {},
		/**
		 * Fired on selection change of an active row.
		 *
		 * @event sap.ui.webcomponents.main.TableRow#selection-requested
		 * @private
		 */
		"selection-requested": {},
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
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-table-row
 * @implements sap.ui.webcomponents.main.ITableRow
 * @public
 */
class TableRow extends UI5Element {
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
		return TableRowTemplate;
	}

	constructor() {
		super();

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	_onmouseup() {
		this.deactivate();
	}

	_onkeydown(event) {
		const itemActive = this.type === "Active";
		const isSingleSelect = this.isSingleSelect;
		const itemSelectable = isSingleSelect || this.isMultiSelect;
		const isRowFocused = this._getActiveElementTagName() === "ui5-table-row";
		const checkboxPressed = event.target.classList.contains("ui5-multi-select-checkbox");

		if (isSpace(event)) {
			event.preventDefault();
		}

		if ((isSpace(event) && itemSelectable && !checkboxPressed) || (isEnter(event) && isSingleSelect)) {
			this.fireEvent("selection-requested", { row: this });
		}

		if (isEnter(event) && itemActive && isRowFocused) {
			this.fireEvent("row-click", { row: this });
			if (!isSingleSelect) {
				this.activate();
			}
		}
	}

	_onkeyup(event) {
		if (isSpace(event) || isEnter(event)) {
			this.deactivate();
		}
	}

	_ontouchstart(event) {
		this.activate();
	}

	_ontouchend() {
		this.deactivate();
	}

	_onfocusout() {
		this.deactivate();
	}

	_onfocusin(event, forceSelfFocus = false) {
		if (forceSelfFocus || this._getActiveElementTagName() === "ui5-table-cell") {
			this.shadowRoot.querySelector(".ui5-table-row-root").focus();
			this.activate();
		}

		this.fireEvent("_focused", event);
	}

	_onrowclick(event) {
		// If the user tab over a button on IOS device, the document.activeElement
		// is the ui5-table-row. The check below ensure that, if a button within the row is pressed,
		// the row will not be selected.
		if (event.isMarked === "button") {
			return;
		}

		if (this._getActiveElementTagName() === "body") {
			// If the user clickes on non-focusable element within the ui5-table-cell,
			// the focus goes to the body, se we have to bring it back to the row.
			// If the user clicks on input, button or similar clickable element,
			// the focus remains on that element.
			this._onfocusin(event, true /* force row focus */);
			this.deactivate();
		}

		if (this._getActiveElementTagName() === "ui5-table-row") {
			if (this.isSingleSelect) {
				this._handleSelection();
			}

			if (this.type === "Active") {
				this.fireEvent("row-click", { row: this });
			}
		}
	}

	_handleSelection() {
		this.fireEvent("selection-requested", { row: this });
	}

	_getActiveElementTagName() {
		return document.activeElement.localName.toLocaleLowerCase();
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
			return el.demandPopin;
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

			if (!cell) {
				return;
			}

			if (info.visible) {
				this.visibleCells.push(cell);
				cell.popined = false;
			} else if (info.demandPopin) {
				const popinHeaderClass = this.popinCells.length === 0 ? "popin-header" : "";
				this.popinCells.push({
					cell,
					popinText: info.popinText,
					classes: `ui5-table-popin-row ${allColumnsPoppedInClass} ${popinHeaderClass}`,
				});

				cell.popined = true;
			} else {
				cell.popined = false;
			}
		}, this);

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
		return this.cells.map((cell, index) => {
			const columText = this.getColumnTextByIdx(index);
			const cellText = this.getCellText(cell);
			return `${columText} ${cellText}`;
		}).join(" ");
	}

	get ariaLabelRowSelection() {
		return this.i18nBundle.getText(ARIA_LABEL_ROW_SELECTION);
	}

	get isSingleSelect() {
		return this.mode === "SingleSelect";
	}

	get isMultiSelect() {
		return this.mode === "MultiSelect";
	}

	getCellText(cell) {
		return this.getNormilzedTextContent(cell.textContent);
	}

	getColumnTextByIdx(index) {
		const columnInfo = this._columnsInfo[index];

		if (!columnInfo) {
			return "";
		}

		return this.getNormilzedTextContent(columnInfo.text);
	}

	getNormilzedTextContent(textContent) {
		return textContent.replace(/[\n\r\t]/g, "").trim();
	}

	static async onDefine() {
		await Promise.all([
			fetchI18nBundle("@ui5/webcomponents"),
		]);
	}
}

TableRow.define();

export default TableRow;
