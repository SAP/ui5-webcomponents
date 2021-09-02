import setToArray from "./util/setToArray.js";

class EventProvider {
	constructor() {
		this._eventRegistry = new Map(); // map of sets (one set per event)
	}

	attachEvent(eventName, fnFunction) {
		const eventRegistry = this._eventRegistry;
		let eventListeners = eventRegistry.get(eventName);

		if (!eventListeners) {
			eventListeners = new Set();
			eventRegistry.set(eventName, eventListeners);
		}

		eventListeners.add(fnFunction);
	}

	detachEvent(eventName, fnFunction) {
		const eventRegistry = this._eventRegistry;
		const eventListeners = eventRegistry.get(eventName);

		if (!eventListeners) {
			return;
		}

		eventListeners.delete(fnFunction);

		if (eventListeners.size === 0) {
			eventRegistry.delete(eventListeners);
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
		const eventListeners = eventRegistry.get(eventName);

		if (!eventListeners) {
			return [];
		}

		return setToArray(eventListeners).map(event => {
			return event.call(this, data); // eslint-disable-line
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
		const eventListeners = eventRegistry.get(eventName);

		if (!eventListeners) {
			return false;
		}

		return eventRegistry.has(fnFunction);
	}

	hasListeners(eventName) {
		return !!this._eventRegistry[eventName];
	}
}

export default EventProvider;
