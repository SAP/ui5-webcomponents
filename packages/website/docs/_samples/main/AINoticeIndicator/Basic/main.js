import "@ui5/webcomponents/dist/AINoticeIndicator.js";
import "@ui5/webcomponents-icons/dist/ai.js"

document.addEventListener("DOMContentLoaded", function () {
    const allPopovers = document.querySelectorAll("ui5-popover");
    const allAINoticeIndicators = document.querySelectorAll("ui5-ai-notice-indicator");

    allAINoticeIndicators.forEach((aiNotice) => {
        aiNotice.addEventListener('click', (e) => {
            e.preventDefault();

            if (e.detail.targetRef) {
                const popover = aiNotice.querySelector("ui5-popover");
                popover.opener = e.detail.targetRef;
                popover.open = true;
            }
        })

        const closeButton = aiNotice.querySelector('ui5-button');
        if (closeButton) {
            const popover = aiNotice.querySelector("ui5-popover");

            closeButton.addEventListener("click", () => {
                popover.open = false;
            });
        }

    })
});