import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Meta, StoryFn } from "@storybook/web-components";
import type { PartialStoryFn } from "@storybook/types";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import MediaGalleryItem from "@ui5/webcomponents-fiori/dist/MediaGalleryItem.js";

const stylesDecorator = (storyFn: PartialStoryFn) => html`
    <style>
        ui5-media-gallery-item:not(:defined) {
            visibility: hidden;
        }

        @media (min-width: 600px) {
            ui5-media-gallery {
                height: 50rem;
            }
        }
    </style>
    ${storyFn()}
`;

export default {
    title: "Fiori/Media Gallery/Media Gallery Item",
    component: "MediaGalleryItem",
    decorators: [stylesDecorator],
    argTypes,
} as Meta<MediaGalleryItem>;

const Template: UI5StoryArgs<MediaGalleryItem, StoryArgsSlots> = (args) => {
    return html` <ui5-media-gallery>
        <ui5-media-gallery-item
            ?selected="${ifDefined(args.selected)}"
            ?disabled="${ifDefined(args.disabled)}"
            layout="${ifDefined(args.layout)}"
        >
            ${unsafeHTML(args.default)}
            ${unsafeHTML(args.thumbnail)}
        </ui5-media-gallery-item>
        <ui5-media-gallery-item>
            <img src="../assets/images/HT-1010.jpg" />
        </ui5-media-gallery-item>
    </ui5-media-gallery>`;
};
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"]
Basic.args = {
    default: `<img src="../assets/images/HT-1000.jpg" />`,
    selected: true
};