import type Table from "./Table";
import type TableRow from "./TableRow";

const isInstanceOfTable = (obj: any): obj is Table => {
	return "isTable" in obj && !!obj.isTable;
};

const isSelectionCheckbox = (e: Event) => {
	return e.composedPath().some((el: EventTarget) => (el as HTMLElement).hasAttribute?.("ui5-table-selection-component"));
};

const isHeaderSelector = (e: Event) => {
	return isSelectionCheckbox(e) && e.composedPath().some((el: EventTarget) => el instanceof HTMLElement && el.hasAttribute("ui5-table-header-row"));
};

const findRowInPath = (composedPath: Array<EventTarget>) => {
	return composedPath.find((el: EventTarget) => el instanceof HTMLElement && el.hasAttribute("ui5-table-row")) as TableRow;
};

const findScrollContainer = (element: HTMLElement): HTMLElement => {
	while (element) {
		const { overflowY } = window.getComputedStyle(element);
		if (overflowY === "auto" || overflowY === "scroll") {
			return element;
		}

		if (element.parentNode instanceof ShadowRoot) {
			element = element.parentNode.host as HTMLElement;
		} else {
			element = element.parentElement as HTMLElement;
		}
	}

	return document.scrollingElement as HTMLElement || document.documentElement;
};

const scrollElementIntoView = (scrollContainer: HTMLElement, element: HTMLElement, stickyElements: HTMLElement[]) => {
	if (stickyElements.length === 0) {
		return;
	}

	const elementRect = element.getBoundingClientRect();

	const { x: stickyX, y: stickyY } = stickyElements.reduce(({ x, y }, stickyElement) => {
		const { top, left } = getComputedStyle(stickyElement);
		const stickyElementRect = stickyElement.getBoundingClientRect();
		if (top !== "auto" && stickyElementRect.bottom > elementRect.top) {
			y = Math.max(y, stickyElementRect.bottom);
		}
		if (left !== "auto" && stickyElementRect.right > elementRect.left) {
			x = Math.max(x, stickyElementRect.right);
		}
		return { x, y };
	}, { x: elementRect.left, y: elementRect.top });

	const scrollX = elementRect.left - stickyX;
	const scrollY = elementRect.top - stickyY;

	if (scrollX === 0 && scrollY === 0) {
		// avoid unnecessary scroll call, when nothing changes
		return;
	}

	scrollContainer.scrollBy({
		top: scrollY,
		left: scrollX,
	});
};

export {
	isInstanceOfTable,
	isSelectionCheckbox,
	isHeaderSelector,
	findRowInPath,
	findScrollContainer,
	scrollElementIntoView,
};
