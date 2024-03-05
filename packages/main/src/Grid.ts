import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";

import GridTemplate from "./generated/templates/GridTemplate.lit.js";
import GridCss from "./generated/themes/Grid.css.js";
import GridRow from "./GridRow.js";
import GridHeaderRow from "./GridHeaderRow.js";
import GridSelectionMode from "./types/GridSelectionMode.js";

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
	 * @public
	 */
	@property()
	accessibleName?: string;

	/**
	 * Identifies the element (or elements) that labels the component.
	 *
	 * @public
	 */
	@property()
	accessibleNameRef!: string;

	onBeforeRendering() {
		[...this.rows, this.headerRow].forEach(row => {
			row._selectionMode = this.selectionMode;
		});
	}

	_onRowSelectionChange(row: GridRow, selected: boolean) {
		row._selected = selected;
		if (this._isMultiSelect) {
			this.headerRow._selected = this.rows.every(r => r._selected);
		} else {
			if (this.#lastSelectedRow && this.#lastSelectedRow.parentElement === this) {
				this.#lastSelectedRow._selected = false;
			}
			this.#lastSelectedRow = row;
		}
	}

	_onSelectAllChange(selected: boolean) {
		[...this.rows, this.headerRow].forEach(row => {
			if (row._selected !== selected) {
				row._selected = selected;
			}
		});
	}

	#lastSelectedRow?: GridRow;

	#getGridTemplateColumns(): string {
		const widths : Array<string> = [];
		if (this._isMultiSelect || this.selectionMode === GridSelectionMode.Single) {
			widths.push(`var(${getScopedVarName("--_ui5_checkbox_width_height")})`);
		}
		widths.push(...this.headerRow.cells.map(cell => cell.width));
		return widths.join(" ");
	}

	get styles() {
		return {
			grid: {
				"grid-template-columns": this.#getGridTemplateColumns(),
			},
		};
	}

	get _ariaLabelText() {
		return getEffectiveAriaLabelText(this);
	}

	get _isMultiSelect(): boolean {
		return this.selectionMode === GridSelectionMode.Multi;
	}
}

Grid.define();

export default Grid;
