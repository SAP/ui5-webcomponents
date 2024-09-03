import type Input from "@ui5/webcomponents/dist/Input.js";
import type TextArea from "@ui5/webcomponents/dist/TextArea.js";

const copyAndApplyStyles = (element: HTMLElement, copiedElement: HTMLElement) => {
	const computedStyles = getComputedStyle(element);

	for (let i = 0; i < computedStyles.length; i++) {
		const propertyName = computedStyles[i];
		copiedElement.style.setProperty(propertyName, computedStyles.getPropertyValue(propertyName));
	}

	element.tagName === "INPUT" && setInputSpecificStyles(copiedElement);

	copiedElement.style.position = "absolute";
	copiedElement.style.left = `${element.getBoundingClientRect().left}px`;
	copiedElement.style.top = `${element.getBoundingClientRect().top}px`;

	setUnInteractableStyles(copiedElement);

	document.body.appendChild(copiedElement);
};

const setUnInteractableStyles = (element: HTMLElement) => {
	element.style.position = "absolute";
	element.style.userSelect = "none";
	element.style.pointerEvents = "none";
	element.style.zIndex = "-1";
	element.style.opacity = "0";
};

const setInputSpecificStyles = (element: HTMLElement) => {
	element.style.whiteSpace = "nowrap";
	element.style.overflowX = "auto";
	element.style.overflowY = "hidden";
};

const applyScrollStylings = () => {
	const styleTag = document.createElement("style");
	const styles = `#ui5-selection-mirror::-webkit-scrollbar:horizontal {
			height: var(--sapScrollBar_Dimension);
		}

		#ui5-selection-mirror::-webkit-scrollbar:vertical {
			width: var(--sapScrollBar_Dimension);
		}

		#ui5-selection-mirror::-webkit-scrollbar {
			border-left: var(--browser_scrollbar_border);
		}

		#ui5-selection-mirror::-webkit-scrollbar-thumb {
			border-radius: var(--browser_scrollbar_border_radius);
		}`;

	styleTag.appendChild(document.createTextNode(styles));
	document.body.appendChild(styleTag);
};

const createCopy = () => {
	const copiedElement = document.createElement("div");

	copiedElement.id = "ui5-selection-mirror";
	copiedElement.contentEditable = "true";

	applyScrollStylings();

	document.body.appendChild(copiedElement);
};

const applyScrollPosition = (element: HTMLElement, copiedElement: HTMLElement) => {
	copiedElement.scrollTop = element.scrollTop;
	copiedElement.scrollLeft = element.scrollLeft;
};

const getSelectionCoordinates = (element: HTMLInputElement | HTMLTextAreaElement, mirror: HTMLDivElement) => {
	const { selectionStart, selectionEnd } = element;
	const selectedText = element.value.slice(
		selectionStart!,
		element.selectionEnd!,
	);
	const range = document.createRange();

	range.setStart(mirror.firstChild!, selectionEnd! - 1);
	range.setEnd(mirror.firstChild!, selectionEnd!);

	applyScrollPosition(element, mirror);

	const rangeRect = range.getBoundingClientRect();
	const rectObject = {
		x: rangeRect.x,
		y: rangeRect.y,
		width: rangeRect.width,
		height: rangeRect.height,
		top: rangeRect.top,
		right: rangeRect.right,
		bottom: rangeRect.bottom,
		left: rangeRect.left,
	};

	document.body.removeChild(mirror);

	return { ...rectObject, selectedText };
};

const getElementSelection = (element: HTMLElement ) => {
	const innerElement = element.shadowRoot!.querySelector("textarea")|| element.shadowRoot!.querySelector("input");

	if (!document.getElementById("ui5-selection-mirror")) {
		createCopy();
	}

	const copiedElement = document.getElementById(
		"ui5-selection-mirror",
	)!;

	copiedElement.textContent = innerElement!.value;

	if (innerElement) {
		copyAndApplyStyles(innerElement, copiedElement)!;
	}

	return getSelectionCoordinates(innerElement!, copiedElement as HTMLDivElement);
};

export default getElementSelection;
