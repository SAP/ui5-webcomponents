import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { ClassMap } from "@ui5/webcomponents-base/dist/types.js";

import GridTableColumnTemplate from "./generated/templates/GridTableColumnTemplate.lit.js";

// Styles
import GridTableColumnCss from "./generated/themes/GridTableColumn.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>grid-table-column</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/GridTableColumn.js";</code>
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "ui5-grid-table-column",
	renderer: litRender,
	styles: GridTableColumnCss,
	template: GridTableColumnTemplate,
	dependencies: [],
})
class GridTableColumn extends UI5Element {
	/**
	 * Defines the text of the component.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	header!: Array<HTMLElement>;

	@property({ type: String, defaultValue: "200px" })
	width!: string;

	get classes(): ClassMap {
		return {
			cell: {
				"ui5-grid-table-column": true,
			},
		};
	}
}

GridTableColumn.define();

export default GridTableColumn;
