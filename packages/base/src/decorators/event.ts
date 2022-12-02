import { EventData } from "../UI5ElementMetadata.js";

/**
 * Returns an event class decorator.
 *
 * @param { string } name the event name
 * @param { EventData } data the event data
 * @returns { ClassDecorator }
 */
const event = (name: string, data: EventData = {}): ClassDecorator => {
	return (target: any) => {
		const eventsMetadata = target.getMetadata().getEvents();

		if (!eventsMetadata[name]) {
			eventsMetadata[name] = data;
		}
	};
};

export default event;
