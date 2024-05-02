import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import GridRowBase from "./GridRowBase.js";
import GridHeaderRowTemplate from "./generated/templates/GridHeaderRowTemplate.lit.js";
import GridHeaderRowStyles from "./generated/themes/GridHeaderRow.css.js";
import GridHeaderCell from "./GridHeaderCell.js";
import {
	GRID_SELECTION,
	GRID_ROW_POPIN,
} from "./generated/i18n/i18n-defaults.js";

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
 * @extends GridRowBase
 * @public
 */
@customElement({
	tag: "ui5-grid-header-row",
	languageAware: true,
	styles: [GridRowBase.styles, GridHeaderRowStyles],
	template: GridHeaderRowTemplate,
})

/**
 * Example custom event.
 * Please keep in mind that all public events should be documented in the API Reference as shown below.
 *
 * @public
 */
class GridHeaderRow extends GridRowBase {
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
			properties: ["width", "_popin"],
			slots: false,
		},
		individualSlots: true,
	})
	cells!: Array<GridHeaderCell>;

	@property({ type: Boolean })
	sticky!: boolean;

	onBeforeRendering() {
		super.onBeforeRendering();
		if (this._grid) {
			this.style.top = this._grid.stickyTop;
		}
	}

	isHeaderRow() {
		return true;
	}

	get _isSelectable() {
		return this._isMultiSelect;
	}

	get _isSelected() {
		return this._gridSelection?.areAllRowsSelected();
	}

	get _i18nSelection() {
		return GridRowBase.i18nBundle.getText(GRID_SELECTION);
	}

	get _i18nRowPopin() {
		return GridRowBase.i18nBundle.getText(GRID_ROW_POPIN);
	}
}

GridHeaderRow.define();

export default GridHeaderRow;
