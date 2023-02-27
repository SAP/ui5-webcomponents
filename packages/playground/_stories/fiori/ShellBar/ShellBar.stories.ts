import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type ShellBar from "@ui5/webcomponents-fiori/dist/ShellBar.js";

const component = "ui5-shellbar";

export default {
    title: "Fiori/ShellBar",
    component,
    subcomponents: { ShellBarItem: "ui5-shellbar-item" },
    parameters: {
        docs: {
            page: DocsPage({ ...componentInfo, component }),
        },
    },
    argTypes,
} as Meta<ShellBar>;

const Template: UI5StoryArgs<ShellBar, StoryArgsSlots> = (
    args
) => html`<ui5-shellbar
    primary-title="${ifDefined(args.primaryTitle)}"
    secondary-title="${ifDefined(args.secondaryTitle)}"
    notifications-count="${ifDefined(args.notificationsCount)}"
    ?show-notifications="${ifDefined(args.showNotifications)}"
    ?show-product-switch="${ifDefined(args.showProductSwitch)}"
    ?show-co-pilot="${ifDefined(args.showCoPilot)}"
    ?show-search-field="${ifDefined(args.showSearchField)}"
    .accessibilityRoles="${ifDefined(args.accessibilityRoles)}"
    .accessibilityTexts="${ifDefined(args.accessibilityTexts)}"
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
    profile: `<ui5-avatar slot="profile" icon="customer"></ui5-avatar>`,
    logo: `<img slot="logo" src="../assets/images/sap-logo-svg.svg" />`,
    startButton: `<ui5-button icon="nav-back" slot="startButton"></ui5-button>`,
};

export const SearchAndNotifications = Template.bind({});
SearchAndNotifications.args = {
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

export const WithCoPilot = Template.bind({});
WithCoPilot.args = {
    primaryTitle: "Corporate Portal",
    secondaryTitle: "secondary title",
    showCoPilot: true,
    profile: `
	<ui5-avatar slot="profile">
		<img src="../assets/images/avatars/woman_avatar_5.png" />
	</ui5-avatar>`,
    logo: `<img slot="logo" src="../assets/images/sap-logo-svg.svg" />`,
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
            show-product-switch=""
            show-co-pilot=""
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
        <ui5-popover id="action-popover-${index}" placement-type="Bottom">
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
                        actionPopover.showAt(event.detail.targetRef);
                    }
                );
            })();
        </script>
    `;
};
