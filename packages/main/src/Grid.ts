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
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";

import GridTemplate from "./generated/templates/GridTemplate.lit.js";
import GridCss from "./generated/themes/Grid.css.js";
import GridRow from "./GridRow.js";
import GridHeaderRow from "./GridHeaderRow.js";
import GridSelection from "./GridSelection.js";
import GridHeaderCell from "./GridHeaderCell.js";
import GridColumnMode from "./types/GridColumnMode.js";
import GridNavigation from "./GridNavigation.js";
import {
	GRID_NO_DATA,
} from "./generated/i18n/i18n-defaults.js";

/**
 * Interface for components that can be slotted inside the <code>features</code> slot of the <code>ui5-grid</code>.
 *
 * @public
 */
interface IGridFeature extends HTMLElement {
	onGridActivate(grid: Grid): void;
}

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
	 *
	 * Note: Use <code>ui5-grid-row</code> for the intended design.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	rows!: Array<GridRow>;

	/**
	 * Defines the header row of the component.
	 *
	 * Note: Use <code>ui5-grid-header-row</code> for the intended design.
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

	@slot({ type: HTMLElement })
	features!: Array<IGridFeature>;

	/**
	 * Defines the accessible ARIA name of the component.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	accessibleName!: string;

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

	@property({ type: Integer, defaultValue: 0, noAttribute: true })
	_invalidate!: number;

	static i18nBundle: I18nBundle;

	static async onDefine() {
		Grid.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	_onResizeBound: ResizeObserverCallback;
	_gridNavigation?: GridNavigation;

	constructor() {
		super();
		this.poppedIn = [];
		this.containerWidth = 0;
		this._onResizeBound = this._onResize.bind(this);
	}

	onEnterDOM() {
		if (this.columnMode === GridColumnMode.Popin) {
			ResizeHandler.register(this, this._onResizeBound);
		}
		this._gridNavigation = new GridNavigation(this);
		this.features.forEach(feature => feature.onGridActivate(this));
	}

	onExitDOM() {
		this._gridNavigation = undefined;
		if (this.columnMode === GridColumnMode.Popin) {
			ResizeHandler.deregister(this, this._onResizeBound);
		}
	}

	getDomRef(): HTMLElement | undefined {
		return this.shadowRoot!.querySelector("#grid") as HTMLElement;
	}

	_getFeature<Klass>(klass: any): Klass | undefined {
		return this.features.find(feature => feature instanceof klass) as Klass;
	}

	_getSelection(): GridSelection | undefined {
		return this._getFeature(GridSelection);
	}

	_onResize() {
		const { clientWidth, scrollWidth } = this.getDomRef()!;

		if (scrollWidth > clientWidth) {
			// Overflow Handling: Move columns into the popin until overflow is resolved
			const overflow = scrollWidth - clientWidth;
			const headers = this._getPopinOrderedColumns(false);
			const poppedInWidth = headers.reduce((totalPoppedInWidth, headerCell) => {
				if (totalPoppedInWidth <= overflow && !headerCell._popin) {
					const headerWidth = Math.ceil(headerCell.getBoundingClientRect().width);
					totalPoppedInWidth += headerWidth;
					this._setHeaderPopinState(headerCell, true, headerWidth);
				}
				return totalPoppedInWidth;
			}, 0);
			// Calculate container width considering popped-in columns
			const columnOverflow = poppedInWidth - overflow;
			this.containerWidth = clientWidth - columnOverflow;
		} else {
			// Underflow Handling: Restore columns from popin until container width is met
			const headers = this._getPopinOrderedColumns(true).filter(it => it._popin);

			headers.every(headerCell => {
				const underflow = clientWidth - this.containerWidth;
				if (underflow >= headerCell._popinWidth) {
					this.containerWidth += headerCell._popinWidth;
					this._setHeaderPopinState(headerCell, false, 0);
					return true;
				}
				return false;
			});
		}
	}

	_getPopinOrderedColumns(reverse: boolean) {
		let headers = [...this.headerRow.cells];
		headers = headers.reverse(); // reverse the "visual" order
		headers = headers.sort((a, b) => a.importance - b.importance); // sort by importance (asc)
		headers.pop(); // remove the most important column, as it will not be popped in

		if (reverse) {
			headers = headers.reverse();
		}

		return headers;
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

	get _gridTemplateColumns() {
		const widths = [];
		if (this._getSelection()?.hasRowSelector()) {
			widths.push(`var(${getScopedVarName("--_ui5_checkbox_width_height")})`);
		}
		widths.push(...this.headerRow._visibleCells.map(cell => {
			const minWidth = cell.minWidth === "auto" ? "3rem" : cell.minWidth;
			if (cell.width === "auto" || cell.width.includes("%") || cell.width.includes("fr") || cell.width.includes("vw")) {
				return `minmax(${minWidth}, ${cell.maxWidth})`;
			}
			return `minmax(${cell.width}, ${cell.width})`;
		}));
		return widths.join(" ");
	}

	get _gridOverflowX() {
		return (this.columnMode === GridColumnMode.Popin) ? "hidden" : "auto";
	}

	get _effectiveNoDataText() {
		return this.noDataText || Grid.i18nBundle.getText(GRID_NO_DATA);
	}

	get _ariaLabel() {
		return getEffectiveAriaLabelText(this) || undefined;
	}

	get _ariaMultiSelectable() {
		const selection = this._getSelection();
		return (selection?.isSelectable() && this.rows.length) ? selection.isMultiSelect() : undefined;
	}
}

Grid.define();

export default Grid;

export type {
	IGridFeature,
};
