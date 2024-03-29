import { html } from "lit";
import type { Meta } from "@storybook/web-components";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import type Token from "@ui5/webcomponents/dist/Token.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export default {
    title: "Main/Multi Input/Token",
    component: "Token",
    argTypes,
} as Meta<Token>;

const Template: UI5StoryArgs<Token, StoryArgsSlots> = (args) => html`
<ui5-multi-input>
	<ui5-token
		slot="tokens"
		text="${ifDefined(args.text)}"
		?selected="${ifDefined(args.selected)}"
		?readonly="${ifDefined(args.readonly)}"
	>
	${unsafeHTML(args.closeIcon)}
	</ui5-token>
</ui5-multi-input>`;

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
	text: "Argentina"
};

