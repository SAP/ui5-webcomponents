import { html } from "lit";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type Wizard from "@ui5/webcomponents-fiori/dist/Wizard.js";

const component = "ui5-wizard";

export default {
    title: "Fiori/Wizard",
    component,
    subcomponents: {
		WizardStep : 'ui5-wizard-step',
	},
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<Wizard>;

let index = 0;

export const WizardOverview: StoryFn = () => html`
	<ui5-wizard id="wiz-${++index}">
		<ui5-wizard-step icon="product" title-text="Product type" selected="">
			<div style="display: flex; min-height: 200px; flex-direction: column;">
				<ui5-title>1. Product Type</ui5-title><br/>
				<ui5-message-strip>
					The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
				</ui5-message-strip><br/>
				<ui5-label wrapping-type="Normal">Sed fermentum, mi et tristique ullamcorper, sapien sapien faucibus sem, quis pretium nibh lorem malesuada diam. Nulla quis arcu aliquet, feugiat massa semper, volutpat diam. Nam vitae ante posuere, molestie neque sit amet, dapibus velit. Maecenas eleifend tempor lorem. Mauris vitae elementum mi, sed eleifend ligula. Nulla tempor vulputate dolor, nec dignissim quam convallis ut. Praesent vitae commodo felis, ut iaculis felis. Fusce quis eleifend sapien, eget facilisis nibh. Suspendisse est velit, scelerisque ut commodo eget, dignissim quis metus. Cras faucibus consequat gravida. Curabitur vitae quam felis. Phasellus ac leo eleifend, commodo tortor et, varius quam. Aliquam erat volutpat.
				</ui5-label>
			</div>
			<ui5-button id="wiz-${index}-toStep2" design="Emphasized">Step 2</ui5-button>
		</ui5-wizard-step>
		<ui5-wizard-step icon="hint" title-text="Product Information" disabled="">
			<div style="display: flex;flex-direction: column">
				<ui5-title>2. Product Information</ui5-title><br/>
				<ui5-label wrapping-type="Normal">
					Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
				</ui5-label>
				<div style="display: flex; flex-direction: column;">
					<div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
						<ui5-label>Name</ui5-label>
						<ui5-input placeholder="product name..."></ui5-input>
					</div>
					<div style="display: flex; flex-direction: row; margin-top: 1rem; justify-content: flex-end; align-items: center;">
						<ui5-label>Weight</ui5-label>
						<ui5-input value="3.65"></ui5-input>
					</div>
					<div style="display: flex; flex-direction: row; margin-top: 1rem; justify-content: flex-end; align-items: center;">
						<ui5-label>Manifacturer</ui5-label>
						<ui5-select>
							<ui5-option selected="">Apple</ui5-option>
							<ui5-option>Samsung</ui5-option>
							<ui5-option>Huawei</ui5-option>
						</ui5-select>
					</div>
					<div style="display: flex; flex-direction: row; margin-top: 1rem; justify-content: flex-end; align-items: center;">
						<ui5-label>5 years guarantee included</ui5-label>
						<ui5-switch id="wiz-${index}-sw"></ui5-switch>
					</div>
				</div>
			</div>
			<ui5-button id="wiz-${index}-toStep3" design="Emphasized" hidden="">Step 3</ui5-button>
		</ui5-wizard-step>
		<ui5-wizard-step icon="action-settings" title-text="Options" disabled="">
			<div style="display: flex; flex-direction: column;">
				<ui5-title>3. Options</ui5-title><br/>
				<ui5-label wrapping-type="Normal">
					Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
				</ui5-label>
				<ui5-message-strip>
					The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
				</ui5-message-strip><br/>
				<div style="display: flex; flex-direction: column;">
					<div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
						<ui5-label>Manifacture date</ui5-label>
						<ui5-date-picker id="wiz-${index}-dp"></ui5-date-picker>
					</div>
				</div>
			</div>
			<ui5-button id="wiz-${index}-finalize" hidden="" design="Emphasized">Finalize</ui5-button>
		</ui5-wizard-step>
	</ui5-wizard>
	<script>
		const wizard${index}Wiz = document.getElementById("wiz-${index}");
		const wizard${index}Sw = document.getElementById("wiz-${index}-sw");
		const wizard${index}Dp = document.getElementById("wiz-${index}-dp");
		const wizard${index}ToStep2 = document.getElementById("wiz-${index}-toStep2");
		const wizard${index}ToStep3 = document.getElementById("wiz-${index}-toStep3");
		const wizard${index}Finalize = document.getElementById("wiz-${index}-finalize");

		wizard${index}Wiz.addEventListener("step-change", function () {
			console.log(event.detail.step);
		});
		wizard${index}Sw.addEventListener("change", function () {
			wizard${index}ToStep3.removeAttribute("hidden");
		});
		wizard${index}Dp.addEventListener("change", function () {
			wizard${index}Finalize.removeAttribute("hidden");
		});

		wizard${index}ToStep2.addEventListener("click", function () {
			deselectAll(wizard${index}Wiz);
			setStep(wizard${index}Wiz, 1);
			wizard${index}ToStep2.setAttribute("hidden", true);
		});
		wizard${index}ToStep3.addEventListener("click", function () {
			deselectAll(wizard${index}Wiz);
			setStep(wizard${index}Wiz, 2);
			wizard${index}ToStep3.setAttribute("hidden", true);
		});
		wizard${index}Finalize.addEventListener("click", function () {
			alert("Done!");
		});

		function deselectAll(wizard) {
			Array.from(wizard.children).forEach(function(step) {
				step.selected = false;
			});
		}
		function setStep(wizard, idx) {
			var step = getStep(wizard, idx);
			step.selected = true;
			step.disabled = false;
		}
		function getStep(wizard, idx) {
			return Array.from(wizard.children)[idx];
		}
	</script>
`;
