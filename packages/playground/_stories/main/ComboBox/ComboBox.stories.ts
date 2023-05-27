import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type ComboBox from "@ui5/webcomponents/dist/ComboBox.js";

import ComboBoxFilter from "@ui5/webcomponents/dist/types/ComboBoxFilter.js";

const component = "ui5-combobox";

export default {
	title: "Main/ComboBox",
	component,
	subcomponents: {
		ComboBoxItem: "ui5-cb-item",
		ComboBoxGroupItem: "ui5-cb-group-item",
	},
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component }),
		},
	},
	argTypes,
} as Meta<ComboBox>;

const Template: UI5StoryArgs<ComboBox, StoryArgsSlots> = (
		args
) => html`<ui5-combobox
		value="${ifDefined(args.value)}"
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
		<ui5-cb-item text="Item 1"></ui5-cb-item>
		<ui5-cb-item text="Item 2"></ui5-cb-item>
		<ui5-cb-item text="Item 3"></ui5-cb-item>
	`,
};

export const Disabled = Template.bind({});
Disabled.args = {
	disabled: true,
	value: "Disabled",
};

export const Filters = Template.bind({});
Filters.args = {
	placeholder: "Contains Filtering",
	filter: ComboBoxFilter.Contains,
	default: `
		<ui5-cb-item text="Austria"></ui5-cb-item>
		<ui5-cb-item text="Bulgaria"></ui5-cb-item>
		<ui5-cb-item text="Germany"></ui5-cb-item>
		<ui5-cb-item text="United Kingdom"></ui5-cb-item>
		<ui5-cb-item text="Kazakhstan"></ui5-cb-item>
	`,
};

export const TwoColumns = Template.bind({});
TwoColumns.args = {
	placeholder: "Two-column layout",
	default: `
		<ui5-cb-item text="Austria" additional-text="AT"></ui5-cb-item>
		<ui5-cb-item text="Belgium" additional-text="BE"></ui5-cb-item>
		<ui5-cb-item text="Brazil" additional-text="BR"></ui5-cb-item>
		<ui5-cb-item text="Bulgaria" additional-text="BG"></ui5-cb-item>
		<ui5-cb-item text="Canada" additional-text="CA"></ui5-cb-item>
	`,
};

export const GroupingItems = Template.bind({});
GroupingItems.args = {
	placeholder: "ComboBox with grouping of suggestions",
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
