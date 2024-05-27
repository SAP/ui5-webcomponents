import "@ui5/webcomponents-ai/dist/Button.js";
import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents-icons/dist/ai.js";
import "@ui5/webcomponents-icons/dist/stop.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";

var generationId;

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

myAiButton.addEventListener("click", function(e) {
    if (myAiButton.state === "revise") {
        menu.opener = myAiButton;
        menu.open = true;
    }
});

myAiButton.addEventListener("state-change", function(e) {
    const state = e.detail.state;

    if (state === "generate" || state === "pause") {
        stopGeneration();
    } else if (state === "generating") {
        startGeneration(myAiButton);
    }
});

menu.addEventListener("item-click", function(evt) {
    if (evt.detail.text === "Regenerate") {
        myAiButton.state = "generating";
        startGeneration();
    }
});
