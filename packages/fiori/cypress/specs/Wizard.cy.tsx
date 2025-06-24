import Wizard from "../../src/Wizard.js";
import WizardStep from "../../src/WizardStep.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import MessageStrip from "@ui5/webcomponents/dist/MessageStrip.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Switch from "@ui5/webcomponents/dist/Switch.js";
import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import Bar from "@ui5/webcomponents/dist/Bar.js";

function goToWizardStep(wizardId: string, stepIndex: number) {
    cy.window().then((win) => {
        const wizard = win.document.getElementById(wizardId);
        const steps = wizard.querySelectorAll("ui5-wizard-step");

        steps.forEach((step: any) => (step.selected = false));
        (steps[stepIndex] as WizardStep).disabled = false;
        (steps[stepIndex] as WizardStep).selected = true;
    });
}

describe("Wizard general interaction", () => {

    it("test initial state", () => {
        cy.mount(
            <Wizard>
                <WizardStep icon="sap-icon://product" selected titleText="Product type"/>
            </Wizard>
        )

        cy.get<WizardStep>("[ui5-wizard-step]")
            .should("have.attr", "selected");

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='1']")
            .should("have.attr", "selected");
    });

    it("ARIA Attributes", () => {
        cy.mount(
            <Wizard>
                <WizardStep icon="sap-icon://product" selected titleText="Product type"/>
                <WizardStep titleText="Product Information" disabled/>
            </Wizard>
        )
        cy.get("[ui5-wizard]")
            .shadow()
            .find(".ui5-wiz-root")
            .as("wizRoot");

        cy.get("[ui5-wizard]")
            .shadow()
            .find(".ui5-wiz-nav")
            .as("wizNav");

        cy.get("[ui5-wizard]")
            .shadow()
            .find(".ui5-wiz-nav-list")
            .as("wizNavList");

        cy.get("[ui5-wizard]")
            .shadow()
            .find(".ui5-wiz-content-item")
            .as("wizContentItem");

        const wizRootText = "Wizard";
        const wizNavText = "Wizard Progress Bar";
        const wizListDescribedbyId = "wiz-nav-descr";
        const wizListText = "Wizard Steps";

        const step1Text = "Step 1 Product type Active";
        const step2Text = "Step 2 Product Information Inactive";

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='1']")
            .shadow()
            .find(".ui5-wiz-step-root")
            .as("step1InHeaderRoot");

         cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='2']")
            .shadow()
            .find(".ui5-wiz-step-root")
            .as("step2InHeaderRoot");

        cy.get("@wizRoot")
            .should("have.attr", "role", "region");

        cy.get("@wizRoot")
            .should("have.attr", "aria-label", wizRootText);

        cy.get("@wizNav")
            .should("have.attr", "aria-label", wizNavText);

        cy.get("@wizNavList")
            .should("have.attr", "aria-describedby", wizListDescribedbyId);

        cy.get("@wizNavList")
            .should("have.attr", "role", "list");

        cy.get("@wizNavList")
            .should("have.attr", "aria-label", wizListText);

        cy.get("@step1InHeaderRoot")
            .should("have.attr", "aria-label", step1Text);

        cy.get("@step2InHeaderRoot")
            .should("have.attr", "aria-label", step2Text);

        cy.get("@wizContentItem")
            .should("have.attr", "role", "region");
    });

    it("Disabled step should not be interactive", () => {
        cy.mount(
            <Wizard>
                <WizardStep icon="sap-icon://product" selected titleText="Product type"/>
                <WizardStep titleText="Product Information" disabled/>
            </Wizard>
        )
        cy.get("[ui5-wizard-step]")
            .eq(1)
            .as("disabledStep");

        cy.get("@disabledStep")
            .click({ force: true });

        cy.get("@disabledStep")
            .should("not.have.attr", "selected");

        cy.get("[ui5-wizard-step]")
            .eq(0)
            .should("have.attr", "selected");
    });

    it("move to next step by API", () => {
        cy.mount(
            <Wizard id="asd">
                <WizardStep icon="sap-icon://product" selected titleText="Product type">
                    <Button id="toStep2" design="Emphasized">Step 2</Button>
                </WizardStep>
                <WizardStep titleText="Product Information" disabled/>
            </Wizard>
        );

        cy.get("[ui5-button]")
            .then($button => {
                $button[0].addEventListener("click", () => {
                    goToWizardStep("asd", 1);
                });
            });

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='1']")
            .shadow()
            .find(".ui5-wiz-step-root")
            .as("step1InHeaderRoot");

        cy.get("[ui5-button")
            .realClick();

        cy.get("[ui5-wizard-step")
            .eq(0)
            .should("not.have.attr", "selected");

        cy.get("[ui5-wizard-step")
            .eq(0)
            .should("not.have.attr", "selected");

        cy.get("@step1InHeaderRoot")
            .should("have.attr", "role", "listitem");

        cy.get("[ui5-wizard-step")
            .eq(1)
            .should("have.attr", "selected");

         cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='2']")
            .should("have.attr", "selected");

         cy.get("[ui5-wizard-step")
            .eq(1)
            .should("not.have.attr", "disabled");

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='2']")
            .should("not.have.attr", "disabled");
    });

    it("move to next step by click", () => {
        cy.mount(
            <Wizard id="asd">
                <WizardStep icon="sap-icon://product" selected titleText="Product type">
                    <MessageStrip>
                        The Wizard control is supposed to break down large tasks.
                    </MessageStrip>
                    <Button id="toStep2" design="Emphasized">Step 2</Button>
                </WizardStep>
                <WizardStep titleText="Product Information" disabled/>
            </Wizard>
        );

         cy.get("[ui5-button]")
            .then($button => {
                $button[0].addEventListener("click", () => {
                    goToWizardStep("asd", 1);
                });
            });

        cy.get("[ui5-wizard-step]")
            .eq(0)
            .find("[ui5-message-strip]")
            .as("messageStripInStep1");

        cy.get("@messageStripInStep1")
            .shadow()
            .find("ui5-button")
            .as("firstFocusableElement");

        cy.get("[ui5-wizard]")
            .then(wizard => {
                wizard.get(0).addEventListener("ui5-step-change", cy.stub().as("stepChange"));
            });

        cy.get("[ui5-button]")
            .realClick();

         cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='1']")
            .realClick();

        cy.get("[ui5-wizard-step]")
            .eq(0)
            .should("have.attr", "selected");

         cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='1']")
            .should("have.attr", "selected");

        cy.get("[ui5-wizard-step]")
            .eq(1)
            .should("not.have.attr", "selected");

         cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='2']")
            .should("not.have.attr", "selected");

        cy.get("@firstFocusableElement")
            .should("be.focused");

         cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='1']")
            .realPress(["Shift", "Tab"]);

         cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='2']")
            .realPress("Space");

        cy.get("@firstFocusableElement")
            .should("be.focused");

        cy.get("@stepChange")
            .should("have.been.calledOnce");
    });

    it("move to next step by SPACE/ENTER", () => {
        cy.mount(
             <Wizard id="asd">
                <WizardStep icon="sap-icon://product" selected titleText="Product type">
                    <MessageStrip>
                        The Wizard control is supposed to break down large tasks.
                    </MessageStrip>
                    <Button id="toStep2" design="Emphasized">Step 2</Button>
                </WizardStep>
                <WizardStep titleText="Product Information" disabled/>
            </Wizard>
        )
        cy.get("[ui5-button]")
            .then($button => {
                $button[0].addEventListener("click", () => {
                    goToWizardStep("asd", 1);
                });
            });
        cy.get("[ui5-wizard]")
            .then(wizard => {
                wizard.get(0).addEventListener("ui5-step-change", cy.stub().as("stepChange"));
            });

        cy.get("[ui5-button]")
            .realClick();

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='1']")
            .realClick();

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='1']")
            .realPress(["Shift", "Tab"]);

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='1']")
            .realPress("ArrowRight");

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='2']")
            .realPress("Space");

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='2']")
            .should("have.attr", "selected");

        cy.get("[ui5-wizard-step]")
            .eq(1)
            .should("have.attr", "selected");

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='1']")
            .should("not.have.attr", "selected");

        cy.get("[ui5-wizard-step]")
            .eq(0)
            .should("not.have.attr", "selected");

        cy.get("@stepChange")
            .should("have.been.calledTwice");

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='1']")
            .realClick();

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='1']")
            .should("have.attr", "selected");

        cy.get("[ui5-wizard-step]")
            .eq(0)
            .should("have.attr", "selected");

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='1']")
            .realPress(["Shift", "Tab"]);

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='1']")
            .realPress("ArrowRight");

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='2']")
            .realPress("Enter");

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='2']")
            .should("have.attr", "selected");

        cy.get("[ui5-wizard-step]")
            .eq(1)
            .should("have.attr", "selected");

        cy.get("@stepChange")
            .should("have.callCount", 4);
    });

    it("move to next step by scroll", () => {
        cy.mount(
            <Wizard id="asd" style={{ position: "absolute", overflow: "hidden", height: "100%", width: "100%" }}>
                <WizardStep icon="sap-icon://product" selected titleText="Product type">
                    <MessageStrip>
                        The Wizard control is supposed to break down large tasks.
                    </MessageStrip>
                    <div style={{height: "15rem"}}></div>
                    <Button id="toStep2" design="Emphasized">Step 2</Button>
                </WizardStep>
                <WizardStep titleText="Product Information" disabled/>
            </Wizard>
        )
        cy.get("[ui5-wizard]")
            .then(wizard => {
                wizard.get(0).addEventListener("ui5-step-change", cy.stub().as("stepChange"));
            });

        cy.get("[ui5-button]")
            .then($button => {
                $button[0].addEventListener("click", () => {
                    goToWizardStep("asd", 1);
                });
            });

        cy.get("[ui5-button]")
            .realClick();

        cy.get("[ui5-wizard]")
            .shadow()
            .find(".ui5-wiz-content")
            .scrollTo("top");

        cy.get("@stepChange")
            .should("have.callCount", 1);
    });

    it("tests dynamically increase step size and move to next step", () => {
        cy.mount(
             <Wizard id="asd" style={{ position: "absolute", overflow: "hidden", height: "100%", width: "100%" }}>
                <WizardStep icon="sap-icon://product" selected titleText="Product type">
                    <div style={{height: "15rem"}}></div>
                    <Button id="toStep2" design="Emphasized">Step 2</Button>
                    <Switch id="sw" />
                     <div id="pureContent" style={{ height: "1800px", backgroundColor: "red", display: "none" }}></div>
                </WizardStep>
                <WizardStep titleText="Product Information" disabled>
                </WizardStep>
            </Wizard>
        )

        cy.get("[ui5-button]")
            .then($button => {
                $button[0].addEventListener("click", () => {
                    goToWizardStep("asd", 1);
                });
            });

        cy.get("[ui5-switch]").then($switch => {
            $switch[0].addEventListener("ui5-change", () => {
                const content = document.getElementById("pureContent");
                console.log(content);

                if (content.style.display = "none") {
                    content.style.display = "block";
                }
            });
        });

        cy.get("[ui5-button]")
            .realClick();

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='1']")
            .realClick();

        cy.get("#sw")
            .click();

        cy.get("[ui5-wizard]")
            .shadow()
            .find(".ui5-wiz-content")
            .scrollTo("bottom");

        cy.get("[ui5-wizard-step]")
            .eq(1)
            .should("have.attr", "selected");

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='2']")
            .should("have.attr", "selected");
    });

     it("Tests long text on wizard step to be truncated correctly", () => {
        cy.mount(
            <Wizard>
                <WizardStep titleText="Pricing" disabled/>
                <WizardStep
                        titleText="Optional step to finish the example with very long, long, long, long, long, long, long, long, long text" subtitleText="(Optional)" disabled/>
            </Wizard>
        );

        let step1ScrollHeight: number;
        let step2ScrollHeight: number;

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='1']")
             .shadow()
             .find(".ui5-wiz-step-title-text")
             .invoke("prop", "scrollHeight")
             .then((scrollHeight) => {
                 step1ScrollHeight = scrollHeight;
             });

         cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='2']")
             .shadow()
             .find(".ui5-wiz-step-title-text")
             .invoke("prop", "scrollHeight")
             .then((scrollHeight) => {
                 step2ScrollHeight = scrollHeight;
             });

         cy.then(() => {
             expect(step2ScrollHeight).to.be.greaterThan(step1ScrollHeight);
         });
    });
});

