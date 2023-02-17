import { html } from "lit-html";
import argTypes, { componentInfo } from "./argTypes.js";
import { DocsPage } from "../../../.storybook/docs";
const component = "ui5-popover";
export default {
    title: "Main/Popover",
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
<h3>Basic Popover</h3>
	<div class="snippet">
		<ui5-button id="openPopoverButton" design="Emphasized">Open Popover</ui5-button>
		<ui5-popover id="hello-popover" header-text="Newsletter subscription">
			<div class="popover-content">
				<div class="flex-column">
					<ui5-label for="emailInput" required="">Email: </ui5-label>
					<ui5-input id="emailInput" class="samples-margin-top" style="min-width: 150px;" placeholder="Enter Email"></ui5-input>
				</div>
			</div>
			<div slot="footer" class="popover-footer">
				<div style="flex: 1;"></div>
				<ui5-button id="closePopoverButton" design="Emphasized">Subscribe</ui5-button>
			</div>
		</ui5-popover>
		<script>
			var popoverOpener = document.getElementById("openPopoverButton");
			var popover = document.getElementById("hello-popover");
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
//# sourceMappingURL=Popover.stories.js.map