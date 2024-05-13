import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";
import type ShellBar from "@ui5/webcomponents-fiori/dist/ShellBar.js";

export default {
    title: "Fiori/ShellBar",
    component: "ShellBar",
    argTypes,
} as Meta<ShellBar>;

const Template: UI5StoryArgs<ShellBar, StoryArgsSlots> = (
    args
) => html`<ui5-shellbar
    primary-title="${ifDefined(args.primaryTitle)}"
    secondary-title="${ifDefined(args.secondaryTitle)}"
    notifications-count="${ifDefined(args.notificationsCount)}"
    ?show-notifications="${ifDefined(args.showNotifications)}"
    ?show-search-field="${ifDefined(args.showSearchField)}"
    .accessibilityAttributes="${ifDefined(args.accessibilityAttributes)}"
>
    ${unsafeHTML(args.default)}
	${unsafeHTML(args.profile)}
    ${unsafeHTML(args.logo)}
	${unsafeHTML(args.menuItems)}
    ${unsafeHTML(args.searchField)}
	${unsafeHTML(args.startButton)}
</ui5-shellbar>`;

export const Basic = Template.bind({});
Basic.args = {
    primaryTitle: "Corporate Portal",
    secondaryTitle: "secondary title",
    assistant: `<ui5-toggle-button icon="sap-icon://da" slot="assistant"></ui5-toggle-button>`,
    profile: `<ui5-avatar slot="profile" icon="customer"></ui5-avatar>`,
    logo: `<img slot="logo" src="../assets/images/sap-logo-svg.svg" />`,
    startButton: `<ui5-button icon="nav-back" slot="startButton"></ui5-button>`,
};

export const Search = Template.bind({});
Search.args = {
    primaryTitle: "Corporate Portal",
    secondaryTitle: "secondary title",
	showNotifications: true,
	notificationsCount: "99+",
    profile: `
	<ui5-avatar slot="profile">
		<img src="../assets/images/avatars/woman_avatar_5.png" />
	</ui5-avatar>`,
    logo: `<img slot="logo" src="../assets/images/sap-logo-svg.svg" />`,
    searchField: `<ui5-input slot="searchField" placeholder="Enter service..."></ui5-input>`,
};

export const WithJoule = Template.bind({});
WithJoule.args = {
    primaryTitle: "Corporate Portal",
    secondaryTitle: "secondary title",
    profile: `
	<ui5-avatar slot="profile">
		<img src="../assets/images/avatars/woman_avatar_5.png" />
	</ui5-avatar>`,
    logo: `<img slot="logo" src="../assets/images/sap-logo-svg.svg" />`,
	assistant: `<ui5-toggle-button icon="sap-icon://da" slot="assistant"></ui5-toggle-button>`,
};

let index = 0;
export const Advanced: StoryFn = () => {
    index++;
    return html`
        <ui5-shellbar
            id="shellbar-${index}"
            primary-title="Corporate Portal"
            secondary-title="secondary title"
            notifications-count="99+"
            show-notifications=""
        >
            <ui5-avatar slot="profile">
                <img src="../assets/images/avatars/woman_avatar_5.png" />
            </ui5-avatar>
            <img slot="logo" src="../assets/images/sap-logo-svg.svg" />
            <ui5-button icon="nav-back" slot="startButton"></ui5-button>

            <ui5-input slot="searchField"></ui5-input>
            <ui5-li slot="menuItems">Application 1</ui5-li>
            <ui5-li slot="menuItems">Application 2</ui5-li>
            <ui5-li slot="menuItems">Application 3</ui5-li>
            <ui5-li slot="menuItems">Application 4</ui5-li>
            <ui5-li slot="menuItems">Application 5</ui5-li>
        </ui5-shellbar>
        <ui5-popover id="action-popover-${index}" placement="Bottom">
            <div class="action-popover-header">
                <ui5-title style="padding: 0.25rem 1rem 0rem 1rem"
                    >An Kimura</ui5-title
                >
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
            (function () {
                const shellbar = document.getElementById("shellbar-${index}");
                const actionPopover = document.getElementById(
                    "action-popover-${index}"
                );
                shellbar.addEventListener(
                    "ui5-profile-click",
                    function (event) {
                        actionPopover.opener = event.detail.targetRef;
						actionPopover.open = true;
                    }
                );
            })();
        </script>
    `;
};
