import { html } from "lit";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type ProductSwitch from "@ui5/webcomponents-fiori/dist/ProductSwitch.js";

const component = "ui5-product-switch";

export default {
    title: "Fiori/ProductSwitch",
    component,
    subcomponents: {'ProductSwitchItem' : 'ui5-product-switch-item'},
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<ProductSwitch>;

const Template: UI5StoryArgs<ProductSwitch, StoryArgsSlots> = (args) => html`<div></div>`;


export const Template0: StoryFn = () => html`
<h3>Basic sample</h3>
	<div class="snippet">
		<ui5-product-switch style="display:flex;">
			<ui5-product-switch-item title-text="Home" subtitle-text="Central Home" icon="home"></ui5-product-switch-item>
			<ui5-product-switch-item title-text="Analytics Cloud" subtitle-text="Analytics Cloud" icon="business-objects-experience"></ui5-product-switch-item>
			<ui5-product-switch-item title-text="Catalog" subtitle-text="Ariba" icon="contacts"></ui5-product-switch-item>
			<ui5-product-switch-item title-text="Travel &amp; Expense" subtitle-text="Concur" icon="flight"></ui5-product-switch-item>
		</ui5-product-switch>
	</div>
`;


export const Template1: StoryFn = () => html`
<h3>ProductSwitch within ShellBar</h3>
	<div class="snippet">
		<ui5-shellbar id="shellbar" primary-title="Corporate Portal" secondary-title="home" logo="../assets/images/sap-logo-svg.svg" show-product-switch="" show-co-pilot="">
		</ui5-shellbar>
		<ui5-popover id="productswitch-popover" placement-type="Bottom">
			<ui5-product-switch>
				<ui5-product-switch-item title-text="Home" subtitle-text="Central Home" icon="home"></ui5-product-switch-item>
				<ui5-product-switch-item title-text="Analytics Cloud" subtitle-text="Analytics Cloud" icon="business-objects-experience"></ui5-product-switch-item>
				<ui5-product-switch-item title-text="Catalog" subtitle-text="Ariba" icon="contacts"></ui5-product-switch-item>
				<ui5-product-switch-item title-text="Guided Buying" icon="credit-card"></ui5-product-switch-item>
				<ui5-product-switch-item title-text="Strategic Procurement" icon="cart-3"></ui5-product-switch-item>
				<ui5-product-switch-item title-text="Travel &amp; Expense" subtitle-text="Concur" icon="flight"></ui5-product-switch-item>
				<ui5-product-switch-item title-text="Vendor Management" subtitle-text="Fieldglass" icon="shipping-status"></ui5-product-switch-item>
				<ui5-product-switch-item title-text="Human Capital Management" icon="customer"></ui5-product-switch-item>
				<ui5-product-switch-item title-text="Sales Cloud" subtitle-text="Sales Cloud" icon="sales-notification"></ui5-product-switch-item>
				<ui5-product-switch-item title-text="Commerce Cloud" subtitle-text="Commerce Cloud" icon="retail-store"></ui5-product-switch-item>
				<ui5-product-switch-item title-text="Marketing Cloud" subtitle-text="Marketing Cloud" icon="marketing-campaign"></ui5-product-switch-item>
				<ui5-product-switch-item title-text="Service Cloud" icon="family-care"></ui5-product-switch-item>
				<ui5-product-switch-item title-text="Customer Data Cloud" icon="customer-briefing"></ui5-product-switch-item>
				<ui5-product-switch-item title-text="S/4HANA" icon="batch-payments"></ui5-product-switch-item>
			</ui5-product-switch>
		</ui5-popover>
		<script>
			var shellBar = document.getElementById("shellbar");
			var popover = document.getElementById("productswitch-popover");
			shellbar.addEventListener("product-switch-click", function(event) {
				if (popover.opened) {
					popover.close();
				} else {
					event.preventDefault();
					popover.showAt(event.detail.targetRef);
				}
			});
		</script>
	</div>
`;
Template1.parameters = {
	docs: {
		story: {
			// Opt-out of inline rendering
			inline: false,
		},
	}
};