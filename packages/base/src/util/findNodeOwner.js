/**
 *  @param node - DOM Node
 *  @param {Object} settings - Defines the following settings: isInLightDOM, startFromParent
 */
const findNodeOwner = (node, settings = {
	isInLightDOM: false,
	startFromParent: false,
}) => {
	if (!(node instanceof HTMLElement)) {
		throw new Error("Argument node should be of type HTMLElement");
	}

	const ownerTypes = [HTMLHtmlElement, HTMLIFrameElement];
	let currentShadowRootFlag = true;
	let currentCustomElementFlag = true;

	if (settings.startFromParent) {
		node = node.parentNode || node.host;
	}

	while (node) {
		if (node.toString() === "[object ShadowRoot]") {
			// Web Component
			// or the shadow root of web component with attached shadow root
			if (currentShadowRootFlag) {
				currentShadowRootFlag = false;
			}
			if (!currentCustomElementFlag && !currentShadowRootFlag) {
				return node;
			}
		} else if (node.tagName && node.tagName.indexOf("-") > -1) {
			if (currentCustomElementFlag && !settings.isInLightDOM) {
				currentCustomElementFlag = false;
			} else {
				return node;
			}
		} else if (ownerTypes.indexOf(node.constructor) > -1) {
			// Document or Iframe reached
			return node;
		}

		node = node.parentNode || node.host;
	}
};

export default findNodeOwner;
