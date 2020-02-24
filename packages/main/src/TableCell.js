import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { html, render } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import styles from "./generated/themes/TableCell.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-table-cell</code> component defines the structure of the data in a single <code>ui5-table</code> cell.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.TableCell
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-table-cell
 * @public
 */
class TableCell extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: "open" });
		const template = html`
			<style>${styles}</style>
			<td @click=${this._onclick} tabindex="-1">
				<slot></slot>
			</td>`;

		render(template, shadow, { eventContext: this });
	}

	_onclick(event) {
		UI5Element.prototype.fireEvent.call(this, "_cellclick", event);
	}
}

customElements.define("ui5-table-cell", TableCell);

export default TableCell;
