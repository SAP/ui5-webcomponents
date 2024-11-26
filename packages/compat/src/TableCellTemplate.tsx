import type TableCell from "./TableCell.js";

export default function (this: TableCell) {
	return (
		<td
			tabindex={-1}
			part="cell"
			role="cell"
		>
			<slot></slot>
		</td>
	);
};
