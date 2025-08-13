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

const popover = document.getElementById("popover");
const aiButton = document.getElementById("aiButton");
const applyButton = document.getElementById("applyButton");
const closePopoverButton = document.getElementById("closePopoverButton");
const structrureSelect = document.getElementById("structureSelect");
const output = document.getElementById("output");
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
let popoverGenerationId;

function startGenerating() {
	console.warn("startGenerating");
	output.value = "";
	text = texts[options.structure][options.language][options.toneOfVoice];
	sendButton.disabled = true;

	let generatedWordIndex = 0;
	const generationId = setInterval(function () {

		const words = text.split(" ");
		const maxWordIndex = words.length - 1;

		if (generatedWordIndex > maxWordIndex) {
			stopGenerating(generationId);
			aiButton.state = "revise";
			sendButton.disabled = false;
			return;
		}
		output.value += words[generatedWordIndex] + " ";
		generatedWordIndex++;
	}, 75);
	return generationId;
}

function stopGenerating(generationId) {
	console.warn("stopGenerating");
	clearTimeout(generationId);
}

function aiButtonClickHandler(evt) {
	var button = evt.target;
	switch (button.state) {
		case "":
		case "generate":
			openPopover();
			break;
		case "generating":
			button.state = "generate";
			sendButton.disabled = false;
			stopGenerating(popoverGenerationId);
			break;
		case "revise":
			openPopover();
			break;
	}
}

function applyButtonClickHandler(evt) {
	aiButton.state = "generating";
	popoverGenerationId = startGenerating();
	closePopover();
}

function structureSelectHandler(evt) {
	options.structure = evt.detail.selectedOption.value;
}

function openPopover() {
	popover.open = true;
}

function closePopover() {
	popover.open = false;
}

sendButton.addEventListener("click", function() {
	const output = document.getElementById("output");
	if (output.value) {
		toast.open = true;
		output.valueState = "None";
		output.value = "";
		aiButton.state = "generate";
	}
});

aiButton.addEventListener("click", aiButtonClickHandler);
applyButton.addEventListener("click", applyButtonClickHandler);
closePopoverButton.addEventListener("click", closePopover);
structrureSelect.addEventListener("change", structureSelectHandler);

