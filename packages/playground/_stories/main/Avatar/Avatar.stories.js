import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

import argTypes from "./argTypes.js";

export default {
    title: "Components/Avatar",
    component: "ui5-avatar",
    argTypes,
};

const Template = (args) =>
    html`<ui5-avatar
        icon="${ifDefined(args.icon)}"
        size="${ifDefined(args.size)}"
        shape="${ifDefined(args.shape)}"
        style="${ifDefined(args.style)}"
        initials="${ifDefined(args.initials)}"
        color-scheme="${ifDefined(args.colorScheme)}"
        ?interactive="${ifDefined(args.interactive)}"
        aria-haspopup="${ifDefined(args.ariaHaspopup)}"
        @ui5-click="${ifDefined(args["ui5-click"])}"
    >
        ${unsafeHTML(args["default"])}
</ui5-avatar>`;

// Basic
export const Basic = Template.bind({});
Basic.storyName = "Basic";
Basic.args = {
    initials: "FJ",
    interactive: true,
    ["ui5-click"]: (e) => action("ui5-click")(e.detail),
};

// With Image
export const WithImage = Template.bind({});
WithImage.storyName = "Avatar with image";
WithImage.parameters = {
    controls: {
        include: [
            "size",
            "shape",
            "default",
            "interactive",
            "ariaHaspopup",
            "accessibleName",
        ],
    },
};
WithImage.args = {
    ["default"]: `<img
	alt="Woman 1"
	src="../assets/images/avatars/man_avatar_1.png"
/>`,
};

// Sizes
export const Size = Template.bind({});
Size.storyName = "Avatar Size";
Size.parameters = {
    controls: {
        include: ["icon", "size"],
    },
};
Size.args = {
    size: "L",
    icon: "home",
};

// Styles
export const Styles = Template.bind({});
Styles.storyName = "Avatar Styles";
Styles.args = {
    size: "XL",
    shape: "Square",
    style: "width: 250px; height: 250px; border: 1px solid var(--sapField_BorderColor)",
    default: `<img
	src="../assets/images/avatars/Lamp_avatar_01.jpg"
	alt="Lamp"
	style="object-fit: contain"
/>`,
};
