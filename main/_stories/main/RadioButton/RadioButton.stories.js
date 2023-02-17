import { html } from "lit-html";
import argTypes, { componentInfo } from "./argTypes.js";
import { DocsPage } from "../../../.storybook/docs";
const component = "ui5-radio-button";
export default {
    title: "Main/RadioButton",
    component,
    parameters: {
        docs: {
            page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
};
const Template = (args) => html `<div></div>`;
export const Template0 = () => html `
<h3>Basic RadioButton Types</h3>
	<div class="snippet">
		<ui5-radio-button text="Option A" checked="" name="GroupA"></ui5-radio-button>
		<ui5-radio-button text="Option B" value-state="None" name="GroupA"></ui5-radio-button>
		<ui5-radio-button text="Option C" value-state="Warning" name="GroupA"></ui5-radio-button>
		<ui5-radio-button text="Option D" value-state="Error" name="GroupA"></ui5-radio-button>
		<ui5-radio-button text="Option C" value-state="Success" name="GroupA"></ui5-radio-button>
		<ui5-radio-button text="Option D" value-state="Information" name="GroupA"></ui5-radio-button>
		<ui5-radio-button text="Option E" disabled="" name="GroupA"></ui5-radio-button>
		<ui5-radio-button text="Option F" readonly="" name="GroupA"></ui5-radio-button>
	</div>
`;
export const Template1 = () => html `
<h3>RadioButton in group - navigate via [UP/Right] and [DOWN/Left] arrow keys</h3>
	<div class="snippet" style="display: flex; flex-wrap: wrap; justify-content: space-around;">
		<div aria-labelledby="radioGroupTitle1" role="radiogroup" id="radioGroup" class="radio-button-group">
			<ui5-title id="radioGroupTitle1">Group of states</ui5-title>
			<ui5-label id="lblRadioGroup">Selected radio: None</ui5-label>
			<ui5-radio-button text="None" value-state="None" checked="" name="GroupB"></ui5-radio-button>
			<ui5-radio-button text="Warning" value-state="Warning" name="GroupB"></ui5-radio-button>
			<ui5-radio-button text="Error" value-state="Error" name="GroupB"></ui5-radio-button>
			<ui5-radio-button text="Success" value-state="Success" name="GroupB"></ui5-radio-button>
			<ui5-radio-button text="Information" value-state="Information" name="GroupB"></ui5-radio-button>
		</div>
		<div aria-labelledby="radioGroupTitle2" role="radiogroup" id="radioGroup2" class="radio-button-group">
			<ui5-title id="radioGroupTitle2">Group of options</ui5-title>
			<ui5-label id="lblRadioGroup2">Selected radio: Option A</ui5-label>
			<ui5-radio-button text="Option A" checked="" name="GroupC"></ui5-radio-button>
			<ui5-radio-button text="Option B" value-state="None" name="GroupC"></ui5-radio-button>
			<ui5-radio-button text="Option C" value-state="None" name="GroupC"></ui5-radio-button>
		</div>
	</div>
`;
export const Template2 = () => html `
<h3>RadioButton with Text Wrapping</h3>
	<div class="snippet">
		<ui5-radio-button text="ui5-radio-button with 'wrapping-type=Normal' set and some long text" wrapping-type="Normal" style="width:200px"></ui5-radio-button>
		<ui5-radio-button text="Another ui5-radio-button with very long text here" wrapping-type="Normal" style="width:200px"></ui5-radio-button>
	</div>
`;
//# sourceMappingURL=RadioButton.stories.js.map