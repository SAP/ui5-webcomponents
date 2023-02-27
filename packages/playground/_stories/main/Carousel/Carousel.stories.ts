import { html } from "lit-html";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type Carousel from "@ui5/webcomponents/dist/Carousel.js";

const component = "ui5-carousel";

export default {
    title: "Main/Carousel",
    component,
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<Carousel>;

const Template: UI5StoryArgs<Carousel, StoryArgsSlots> = (args) => html`<div></div>`;


export const Template0: StoryFn = () => html`
<h3>Carousel With Single Item per Page</h3>
	<div class="snippet">
		<ui5-carousel>
			<img src="../assets/images/sample1.jpg" alt="Landscape 1">
			<img src="../assets/images/sample2.jpg" alt="Landscape 2">
			<img src="../assets/images/sample3.jpg" alt="Bulb">
		</ui5-carousel>
	</div>
`;


export const Template1: StoryFn = () => html`
<h3>Carousel With Multiple Items per Page</h3>
	<div class="snippet">
		<ui5-carousel items-per-page-s="1" items-per-page-m="2" items-per-page-l="2">
			<ui5-card class="medium">
				<ui5-card-header slot="header" title-text="Activities" subtitle-text="For Today"></ui5-card-header>
				<ui5-timeline>
					<ui5-timeline-item id="test-item" title-text="called" timestamp="1487583000000" icon="phone" name="John Smith" name-clickable=""></ui5-timeline-item>
					<ui5-timeline-item title-text="Weekly Sync - CP Design" timestamp="1517349600000" icon="calendar">
						MR SOF02 2.43
					</ui5-timeline-item>
					<ui5-timeline-item title-text="Video Converence Call - UI5" timestamp="1485813600000" icon="calendar">
						Online meeting
					</ui5-timeline-item>
				</ui5-timeline>
			</ui5-card>
			<ui5-card class="small">
				<ui5-card-header slot="header" title-text="David Willams" subtitle-text="Sales Manager">
					<img src="../assets/images/avatars/man_avatar_1.png" slot="avatar">
				</ui5-card-header>
				<ui5-list separators="Inner" class="content-padding">
					<ui5-li icon="competitor" icon-end="">Personal Development</ui5-li>
					<ui5-li icon="wallet" icon-end="">Finance</ui5-li>
					<ui5-li icon="collaborate" icon-end="">Communications Skills</ui5-li>
				</ui5-list>
			</ui5-card>
			<ui5-card class="medium">
				<ui5-card-header slot="header" title-text="Team Dolphins" subtitle-text="Direct Reports" status="1 of 2">
					<ui5-icon name="group" slot="avatar"></ui5-icon>
				</ui5-card-header>
				<div class="card-content">
					<ui5-list separators="None" class="card-content-child" style="width: 100%">
						<ui5-li image="../assets/images/avatars/man_avatar_1.png" description="User Researcher">Alain Chevalier</ui5-li>
						<ui5-li image="../assets/images/avatars/woman_avatar_1.png" description="Artist">Monique Legrand</ui5-li>
						<ui5-li image="../assets/images/avatars/woman_avatar_2.png" description="UX Specialist">Michael Adams</ui5-li>
					</ui5-list>
				</div>
			</ui5-card>
			<ui5-card class="medium">
				<ui5-card-header slot="header" title-text="Team Bears" subtitle-text="Direct Reports" interactive="" status="2 of 2">
						<ui5-icon name="group" slot="avatar"></ui5-icon>
				</ui5-card-header>
				<div class="card-content">
					<ui5-list separators="None" class="card-content-child" style="width: 100%">
						<ui5-li image="../assets/images/avatars/man_avatar_2.png" description="Software Architect">Richard Wilson</ui5-li>
						<ui5-li image="../assets/images/avatars/woman_avatar_3.png" description="Visual Designer">Elena Petrova</ui5-li>
						<ui5-li image="../assets/images/avatars/man_avatar_3.png" description="Quality Specialist">John Miller</ui5-li>
					</ui5-list>
				</div>
			</ui5-card>
		</ui5-carousel>
	</div>
`;


export const Template2: StoryFn = () => html`
<h3>Carousel With Arrow Placement and Cyclic</h3>
	<div class="snippet">
		<ui5-carousel arrows-placement="Navigation" cyclic="">
			<img src="../assets/images/sample1.jpg" alt="Landscape 1">
			<img src="../assets/images/sample2.jpg" alt="Landscape 2">
			<img src="../assets/images/sample3.jpg" alt="Bulb">
		</ui5-carousel>
	</div>
`;
