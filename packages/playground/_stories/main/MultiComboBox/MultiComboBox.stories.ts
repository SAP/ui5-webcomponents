import { html } from "lit";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type MultiComboBox from "@ui5/webcomponents/dist/MultiComboBox.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";

const component = "ui5-multi-combobox";

export default {
    title: "Main/MultiComboBox",
    component,
    subcomponents: {'MultiComboBoxItem' : 'ui5-mcb-item', 'MultiComboBoxGroupItem' : 'ui5-mcb-group-item'},
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<MultiComboBox>;

const Template: UI5StoryArgs<MultiComboBox, StoryArgsSlots> = (args) => html`
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


export const BasicMultiComboBox = Template.bind({});
BasicMultiComboBox.args = {
	placeholder: 'Type your value',
	default: `<ui5-mcb-item selected="" text="UI5"></ui5-mcb-item>`
};

export const MultiComboBoxItems = Template.bind({});
MultiComboBoxItems.args = {
	placeholder: 'Choose your countries',
	default: `
	<ui5-mcb-item selected="" text="Argentina"></ui5-mcb-item>
	<ui5-mcb-item text="Bulgaria"></ui5-mcb-item>
	<ui5-mcb-item text="Denmark"></ui5-mcb-item>
	<ui5-mcb-item text="England"></ui5-mcb-item>
	<ui5-mcb-item text="Albania"></ui5-mcb-item>
	<ui5-mcb-item text="Morocco"></ui5-mcb-item>
	<ui5-mcb-item text="Portugal"></ui5-mcb-item>
	<ui5-mcb-item text="Germany"></ui5-mcb-item>
	<ui5-mcb-item text="Philippines"></ui5-mcb-item>
	<ui5-mcb-item text="Paraguay"></ui5-mcb-item>`
};

MultiComboBoxItems.storyName = "Multi Combo Box with items";

export const MultiComboBoxFreeTextInput = Template.bind({});
MultiComboBoxFreeTextInput.args = {
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
MultiComboBoxFreeTextInput.storyName = "Multi Combo Box with free text input";

export const MultiComboBoxGroupingItems = Template.bind({});
MultiComboBoxGroupingItems.args = {
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
	<ui5-mcb-group-item text="North America"></ui5-mcb-group-item>
	<ui5-mcb-item text="Canada"></ui5-mcb-item>
	<ui5-mcb-item text="Granada"></ui5-mcb-item>
	<ui5-mcb-item text="Haiti"></ui5-mcb-item>
	<ui5-mcb-item text="United States"></ui5-mcb-item>`
};
MultiComboBoxGroupingItems.storyName = "Multi Combo Box with Grouping of Items";
