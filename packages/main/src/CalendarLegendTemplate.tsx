import type CalendarLegend from "./CalendarLegend.js";
import CalendarLegendItem from "./CalendarLegendItem.js";

export default function (this: CalendarLegend) {
	return (
		<div class="ui5-calendar-legend-root"
			onFocusOut={this._onFocusOut}
			onFocusIn={this._onFocusIn}
			onKeyDown={this._onItemKeyDown}
			onMouseDown={this._onMouseDown}
		>
			{this.defaultItemsMapping.map((item) =>
				{!item.hide &&
					<CalendarLegendItem type={item.type}></CalendarLegendItem>
				}
			)}

			{this.legendItems.map((item) => 
				<slot name={item._individualSlot}></slot>
			)}
	</div>);
};
