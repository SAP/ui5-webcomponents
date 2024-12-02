import type UI5Element from "../UI5Element.js";

// type IsAny<T> = 0 extends (1 & T) ? true : false;
// type EventDetailsValues<T extends UI5Element> = T["eventDetails"][keyof T["eventDetails"]];
// type HasOwnEventDetails<T extends UI5Element> = IsAny<EventDetailsValues<T>> extends true ? false : true;
// type ExtractEventKeys<T extends typeof UI5Element> = HasOwnEventDetails<InstanceType<T>> extends true ? keyof InstanceType<T>["eventDetails"] : "eventDetails missing or has value with type any"

// type IsAny<T> = 0 extends (1 & T) ? true : false;
// type EventDetailsValues<T extends UI5Element> = T["eventDetails"][keyof T["eventDetails"]];
// type HasOwnEventDetails<T extends UI5Element> = IsAny<EventDetailsValues<T>> extends true ? false : true;
type EventDetailKeys<T extends typeof UI5Element> = keyof InstanceType<T>["eventDetails"];
type ExtractEventKeys<T extends typeof UI5Element> = EventDetailKeys<T> extends never ? "event name not found in `eventDetails` field" : keyof InstanceType<T>["eventDetails"];

/**
 * Returns an event class decorator.
 *
 * @param { string } name the event name
 * @param { EventData } data the event data
 * @returns { ClassDecorator }
 */
const event = <T extends typeof UI5Element, N extends ExtractEventKeys<T>>(name: N, data: { bubbles?: boolean, cancelable?: boolean } = {}): (target: T) => T | void => {
	return (target: T) => {
		if (!Object.prototype.hasOwnProperty.call(target, "metadata")) {
			target.metadata = {};
		}

		const metadata = target.metadata;
		if (!metadata.events) {
			metadata.events = {};
		}

		const eventsMetadata = metadata.events;
		if (!eventsMetadata[name as string]) {
			data.bubbles = !!data.bubbles;
			data.cancelable = !!data.cancelable;
			eventsMetadata[name as string] = data;
		}
	};
};

export default event;
