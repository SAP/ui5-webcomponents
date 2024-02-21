import "@ui5/webcomponents/dist/MessageStrip.js";
import "@ui5/webcomponents/dist/Button.js";

const container = document.querySelector(".wrapper");
const button =  document.querySelector("#button1");
button.addEventListener("click", function(event) {
    const messageStrip = document.querySelector("#msgStrip");
    const types = ["Information", "Warning", "Negative", "Positive"];
    const text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco.";
    let type = types[Math.round(Math.random() * 3)];
    if (messageStrip) {
        container.removeChild(messageStrip);
    }
    let generatedMsgStrip = document.createElement("ui5-message-strip");
    generatedMsgStrip.id = "msgStrip";
    generatedMsgStrip.design = type;
    generatedMsgStrip.textContent = text;
    container.appendChild(generatedMsgStrip);
});