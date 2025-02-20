import Icon from "./Icon.js";
import type TableHeaderCell from "./TableHeaderCell.js";

export default function TableHeaderCellTemplate(this: TableHeaderCell) {
	return (
		<>
			<slot name="action"></slot>
			<slot></slot>
			{ this._sortIcon &&
				<Icon name={this._sortIcon}></Icon>
			}
		</>
	);
}
