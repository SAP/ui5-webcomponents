import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import argTypes from "./argTypes.js";
import WrappingType from "@ui5/webcomponents/dist/types/WrappingType.js";
export default {
    title: "Main/Label",
    component: "Label",
    argTypes,
};
const Template = (args) => {
    return html `
<ui5-label
	for="${ifDefined(args.for)}"
	?required="${ifDefined(args.required)}"
	?show-colon="${ifDefined(args.showColon)}"
	wrapping-type="${ifDefined(args.wrappingType)}"
	class="${ifDefined(args.className)}"
>${unsafeHTML(args.default)}</ui5-label>`;
};
const addInput = (id) => {
    return (story, { args }) => {
        return html `
${story({ args: { ...args, for: id } })}
<ui5-input id="${id}"></ui5-input>`;
    };
};
export const Basic = Template.bind({});
Basic.args = {
    showColon: true,
    default: "Simple Label"
};
Basic.decorators = [
    addInput("myInputSimple")
];
const SetWidth200Px = (story, { args }) => {
    return html `
<style>
	.w200 {
		width: 200px;
	}
</style>
${story({ args: { ...args, className: "w200" } })}`;
};
export const WrappingText = Template.bind({});
WrappingText.args = {
    wrappingType: WrappingType.Normal,
    showColon: true,
    default: `Label that demonstrates how, if set to wrapping-type="Normal", the long labels could be wrapped. To test the truncation, use 'wrapping-type="None"`,
};
WrappingText.decorators = [
    SetWidth200Px,
    addInput("myInputWrapping")
];
export const UsageWithInputs = Template.bind({});
UsageWithInputs.args = {
    required: true,
    showColon: true,
};
UsageWithInputs.decorators = [
    (story, { args }) => {
        return html `
	${story({ args: { ...args, for: "myInput", default: "First name" } })}
	<ui5-input id="myInput" required placeholder="Enter your name"></ui5-input>

	${story({ args: { ...args, for: "myDatePicker", default: "Date of birth" } })}
	<ui5-date-picker id="myDatePicker" required></ui5-date-picker>

	${story({ args: { ...args, for: "mySelect", default: "Job" } })}
	<ui5-select id="mySelect" required>
		<ui5-option>Manager</ui5-option>
		<ui5-option>Sales</ui5-option>
		<ui5-option selected>Developer</ui5-option>
	</ui5-select>

	${story({ args: { ...args, for: "myTextArea", default: "Description" } })}
	<ui5-textarea id="myTextArea" required placeholder="Type as much text as you wish"></ui5-textarea>

	<div style="display: flex; align-items: center;">
		${story({ args: { ...args, for: "myCheckBox", default: "Accept terms of use" } })}
		<ui5-checkbox id="myCheckBox" required></ui5-checkbox>
	</div>
`;
    },
    (story) => {
        return html `
<style>
	.f {
		display: flex;
		flex-direction: column;
	}
	.f > :nth-child(2n) {
		margin-bottom: 1.5rem;
	}
</style>

<div class="f">
	${story()}
</div>`;
    }
];
//# sourceMappingURL=Label.stories.js.map