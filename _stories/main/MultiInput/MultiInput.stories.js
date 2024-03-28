import { html } from "lit";
import argTypes from "./argTypes.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
export default {
    title: "Main/Multi Input",
    component: "MultiInput",
    argTypes,
};
let index = 0;
const Template = (args) => html `
<ui5-multi-input
	id="multi-input-${++index}"
	?disabled="${ifDefined(args.disabled)}"
	placeholder="${ifDefined(args.placeholder)}"
	?readonly="${ifDefined(args.readonly)}"
	?required="${ifDefined(args.required)}"
	?no-typeahead="${ifDefined(args.noTypeahead)}"
	type="${ifDefined(args.type)}"
	value="${ifDefined(args.value)}"
	value-state="${ifDefined(args.valueState)}"
	name="${ifDefined(args.name)}"
	?show-suggestions="${ifDefined(args.showSuggestions)}"
	maxlength="${ifDefined(args.maxlength)}"
	accessible-name="${ifDefined(args.accessibleName)}"
	accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
	?show-clear-icon="${ifDefined(args.showClearIcon)}"
	?show-value-help-icon="${ifDefined(args.showValueHelpIcon)}"
>
	${unsafeHTML(args.default)}
	${unsafeHTML(args.valueStateMessage)}
	${unsafeHTML(args.icon)}
	${unsafeHTML(args.tokens)}
</ui5-multi-input>`;
export const Basic = Template.bind({});
Basic.args = {
    value: "basic input"
};
export const Tokens = Template.bind({});
Tokens.args = {
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
export const TokenCreation = Template.bind({});
TokenCreation.args = {
    placeholder: "Start typing country name",
    showSuggestions: true,
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
};
TokenCreation.decorators = [
    (story) => {
        return html `
	${story()}
<script>
	var createTokenFromText = function (text) {
		let token = document.createElement("ui5-token");
		token.setAttribute("text", text);
		token.setAttribute("slot", "tokens");
		return token;
	};
	document.getElementById("multi-input-${index}").addEventListener("token-delete", function (event) {
		const token = event.detail?.token;
		token && token.remove();
	});
	document.getElementById("multi-input-${index}").addEventListener("paste", function (event) {
		event.preventDefault();

		let pastedText = (event.clipboardData || window.clipboardData).getData('text/plain');;

		if (!pastedText) {
			return;
		}

		let separatedTexts = pastedText.split(\/\\r\\n\|\\r\|\\n\|\\t\/g).filter(t => !!t);

		if (separatedTexts.length === 1) {

			event.target.value += separatedTexts[0];
			return;
		}

		separatedTexts.forEach((tokenText) => {
			if (tokenText) {
				event.target.appendChild(createTokenFromText(tokenText));
			}
		})
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
];
export const SuggestionsWrapping = Template.bind({});
SuggestionsWrapping.args = {
    placeholder: "Enter product",
    showSuggestions: true,
    default: `
	<ui5-suggestion-item text="Wireless DSL/ Repeater and Print Server Lorem ipsum dolar st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor incidunt ut labore et dolore magna aliquyam erat, diam nonumy eirmod tempor individunt ut labore et dolore magna aliquyam erat, sed justo et ea rebum."></ui5-suggestion-item>
	<ui5-suggestion-item text="Widescreen Portable DVD Player w MP3, consetetur sadipscing, sed diam nonumy eirmod tempor invidunt ut labore et dolore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergen, no sea takimata. Tortor pretium viverra suspendisse potenti nullam. Congue quisque egestas diam in arcu cursus.Rutrum tellus pellentesque eu tincidunt tortor. Nec tincidunt praesent semper feugiat nibh sed"></ui5-suggestion-item>
	<ui5-suggestion-item text="Portable DVD Player with 9 inches LCD Monitor"></ui5-suggestion-item>`,
    valueStateMessage: '<div slot="valueStateMessage">Token is already in the list</div>',
};
//# sourceMappingURL=MultiInput.stories.js.map