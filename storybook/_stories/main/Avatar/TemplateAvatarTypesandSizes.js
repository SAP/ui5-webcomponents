import { html } from "lit";
export default () => html `
<ui5-avatar fallback-icon="employee" size="S" disabled="true">
  <img alt="Woman 1" src="../assets/images/avatars/man_avatar_1.png" />
</ui5-avatar>
(ui5-avatar size="S" disabled="true")

</br>

<ui5-avatar fallback-icon="employee" size="M">
  <img alt="Woman 1" src="../assets/images/avatars/man_avatar_1.png" />
</ui5-avatar> (ui5-avatar size="M")

</br>

<ui5-avatar size="L" disabled="true" initials="AB" color-scheme="Accent1"> </ui5-avatar> (ui5-avatar size="L" disabled="true" color-scheme="Accent1")

</br>

<ui5-avatar size="XL" initials="CD" color-scheme="Accent2"></ui5-avatar> (ui5-avatar size="XL" color-scheme="Accent2")
`;
//# sourceMappingURL=TemplateAvatarTypesandSizes.js.map