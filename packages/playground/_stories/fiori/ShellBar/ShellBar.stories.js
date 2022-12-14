import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/ShellBar",
    component: "ui5-shellbar",
    subcomponents: {'ShellBarItem' : 'ui5-shellbar-item'},
    argTypes,
};


export const Template0 = () => html`
<h3>ShellBar</h3>
	<div class="snippet">
	<ui5-shellbar id="shellbar" primary-title="Corporate Portal" secondary-title="secondary title" notifications-count="99+" show-notifications="" show-product-switch="" show-co-pilot="">
		<ui5-avatar slot="profile">
			<img src="../../../assets/images/avatars/woman_avatar_5.png">
		</ui5-avatar>
		<img slot="logo" src="../../../assets/images/sap-logo-svg.svg">
		<ui5-button icon="nav-back" slot="startButton"></ui5-button>
		<ui5-shellbar-item id="disc" icon="disconnected" text="Disconnect"></ui5-shellbar-item>
		<ui5-shellbar-item id="call" icon="incoming-call" text="Incoming Calls" count="4"></ui5-shellbar-item>
		<ui5-input slot="searchField"></ui5-input>
		<ui5-li slot="menuItems">Application 1</ui5-li>
		<ui5-li slot="menuItems">Application 2</ui5-li>
		<ui5-li slot="menuItems">Application 3</ui5-li>
		<ui5-li slot="menuItems">Application 4</ui5-li>
		<ui5-li slot="menuItems">Application 5</ui5-li>
	</ui5-shellbar>
	<ui5-popover id="action-popover" placement-type="Bottom">
		<div class="action-popover-header">
			<ui5-title style="padding: 0.25rem 1rem 0rem 1rem">An Kimura</ui5-title>
		</div>
		<div class="action-popover-content" style="margin-top: 1rem;">
			<ui5-list separators="None">
				<ui5-li icon="sys-find">App Finder</ui5-li>
				<ui5-li icon="settings">Settings</ui5-li>
				<ui5-li icon="edit">Edit Home Page</ui5-li>
				<ui5-li icon="sys-help">Help</ui5-li>
				<ui5-li icon="log">Sign out</ui5-li>
			</ui5-list>
		</div>
	</ui5-popover>
	<script>
		shellbar.addEventListener("profile-click", function(event) {
			window["action-popover"].showAt(event.detail.targetRef);
		});
	</script>
	</div>
`;

export const Template1 = () => html`
<h3>Basic ShellBar</h3>
	<div class="snippet">
		<ui5-shellbar primary-title="Corporate Portal" secondary-title="secondary title">
			<ui5-avatar slot="profile" icon="customer"></ui5-avatar>
			<img slot="logo" src="../../../assets/images/sap-logo-svg.svg">
			<ui5-button icon="nav-back" slot="startButton"></ui5-button>
		</ui5-shellbar>
	</div>
`;

export const Template2 = () => html`
<h3>ShellBar with search and notifications</h3>
	<div class="snippet">
		<ui5-shellbar primary-title="Corporate Portal" secondary-title="secondary title" show-notifications="" notifications-count="22">
			<ui5-avatar slot="profile">
				<img src="../../../assets/images/avatars/woman_avatar_5.png">
			</ui5-avatar>
			<img slot="logo" src="../../../assets/images/sap-logo-svg.svg">
			<ui5-input slot="searchField" placeholder="Enter service..."></ui5-input>
		</ui5-shellbar>
	</div>
`;

export const Template3 = () => html`
<h3>ShellBar with product switch and CoPilot</h3>
	<div class="snippet">
		<ui5-shellbar primary-title="Corporate Portal" secondary-title="secondary title" show-co-pilot="" show-product-switch="" show-notifications="" notifications-count="22">
			<img slot="logo" src="../../../assets/images/sap-logo-svg.svg">
			<ui5-avatar slot="profile">
				<img src="../../../assets/images/avatars/woman_avatar_5.png">
			</ui5-avatar>
		</ui5-shellbar>
	</div>
`;