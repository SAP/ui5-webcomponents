import type CalendarLegend from "./CalendarLegend.js";
import CalendarLegendItem from "./CalendarLegendItem.js";

export default function CalendarLegendTemplate(this: CalendarLegend) {
	return (
		<div class="ui5-calendar-legend-root"
			onFocusOut={this._onFocusOut}
			onFocusIn={this._onFocusIn}
			onKeyDown={this._onItemKeyDown}
			onMouseDown={this._onMouseDown}
			role="list"
			aria-roledescription={this._roleDescription}
		>
			{this.defaultItemsMapping.filter(item => !item.hide).map(item =>
				<CalendarLegendItem type={item.type}/>
			)}

			{this.legendItems.map(item =>
				<slot name={item._individualSlot}></slot>
			)}
		</div>);
}
