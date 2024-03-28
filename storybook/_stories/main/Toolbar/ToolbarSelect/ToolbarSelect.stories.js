import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/Toolbar/Toolbar Select",
    component: "ToolbarSelect",
    argTypes,
};
const Template = (args) => {
    return html `
<ui5-toolbar align-content="Start">
	<ui5-toolbar-select
		accessible-name="${ifDefined(args.accessibleName)}"
		accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
		?disabled="${ifDefined(args.disabled)}"
		value-state="${ifDefined(args.valueState)}"
		width="${ifDefined(args.width)}"
	>
		${unsafeHTML(args.default)}
	</ui5-toolbar-select>
</ui5-toolbar>`;
};
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    default: `<ui5-toolbar-select-option>Toolbar select option 1</ui5-toolbar-select-option>
<ui5-toolbar-select-option>Toolbar select option 2</ui5-toolbar-select-option>`
};
//# sourceMappingURL=ToolbarSelect.stories.js.map