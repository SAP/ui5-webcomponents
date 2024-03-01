import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import I18nBundle, { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";

import GridHeaderCell from "./GridHeaderCell.js";
import GridSelectionMode from "./types/GridSelectionMode.js";
import CheckBox from "./CheckBox.js";
import GridHeaderRowTemplate from "./generated/templates/GridHeaderRowTemplate.lit.js";
import GridHeaderRowCss from "./generated/themes/GridHeaderRow.css.js";

import {
	GRID_HEADER_ROW_SELECTION,
	GRID_HEADER_ROW_SELECT_ALL_ROWS,
} from "./generated/i18n/i18n-defaults.js";
import Grid from "./Grid.js";

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
			properties: ["width"],
			slots: false,
		},
	})
	cells!: Array<GridHeaderCell>;

	@property({ type: Boolean })
	_selected!: boolean;

	@property({ type: GridSelectionMode, defaultValue: GridSelectionMode.None, noAttribute: true })
	_selectionMode!: `${GridSelectionMode}`;

	static i18nBundle: I18nBundle;

	static async onDefine() {
		GridHeaderRow.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	onEnterDOM() {
		this.setAttribute("role", "row");
		this.setAttribute("tabindex", "0");
	}

	onBeforeRendering() {
		const widths : Array<string> = [];
		if (this._hasSelectionComponent) {
			widths.push(`var(${getScopedVarName("--_ui5_checkbox_width_height")})`);
		}
		widths.push(...this.cells.map(cell => cell.width));
		this.parentElement!.style.gridTemplateColumns = widths.join(" ");

		if (this._isMultiSelect) {
			this.setAttribute("aria-selected", `${this._selected}`);
		} else {
			this.removeAttribute("aria-selected");
		}
	}

	get _isMultiSelect(): boolean {
		return this._selectionMode === GridSelectionMode.Multi;
	}

	get _hasSelectionComponent(): boolean {
		return this._selectionMode === "Multi" || this._selectionMode === "Single";
	}

	get _selectionWidth(): string {
		return `var(${getScopedVarName("--_ui5_checkbox_width_height")})`;
	}

	get _i18nSelecAllRows(): string {
		return GridHeaderRow.i18nBundle.getText(GRID_HEADER_ROW_SELECT_ALL_ROWS);
	}

	get _i18nSelection(): string {
		return GridHeaderRow.i18nBundle.getText(GRID_HEADER_ROW_SELECTION);
	}

	#informGridForSelectAllChange(selected : boolean) {
		const grid = this.parentElement as Grid;
		grid._onSelectAllChange(selected);
	}

	_onSelectAllChange(e: CustomEvent) {
		this.#informGridForSelectAllChange((e.target as CheckBox).checked);
	}

	_onSelectionCellKeyDown(e: KeyboardEvent) {
		if (isSpace(e) || isEnter(e)) {
			this.#informGridForSelectAllChange(!this._selected);
			e.preventDefault();
		}
	}
}

GridHeaderRow.define();

export default GridHeaderRow;
