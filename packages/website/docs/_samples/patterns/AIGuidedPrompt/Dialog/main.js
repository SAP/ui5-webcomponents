import "@ui5/webcomponents/dist/Card.js";
import "@ui5/webcomponents/dist/CardHeader.js";
import "@ui5/webcomponents/dist/Toast.js";
import "@ui5/webcomponents/dist/Token.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/TextArea.js";
import "@ui5/webcomponents/dist/Link.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/Option.js";
import "@ui5/webcomponents/dist/Popover.js";
import "@ui5/webcomponents/dist/Dialog.js";
import "@ui5/webcomponents/dist/RangeSlider.js";
import "@ui5/webcomponents/dist/SegmentedButton.js";
import "@ui5/webcomponents/dist/Bar.js";
import "@ui5/webcomponents/dist/Toolbar.js";
import "@ui5/webcomponents-fiori/dist/DynamicSideContent.js";
import "@ui5/webcomponents-ai/dist/Button.js";
import "@ui5/webcomponents-icons/dist/ai.js";
import "@ui5/webcomponents-icons/dist/stop.js";

let response = null;
let responseContent = null;

if (!response) {
	response = await fetch("../assets/data/predefinedTexts.json");
	responseContent = await response.json();
}

const dialog = document.getElementById("dialog");
const aiDialogButton = document.getElementById("aiDialogButton");
const openDialogButton = document.getElementById("openDialogButton");
const closeDialogButton = document.getElementById("closeDialogButton");
const output = document.getElementById("output");
const dialogOutput = document.getElementById("dialogOutput");
const structrureSelect = document.getElementById("structureSelect");
const languageSelect = document.getElementById("languageSelect");
const toneOfVoiceSelect = document.getElementById("toneOfVoiceSelect");
const sendButton = document.getElementById("sendButton");
const toast = document.getElementById("guidedPromptToast");

const texts = {
	paragraph: responseContent.predefinedTexts,
	bulleted: responseContent.predefinedTextsBulleted,
};
let options = {
	structure: "paragraph",
	language: "en",
	toneOfVoice: 2,
};
let text;
let dialogGenerationId;

function startGenerating() {
	console.warn("startGenerating");
	dialogOutput.value = "";
	text = texts[options.structure][options.language][options.toneOfVoice];
	let generatedWordIndex = 0;
	const generationId = setInterval(function () {
	const words = text.split(" ");
	const maxWordIndex = words.length - 1;
	if (generatedWordIndex > maxWordIndex) {
		stopGenerating(generationId);
		aiDialogButton.state = "revise";
		openDialogButton.innerText = "Revise";
		closeDialogButton.disabled = false;
		return;
	}

	dialogOutput.value += words[generatedWordIndex] + " ";
	generatedWordIndex++;
	}, 75);
	return generationId;
}

function stopGenerating(generationId) {
	console.warn("stopGenerating");
	closeDialogButton.disabled = false;
	clearTimeout(generationId);
}

function openDialogButtonClickHandler(evt) {
	openDialog();
}

function aiDialogButtonClickHandler(evt) {
	var button = evt.target;
	switch (button.state) {
	case "":
	case "generate":
		startGeneratingFromDialog();
		break;
	case "revise":
		startGeneratingFromDialog();
		break;
	case "generating":
		button.state = "generate";
		openDialogButton.innerText = "Generate";
		closeDialogButton.disabled = false;
		stopGenerating(dialogGenerationId, closeDialogButton);
		break;
	}
}

function startGeneratingFromDialog() {
	aiDialogButton.state = "generating";
	closeDialogButton.disabled = true;
	dialogGenerationId = startGenerating();
}

function openDialog() {
	dialog.open = true;
}

function closeDialog() {
	dialog.open = false;
	output.value = dialogOutput.value;
}

function structureSelectHandler(evt) {
	options.structure = evt.detail.selectedOption.value;
}

function languageSelectHandler(evt) {
	options.language = evt.detail.selectedOption.value;
}

function toneOfVoiceSelectHandler(evt) {
	const value = evt.detail.selectedItems[0].innerText;
	switch (value) {
	case "Formal": {
		options.toneOfVoice = 1;
		break;
	}
	case "Neutral": {
		options.toneOfVoice = 2;
		break;
	}
	case "Casual": {
		options.toneOfVoice = 3;
	}
	}
}

sendButton.addEventListener("click", function() {
	const output = document.getElementById("output");
	if (output.value) {
		toast.open = true;
		output.valueState = "None";
		output.value = "";
	}
});

structrureSelect.addEventListener("change", structureSelectHandler);
openDialogButton.addEventListener("click", openDialogButtonClickHandler);
aiDialogButton.addEventListener("click", aiDialogButtonClickHandler);
closeDialogButton.addEventListener("click", closeDialog);
languageSelect.addEventListener("change", languageSelectHandler);
toneOfVoiceSelect.addEventListener(
	"selection-change",
	toneOfVoiceSelectHandler
);
