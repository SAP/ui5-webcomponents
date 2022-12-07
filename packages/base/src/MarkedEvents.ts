const markedEvents = new WeakMap<Event, string>();

/**
 * Marks the given event with random marker.
 */
const markEvent = (event: Event, value: string) => {
	markedEvents.set(event, value);
};

/**
 * Returns the marker for the given event.
 */
const getEventMark = (event: Event): string | undefined => {
	return markedEvents.get(event);
};

export {
	markEvent,
	getEventMark,
};
