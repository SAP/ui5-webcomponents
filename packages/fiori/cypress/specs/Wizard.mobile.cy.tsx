import Label from "@ui5/webcomponents/dist/Label.js"
import MessageStrip from "@ui5/webcomponents/dist/MessageStrip.js"
import Title from "@ui5/webcomponents/dist/Title.js"
import WizardStep from "../../src/WizardStep.js"
import Wizard from "../../src/Wizard.js"

describe("Mobile Behaviour",() => {
    it("tests popover visibility", () => {
        cy.mount(
			<Wizard id="wizTest2" style={{ position: "absolute", overflow: "hidden", height: "100%", width: "400px"}}>
				<WizardStep icon="sap-icon://product" title-text="Product type">
					<div style={{display: "flex",minHeight: "200px", flexDirection: "column"}}>
						<Title>1. Product Type</Title>
						<MessageStrip>
							The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
						</MessageStrip>
					</div>
				</WizardStep>

				<WizardStep title-text="Product Information" >
					<div style={{display: "flex", flexDirection: "column"}}>
						<Title>2. Product Information</Title>
						<Label>
							Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
						</Label>
					</div>
				</WizardStep>

				<WizardStep title-text="Options">
						<Title>3. Options</Title>
						<Label>
							Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
						</Label>
						<MessageStrip>
							The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
						</MessageStrip>
				</WizardStep>

				<WizardStep title-text="Pricing" selected>
						<Title>4. Pricing</Title>
						<Label>
							Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
						</Label>
						<MessageStrip>
							The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
						</MessageStrip>
				</WizardStep>
			</Wizard>
        )

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[ui5-wizard-tab]")
            .eq(2)
            .as("groupSteps");

        cy.get("@groupSteps")
            .shadow()
            .find(".ui5-wiz-step-root")
            .click();

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[ui5-responsive-popover]")
            .should("be.visible");
    });
})