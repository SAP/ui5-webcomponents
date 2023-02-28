import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import TableColumnTemplate from "./generated/templates/TableColumnTemplate.lit.js";
import TableColumnPopinDisplay from "./types/TableColumnPopinDisplay.js";

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
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-table-column</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>column - Used to style the native <code>th</code> element</li>
 * </ul>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.TableColumn
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-table-column
 * @implements sap.ui.webc.main.ITableColumn
 * @public
 */
@customElement({
	tag: "ui5-table-column",
	styles: tableColumnStyles,
	renderer: litRender,
	template: TableColumnTemplate,
})
class TableColumn extends UI5Element {
	/**
	 * Defines the minimum table width required to display this column. By default it is always displayed.
	 * <br><br>
	 * The responsive behavior of the <code>ui5-table</code> is determined by this property. As an example, by setting
	 * <code>minWidth</code> property to <code>400</code> sets the minimum width to 400 pixels, and	shows this column on tablet (and desktop) but hides it on mobile.
	 * <br>
	 * For further responsive design options, see <code>demandPopin</code> property.
	 *
	 * @type {sap.ui.webc.base.types.Integer}
	 * @name sap.ui.webc.main.TableColumn.prototype.minWidth
	 * @defaultvalue Infinity
	 * @public
	 */
	@property({ validator: Integer, defaultValue: Infinity })
	minWidth!: number;

	/**
	 * The text for the column when it pops in.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.TableColumn.prototype.popinText
	 * @defaultvalue ""
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
	 * @name sap.ui.webc.main.TableColumn.prototype.demandPopin
	 * @defaultvalue false
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
	 * @name sap.ui.webc.main.TableColumn.prototype.popinDisplay
	 * @defaultvalue "Block"
	 * @public
	 */
	@property({ type: TableColumnPopinDisplay, defaultValue: TableColumnPopinDisplay.Block })
	popinDisplay!: TableColumnPopinDisplay;

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

	/**
	 * Defines the content of the column header.
	 *
	 * @type {Node[]}
	 * @slot
	 * @name sap.ui.webc.main.TableColumn.prototype.default
	 * @public
	 */
}

TableColumn.define();

export default TableColumn;
