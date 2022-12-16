import getSharedResource from "../getSharedResource.js";
import { getFeature } from "../FeaturesRegistry.js";
import getActiveElement from "./getActiveElement.js";
import type OpenUI5Support from "../features/OpenUI5Support.js";
import type DOMReference from "../types/DOMReference.js";

type PopupUtilsData = {
	currentZIndex: number
};

const popupUtilsData = getSharedResource<PopupUtilsData>("PopupUtilsData", { currentZIndex: 100 });

const getFocusedElement = () => {
	const element = getActiveElement() as HTMLElement;
	return (element && typeof element.focus === "function") ? element : null;
};

const isFocusedElementWithinNode = (node: HTMLElement) => {
	const fe = getFocusedElement();

	if (fe) {
		return isNodeContainedWithin(node, fe);
	}

	return false;
};

const isNodeContainedWithin = (parent: HTMLElement, child: HTMLElement): boolean => {
	let currentNode: HTMLElement | undefined = parent;

	if (currentNode.shadowRoot) {
		const children = Array.from(currentNode.shadowRoot.children) as Array<HTMLElement>;
		currentNode = children.find(n => n.localName !== "style");

		if (!currentNode) {
			return false;
		}
	}

	if (currentNode === child) {
		return true;
	}

	const childNodes = currentNode.localName === "slot" ? (currentNode as HTMLSlotElement).assignedNodes() : currentNode.children;

	if (childNodes) {
		return Array.from(childNodes).some(n => isNodeContainedWithin(n as HTMLElement, child));
	}

	return false;
};

const isPointInRect = (x: number, y: number, rect: DOMRect) => {
	return x >= rect.left && x <= rect.right
		&& y >= rect.top && y <= rect.bottom;
};

const isClickInRect = (event: MouseEvent | TouchEvent, rect: DOMRect) => {
	let x;
	let y;

	if (event instanceof MouseEvent) {
		x = event.clientX;
		y = event.clientY;
	} else {
		const touch = event.touches[0];
		x = touch.clientX;
		y = touch.clientY;
	}

	return isPointInRect(x, y, rect);
};

interface PopupInterface { // Refactor: replace with Popup.js
	showAt: (opener: DOMReference, preventInitialFocus: boolean) => Promise<void>,
	open: boolean,
}

function instanceOfPopup(object: any): object is PopupInterface {
	return "isUI5Element" in object && "showAt" in object;
}

const getClosedPopupParent = (el: HTMLElement): HTMLElement => {
	const parent = el.parentElement || (el.getRootNode && (el.getRootNode() as ShadowRoot).host);

	if (parent && ((instanceOfPopup(parent) || parent === document.documentElement))) {
		return parent as HTMLElement;
	}

	return getClosedPopupParent(parent as HTMLElement);
};

const getNextZIndex = () => {
	const openUI5Support = getFeature<typeof OpenUI5Support>("OpenUI5Support");
	if (openUI5Support && openUI5Support.isLoaded()) { // use OpenUI5 for getting z-index values, if loaded
		return openUI5Support.getNextZIndex();
	}

	popupUtilsData.currentZIndex += 2;
	return popupUtilsData.currentZIndex;
};

const getCurrentZIndex = () => {
	return popupUtilsData.currentZIndex;
};

export {
	getFocusedElement,
	isClickInRect,
	getClosedPopupParent,
	getNextZIndex,
	getCurrentZIndex,
	isFocusedElementWithinNode,
};
