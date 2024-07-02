import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/Segmented Button",
    component: "SegmentedButton",
    argTypes,
};
const Template = (args) => html `<ui5-segmented-button
	accessible-name="${ifDefined(args.accessibleName)}"
	selection-mode="${ifDefined(args.selectionMode)}"
>
	${unsafeHTML(args.default)}
</ui5-segmented-button>`;
export const Basic = Template.bind({});
Basic.args = {
    default: `<ui5-segmented-button-item>Map</ui5-segmented-button-item>
<ui5-segmented-button-item selected="">Satellite</ui5-segmented-button-item>
<ui5-segmented-button-item>Terrain</ui5-segmented-button-item>`,
    accessibleName: "Geographic location",
};
export const WithIcons = Template.bind({});
WithIcons.args = {
    default: `<ui5-segmented-button-item icon="bold-text" selected=""></ui5-segmented-button-item>
<ui5-segmented-button-item icon="underline-text"></ui5-segmented-button-item>
<ui5-segmented-button-item icon="italic-text"></ui5-segmented-button-item>`,
};
//# sourceMappingURL=SegmentedButton.stories.js.map