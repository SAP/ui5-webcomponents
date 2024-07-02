import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import argTypes from "./argTypes.js";
export default {
    title: "Fiori/View Settings Dialog/Sort Item",
    component: "SortItem",
    argTypes,
};
const Template = (args) => html `<ui5-view-settings-dialog id="vsd1">
	<ui5-sort-item slot="sortItems" text="${ifDefined(args.text)}" ?selected="${ifDefined(args.selected)}"></ui5-sort-item>
	<ui5-sort-item slot="sortItems" text="Name" selected=""></ui5-sort-item>
</ui5-view-settings-dialog>`;
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    text: "Current sort item",
};
Basic.decorators = [
    (story) => html `<ui5-button id="btnOpenDialog1">Open ViewSettingsDialog</ui5-button>
	${story()}
	<script>
		btnOpenDialog1.addEventListener("click", function () {
			vsd1.show();
		});
	</script>
	`,
];
Basic.parameters = {
    docs: {
        story: {
            inline: false,
            iframeHeight: "500px",
        },
    }
};
//# sourceMappingURL=SortItem.stories.js.map