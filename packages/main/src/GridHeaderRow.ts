import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import I18nBundle, { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";

import GridHeaderCell from "./GridHeaderCell.js";
import GridSelectionMode from "./types/GridSelectionMode.js";
import CheckBox from "./CheckBox.js";
import GridHeaderRowTemplate from "./generated/templates/GridHeaderRowTemplate.lit.js";
import GridHeaderRowCss from "./generated/themes/GridHeaderRow.css.js";
import Grid from "./Grid.js";
import {
	GRID_SELECTION,
	GRID_ROW_SELECTOR,
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
		if (this._isMultiSelect) {
			this.setAttribute("aria-selected", `${this._selected}`);
		} else {
			this.removeAttribute("aria-selected");
		}
	}

	get _isMultiSelect() {
		return this._selectionMode === GridSelectionMode.Multi;
	}

	get _hasSelectionComponent() {
		return this._selectionMode === "Multi" || this._selectionMode === "Single";
	}

	get _i18nRowSelector() {
		return GridHeaderRow.i18nBundle.getText(GRID_ROW_SELECTOR);
	}

	get _i18nSelection() {
		return GridHeaderRow.i18nBundle.getText(GRID_SELECTION);
	}

	#informGridForSelectAllChange(selected: boolean) {
		const grid = this.parentElement as Grid;
		grid._onSelectAllChange(selected);
	}

	_onSelectAllChange(e: CustomEvent) {
		this.#informGridForSelectAllChange((e.target as CheckBox).checked);
	}

	_onSelectionCellKeyDown(e: KeyboardEvent) {
		if (!(isSpace(e) || isEnter(e)) || e.currentTarget !== e.composedPath()[0]) {
			return;
		}

		this.#informGridForSelectAllChange(!this._selected);
		e.preventDefault();
	}
}

GridHeaderRow.define();

export default GridHeaderRow;
