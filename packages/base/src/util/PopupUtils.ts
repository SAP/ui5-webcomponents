import getActiveElement from "./getActiveElement.js";

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

const isClickInRect = (e: MouseEvent | TouchEvent, rect: DOMRect) => {
	let x;
	let y;

	if (e instanceof MouseEvent) {
		x = e.clientX;
		y = e.clientY;
	} else {
		const touch = e.touches[0];
		x = touch.clientX;
		y = touch.clientY;
	}

	return isPointInRect(x, y, rect);
};

interface PopupInterface { // Refactor: replace with Popup.js
	_show: () => void,
	open: boolean,
}
function instanceOfPopup(object: any): object is PopupInterface {
	return "isUI5Element" in object && "_show" in object;
}

const getClosedPopupParent = (el: HTMLElement): HTMLElement => {
	const parent = el.parentElement || (el.getRootNode && (el.getRootNode() as ShadowRoot).host);

	if (parent && ((instanceOfPopup(parent) || parent === document.documentElement))) {
		return parent as HTMLElement;
	}

	return getClosedPopupParent(parent as HTMLElement);
};

export {
	getFocusedElement,
	isClickInRect,
	getClosedPopupParent,
	isFocusedElementWithinNode,
};
