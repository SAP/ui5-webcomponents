import type TableCell from "./TableCell.js";

export default function TableCellTemplate(this: TableCell) {
	return (
		<>
			{ this._popin &&
				// TODO: Handle nodes correctly
				<>
					{ this._popinHeaderNodes.map(node => (node))}
					<span class="popin-colon">{this._i18nPopinColon}</span>
				</>
			}
			<slot></slot>
		</>
	);
}
