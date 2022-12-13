/**
 * Returns the normalized event target in cases when it has shadow root.
 * @param {Object} target The original event target
 * @returns {Object} The normalized target
 */
const getNormalizedTarget = (target: HTMLElement) => {
	let element = target;

	if (target.shadowRoot && target.shadowRoot.activeElement) {
		element = target.shadowRoot.activeElement as HTMLElement;
	}

	return element;
};

export default getNormalizedTarget;
