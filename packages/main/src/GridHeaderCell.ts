import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property-v2.js";
import GridCellBase from "./GridCellBase.js";
import GridHeaderCellTemplate from "./generated/templates/GridHeaderCellTemplate.lit.js";
import GridHeaderCellStyles from "./generated/themes/GridHeaderCell.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-grid-header-cell` component represents a column in the `ui5-grid`.
 *
 * As it is tightly coupled to the `ui5-grid`, it should only be used in the `ui5-grid-header-row`
 * to ensure correct layout and design.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/GridHeaderCell.js";`
 *
 * @constructor
 * @extends GridCellBase
 * @since 2.0
 * @public
 */
@customElement({
	tag: "ui5-grid-header-cell",
	styles: [GridCellBase.styles, GridHeaderCellStyles],
	template: GridHeaderCellTemplate,
})
class GridHeaderCell extends GridCellBase {
	/**
	 * Defines the width of column.
	 *
	 * @default "auto"
	 * @public
	 */
	@property()
	width = "auto";

	/**
 * Defines the minimum width of the column.
	 *
	 * If the table is in `Popin` mode, the column will move into the popin when
	 * when the minimum width does not fit anymore.
	 *
	 * @default "auto"
	 * @public
	 */
	@property()
	minWidth = "auto";

	/**
	 * Defines the maximum width of the column.
	 *
	 * @default "auto"
	 * @public
	 */
	@property()
	maxWidth = "auto";

	/**
	 * Defines the importance of the column.
	 *
	 * This property affects the popin behaviour.
	 * Columns with higher importance will move into the popin area later then less important
	 * columns.
	 *
	 * @default 0
	 * @public
	 */
	@property({ type: Number })
	importance = 0;

	@property({ type: Boolean, noAttribute: true })
	_popin = false;

	protected ariaRole: string = "columnheader";
	_popinWidth: number = 0;

	onEnterDOM() {
		this.style.minWidth = this.minWidth;
		this.style.maxWidth = this.maxWidth;
		this.style.width = this.width;
	}
}

GridHeaderCell.define();

export default GridHeaderCell;
