import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import TableColumnTemplate from "./generated/templates/TableColumnTemplate.lit.js";
import TableColumnPopinDisplay from "./types/TableColumnPopinDisplay.js";
import type { ITableColumn } from "./Interfaces.js";

// Styles
import tableColumnStyles from "./generated/themes/TableColumn.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-table-column</code> component allows to define column specific properties that are applied
 * when rendering the <code>ui5-table</code> component.
 *
 *
 * @constructor
 * @extends UI5Element
 * @implements {ITableColumn}
 * @public
 * @slot {Node[]} default - Defines the content of the column header
 * @csspart column - Used to style the native <code>th</code> element
 */
@customElement({
	tag: "ui5-table-column",
	styles: tableColumnStyles,
	renderer: litRender,
	template: TableColumnTemplate,
})
class TableColumn extends UI5Element implements ITableColumn {
	/**
	 * Defines the minimum table width required to display this column. By default it is always displayed.
	 * <br><br>
	 * The responsive behavior of the <code>ui5-table</code> is determined by this property. As an example, by setting
	 * <code>minWidth</code> property to <code>400</code> sets the minimum width to 400 pixels, and	shows this column on tablet (and desktop) but hides it on mobile.
	 * <br>
	 * For further responsive design options, see <code>demandPopin</code> property.
	 *
	 * @type {Integer}
	 * @default Infinity
	 * @public
	 */
	@property({ validator: Integer, defaultValue: Infinity })
	minWidth!: number;

	/**
	 * The text for the column when it pops in.
	 *
	 * @type {string}
	 * @default ""
	 * @public
	 */
	@property()
	popinText!: string;

	/**
	 * According to your <code>minWidth</code> settings, the component can be hidden
	 * in different screen sizes.
	 * <br><br>
	 * Setting this property to <code>true</code>, shows this column as pop-in instead of hiding it.
	 *
	 * @type {boolean}
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	demandPopin!: boolean;

	/**
	 * Defines how the popin row is displayed.
	 *
	 * <br><br>
	 * <b>The available values are:</b>
	 *
	 * <ul>
	 * <li><code>Block</code></li>
	 * <li><code>Inline</code></li>
	 * </ul>
	 *
	 * @type {TableColumnPopinDisplay}
	 * @default "Block"
	 * @public
	 */
	@property({ type: TableColumnPopinDisplay, defaultValue: TableColumnPopinDisplay.Block })
	popinDisplay!: `${TableColumnPopinDisplay}`;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	first!: boolean;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	last!: boolean;
}

TableColumn.define();

export default TableColumn;
