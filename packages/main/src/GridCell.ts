import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import GridCellTemplate from "./generated/templates/GridCellTemplate.lit.js";
import GridCellCss from "./generated/themes/GridCell.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-grid-cell</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/GridCell.js";</code>
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "ui5-grid-cell",
	renderer: litRender,
	styles: GridCellCss,
	template: GridCellTemplate,
	dependencies: [],
})
class GridCell extends UI5Element {
	/**
	 * Defines the content of the component.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	content!: Array<HTMLElement>;

	onEnterDOM(): void {
		this.setAttribute("role", "gridcell");
		this.setAttribute("tabindex", "0");
	}
}

GridCell.define();

export default GridCell;
