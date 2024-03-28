import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
import { ifDefined } from "lit/directives/if-defined.js";
export default {
    title: "Main/Tree",
    component: "Tree",
    argTypes,
};
const Template = (args) => html `<ui5-tree
    mode="${ifDefined(args.mode)}"
    no-data-text="${ifDefined(args.noDataText)}"
    header-text="${ifDefined(args.headerText)}"
    footer-text="${ifDefined(args.footerText)}"
    accessible-name="${ifDefined(args.accessibleName)}"
    accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
>
    ${unsafeHTML(args.header)} ${unsafeHTML(args.default)}
</ui5-tree>`;
export const Basic = Template.bind({});
Basic.args = {
    default: `
	<ui5-tree-item expanded="" text="Tree 1" icon="paste" selected="">
		<ui5-tree-item expanded="" text="Tree 1.1" selected="">
			<ui5-tree-item text="Tree 1.1.1"></ui5-tree-item>
			<ui5-tree-item text="Tree 1.1.2"></ui5-tree-item>
		</ui5-tree-item>
	</ui5-tree-item>
	<ui5-tree-item text="Tree 2" icon="copy">
		<ui5-tree-item text="Tree 2.1">
			<ui5-tree-item text="Tree 2.1.1"></ui5-tree-item>
			<ui5-tree-item text="Tree 2.1.2">
				<ui5-tree-item text="Tree 2.1.2.1"></ui5-tree-item>
				<ui5-tree-item text="Tree 2.1.2.2"></ui5-tree-item>
				<ui5-tree-item text="Tree 2.1.2.3"></ui5-tree-item>
				<ui5-tree-item text="Tree 2.1.2.5"></ui5-tree-item>
			</ui5-tree-item>
		</ui5-tree-item>
		<ui5-tree-item text="Tree 2.2"></ui5-tree-item>
	</ui5-tree-item>
	<ui5-tree-item expanded="" text="Tree 3 (no icon)"> </ui5-tree-item>`,
};
export const DynamicContent = () => html `
    <ui5-busy-indicator id="busy" class="full-width">
        <ui5-tree id="treeDynamic" mode="None" class="full-width">
            <ui5-tree-item text="Has pre-loaded children">
                <ui5-tree-item text="Child 1"></ui5-tree-item>
                <ui5-tree-item text="Child 2"></ui5-tree-item>
            </ui5-tree-item>
            <ui5-tree-item text="Has no children at all"></ui5-tree-item>
            <ui5-tree-item
                id="dynamicNode"
                text="Has children, but not yet loaded"
                has-children=""
            ></ui5-tree-item>
        </ui5-tree>
    </ui5-busy-indicator>
    <script>
        const busyIndicator = document.getElementById("busy");
        const dynamicTree = document.getElementById("treeDynamic");
        dynamicTree.addEventListener("item-toggle", function (event) {
            const item = event.detail.item; // get the node that is toggled
            // Only for the dynamic node, and only when it's empty
            if (item.id === "dynamicNode" && item.children.length === 0) {
                busyIndicator.active = true; // block the tree from the user
                event.preventDefault(); // do not let the toggle button switch yet
                setTimeout(function () {
                    const newItem = document.createElement("ui5-tree-item"); // Fetching from db....
                    newItem.text = "Node fetched from DB after 2 sec";
                    item.appendChild(newItem); // add the newly fetched node to the tree
                    item.toggle(); // now manually switch the toggle button
                    busyIndicator.active = false; // unblock the tree
                }, 2000);
            }
        });
    </script>
`;
export const TreeWithCustomItems = Template.bind({});
TreeWithCustomItems.args = {
    header: `
	<div slot="header">
		<ui5-title>Tree with custom items</ui5-title>
	</div>`,
    default: `
	<ui5-tree-item-custom
		expanded="true"
		show-toggle-button=""
		hide-selection-element=""
		type="Active"
		level="1"
	>
		<ui5-button slot="content">Level 1</ui5-button>
		<ui5-tree-item-custom
			type="Active"
			show-toggle-button=""
			level="2"
			expanded="true"
		>
			<ui5-select slot="content">
				<ui5-option>Level 2</ui5-option>
				<ui5-option>Option 2.1</ui5-option>
				<ui5-option>Option 2.3</ui5-option>
			</ui5-select>
			<ui5-tree-item-custom
				hide-selection-element=""
				type="Active"
				level="3"
			>
				<ui5-button slot="content">Level 3</ui5-button>
			</ui5-tree-item-custom>
		</ui5-tree-item-custom>
	</ui5-tree-item-custom>`,
};
//# sourceMappingURL=Tree.stories.js.map