import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Meta } from "@storybook/web-components";
import type { PartialStoryFn } from "@storybook/types";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import MediaGallery from "@ui5/webcomponents-fiori/dist/MediaGallery.js";
import MediaGalleryLayout from "@ui5/webcomponents-fiori/dist/types/MediaGalleryLayout.js";
import MediaGalleryMenuHorizontalAlign from "@ui5/webcomponents-fiori/dist/types/MediaGalleryMenuHorizontalAlign.js";

const component = "ui5-media-gallery";

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
    title: "Fiori/MediaGallery",
    component,
    subcomponents: { MediaGalleryItem: "ui5-media-gallery-item" },
    parameters: {
        docs: {
            page: DocsPage({ ...componentInfo, component }),
        },
    },
    decorators: [stylesDecorator],
    argTypes,
} as Meta<MediaGallery>;

let index = 0;

const Template: UI5StoryArgs<MediaGallery, StoryArgsSlots> = (args) => {
    return html` <ui5-media-gallery
        id="media-gallery-${index++}"
        ?show-all-thumbnails="${ifDefined(args.showAllThumbnails)}"
        ?interactive-display-area="${ifDefined(args.interactiveDisplayArea)}"
        layout="${ifDefined(args.layout)}"
        menu-horizontal-align="${ifDefined(args.menuHorizontalAlign)}"
        menu-vertical-align="${ifDefined(args.menuVerticalAlign)}"
    >
        ${unsafeHTML(args.default)}
    </ui5-media-gallery>`;
};
export const Basic = Template.bind({});
Basic.args = {
    showAllThumbnails: true,
    default: `
	<ui5-media-gallery-item>
		<img src="../assets/images/HT-1000.jpg" />
	</ui5-media-gallery-item>
	<ui5-media-gallery-item>
		<img src="../assets/images/HT-1010.jpg" />
	</ui5-media-gallery-item>
	<ui5-media-gallery-item>
		<img src="../assets/images/HT-1022.jpg" />
	</ui5-media-gallery-item>
	<ui5-media-gallery-item>
		<img src="../assets/images/HT-1030.jpg" />
	</ui5-media-gallery-item>
	<ui5-media-gallery-item>
		<img src="../assets/images/HT-2002.jpg" />
	</ui5-media-gallery-item>
	<ui5-media-gallery-item>
		<img src="../assets/images/HT-2026.jpg" />
	</ui5-media-gallery-item>`,
};

export const WithVerticalLayout = Template.bind({});
WithVerticalLayout.args = {
    showAllThumbnails: true,
    layout: MediaGalleryLayout.Vertical,
    default: `
    <ui5-media-gallery-item>
        <img src="../assets/images/HT-1000.jpg" />
    </ui5-media-gallery-item>
    <ui5-media-gallery-item>
        <img src="../assets/images/HT-1010.jpg" />
    </ui5-media-gallery-item>
    <ui5-media-gallery-item>
        <img src="../assets/images/HT-1022.jpg" />
    </ui5-media-gallery-item>
    <ui5-media-gallery-item>
        <img src="../assets/images/HT-1030.jpg" />
    </ui5-media-gallery-item>
    <ui5-media-gallery-item>
        <img src="../assets/images/HT-2002.jpg" />
    </ui5-media-gallery-item>
    <ui5-media-gallery-item>
        <img src="../assets/images/HT-2026.jpg" />
    </ui5-media-gallery-item>`,
};

export const WithThumbnailsOnTheRight = Template.bind({});
WithThumbnailsOnTheRight.args = {
    showAllThumbnails: true,
    layout: MediaGalleryLayout.Horizontal,
    menuHorizontalAlign: MediaGalleryMenuHorizontalAlign.Right,
    default: `
    <ui5-media-gallery-item>
        <img src="../assets/images/HT-1000.jpg" />
    </ui5-media-gallery-item>
    <ui5-media-gallery-item>
        <img src="../assets/images/HT-1010.jpg" />
    </ui5-media-gallery-item>
    <ui5-media-gallery-item>
        <img src="../assets/images/HT-1022.jpg" />
    </ui5-media-gallery-item>
    <ui5-media-gallery-item>
        <img src="../assets/images/HT-1030.jpg" />
    </ui5-media-gallery-item>
    <ui5-media-gallery-item>
        <img src="../assets/images/HT-2002.jpg" />
    </ui5-media-gallery-item>
    <ui5-media-gallery-item>
        <img src="../assets/images/HT-2026.jpg" />
    </ui5-media-gallery-item>`,
};

export const WithSeparateImageThumbnail = Template.bind({});
WithSeparateImageThumbnail.args = {
    default: `
    <ui5-media-gallery-item>
        <img src="../assets/images/HT-1000.jpg" />
        <img
            src="../assets/images/HT-1000-small.jpg"
            slot="thumbnail"
        />
    </ui5-media-gallery-item>`,
};

export const WithVideoContent = Template.bind({});
WithVideoContent.args = {
    default: `
    <ui5-media-gallery-item layout="Wide">
        <iframe
            src="https://www.youtube.com/embed/GxGZG2fv6Aw"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen=""
        ></iframe>
        <img
            src="../assets/images/sap-logo-square.svg"
            slot="thumbnail"
            alt="SAP Video"
        />
    </ui5-media-gallery-item>`,
};

