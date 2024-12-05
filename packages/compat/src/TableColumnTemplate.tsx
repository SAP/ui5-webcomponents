import type TableColumn from "./TableColumn.js";

export default function (this: TableColumn) {
	return (
		<th
			scope="col"
			part="column"
			role="columnheader"
		>
			<slot></slot>
		</th>
	);
}
