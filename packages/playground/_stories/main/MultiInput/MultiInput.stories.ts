import { html } from "lit";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type MultiInput from "@ui5/webcomponents/dist/MultiInput.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

const component = "ui5-multi-input";

export default {
    title: "Main/MultiInput",
    component,
    subcomponents: {'Token' : 'ui5-token'},
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<MultiInput>;

let index = 0;

const Template: UI5StoryArgs<MultiInput, StoryArgsSlots> = (args) => html`
<ui5-multi-input
	id="multi-input-${++index}"
	value="${ifDefined(args.value)}"
	?show-value-help-icon="${ifDefined(args.showValueHelpIcon)}"
	?show-suggestions="${ifDefined(args.showSuggestions)}"
>
	${unsafeHTML(args.default)}
	${unsafeHTML(args.valueStateMessage)}
	${unsafeHTML(args.icon)}
	${unsafeHTML(args.tokens)}
</ui5-multi-input>`;

export const BasicMultiInput = Template.bind({});
BasicMultiInput.args = {
	value: "basic input"
};

export const BasicMultiInputVHDIcon = Template.bind({});
BasicMultiInputVHDIcon.args = {
	value: "value help icon",
	showValueHelpIcon: true
};
BasicMultiInputVHDIcon.storyName = "Basic Multi Input with Value Help Dialog icon";

export const MultiInputTokens = Template.bind({});
MultiInputTokens.args = {
	tokens: `
	<ui5-token slot="tokens" text="Argentina"></ui5-token>
	<ui5-token slot="tokens" text="Bulgaria"></ui5-token>
	<ui5-token slot="tokens" text="England"></ui5-token>
	<ui5-token slot="tokens" text="Finland"></ui5-token>
	<ui5-token slot="tokens" text="Germany"></ui5-token>
	<ui5-token slot="tokens" text="Hungary"></ui5-token>
	<ui5-token slot="tokens" text="Italy"></ui5-token>
	<ui5-token slot="tokens" text="Luxembourg"></ui5-token>
	<ui5-token slot="tokens" text="Mexico"></ui5-token>
	<ui5-token slot="tokens" text="Philippines"></ui5-token>
	<ui5-token slot="tokens" text="Sweden"></ui5-token>
	<ui5-token slot="tokens" text="USA"></ui5-token>`
};
MultiInputTokens.storyName = "Multi Input with tokens";

export const MultiInputTokenCreation = Template.bind({});
MultiInputTokenCreation.args = {
	default: `
	<ui5-suggestion-item text="Argentina"></ui5-suggestion-item>
	<ui5-suggestion-item text="Bulgaria"></ui5-suggestion-item>
	<ui5-suggestion-item text="England"></ui5-suggestion-item>
	<ui5-suggestion-item text="Finland"></ui5-suggestion-item>
	<ui5-suggestion-item text="Germany"></ui5-suggestion-item>
	<ui5-suggestion-item text="Hungary"></ui5-suggestion-item>
	<ui5-suggestion-item text="Italy"></ui5-suggestion-item>
	<ui5-suggestion-item text="Luxembourg"></ui5-suggestion-item>
	<ui5-suggestion-item text="Mexico"></ui5-suggestion-item>
	<ui5-suggestion-item text="Philippines"></ui5-suggestion-item>
	<ui5-suggestion-item text="Sweden"></ui5-suggestion-item>
	<ui5-suggestion-item text="USA"></ui5-suggestion-item>`,
	valueStateMessage: '<div slot="valueStateMessage">Token is already in the list</div>',
	showSuggestions: true
};
MultiInputTokenCreation.decorators = [
	(story) => {
	return html`
	${story()}
<script>
	let createTokenFromText = function (text) {
		let token = document.createElement("ui5-token");
		token.setAttribute("text", text);
		token.setAttribute("slot", "tokens");
		return token;
	};
	document.getElementById("multi-input-${index}").addEventListener("token-delete", function (event) {
		const token = event.detail?.token;
		token && token.remove();
	});
	document.getElementById("multi-input-${index}").addEventListener("change", function (event) {
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
</script>`;
	}
]
MultiInputTokenCreation.storyName = "Multi Input and token creation onChange";