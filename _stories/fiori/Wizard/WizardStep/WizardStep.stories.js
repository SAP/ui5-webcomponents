import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
export default {
    title: "Fiori/Wizard/Wizard Step",
    component: "WizardStep",
    argTypes,
};
const Template = (args) => {
    return html `
<ui5-wizard>
	<ui5-wizard-step
		icon="${ifDefined(args.icon)}"
		title-text="${ifDefined(args.titleText)}"
		?selected="${ifDefined(args.selected)}"
		?branching="${ifDefined(args.branching)}"
		?disabled="${ifDefined(args.disabled)}"
		subtitle-text="${ifDefined(args.subtitleText)}"
	>
		${unsafeHTML(args.default)}
	</ui5-wizard-step>
</ui5-wizard>`;
};
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    titleText: "Product type",
    icon: "product",
    default: `<div style="display: flex; min-height: 200px; flex-direction: column;">
	<ui5-title>1. Product Type</ui5-title><br/>
	<ui5-message-strip>
		The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
	</ui5-message-strip><br/>
	<ui5-label wrapping-type="Normal">Sed fermentum, mi et tristique ullamcorper, sapien sapien faucibus sem, quis pretium nibh lorem malesuada diam. Nulla quis arcu aliquet, feugiat massa semper, volutpat diam. Nam vitae ante posuere, molestie neque sit amet, dapibus velit. Maecenas eleifend tempor lorem. Mauris vitae elementum mi, sed eleifend ligula. Nulla tempor vulputate dolor, nec dignissim quam convallis ut. Praesent vitae commodo felis, ut iaculis felis. Fusce quis eleifend sapien, eget facilisis nibh. Suspendisse est velit, scelerisque ut commodo eget, dignissim quis metus. Cras faucibus consequat gravida. Curabitur vitae quam felis. Phasellus ac leo eleifend, commodo tortor et, varius quam. Aliquam erat volutpat.
	</ui5-label>
</div>
<ui5-button design="Emphasized">Step 2</ui5-button>`
};
//# sourceMappingURL=WizardStep.stories.js.map