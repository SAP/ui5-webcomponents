class TimelineItemTemplateContext {
	static calculate(state) {
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
		};
	}
}

export default TimelineItemTemplateContext;
