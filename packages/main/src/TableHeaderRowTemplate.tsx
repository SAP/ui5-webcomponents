import CheckBox from "./CheckBox.js";
import TableHeaderCell from "./TableHeaderCell.js";
import Icon from "./Icon.js";
import IconMode from "./types/IconMode.js";
import ClearAll from "@ui5/webcomponents-icons/dist/clear-all.js";
import IconDesign from "./types/IconDesign.js";
import type TableHeaderRow from "./TableHeaderRow.js";

export default function TableHeaderRowTemplate(this: TableHeaderRow) {
	return (
		<>
			{ this._hasSelector &&
				<TableHeaderCell id="selection-cell"
					aria-selected={this._isSelected}
					aria-label={this._i18nSelection}
					data-ui5-table-cell-fixed
					data-ui5-table-selection-component
				>
					{ !this._isMultiSelect ?
						<></>
						:
						this._shouldRenderClearAll ?
							<Icon
								name={ClearAll}
								mode={IconMode.Decorative}
								showTooltip={true}
								accessibleName={this._i18nDeselectAllRows}
								design={this._hasSelectedRows ? IconDesign.Default : IconDesign.NonInteractive}
								onClick={this._onSelectionChange}
							></Icon>
							:
							<CheckBox id="selection-component"
								tabindex={-1}
								checked={this._isSelected}
								onChange={this._onSelectionChange}
								accessibleName={this._i18nRowSelector}
								title={this._isSelected ? this._i18nDeselectAllRows : this._i18nSelectAllRows}
							></CheckBox>
					}
				</TableHeaderCell>
			}

			{ this._visibleCells.map(cell => (
				<slot name={cell._individualSlot} key={cell._individualSlot}></slot>
			))}

			{ this._rowActionCount > 0 &&
				<TableHeaderCell id="actions-cell"
					aria-label={this._i18nRowActions}
				></TableHeaderCell>
			}

			{ this._popinCells.length > 0 &&
				<TableHeaderCell id="popin-cell"
					aria-label={this._i18nRowPopin}
					data-excluded-from-navigation
				></TableHeaderCell>
			}
		</>
	);
}
