import type TextArea from "../TextArea.js";

const copyAndApplyStyles = (element: Element, copiedElement: HTMLElement) => {
	const computedStyles = getComputedStyle(element);

	for (let i = 0; i < computedStyles.length; i++) {
		copiedElement.style[computedStyles[i] as any] = computedStyles.getPropertyValue(computedStyles[i]);
	}

	// reposition the mirror
	copiedElement.style.position = "absolute";
	copiedElement.style.left = `${element.getBoundingClientRect().left}px`;
	copiedElement.style.top = `${element.getBoundingClientRect().top}px`;

	// make it hidden and not clickable
	copiedElement.style.zIndex = "-1";
	copiedElement.style.pointerEvents = "none";
	copiedElement.style.opacity = "0";

	document.body.appendChild(copiedElement);
};

const applyScrollStylings = () => {
	const styleTag = document.createElement("style");
	const styles = `#ui5-textarea-selection-mirror::-webkit-scrollbar:horizontal {
		height: var(--sapScrollBar_Dimension);
	}
	
	#ui5-textarea-selection-mirror::-webkit-scrollbar:vertical {
		width: var(--sapScrollBar_Dimension);
	}
	
	#ui5-textarea-selection-mirror::-webkit-scrollbar {
		border-left: var(--browser_scrollbar_border);
	}
	
	#ui5-textarea-selection-mirror::-webkit-scrollbar-thumb {
		border-radius: var(--browser_scrollbar_border_radius);
	}`;

	styleTag.appendChild(document.createTextNode(styles));
	document.body.appendChild(styleTag);
};

const createCopy = () => {
	const copiedElement = document.createElement("div");
	copiedElement.id = "ui5-textarea-selection-mirror";

	copiedElement.contentEditable = "true";

	applyScrollStylings();

	document.body.appendChild(copiedElement);
};

const applyScrollPosition = (element: HTMLTextAreaElement, copiedElement: HTMLDivElement) => {
	copiedElement.scrollTop = element.scrollTop;
	copiedElement.scrollLeft = element.scrollLeft;
};

const getSelectionCoordinates = (textArea: HTMLTextAreaElement, mirror: HTMLDivElement) => {
	const { selectionEnd } = textArea;

	// create the fake range
	const range = document.createRange();
	range.setStart(mirror.firstChild!, selectionEnd - 1);
	range.setEnd(mirror.firstChild!, selectionEnd);

	applyScrollPosition(textArea, mirror);

	const rect = range.getBoundingClientRect();

	document.body.removeChild(mirror);

	return rect;
};

const getTextAreaSelection = (textArea: TextArea) => {
	const element = textArea.shadowRoot!.querySelector("textarea")!;

	// create copy of the textarea
	if (!document.getElementById("ui5-textarea-selection-mirror")) {
		createCopy();
	}

	const copiedElement = document.getElementById("ui5-textarea-selection-mirror") as HTMLDivElement;
	copiedElement.textContent = element.value;

	// apply styles to the copied element
	if (element) {
		copyAndApplyStyles(element, copiedElement);
	}

	return getSelectionCoordinates(element, copiedElement);
};

export { getTextAreaSelection };
export default {};
