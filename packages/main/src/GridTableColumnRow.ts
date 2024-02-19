import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import GridTableColumnRowTemplate from "./generated/templates/GridTableColumnRowTemplate.lit.js";

// Styles
import GridTableColumnRowCss from "./generated/themes/GridTableColumnRow.css.js";
import GridTableColumn from "./GridTableColumn.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>grid-table-column-row</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/GridTableColumnRow.js";</code>
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "ui5-grid-table-column-row",
	renderer: litRender,
	styles: GridTableColumnRowCss,
	template: GridTableColumnRowTemplate,
	dependencies: [],
})

/**
 * Example custom event.
 * Please keep in mind that all public events should be documented in the API Reference as shown below.
 *
 * @public
 */
@event("interact", { detail: { /* event payload ( optional ) */ } })
class GridTableColumnRow extends UI5Element {
	/**
	 * Defines the configuration for the columns of the component.
	 * <br><br>
	 * <b>Note:</b> Use <code>ui5-grid-table-column</code> for the intended design.
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
	columns!: Array<GridTableColumn>;

	onEnterDOM(): void {
		this.setAttribute("role", "row");
	}

	onBeforeRendering(): void {
		this.parentElement!.style.gridTemplateColumns = this.columns.map(c => c.width || "auto").join(" ") || "";
	}
}

GridTableColumnRow.define();

export default GridTableColumnRow;
