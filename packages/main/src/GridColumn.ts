import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import GridColumnTemplate from "./generated/templates/GridColumnTemplate.lit.js";

// Styles
import GridColumnCss from "./generated/themes/GridColumn.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-grid-column</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/GridColumn.js";</code>
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "ui5-grid-column",
	renderer: litRender,
	styles: GridColumnCss,
	template: GridColumnTemplate,
	dependencies: [],
})
class GridColumn extends UI5Element {
	/**
	 * Defines the header of the component.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	header!: Array<HTMLElement>;

	@property({ type: String, defaultValue: "auto" })
	width!: string;

	onEnterDOM(): void {
		this.setAttribute("role", "columnheader");
		this.setAttribute("tabindex", "0");
	}
}

GridColumn.define();

export default GridColumn;
