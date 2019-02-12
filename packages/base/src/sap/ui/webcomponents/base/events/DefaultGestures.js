/**
 * Default gestures implementation using DOM APIs
 */

const gesturesMap = {
	"up": "mouseup",
	"down": "mousedown",
	"tap": "click",
};

let Gestures = {
	addListener:  (node, gestureName, handler) => {
		const stdEventName = gesturesMap[gestureName];
		node.addEventListener(stdEventName, (stdEvent) => {
			const eventTarget = stdEvent.ui5target;

			const gestureEvent = new Event(gestureName, { bubbles: true, cancelable: true, composed: true });
			gestureEvent.detail = stdEvent.detail;
			const defaultPrevented = !eventTarget.dispatchEvent(gestureEvent);

			if (defaultPrevented) {
				stdEvent.preventDefault();
			}
		});
		return node.addEventListener(gestureName, handler);
	},
	removeListener:  (node, gestureName, handler) => {
		const stdEventName = gesturesMap[gestureName];
		node.removeEventListener(stdEventName, handler);
		node.removeEventListener(gestureName, handler);
	},
};

export default Gestures;
export const injectGesturesProvider = (newGestures) => {
	Gestures = newGestures;
};
