import { html } from "lit";
import argTypes from "./argTypes.js";
export default {
    title: "Main/Toolbar/Toolbar Separator",
    component: "ToolbarSeparator",
    argTypes,
};
const Template = (args) => {
    return html `
<ui5-toolbar align-content="Start">
	<ui5-toolbar-button text="Simple button 1"></ui5-toolbar-button>
	<ui5-toolbar-separator></ui5-toolbar-separator>
	<ui5-toolbar-button text="Simple button 2"></ui5-toolbar-button>
</ui5-toolbar>`;
};
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {};
//# sourceMappingURL=ToolbarSeparator.stories.js.map