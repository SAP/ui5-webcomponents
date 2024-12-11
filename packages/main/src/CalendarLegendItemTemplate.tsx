import type CalendarLegendItem from "./CalendarLegendItem.js";

export default function CalendarLegendItemTemplate(this: CalendarLegendItem) {
	return (
		<div
			class="ui5-calendar-legend-item-root"
			// TOFIX: update after changing ITabbable
			tabindex={parseInt(this.forcedTabIndex)}
			role="listitem"
		>
			<div class="ui5-calendar-legend-item-box"></div>
			<div class="ui5-calendar-legend-item-text">{this.effectiveText}</div>
		</div>
	);
}
