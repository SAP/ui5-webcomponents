import getOriginalEventTarget from "./getOriginalEventTarget";
import { getWCForceDefaultGestures } from "../Configuration";

/**
 * Default Gestures implementation using DOM APIs
 * Only addListener and removeListener are implemented
 * The gesture event object only supports the "sourceEvent" parameter, ("x" and "y" are not needed for anything yet)
 */

const gesturesMap = {
	"up": "mouseup",
	"down": "mousedown",
	"tap": "click",
};

let Gestures = { // eslint-disable-line
	addListener: (node, gestureName, handler) => {
		const stdEventName = gesturesMap[gestureName];
		node.addEventListener(stdEventName, stdEvent => {
			const eventTarget = getOriginalEventTarget(stdEvent);

			const gestureEventOptions = {
				bubbles: true,
				cancelable: true,
				composed: true,
			};
			const gestureEvent = new Event(gestureName, gestureEventOptions);
			gestureEvent.detail = {
				sourceEvent: stdEvent,
			};
			const defaultPrevented = !eventTarget.dispatchEvent(gestureEvent);

			if (defaultPrevented) {
				stdEvent.preventDefault();
			}
		});
		return node.addEventListener(gestureName, handler);
	},
	removeListener: (node, gestureName, handler) => {
		const stdEventName = gesturesMap[gestureName];
		node.removeEventListener(stdEventName, handler);
		node.removeEventListener(gestureName, handler);
	},
};

export { Gestures as default };
export const injectGesturesProvider = newGestures => {
	// Used for test purposes
	if (getWCForceDefaultGestures()) {
		return;
	}

	Gestures = newGestures;
};
