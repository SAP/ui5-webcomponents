import type Table from "./Table.js";
import TableRow from "./TableRow.js";
import TableCell from "./TableCell.js";
import DropIndicator from "./DropIndicator.js";
import BusyIndicator from "./BusyIndicator.js";

export default function TableTemplate(this: Table) {
	return (
		<>
			<div id="before" role="none" tabindex={0} ui5-table-dummy-focus-area></div>

			<div id="table" role="grid"
				style={this.styles.table}
				aria-label={this._ariaLabel}
				aria-rowcount={this._ariaRowCount}
				aria-multiselectable={this._ariaMultiSelectable}
			>
				<slot name="headerRow"></slot>
				<div id="rows">
					<div id="spacer" style={this.styles.spacer}>
						<slot></slot>
					</div>
				</div>

				{ this.rows.length === 0 &&
					<TableRow id="nodata-row">
						<TableCell id="nodata-cell" data-excluded-from-navigation horizontal-align="Center">
							{ this.nodata.length > 0 ?
								<slot name="nodata"></slot>
								:
								this._effectiveNoDataText
							}
						</TableCell>
					</TableRow>
				}

				{ this.rows.length > 0 && this._getGrowing()?.hasGrowingComponent() &&
					<div id="footer" role="rowgroup">
						{ growingRow.call(this) }
					</div>
				}

				<DropIndicator
					orientation="Horizontal"
					ownerReference={this}
				></DropIndicator>

				<div aria-hidden="true" id="table-end-row">
					<div id="table-end-cell">
						<div id="table-end" aria-hidden="true" tabindex={-1}></div>
					</div>
				</div>

				{ this.loading &&
					<BusyIndicator id="loading"
						delay={this.loadingDelay}
						active={true}
						data-sap-focus-ref
					></BusyIndicator>
				}
			</div>

			<div id="after" role="none" tabindex={0} ui5-table-dummy-focus-area></div>
		</>
	);
}

function growingRow(this: Table) {
	return (
		<TableRow id="growing-row" ui5-growing-row>
			<TableCell id="growing-cell">
				<slot name={this._getGrowing()?._individualSlot}></slot>
			</TableCell>
		</TableRow>
	);
}
