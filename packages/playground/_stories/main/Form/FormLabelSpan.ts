import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type Form from "@ui5/webcomponents/dist/Form.js";
import type { UI5StoryArgs } from "../../../types.js";
import type { StoryArgsSlots } from "./argTypes.js";


const FormLabelSpanTemplate: UI5StoryArgs<Form, StoryArgsSlots> = (args) => html`
<div id="container" style="width: 1250px"; max-width: 100%>

	<ui5-form header-text="Address (labels on top)" layout="${ifDefined(args.layout)}" label-span="${ifDefined(args.labelSpan)}">
		${unsafeHTML(args.default)}
	</ui5-form>

	<br><br>

	<ui5-form header-text="Address (labels take half of FormItem)" layout="S1 M2 L2 XL2" label-span="S6 M6 L6 XL6">
		<ui5-form-group header-text="Address">
			<ui5-form-item>
				<ui5-label slot="labelContent">Name:</ui5-label>
				<span>Red Point Stores</span>
			</ui5-form-item>
			
			<ui5-form-item>
				<ui5-label slot="labelContent">ZIP Code/City:</ui5-label>
				<span>411 Maintown</span>
			</ui5-form-item>
			
			<ui5-form-item>
				<ui5-label slot="labelContent">Street:</ui5-label>
				<span>Main St 1618</span>
			</ui5-form-item>

			<ui5-form-item>
				<ui5-label slot="labelContent">Country:</ui5-label>
				<span>Germany</span>
			</ui5-form-item>

			<ui5-form-item>
				<ui5-label slot="labelContent">WebSite:</ui5-label>
				<ui5-link href="sap.com">sap.com</ui5-link>
			</ui5-form-item>

			<ui5-form-item>
				<ui5-label slot="labelContent">Twitter:</ui5-label>
				<span>@sap</span>
			</ui5-form-item>
			
			<ui5-form-item>
				<ui5-label slot="labelContent">Email:</ui5-label>
				<span>john.smith@sap.com</span>
			</ui5-form-item>
		</ui5-form-group>
	</ui5-form>
</div>
`;

const FormLabelSpan = FormLabelSpanTemplate.bind({});
FormLabelSpan.args = {
	labelSpan: "S12 M12 L12 XL12",
	layout: "S1 M2 L2 XL2",
	default: `
	<ui5-form-group header-text="Address">
		<ui5-form-item>
			<ui5-label slot="labelContent">Name:</ui5-label>
			<span>Red Point Stores</span>
		</ui5-form-item>
		
		<ui5-form-item>
			<ui5-label slot="labelContent">ZIP Code/City:</ui5-label>
			<span>411 Maintown</span>
		</ui5-form-item>
		
		<ui5-form-item>
			<ui5-label slot="labelContent">Street:</ui5-label>
			<span>Main St 1618</span>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label slot="labelContent">Country:</ui5-label>
			<span>Germany</span>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label slot="labelContent">WebSite:</ui5-label>
			<ui5-link href="sap.com">sap.com</ui5-link>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label slot="labelContent">Twitter:</ui5-label>
			<span>@sap</span>
		</ui5-form-item>
		
		<ui5-form-item>
			<ui5-label slot="labelContent">Email:</ui5-label>
			<span>john.smith@sap.com</span>
		</ui5-form-item>
	</ui5-form-group>`
};

export { FormLabelSpan };
