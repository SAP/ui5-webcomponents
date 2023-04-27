import { html } from "lit";
import type { Meta, StoryFn } from "@storybook/web-components";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";
import MessageStrip from "@ui5/webcomponents/dist/MessageStrip.js";
import MessageStripDesign from "@ui5/webcomponents/dist/types/MessageStripDesign.js";

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
} as Meta<MessageStrip>;

const Template: UI5StoryArgs<MessageStrip, StoryArgsSlots> = (args) => 
html`<ui5-message-strip 
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

export const MessageStripWithNoCloseButton = Template.bind({});
MessageStripWithNoCloseButton.args = {
  design: MessageStripDesign.Positive,
  hideCloseButton: true,
  default: "Positive MessageStrip With No Close Button",
};

export const MessageStripWithNoIcon = Template.bind({});
MessageStripWithNoIcon.args = {
  design: MessageStripDesign.Warning,
  hideIcon: true,
  default: "Warning MessageStrip With No Icon",
};

export const DynamicMessageStrip: StoryFn = () => html`
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


export const CustomMessageStrip = Template.bind({});
CustomMessageStrip.args = {
  design: MessageStripDesign.Negative,
  icon: `<img src="../assets/images/loading.gif" width="16" height="16" slot="icon">`,
  default: "Custom MessageStrip with animated gif",
};