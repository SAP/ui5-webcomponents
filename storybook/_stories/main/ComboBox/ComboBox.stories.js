import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
import ComboBoxFilter from "@ui5/webcomponents/dist/types/ComboBoxFilter.js";
export default {
    title: "Main/Combo Box",
    component: "ComboBox",
    argTypes,
};
const Template = (args) => html `<ui5-combobox
		value="${ifDefined(args.value)}"
		?no-typeahead="${ifDefined(args.noTypeahead)}"
		placeholder="${ifDefined(args.placeholder)}"
		?disabled="${ifDefined(args.disabled)}"
		?readonly="${ifDefined(args.readonly)}"
		?required="${ifDefined(args.required)}"
		?loading="${ifDefined(args.loading)}"
		filter="${ifDefined(args.filter)}"
		value-state="${ifDefined(args.valueState)}"
		accessible-name="${ifDefined(args.accessibleName)}"
		accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
>
		${unsafeHTML(args.default)}
		${unsafeHTML(args.valueStateMessage)}
		${unsafeHTML(args.icon)}
</ui5-combobox>`;
export const Basic = Template.bind({});
Basic.args = {
    placeholder: "Enter value",
    default: `
	<ui5-cb-item text="Austria"></ui5-cb-item>
	<ui5-cb-item text="Bulgaria"></ui5-cb-item>
	<ui5-cb-item text="Germany"></ui5-cb-item>
	<ui5-cb-item text="Italy"></ui5-cb-item>
	<ui5-cb-item text="Spain"></ui5-cb-item>
	`,
};
export const Filters = Template.bind({});
Filters.args = {
    placeholder: "Contains Filtering",
    filter: ComboBoxFilter.Contains,
    default: `
		<ui5-cb-item text="Austria"></ui5-cb-item>
		<ui5-cb-item text="Bulgaria"></ui5-cb-item>
		<ui5-cb-item text="Germany"></ui5-cb-item>
		<ui5-cb-item text="Kazakhstan"></ui5-cb-item>
		<ui5-cb-item text="The United Kingdom of Great Britain and Northern Ireland"></ui5-cb-item>
	`,
};
export const TwoColumnsLayout = Template.bind({});
TwoColumnsLayout.args = {
    placeholder: "Two-column layout",
    default: `
		<ui5-cb-item text="Austria" additional-text="AT"></ui5-cb-item>
		<ui5-cb-item text="Belgium" additional-text="BE"></ui5-cb-item>
		<ui5-cb-item text="Brazil" additional-text="BR"></ui5-cb-item>
		<ui5-cb-item text="Bulgaria" additional-text="BG"></ui5-cb-item>
		<ui5-cb-item text="Canada" additional-text="CA"></ui5-cb-item>
		<ui5-cb-item text="The United Kingdom of Great Britain and Northern Ireland" additional-text="UK"></ui5-cb-item>
	`,
};
export const Grouping = Template.bind({});
Grouping.args = {
    placeholder: "Grouping of items",
    default: `
		<ui5-cb-group-item text="A"></ui5-cb-group-item>
		<ui5-cb-item text="Argentina"></ui5-cb-item>
		<ui5-cb-item text="Australia"></ui5-cb-item>
		<ui5-cb-item text="Austria"></ui5-cb-item>
		<ui5-cb-group-item text="B"></ui5-cb-group-item>
		<ui5-cb-item text="Bahrain"></ui5-cb-item>
		<ui5-cb-item text="Belgium"></ui5-cb-item>
		<ui5-cb-item text="Brazil"></ui5-cb-item>
		<ui5-cb-group-item text="C"></ui5-cb-group-item>
		<ui5-cb-item text="Canada"></ui5-cb-item>
		<ui5-cb-item text="Chile"></ui5-cb-item>
	`,
};
export const SuggestionsWrapping = Template.bind({});
SuggestionsWrapping.args = {
    placeholder: "Enter product",
    default: `
	<ui5-cb-item text="Wireless DSL/ Repeater and Print Server Lorem ipsum dolar st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor incidunt ut labore et dolore magna aliquyam erat, diam nonumy eirmod tempor individunt ut labore et dolore magna aliquyam erat, sed justo et ea rebum."></ui5-cb-item>
	<ui5-cb-item text="Widescreen Portable DVD Player w MP3, consetetur sadipscing, sed diam nonumy eirmod tempor invidunt ut labore et dolore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergen, no sea takimata. Tortor pretium viverra suspendisse potenti nullam. Congue quisque egestas diam in arcu cursus.Rutrum tellus pellentesque eu tincidunt tortor. Nec tincidunt praesent semper feugiat nibh sed"></ui5-cb-item>
	<ui5-cb-item text="Portable DVD Player with 9 inches LCD Monitor"></ui5-cb-item>
	`,
};
//# sourceMappingURL=ComboBox.stories.js.map