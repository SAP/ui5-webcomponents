import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type IllustratedMessage from "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";
import IllustrationMessageType from "@ui5/webcomponents-fiori/dist/types/IllustrationMessageType.js";

const component = "ui5-illustrated-message";

export default {
    title: "Fiori/Illustrated Message",
    component: "IllustratedMessage",
    parameters: {
        docs: {
            page: DocsPage({ ...componentInfo, component }),
        },
    },
    argTypes,
} as Meta<IllustratedMessage>;

const Template: UI5StoryArgs<IllustratedMessage, StoryArgsSlots> = (
    args
) => html` <ui5-illustrated-message
    name="${ifDefined(args.name)}"
    size="${ifDefined(args.size)}"
    subtitle-text="${ifDefined(args.subtitleText)}"
    title-text="${ifDefined(args.titleText)}"
    accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
>
    ${unsafeHTML(args.title)} 
	${unsafeHTML(args.subtitle)}
    ${unsafeHTML(args.default)}
</ui5-illustrated-message>`;

export const Basic = Template.bind({});
Basic.args = {
    name: IllustrationMessageType.UnableToUpload,
    default: `
	<ui5-button design="Emphasized">Action 1</ui5-button>
    <ui5-button>Action 2</ui5-button>
	`,
};

export const WithADialog: StoryFn = () => html`
    <ui5-button id="openDialogButton">Open Dialog</ui5-button>
    <ui5-dialog id="hello-dialog" header-text="Error">
        <ui5-illustrated-message name="UnableToLoad"></ui5-illustrated-message>
        <ui5-bar design="Footer" slot="footer">
            <ui5-button
                id="closeDialogButton"
                design="Emphasized"
                slot="endContent"
                >Close</ui5-button
            >
        </ui5-bar>
    </ui5-dialog>
    <script>
        const dialogOpener = document.getElementById("openDialogButton");
        const dialog = document.getElementById("hello-dialog");
        const dialogCloser = document.getElementById("closeDialogButton");
        dialogOpener.addEventListener("click", function () {
            dialog.show();
        });
        dialogCloser.addEventListener("click", function () {
            dialog.close();
        });
    </script>
`;

export const CustomTitle = Template.bind({});
CustomTitle.args = {
    name: IllustrationMessageType.UnableToUpload,
    title: `
	<ui5-title slot="title" level="H1">Something went wrong</ui5-title>
	`,
    subtitle: `
	<div slot="subtitle">
		Please try again or contact us at
		<ui5-link>example@example.com</ui5-link>
	</div>
	`,
    default: `
	<ui5-button icon="refresh">Try again</ui5-button>`,
};
