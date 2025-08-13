import '@ui5/webcomponents/dist/Icon.js';
import '@ui5/webcomponents/dist/Label.js';
import '@ui5/webcomponents/dist/Input.js';
import '@ui5/webcomponents/dist/Text.js';
import '@ui5/webcomponents/dist/Button.js';
import '@ui5/webcomponents/dist/Toast.js';
import '@ui5/webcomponents-icons/dist/ai.js';
import getElementSelection from "@ui5/webcomponents-base/dist/util/SelectionAssistant.js";

const nativeInput = document.getElementById('ai-native-input');
const input = document.getElementById('ai-input');
const button = document.getElementById('btn');
const toast = [...document.getElementsByTagName("ui5-toast")][0];

const repositionButtonAtSelection = (rect) => {
	button.style.left = `${rect.left + rect.width}px`;
	button.style.top = `${rect.top + rect.height}px`;
	showButton();
};

const repositionButtonAtInput = (rect) => {
	button.style.left = `${rect.left + rect.width + 4}px`;
	button.style.top = `${rect.top}px`;
	showButton();
};

const showButton = () => {
	button.style.zIndex = '100';
	button.style.display = 'inline-block';
};

const hideButton = () => {
	button.style.display = 'none';
};

input.addEventListener('ui5-select', (e) => {
	const selectionRect = getElementSelection(input);
	const inputRect = input.getBoundingClientRect();

	if (selectionRect.bottom > inputRect.bottom || selectionRect.right > inputRect.right) {
		repositionButtonAtInput(inputRect);
	} else {
		repositionButtonAtSelection(selectionRect);
	}
});

input.addEventListener('mousedown', (e) => {
	hideButton();
});

input.addEventListener('ui5-scroll', (e) => {
	hideButton();
});

input.addEventListener('focusout', (e) => {
	if (e.relatedTarget !== button) {
		hideButton();
	}
});

nativeInput.addEventListener('ui5-select', (e) => {
	const inputRect = nativeInput.getBoundingClientRect();
	repositionButtonAtInput(inputRect);
});

nativeInput.addEventListener('click', (e) => {
	hideButton();
});

nativeInput.addEventListener('ui5-scroll', (e) => {
	hideButton();
});

nativeInput.addEventListener('focusout', (e) => {
	if (e.relatedTarget !== button) {
		hideButton();
	}
});

button.addEventListener('focusout', (e) => {
	hideButton();
});

button.addEventListener('click', (e) => {
	const selectedText = document.getSelection().toString();
	const message = `The selected text equals to: "${selectedText}"`;

	toast.textContent = message;
	toast.open = true;
});