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
    <ui5-checkbox text="Positive" value-state="Positive"></ui5-checkbox>
    <ui5-checkbox text="Negative" value-state="Negative"></ui5-checkbox>
    <ui5-checkbox text="Critical" value-state="Critical"></ui5-checkbox>
    <ui5-checkbox text="Information" value-state="Information"></ui5-checkbox>
    <ui5-checkbox text="Disabled" disabled="" checked=""></ui5-checkbox>
    <ui5-checkbox text="Readonly" readonly="" checked=""></ui5-checkbox>
    <ui5-checkbox
        text="Positive disabled"
        disabled=""
        value-state="Positive"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Negative disabled"
        disabled=""
        value-state="Negative"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Critical disabled "
        disabled=""
        value-state="Critical"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Information disabled "
        disabled=""
        value-state="Information"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Positive readonly"
        readonly=""
        value-state="Positive"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Negative readonly"
        readonly=""
        value-state="Negative"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Critical readonly"
        readonly=""
        value-state="Critical"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Information readonly"
        readonly=""
        value-state="Information"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Positive indeterminate"
        value-state="Positive"
        indeterminate=""
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Negative indeterminate"
        value-state="Negative"
        indeterminate=""
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Critical indeterminate"
        value-state="Critical"
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