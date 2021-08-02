import getSharedResource from "../getSharedResource.js";
import { getFeature } from "../FeaturesRegistry.js";
import getActiveElement from "./getActiveElement.js";

const PopupUtilsData = getSharedResource("PopupUtilsData", {});
PopupUtilsData.currentZIndex = PopupUtilsData.currentZIndex || 100;

const getFocusedElement = () => {
	const element = getActiveElement();
	return (element && typeof element.focus === "function") ? element : null;
};

const isFocusedElementWithinNode = node => {
	const fe = getFocusedElement();

	if (fe) {
		return isNodeContainedWithin(node, fe);
	}

	return false;
};

const isNodeContainedWithin = (parent, child) => {
	let currentNode = parent;

	if (currentNode.shadowRoot) {
		currentNode = Array.from(currentNode.shadowRoot.children).find(n => n.localName !== "style");
	}

	if (currentNode === child) {
		return true;
	}

	const childNodes = currentNode.localName === "slot" ? currentNode.assignedNodes() : currentNode.children;

	if (childNodes) {
		return Array.from(childNodes).some(n => isNodeContainedWithin(n, child));
	}
};

const isPointInRect = (x, y, rect) => {
	return x >= rect.left && x <= rect.right
		&& y >= rect.top && y <= rect.bottom;
};

const isClickInRect = (event, rect) => {
	let x;
	let y;

	if (event.touches) {
		const touch = event.touches[0];
		x = touch.clientX;
		y = touch.clientY;
	} else {
		x = event.clientX;
		y = event.clientY;
	}

	return isPointInRect(x, y, rect);
};

const getClosedPopupParent = el => {
	const parent = el.parentElement || (el.getRootNode && el.getRootNode().host);

	if (parent && ((parent.showAt && parent.isUI5Element) || (parent.open && parent.isUI5Element) || parent === document.documentElement)) {
		return parent;
	}

	return getClosedPopupParent(parent);
};

const getNextZIndex = () => {
	const OpenUI5Support = getFeature("OpenUI5Support");
	if (OpenUI5Support && OpenUI5Support.isLoaded()) { // use OpenUI5 for getting z-index values, if loaded
		return OpenUI5Support.getNextZIndex();
	}

	PopupUtilsData.currentZIndex += 2;
	return PopupUtilsData.currentZIndex;
};

const getCurrentZIndex = () => {
	return PopupUtilsData.currentZIndex;
};

export {
	getFocusedElement,
	isClickInRect,
	getClosedPopupParent,
	getNextZIndex,
	getCurrentZIndex,
	isFocusedElementWithinNode,
};
