import '@ui5/webcomponents/dist/Icon.js';
import '@ui5/webcomponents/dist/Label.js';
import '@ui5/webcomponents/dist/TextArea.js';
import '@ui5/webcomponents/dist/Button.js';
import '@ui5/webcomponents/dist/Toast.js';
import '@ui5/webcomponents-icons/dist/ai.js';
import getElementSelection from "@ui5/webcomponents-base/dist/util/SelectionAssistant.js";

const textArea = document.getElementById('ai-textarea');
const button = document.getElementById('btn');
const toast = [...document.getElementsByTagName("ui5-toast")][0];

const repositionButtonAtSelection = (rect) => {
	button.style.left = `${rect.left + rect.width}px`;
	button.style.top = `${rect.top + rect.height}px`;
	showButton();
};

const repositionButtonAtTextArea = (rect) => {
	showButton();

	button.style.left = `${rect.left + rect.width + 4}px`;
	button.style.top = `${rect.top + rect.height - button.getBoundingClientRect().height}px`;
};

const showButton = () => {
	button.style.zIndex = '100';
	button.style.display = 'inline-block';
};

const hideButton = () => {
	button.style.display = 'none';
};

textArea.addEventListener('ui5-select', (e) => {
	const selectionRect = getElementSelection(textArea);
	const textAreaRect = textArea.getBoundingClientRect();

	if (selectionRect.bottom > textAreaRect.bottom || selectionRect.right > textAreaRect.right) {
		repositionButtonAtTextArea(textAreaRect);
	} else {
		repositionButtonAtSelection(selectionRect);
	}
});

textArea.addEventListener('mousedown', () => {
	hideButton();
});

textArea.addEventListener('ui5-scroll', () => {
	hideButton();
});

textArea.addEventListener('focusout', (e) => {
	if (e.relatedTarget !== button) {
		hideButton();
	}
});

button.addEventListener('focusout', () => {
	hideButton();
});

button.addEventListener('click', (e) => {
	const selectedText = document.getSelection().toString();
	const message = `The selected text equals to: "${selectedText}"`;

	toast.textContent = message;
	toast.open = true;
});
