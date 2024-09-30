import '@ui5/webcomponents/dist/Button.js';
import '@ui5/webcomponents/dist/Label.js';
import '@ui5/webcomponents/dist/Input.js';
import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents/dist/MenuItem.js";
import "@ui5/webcomponents-ai/dist/Button.js";
import "@ui5/webcomponents-icons/dist/ai.js";
import "@ui5/webcomponents-icons/dist/stop.js";
import "@ui5/webcomponents-icons/dist/navigation-left-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";

const input = document.getElementById('ai-wa-input');
const menu = document.getElementById('ai-wa-menu');

let loadTimeout;

let icon = document.getElementById('ai-wa-icon');
let isFocused = false;
let isHovered = false;
let inputValueArr = [];
let currentPage = 1;
let lastPage = inputValueArr.length;

input.addEventListener('focus', () => {
	// if(!isFocused) {
	isFocused = true;
	updateIconVisibility();
	// }
});

input.addEventListener('click', () => {
	// if(!isFocused) {
	isFocused = true;
	updateIconVisibility();
	// }
});


input.addEventListener('focusout', () => {
	isFocused = false;
	updateIconVisibility();
});

input.addEventListener('blur', () => {
	isFocused = false;
	updateIconVisibility();
});

function updateIconVisibility() {
	if (isFocused || isHovered) {
		icon.classList.add('show-icon');
	} else {
		icon.classList.remove('show-icon');
	}
}

function updateState(removeReadOnly, value, placeholder, iconName) {
	if (removeReadOnly) {
		input.removeAttribute("readonly");
	} else {
		input.setAttribute("readonly", true);
	}
	input.setAttribute("value", value);
	input.setAttribute("placeholder", placeholder);
	icon.setAttribute("name", iconName);
	forceRerender(icon);
}

function transitionToLoadState() {
	inputValueArr.push(input.value);
	updateState(true, "Analyzing request...", "Analyzing request...", "stop")
	input.classList.add('generating-input');

	loadTimeout = setTimeout(() => {
		updateState(false, "AI Design Fellowship", "Placeholder", "ai")
		loadFinalMenuItems();
	}, 2000);
}

function forceRerender(element) {
	const clonedElement = element.cloneNode(true);
	element.replaceWith(clonedElement);
	icon = clonedElement;
	icon.addEventListener('click', (event) => {
		event.stopPropagation();
		if (icon.name === "ai") {
			iconClickHandler(true);
		} else {
			iconClickHandler(false);
		}
	});
}

function iconClickHandler(aiPressed) {
	if (aiPressed) {
		if (input.value === "") {
			loadInitialMenuItemGenerate();
		} else {
			loadFinalMenuItems();
		}
		menu.opener = icon;
		menu.open = true;
	} else {
		stopPressed();
	}
}

function stopPressed() {
	let oldInputValue = inputValueArr[inputValueArr.length -1];
	clearTimeout(loadTimeout);
	updateState(true, oldInputValue, "Placeholder", "ai")
	loadInitialMenuItemGenerate()
}


function loadInitialMenuItemGenerate() {
	menu.innerHTML = '';

	const initialItem = document.createElement('ui5-menu-item');
	initialItem.setAttribute('text', 'Generate');

	initialItem.addEventListener('click', () => {
		transitionToLoadState();
	});

	menu.appendChild(initialItem);
}

function loadFinalMenuItems() {
	menu.innerHTML = '';
	menu.innerHTML = `
		<ui5-menu-item text="Regenerate"></ui5-menu-item>
		<ui5-menu-item text="Fix Spelling & Grammar" starts-section></ui5-menu-item>
		<ui5-menu-item text="Translate">
			<ui5-menu-item text="English"></ui5-menu-item>
			<ui5-menu-item text="German"></ui5-menu-item>
			<ui5-menu-item text="Spanish"></ui5-menu-item>
		</ui5-menu-item>
	`;
	menu.addEventListener("item-click", function (evt) {
		if (evt.detail.text === "Regenerate") {
			transitionToLoadState();
			for (let index = 0; index < inputValueArr.length; index++) {
				const element = inputValueArr[index];
				console.log(element)
			}
		}
	})
	lastPage = inputValueArr.length;

	if (lastPage > 1) {
		addPaginationControls()
	}
}

function addPaginationControls() {
	const paginationItem = document.createElement('ui5-menu-item');
	const endIcon = document.createElement('ui5-icon');
	endIcon.setAttribute('icon', 'navigation-right-arrow');

	paginationItem.setAttribute('icon', 'navigation-left-arrow');
	paginationItem.setAttribute('text', currentPage + ' / ' + lastPage);
	endIcon.setAttribute('slot', 'endContent')
	if(lastPage === 1) {
		paginationItem.classList.add("pagination-hidden")
	} else {
		paginationItem.classList.remove("pagination-hidden");
		paginationItem.classList.add("pagination-shown");
	};

	menu.appendChild(paginationItem);
}

icon.addEventListener('click', iconClickHandler);

//TODO:
//onclick stop => return state of the menu to initial
//create versioning functionality
// ai progress indicator - value set Analyzing
//icon twice click?
// presing stop = regenerate - 

