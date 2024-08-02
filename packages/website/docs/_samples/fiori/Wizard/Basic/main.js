import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/MessageStrip.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/Option.js";
import "@ui5/webcomponents/dist/DatePicker.js";
import "@ui5/webcomponents/dist/Switch.js";

import "@ui5/webcomponents-fiori/dist/Wizard.js";
import "@ui5/webcomponents-fiori/dist/WizardStep.js";

import "@ui5/webcomponents-icons/dist/product.js";
import "@ui5/webcomponents-icons/dist/hint.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";

const wizardWiz = document.getElementById("wiz");
const wizardSw = document.getElementById("wiz-sw");
const wizardDp = document.getElementById("wiz-dp");
const wizardToStep2 = document.getElementById("wiz-toStep2");
const wizardToStep3 = document.getElementById("wiz-toStep3");
const wizardFinalize = document.getElementById("wiz-finalize");

wizardWiz.addEventListener("step-change", function () {
    console.log(event.detail.step);
});
wizardSw.addEventListener("change", function () {
    wizardToStep3.removeAttribute("hidden");
});
wizardDp.addEventListener("change", function () {
    wizardFinalize.removeAttribute("hidden");
});

wizardToStep2.addEventListener("click", function () {
    deselectAll(wizardWiz);
    setStep(wizardWiz, 1);
    wizardToStep2.setAttribute("hidden", true);
});
wizardToStep3.addEventListener("click", function () {
    deselectAll(wizardWiz);
    setStep(wizardWiz, 2);
    wizardToStep3.setAttribute("hidden", true);
});
wizardFinalize.addEventListener("click", function () {
    alert("Done!");
});

function deselectAll(wizard) {
    Array.from(wizard.children).forEach(function(step) {
        step.selected = false;
    });
}
function setStep(wizard, idx) {
    var step = getStep(wizard, idx);
    step.selected = true;
    step.disabled = false;
}
function getStep(wizard, idx) {
    return Array.from(wizard.children)[idx];
}