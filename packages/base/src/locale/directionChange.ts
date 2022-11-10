import EventProvider from "../EventProvider.js";

type DirectionChangeCallback = () => any;

const eventProvider = new EventProvider();
const DIR_CHANGE = "directionChange";

/**
 * Attach a callback that will be executed whenever the application calls the "applyDirection" function
 * @public
 * @param listener
 */
const attachDirectionChange = (listener: DirectionChangeCallback) => {
	eventProvider.attachEvent(DIR_CHANGE, listener);
};

/**
 * Detach a callback that was passed with "attachDirectionChange"
 * @public
 * @param listener
 */
const detachDirectionChange = (listener: DirectionChangeCallback) => {
	eventProvider.detachEvent(DIR_CHANGE, listener);
};

const fireDirectionChange = () => {
	return eventProvider.fireEvent(DIR_CHANGE);
};

export {
	attachDirectionChange,
	detachDirectionChange,
	fireDirectionChange,
};
