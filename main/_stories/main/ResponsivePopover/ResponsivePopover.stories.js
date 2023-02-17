import { html } from "lit-html";
import argTypes, { componentInfo } from "./argTypes.js";
import { DocsPage } from "../../../.storybook/docs";
const component = "ui5-responsive-popover";
export default {
    title: "Main/ResponsivePopover",
    component,
    parameters: {
        docs: {
            page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
};
const Template = (args) => html `<div></div>`;
export const Template0 = () => html `
<h3>Basic ResponsivePopover</h3>
	<div class="snippet">
		<ui5-button id="openBtn" design="Emphasized">Open ResponsivePopover</ui5-button>
		<ui5-responsive-popover id="hello-popover" header-text="Newsletter subscription">
			<div style="width: auto;padding: 2rem;display: flex;flex-direction: column;justify-content: center;">
				<ui5-label for="emailInput" required="">Email: </ui5-label>
				<ui5-input id="emailInput" class="samples-margin-top" style="min-width: 150px;" placeholder="Enter Email"></ui5-input>
				<ui5-label>Note: If you open the page in mobile, dialog would be displayed.</ui5-label>
			</div>
			<div slot="footer" class="popover-footer">
				<ui5-button id="closePopoverButton" design="Emphasized">Subscribe</ui5-button>
			</div>
		</ui5-responsive-popover>
		<script>
			var popover = document.getElementById("hello-popover");
			var popoverOpener = document.getElementById("openBtn");
			var popoverCloser = document.getElementById("closePopoverButton");
			popoverOpener.addEventListener("click", function() {
				popover.showAt(popoverOpener);
			});
			popoverCloser.addEventListener("click", function() {
				popover.close();
			});
		</script>
	</div>
`;
Template0.parameters = {
    docs: {
        story: {
            // Opt-out of inline rendering
            inline: false,
        },
    }
};
//# sourceMappingURL=ResponsivePopover.stories.js.map