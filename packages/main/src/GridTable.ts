import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import GridTableTemplate from "./generated/templates/GridTableTemplate.lit.js";

// Styles
import GridTableCss from "./generated/themes/GridTable.css.js";

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
	 * Defines the value of the component.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	value!: string;

	/**
	 * Defines the text of the component.
	 *
	 * @public
	 */
	@slot({ type: Node, "default": true })
	text!: Array<Node>;
}

GridTable.define();

export default GridTable;
