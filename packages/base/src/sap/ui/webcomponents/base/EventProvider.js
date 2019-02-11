class EventProvider {
	constructor() {
		this._eventRegistry = {};
	}

	attachEvent(eventName, fnFunction) {
		let eventRegistry = this._eventRegistry;
		let eventListeners = eventRegistry[eventName];

		if (!Array.isArray(eventListeners)) {
			eventListeners = eventRegistry[eventName] = [];
		}

		eventListeners.push({
			'function': fnFunction
		});
	}

	detachEvent(eventName, fnFunction) {
		let eventRegistry = this._eventRegistry;
		let eventListeners = eventRegistry[eventName];

		if (!eventListeners) {
			return;
		}

		for (let i = 0; i < eventListeners.length; i++) {
			let event = eventListeners[i];
			if (event['function'] == fnFunction) {
				eventListeners.splice(i, 1);
			}
		}

		if (eventListeners.length == 0) {
			delete eventRegistry[eventName];
		}
	}

	fireEvent(eventName, data) {
		let eventRegistry = this._eventRegistry;
		let eventListeners = eventRegistry[eventName];

		if (!eventListeners) {
			return;
		}

		eventListeners.forEach(event => {
			event['function'].call(this, data);
		});
	}

	isHandlerAttached(eventName, fnFunction) {
		let eventRegistry = this._eventRegistry;
		let eventListeners = eventRegistry[eventName];

		if (!eventListeners) {
			return false;
		}

		for (let i = 0; i < eventListeners.length; i++) {
			let event = eventListeners[i];
			if (event['function'] == fnFunction) {
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