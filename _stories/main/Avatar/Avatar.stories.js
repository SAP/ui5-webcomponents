import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import AvatarSize from "@ui5/webcomponents/dist/types/AvatarSize.js";
import AvatarShape from "@ui5/webcomponents/dist/types/AvatarShape.js";
import argTypes from "./argTypes.js";
import TemplateAvatarTypesAndSizes from "./TemplateAvatarTypesandSizes.js";
export default {
    title: "Main/Avatar",
    component: "Avatar",
    argTypes,
};
const Template = (args) => html `<ui5-avatar
    icon="${ifDefined(args.icon)}"
    size="${ifDefined(args.size)}"
    shape="${ifDefined(args.shape)}"
    style="${ifDefined(args.style)}"
    initials="${ifDefined(args.initials)}"
    color-scheme="${ifDefined(args.colorScheme)}"
    ?interactive="${ifDefined(args.interactive)}"
    ?disabled="${ifDefined(args.disabled)}"
    aria-haspopup="${ifDefined(args.ariaHaspopup)}"
    accessible-name="${ifDefined(args.accessibleName)}"
    fallback-icon="${ifDefined(args.fallbackIcon)}"
  >
    ${unsafeHTML(args.default)}
  </ui5-avatar>`;
export const Basic = Template.bind({});
Basic.args = {
    initials: "FJ",
    interactive: true,
    accessibleName: "Avatar with accessible name"
};
export const TypesAndSizes = TemplateAvatarTypesAndSizes.bind({});
export const Styles = Template.bind({});
Styles.args = {
    size: AvatarSize.XL,
    shape: AvatarShape.Square,
    style: "width: 250px; height:250px; border: 1px solid var(--sapField_BorderColor)",
    default: `<img
	src="../assets/images/avatars/Lamp_avatar_01.jpg"
	alt="Lamp"
	style="object-fit: contain"
/>`,
};
//# sourceMappingURL=Avatar.stories.js.map