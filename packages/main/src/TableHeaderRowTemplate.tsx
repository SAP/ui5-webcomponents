import CheckBox from "./CheckBox.js";
import TableHeaderCell from "./TableHeaderCell.js";
import type TableHeaderRow from "./TableHeaderRow.js";

export default function TableHeaderRowTemplate(this: TableHeaderRow) {
	return (
		<>
			{ this._hasRowSelector &&
				<TableHeaderCell id="selection-cell"
					aria-selected={this._isSelected}
					aria-label={this._i18nSelection}
					ui5-table-cell-fixed
					ui5-table-selection-component
				>
					{ this._isMultiSelect &&
						<CheckBox id="selection-component"
							tabindex={-1}
							checked={this._isSelected}
							onChange={this._informSelectionChange}
							accessible-name={this._i18nRowSelector}
						></CheckBox>
					}
				</TableHeaderCell>
			}

			{ this._visibleCells.map(cell => (
				<slot name={cell._individualSlot} key={cell._individualSlot}></slot>
			))}

			{ this._hasRowActions &&
				<TableHeaderCell id="actions-cell"
					aria-label={this._i18nRowActions}
				></TableHeaderCell>
			}

			{ this._popinCells.length > 0 &&
				<TableHeaderCell id="popin-cell"
					aria-label={this._i18nRowPopin}
					excluded-from-navigation
				></TableHeaderCell>
			}
		</>
	);
}
