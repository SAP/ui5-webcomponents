import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import I18nBundle, { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { ClassMap } from "@ui5/webcomponents-base/dist/types.js";

import GridRowTemplate from "./generated/templates/GridRowTemplate.lit.js";
import GridRowCss from "./generated/themes/GridRow.css.js";
import GridCell from "./GridCell.js";
import GridSelectionMode from "./types/GridSelectionMode.js";
import PopinLayout from "./types/PopinLayout.js";
import RadioButton from "./RadioButton.js";
import CheckBox from "./CheckBox.js";
import {
	GRID_ROW_SELECTOR,
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
 * For the <code>ui5-grid-row</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/GridRow.js";</code>
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "ui5-grid-row",
	renderer: litRender,
	styles: GridRowCss,
	template: GridRowTemplate,
	dependencies: [RadioButton, CheckBox],
})
class GridRow extends UI5Element {
	/**
	 * Defines the cells of the component.
	 * <br><br>
	 * <b>Note:</b> Use <code>ui5-grid-cell</code> for the intended design.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
		individualSlots: true,
		invalidateOnChildChange: {
			properties: ["_invalidate"],
			slots: false,
		},
	})
	cells!: Array<GridCell>;

	@property({ type: Boolean })
	_selected!: boolean;

	@property({ type: GridSelectionMode, defaultValue: GridSelectionMode.None, noAttribute: true })
	_selectionMode!: `${GridSelectionMode}`;

	static i18nBundle: I18nBundle;

	static async onDefine() {
		GridRow.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	onEnterDOM() {
		this.setAttribute("role", "row");
		this.setAttribute("tabindex", "0");
	}

	onBeforeRendering() {
		if (this._selectionMode !== GridSelectionMode.None) {
			this.setAttribute("aria-selected", `${this._selected}`);
		} else {
			this.removeAttribute("aria-selected");
		}
	}

	get _isMultiSelect() {
		return this._selectionMode === GridSelectionMode.Multi;
	}

	get _hasSelectionComponent() {
		return this._isMultiSelect || this._selectionMode === GridSelectionMode.Single;
	}

	get _gridId() {
		return (this.parentElement as Grid)._id;
	}

	get _i18nRowSelector() {
		return GridRow.i18nBundle.getText(GRID_ROW_SELECTOR);
	}

	#informGridForSelectionChange(selected: boolean) {
		const grid = this.parentElement as Grid;
		grid._onRowSelectionChange(this, selected);
	}

	_onSelectionChange(e: CustomEvent) {
		this.#informGridForSelectionChange((e.target as CheckBox | RadioButton).checked as boolean);
	}

	_onSelectionCellKeyDown(e: KeyboardEvent) {
		if (!(isSpace(e) || isEnter(e)) || e.currentTarget !== e.composedPath()[0]) {
			return;
		}

		this.#informGridForSelectionChange(this._isMultiSelect ? !this._selected : true);
		e.preventDefault();
	}

	get hasPopin() {
		return this.poppedIn.length > 0;
	}

	get poppedIn() {
		return this.cells.filter(c => c._columnInfo.poppedIn);
	}

	get default() {
		return this.cells.filter(c => !c._columnInfo.poppedIn);
	}

	get classes(): ClassMap {
		return {
			popin: {
				"ui5-grid-block-layout": this.grid.popinLayout === PopinLayout.Block,
				"ui5-grid-inline-layout": this.grid.popinLayout === PopinLayout.Inline,
			},
		};
	}

	get grid() {
		return this.parentElement as Grid;
	}
}

GridRow.define();

export default GridRow;
