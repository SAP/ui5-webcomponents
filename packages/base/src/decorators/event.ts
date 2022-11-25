import { EventData } from "../UI5ElementMetadata.js";

type EventDescriptor = PropertyDecorator;

/**
 * Returns an event decorator.
 *
 * @param { string } name the event name
 * @param { EventData } data the event data
 * @returns { EventDescriptor }
 */
const event = (name: string, data: EventData): EventDescriptor => {
	return (target: any) => {
		const eventsMetadata = target.getMetadata().getEvents();

		if (!eventsMetadata[name]) {
			eventsMetadata[name] = data;
		}
	};
};

export default event;
