import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import I18nBundle, { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import GridCellBase from "./GridCellBase.js";
import GridRowBaseCss from "./generated/themes/GridRowBase.css.js";
import Grid from "./Grid.js";
import CheckBox from "./CheckBox.js";
import {
	GRID_ROW_SELECTOR,
} from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 * A class to serve as a foundation for the `GridRow` and `GridHeaderRow` classes.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @public
 */
@customElement({
	renderer: litRender,
	styles: GridRowBaseCss,
	dependencies: [CheckBox],
})
abstract class GridRowBase extends UI5Element {
	cells!: Array<GridCellBase>;

	@property({ type: Integer, defaultValue: 0, noAttribute: true })
	_invalidate!: number;

	static i18nBundle: I18nBundle;
	static async onDefine() {
		GridRowBase.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	onEnterDOM() {
		this.setAttribute("role", "row");
	}

	onBeforeRendering() {
		if (this._isSelectable) {
			this.setAttribute("aria-selected", `${this._isSelected}`);
		} else {
			this.removeAttribute("aria-selected");
		}
	}

	getFocusDomRef() {
		return this;
	}

	isHeaderRow() {
		return false;
	}

	_informSelectionChange() {
		this._gridSelection?.informSelectionChange(this);
	}

	_onkeydown(e: KeyboardEvent, eventOrigin: HTMLElement) {
		if ((eventOrigin === this && this._isSelectable && isSpace(e)) || (eventOrigin === this._selectionCell && (isSpace(e) || isEnter(e)))) {
			this._informSelectionChange();
			e.preventDefault();
		}
	}

	get _grid(): Grid | undefined {
		const grid = this.parentElement;
		return grid instanceof Grid ? grid : undefined;
	}

	get _gridId() {
		return this._grid?._id;
	}

	get _gridSelection() {
		return this._grid?._getSelection();
	}

	get _isSelected() {
		return this._gridSelection?.isSelected(this);
	}

	get _isSelectable() {
		return this._gridSelection?.isSelectable();
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

	get _i18nRowSelector(): string {
		return GridRowBase.i18nBundle.getText(GRID_ROW_SELECTOR);
	}
}

export default GridRowBase;
