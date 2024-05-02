import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import GridCellTemplate from "./generated/templates/GridCellTemplate.lit.js";
import GridCellStyles from "./generated/themes/GridCell.css.js";
import GridCellBase from "./GridCellBase.js";
import GridRow from "./GridRow.js";
import Grid from "./Grid.js";
import { LABEL_COLON } from "./generated/i18n/i18n-defaults.js";

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
	styles: [GridCellBase.styles, GridCellStyles],
	template: GridCellTemplate,
})
class GridCell extends GridCellBase {
	get _popinHeader() {
		const row = this.parentElement as GridRow;
		const grid = row.parentElement as Grid;
		const index = row.cells.indexOf(this);
		const headerCell = grid.headerRow.cells[index];
		return headerCell.content[0]?.cloneNode(true);
	}

	get _i18nPopinColon() {
		return GridCellBase.i18nBundle.getText(LABEL_COLON);
	}
}

GridCell.define();

export default GridCell;
