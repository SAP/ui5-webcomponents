import '@ui5/webcomponents/dist/Avatar.js';
import '@ui5/webcomponents-ai/dist/Button.js';
import '@ui5/webcomponents-ai/dist/PromptInput.js';
import '@ui5/webcomponents-icons/dist/ai.js';
import '@ui5/webcomponents-icons/dist/stop.js';
import '@ui5/webcomponents-icons/dist/slim-arrow-down.js';
import '@ui5/webcomponents-icons/dist/navigation-down-arrow.js';
import '@ui5/webcomponents-icons/dist/doc-attachment.js';
import '@ui5/webcomponents-icons/dist/background.js';
import '@ui5/webcomponents-icons/dist/sound-loud.js';
import '@ui5/webcomponents-icons/dist/history.js';
import '@ui5/webcomponents-icons/dist/favorite.js';
import '@ui5/webcomponents/dist/Input.js';
import '@ui5/webcomponents/dist/Panel.js';

import '@ui5/webcomponents/dist/Label.js';
import '@ui5/webcomponents/dist/Text.js';
import '@ui5/webcomponents/dist/Toolbar.js';
import '@ui5/webcomponents/dist/TextArea.js';
import '@ui5/webcomponents/dist/Menu.js';
import '@ui5/webcomponents/dist/MessageStrip.js';
import '@ui5/webcomponents/dist/MenuItem.js';
import '@ui5/webcomponents/dist/ToolbarButton.js';
import '@ui5/webcomponents/dist/ToolbarSeparator.js';

var generationId,
promptCounter = 0,
feedbackOpener = document.getElementById("feedbackOpener"),
dialog = document.getElementById("dialog"),
feedbackClosers = [...dialog.querySelectorAll(".dialogCloser")];

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
		button.state = "generating";
		startGeneration(button);
		break;
	case "generating":
		button.state = "generate";
		stopGeneration();
		break;
	case "revise":
		menu.opener = button;
		menu.open = true;
		break;
	}
}

myAiButtonIconOnly.addEventListener("click", aiButtonClickHandler);
promptInput.addEventListener("ui5-change", function(evt) {
	promptCounter++;
	promptCount.textContent = promptCounter;
	responseTextArea.value = "your response to query " + evt.target.value + " is that.";
})

menu.addEventListener("item-click", function(evt) {
var button = menu.opener;
	if (evt.detail.text === "Regenerate") {
		button.state = "generating";
		startGeneration(button);
	}
});

aiModelSelector.addEventListener("click", function(event) {
	aiModelMenu.open = !aiModelMenu.open;
});

aiModelMenu.addEventListener("ui5-item-click", function(event) {
	myAvatar.colorScheme = event.detail.text;
});

feedbackOpener.accessibilityAttributes = {
	hasPopup: "dialog",
	controls: dialog.id,
};
feedbackOpener.addEventListener("click", () => {
	dialog.open = true;
});
feedbackClosers.forEach(btn => {
	btn.addEventListener("click", () => {
		dialog.open = false;
	});
})

function hideMessageStrip(evt) {
	evt.target.hidden = true;
}

succStrip.addEventListener("click", hideMessageStrip);
errStrip.addEventListener("click", hideMessageStrip);
warnStrip.addEventListener("click", hideMessageStrip);

function showMessageStrip(evt) {
	const button = evt.target;
	succStrip.hidden = button != simSucc;
	errStrip.hidden = button != simError;
	warnStrip.hidden = button != simWarn;
}

simSucc.addEventListener("click", showMessageStrip);
simError.addEventListener("click", showMessageStrip);
simWarn.addEventListener("click", showMessageStrip);
