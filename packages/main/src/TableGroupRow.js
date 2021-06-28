import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import TableGroupRowTemplate from "./generated/templates/TableGroupRowTemplate.lit.js";
import TableMode from "./types/TableMode.js";

// Texts
import {
	TABLE_GROUP_ROW_ARIA_LABEL,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import styles from "./generated/themes/TableGroupRow.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-table-group-row",
	slots: /** @lends sap.ui.webcomponents.main.TableGroupRow.prototype */ {
		/**
		 * Defines the text of the component.
		 * <br>
		 * <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.TableGroupRow.prototype */ {
		/**
		 * Defines the mode of the row
		 *
		 * <br><br>
		 * <b>Note:</b>
		 * Available options are:
		 * <ul>
		 * <li><code>None</code></li>
		 * <li><code>SingleSelect</code></li>
		 * <li><code>MultiSelect</code></li>
		 * </ul>
		 * @type {TableMode}
		 * @defaultvalue "None"
		 * @private
		 */
		mode: {
			type: TableMode,
			defaultValue: TableMode.None,
		},
		_columnsInfo: {
			type: Object,
			multiple: true,
		},
		_tabIndex: {
			type: String,
			defaultValue: "-1",
		},
		_busy: {
			type: Boolean,
		},
		_ariaPosition: {
			type: String,
			defaultValue: "",
			noAttribute: true,
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-table-group-row</code> component represents a group row in the <code>ui5-table</code>.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-table-group-row</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>group-row - Used to style the native <code>tr</code> tag element.</li>
 * </ul>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.TableGroupRow
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-table-group-row
 * @since 1.0.0-rc.15
 * @public
 */
class TableGroupRow extends UI5Element {
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
		return TableGroupRowTemplate;
	}

	constructor() {
		super();
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	get colSpan() {
		return this._colSpan;
	}

	get ariaLabelText() {
		return `${this.i18nBundle.getText(TABLE_GROUP_ROW_ARIA_LABEL)} ${this.innerText}. ${this._ariaPosition}`;
	}

	visibleColCount() {
		let count = this._columnsInfo.reduce((acc, column) => {
			return column.visible ? ++acc : acc;
		}, 0);

		if (this.mode === TableMode.MultiSelect) {
			count++;
		}

		return count;
	}

	onBeforeRendering() {
		if (!this._columnsInfo || this._columnsInfo.length === 0) {
			return;
		}
		this._colSpan = this.visibleColCount();
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}
}

TableGroupRow.define();

export default TableGroupRow;
