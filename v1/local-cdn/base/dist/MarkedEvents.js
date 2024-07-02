const markedEvents = new WeakMap();
/**
 * Marks the given event with random marker.
 */
const markEvent = (event, value) => {
    markedEvents.set(event, value);
};
/**
 * Returns the marker for the given event.
 */
const getEventMark = (event) => {
    return markedEvents.get(event);
};
export { markEvent, getEventMark, };
//# sourceMappingURL=MarkedEvents.js.map