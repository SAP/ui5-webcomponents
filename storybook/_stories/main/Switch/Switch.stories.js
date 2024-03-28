import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import argTypes from "./argTypes.js";
import SwitchDesign from "@ui5/webcomponents/dist/types/SwitchDesign.js";
export default {
    title: "Main/Switch",
    component: "Switch",
    argTypes,
};
const Template = (args) => html `<ui5-switch
	design="${ifDefined(args.design)}"
	?checked="${ifDefined(args.checked)}"
	?disabled="${ifDefined(args.disabled)}"
	?required="${ifDefined(args.required)}"
	?name="${ifDefined(args.name)}"
	text-on="${ifDefined(args.textOn)}"
	text-off="${ifDefined(args.textOff)}"
	accessible-name="${ifDefined(args.accessibleName)}"
	accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
	tooltip="${ifDefined(args.tooltip)}"
></ui5-switch>`;
export const Basic = Template.bind({});
Basic.args = {
    accessibleName: "Switch with Accessible Name",
};
export const RequiredInForm = Template.bind({});
RequiredInForm.args = {
    required: true,
    name: "termsAndConditions",
    disabled: false,
    design: SwitchDesign.Textual,
    textOn: "Yes",
    textOff: "No",
};
RequiredInForm.decorators = [
    (story) => {
        return html `
		<style>
			.switch-form {
				max-width: fit-content;
				border: 1px solid var(--sapList_BorderColor);
				border-radius: 0.5rem;
				padding: 1rem;
			}
		</style>
		<form id="myForm" class="switch-form">
			<h3 style="margin: 0 0 1rem 0; color: var(--sapTextColor);">Switch in Registration form sample</h3>
			<div style="display: flex; flex-direction: column;">
				<ui5-input required type="Email" placeholder="Email" value="your@email.com"></ui5-input>
				<ui5-input required type="Password" placeholder="Password" value="your@email.com"></ui5-input>
			</div>
			<div style="display: flex; flex-direction: column; justify-content: center;">
				<ui5-label for="mySwitch" style="margin: 1rem 0 0 0; color: var(--sapTextColor);">Please accept the terms and conditions, in order to proceed</ui5-label>
				<div style="width: fit-content">
					${story()}
				</div>
			</div>
			<br>
			<ui5-button type="Submit">Submit Form</ui5-button>
		</form>`;
    }
];
//# sourceMappingURL=Switch.stories.js.map