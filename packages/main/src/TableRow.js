import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import {
	isSpace,
	isEnter,
	isF7,
	isTabNext,
	isTabPrevious,
} from "@ui5/webcomponents-base/dist/Keys.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import { getLastTabbableElement } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import CheckBox from "./CheckBox.js";
import TableMode from "./types/TableMode.js";
import TableRowType from "./types/TableRowType.js";
import TableRowTemplate from "./generated/templates/TableRowTemplate.lit.js";
import {
	ARIA_LABEL_ROW_SELECTION,
	LIST_ITEM_NOT_SELECTED,
	LIST_ITEM_SELECTED,
} from "./generated/i18n/i18n-defaults.js";

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
		 * Defines the cells of the component.
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
		 * @type {sap.ui.webcomponents.main.types.TableMode}
		 * @defaultvalue "None"
		 * @since 1.0.0-rc.15
		 * @private
		 */
		mode: {
			type: TableMode,
			defaultValue: TableMode.None,
		},
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
		 * @type {sap.ui.webcomponents.main.types.TableRowType}
		 * @defaultvalue "Inactive"
		 * @since 1.0.0-rc.15
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
		 * @since 1.0.0-rc.15
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
		 * @since 1.0.0-rc.15
		 * @private
		*/
		active: {
			type: Boolean,
		},
		/**
		 * Indicates if the table row is navigated.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @since 1.9.0
		 * @public
		*/
		navigated: {
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
		_ariaPosition: {
			type: String,
			defaultValue: "",
			noAttribute: true,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.TableRow.prototype */ {
		/**
		 * Fired when a row in <code>Active</code> mode is clicked or <code>Enter</code> key is pressed.
		 *
		 * @event sap.ui.webcomponents.main.TableRow#row-click
		 * @since 1.0.0-rc.15
		 * @private
		 */
		"row-click": {},
		_focused: {},
		/**
		 * Fired on selection change of an active row.
		 *
		 * @event sap.ui.webcomponents.main.TableRow#selection-requested
		 * @since 1.0.0-rc.15
		 * @private
		 */
		"selection-requested": {},
		/**
		 * Fired when F7 is pressed.
		 *
		 * @event sap.ui.webcomponents.main.TableRow#f7-pressed
		 * @since 1.2.0
		 * @private
		 */
		"f7-pressed": {},
	},
};

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

	static get dependencies() {
		return [CheckBox];
	}

	constructor() {
		super();

		const handleToushStartEvent = event => {
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

	_onkeydown(event) {
		const activeElement = getActiveElement();
		const itemActive = this.type === TableRowType.Active;
		const isSingleSelect = this.isSingleSelect;
		const itemSelectable = isSingleSelect || this.isMultiSelect;
		const isRowFocused = this._activeElementHasAttribute("ui5-table-row");
		const checkboxPressed = event.target.classList.contains("ui5-multi-select-checkbox");
		const rowElements = Array.from(this.shadowRoot.querySelectorAll("tr") || []);
		const elements = rowElements.map(getLastTabbableElement);
		const lastFocusableElement = elements.pop();

		if (isTabNext(event) && activeElement === (lastFocusableElement || this.root)) {
			this.fireEvent("_forward-after", { target: activeElement });
		}

		if (isTabPrevious(event) && activeElement === this.root) {
			this.fireEvent("_forward-before", { target: activeElement });
		}

		if (isSpace(event) && event.target.tagName.toLowerCase() === "tr") {
			event.preventDefault();
		}

		if (isRowFocused && !checkboxPressed) {
			if ((isSpace(event) && itemSelectable) || (isEnter(event) && isSingleSelect)) {
				this.fireEvent("selection-requested", { row: this });
			}

			if (isEnter(event) && itemActive) {
				this.fireEvent("row-click", { row: this });
				if (!isSingleSelect) {
					this.activate();
				}
			}
		}

		if (isF7(event)) {
			event.preventDefault();
			this.fireEvent("f7-pressed", { row: this });
		}
	}

	_onkeyup(event) {
		if (isSpace(event) || isEnter(event)) {
			this.deactivate();
		}
	}

	_ontouchend() {
		this.deactivate();
	}

	_onfocusout() {
		this.deactivate();
	}

	_onfocusin(event, forceSelfFocus = false) {
		if (forceSelfFocus || this._activeElementHasAttribute("ui5-table-cell")) {
			this.root.focus();
			this.activate();
		}

		this.fireEvent("_focused", event);
	}

	_onrowclick(event) {
		const checkboxPressed = event.target.classList.contains("ui5-multi-select-checkbox");
		// If the user tab over a button on IOS device, the document.activeElement
		// is the ui5-table-row. The check below ensure that, if a button within the row is pressed,
		// the row will not be selected.
		if (event.isMarked === "button") {
			return;
		}

		if (!this.contains(this.getRootNode().activeElement)) {
			// If the user clickes on non-focusable element within the ui5-table-cell,
			// the focus goes to the body, se we have to bring it back to the row.
			// If the user clicks on input, button or similar clickable element,
			// the focus remains on that element.
			this._onfocusin(event, true /* force row focus */);
			this.deactivate();
		}

		if (this._activeElementHasAttribute("ui5-table-row")) {
			if (this.isSingleSelect) {
				this._handleSelection();
			}

			if (this.type === TableRowType.Active && !checkboxPressed) {
				this.fireEvent("row-click", { row: this });
			}
		}
	}

	_handleSelection() {
		this.fireEvent("selection-requested", { row: this });
	}

	_activeElementHasAttribute(attr) {
		return this.getRootNode().activeElement.hasAttribute(attr);
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
		const isSelected = this.selected ? TableRow.i18nBundle.getText(LIST_ITEM_SELECTED) : TableRow.i18nBundle.getText(LIST_ITEM_NOT_SELECTED);
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
		return TableRow.i18nBundle.getText(ARIA_LABEL_ROW_SELECTION);
	}

	get isSingleSelect() {
		return this.mode === "SingleSelect";
	}

	get isMultiSelect() {
		return this.mode === "MultiSelect";
	}

	get root() {
		return this.shadowRoot.querySelector(".ui5-table-row-root");
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
		TableRow.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

TableRow.define();

export default TableRow;
