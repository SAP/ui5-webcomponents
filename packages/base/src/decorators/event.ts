import { EventData } from "../UI5ElementMetadata.js";

/**
 * Returns an event class decorator.
 *
 * @param { string } name the event name
 * @param { EventData } data the event data
 * @returns { PropertyDecorator }
 */
const event = (name: string, data: EventData = {}): PropertyDecorator => (target: any, propertyName: string | symbol): void => {
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
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	target[propertyName] = function (eventData: any, cancellable: boolean, bubbles: boolean): any {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.fireEvent(name, eventData, cancellable, bubbles);
	};
};

export default event;

export type FireEventFn<EventData = any> = (eventData?: EventData, cancellable?: boolean, bubbles?: boolean) => void | boolean;
