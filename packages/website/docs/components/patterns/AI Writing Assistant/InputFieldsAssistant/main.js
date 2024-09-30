import '@ui5/webcomponents/dist/Button.js';
import '@ui5/webcomponents/dist/Label.js';
import '@ui5/webcomponents/dist/Input.js';
import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents/dist/MenuItem.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/ai.js";
import "@ui5/webcomponents-icons/dist/stop.js";
import "@ui5/webcomponents-icons/dist/navigation-left-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";

const input = document.getElementById('ai-wa-input');
const menu = document.getElementById('ai-wa-menu');

let loadTimeout;

let aiIcon = document.getElementById('ai-wa-icon');
let stopIcon = document.getElementById('stop-wa-icon');
let isInputFocused = false;
//let isHovered = false;
let isIconHovered = false;
let inputValues = [];
let currentPage = 1;
let totalPages = inputValues.length;
let isGenerateClickAttached = false;
let isItemClickAttached = false;


input.addEventListener('focus', () => {
	if (!isInputFocused) {
		isInputFocused = true;
		updateIconVisibility();
	}
});

input.addEventListener('focusout', () => {
	if (!isIconHovered) {
		isInputFocused = false;
		updateIconVisibility();
	}
});

input.addEventListener('click', () => {
	if (!isInputFocused) {
		isInputFocused = true;
		updateIconVisibility();
	}
});


input.addEventListener('focusout', () => {
	isInputFocused = false;
	updateIconVisibility();
});

input.addEventListener('blur', () => {
	isInputFocused = false;
	updateIconVisibility();
});

aiIcon.addEventListener('mouseenter', () => {
	isIconHovered = true;
	updateIconVisibility();
});

aiIcon.addEventListener('mouseleave', () => {
	isIconHovered = false;
	if (!isInputFocused) {
		updateIconVisibility();
	}
});

function updateIconVisibility() {
	if (isInputFocused) {
		aiIcon.classList.add('show-icon');
		aiIcon.classList.remove('hide-icon');
	} else {
		aiIcon.classList.remove('show-icon');
		aiIcon.classList.add('hide-icon');
	}
}

function updateIconsOnLoad(isLoading) {
	if (isLoading) {
		stopIcon.classList.add('show-icon');
		stopIcon.classList.remove('hide-icon');
		aiIcon.classList.remove('show-icon');
		aiIcon.classList.add('hide-icon');
	} else {
		aiIcon.classList.add('show-icon');
		aiIcon.classList.remove('hide-icon');
		stopIcon.classList.remove('show-icon');
		stopIcon.classList.add('hide-icon');
	}
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
		currentPage = inputValues.length;
		totalPages = inputValues.length;
		console.log("Current inputValues:", inputValues);
	}
}

function transitionToLoadState() {
	addInputValue(input.value);

	updateIconsOnLoad(true);
	updateInputState(false, 'Analyzing request...', 'Analyzing request...');
	input.classList.add('generating-input');

	loadTimeout = setTimeout(() => {
		updateInputState(true, 'AI Design Fellowship', 'Placeholder');
		updateIconsOnLoad(false);
		loadMenuItems(false);
	}, 2000);
}

function aiIconClickHandler() {
	if (input.value === "") {
		loadMenuItems(true);
	} else {
		loadMenuItems(false);
	}
	menu.open = true;
}

function stopIconClickHandler() {
	stopLoading();
}

function stopLoading() {
	clearTimeout(loadTimeout);
	let lastInputValue = inputValues[inputValues.length - 1] || '';
	updateInputState(true, lastInputValue, 'Placeholder');
	updateIconsOnLoad(false);
	loadMenuItems(true);
}


function loadMenuItems(isInitialItemVisible) {
	for (let itemIndex = 0; itemIndex < menu.items.length; itemIndex++) {
		const item = menu.items[itemIndex];
		totalPages = inputValues.length;
		currentPage = totalPages;

		if (itemIndex === 0 && isInitialItemVisible) {
			item.classList.remove("hide-item");
			item.classList.add("show-item");
			item.addEventListener('click', () => {
				transitionToLoadState();
			});
			if (!isGenerateClickAttached) {
				item.addEventListener('click', transitionToLoadState);
				isGenerateClickAttached = true;
			}
		} else if (!isInitialItemVisible && itemIndex > 0 && itemIndex < menu.items.length - 1) {
			item.classList.remove("hide-item");
			item.classList.add("show-item");
		} else if (!isInitialItemVisible && itemIndex === menu.items.length - 1 && totalPages >= 1) {
			item.classList.remove("hide-item");
			item.classList.add("show-item");
			addPaginationControls();
		} else {
			item.classList.remove("show-item");
			item.classList.add("hide-item");
		}
	}

	if (!isItemClickAttached) {
		menu.addEventListener('item-click', function (evt) {
			if (evt.detail.item.getAttribute('text') === 'Regenerate') {
				transitionToLoadState();
			}
		});
		isItemClickAttached = true;
	}
}
function addPaginationControls() {
	const paginationItem = document.getElementById('pagination-menu-item');
	const rightArrowIcon = document.getElementById('right-arrow-icon');
	const leftArrowIcon = document.getElementById('pagination-menu-item');

	paginationItem.addEventListener('click', (event) => {
		event.stopPropagation();
		menu.open= true;
		if (event.target.getAttribute('icon') === 'navigation-left-arrow' && !leftArrowIcon.disabled && currentPage > 1) {
			currentPage--;
			let lastInputValue = inputValues[currentPage-1] || '';
			updateInputState(true, lastInputValue, 'Placeholder');
			updatePaginationText(paginationItem, rightArrowIcon);
		}
	});

	rightArrowIcon.addEventListener('click', (event) => {
		event.stopPropagation();
		menu.open= true;
		if (currentPage < totalPages) {
			currentPage++;
			let nextInputValue = inputValues[currentPage] || '';
			updateInputState(true, nextInputValue, 'Placeholder');
			updatePaginationText(paginationItem, rightArrowIcon);
		}
	});

	updatePaginationText(paginationItem, rightArrowIcon);
}

function updatePaginationText(paginationItem, rightArrowIcon) {
	paginationItem.setAttribute('text', `${currentPage} / ${totalPages}`);

	if (currentPage === 1) {
        paginationItem.disabled = true;
    } else {
        paginationItem.disabled = false; 
    }

	if(currentPage === totalPages) {
		rightArrowIcon.setAttribute('disabled', true);
	} else {
		rightArrowIcon.removeAttribute('disabled');
	}

}


aiIcon.addEventListener('mousedown', (event) => {
	event.stopPropagation();
	aiIconClickHandler();
});

stopIcon.addEventListener('mousedown', (event) => {
	event.stopPropagation();
	stopIcon.classList.add("icon-clicked")
	stopIconClickHandler();
});

aiIcon.addEventListener('click', (event) => {
	aiIcon.classList.add("icon-clicked")
	event.stopPropagation();
});

aiIcon.addEventListener('mouseleave', (event) => {
	aiIcon.classList.remove("icon-clicked")
});

stopIcon.addEventListener('mouseleave', (event) => {
	stopIcon.classList.remove("icon-clicked")
});



//TODO:
//onclick stop => return state of the menu to initial? when click stop - should input become in initial state (not blue)
//create versioning functionality - nope
// ai progress indicator - input value set Analyzing ?!?
//icon twice click?
//shown focus on generate should be there - SPEC shows it, but it's strange - Navigation flow - no focus/ MOUSE/TOUCH interaction there

