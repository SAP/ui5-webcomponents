import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type DynamicSideContent from "@ui5/webcomponents-fiori/dist/DynamicSideContent.js";
import SideContentPosition from "@ui5/webcomponents-fiori/dist/types/SideContentPosition.js";
import SideContentFallDown from "@ui5/webcomponents-fiori/dist/types/SideContentFallDown.js";
import SideContentVisibility from "@ui5/webcomponents-fiori/dist/types/SideContentVisibility.js";

const component = "ui5-dynamic-side-content";

export default {
    title: "Fiori/DynamicSideContent",
    component,
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<DynamicSideContent>;

const Template: UI5StoryArgs<DynamicSideContent, StoryArgsSlots> = (args) => html`<ui5-dynamic-side-content
	?equal-split="${ifDefined(args.equalSplit)}"
	?hide-main-content="${ifDefined(args.hideMainContent)}"
	?hide-side-content="${ifDefined(args.hideSideContent)}"
	side-content-position="${ifDefined(args.sideContentPosition)}"
	side-content-visibility="${ifDefined(args.sideContentVisibility)}"
	side-content-fall-down="${ifDefined(args.sideContentFallDown)}"
>
	${unsafeHTML(args.default)}
	${unsafeHTML(args.sideContent)}
</ui5-dynamic-side-content>`;

export const Basic = Template.bind({});
Basic.args = {
	default: `<div>
	<h1>Main Content</h1>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex mi, elementum et ante commodo, semper sollicitudin magna. Sed dapibus ut tortor quis varius. Sed luctus sem at nunc porta vulputate. Suspendisse lobortis arcu est, quis ultrices ipsum fermentum a. Vestibulum a ipsum placerat ligula gravida fringilla at id ex. Etiam pellentesque lorem sed sagittis aliquam. Quisque semper orci risus, vel efficitur dui euismod aliquet. Morbi sapien sapien, rhoncus et rutrum nec, rhoncus id nisl. Cras non tincidunt enim, id eleifend neque.</p>
</div>`,
	sideContent: `<div slot="sideContent">
	<h1>Side Content</h1>
	<p>Morbi lorem libero, imperdiet id condimentum ac, tempor ut velit. Integer a laoreet sem. Nunc at sagittis nisi. Sed placerat diam eu porttitor dignissim. Maecenas nec fringilla tortor. Pellentesque ut elit est. Curabitur quis elit at mauris ullamcorper fringilla. Nullam diam mi, porttitor dictum orci nec, molestie luctus metus. Nunc ut ex blandit, elementum erat eget, pulvinar sapien. Donec nec lorem eu nunc eleifend tempor at non tortor. In quam velit, ornare at rutrum ac, porta ac augue. Suspendisse venenatis semper lacus at venenatis. Praesent vestibulum ligula nulla, at tempus lorem consequat suscipit. Aenean consequat dapibus dui, at bibendum mauris porta a.</p>
</div>`,
};

export const Position = Template.bind({});
Position.storyName = "Side Content Position";
Position.args = {
	sideContentPosition: SideContentPosition.Start,
	default: `<div>
	<h1>Main Content</h1>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex mi, elementum et ante commodo, semper sollicitudin magna. Sed dapibus ut tortor quis varius. Sed luctus sem at nunc porta vulputate. Suspendisse lobortis arcu est, quis ultrices ipsum fermentum a. Vestibulum a ipsum placerat ligula gravida fringilla at id ex. Etiam pellentesque lorem sed sagittis aliquam. Quisque semper orci risus, vel efficitur dui euismod aliquet. Morbi sapien sapien, rhoncus et rutrum nec, rhoncus id nisl. Cras non tincidunt enim, id eleifend neque.</p>
</div>`,
	sideContent: `<div slot="sideContent">
	<h1>Side Content</h1>
	<p>Morbi lorem libero, imperdiet id condimentum ac, tempor ut velit. Integer a laoreet sem. Nunc at sagittis nisi. Sed placerat diam eu porttitor dignissim. Maecenas nec fringilla tortor. Pellentesque ut elit est. Curabitur quis elit at mauris ullamcorper fringilla. Nullam diam mi, porttitor dictum orci nec, molestie luctus metus. Nunc ut ex blandit, elementum erat eget, pulvinar sapien. Donec nec lorem eu nunc eleifend tempor at non tortor. In quam velit, ornare at rutrum ac, porta ac augue. Suspendisse venenatis semper lacus at venenatis. Praesent vestibulum ligula nulla, at tempus lorem consequat suscipit. Aenean consequat dapibus dui, at bibendum mauris porta a.</p>
</div>`,
};