import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type Form from "@ui5/webcomponents/dist/Form.js";
import type { UI5StoryArgs } from "../../../types.js";
import type { StoryArgsSlots } from "./argTypes.js";

const Template: UI5StoryArgs<Form, StoryArgsSlots> = (args) => html`
<style>
	.text {
		display: inline-block;
		font-size: var(--sapFontSize);
		font-family: var(--sapFontFamily);
		color: var(--sapTextColor);
		line-height: normal;
		white-space: pre-line;
		word-wrap: break-word;
		cursor: text;
}
</style>
<ui5-form header-text="Address">
	${unsafeHTML(args.default)}
</ui5-form>`;

const FormBasic = Template.bind({});
FormBasic.args = {
	default: `
		<ui5-form-item>
			<ui5-label slot="labelContent">Name:</ui5-label>
			<span class="text">Red Point Stores</span>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label slot="labelContent">ZIPCode/City:</ui5-label>
			<span class="text">411 Maintown</span>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label slot="labelContent">Street:</ui5-label>
			<span class="text">Main St 1618</span>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label slot="labelContent">Country:</ui5-label>
			<span class="text">Germany</span>
		</ui5-form-item>`
};

export { FormBasic };