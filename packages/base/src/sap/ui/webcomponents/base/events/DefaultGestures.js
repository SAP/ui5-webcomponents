/**
 * Default gestures implementation using DOM APIs
 */

const gesturesMap = {
	"up": "mouseup",
	"down": "mousedown",
	"tap": "click",
};

let Gestures = {
	addListener:  (node, gesture, handler) => {
		const standardEvent = gesturesMap[gesture];
		node.addEventListener(standardEvent, (event) => {
			if (event.defaultPrevented) {
				return false;
			}
			let gestureEvent = new Event(gesture, { bubbles: true, cancelable: true, composed: true });
			gestureEvent.detail = event.detail;
			event.target.dispatchEvent(gestureEvent);
		});
		return node.addEventListener(gesture, handler);
	},
	removeListener:  (node, gesture, handler) => {
		return node.removeEventListener(gesturesMap[gesture], handler);
	},
};

export default Gestures;
export const injectGesturesProvider = (newGestures) => {
	Gestures = newGestures;
};
