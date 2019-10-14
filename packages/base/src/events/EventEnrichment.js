
const EventEnrichment = {};

let enriched = false;

EventEnrichment.run = function run() {
	if (enriched) {
		return;
	}

	const stopPropagationSet = new WeakSet();
	const stopImmediatePropagationSet = new WeakSet();

	const originalStopPropagation = Event.prototype.stopPropagation;
	const originalStopImmediatePropagation = Event.prototype.stopImmediatePropagation;

	Event.prototype.stopPropagation = function stopPropagation() {
		stopPropagationSet.add(this);
		return originalStopPropagation.apply(this, arguments); // eslint-disable-line
	};

	Event.prototype.isPropagationStopped = function isPropagationStopped() {
		return stopPropagationSet.has(this);
	};

	Event.prototype.stopImmediatePropagation = function stopImmediatePropagation() {
		stopImmediatePropagationSet.add(this);
		return originalStopImmediatePropagation.apply(this, arguments); // eslint-disable-line
	};

	Event.prototype.isImmediatePropagationStopped = function isImmediatePropagationStopped() {
		return stopImmediatePropagationSet.has(this);
	};

	enriched = true;
};

export default EventEnrichment;
