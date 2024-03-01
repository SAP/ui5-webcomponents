import "@ui5/webcomponents/dist/MultiInput.js";
import "@ui5/webcomponents/dist/Token.js";

document.getElementById("multi-input").addEventListener("token-delete", function (event) {
    const token = event.detail?.token;
    token && token.remove();
});