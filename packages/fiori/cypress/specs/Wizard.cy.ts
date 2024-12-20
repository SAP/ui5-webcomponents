import { html } from "lit";

import "../../src/Wizard.js";
import "../../src/WizardStep.js";
import type Wizard from "../../src/Wizard.js";
import type WizardStep from "../../src/WizardStep.js";

describe("API", () => {
	beforeEach(() => {
		cy.mount(html`
			<ui5-wizard id="wizTest">
				<ui5-wizard-step id="st1" icon="sap-icon://product" selected title-text="Product type">
					<div class="wizard_test2auto">
						<ui5-title>1. Product Type</ui5-title><br>

						<ui5-message-strip>
							The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
						</ui5-message-strip><br>

						<ui5-label>Sed fermentum, mi et tristique ullamcorper, sapien sapien faucibus sem, quis pretium nibh lorem malesuada diam. Nulla quis arcu aliquet, feugiat massa semper, volutpat diam. Nam vitae ante posuere, molestie neque sit amet, dapibus velit. Maecenas eleifend tempor lorem. Mauris vitae elementum mi, sed eleifend ligula. Nulla tempor vulputate dolor, nec dignissim quam convallis ut. Praesent vitae commodo felis, ut iaculis felis. Fusce quis eleifend sapien, eget facilisis nibh. Suspendisse est velit, scelerisque ut commodo eget, dignissim quis metus. Cras faucibus consequat gravida. Curabitur vitae quam felis. Phasellus ac leo eleifend, commodo tortor et, varius quam. Aliquam erat volutpat.
						</ui5-label>

						<ui5-input id="inpStepChangeCounter"></ui5-input>
						<ui5-button id="btnOpenDialog" class="wizard_test3auto">Open Wizard Dialog</ui5-button>

						<div class="wizard_test4auto">
							<ui5-label>Configure step-switch-threshold</ui5-label>
							<ui5-segmented-button id="setting">
								<ui5-toggle-button threshold="0.3">0.5</ui5-toggle-button>
								<ui5-toggle-button threshold="0.7" pressed>default (0.7)</ui5-toggle-button>
								<ui5-toggle-button threshold="1">1</ui5-toggle-button>
							</ui5-segmented-button>
						</div>

					</div>

					<ui5-button id="toStep2" design="Emphasized">Step 2</ui5-button>
				</ui5-wizard-step>

				<ui5-wizard-step  id="st2" title-text="Product Information" disabled>
					<div class="wizard_test5auto">
						<ui5-title>2. Product Information</ui5-title><br>
						<ui5-label>
							Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
						</ui5-label>

						<ui5-input id="inpStepChangeCause" placeholder="step changed via click"></ui5-input>

						<div class="wizard_test6auto">
							<div class="wizard_test7auto">
								<ui5-label>Name</ui5-label>
								<ui5-input placeholder="product name..."></ui5-input>
							</div>

							<div class="wizard_test4auto">
								<ui5-label>Weight</ui5-label>
								<ui5-input value="3.65"></ui5-input>
							</div>

							<div class="wizard_test4auto">
								<ui5-label>Manifacturer</ui5-label>
								<ui5-select>
									<ui5-option selected>Apple</ui5-option>
									<ui5-option>Samsung</ui5-option>
									<ui5-option>Huawei</ui5-option>
								</ui5-select>
							</div>

							<div class="wizard_test4auto">
								<ui5-label>5 years guarantee included</ui5-label>
								<ui5-switch id="sw"></ui5-switch>
							</div>

							<span id="scrollMarkerSt2"></span>
							<div id="pureContent" class="wizard_test8auto">
							</div>
						</div>
					</div>

					<ui5-button id="toStep3" design="Emphasized">Step 3</ui5-button>
				</ui5-wizard-step>

				<ui5-wizard-step  id="st3" title-text="Options" disabled>
					<div class="wizard_test6auto">
						<ui5-title>3. Options</ui5-title><br>

						<ui5-label>
							Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
						</ui5-label>
						<ui5-message-strip>
							The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
						</ui5-message-strip><br>

						<div class="wizard_test6auto">
							<div class="wizard_test7auto">
								<ui5-label>Manifacture date</ui5-label>
								<ui5-date-picker></ui5-date-picker>
							</div>

							<div class="wizard_test7auto">
								<ui5-label>Availability</ui5-label>
								<ui5-segmented-button id="segButton1">
									<ui5-toggle-button icon="employee" pressed>In stock</ui5-toggle-button>
									<ui5-toggle-button>In depot</ui5-toggle-button>
									<ui5-toggle-button>Damaged</ui5-toggle-button>
									<ui5-toggle-button>Out of stock</ui5-toggle-button>
								</ui5-segmented-button>
							</div>

							<div class="wizard_test7auto">
								<ui5-label>Size</ui5-label>
								<ui5-segmented-button id="sb">
									<ui5-toggle-button icon="employee" pressed>Small</ui5-toggle-button>
									<ui5-toggle-button>Medium</ui5-toggle-button>
									<ui5-toggle-button>Largr</ui5-toggle-button>
								</ui5-segmented-button>
							</div>
						</div>
					</div>

					<span id="scrollMarkerSt3"></span>

					<ui5-button id="toStep22" design="Emphasized">Step 2</ui5-button>
					<ui5-button id="toStep4" design="Emphasized">Step 4</ui5-button>
				</ui5-wizard-step>

				<ui5-wizard-step  id="st4" title-text="Pricing" disabled>
					<div class="wizard_test6auto">
						<ui5-title>4. Pricing</ui5-title><br>
						<ui5-label>
							Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
						</ui5-label>
						<ui5-message-strip>
							The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
						</ui5-message-strip><br>

						<div class="wizard_test6auto">
							<div class="wizard_test7auto">
								<ui5-label>Price</ui5-label>
								<ui5-input placeholder="product price..."></ui5-input>
							</div>

							<div class="wizard_test7auto">
								<ui5-label>Quantity</ui5-label>
								<ui5-input placeholder="product quantity..."></ui5-input>
							</div>

							<div class="wizard_test4auto">
								<ui5-label>Vat included</ui5-label>
								<ui5-switch checked></ui5-switch>
							</div>
						</div>
					</div>

					<ui5-button id="toStep5" design="Emphasized">Step 5</ui5-button>
				</ui5-wizard-step>

				<ui5-wizard-step  id="st5" title-text="Optional step to finish the example with very long, long, long, long, long, long, long, long, long text" subtitle-text="(Optional)" disabled>
					<div class="wizard_test6auto">
						<ui5-title>5. Optional step</ui5-title><br>
						<ui5-label>
							Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
						</ui5-label>
						<ui5-message-strip>
							The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
						</ui5-message-strip><br>
					</div>
					<span id="scrollMarkerSt5"></span>

					<ui5-button id="toStep6" design="Emphasized">Step 6</ui5-button>
				</ui5-wizard-step>
				<ui5-wizard-step  id="st5" title-text="Final step to finish the example with very long, long, long, long, long, long, long, long, long text" disabled>
					<div class="wizard_test6auto">
						<ui5-title>6. Final step</ui5-title><br>
						<ui5-label>
							Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
						</ui5-label>
						<ui5-message-strip>
							The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
						</ui5-message-strip><br>
						<span id="scrollMarkerSt6"></span>
					</div>

					<ui5-button id="finalize" design="Emphasized">Finalize</ui5-button>
				</ui5-wizard-step>
			</ui5-wizard>
		`);
	});

	it("test initial state", () => {
		cy.get<WizardStep>("#st1")
			.should("have.attr", "selected");

		cy.get<Wizard>("#wizTest")
			.shadow()
			.find("[data-ui5-index='1']")
			.should("have.attr", "selected");
	});

	it("ARIA Attributes", () => {
		cy.get<Wizard>("#wizTest")
			.shadow()
			.find(".ui5-wiz-root")
			.should("have.attr", "role", "region");

		cy.get<Wizard>("#wizTest")
			.shadow()
			.find(".ui5-wiz-root")
			.should("have.attr", "aria-label", "Wizard");

		cy.get<Wizard>("#wizTest")
			.shadow()
			.find(".ui5-wiz-nav")
			.should("have.attr", "aria-label", "Wizard Progress Bar");

		cy.get<Wizard>("#wizTest")
			.shadow()
			.find(".ui5-wiz-nav-list")
			.should("have.attr", "aria-describedby", "wiz-nav-descr");

		cy.get<Wizard>("#wizTest")
			.shadow()
			.find(".ui5-wiz-nav-list")
			.should("have.attr", "role", "list");

		cy.get("#wizTest").invoke("prop", "_id").then(id => {
			cy.get<Wizard>("#wizTest")
				.shadow()
				.find(".ui5-wiz-nav-list")
				.should("have.attr", "aria-controls", `${id}-wiz-content`);
		});

		cy.get<Wizard>("#wizTest")
			.shadow()
			.find(".ui5-wiz-nav-list")
			.should("have.attr", "aria-label", "Wizard Steps");

		cy.get<Wizard>("#wizTest")
			.shadow()
			.find("[data-ui5-index='1']")
			.shadow()
			.find(".ui5-wiz-step-root")
			.should("have.attr", "aria-label", "Step 1 Product type Active");

		cy.get<Wizard>("#wizTest")
			.shadow()
			.find("[data-ui5-index='2']")
			.shadow()
			.find(".ui5-wiz-step-root")
			.should("have.attr", "aria-label", "Step 2 Product Information Inactive");

		cy.get<Wizard>("#wizTest")
			.shadow()
			.find(".ui5-wiz-content-item")
			.should("have.attr", "role", "region");

		cy.get<Wizard>("#wizTest")
			.shadow()
			.find("[data-ui5-index='1']")
			.invoke("prop", "titleText")
			.then(titleText => {
				cy.get<Wizard>("#wizTest")
					.shadow()
					.find(".ui5-wiz-content-item")
					.should("have.attr", "aria-label", `Step 1 ${titleText}`);
			});
	});

	it("Disabled step should not be interactive", () => {
		cy.get<Wizard>("#wizTest")
			.shadow()
			.find("[data-ui5-index='2']")
			.realClick();

		cy.get<Wizard>("#wizTest")
			.shadow()
			.find("[data-ui5-index='2']")
			.should("not.be.focused");
	});

	it("move to next step by API", () => {
		// enable second step
		cy.get<WizardStep>("#st2")
			.invoke("prop", "disabled", false);

		// set second step to selected
		cy.get<WizardStep>("#st2")
			.invoke("prop", "selected", true);

		cy.get<Wizard>("#wizTest")
			.shadow()
			.find("[data-ui5-index='1']")
			.should("not.have.attr", "selected");

		cy.get<Wizard>("#wizTest")
			.shadow()
			.find("[data-ui5-index='2']")
			.should("have.attr", "selected");

		cy.get<Wizard>("#wizTest")
			.shadow()
			.find("[data-ui5-index='1']")
			.shadow()
			.find(".ui5-wiz-step-root")
			.should("have.attr", "role", "listitem");

		cy.get<Wizard>("#wizTest")
			.shadow()
			.find("[data-ui5-index='2']")
			.should("not.have.attr", "disabled");
	});

	it("move to next step by click", () => {
		// enable second step
		cy.get<WizardStep>("#st2")
			.invoke("prop", "disabled", false);

		// set second step to selected
		cy.get<WizardStep>("#st2")
			.invoke("prop", "selected", true);

		// stub steo-change event
		cy.get<Wizard>("#wizTest")
			.then($wizard => {
				$wizard.get(0).addEventListener("step-change", cy.stub().as("stepChange"));
			});

		// click on first step header
		cy.get<Wizard>("#wizTest")
			.shadow()
			.find("[data-ui5-index='1']")
			.shadow()
			.find(".ui5-wiz-step-root")
			.realClick();

		cy.get("@stepChange")
			.should("have.been.calledOnce");

		// check if first step is selected
		cy.get<Wizard>("#wizTest")
			.shadow()
			.find("[data-ui5-index='1']")
			.should("have.attr", "selected");

		cy.get<WizardStep>("#st1")
			.should("have.attr", "selected");

		// first focusable element in the step should be focused
		cy.get<WizardStep>("#st1 ui5-button")
			.should("be.focused");

		cy.realPress(["Shift", "Tab"]);
		cy.realPress("Enter");

		// focus should be returned to the first focusable element in the step
		cy.get<WizardStep>("#st1 ui5-button")
			.should("be.focused");

		cy.realPress(["Shift", "Tab"]);
		cy.realPress("Space");

		// focus should be returned to the first focusable element in the step
		cy.get<WizardStep>("#st1 ui5-button")
			.should("be.focused");

		// second step should not be selected
		cy.get<Wizard>("#wizTest")
			.shadow()
			.find("[data-ui5-index='2']")
			.should("not.have.attr", "selected");

		// step change should be fired once
		cy.get("@stepChange")
			.should("have.been.calledOnce");
	});

	it("move to next step by SPACE/ENTER", () => {
		// enable second step
		cy.get<WizardStep>("#st2")
			.invoke("prop", "disabled", false);

		// click on first step
		cy.get<Wizard>("#wizTest")
			.shadow()
			.find("[data-ui5-index='1']")
			.realClick();

		// attach step-change event
		cy.get<Wizard>("#wizTest")
			.then($wizard => {
				$wizard.get(0).addEventListener("step-change", cy.stub().as("stepChange"));
			});

		cy.realPress(["Shift", "Tab"]);
		cy.realPress("ArrowRight");
		cy.realPress("Space");

		// second step should be selected
		cy.get<WizardStep>("#st2")
			.should("have.attr", "selected");

		// first step should not be selected
		cy.get<WizardStep>("#st1")
			.should("not.have.attr", "selected");

		// step change should be fired once
		cy.get("@stepChange")
			.should("have.been.calledOnce");

		// click on first step
		cy.get<Wizard>("#wizTest")
			.shadow()
			.find("[data-ui5-index='1']")
			.realClick();

		cy.realPress(["Shift", "Tab"]);
		cy.realPress("ArrowRight");
		cy.realPress("Enter");

		// second step should be selected
		cy.get<WizardStep>("#st2")
			.should("have.attr", "selected");

		// change should be called 3 times
		cy.get("@stepChange")
			.should("have.been.calledThrice");
	});
});
