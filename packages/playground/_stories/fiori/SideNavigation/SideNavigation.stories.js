import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/SideNavigation",
    component: "ui5-side-navigation",
    subcomponents: {'SideNavigationItem' : 'ui5-side-navigation-item', 'SideNavigationSubItem' : 'ui5-side-navigation-sub-item'},
    argTypes,
};


export const Template0 = () => html`
<style>
		.ui5-side-nav {
			height: 93%;
		}
		ui5-shellbar::part(root) {
			padding-left: .5rem;
		}
	</style>
	<h3>Side Navigation in Application</h3>
	<div class="snippet" style="height: 40rem;">
		<ui5-shellbar primary-title="UI5 Web Components" secondary-title="The Best Run SAP" show-co-pilot="">
			<ui5-button icon="menu" slot="startButton" id="startButton"></ui5-button>
		</ui5-shellbar>
		<ui5-side-navigation class="ui5-side-nav">
			<ui5-side-navigation-item text="Home" icon="home"></ui5-side-navigation-item>
			<ui5-side-navigation-item text="People" expanded="" icon="group">
				<ui5-side-navigation-sub-item text="From My Team"></ui5-side-navigation-sub-item>
				<ui5-side-navigation-sub-item text="From Other Teams"></ui5-side-navigation-sub-item>
			</ui5-side-navigation-item>
			<ui5-side-navigation-item text="Locations" icon="locate-me" selected=""></ui5-side-navigation-item>
			<ui5-side-navigation-item text="Events" icon="calendar">
				<ui5-side-navigation-sub-item text="Local"></ui5-side-navigation-sub-item>
				<ui5-side-navigation-sub-item text="Others"></ui5-side-navigation-sub-item>
			</ui5-side-navigation-item>
			<ui5-side-navigation-item slot="fixedItems" text="Useful Links" icon="chain-link"></ui5-side-navigation-item>
			<ui5-side-navigation-item slot="fixedItems" text="History" icon="history"></ui5-side-navigation-item>
		</ui5-side-navigation>
		<script>
			var sideNavigation = document.querySelector("ui5-side-navigation");
			document.querySelector("#startButton").addEventListener("click", function(event) {
				sideNavigation.collapsed = !sideNavigation.collapsed;
			});
		</script>
	</div>
`;