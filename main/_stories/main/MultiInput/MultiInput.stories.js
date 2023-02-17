import { html } from "lit-html";
import argTypes, { componentInfo } from "./argTypes.js";
import { DocsPage } from "../../../.storybook/docs";
const component = "ui5-multi-input";
export default {
    title: "Main/MultiInput",
    component,
    subcomponents: { 'Token': 'ui5-token' },
    parameters: {
        docs: {
            page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
};
const Template = (args) => html `<div></div>`;
export const Template0 = () => html `
<h3>Basic Multi Input</h3>
	<div class="snippet">
		<ui5-multi-input class="samples-margin samples-responsive-margin-bottom" value="basic input"></ui5-multi-input>
		<ui5-multi-input class="samples-margin samples-responsive-margin-bottom" show-value-help-icon="" value="value help icon"></ui5-multi-input>
	</div>
`;
export const Template1 = () => html `
<h3>Multi Input with tokens</h3>
	<div class="snippet">
		<ui5-multi-input style="width: 30%">
			<ui5-token slot="tokens" text="Bulgaria"></ui5-token>
		</ui5-multi-input>
		<ui5-multi-input style="width: 30%">
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
			<ui5-token slot="tokens" text="USA"></ui5-token>
		</ui5-multi-input>
	</div>
`;
export const Template2 = () => html `
<h3>Multi Input and token creation onChange</h3>
	<div class="snippet">
		<ui5-multi-input show-suggestions="" id="token-unique" style="width: 50%">
			<div slot="valueStateMessage">Token is already in the list</div>
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
			<ui5-suggestion-item text="USA"></ui5-suggestion-item>
		</ui5-multi-input>
		<script>
			var createTokenFromText = function (text) {
				var token = document.createElement("ui5-token");
				token.setAttribute("text", text);
				token.setAttribute("slot", "tokens");
				return token;
			};
			document.getElementById("token-unique").addEventListener("token-delete", function (event) {
				const token = event.detail?.token;
				token && token.remove();
			});
			document.getElementById("token-unique").addEventListener("change", function (event) {
				if (!event.target.value) {
					return;
				}
				var isDuplicate = event.target.tokens.some(function(token) {
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
		</script>
	</div>
`;
Template2.parameters = {
    docs: {
        story: {
            // Opt-out of inline rendering
            inline: false,
        },
    }
};
//# sourceMappingURL=MultiInput.stories.js.map