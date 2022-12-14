import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/Tree",
    component: "ui5-tree",
    subcomponents: {'TreeItem' : 'ui5-tree-item'},
    argTypes,
};


export const Template0 = () => html`
<h3>Basic Tree</h3>
	<div class="snippet">
		<ui5-tree id="myTree" class="full-width">
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
			<ui5-tree-item expanded="" text="Tree 3 (no icon)">
			</ui5-tree-item>
		</ui5-tree>
	</div>
`;

export const Template1 = () => html`
<h3>Tree with multiple selection</h3>
	<div class="snippet">
		<ui5-tree id="myTree" class="full-width" mode="MultiSelect">
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
			<ui5-tree-item expanded="" text="Tree 3 (no icon)">
			</ui5-tree-item>
		</ui5-tree>
	</div>
`;

export const Template2 = () => html`
<h3>Tree with dynamic content</h3>
	<div class="snippet">
		<ui5-busy-indicator id="busy" class="full-width">
			<ui5-tree id="treeDynamic" mode="None" class="full-width">
				<ui5-tree-item text="Has pre-loaded children">
					<ui5-tree-item text="Child 1"></ui5-tree-item>
					<ui5-tree-item text="Child 2"></ui5-tree-item>
				</ui5-tree-item>
				<ui5-tree-item text="Has no children at all"></ui5-tree-item>
				<ui5-tree-item id="dynamicNode" text="Has children, but not yet loaded" has-children=""></ui5-tree-item>
			</ui5-tree>
		</ui5-busy-indicator>
	</div>
	<script>
		var busyIndicator = document.getElementById("busy");
		var dynamicTree = document.getElementById("treeDynamic");
		dynamicTree.addEventListener("item-toggle", function(event) {
			var item = event.detail.item; // get the node that is toggled
			// Only for the dynamic node, and only when it's empty
			if (item.id === "dynamicNode" && item.children.length === 0) {
				busyIndicator.active = true; // block the tree from the user
				event.preventDefault(); // do not let the toggle button switch yet
				setTimeout(function() {
					var newItem = document.createElement("ui5-tree-item"); // Fetching from db....
					newItem.text = "Node fetched from DB after 2 sec";
					item.appendChild(newItem); // add the newly fetched node to the tree
					item.toggle(); // now manually switch the toggle button
					busyIndicator.active = false; // unblock the tree
				}, 2000);
			}
		});
	</script>
`;

export const Template3 = () => html`
<h3>Tree with custom items</h3>
	<div class="snippet">
		<ui5-tree mode="MultiSelect">
			<div slot="header" class="hdr">
				<ui5-title>Tree with custom items</ui5-title>
			</div>
			<ui5-tree-item-custom expanded="true" show-toggle-button="" hide-selection-element="" type="Active" level="1">
				<ui5-button slot="content">Level 1</ui5-button>
				<ui5-tree-item-custom type="Active" show-toggle-button="" level="2" expanded="true">
					<ui5-select slot="content">
						<ui5-option>Level 2</ui5-option>
						<ui5-option>Option 2.1</ui5-option>
						<ui5-option>Option 2.3</ui5-option>
					</ui5-select>
					<ui5-tree-item-custom hide-selection-element="" type="Active" level="3">
						<ui5-button slot="content">Level 3</ui5-button>
					</ui5-tree-item-custom>
				</ui5-tree-item-custom>
			</ui5-tree-item-custom>
		</ui5-tree>
	</div>
`;