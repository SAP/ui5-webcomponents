import type TableRow from "./TableRow.js";
import TableCell from "./TableCell.js";
import CheckBox from "./CheckBox.js";
import RadioButton from "./RadioButton.js";
import Button from "./Button.js";

export default function TableRowTemplate(this: TableRow) {
	return (
		<>
			{ this._hasRowSelector &&
				<TableCell
					id="selection-cell"
					aria-selected={this._isSelected}
					data-ui5-table-cell-fixed
					data-ui5-table-selection-component
				>
					{ this._isMultiSelect ?
						<CheckBox id="selection-component"
							tabindex={-1}
							checked={this._isSelected}
							onChange={this._onSelectionChange}
							accessibleName={this._i18nRowSelector}
						></CheckBox>
						:
						<RadioButton id="selection-component"
							tabindex={-1}
							name={this._tableId}
							checked={this._isSelected}
							onChange={this._onSelectionChange}
							accessibleName={this._i18nRowSelector}
						></RadioButton>
					}
				</TableCell>
			}

			{ this._visibleCells.map(cell => (
				<slot name={cell._individualSlot}></slot>
			))}

			{ this._hasRowActions &&
				<TableCell id="actions-cell">
					{ this._flexibleActions.map(action => (
						<slot name={action._individualSlot}></slot>
					))}

					{ this._hasOverflowActions &&
						<Button
							id="overflow"
							icon="overflow"
							design="Transparent"
							onClick={this._onOverflowButtonClick}
						></Button>
					}

					{ this._fixedActions.map(action => (
						<slot name={action._individualSlot}></slot>
					))}
				</TableCell>
			}

			{ this._renderNavigated &&
				<TableCell id="navigated-cell" data-excluded-from-navigation={true}>
					<div id="navigated"></div>
				</TableCell>
			}

			{ this._popinCells.length > 0 &&
				<TableCell id="popin-cell">
					{ this._popinCells.map(cell => (
						<slot name={cell._individualSlot}></slot>
					))}
				</TableCell>
			}
		</>
	);
}
