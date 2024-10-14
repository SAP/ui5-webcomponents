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
let isItemClickAttached = false;
let loadTimeout;


input.addEventListener('focus', () => {
    updateIconVisibility(true);
    icon.name = "ai";
	icon.accessibleName = "AI Writing Assistant (Shift + F4)";
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


menuGenerate.addEventListener("item-click", () => {
  updateIconVisibility(true);
  icon.name = "stop";
  	icon.accessibleName = "Stop generating (Esc)";
	invisibleMessageUpdate("AI writing assistant generating. Stop generating (ESC)", InvisibleMessageMode.Polite);
	//announce("AI writing assistant generating. Stop generating (ESC)", InvisibleMessageMode.Polite);
	transitionToLoadState();
});

menuRegenerate.addEventListener("item-click", e => {
   icon.name = "stop";
	icon.accessibleName = "Stop generating (Esc)";
	invisibleMessageUpdate("AI writing assistant generating. Stop generating (ESC)", InvisibleMessageMode.Polite);
	//InvisibleMessage.announce("AI writing assistant generating. Stop generating (ESC)", InvisibleMessageMode.Polite);
	transitionToLoadState();
});

document.addEventListener('keydown', function (event) {
	const isMac = navigator.userAgent.includes('Mac')
    if (event.key === 'Escape') {
        stopLoading();
    }

    if (event.key === 'F4' && event.shiftKey) {
        if (input.value.length) {
            updateMenuVisibility(false);
            menuRegenerate.open = true;
        } else {
            updateMenuVisibility(true);
            menuGenerate.open = true;
        }
    }

    if (event.key === 'Enter' && (event.ctrlKey || (isMac && event.metaKey))) {
		icon.name = "stop";
		icon.accessibleName = "AI writing assistant generating. Stop generating (ESC)";
		transitionToLoadState()
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


function stopLoading() {
	clearTimeout(loadTimeout);
	let lastInputValue = inputValues[inputValues.length - 1] || '';
	currentInputIndex = inputValues.indexOf(lastInputValue);
	updateInputState(true, lastInputValue, 'Placeholder');
	icon.name = "ai"
	icon.accessibleName = "AI Writing Assistant (Shift + F4)"
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
		currentInputIndex = inputValues.length - 1;
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
		invisibleMessageUpdate("Input Field with text generated by AI", InvisibleMessageMode.Assertive);
		icon.name = "ai"
		icon.accessibleName = "AI Writing Assistant (Shift + F4)";
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

function invisibleMessageUpdate (message, mode) {
	announce(message, mode);
}