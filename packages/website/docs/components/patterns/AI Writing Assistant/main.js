import '@ui5/webcomponents/dist/Label.js';
import '@ui5/webcomponents/dist/Input.js';
import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents/dist/MenuItem.js";
import "@ui5/webcomponents-icons/dist/ai.js";
import "@ui5/webcomponents-icons/dist/stop.js";
import "@ui5/webcomponents-icons/dist/navigation-left-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";

import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";
import InvisibleMessageMode from "@ui5/webcomponents-base/dist/types/InvisibleMessageMode.js";

const input = document.getElementById('ai-wa-input');
const icon = document.getElementById('ai-wa-icon');
const menuGenerate = document.getElementById('ai-wa-menu-generate');
const menuRegenerate = document.getElementById('ai-wa-menu-regenerate');

let inputValues = [];
let currentInputIndex = -1;
let loadTimeout;


input.addEventListener('focus', () => {
	updateIconVisibility(true);
	updateIconState("ai", "AI Writing Assistant (Shift + F4)");
});

input.addEventListener('focusout', e => {
	if (!menuGenerate.open && !menuRegenerate.open) {
		updateIconState("ai", "AI Writing Assistant (Shift + F4)");
		updateIconVisibility(false);
	}
});

icon.addEventListener("mousedown", e => {
	if (icon.name === "stop") {
		stopLoading();
		return;
	}
	if (input.value.length) {
		updateMenuVisibility(menuRegenerate, true, true);
		updateMenuVisibility(menuGenerate, false);

	} else {
		updateMenuVisibility(menuGenerate, true, true);
		updateMenuVisibility(menuRegenerate, false);
	}
});

menuGenerate.addEventListener("before-close", e => {
	if (icon.name === "stop") {
		return;
	}
	updateIconVisibility(false);
});

menuRegenerate.addEventListener("before-close", e => {
	if (icon.name === "stop") {
		return;
	}
	updateIconVisibility(false);
});


menuGenerate.addEventListener("item-click", (e) => {
	onMenuItemClick(e.detail.text);
});


menuRegenerate.addEventListener("item-click", (e) => {
	onMenuItemClick(e.detail.text);
});


document.addEventListener('keydown', function (event) {
	const isMac = navigator.userAgent.includes('Mac')
	if (event.key === 'Escape') {
		stopLoading();
	}

	if (event.key === 'F4' && event.shiftKey) {
		if (input.value.length) {
			updateMenuVisibility(menuRegenerate, true, true);
			updateMenuVisibility(menuGenerate, false);
		} else {
			updateMenuVisibility(menuGenerate, true, true);
			updateMenuVisibility(menuRegenerate, false);
		}
	}

	if (event.key === 'Enter' && (event.ctrlKey || (isMac && event.metaKey))) {
		transitionToLoadState();
	}

	if (event.key === 'Z' && (event.ctrlKey || (isMac && event.metaKey)) && event.shiftKey) {
		if (inputValues.length > 1 && currentInputIndex > 0) {
			currentInputIndex--;
			const previousValue = inputValues[currentInputIndex];
			updateInputState(true, previousValue, 'Placeholder');
		} else {
			console.log("No previous values available.");
		}
	}
	if (event.key === 'Y' && (event.ctrlKey || (isMac && event.metaKey)) && event.shiftKey) {
		if (inputValues.length > 0 && currentInputIndex < inputValues.length - 1) {
			currentInputIndex++;
			const nextValue = inputValues[currentInputIndex];
			updateInputState(true, nextValue, 'Placeholder');
		} else {
			console.log("No next values available.");
		}
	}
});

function onMenuItemClick(text) {
	switch (text) {
		case "Generate":
			transitionToLoadState();
			break;
		case "Regenerate":
			transitionToLoadState();
			break;
		case "Fix spelling and grammar":
			transitionToLoadState();
			break;
		// Translate:
		case "Bulgarian":
			transitionToLoadState();
			break;
		case "English":
			transitionToLoadState();
			break;
		case "German":
			transitionToLoadState();
			break;
		default:
	}
}

function stopLoading() {
	clearTimeout(loadTimeout);
	let lastInputValue = inputValues[inputValues.length - 1] || '';
	currentInputIndex = inputValues.indexOf(lastInputValue);
	updateInputState(true, lastInputValue, 'Placeholder');
	input.classList.remove('loading-input');
	updateIconState("ai", "AI Writing Assistant (Shift + F4)");
}

function updateIconVisibility(visible) {
	if (visible) {
		icon.classList.remove("hidden");
		icon.classList.add("show");
	} else {
		icon.classList.remove("show");
		icon.classList.add("hidden");
	}
}

function updateIconState(iconName, iconAccessibleName) {
	icon.name = iconName;
	icon.accessibleName = iconAccessibleName;
}

function updateInputState(isEditable, value, placeholder) {
	if (isEditable) {
		input.removeAttribute('readonly');
	} else {
		input.setAttribute('readonly', true);
	}
	input.value = value;
	input.placeholder = placeholder;
}

function addInputValue(value) {
	if (value && value !== "Analyzing request...") {
		inputValues.push(value);
		currentInputIndex = inputValues.length - 1;
		console.log("Current inputValues:", inputValues);
	}
}

function transitionToLoadState() {
	addInputValue(input.value);
	setTimeout(() => {
		updateIconState("stop", "Stop generating (Esc");
		invisibleMessageUpdate("AI writing assistant generating. Stop generating (ESC)", InvisibleMessageMode.Polite);
	}, 0)

	updateInputState(false, 'Analyzing request...', 'Analyzing request...');
	input.classList.add('loading-input');

	loadTimeout = setTimeout(() => {
		updateInputState(true, 'AI Design Fellowship', 'Placeholder');
		input.classList.remove('loading-input');
		invisibleMessageUpdate("Input Field with text generated by AI", InvisibleMessageMode.Assertive);
		updateIconState("ai", "AI Writing Assistant (Shift + F4)");
	}, 2000);
}

function updateMenuVisibility(menu, isVisible, isOpen = false) {
	if (isVisible) {
		toggleShowHideClass(menu, "hide", "show");
	} else {
		toggleShowHideClass(menu, "show", "hide");
	}
	if (isOpen) {
		menu.open = true;
	}
}

function toggleShowHideClass(element, classToRemove, classToAdd) {
	element.classList.remove(classToRemove);
	element.classList.add(classToAdd);
}

function invisibleMessageUpdate(message, mode) {
	announce(message, mode);
}