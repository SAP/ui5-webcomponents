class EventProvider {
	constructor() {
		this._eventRegistry = {};
	}

	attachEvent(eventName, fnFunction) {
		const eventRegistry = this._eventRegistry;
		let eventListeners = eventRegistry[eventName];

		if (!Array.isArray(eventListeners)) {
			eventRegistry[eventName] = [];
			eventListeners = eventRegistry[eventName];
		}

		eventListeners.push({
			"function": fnFunction,
		});
	}

	detachEvent(eventName, fnFunction) {
		const eventRegistry = this._eventRegistry;
		const eventListeners = eventRegistry[eventName];

		if (!eventListeners) {
			return;
		}

		for (let i = 0; i < eventListeners.length; i++) {
			const event = eventListeners[i];
			if (event["function"] === fnFunction) { // eslint-disable-line
				eventListeners.splice(i, 1);
			}
		}

		if (eventListeners.length === 0) {
			delete eventRegistry[eventName];
		}
	}

	fireEvent(eventName, data) {
		const eventRegistry = this._eventRegistry;
		const eventListeners = eventRegistry[eventName];

		if (!eventListeners) {
			return;
		}

		eventListeners.forEach(event => {
			event["function"].call(this, data); // eslint-disable-line
		});
	}

	isHandlerAttached(eventName, fnFunction) {
		const eventRegistry = this._eventRegistry;
		const eventListeners = eventRegistry[eventName];

		if (!eventListeners) {
			return false;
		}

		for (let i = 0; i < eventListeners.length; i++) {
			const event = eventListeners[i];
			if (event["function"] === fnFunction) { // eslint-disable-line
				return true;
			}
		}

		return false;
	}

	hasListeners(eventName) {
		return !!this._eventRegistry[eventName];
	}
}

export default EventProvider;
