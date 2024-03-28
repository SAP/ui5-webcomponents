import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type Form from "@ui5/webcomponents/dist/Form.js";
import type { UI5StoryArgs } from "../../../types.js";
import type { StoryArgsSlots } from "./argTypes.js";


const FormSingleGroupTemplate: UI5StoryArgs<Form, StoryArgsSlots> = (args) => html`
<ui5-form header-text="Personal Data" layout="${ifDefined(args.layout)}" label-span="${ifDefined(args.labelSpan)}">
	${unsafeHTML(args.default)}
</ui5-form>
`;

const FormSingleGroup = FormSingleGroupTemplate.bind({});
FormSingleGroup.args = {
	labelSpan: "S12 M12 L12 XL12",
	layout: "S1 M1 L1 XL1",
	default: `
	<ui5-form-group>
		<ui5-form-item>
			<ui5-label for="nameInpSingleGroup" slot="labelContent">Name:</ui5-label>
			<ui5-input id="nameInpSingleGroup" value="Typed text"></ui5-input>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-form-item>
				<ui5-label for="addressInpSingleGroup" slot="labelContent">Address:</ui5-label>
				<ui5-input id="addressInpSingleGroup" value="Typed text"></ui5-input>
			</ui5-form-item>
			<ui5-form-item>
				<ui5-label for="countrySelSingleGroup" slot="labelContent">Country:</ui5-label>
				<ui5-select id="countrySelSingleGroup" accessible-name-ref="countryLbl">
					<ui5-option>Australia</ui5-option>
					<ui5-option selected>Germany</ui5-option>
					<ui5-option>England</ui5-option>
				</ui5-select>
			</ui5-form-item>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label for="streetInpSingleGroup" slot="labelContent">Additional Comments:</ui5-label>
			<ui5-textarea id="streetInpSingleGroup" placeholder="Write your message here" show-exceeded-text  maxlength="10"></ui5-textarea>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-checkbox id="cbSingleGroup" text="Home Address:"></ui5-checkbox>
		</ui5-form-item>
	</ui5-form-group>`
};

export { FormSingleGroup };
