import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import GridTableTemplate from "./generated/templates/GridTableTemplate.lit.js";

// Styles
import GridTableCss from "./generated/themes/GridTable.css.js";
import GridTableRow from "./GridTableRow.js";
import GridTableColumnRow from "./GridTableColumnRow.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>grid-table</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/GridTable.js";</code>
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "ui5-grid-table",
	renderer: litRender,
	styles: GridTableCss,
	template: GridTableTemplate,
	dependencies: [],
})

class GridTable extends UI5Element {
	/**
	 * Defines the rows of the component.
	 * <br><br>
	 * <b>Note:</b> Use <code>ui5-grid-table-row</code> for the intended design.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	rows!: Array<GridTableRow>;

	/**
	 * Defines the column row of the component.
	 * <br><br>
	 * <b>Note:</b> Use <code>ui5-grid-table-column-row</code> for the intended design.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement })
	columnrow!: Array<GridTableColumnRow>;

	onEnterDOM(): void {
		this.setAttribute("role", "grid");
	}

	onBeforeRendering() {
	}
}

GridTable.define();

export default GridTable;
