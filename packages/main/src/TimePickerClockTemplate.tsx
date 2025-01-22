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
				"ui5-tp-clock-active": this.active,
			}}
		>

			<div data-label={this.label} class="ui5-tp-clock-dial"></div>

			<div class="ui5-tp-clock-items">
				{this._items.map((item, i) => (
					<div class="ui5-tp-clock-item" style={{ transform: `translate(-50%) rotate(${(i + 1) * this._angleStep}deg` }}>
						{ item.item ?
							<>
								<span class="ui5-tp-clock-dot"></span>
								<span id={`${this._id}-${item.item}`}
									class="ui5-tp-clock-number"
									style={{ transform: `rotate(-${(i + 1) * this._angleStep}deg)` }}
								>
									{item.item}
								</span>
							</>
							:
							<span class="ui5-tp-clock-mid-dot"></span>
						}
					</div>
				))}
			</div>

			<div class="ui5-tp-clock-markers">
				{this._selectedItem.showMarker &&
				<div
					class="ui5-tp-clock-item"
					style={{ transform: `translate(-50%) rotate(${this._selectedItem.angle || 0}deg)` }}
				>
					<div class="ui5-tp-clock-select-marker"></div>
					<div
						class={this._selectedItem.itemClasses}
						style={{ transform: `rotate(-${this._selectedItem.angle || 0}deg)` }}
					>{this._selectedItem.item}</div>
				</div>
				}

				{this._hoveredItem.showMarker &&
				<div
					class="ui5-tp-clock-item"
					style={{ transform: `translate(-50%) rotate(${this._hoveredItem.angle || 0}deg)` }}
				>
					<div class="ui5-tp-clock-hover-marker"></div>
					<div
						class={this._hoveredItem.itemClasses}
						style={{ transform: `rotate(-${this._hoveredItem.angle || 0}deg)` }}
					>{this._hoveredItem.item}</div>
				</div>
				}
			</div>

			<div
				class={{
					"ui5-tp-clock-cover": true,
					"ui5-tp-clock-pointer": this._hoveredItem.showMarker,
				}}
				onTouchStart={this._onTouchStart}
				onTouchMove={this._onTouchMove}
				onTouchEnd={this._onTouchEnd}
				onMouseDown={this._onTouchStart}
				onMouseMove={this._onTouchMove}
				onMouseUp={this._onTouchEnd}
				onMouseOut={this._onMouseOut}
				onWheel={this._onMouseWheel}
			></div>
		</div>);
}
