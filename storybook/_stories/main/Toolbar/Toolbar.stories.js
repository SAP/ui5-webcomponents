import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
import TemplateToolbarTypes from "./TemplateToolbarTypes.js";
export default {
    title: "Main/Toolbar",
    component: "Toolbar",
    argTypes,
};
const Template = (args) => {
    return html `<ui5-toolbar
		align-content="${ifDefined(args.alignContent)}"
	>
		${unsafeHTML(args.default)}
</ui5-toolbar>`;
};
export const Basic = Template.bind({});
Basic.storyName = "Basic";
Basic.args = {
    default: `
	<ui5-toolbar-button
	icon="decline"
	text="Mid 2">
	</ui5-toolbar-button>
	<ui5-toolbar-button
  		icon="add"
  		text="Right 1">
	</ui5-toolbar-button>
	<ui5-toolbar-button
  		icon="employee"
		text="Right 4">
	</ui5-toolbar-button>
	<ui5-toolbar-button
		id="myOverflowBtn"
		icon="employee"
		text="Call me later">
	</ui5-toolbar-button>`,
};
export const Types = TemplateToolbarTypes.bind({});
export const MultipleUI5SelectComponents = (args) => {
    return html `<ui5-toolbar
		align-content="${ifDefined(args.alignContent)}"
	>
		${unsafeHTML(args.default)}
</ui5-toolbar>
<ui5-textarea disabled id="ToolbarStoryTextarea" placeholder="Change selection of the first Select Box"></ui5-textarea>
<script>
	ToolbarStorySelect.addEventListener("ui5-change", e => {
		ToolbarStoryTextarea.setAttribute("value", "Selected option is: " + e.detail.selectedOption.textContent);
	});
</script>
`;
};
MultipleUI5SelectComponents.storyName = "Multiple Toolbar Select components";
MultipleUI5SelectComponents.args = {
    default: `<ui5-toolbar-select id="ToolbarStorySelect">
				<ui5-toolbar-select-option>Apple</ui5-toolbar-select-option>
				<ui5-toolbar-select-option>Orange</ui5-toolbar-select-option>
				<ui5-toolbar-select-option>Pear</ui5-toolbar-select-option>
			</ui5-toolbar-select>
			<ui5-toolbar-select>
				<ui5-toolbar-select-option>1</ui5-toolbar-select-option>
				<ui5-toolbar-select-option>2</ui5-toolbar-select-option>
				<ui5-toolbar-select-option>3</ui5-toolbar-select-option>
			</ui5-toolbar-select>
			<ui5-toolbar-select>
				<ui5-toolbar-select-option>Bulgaria</ui5-toolbar-select-option>
				<ui5-toolbar-select-option>Bolivia</ui5-toolbar-select-option>
				<ui5-toolbar-select-option>Brunei</ui5-toolbar-select-option>
				<ui5-toolbar-select-option>Bangladesh</ui5-toolbar-select-option>
				<ui5-toolbar-select-option>Belarus</ui5-toolbar-select-option>
				<ui5-toolbar-select-option>Belgium</ui5-toolbar-select-option>
			</ui5-toolbar-select>
			<ui5-toolbar-select value-state="Success" width="auto">
				<ui5-toolbar-select-option icon="meal" selected="">Apple</ui5-toolbar-select-option>
				<ui5-toolbar-select-option icon="meal">Avocado</ui5-toolbar-select-option>
				<ui5-toolbar-select-option icon="meal">Mango</ui5-toolbar-select-option>
			</ui5-toolbar-select>
			<ui5-toolbar-select value-state="Warning" width="auto">
				<ui5-toolbar-select-option icon="meal">Orange</ui5-toolbar-select-option>
				<ui5-toolbar-select-option icon="meal" selected="">Pumpkin</ui5-toolbar-select-option>
				<ui5-toolbar-select-option icon="meal">Carrot</ui5-toolbar-select-option>
				<div slot="valueStateMessage">
					Information message. This is a <a href="#">Link</a>. Extra long text
					used as an information message. Extra long text used as an information
					message - 2. Extra long text used as an information message - 3.
				</div>
				<div slot="valueStateMessage">
					Information message 2. This is a <a href="#">Link</a>. Extra long text
					used as an information message. Extra long text used as an information
					message - 2. Extra long text used as an information message - 3.
				</div>
			</ui5-toolbar-select>
			<ui5-toolbar-select value-state="Error">
				<ui5-toolbar-select-option icon="meal">Strawberry</ui5-toolbar-select-option>
				<ui5-toolbar-select-option icon="meal">Tomato</ui5-toolbar-select-option>
				<ui5-toolbar-select-option icon="meal" selected="">Red Chili Pepper</ui5-toolbar-select-option>
				<div slot="valueStateMessage">
					Information message. This is a <a href="#">Link</a>. Extra long text
					used as an information message. Extra long text used as an information
					message - 2. Extra long text used as an information message - 3.
				</div>
				<div slot="valueStateMessage">
					Information message 2. This is a <a href="#">Link</a>. Extra long text
					used as an information message. Extra long text used as an information
					message - 2. Extra long text used as an information message - 3.
				</div>
			</ui5-toolbar-select>
			<ui5-toolbar-select value-state="Information">
				<ui5-toolbar-select-option icon="meal">Blueberry</ui5-toolbar-select-option>
				<ui5-toolbar-select-option icon="meal">Grape</ui5-toolbar-select-option>
				<ui5-toolbar-select-option icon="meal" selected="">Plum</ui5-toolbar-select-option>
				<div slot="valueStateMessage">
					Information message. This is a <a href="#">Link</a>. Extra long text
					used as an information message. Extra long text used as an information
					message - 2. Extra long text used as an information message - 3.
				</div>
				<div slot="valueStateMessage">
					Information message 2. This is a <a href="#">Link</a>. Extra long text
					used as an information message. Extra long text used as an information
					message - 2. Extra long text used as an information message - 3.
				</div>
			</ui5-toolbar-select>
			`
};
//# sourceMappingURL=Toolbar.stories.js.map