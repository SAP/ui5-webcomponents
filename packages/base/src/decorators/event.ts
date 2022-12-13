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
		if (!Object.prototype.hasOwnProperty.call(target, "decoratorMetadata")) {
			target.decoratorMetadata = {};
		}

		const decoratorMetadata = target.decoratorMetadata;
		if (!decoratorMetadata.events) {
			decoratorMetadata.events = {};
		}

		const eventsMetadata = decoratorMetadata.events;
		if (!eventsMetadata[name]) {
			eventsMetadata[name] = data;
		}
	};
};

export default event;