describe("Wizard inside Dialog", () => {
    it("Tests if initial focus is set on the second (selected) step", () => {
        cy.mount(
            <div>
                <Dialog id="dialog" headerText="Wizard">
                    <Wizard id="asd">
                        <WizardStep icon="sap-icon://home" selected titleText="Product type"></WizardStep>
                        <WizardStep titleText="Product Information" disabled></WizardStep>
                    </Wizard>

                    <Bar slot="footer" design="Footer">
                        <Button id="prevButton" design="Emphasized">Previous Step</Button>
                        <Button id="nextButton" design="Emphasized">Next step</Button>
                        <Button id="finalize2" design="Emphasized">Finalize</Button>
                        <Button id="cancel" design="Transparent">Cancel</Button>
                    </Bar>
                </Dialog>

                <Button id="button" style={{ display: "inline-block" }}>Open Dialog</Button>
            </div>
        );
        cy.get("#button").then($button => {
            $button[0].addEventListener("click", () => {
                cy.get("#dialog").invoke("prop", "open", true);
            });
        });

        cy.get("#button")
            .realClick();

        cy.get("#nextButton")
            .then($button => {
                $button[0].addEventListener("click", () => {
                    goToWizardStep("asd", 1);
            });
             });

        cy.get("#nextButton")
            .realClick();

        cy.get("[ui5-wizard]")
            .realPress("Escape");

        cy.get("#button")
            .realClick();

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='2']")
            .should("be.selected");
    });

    it("Tests if second step is scrolled into view when first step's height is bigger than viewport", () => {
        cy.mount(
            <Wizard id="wizScroll" style="height: 100%;">
                <WizardStep title-text="Step 1" selected>
                    <div>
                        <Title>Step 1</Title>
                        <div style="height: 4440px;"></div>
                        <Button id="toStep2">Step 2</Button>
                    </div>
                </WizardStep>
                <WizardStep title-text="Step 2" disabled>
                    <div>
                        <Title>Step 2</Title>
                    </div>
                </WizardStep>
            </Wizard>
        );
        cy.get("#toStep2")
            .scrollIntoView();

        cy.get("#toStep2")
            .then($button => {
                $button[0].addEventListener("click", () => {
                    goToWizardStep("wizScroll", 1);
                });
             });

        cy.get("#toStep2")
             .realClick();

        cy.get("[ui5-wizard-step")
            .eq(1)
            .should("be.visible");
    });

    it("WizardPageMode: move to next step", () => {
         cy.mount(
            <div>
                <Dialog id="dialog" headerText="Wizard">
                    <Wizard id="asd">
                        <WizardStep icon="sap-icon://home" selected titleText="Product type"></WizardStep>
                        <WizardStep titleText="Product Information" disabled></WizardStep>
                    </Wizard>

                    <Bar slot="footer" design="Footer">
                        <Button id="prevButton" design="Emphasized">Previous Step</Button>
                        <Button id="nextButton" design="Emphasized">Next step</Button>
                        <Button id="finalize2" design="Emphasized">Finalize</Button>
                        <Button id="cancel" design="Transparent">Cancel</Button>
                    </Bar>
                </Dialog>

                <Button id="button" style={{ display: "inline-block" }}>Open Dialog</Button>
            </div>
        );
        cy.get("#button").then($button => {
            $button[0].addEventListener("click", () => {
                cy.get("#dialog").invoke("prop", "open", true);
            });
        });

        cy.get("#button")
            .click();

        cy.get("[ui5-wizard-step")
            .eq(0)
            .should("have.attr", "selected");

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='1']")
            .should("have.attr", "selected");

        cy.get("#nextButton")
            .then($button => {
                $button[0].addEventListener("click", () => {
                    goToWizardStep("asd", 1);
                });
            });

        cy.get("#nextButton")
            .click();

        cy.get("[ui5-wizard-step]")
            .eq(1)
            .should("have.attr", "selected");

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='2']")
            .should("have.attr", "selected");

        cy.get("[ui5-wizard-step")
            .eq(0)
            .should("not.have.attr", "selected");

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='1']")
            .should("not.have.attr", "selected");

        cy.get("#prevButton")
            .then($button => {
                $button[0].addEventListener("click", () => {
                    goToWizardStep("asd", 0);
                });
            });

        cy.get("#prevButton")
            .click();

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='1']")
            .should("have.attr", "selected");

        cy.get("[ui5-wizard-step]")
            .eq(1)
            .should("not.have.attr", "selected");

        cy.get("[ui5-wizard]")
            .shadow()
            .find("[data-ui5-index='2']")
            .should("not.have.attr", "selected");
    });

    it("WizardPageMode: prevent page change upon scrolling", () => {
        cy.mount(
            <Wizard contentLayout="SingleStep" style={{height: "10rem", border: "1px solid red", boxSizing: "border-box"}}>
                <WizardStep id="dialogStep1" icon="sap-icon://home" selected titleText="Product type">
                    <Title>1. Product Type</Title>

                    <MessageStrip>
                        The Wizard control is supposed to break down large tasks, into smaller steps, easier for the
                        user to work with.
                    </MessageStrip>
                    <div style={{height: "250px"}}></div>
                </WizardStep>
                <WizardStep titleText="Second Page"><Title>SecondPage</Title></WizardStep>
            </Wizard>
        );

        cy.get("[ui5-message-strip]")
            .realClick();

        cy.realPress("End");

        cy.get("[ui5-wizard-step]")
            .eq(0)
            .should("have.attr", "selected");

        cy.get("[ui5-wizard-step]")
            .eq(1)
            .should("not.have.attr", "selected");

    });

     it("tests popover visibility on small screen", () => {
        cy.mount(
			<Wizard id="wizTest2" style={{ position: "absolute", overflow: "hidden", height: "100%", width: "400px"}}>
				<WizardStep icon="sap-icon://product" titleText="Product type">
					<div style={{display: "flex",minHeight: "200px", flexDirection: "column"}}>
						<Title>1. Product Type</Title>
					</div>
				</WizardStep>

				<WizardStep titleText="Product Information" >
					<div style={{display: "flex", flexDirection: "column"}}>
						<Title>2. Product Information</Title>
					</div>
				</WizardStep>

				<WizardStep titleText="Options">
						<Title>3. Options</Title>
						<Label>
							Integer pellentesque leo sit amet dui vehicula.
						</Label>
				</WizardStep>
				<WizardStep titleText="Pricing" selected>
						<Title>4. Pricing</Title>
				</WizardStep>
			</Wizard>
        );

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
});