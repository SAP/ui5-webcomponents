import CheckBox from "@ui5/webcomponents/dist/CheckBox.js";
import type TableRow from "./TableRow.js";

export default function TableRowTemplate(this: TableRow) {
	return (
		<>
			<tr
				class="ui5-table-row-root"
				tabindex={this.forcedTabIndex ? parseInt(this.forcedTabIndex) : undefined}
				onFocusIn={this._onfocusin}
				onFocusOut={this._onfocusout}
				onClick={this._onrowclick}
				onKeyDown={this._onkeydown}
				onKeyUp={this._onkeyup}
				onMouseUp={this._onmouseup}
				onTouchStart={this._ontouchstart}
				onTouchEnd={this._ontouchend}
				aria-label={this.ariaLabelText}
				aria-selected={this.selected}
				aria-current={this._ariaCurrent}
				data-sap-focus-ref
				part="row"
			>
				{this.isMultiSelect &&
				<td
					class="ui5-table-multi-select-cell"
					aria-hidden="true"
					role="presentation"
				>
					<CheckBox
						class="ui5-multi-select-checkbox"
						checked={this.selected}
						accessibleName={this.ariaLabelRowSelection}
						onChange={this._handleSelection}
						tabindex={-1}
					/>
				</td>
				}

				{this.shouldPopin ?
					this.visibleCells.map(cell => <slot name={cell._individualSlot}></slot>)
					:
					this.cells.map(cell => <slot name={cell._individualSlot}></slot>)
				}

				<td class="ui5-table-row-navigated" aria-hidden="true">
					<div class="ui5-table-div-navigated"></div>
				</td>
			</tr>

			{
				this.shouldPopin && this.popinCells.map(cellData =>
					<tr
						part="popin-row"
						class={cellData.classes}
						onClick={this._onrowclick}
						onKeyDown={this._onkeydown}
						onKeyUp={this._onkeyup}
					>
						<td colspan={this.visibleCellsCount} role="cell">

							{cellData.popinDisplayInline ?
								<div class="ui5-table-display-inline-container">
									{cellData.popinText &&
									<span class="ui5-table-row-popin-title">{cellData.popinText}:</span>
									}
									<span class="ui5-table-cell-display-inline">
										<slot name={cellData.cell?._individualSlot}></slot>
									</span>
								</div>
								:
								<>
									{cellData.popinText &&
										<span class="ui5-table-row-popin-title">{cellData.popinText}:</span>
									}
									<div>
										<slot name={cellData.cell?._individualSlot}></slot>
									</div>
								</>
							}

						</td>

						<td class="ui5-table-row-navigated" aria-hidden="true">
							<div class="ui5-table-div-navigated"></div>
						</td>
					</tr>
				)
			}
		</>
	);
}
