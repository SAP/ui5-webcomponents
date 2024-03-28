import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import I18nBundle, { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";

import GridCellTemplate from "./generated/templates/GridCellTemplate.lit.js";
import GridCellCss from "./generated/themes/GridCell.css.js";
import { LABEL_COLON } from "./generated/i18n/i18n-defaults.js";
import Grid from "./Grid.js";
import GridRow from "./GridRow.js";

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
	@slot({ type: Node, "default": true })
	content!: Array<Node>;

	@property({ defaultValue: "-1", noAttribute: true })
	forcedTabIndex!: string;

	@property({ type: Boolean })
	_popin!: boolean;

	static i18nBundle: I18nBundle;

	static async onDefine() {
		GridCell.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	onBeforeRendering() {
		this.setAttribute("tabindex", this.forcedTabIndex);
		if (this._popin) {
			this.removeAttribute("role");
		} else {
			this.setAttribute("role", "gridcell");
		}
	}

	getFocusDomRef() {
		return this;
	}

	get _popinHeader() {
		const row = this.parentElement as GridRow;
		const grid = row.parentElement as Grid;
		const index = row.cells.indexOf(this);
		const headerCell = grid.headerRow.cells[index];
		return headerCell.content[0]?.cloneNode(true);
	}

	get _i18nPopinColon() {
		return GridCell.i18nBundle.getText(LABEL_COLON);
	}
}

GridCell.define();

export default GridCell;
