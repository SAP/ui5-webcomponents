import { html } from "lit";
import argTypes from "./argTypes.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
export default {
    title: "Main/Multi-Combo Box",
    component: "MultiComboBox",
    argTypes,
};
const Template = (args) => html `
<ui5-multi-combobox
	value="${ifDefined(args.value)}"
	?no-typeahead="${ifDefined(args.noTypeahead)}"
	placeholder="${ifDefined(args.placeholder)}"
	?allow-custom-values="${ifDefined(args.allowCustomValues)}"
	?disabled="${ifDefined(args.disabled)}"
	value-state="${ifDefined(args.valueState)}"
	?readonly="${ifDefined(args.readonly)}"
	?required="${ifDefined(args.required)}"
	filter="${ifDefined(args.filter)}"
	?open="${ifDefined(args.open)}"
	accessible-name="${ifDefined(args.accessibleName)}"
	accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
>
	${unsafeHTML(args.default)}
	${unsafeHTML(args.icon)}
	${unsafeHTML(args.valueStateMessage)}
</ui5-multi-combobox>`;
export const Basic = Template.bind({});
Basic.args = {
    placeholder: 'Type your value',
    default: `
	<ui5-mcb-item text="Albania"></ui5-mcb-item>
	<ui5-mcb-item selected="" text="Argentina"></ui5-mcb-item>
	<ui5-mcb-item text="Bulgaria"></ui5-mcb-item>
	<ui5-mcb-item text="Denmark"></ui5-mcb-item>
	<ui5-mcb-item text="England"></ui5-mcb-item>
	<ui5-mcb-item text="Germany"></ui5-mcb-item>
	<ui5-mcb-item text="Philippines"></ui5-mcb-item>
	<ui5-mcb-item text="Portugal"></ui5-mcb-item>
	<ui5-mcb-item text="The United Kingdom of Great Britain and Northern Ireland"></ui5-mcb-item>
	`
};
export const MultiComboBoxCustomValue = Template.bind({});
MultiComboBoxCustomValue.args = {
    placeholder: 'Choose your state',
    valueState: ValueState.Success,
    allowCustomValues: true,
    default: `
	<ui5-mcb-item text="Fortune"></ui5-mcb-item>
	<ui5-mcb-item text="Luck"></ui5-mcb-item>
	<ui5-mcb-item selected="" text="Success"></ui5-mcb-item>
	<ui5-mcb-item text="Attention"></ui5-mcb-item>
	<ui5-mcb-item text="Caution"></ui5-mcb-item>
	<ui5-mcb-item text="Warning"></ui5-mcb-item>
	<ui5-mcb-item text="Fault"></ui5-mcb-item>
	<ui5-mcb-item text="Error"></ui5-mcb-item>
	<ui5-mcb-item text="Mistake"></ui5-mcb-item>`
};
MultiComboBoxCustomValue.storyName = "Custom Value";
export const MultiComboBoxGrouping = Template.bind({});
MultiComboBoxGrouping.args = {
    placeholder: 'Select a country',
    default: `
	<ui5-mcb-group-item text="Asia"></ui5-mcb-group-item>
	<ui5-mcb-item text="Afghanistan"></ui5-mcb-item>
	<ui5-mcb-item text="China"></ui5-mcb-item>
	<ui5-mcb-item text="India"></ui5-mcb-item>
	<ui5-mcb-item text="Indonesia"></ui5-mcb-item>
	<ui5-mcb-group-item text="Europe"></ui5-mcb-group-item>
	<ui5-mcb-item text="Austria"></ui5-mcb-item>
	<ui5-mcb-item text="Bulgaria"></ui5-mcb-item>
	<ui5-mcb-item text="Germany"></ui5-mcb-item>
	<ui5-mcb-item text="Italy"></ui5-mcb-item>
	<ui5-mcb-item text="The United Kingdom of Great Britain and Northern Ireland"></ui5-mcb-item>
	<ui5-mcb-group-item text="North America"></ui5-mcb-group-item>
	<ui5-mcb-item text="Canada"></ui5-mcb-item>
	<ui5-mcb-item text="Granada"></ui5-mcb-item>
	<ui5-mcb-item text="Haiti"></ui5-mcb-item>
	<ui5-mcb-item text="United States"></ui5-mcb-item>`
};
MultiComboBoxGrouping.storyName = "Grouping";
export const MultiComboBoxLongToken = Template.bind({});
MultiComboBoxLongToken.args = {
    placeholder: 'MultiComboBox with single long token',
    default: `<ui5-mcb-item selected="" text="Very long long long long long long long text"></ui5-mcb-item>`
};
MultiComboBoxLongToken.storyName = "Single Long Token";
export const SuggestionsWrapping = Template.bind({});
SuggestionsWrapping.args = {
    placeholder: 'Enter product',
    default: `
	<ui5-mcb-item text="Wireless DSL/ Repeater and Print Server Lorem ipsum dolar st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor incidunt ut labore et dolore magna aliquyam erat, diam nonumy eirmod tempor individunt ut labore et dolore magna aliquyam erat, sed justo et ea rebum."></ui5-mcb-item>
	<ui5-mcb-item text="Widescreen Portable DVD Player w MP3, consetetur sadipscing, sed diam nonumy eirmod tempor invidunt ut labore et dolore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergen, no sea takimata. Tortor pretium viverra suspendisse potenti nullam. Congue quisque egestas diam in arcu cursus.Rutrum tellus pellentesque eu tincidunt tortor. Nec tincidunt praesent semper feugiat nibh sed"></ui5-mcb-item>
	<ui5-mcb-item text="Portable DVD Player with 9 inches LCD Monitor"></ui5-mcb-item>`
};
//# sourceMappingURL=MultiComboBox.stories.js.map