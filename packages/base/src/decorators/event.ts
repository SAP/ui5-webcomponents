/**
 * Returns an event class decorator.
 *
 * @param { string } name the event name
 * @param { EventData } data the event data
 * @returns { ClassDecorator }
 */
const event = <EventDetail>(name: string, data: { detail?: Record<keyof EventDetail, { type: any }>, bubbles?: boolean, cancelable?: boolean } = {}): ClassDecorator => {
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
			data.bubbles = !!data.bubbles;
			data.cancelable = !!data.cancelable;
			eventsMetadata[name] = data;
		}
	};
};

export default event;
