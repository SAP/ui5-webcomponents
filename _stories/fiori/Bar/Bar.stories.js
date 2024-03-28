import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
import BarDesign from "@ui5/webcomponents-fiori/dist/types/BarDesign.js";
export default {
    title: "Fiori/Bar",
    component: "Bar",
    argTypes,
};
const Template = (args) => html `<ui5-bar
	design="${ifDefined(args.design)}"
>
	${unsafeHTML(args.default)}
	${unsafeHTML(args.startContent)}
	${unsafeHTML(args.endContent)}
</ui5-bar>`;
export const Basic = Template.bind({});
Basic.storyName = "Basic";
Basic.args = {
    design: BarDesign.Header,
    startContent: `<ui5-button icon="home" tooltip="Go home" design="Transparent" slot="startContent"></ui5-button>`,
    default: `<ui5-label id="basic-label">Content</ui5-label>`,
    endContent: `<ui5-button icon="action-settings" tooltip="Go to settings" slot="endContent"></ui5-button>`,
};
//# sourceMappingURL=Bar.stories.js.map