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
		let eventListeners = eventRegistry[eventName];

		if (!eventListeners) {
			return;
		}

		eventListeners = eventListeners.filter(event => {
			return event["function"] !== fnFunction; // eslint-disable-line
		});

		if (eventListeners.length === 0) {
			delete eventRegistry[eventName];
		}
	}

	/**
	 * Fires an event and returns the results of all event listeners as an array.
	 *
	 * @param eventName the event to fire
	 * @param data optional data to pass to each event listener
	 * @returns {Array} an array with the results of all event listeners
	 */
	fireEvent(eventName, data) {
		const eventRegistry = this._eventRegistry;
		const eventListeners = eventRegistry[eventName];

		if (!eventListeners) {
			return [];
		}

		return eventListeners.map(event => {
			return event["function"].call(this, data); // eslint-disable-line
		});
	}

	/**
	 * Fires an event and returns a promise that will resolve once all listeners have resolved.
	 *
	 * @param eventName the event to fire
	 * @param data optional data to pass to each event listener
	 * @returns {Promise} a promise that will resolve when all listeners have resolved
	 */
	fireEventAsync(eventName, data) {
		return Promise.all(this.fireEvent(eventName, data));
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