export const WithDisabledContent = Template.bind({});
WithDisabledContent.args = {
    default: `
    <ui5-media-gallery-item disabled="">
        <img src="../assets/images/HT-1000.jpg" />
    </ui5-media-gallery-item>
    <ui5-media-gallery-item>
        <img src="../assets/images/HT-1010.jpg" />
    </ui5-media-gallery-item>`,
};

export const WithInitiallySelected = Template.bind({});
WithInitiallySelected.args = {
    default: `
    <ui5-media-gallery-item>
        <img src="../assets/images/HT-1000.jpg" />
    </ui5-media-gallery-item>
    <ui5-media-gallery-item selected="">
        <img src="../assets/images/HT-1010.jpg" />
    </ui5-media-gallery-item>`,
};

export const WithThumbnailOverflow = Template.bind({});
WithThumbnailOverflow.decorators = [
    (story) => html`
<style>
    @media (min-width: 612px) {
        .container {
            display: grid;
            gap: 1rem;
            grid-template-columns: 1fr 1fr;
        }
    }

    .details {
		background: var(--sapBaseColor);
		padding: 1rem;
	}

	.dialog-footer {
		display: flex;
		justify-content: flex-end;
		width: 100%;
		padding: 0px 0.5rem 0px 0px;
	}
</style>
<div class="container">
    ${story()}
    <div class="details">
            <ui5-title level="H1">Item Details</ui5-title>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            quam lectus, tristique semper mi et, faucibus viverra metus.
            Quisque nec venenatis massa. Ut eu dolor a justo ornare feugiat.
            Morbi congue diam id enim porttitor, sit amet placerat nunc
            pulvinar. Vivamus eu feugiat justo. Ut eu lectus mauris. Aliquam
            erat volutpat. Vestibulum et enim sit amet ipsum tincidunt
            aliquet nec in dui. Sed dui est, hendrerit non sollicitudin
            quis, venenatis vel libero. Suspendisse sit amet lorem posuere,
            egestas neque eget, sodales ipsum. Donec sollicitudin leo ut
            risus tincidunt tincidunt. Ut vel nisl nisl. Cras leo odio,
            viverra a ante nec, cursus volutpat lectus. Cras ac metus nisi.
            Aliquam fermentum nec felis sit amet tristique. Nunc luctus a
            lacus non semper. Curabitur euismod tellus id massa mattis, in
            consectetur mi luctus. Mauris dignissim efficitur lobortis.
            Etiam sit amet nunc commodo, lacinia nisi sagittis, finibus
            nulla. Proin quis elementum eros. Ut facilisis lacinia viverra.
        </div>
    </div>
</div>

<ui5-dialog id="mediaGalleryDialog" header-text="Item" stretch="">
    <ui5-bar design="Header" slot="header">
        <ui5-label>Item</ui5-label>
    </ui5-bar>
    <ui5-media-gallery show-all-thumbnails="">
        <ui5-media-gallery-item>
            <img src="../assets/images/HT-1000.jpg" />
        </ui5-media-gallery-item>
        <ui5-media-gallery-item>
            <img src="../assets/images/HT-1010.jpg" />
        </ui5-media-gallery-item>
        <ui5-media-gallery-item>
            <img src="../assets/images/HT-1022.jpg" />
        </ui5-media-gallery-item>
        <ui5-media-gallery-item>
            <img src="../assets/images/HT-1030.jpg" />
        </ui5-media-gallery-item>
        <ui5-media-gallery-item>
            <img src="../assets/images/HT-2002.jpg" />
        </ui5-media-gallery-item>
        <ui5-media-gallery-item>
            <img src="../assets/images/HT-2026.jpg" />
        </ui5-media-gallery-item>
    </ui5-media-gallery>
    <div slot="footer" class="dialog-footer">
        <div style="flex: 1;"></div>
        <ui5-button id="closeDialogButton">Close</ui5-button>
    </div>
</ui5-dialog>
<script>
    const mediaGalleryDialog = document.getElementById("mediaGalleryDialog");
    const mediaGallery = document.querySelector(".container > ui5-media-gallery");
    const closeDialogButton = document.getElementById("closeDialogButton");
    
    closeDialogButton.addEventListener("click", () => {
        mediaGalleryDialog.close();
    });
    mediaGallery.addEventListener("overflow-click", (event) => {
        mediaGalleryDialog.show();
    });
    mediaGallery.addEventListener(
        "display-area-click",
        (event) => {
            mediaGalleryDialog.show();
        }
    );
</script>`,
];

WithThumbnailOverflow.args = {
    interactiveDisplayArea: true,
    default: `
    <ui5-media-gallery-item>
        <img src="../assets/images/HT-1000.jpg" />
    </ui5-media-gallery-item>
    <ui5-media-gallery-item>
        <img src="../assets/images/HT-1010.jpg" />
    </ui5-media-gallery-item>
    <ui5-media-gallery-item>
        <img src="../assets/images/HT-1022.jpg" />
    </ui5-media-gallery-item>
    <ui5-media-gallery-item>
        <img src="../assets/images/HT-1030.jpg" />
    </ui5-media-gallery-item>
    <ui5-media-gallery-item>
        <img src="../assets/images/HT-2002.jpg" />
    </ui5-media-gallery-item>
    <ui5-media-gallery-item>
        <img src="../assets/images/HT-2026.jpg" />
    </ui5-media-gallery-item>`,
};
WithThumbnailOverflow.parameters = {
    docs: {
        story: {
            // Opt-out of inline rendering
            inline: false,
            iframeHeight: "800px",
        },
    },
};
