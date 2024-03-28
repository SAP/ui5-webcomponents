import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
import MessageStripDesign from "@ui5/webcomponents/dist/types/MessageStripDesign.js";
export default {
    title: "Main/Message Strip",
    component: "MessageStrip",
    argTypes,
};
const Template = (args) => html `<ui5-message-strip 
	design="${ifDefined(args.design)}"
	?hide-icon="${ifDefined(args.hideIcon)}"
	?hide-close-button="${ifDefined(args.hideCloseButton)}"
>
	${unsafeHTML(args.icon)}
	${unsafeHTML(args.default)}
</ui5-message-strip>
`;
export const Basic = Template.bind({});
Basic.args = {
    design: MessageStripDesign.Information,
    default: "Information MessageStrip",
};
export const Dynamic = () => html `
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
`;
export const Custom = Template.bind({});
Custom.args = {
    design: MessageStripDesign.Negative,
    icon: `<img src="../assets/images/loading.gif" width="16" height="16" slot="icon">`,
    default: "Custom MessageStrip with animated gif",
};
//# sourceMappingURL=MessageStrip.stories.js.map