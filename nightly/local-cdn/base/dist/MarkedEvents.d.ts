/**
 * Marks the given event with random marker.
 */
declare const markEvent: (event: Event, value: string) => void;
/**
 * Returns the marker for the given event.
 */
declare const getEventMark: (event: Event) => string | undefined;
export { markEvent, getEventMark, };
