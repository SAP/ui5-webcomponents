import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import TableColumnTemplate from "./generated/templates/TableColumnTemplate.lit.js";

// Styles
import styles from "./generated/themes/TableColumn.css.js";

const metadata = {
	tag: "ui5-table-column",
	slots: /** @lends sap.ui.webcomponents.main.TableColumn.prototype */ {

		/**
		 * Defines the content of the column header.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.TableColumn.prototype */ {

		/**
		 * Defines the minimum table width required to display this column. By default it is always displayed.
		 * <br><br>
		 * The responsive behavior of the <code>ui5-table</code> is determined by this property. As an example, by setting
		 * <code>minWidth</code> property to <code>40em</code> shows this column on tablet (and desktop) but hides it on mobile.
		 * <br>
		 * For further responsive design options, see <code>demandPopin</code> property.
		 *
		 * @type {number}
		 * @defaultvalue Infinity
		 * @public
		 */
		minWidth: {
			type: Integer,
			defaultValue: Infinity,
		},

		/**
		 * The text for the column when it pops in.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		popinText: {
			type: String,
		},

		/**
		 * According to your <code>minWidth</code> settings, the <code>ui5-table-column</code> can be hidden
		 * in different screen sizes.
		 * <br><br>
		 * Setting this property to <code>true</code>, shows this column as pop-in instead of hiding it.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		demandPopin: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		first: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		last: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		sticky: {
			type: Boolean,
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-table-column</code> component allows to define column specific properties that are applied
 * when rendering the <code>ui5-table</code> component.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.TableColumn
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-table-column
 * @public
 */
class TableColumn extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return styles;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return TableColumnTemplate;
	}
}

TableColumn.define();

export default TableColumn;
