import type CalendarLegendItem from "./CalendarLegendItem.js";

export default function (this: CalendarLegendItem) {
	return (
		<div
			class="ui5-calendar-legend-item-root"
			// TODO: update after changing ITabbable
			tabindex={parseInt(this.forcedTabIndex)}
		>
			<div class="ui5-calendar-legend-item-box"></div>
			<div class="ui5-calendar-legend-item-text">{this.effectiveText}</div>
		</div>
	);
};
	
	