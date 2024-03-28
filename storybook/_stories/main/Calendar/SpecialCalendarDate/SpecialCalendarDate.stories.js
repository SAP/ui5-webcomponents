import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/Calendar/Special Calendar Date",
    component: "SpecialCalendarDate",
    argTypes,
};
const Template = (args) => html `<ui5-calendar format-pattern="yyyy/MM/dd">
<ui5-special-date slot="specialDates" value="${ifDefined(args.value)}" type="${ifDefined(args.type)}" ui5-special-date=""></ui5-special-date>
</ui5-calendar>`;
var date = new Date();
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    type: "Type01",
    value: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate() - 1}`,
};
//# sourceMappingURL=SpecialCalendarDate.stories.js.map