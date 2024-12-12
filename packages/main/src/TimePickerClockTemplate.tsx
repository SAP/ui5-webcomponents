import type TimePickerClock from "./TimePickerClock.js";

export default function TimePickerClockTemplate(this: TimePickerClock) {
	return (
		<div
			id={`${this._id}`}
			onDragStart={this.noop}
			onDrop={this.noop}
			aria-hidden="true"
			class={{
				"ui5-tp-clock": true,
				"ui5-tp-clock-inner": this.showInnerCircle,
				"ui5-tp-clock-active": this.active,
			}}
		>

			<div data-ui5-label={this.label} class="ui5-tp-clock-dial"></div>

			<div>
				{this._items.map((item, i) => (
					<div class="ui5-tp-clock-item" style={{ transform: `translate(-50%) rotate(${(i + 1) * 6}deg` }}>
						{
							item.item &&
						<>
							<span class="ui5-tp-clock-dot"></span>
							<span id={`${this._id}-${item.item}`}
								class="ui5-tp-clock-number"
								style={{ transform: `rotate(-${(i + 1) * 6}deg)` }}
							>
								{item.item}
							</span>
							{
								item.innerItem &&
									<span
										id={`${this._id}-${item.innerItem}`}
										class="ui5-tp-clock-number"
										style={{ transform: `rotate(-${(i + 1) * 6}deg)` }}
									>
										{item.innerItem}
									</span>
							}
						</>
						}

						{ !item.item && !this.hideFractions
						&& <span class="ui5-tp-clock-mid-dot"></span>
						}
					</div>
				))}

				{this._selectedItem.showMarker &&
				<div
					class="ui5-tp-clock-item ui5-tp-clock-item-with-marker"
					style={{ transform: `translate(-50%) rotate(${this._selectedItem.angle || 0}deg)` }}
				>
					<div class="ui5-tp-clock-marker"></div>
					<div
						class={this._selectedItem.itemClasses}
						style={{ transform: `rotate(-${this._selectedItem.angle || 0}deg)` }}
					>{this._selectedItem.item}</div>

					<div id={`${this._id}-selected`}
						class={this._selectedItem.innerItemClasses}
						style={{ transform: `rotate(-${this._selectedItem.angle || 0}deg)` }}
					>{this._selectedItem.innerItem}</div>
				</div>
				}
			</div>

			<div
				class="ui5-tp-clock-cover"
				onTouchStart={this._onTouchStart}
				onTouchMove={this._onTouchMove}
				onTouchEnd={this._onTouchEnd}
				onMouseDown={this._onTouchStart}
				onMouseMove={this._onTouchMove}
				onMouseUp={this._onTouchEnd}
				onMouseOut={this._onMouseOut}
				ref={this._captureClockRef.bind(this)}
			></div>
		</div>);
}
