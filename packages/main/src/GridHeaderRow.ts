import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import GridHeaderRowTemplate from "./generated/templates/GridHeaderRowTemplate.lit.js";

// Styles
import GridHeaderRowCss from "./generated/themes/GridHeaderRow.css.js";
import GridHeaderCell from "./GridHeaderCell.js";

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
	renderer: litRender,
	styles: GridHeaderRowCss,
	template: GridHeaderRowTemplate,
	dependencies: [],
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

	onEnterDOM(): void {
		this.role = "row";
	}

	onBeforeRendering(): void {
		this.parentElement!.style.gridTemplateColumns = this.cells.map(c => c.width || "auto").join(" ") || "";
	}
}

GridHeaderRow.define();

export default GridHeaderRow;
