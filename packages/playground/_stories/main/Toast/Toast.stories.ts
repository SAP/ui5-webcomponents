import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";
import ToastPlacement from "@ui5/webcomponents/dist/types/ToastPlacement.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type Toast from "@ui5/webcomponents/dist/Toast.js";

const component = "ui5-toast";

export default {
    title: "Main/Toast",
    component,
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<Toast>;

const Template: UI5StoryArgs<Toast, StoryArgsSlots> = (args) =>
	html`
<ui5-button id="btnShowToast">Show Toast</ui5-button>
<ui5-toast
	id="toastBasic"
	duration="${ifDefined(args.duration)}"
	placement="${ifDefined(args.placement)}"
	>${unsafeHTML(args.default)}</ui5-toast>
<script>
	var toastOpener = document.getElementById("btnShowToast");
	var toast = document.getElementById("toastBasic"); 

	toastOpener.addEventListener("click", () => {
		toast.show();
	});
</script>`;

export const Basic = Template.bind({});
Basic.args = {
	default: "Basic Toast",
};

export const ToastDuration = Template.bind({});
ToastDuration.args = {
	default: "Long Toast",
	duration: 4500,
};

export const ToastPlacements = Template.bind({});
ToastPlacements.args = {
	default: "Middle Center Toast",
	placement: ToastPlacement.MiddleCenter,
};
