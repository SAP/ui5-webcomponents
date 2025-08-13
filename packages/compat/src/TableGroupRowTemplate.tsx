import type TableGroupRow from "./TableGroupRow.js";

export default function TableGroupRowTemplate(this: TableGroupRow) {
	return (
		<tr
			part="group-row"
			class="ui5-table-group-row-root"
			aria-label={this.ariaLabelText}
			tabindex={this.forcedTabIndex ? parseInt(this.forcedTabIndex) : undefined}
			onFocusIn={this._onfocusin}
		>
			<td colspan={this.colSpan}>
				<slot></slot>
			</td>
		</tr>
	);
}
