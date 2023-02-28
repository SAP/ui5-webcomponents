import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

import type { Meta } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type Carousel from "@ui5/webcomponents/dist/Carousel.js";
import CarouselArrowsPlacement from "@ui5/webcomponents/dist/types/CarouselArrowsPlacement.js";

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

const Template: UI5StoryArgs<Carousel, StoryArgsSlots> = (args) => {
	return html`
<ui5-carousel
	?cyclic="${ifDefined(args.cyclic)}"
	items-per-page-s="${ifDefined(args.itemsPerPageS)}"
	items-per-page-m="${ifDefined(args.itemsPerPageM)}"
	items-per-page-l="${ifDefined(args.itemsPerPageL)}"
	?hide-navigation-arrows="${ifDefined(args.hideNavigationArrows)}"
	?hide-page-indicator="${ifDefined(args.hidePageIndicator)}"
	page-indicator-style="${ifDefined(args.pageIndicatorStyle)}"
	arrows-placement="${ifDefined(args.arrowsPlacement)}"
>
	${unsafeHTML(args.default)}
</ui5-carousel>`;
}

export const SingleItemPerPage = Template.bind({});
SingleItemPerPage.args = {
	cyclic: true,
	default: `<img src="../assets/images/sample1.jpg" alt="Landscape 1">
	<img src="../assets/images/sample2.jpg" alt="Landscape 2">
	<img src="../assets/images/sample3.jpg" alt="Bulb">`
};
SingleItemPerPage.decorators = [
	(story) => html`<style>
	img {
		max-height: 30rem;
	}
</style>
${story()}`
];

export const MultipleItemsPerPage = Template.bind({});
MultipleItemsPerPage.args = {
	itemsPerPageS: 1,
	itemsPerPageM: 2,
	itemsPerPageL: 2,
	arrowsPlacement: CarouselArrowsPlacement.Navigation,
	default: `<ui5-card class="medium">
	<ui5-card-header slot="header" title-text="Activities" subtitle-text="For Today"></ui5-card-header>
	<ui5-timeline>
		<ui5-timeline-item id="test-item" title-text="called" timestamp="1487583000000" icon="phone" name="John Smith" name-clickable=""></ui5-timeline-item>
		<ui5-timeline-item title-text="Weekly Sync - CP Design" timestamp="1517349600000" icon="calendar">MR SOF02 2.43</ui5-timeline-item>
		<ui5-timeline-item title-text="Video Conference Call - UI5" timestamp="1485813600000" icon="calendar">Online meeting</ui5-timeline-item>
	</ui5-timeline>
</ui5-card>
<ui5-card class="small">
	<ui5-card-header slot="header" title-text="David Williams" subtitle-text="Sales Manager">
		<img src="../assets/images/avatars/man_avatar_1.png" alt="" slot="avatar">
	</ui5-card-header>
	<ui5-list separators="Inner">
		<ui5-li icon="competitor" icon-end>Personal Development</ui5-li>
		<ui5-li icon="wallet" icon-end>Finance</ui5-li>
		<ui5-li icon="collaborate" icon-end>Communications Skills</ui5-li>
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
</ui5-card>`
};
MultipleItemsPerPage.decorators = [
	(story) => html`<style>
	ui5-carousel::part(content) {
		padding-block: 0.75rem;
	}

	ui5-card {
		min-width: 18rem;
	}

	ui5-li::part(icon) {
		padding-inline-end: 0;
	}

	.card-content {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		width: 100%;
	}
</style>
${story()}`
];
