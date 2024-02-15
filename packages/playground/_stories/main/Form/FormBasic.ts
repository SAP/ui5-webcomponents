import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type Form from "@ui5/webcomponents/dist/Form.js";
import FormItemSpacing from "@ui5/webcomponents/dist/types/FormItemSpacing.js";
import type { UI5StoryArgs } from "../../../types.js";
import type { StoryArgsSlots } from "./argTypes.js";

const Template: UI5StoryArgs<Form, StoryArgsSlots> = (args) => html`
<ui5-slider id="slider" min="1" max="100" value="100" style="width: 1250px;"></ui5-slider>

<div id="container" style="width: 1250px;">
	<ui5-form header-text="${ifDefined(args.headerText)}" layout="${ifDefined(args.layout)}" label-span="${ifDefined(args.labelSpan)}" item-spacing="${ifDefined(args.itemSpacing)}">
		${unsafeHTML(args.default)}
	</ui5-form>
</div>

<script>
		document.getElementById("slider").addEventListener("ui5-input", function (event) {
			document.getElementById("container").style.width = (event.target.value/100 * 1250) + 'px';
		});
</script>`;

const FormBasic = Template.bind({});
FormBasic.args = {
	headerText: "Address",
	layout: "S1 M1 L2 XL2",
	labelSpan: "S12 M4 L4 XL4",
	itemSpacing: FormItemSpacing.Normal,
	default: `
		<ui5-form-item>
			<ui5-label slot="labelContent">Name:</ui5-label>
			<span>Red Point Stores</span>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label slot="labelContent">ZIPCode/City:</ui5-label>
			<span>411 Maintown</span>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label slot="labelContent">Street:</ui5-label>
			<span>Main St 1618</span>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label slot="labelContent">Country:</ui5-label>
			<span>Germany</span>
		</ui5-form-item>`
};

export { FormBasic };