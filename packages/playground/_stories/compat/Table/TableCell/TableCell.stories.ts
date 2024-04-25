import { html } from "lit";
import type { Meta } from "@storybook/web-components";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import type TableCell from "@ui5/webcomponents/dist/TableCell.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

export default {
	title: "Main/Table/Table Cell",
	component: "TableCell",
	argTypes,
} as Meta<TableCell>;

const Template: UI5StoryArgs<TableCell, StoryArgsSlots> = (args) => html`
<ui5-table>
	<ui5-table-column slot="columns">
		<span>Product</span>
	</ui5-table-column>
	<ui5-table-row>
		<ui5-table-cell>
			${unsafeHTML(args.default)}
		</ui5-table-cell>
	</ui5-table-row>
</ui5-table>
`;

export const Basic= Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
	default: `<span>Notebook Basic 15</span>`
};