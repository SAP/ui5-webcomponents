import "@ui5/webcomponents/dist/MultiInput.js";
import "@ui5/webcomponents/dist/Token.js";
import "@ui5/webcomponents/dist/SuggestionItem";

import "@ui5/webcomponents/dist/features/InputSuggestions.js";

var createTokenFromText = function (text) {
    let token = document.createElement("ui5-token");
    token.setAttribute("text", text);
    token.setAttribute("slot", "tokens");
    return token;
};
document.getElementById("multi-input").addEventListener("token-delete", function (event) {
    const token = event.detail?.token;
    token && token.remove();
});
document.getElementById("multi-input").addEventListener("paste", function (event) {
    event.preventDefault();
    let pastedText = (event.clipboardData || window.clipboardData).getData('text/plain');;
    if (!pastedText) {
        return;
    }
    let separatedTexts = pastedText.split(/\r\n|\r|\n|\t/g).filter(t => !!t);
    if (separatedTexts.length === 1) {
        event.target.value += separatedTexts[0];
        return;
    }
    separatedTexts.forEach((tokenText) => {
        if (tokenText) {
            event.target.appendChild(createTokenFromText(tokenText));
        }
    })
});
document.getElementById("multi-input").addEventListener("change", function (event) {
    if (!event.target.value) {
        return;
    }
    let isDuplicate = event.target.tokens.some(function(token) {
        return token.text === event.target.value
    });
    if (isDuplicate) {
        event.target.valueState = "Error";
        setTimeout(function () {
            event.target.valueState = "Normal";
        }, 2000);
        return;
    }
    event.target.appendChild(createTokenFromText(event.target.value));
    event.target.value = "";
});