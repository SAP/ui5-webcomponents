import { html } from "lit";
import argTypes from "./argTypes.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
let index = 0;
export default {
    title: "Main/Table/Table Group Row",
    component: "TableGroupRow",
    argTypes,
};
const Template = (args) => html `
<ui5-table>
<ui5-table-column slot="columns">City</ui5-table-column>
<ui5-table-column slot="columns">Supplier</ui5-table-column>
<ui5-table-column slot="columns">Country</ui5-table-column>
	<ui5-table-group-row>${unsafeHTML(args.default)}</ui5-table-group-row>
	<ui5-table-row>
		<ui5-table-cell><span>Sofia</span></ui5-table-cell>
		<ui5-table-cell><span>Company 1</span></ui5-table-cell>
		<ui5-table-cell><span>Bulgaria</span></ui5-table-cell>
	</ui5-table-row>
	<ui5-table-row>
		<ui5-table-cell><span>Plovdiv</span></ui5-table-cell>
		<ui5-table-cell><span>Company 2</span></ui5-table-cell>
		<ui5-table-cell><span>Bulgaria</span></ui5-table-cell>
	</ui5-table-row>
</ui5-table>
`;
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    default: "Country: Bulgaria"
};
//# sourceMappingURL=TableGroupRow.stories.js.map