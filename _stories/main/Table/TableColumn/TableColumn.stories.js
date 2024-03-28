import { html } from "lit";
import argTypes from "./argTypes.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
export default {
    title: "Main/Table/Table Column",
    component: "TableColumn",
    argTypes,
};
const Template = (args) => html `
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
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    default: `<span>Product</span>`
};
//# sourceMappingURL=TableColumn.stories.js.map