import { html } from "lit";
import type { Meta } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import { DocsPage } from "../../../../.storybook/docs";

import type TableColumn from "@ui5/webcomponents/dist/TableColumn.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

const component = "ui5-table-column";

export default {
	title: "Main/Table/Table Column",
	component: "TableColumn",
	parameters: {
		docs: {
		  page: DocsPage({ ...componentInfo, component, showDefaultStoryOnly: true })
		},
	},
	argTypes,
} as Meta<TableColumn>;

const Template: UI5StoryArgs<TableColumn, StoryArgsSlots> = (args) => html`
<ui5-table>
	<ui5-table-column
		slot="columns"
		?demand-popin="${ifDefined(args.demandPopin)}"
		min-width="${ifDefined(args.minWidth)}"
		popin-display="${ifDefined(args.popinDisplay)}"
		popin-text="${ifDefined(args.popinText)}"
	>
		${unsafeHTML(args.default)}
	</ui5-table-column>
	<ui5-table-row>
		<ui5-table-cell>
			<span>Notebook Basic 15</span>
		</ui5-table-cell>
	</ui5-table-row>
</ui5-table>
`;

export const Basic= Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
	default: `<span>Product</span>`
};