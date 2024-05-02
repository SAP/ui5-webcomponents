import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import GridCellBase from "./GridCellBase.js";
import GridHeaderCellTemplate from "./generated/templates/GridHeaderCellTemplate.lit.js";
import GridHeaderCellStyles from "./generated/themes/GridHeaderCell.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-grid-header-cell</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/GridHeaderCell.js";</code>
 *
 * @constructor
 * @extends GridCellBase
 * @public
 */
@customElement({
	tag: "ui5-grid-header-cell",
	styles: [GridCellBase.styles, GridHeaderCellStyles],
	template: GridHeaderCellTemplate,
})
class GridHeaderCell extends GridCellBase {
	/**
	 * Defines the width of the component, including padding and border.
	 *
	 * @default "auto"
	 * @public
	 */
	@property({ type: String, defaultValue: "auto" })
	width!: string;

	@property({ type: String, defaultValue: "auto" })
	minWidth!: string;

	@property({ type: String, defaultValue: "auto" })
	maxWidth!: string;

	@property({ validator: Integer, defaultValue: 0 })
	importance!: number;

	@property({ type: Boolean, noAttribute: true })
	_popin!: boolean;

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
