import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/Calendar/Calendar Date",
    component: "CalendarDate",
    argTypes,
};
const Template = (args) => html `<ui5-calendar format-pattern="dd/MM/yyyy">
	<ui5-date value="${ifDefined(args.value)}"></ui5-date>
</ui5-calendar>`;
var date = new Date();
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    value: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
};
//# sourceMappingURL=CalendarDate.stories.js.map