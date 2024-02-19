import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import GridTableRowTemplate from "./generated/templates/GridTableRowTemplate.lit.js";

// Styles
import GridTableRowCss from "./generated/themes/GridTableRow.css.js";
import GridTableCell from "./GridTableCell.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-grid-table-row</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/GridTableRow.js";</code>
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "ui5-grid-table-row",
	renderer: litRender,
	styles: GridTableRowCss,
	template: GridTableRowTemplate,
	dependencies: [],
})
class GridTableRow extends UI5Element {
	/**
	 * Defines the cells of the component.
	 * <br><br>
	 * <b>Note:</b> Use <code>ui5-grid-table-cell</code> for the intended design.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	cells!: Array<GridTableCell>;

	onEnterDOM(): void {
		this.setAttribute("role", "row");
	}
}

GridTableRow.define();

export default GridTableRow;
