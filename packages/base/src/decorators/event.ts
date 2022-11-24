import { Event } from "../UI5ElementMetadata.js";

type EventDescriptor = PropertyDecorator;

/**
 * Returns an event decorator.
 *
 * @param { object } detail the event detail
 * @returns { EventDescriptor }
 */
const event = (detail: object): EventDescriptor => {
	return (target: any, eventKey: string | symbol) => {
		const eventsMetadata = target.constructor.getMetadata().getEvents();

		if (!eventsMetadata[eventKey as string]) {
			eventsMetadata[eventKey as string] = detail;
		}
	};
};

export default event;

export {
	Event,
};
