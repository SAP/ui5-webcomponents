import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/Select/Option",
    component: "Option",
    argTypes,
};
const Template = (args) => {
    return html `<ui5-select>
   <ui5-option
   additional-text="${ifDefined(args.additionalText)}"
   ?disabled="${ifDefined(args.disabled)}"
   icon="${ifDefined(args.icon)}"
   ?selected="${ifDefined(args.selected)}"
   value="${ifDefined(args.value)}"
   >${unsafeHTML(args.default)}</ui5-option>
</ui5-select> `;
};
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    icon: "laptop",
    default: "Desktop",
    selected: true
};
//# sourceMappingURL=Option.stories.js.map