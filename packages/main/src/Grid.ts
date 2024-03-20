import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import I18nBundle, { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";

import GridTemplate from "./generated/templates/GridTemplate.lit.js";
import GridCss from "./generated/themes/Grid.css.js";
import GridRow from "./GridRow.js";
import GridHeaderRow from "./GridHeaderRow.js";
import GridSelectionMode from "./types/GridSelectionMode.js";
import {
	GRID_NO_DATA,
} from "./generated/i18n/i18n-defaults.js";
import GridHeaderCell from "./GridHeaderCell.js";
import GridColumnMode from "./types/GridColumnMode.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>grid</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/Grid.js";</code>
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "ui5-grid",
	renderer: litRender,
	styles: GridCss,
	template: GridTemplate,
	dependencies: [],
})

class Grid extends UI5Element {
	/**
	 * Defines the rows of the component.
	 * <br><br>
	 * <b>Note:</b> Use <code>ui5-grid-row</code> for the intended design.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	rows!: Array<GridRow>;

	/**
	 * Defines the header row of the component.
	 * <br><br>
	 * <b>Note:</b> Use <code>ui5-grid-header-row</code> for the intended design.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: { properties: false, slots: true } })
	"header-row"!: Array<GridHeaderRow>;
	get headerRow() { return this["header-row"][0]; }

	/**
	 * Defines the custom visualization if there is no data available.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement })
	nodata!: Array<HTMLElement>;

	/**
	 * Defines the selection mode of the component.
	 *
	 * @default "None"
	 * @public
	 */
	@property({ type: GridSelectionMode, defaultValue: GridSelectionMode.None })
	selectionMode!: `${GridSelectionMode}`;

	/**
	 * Defines the accessible ARIA name of the component.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	accessibleName?: string;

	/**
	 * Identifies the element (or elements) that labels the component.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	accessibleNameRef!: string;

	/**
	 * Defines the text to be displayed when there are no rows in the component.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	noDataText!: string;

	@property({ type: GridColumnMode, defaultValue: GridColumnMode.Popin })
	columnMode!: GridColumnMode;

	poppedIn: Array<{col: GridHeaderCell, width: float}>;
	containerWidth: number;

	static i18nBundle: I18nBundle;

	static async onDefine() {
		Grid.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	_onResizeBound: ResizeObserverCallback;

	constructor() {
		super();
		this._onResizeBound = this._onResize.bind(this);
		this.poppedIn = [];
		this.containerWidth = 0;
	}

	onEnterDOM() {
		if (this.columnMode === GridColumnMode.Popin) {
			ResizeHandler.register(this, this._onResizeBound);
		}
	}

	onExitDOM() {
		if (this.columnMode === GridColumnMode.Popin) {
			ResizeHandler.deregister(this, this._onResizeBound);
		}
	}

	onBeforeRendering() {
		[...this.rows, this.headerRow].forEach(row => {
			row._selectionMode = this.selectionMode;
		});
	}

	_onRowSelectionChange(row: GridRow, selected: boolean) {
		row._selected = selected;
		if (this.selectionMode === GridSelectionMode.Multi) {
			this.headerRow._selected = this.rows.every(r => r._selected);
		} else {
			if (this._lastSelectedRow && this._lastSelectedRow.parentElement === this) {
				this._lastSelectedRow._selected = false;
			}
			this._lastSelectedRow = row;
		}
	}

	_onSelectAllChange(selected: boolean) {
		[...this.rows, this.headerRow].forEach(row => {
			if (row._selected !== selected) {
				row._selected = selected;
			}
		});
	}

	_onResize() {
		const { clientWidth, scrollWidth } = this.getDomRef()!;
		this.containerWidth = this.containerWidth || clientWidth;
		const underflow = clientWidth - this.containerWidth;
		const headers = this.headerRow.cells.toSorted((a, b) => a.importance - b.importance);

		if (scrollWidth > clientWidth) {
			const overflow = scrollWidth - clientWidth;
			this.containerWidth = clientWidth;
			headers.reduce((totalWidth, headerCell, headerCellIndex) => {
				if (totalWidth <= overflow && !headerCell._popin && headerCellIndex !== this.headerRow.cells.length - 1) {
					const headerWidth = headerCell.getBoundingClientRect().width;
					this._setHeaderPopinState(headerCell, true, headerWidth);
					totalWidth += headerWidth;
				}
				return totalWidth;
			}, 0);
		} else if (underflow > 0) {
			headers.filter(headerCell => headerCell._popin).toReversed().reduce((totalWidth, headerCell) => {
				if ((totalWidth + headerCell._popinWidth) <= underflow && headerCell._popinWidth <= underflow) {
					totalWidth += headerCell._popinWidth;
					this._setHeaderPopinState(headerCell, false, 0);
					this.containerWidth = scrollWidth;
				}
				return totalWidth;
			}, 0);
		}
	}

	_setHeaderPopinState(headerCell: GridHeaderCell, inPopin: boolean, popinWidth: number) {
		const headerIndex = this.headerRow.cells.indexOf(headerCell);
		headerCell._popin = inPopin;
		headerCell._popinWidth = popinWidth;
		this.rows.forEach(row => {
			row.cells[headerIndex]._popin = inPopin;
		});
	}

	get styles() {
		return {
			grid: {
				"grid-template-columns": this._gridTemplateColumns,
				"overflow-x": this._gridOverflowX,
			},
		};
	}

	_lastSelectedRow?: GridRow;

	get _gridTemplateColumns() {
		const widths = [];
		if (this.selectionMode === GridSelectionMode.Multi || this.selectionMode === GridSelectionMode.Single) {
			widths.push(`var(${getScopedVarName("--_ui5_checkbox_width_height")})`);
		}
		widths.push(...this.headerRow._visibleCells.map(cell => `minmax(${cell.minWidth}, auto)`));
		return widths.join(" ");
	}

	get _gridOverflowX() {
		if (this.columnMode === GridColumnMode.Popin) {
			return "hidden";
		}
		return "scroll";
	}

	get _effectiveNoDataText() {
		return this.noDataText || Grid.i18nBundle.getText(GRID_NO_DATA);
	}

	get _aria() {
		return {
			label: getEffectiveAriaLabelText(this) || undefined,
			multiselectable: (this.selectionMode !== GridSelectionMode.None && this.rows.length) ? this.selectionMode === GridSelectionMode.Multi : undefined,
		};
	}
}

Grid.define();

export default Grid;
