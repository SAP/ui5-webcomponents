import type { StoryFn } from "@storybook/web-components";

import { html } from "lit-html";
import "@ui5/webcomponents/dist/TabContainer.js";
import "@ui5/webcomponents/dist/Tab.js";

import "@ui5/webcomponents-icons/dist/hint.js";
import "@ui5/webcomponents-icons/dist/attachment.js";
import "@ui5/webcomponents-icons/dist/approvals.js";
import "@ui5/webcomponents-icons/dist/product.js";
import "@ui5/webcomponents-icons/dist/notes.js";

const Template: StoryFn = (args) => {
    if (args["Versions"] === "Text only") {
        return html`
            <ui5-tabcontainer
                tabs-overflow-mode="${args["Overflow mode"]}"
                class="full-width"
                tab-layout="Inline"
                fixed
            >
                <ui5-tab design="${args["Value state"]}" text="Info" selected>
                    <ui5-label>This is some additional information</ui5-label>
                </ui5-tab>
                <ui5-tab
                    design="${args["Value state"]}"
                    text="Attachments"
                    additional-text="16"
                >
                    <ui5-label>Content Attachments</ui5-label>
                </ui5-tab>
                <ui5-tab
                    design="${args["Value state"]}"
                    text="Approvals"
                    aditional-text="24"
                >
                    <ui5-label>Content Approvals</ui5-label>
                </ui5-tab>
                <ui5-tab
                    design="${args["Value state"]}"
                    text="Products"
                    aditional-text="189"
                >
                    <ui5-label>Content Products</ui5-label>
                </ui5-tab>
                <ui5-tab
                    design="${args["Value state"]}"
                    text="Notes"
                    additonal-text="34"
                >
                    <ui5-label>Content Notes</ui5-label>
                </ui5-tab>
            </ui5-tabcontainer>
        `;
    } else if (args["Versions"] === "Icon only") {
        return html`
            <ui5-tabcontainer
                tabs-overflow-mode="${args["Overflow mode"]}"
                class="full-width"
                fixed
            >
                <ui5-tab
                    design="${args["Value state"]}"
                    ?disabled="${args["Disabled"]}"
                    icon="hint"
                    additional-text="3"
                    selected
                >
                    <ui5-label>This is some additional information</ui5-label>
                </ui5-tab>
                <ui5-tab
                    design="${args["Value state"]}"
                    ?disabled="${args["Disabled"]}"
                    icon="attachment"
                    additional-text="16"
                    style="--_ui5_icon_transform_scale: .5 !important"
                >
                    <ui5-label>Content Attachments</ui5-label>
                </ui5-tab>
                <ui5-tab
                    design="${args["Value state"]}"
                    ?disabled="${args["Disabled"]}"
                    icon="approvals"
                    additional-text="24"
                >
                    <ui5-label>Content Approvals</ui5-label>
                </ui5-tab>
                <ui5-tab
                    design="${args["Value state"]}"
                    ?disabled="${args["Disabled"]}"
                    icon="product"
                    additional-text="189"
                >
                    <ui5-label>Content Products</ui5-label>
                </ui5-tab>
                <ui5-tab
                    design="${args["Value state"]}"
                    ?disabled="${args["Disabled"]}"
                    icon="notes"
                    additional-text="34"
                >
                    <ui5-label>Content Notes</ui5-label>
                </ui5-tab>
            </ui5-tabcontainer>
        `;
    } else if (args["Versions"] === "Full blown Tabs") {
        return html`
            <ui5-tabcontainer
                tabs-overflow-mode="${args["Overflow mode"]}"
                class="full-width"
                fixed
            >
                <ui5-tab
                    design="${args["Value state"]}"
                    ?disabled="${args["Disabled"]}"
                    icon="hint"
                    text="Info"
                    additional-text="3"
                    selected
                >
                    <ui5-label>This is some additional information</ui5-label>
                </ui5-tab>
                <ui5-tab
                    design="${args["Value state"]}"
                    ?disabled="${args["Disabled"]}"
                    icon="attachment"
                    text="Attachments"
                    additional-text="16"
                >
                    <ui5-label>Content Attachments</ui5-label>
                </ui5-tab>
                <ui5-tab
                    design="${args["Value state"]}"
                    ?disabled="${args["Disabled"]}"
                    icon="approvals"
                    text="Approvals"
                    additional-text="24"
                >
                    <ui5-label>Content Approvals</ui5-label>
                </ui5-tab>
                <ui5-tab
                    design="${args["Value state"]}"
                    ?disabled="${args["Disabled"]}"
                    icon="product"
                    text="Products"
                    additional-text="189"
                >
                    <ui5-label>Content Products</ui5-label>
                </ui5-tab>
                <ui5-tab
                    design="${args["Value state"]}"
                    ?disabled="${args["Disabled"]}"
                    icon="notes"
                    text="Notes"
                    additional-text="34"
                >
                    <ui5-label>Content Notes</ui5-label>
                </ui5-tab>
            </ui5-tabcontainer>
        `;
    } else if (args["Versions"] === "Tabs with Subtabs") {
        return html`
            <ui5-tabcontainer
                tabs-overflow-mode="${args["Overflow mode"]}"
                fixed
            >
                <ui5-tab
                    design="${args["Value state"]}"
                    ?disabled="${args["Disabled"]}"
                    text="Notes"
                >
                    <ui5-label>Notes go here ...</ui5-label>
                </ui5-tab>
                <ui5-tab
                    design="${args["Value state"]}"
                    ?disabled="${args["Disabled"]}"
                    text="Products"
                >
                    <ui5-label>Products go here ...</ui5-label>
                    <ui5-tab
                        design="${args["Value state"]}"
                        ?disabled="${args["Disabled"]}"
                        slot="subTabs"
                        text="Computers"
                    >
                        <ui5-label>Computers go here ...</ui5-label>
                        <ui5-tab
                            design="${args["Value state"]}"
                            ?disabled="${args["Disabled"]}"
                            slot="subTabs"
                            text="Laptops"
                        >
                            <ui5-label>Laptops go here ...</ui5-label>
                        </ui5-tab>
                        <ui5-tab
                            design="${args["Value state"]}"
                            ?disabled="${args["Disabled"]}"
                            slot="subTabs"
                            text="Desktops"
                        >
                            <ui5-tab
                                design="${args["Value state"]}"
                                ?disabled="${args["Disabled"]}"
                                slot="subTabs"
                                text="Work Stations"
                            >
                                <ui5-label>Work Stations go here ...</ui5-label>
                            </ui5-tab>
                            <ui5-tab
                                design="${args["Value state"]}"
                                ?disabled="${args["Disabled"]}"
                                slot="subTabs"
                                text="Game Stations"
                            >
                                <ui5-label>Game Stations go here ...</ui5-label>
                            </ui5-tab>
                            <ui5-label>Desktops go here ...</ui5-label>
                        </ui5-tab>
                    </ui5-tab>
                    <ui5-tab
                        design="${args["Value state"]}"
                        ?disabled="${args["Disabled"]}"
                        text="Phones"
                        slot="subTabs"
                    >
                        <ui5-tab
                            design="${args["Value state"]}"
                            ?disabled="${args["Disabled"]}"
                            text="Smartphones"
                            slot="subTabs"
                        >
                            <ui5-label>Smartphones go here ...</ui5-label>
                        </ui5-tab>
                        <ui5-tab
                            design="${args["Value state"]}"
                            ?disabled="${args["Disabled"]}"
                            text="Tablets"
                            slot="subTabs"
                        >
                            <ui5-label>Tablets go here ...</ui5-label>
                        </ui5-tab>
                        <ui5-label>Phones go here ...</ui5-label>
                    </ui5-tab>
                </ui5-tab>
                <ui5-tab
                    design="${args["Value state"]}"
                    ?disabled="${args["Disabled"]}"
                    text="Orders"
                >
                    <ui5-label>Orders go here ...</ui5-label>
                    <ui5-tab
                        design="${args["Value state"]}"
                        ?disabled="${args["Disabled"]}"
                        slot="subTabs"
                        text="Attachments"
                    >
                        <ui5-label>Order attachments go here ...</ui5-label>
                    </ui5-tab>
                    <ui5-tab
                        design="${args["Value state"]}"
                        ?disabled="${args["Disabled"]}"
                        slot="subTabs"
                        text="Notes"
                    >
                        <ui5-label>Order Notes go here ...</ui5-label>
                    </ui5-tab>
                </ui5-tab>
            </ui5-tabcontainer>
        `;
    } else {
        return html`Error`;
    }
};

export const Overview = Template.bind({});
Overview.argTypes = {
    Versions: {
        control: { type: "select" },
        options: [
            "Text only",
            "Icon only",
            "Full blown Tabs",
            "Tabs with Subtabs",
        ],
        defaultValue: ["Text only"],
    },
    "Overflow mode": {
        control: { type: "select" },
        options: ["End", "StartAndEnd"],
        defaultValue: ["End"],
    },
    "Value state": {
        control: { type: "select" },
        options: ["Default", "Neutral", "Positive", "Critical", "Negative"],
        defaultValue: ["Default"],
    },
};
Overview.args = {
    "Value state": "Default",
    Versions: "Text only",
    "Overflow mode": "End",
    Disabled: false,
};
Overview.parameters = {
    controls: {
        include: ["Value state", "Versions", "Overflow mode", "Disabled"],
    },
};
