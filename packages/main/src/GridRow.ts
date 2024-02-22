import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import GridRowTemplate from "./generated/templates/GridRowTemplate.lit.js";

// Styles
import GridRowCss from "./generated/themes/GridRow.css.js";
import GridCell from "./GridCell.js";

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
	dependencies: [],
})
class GridRow extends UI5Element {
	/**
	 * Defines the cells of the component.
	 * <br><br>
	 * <b>Note:</b> Use <code>ui5-grid-cell</code> for the intended design.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	cells!: Array<GridCell>;

	onEnterDOM(): void {
		this.role = "row";
	}
}

GridRow.define();

export default GridRow;
