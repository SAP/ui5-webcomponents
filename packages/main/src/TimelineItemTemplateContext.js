import "@ui5/webcomponents-base/src/shims/jquery-shim";
import "@ui5/webcomponents-base/src/shims/Core-shim";
import DateFormat from "@ui5/webcomponents-core/dist/sap/ui/core/format/DateFormat";

class TimelineItemTemplateContext {
	static calculate(state) {
		const dateTimeFormat = DateFormat.getDateTimeInstance({ pattern: state.timeFormat, calendarType: "Gregorian" });

		return {
			ctr: state,
			classes: {
				indicator: {
					sapWCTimelineIndicator: true,
					sapWCTimelineIndicatorNoIcon: !state.icon,
				},
			},
			styles: {
			},
			dateTime: dateTimeFormat.format(new Date(state.timestamp)),
		};
	}
}

export default TimelineItemTemplateContext;
