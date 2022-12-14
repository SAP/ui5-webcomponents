import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/Timeline",
    component: "ui5-timeline",
    subcomponents: {'TimelineItem' : 'ui5-timeline-item'},
    argTypes,
};


export const Template0 = () => html`
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

export const Template1 = () => html`
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