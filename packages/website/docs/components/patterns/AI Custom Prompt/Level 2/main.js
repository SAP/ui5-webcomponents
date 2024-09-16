import '@ui5/webcomponents/dist/Avatar.js';
import '@ui5/webcomponents-ai/dist/Button.js';
import '@ui5/webcomponents-icons/dist/ai.js';
import '@ui5/webcomponents-icons/dist/stop.js';
import '@ui5/webcomponents-icons/dist/background.js';
import '@ui5/webcomponents-icons/dist/doc-attachment.js';
import '@ui5/webcomponents-icons/dist/sound-loud.js';
import '@ui5/webcomponents-icons/dist/history.js';
import '@ui5/webcomponents-icons/dist/favorite.js';
import '@ui5/webcomponents/dist/Input.js';
import '@ui5/webcomponents/dist/Toolbar.js';
import '@ui5/webcomponents/dist/ToolbarButton.js';
import '@ui5/webcomponents/dist/ToolbarSeparator.js';
import '@ui5/webcomponents/dist/Panel.js';

var generationId;

function startGeneration(button) {
  console.warn('startGeneration');
  generationId = setTimeout(function () {
    console.warn('Generation completed');
    button.state = 'generate';
  }, 3000);
}

function stopGeneration() {
  console.warn('stopGeneration');
  clearTimeout(generationId);
}

function aiButtonClickHandler() {
  switch (myAiButton.state) {
    case '':
    case 'generate':
      myAiButton.state = 'generating';
      startGeneration(myAiButton);
      break;
    case 'generating':
      myAiButton.state = 'generate';
      stopGeneration();
      break;
  }
}

myAiButton.addEventListener('click', aiButtonClickHandler);
myInput.addEventListener('ui5-change', aiButtonClickHandler);
inputClearIcon.addEventListener('click', function () {
  myInput.value = '';
});
