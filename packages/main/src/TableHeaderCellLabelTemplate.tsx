import Icon from "./Icon.js";
import Label from "./Label.js";
import Button from "./Button.js";
import TableSortOrder from "./types/TableSortOrder.js";
import ai from "@ui5/webcomponents-icons/dist/ai.js";
import sortAscending from "@ui5/webcomponents-icons/dist/sort-ascending.js";
import sortDescending from "@ui5/webcomponents-icons/dist/sort-descending.js";
import type TableHeaderCellLabel from "./TableHeaderCellLabel.js";

function renderAIButton(this: TableHeaderCellLabel) {
	if (this.aiGenerated) {
		return (
			<Button
				id="ai-button"
				icon={ai}
				design="Transparent"
				onClick={this._onAIButtonClick}
			/>
		);
	}
}

function renderSortIcon(this: TableHeaderCellLabel) {
	if (this.sortOrder !== TableSortOrder.None) {
		return (
			<Icon
				id="sort-icon"
				design="NonInteractive"
				name={this.sortOrder === TableSortOrder.Ascending ? sortAscending : sortDescending}
			/>
		);
	}
}

export default function TableHeaderCellLabelTemplate(this: TableHeaderCellLabel) {
	return (
		<>
			{!this.popin && renderAIButton.call(this)}
			<Label
				id="label"
				required={this.required}
				wrappingType={this.wrappingType}
			>
				<slot></slot>
			</Label>
			{this.popin && renderAIButton.call(this)}
			{!this.popin && renderSortIcon.call(this)}
		</>
	);
}
