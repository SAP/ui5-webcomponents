let currentZIndex = 100;

const getFocusedElement = () => {
	let element = document.activeElement;

	while (element.shadowRoot && element.shadowRoot.activeElement) {
		element = element.shadowRoot.activeElement;
	}

	return (element && typeof element.focus === "function") ? element : null;
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

	if ((parent.openBy && parent.isUI5Element) || parent === document.documentElement) {
		return parent;
	}

	return getClosedPopupParent(parent);
};


const getNextZIndex = () => {
	currentZIndex += 2;
	return currentZIndex;
};

export {
	getFocusedElement,
	isClickInRect,
	getClosedPopupParent,
	getNextZIndex,
};
