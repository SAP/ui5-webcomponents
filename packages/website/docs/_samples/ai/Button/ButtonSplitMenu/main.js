import "@ui5/webcomponents-ai/dist/Button.js";
import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents-icons/dist/ai.js";
import "@ui5/webcomponents-icons/dist/stop.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";

var generationId;
var prevTriggerState = "generate";

function startGeneration(button) {
	console.warn("startGeneration");
	generationId = setTimeout(function() {
		console.warn("Generation completed");
		button.state = "revise";
	}, 3000);
}

function stopGeneration() {
	console.warn("stopGeneration");
	clearTimeout(generationId);
}

function aiButtonClickHandler(evt) {
	var button = evt.target;

	switch(button.state) {
		case "":
		case "generate":
			prevTriggerState = "generate";
			button.state = "generating";
			startGeneration(button);
			break;
		case "generating":
			button.state = prevTriggerState;
			stopGeneration();
			break;
		case "revise":
			menu.open = false;
			prevTriggerState = "revise";
			button.state = "generating";
			startGeneration(button);
			break;
	}
}

function aiButtonArrowClickHandler(evt) {
	var button = evt.target;

	menu.opener = button;
	menu.open = true;
}

function menuItemClickHandler(evt) {
	var button = menu.opener;

	prevTriggerState = "revise";
	button.state = "generating";
	startGeneration(button);
}

function menuOpenHandler() {
	var button = menu.opener;

	button.arrowButtonPressed = true;
}

function menuCloseHandler() {
	var button = menu.opener;

	button.arrowButtonPressed = false;
}

myAiButton.addEventListener("click", aiButtonClickHandler);
myAiButton.addEventListener("arrow-button-click", aiButtonArrowClickHandler);
menu.addEventListener("item-click", menuItemClickHandler);
menu.addEventListener("open", menuOpenHandler);
menu.addEventListener("close", menuCloseHandler);
