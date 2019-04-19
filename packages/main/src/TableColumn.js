import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import Integer from "@ui5/webcomponents-base/src/types/Integer.js";
import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap.js";
import CSSSize from "@ui5/webcomponents-base/src/types/CSSSize.js";
import { addCustomCSS } from "@ui5/webcomponents-base/src/theming/CustomStyle.js";
import TableColumnRenderer from "./build/compiled/TableColumnRenderer.lit.js";

// Styles
import styles from "./themes/TableColumn.css.js";

addCustomCSS("ui5-table-column", "sap_fiori_3", styles);
addCustomCSS("ui5-table-column", "sap_belize", styles);
addCustomCSS("ui5-table-column", "sap_belize_hcb", styles);

const metadata = {
	tag: "ui5-table-column",
	styleUrl: [
		"TableColumn.css",
	],
	slots: /** @lends sap.ui.webcomponents.main.TableColumn.prototype */ {

		/**
		 * Defines the HTML Element to be displayed in the column header.
		 *
		 * @type {HTMLElement}
		 * @slot
		 * @public
		 */
		header: {
			type: HTMLElement,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.TableColumn.prototype */ {

		/**
		 * Defines the minimum screen width required to display this column. By default it is always displayed.
		 * </br></br>
		 * The responsive behavior of the <code>ui5-table</code> is determined by this property. As an example, by setting
		 * <code>minWidth</code> property to <code>40em</code> shows this column on tablet (and desktop) but hides it on mobile.
		 * </br>
		 * For further responsive design options, see <code>demandPopin</code> property.
		 *
		 * @type {number}
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
		 * @public
		 */
		popinText: {
			type: String,
			defaultValue: "",
		},

		/**
		 * According to your <code>minWidth</code> settings, the <code>ui5-table-column</code> can be hidden
		 * in different screen sizes.
		 * </br></br>
		 * Setting this property to <code>true</code>, shows this column as pop-in instead of hiding it.
		 *
		 * @type {boolean}
		 * @public
		 */
		demandPopin: {
			type: Boolean,
		},

		/**
		 * Defines the width of the column. If you leave it empty, then this column covers the remaining space.
		 *
		 * @type {CSSSize}
		 * @public
		 */
		width: {
			type: CSSSize,
			defaultValue: "",
		},

		_first: {
			type: Boolean,
			defaultValue: false,
		},
		_last: {
			type: Boolean,
			defaultValue: false,
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

	static get renderer() {
		return TableColumnRenderer;
	}

	static calculateTemplateContext(state) {
		const context = {
			ctr: state,
			classes: {
				main: {
					sapWCTableColumn: true,
					sapWCTableColumnFirst: state._first,
					sapWCTableColumnLast: state._last,
				},
			},
			styles: {
				main: {
				},
			},
		};

		return context;
	}
}

Bootstrap.boot().then(_ => {
	TableColumn.define();
});

export default TableColumn;
