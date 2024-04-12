import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import I18nBundle, { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";

import GridHeaderRowTemplate from "./generated/templates/GridHeaderRowTemplate.lit.js";
import GridHeaderRowCss from "./generated/themes/GridHeaderRow.css.js";
import GridHeaderCell from "./GridHeaderCell.js";
import Grid from "./Grid.js";
import GridSelection from "./GridSelection.js";
import CheckBox from "./CheckBox.js";
import {
	GRID_SELECTION,
	GRID_ROW_SELECTOR,
	GRID_ROW_POPIN,
} from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>grid-header-row</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/GridHeaderRow.js";</code>
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "ui5-grid-header-row",
	languageAware: true,
	renderer: litRender,
	styles: GridHeaderRowCss,
	template: GridHeaderRowTemplate,
	dependencies: [CheckBox],
})

/**
 * Example custom event.
 * Please keep in mind that all public events should be documented in the API Reference as shown below.
 *
 * @public
 */
class GridHeaderRow extends UI5Element {
	/**
	 * Defines the cells of the component.
	 * <br><br>
	 * <b>Note:</b> Use <code>ui5-grid-header-cell</code> for the intended design.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
		invalidateOnChildChange: {
			properties: ["width", "_popin"],
			slots: false,
		},
		individualSlots: true,
	})
	cells!: Array<GridHeaderCell>;

	@property({ type: Integer, defaultValue: 0, noAttribute: true })
	_invalidate!: number;

	static i18nBundle: I18nBundle;

	static async onDefine() {
		GridHeaderRow.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	_onkeydownBound: (e: KeyboardEvent) => void;

	constructor() {
		super();
		this._onkeydownBound = this._onkeydown.bind(this);
	}

	onEnterDOM() {
		this.setAttribute("role", "row");
		this.addEventListener("keydown", this._onkeydownBound);
	}

	onBeforeRendering() {
		if (this._isMultiSelect) {
			this.setAttribute("aria-selected", `${this._isSelected}`);
		} else {
			this.removeAttribute("aria-selected");
		}
	}

	getFocusDomRef() {
		return this;
	}

	_informSelectionChange() {
		this._gridSelection?.informHeaderRowSelectionChange();
	}

	_onkeydown(e: KeyboardEvent) {
		const eventOrigin = e.composedPath()[0];
		if ((isSpace(e) && eventOrigin === this)
		||	((isSpace(e) || isEnter(e)) && eventOrigin === this._selectionCell)
		) {
			this._informSelectionChange();
			e.preventDefault();
		}
	}

	get _grid(): Grid {
		return this.parentElement as Grid;
	}

	get _gridSelection(): GridSelection | undefined {
		return this._grid._getSelection();
	}

	get _isSelected() {
		return this._gridSelection?.areAllRowsSelected();
	}

	get _isMultiSelect() {
		return this._gridSelection?.isMultiSelect();
	}

	get _hasRowSelector() {
		return this._gridSelection?.hasRowSelector();
	}

	get _selectionCell() {
		return this.shadowRoot!.getElementById("selection-cell");
	}

	get _visibleCells() {
		return this.cells.filter(c => !c._popin);
	}

	get _popinCells() {
		return this.cells.filter(c => c._popin);
	}

	get _i18nRowSelector() {
		return GridHeaderRow.i18nBundle.getText(GRID_ROW_SELECTOR);
	}

	get _i18nSelection() {
		return GridHeaderRow.i18nBundle.getText(GRID_SELECTION);
	}

	get _i18nRowPopin() {
		return GridHeaderRow.i18nBundle.getText(GRID_ROW_POPIN);
	}
}

GridHeaderRow.define();

export default GridHeaderRow;
