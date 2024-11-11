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

const dynamicSideContent = document.getElementById('dynamicSideContent');
const openSideContentButton = document.getElementById('openSideContentButton');
const aiSideContentButton = document.getElementById('aiSideContentButton');
const closeSideContentButton = document.getElementById(
  'closeSideContentButton'
);
const output = document.getElementById("output");
const structureSelect = document.getElementById("structureSelect");
const languageSelect = document.getElementById("languageSelect");
const toneOfVoiceSelect = document.getElementById("toneOfVoiceSelect");

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
let sideContentGenerationId;

function startGenerating() {
	console.warn('startGenerating');
	output.value = '';
	text = texts[options.structure][options.language][options.toneOfVoice];
	let generatedWordIndex = 0;

	const generationId = setInterval(function () {
		const words = text.split(' ');
		const maxWordIndex = words.length - 1;
		
		if (generatedWordIndex > maxWordIndex) {
			stopGenerating(generationId);
			aiSideContentButton.state = 'revise';
			openSideContentButton.innerText = 'Revise';
			closeSideContentButton.disabled = false;
			return;
		}
		output.value += words[generatedWordIndex] + ' ';
		generatedWordIndex++;
	}, 75);
	return generationId;
}

function stopGenerating(generationId) {
	console.warn('stopGenerating');
	closeSideContentButton.disabled = false;
	clearTimeout(generationId);
}

function openSideContentButtonClickHandler(evt) {
	openSideContent();
}

function aiSideContentButtonClickHandler(evt) {
	var button = evt.target;
	switch (button.state) {
	case '':
	case 'generate':
		startGeneratingFromSideContent(button);
		break;
	case 'revise':
		startGeneratingFromSideContent(button);
		break;
	case 'generating':
		button.state = 'generate';
		openSideContentButton.innerText = 'Generate';
		stopGenerating(sideContentGenerationId);
		break;
	}
}

function startGeneratingFromSideContent(button) {
	button.state = 'generating';
	closeSideContentButton.disabled = true;
	sideContentGenerationId = startGenerating();
}

function openSideContent() {
	dynamicSideContent.hideSideContent = false;
	openSideContentButton.classList.toggle('hidden', true);
}

function closeSideContent() {
	dynamicSideContent.hideSideContent = true;
	openSideContentButton.classList.toggle('hidden', false);
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

openSideContentButton.addEventListener(
	'click',
	openSideContentButtonClickHandler
);
aiSideContentButton.addEventListener('click', aiSideContentButtonClickHandler);
closeSideContentButton.addEventListener('click', closeSideContent);
structureSelect.addEventListener("change", structureSelectHandler);
languageSelect.addEventListener("change", languageSelectHandler);
toneOfVoiceSelect.addEventListener(
	"selection-change",
	toneOfVoiceSelectHandler
);
