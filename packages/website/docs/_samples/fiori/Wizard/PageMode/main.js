import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/MessageStrip.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/Option.js";
import "@ui5/webcomponents/dist/DatePicker.js";
import "@ui5/webcomponents/dist/Switch.js";
import "@ui5/webcomponents/dist/Dialog.js";

import "@ui5/webcomponents-fiori/dist/Wizard.js";
import "@ui5/webcomponents-fiori/dist/WizardStep.js";
import "@ui5/webcomponents/dist/Bar.js";

import "@ui5/webcomponents-icons/dist/product.js";
import "@ui5/webcomponents-icons/dist/hint.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";

const btnOpendialog = document.getElementById("button");
const dialog = document.getElementById("dialog");
const nextStepButton = document.getElementById("nextButton");
const previousStepButton = document.getElementById("prevButton");
const cancelButton = document.getElementById("cancel");
const wizardWiz = document.getElementById("wiz");
const wizardFinalize = document.getElementById("wiz-finalize");

const deselectAll = (wizard) => {
    Array.from(wizard.children).forEach((step) => {
        step.selected = false;
    });
}

const getStep = (wizard, idx) => {
    return Array.from(wizard.children)[idx];
}

const setNextStep = (wizard, currentStepIndex, nextStepIndex) => {
    const nextStep = getStep(wizard, nextStepIndex);
    const currentStep = getStep(wizard, currentStepIndex);

    nextStep.selected = true;
    currentStep.disabled = false;
}

const setPreviousStep = (wizard, currentStepIndex, previousStepIndex) => {
    const previousStep = getStep(wizard, previousStepIndex);
    const currentStep = getStep(wizard, currentStepIndex);

    previousStep.selected = true;
    currentStep.disabled = false;
}

const setButtonVisibility = (index, totalItems) => {
    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');

    if (index === 0) {
        wizardFinalize.style.display = 'none';
        prevButton.style.display = 'none';
        nextButton.style.display = 'block';
    } else if (index === totalItems - 1) {
        prevButton.style.display = 'block';
        wizardFinalize.style.display = 'block';
        nextButton.style.display = 'none';
    } else {
        prevButton.style.display = 'block';
        nextButton.style.display = 'block';
    }
}

btnOpendialog.addEventListener("click", () => {
    dialog.open = true;
    const index = wizardWiz.getSelectedStepIndex();
    setButtonVisibility(index, wizardWiz.children.length);
});

wizardWiz.addEventListener("ui5-step-change", (event) => {
    const index = wizardWiz.getSelectedStepIndex();
    setButtonVisibility(index, wizardWiz.children.length)
});

nextStepButton.addEventListener("click", () => {
    const index = wizardWiz.getSelectedStepIndex();
    setNextStep(wizardWiz, index, index + 1);
    setButtonVisibility(index + 1, wizardWiz.children.length)
});

previousStepButton.addEventListener("click", () => {
    const index = wizardWiz.getSelectedStepIndex();
    deselectAll(wizardWiz);
    setPreviousStep(wizardWiz, index, index - 1);
    setButtonVisibility(index - 1, wizardWiz.children.length)
});

cancelButton.addEventListener("click", () => {
    dialog.open = false;
});

wizardFinalize.addEventListener("click", () => {
    alert("Finalize");
    dialog.open = false;
});