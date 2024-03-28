import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import argTypes from "./argTypes.js";
import WrappingType from "@ui5/webcomponents/dist/types/WrappingType.js";
export default {
    title: "Main/Check Box",
    component: "CheckBox",
    argTypes,
};
const Template = (args) => html `<ui5-checkbox
        accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
        accessible-name="${ifDefined(args.accessibleName)}"
        ?disabled="${ifDefined(args.disabled)}"
        ?readonly="${ifDefined(args.readonly)}"
        ?required="${ifDefined(args.required)}"
        ?indeterminate="${ifDefined(args.indeterminate)}"
        ?checked="${ifDefined(args.checked)}"
        ?display-only="${ifDefined(args.displayOnly)}"
        text="${ifDefined(args.text)}"
        value-state="${ifDefined(args.valueState)}"
        wrapping-type="${ifDefined(args.wrappingType)}"
        name="${ifDefined(args.name)}"
        style="${ifDefined(args.style)}"
    >
    </ui5-checkbox>`;
export const Basic = Template.bind({});
Basic.args = {
    text: "Basic",
};
export const Wrapping = Template.bind({});
Wrapping.args = {
    text: "ui5-checkbox with 'wrapping-type=Normal' set and some long text.",
    wrappingType: WrappingType.Normal,
    style: "width:200px",
    indeterminate: true,
    checked: true,
};
export const States = () => html `
    <ui5-checkbox text="Success" value-state="Success"></ui5-checkbox>
    <ui5-checkbox text="Error" value-state="Error"></ui5-checkbox>
    <ui5-checkbox text="Warning" value-state="Warning"></ui5-checkbox>
    <ui5-checkbox text="Information" value-state="Information"></ui5-checkbox>
    <ui5-checkbox text="Disabled" disabled="" checked=""></ui5-checkbox>
    <ui5-checkbox text="Readonly" readonly="" checked=""></ui5-checkbox>
    <ui5-checkbox
        text="Success disabled"
        disabled=""
        value-state="Success"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Error disabled"
        disabled=""
        value-state="Error"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Warning disabled "
        disabled=""
        value-state="Warning"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Information disabled "
        disabled=""
        value-state="Information"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Success readonly"
        readonly=""
        value-state="Success"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Error readonly"
        readonly=""
        value-state="Error"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Warning readonly"
        readonly=""
        value-state="Warning"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Information readonly"
        readonly=""
        value-state="Information"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Success indeterminate"
        value-state="Success"
        indeterminate=""
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Error indeterminate"
        value-state="Error"
        indeterminate=""
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Warning indeterminate"
        value-state="Warning"
        indeterminate=""
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Information indeterminate"
        value-state="Information"
        indeterminate=""
        checked=""
    ></ui5-checkbox>
`;
//# sourceMappingURL=CheckBox.stories.js.map