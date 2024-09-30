import '@ui5/webcomponents/dist/Label.js';
import '@ui5/webcomponents/dist/Input.js';
import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents/dist/MenuItem.js";
import "@ui5/webcomponents-icons/dist/ai.js";
import "@ui5/webcomponents-icons/dist/stop.js";
import "@ui5/webcomponents-icons/dist/navigation-left-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";

const input = document.getElementById('ai-wa-input');
const icon = document.getElementById('ai-wa-icon');
const menuGenerate = document.getElementById('ai-wa-menu-generate');
const menuRegenerate = document.getElementById('ai-wa-menu-regenerate');

let inputValues = [];
let isItemClickAttached = false;
let loadTimeout;


input.addEventListener('focus', () => {
    updateIconVisibility(true);
    icon.name = "ai";
}); 

input.addEventListener('focusout', e => {
  if(!menuGenerate.open && !menuRegenerate.open){
    icon.name = "ai";
    //input.classList.remove("loading-input");
    updateIconVisibility(false);
  }
});

icon.addEventListener( "mousedown", e => {
	if(icon.name === "stop"){
		stopLoading();
		return;
	}
  if(input.value.length){
 	updateMenuVisibility(false);
   	menuRegenerate.open = true;

  } else{
	 updateMenuVisibility(true);
   	menuGenerate.open = true;
  }
});

menuGenerate.addEventListener("before-close", e => {
  if(icon.name === "stop"){
     return;
  }
  updateIconVisibility(false); 
});

menuRegenerate.addEventListener("before-close", e => {
  if(icon.name === "stop"){
     return;
  }
   updateIconVisibility(false);
});

aiIcon.addEventListener('mouseleave', () => {
	isIconHovered = false;
	if (!isInputFocused) {
		updateIconVisibility();
	}
});


menuGenerate.addEventListener("item-click", () => {
  updateIconVisibility(true);
  icon.name = "stop";
  transitionToLoadState()
});

menuRegenerate.addEventListener("item-click", e => {
   icon.name = "stop";
});

function stopLoading() {
	clearTimeout(loadTimeout);
	let lastInputValue = inputValues[inputValues.length - 1] || '';
	updateInputState(true, lastInputValue, 'Placeholder');
	icon.name = "ai"
}

const updateIconVisibility = (visible) => {
	if(visible){
	   icon.classList.remove("hidden");
	   icon.classList.add("show");
	} else {
	  icon.classList.remove("show");
		icon.classList.add("hidden");
	}
  };

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
		console.log("Current inputValues:", inputValues);
	}
}

function transitionToLoadState() {
	addInputValue(input.value);

	updateInputState(false, 'Analyzing request...', 'Analyzing request...');
	input.classList.add('loading-input');

	loadTimeout = setTimeout(() => {
		updateInputState(true, 'AI Design Fellowship', 'Placeholder');
		updateMenuVisibility(false);
		icon.name = "ai"
	}, 2000);
}

function updateMenuVisibility(isInitialItemVisible) {
	if (isInitialItemVisible) {
		menuGenerate.classList.add("show");
		menuGenerate.classList.remove("hide");
		menuRegenerate.classList.add("hide");
		menuRegenerate.classList.remove("show");
	} else {
		menuGenerate.classList.remove("show");
		menuGenerate.classList.add("hide");
		menuRegenerate.classList.remove("hide");
		menuRegenerate.classList.add("show");
		if (!isItemClickAttached) {
			menuRegenerate.addEventListener('item-click', function (evt) {
				if (evt.detail.item.getAttribute('text') === 'Regenerate') {
					transitionToLoadState();
				}
			});
			isItemClickAttached = true;
		}
	}
}