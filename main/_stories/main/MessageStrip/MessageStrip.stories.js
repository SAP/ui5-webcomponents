import { html } from "lit-html";
import argTypes, { componentInfo } from "./argTypes.js";
import { DocsPage } from "../../../.storybook/docs";
const component = "ui5-message-strip";
export default {
    title: "Main/MessageStrip",
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
<h3>MessageStrip</h3>
	<div class="snippet">
		<ui5-message-strip class="samples-margin-bottom" design="Information">Information MessageStrip</ui5-message-strip>
		<ui5-message-strip class="samples-margin-bottom" design="Positive">Positive MessageStrip</ui5-message-strip>
		<ui5-message-strip class="samples-margin-bottom" design="Negative">Negative MessageStrip</ui5-message-strip>
		<ui5-message-strip class="samples-margin-bottom" design="Warning">Warning MessageStrip</ui5-message-strip>
	</div>
`;
export const Template1 = () => html `
<h3>MessageStrip With No Close Button</h3>
	<div class="snippet">
		<ui5-message-strip class="samples-margin-bottom" design="Information" hide-close-button="">Information MessageStrip With No Close Button</ui5-message-strip>
		<ui5-message-strip class="samples-margin-bottom" design="Positive" hide-close-button="">Positive MessageStrip With No Close Button</ui5-message-strip>
		<ui5-message-strip class="samples-margin-bottom" design="Negative" hide-close-button="">Negative MessageStrip With No Close Button</ui5-message-strip>
		<ui5-message-strip class="samples-margin-bottom" design="Warning" hide-close-button="">Warning MessageStrip With No Close Button</ui5-message-strip>
	</div>
`;
export const Template2 = () => html `
<h3>MessageStrip With No Icon</h3>
	<div class="snippet">
		<ui5-message-strip class="samples-margin-bottom" design="Information" hide-icon="">Information MessageStrip With No Icon</ui5-message-strip>
		<ui5-message-strip class="samples-margin-bottom" design="Positive" hide-icon="">Positive MessageStrip With No Icon</ui5-message-strip>
		<ui5-message-strip class="samples-margin-bottom" design="Negative" hide-icon="">Negative MessageStrip With No Icon</ui5-message-strip>
		<ui5-message-strip class="samples-margin-bottom" design="Warning" hide-icon="">Warning MessageStrip With No Icon</ui5-message-strip>
	</div>
`;
export const Template3 = () => html `
<h3>Dynamic Message Strip Generator</h3>
	<div class="snippet">
		<div class="wrapper">
			<ui5-button id="button1">Generate MessageStrip</ui5-button>
		</div>
		<script>
			const container = document.querySelector(".wrapper");
			const button =  document.querySelector("#button1");
			button.addEventListener("click", function(event) {
				let invisibleMessage =  window["sap-ui-webcomponents-bundle"].invisibleMessage;
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
				invisibleMessage.announce(\`New Information Bar of type \${type} \${text}\`, "Assertive");
				container.appendChild(generatedMsgStrip);
			});
		</script>
	</div>
`;
Template3.parameters = {
    docs: {
        story: {
            // Opt-out of inline rendering
            inline: false,
        },
    }
};
export const Template4 = () => html `
<h3>Custom MessageStrip</h3>
	<div class="snippet">
		<ui5-message-strip class="samples-margin-bottom samples-vertical-align" style="width: 200px;" design="Information" hide-icon="" hide-close-button="">You have new message.</ui5-message-strip>
		<ui5-message-strip class="samples-margin-bottom samples-vertical-align" style="width: 200px;" design="Positive" hide-close-button="">Successfull login!</ui5-message-strip>
		<ui5-message-strip class="samples-margin-bottom samples-vertical-align" style="width: 200px;" design="Negative" hide-icon="">Access denied!</ui5-message-strip>
		<ui5-message-strip class="samples-margin-bottom samples-vertical-align" style="width: 200px;" design="Warning">Update is required.</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom samples-vertical-align" style="width: 200px;" design="Warning"><ui5-icon name="palette" slot="icon"></ui5-icon>Custom icon</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom samples-vertical-align" style="width: 200px;" design="Positive"><img src="../assets/images/loading.gif" width="16" height="16" slot="icon">Custom animated gif</ui5-message-strip>
	</div>
`;
//# sourceMappingURL=MessageStrip.stories.js.map