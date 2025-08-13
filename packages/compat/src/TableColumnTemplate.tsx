import type TableColumn from "./TableColumn.js";

export default function TableColumnTemplate(this: TableColumn) {
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
