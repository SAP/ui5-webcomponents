import { html } from "lit-html";
import argTypes, { componentInfo } from "./argTypes.js";
import { DocsPage } from "../../../.storybook/docs";
const component = "ui5-timeline";
export default {
    title: "Fiori/Timeline",
    component,
    subcomponents: { 'TimelineItem': 'ui5-timeline-item' },
    parameters: {
        docs: {
            page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
};
const Template = (args) => html `<div></div>`;
export const Template0 = () => html `
<h3>Basic Timeline</h3>
	<div class="snippet">
		<ui5-timeline>
			<ui5-timeline-item id="test-item" title-text="called" subtitle-text="20.02.2017 11:30" icon="phone" name="John Smith" name-clickable=""></ui5-timeline-item>
			<ui5-timeline-item title-text="Weekly Sync - CP Design" subtitle-text="27.07.2017 (11:00 - 12:30)" icon="calendar">
				<div>MR SOF02 2.43</div>
			</ui5-timeline-item>
			<ui5-timeline-item title-text="Video Converence Call - UI5" subtitle-text="31.01.2018 (12:00 - 13:00)" icon="calendar">
				<div>Online meeting</div>
			</ui5-timeline-item>
		</ui5-timeline>
	</div>
`;
export const Template1 = () => html `
<h3>Horizontal Timeline</h3>
	<div class="snippet">
		<ui5-timeline layout="Horizontal">
			<ui5-timeline-item id="test-item" title-text="called" subtitle-text="20.02.2017 11:30" icon="phone" name="John Smith" name-clickable=""></ui5-timeline-item>
			<ui5-timeline-item title-text="Weekly Sync - CP Design" subtitle-text="27.07.2017 (11:00 - 12:30)" icon="calendar">
				<div>MR SOF02 2.43</div>
			</ui5-timeline-item>
			<ui5-timeline-item title-text="Video Converence Call - UI5" subtitle-text="31.01.2018 (12:00 - 13:00)" icon="calendar">
				<div>Online meeting</div>
			</ui5-timeline-item>
		</ui5-timeline>
	</div>
`;
//# sourceMappingURL=Timeline.stories.js.map