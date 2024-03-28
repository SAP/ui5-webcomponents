import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
export default {
    title: "Fiori/Timeline/Timeline Item",
    component: "TimelineItem",
    argTypes,
};
const Template = (args) => html `
<ui5-timeline>
	<ui5-timeline-item
		title-text="${ifDefined(args.titleText)}"
		subtitle-text="${ifDefined(args.subtitleText)}"
		icon="${ifDefined(args.icon)}"
		name="${ifDefined(args.name)}"
		?name-clickable="${ifDefined(args.nameClickable)}"
		>
		${unsafeHTML(args.default)}
	</ui5-timeline-item>
</ui5-timeline>`;
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    icon: "calendar",
    titleText: "Weekly Sync - CP Design",
    subtitleText: "27.07.2017 (11:00 - 12:30)",
    default: `<div>MR SOF02 2.43</div>`
};
//# sourceMappingURL=TimelineItem.stories.js.map