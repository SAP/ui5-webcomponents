import { html } from "lit-html";
import argTypes, { componentInfo } from "./argTypes.js";
import { DocsPage } from "../../../.storybook/docs";
const component = "ui5-wizard";
export default {
    title: "Fiori/Wizard",
    component,
    subcomponents: { 'WizardStep': 'ui5-wizard-step' },
    parameters: {
        docs: {
            page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
};
const Template = (args) => html `<div></div>`;
export const Template0 = () => html `
<h3>Wizard</h3>
	<div class="snippet">
		<ui5-wizard id="wiz">
			<ui5-wizard-step icon="product" title-text="Product type" selected="">
				<div style="display: flex; min-height: 200px; flex-direction: column;">
					<ui5-title>1. Product Type</ui5-title><br/>
					<ui5-message-strip>
						The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
					</ui5-message-strip><br/>
					<ui5-label wrapping-type="Normal">Sed fermentum, mi et tristique ullamcorper, sapien sapien faucibus sem, quis pretium nibh lorem malesuada diam. Nulla quis arcu aliquet, feugiat massa semper, volutpat diam. Nam vitae ante posuere, molestie neque sit amet, dapibus velit. Maecenas eleifend tempor lorem. Mauris vitae elementum mi, sed eleifend ligula. Nulla tempor vulputate dolor, nec dignissim quam convallis ut. Praesent vitae commodo felis, ut iaculis felis. Fusce quis eleifend sapien, eget facilisis nibh. Suspendisse est velit, scelerisque ut commodo eget, dignissim quis metus. Cras faucibus consequat gravida. Curabitur vitae quam felis. Phasellus ac leo eleifend, commodo tortor et, varius quam. Aliquam erat volutpat.
					</ui5-label>
				</div>
				<ui5-button id="toStep2" design="Emphasized">Step 2</ui5-button>
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
							<ui5-switch id="sw"></ui5-switch>
						</div>
					</div>
				</div>
				<ui5-button id="toStep3" design="Emphasized" hidden="">Step 3</ui5-button>
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
							<ui5-date-picker></ui5-date-picker>
						</div>
						<div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
							<ui5-label>Availability</ui5-label>
							<ui5-segmented-button id="segButton1">
								<ui5-toggle-button icon="employee" pressed="">In stock</ui5-toggle-button>
								<ui5-toggle-button>In depot</ui5-toggle-button>
								<ui5-toggle-button>Damaged</ui5-toggle-button>
								<ui5-toggle-button>Out of stock</ui5-toggle-button>
							</ui5-segmented-button>
						</div>
						<div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
							<ui5-label>Size</ui5-label>
							<ui5-segmented-button id="sb">
								<ui5-toggle-button icon="employee" pressed="">Small</ui5-toggle-button>
								<ui5-toggle-button>Medium</ui5-toggle-button>
								<ui5-toggle-button>Large</ui5-toggle-button>
							</ui5-segmented-button>
						</div>
					</div>
				</div>
				<ui5-button id="toStep4" design="Emphasized" hidden="">Step 4</ui5-button>
			</ui5-wizard-step>
			<ui5-wizard-step icon="lead" title-text="Pricing" disabled="">
				<div style="display: flex; flex-direction: column;">
					<ui5-title>4. Pricing</ui5-title><br/>
					<ui5-label wrapping-type="Normal">
						Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
					</ui5-label>
					<ui5-message-strip>
						The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
					</ui5-message-strip><br/>
					<div style="display: flex; flex-direction: column;">
						<div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
							<ui5-label>Price</ui5-label>
							<ui5-input placeholder="product price..."></ui5-input>
						</div>
						<div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 1rem">
							<ui5-label>Quantity</ui5-label>
							<ui5-input placeholder="product quantity..."></ui5-input>
						</div>
						<div style="display: flex; flex-direction: row; margin-top: 1rem; justify-content: flex-end; align-items: center;">
							<ui5-label>Vat included</ui5-label>
							<ui5-switch checked=""></ui5-switch>
						</div>
					</div>
				</div>
				<ui5-button id="finalize" design="Emphasized">Finalize</ui5-button>
			</ui5-wizard-step>
		</ui5-wizard>
	</div>
	<script>
		var wiz = document.getElementById("wiz");
		wiz.addEventListener("step-change", function () {
			console.log(event.detail.step);
		});
		sw.addEventListener("change", function () {
			toStep3.removeAttribute("hidden");
		});
		sb.addEventListener("selection-change", function () {
			toStep4.removeAttribute("hidden");
		});
		toStep2.addEventListener("click", function () {
			deselectAll(wiz);
			setStep(wiz, 1);
			toStep2.setAttribute("hidden", true);
		});
		toStep3.addEventListener("click", function () {
			deselectAll(wiz);
			setStep(wiz, 2);
			toStep3.setAttribute("hidden", true);
		});
		toStep4.addEventListener("click", function () {
			deselectAll(wiz);
			setStep(wiz, 3);
			toStep4.setAttribute("hidden", true);
		});
		finalize.addEventListener("click", function () {
			alert("Finalize");
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
Template0.parameters = {
    docs: {
        story: {
            // Opt-out of inline rendering
            inline: false,
        },
    }
};
//# sourceMappingURL=Wizard.stories.js.map