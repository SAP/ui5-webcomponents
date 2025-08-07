import "@ui5/webcomponents/dist/Dialog.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents/dist/CheckBox.js";
import "@ui5/webcomponents/dist/Link.js";
import "@ui5/webcomponents/dist/Panel.js";

var dialog = document.getElementById("dialog");

dialog.open = true;


const okButton = document.getElementById("okButton");

okButton.addEventListener("click", function (event) {
    debugger;
    console.log("ds");
    const panel = document.getElementById("termsPanel");
    const scrollContainer = panel.shadowRoot.querySelector('[part="content"]');
    const isScrolledToBottom =
      scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 1;

    if (!isScrolledToBottom) {
      event.preventDefault();
      alert("Please scroll to the bottom of the terms to proceed.");
      return;
    }
});
