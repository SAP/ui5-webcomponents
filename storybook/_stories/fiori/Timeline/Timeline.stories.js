import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
import TimelineLayout from "@ui5/webcomponents-fiori/dist/types/TimelineLayout.js";
export default {
    title: "Fiori/Timeline",
    component: "Timeline",
    argTypes,
};
const Template = (args) => html `<ui5-timeline
	layout="${ifDefined(args.layout)}"
	accessible-name="${ifDefined(args.accessibleName)}"
>
	${unsafeHTML(args.default)}
</ui5-timeline>`;
export const Basic = Template.bind({});
Basic.storyName = "With Items and Layout";
Basic.args = {
    layout: TimelineLayout.Vertical,
    default: `<ui5-timeline-item id="test-item" title-text="called" subtitle-text="20.02.2017 11:30" icon="phone" name="John Smith" name-clickable=""></ui5-timeline-item>
<ui5-timeline-item title-text="Weekly Sync - CP Design" subtitle-text="27.07.2017 (11:00 - 12:30)" icon="calendar">
	<div>MR SOF02 2.43</div>
</ui5-timeline-item>
<ui5-timeline-item title-text="Video Converence Call - UI5" subtitle-text="31.01.2018 (12:00 - 13:00)" icon="calendar">
	<div>Online meeting</div>
</ui5-timeline-item>`,
};
//# sourceMappingURL=Timeline.stories.js.map