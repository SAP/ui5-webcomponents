import { getBubblingEvents as getConfiguredBubblingEvents } from "../InitialConfiguration.js";

let bubblingEvents;

const getBubblingEvents = () => {
	if (bubblingEvents === undefined) {
		bubblingEvents = getConfiguredBubblingEvents();
	}

	return bubblingEvents;
};

const setBubblingEvents = newBubblingEvents => {
	bubblingEvents = !!newBubblingEvents;
};

export {
	getBubblingEvents,
	setBubblingEvents,
};
