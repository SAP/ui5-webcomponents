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
		if (!Object.prototype.hasOwnProperty.call(target, "metadata")) {
			target.metadata = {};
		}

		const metadata = target.metadata;
		if (!metadata.events) {
			metadata.events = {};
		}

		const eventsMetadata = metadata.events;
		if (!eventsMetadata[name]) {
			eventsMetadata[name] = data;
		}
	};
};

export default event;
