import "@ui5/webcomponents/dist/Token.js";
import "@ui5/webcomponents/dist/Tokenizer.js";

const deleteTokenizer = document.getElementById("delete-tokenizer");
let tokensToShowMoreItemsPress = [];

deleteTokenizer.addEventListener("ui5-token-delete", event => {
    const token = event.detail?.ref;
    token && token.remove();
});

deleteTokenizer.addEventListener("show-more-items-press", () => {
    tokensToShowMoreItemsPress = Array.from(deleteTokenizer.children);
});

deleteTokenizer.addEventListener("dialog-button-press", event => {
    const confirm = event.detail?.confirm;
    if (!confirm) {
        tokensToShowMoreItemsPress.forEach(token => {
            deleteTokenizer.appendChild(token);
        });
        tokensToShowMoreItemsPress = [];
    }
});
