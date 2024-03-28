import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/Toolbar/Toolbar Spacer",
    component: "ToolbarSpacer",
    argTypes,
};
const Template = (args) => {
    return html `
<ui5-toolbar align-content="Start">
	<ui5-toolbar-button text="Simple button 1"></ui5-toolbar-button>
	<ui5-toolbar-spacer width="${ifDefined(args.width)}"></ui5-toolbar-spacer>
	<ui5-toolbar-button text="Simple button 2"></ui5-toolbar-button>
</ui5-toolbar>`;
};
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    width: "300px"
};
//# sourceMappingURL=ToolbarSpacer.stories.js.map