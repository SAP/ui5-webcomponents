
const EventEnrichment = {};

let enriched = false;

EventEnrichment.run = function () {
	if (enriched) {
		return;
	}

	const stopPropagationSet = new WeakSet();
	const stopImmediatePropagationSet = new WeakSet();

	const originalStopPropagation = Event.prototype.stopPropagation;
	const originalStopImmediatePropagation = Event.prototype.stopImmediatePropagation;

	Event.prototype.stopPropagation = function () {
		stopPropagationSet.add(this);
		return originalStopPropagation.apply(this, arguments);
	};

	Event.prototype.isPropagationStopped = function () {
		return stopPropagationSet.has(this);
	};

	Event.prototype.stopImmediatePropagation = function () {
		stopImmediatePropagationSet.add(this);
		return originalStopImmediatePropagation.apply(this, arguments);
	};

	Event.prototype.isImmediatePropagationStopped = function () {
		return stopImmediatePropagationSet.has(this);
	};

	enriched = true;
};

export default EventEnrichment;
