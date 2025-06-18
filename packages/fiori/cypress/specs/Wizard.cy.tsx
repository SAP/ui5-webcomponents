import Wizard from "../../src/Wizard.js";
import WizardStep from "../../src/WizardStep.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import MessageStrip from "@ui5/webcomponents/dist/MessageStrip.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import SegmentedButton from "@ui5/webcomponents/dist/SegmentedButton.js";
import ToggleButton from "@ui5/webcomponents/dist/ToggleButton.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Select from "@ui5/webcomponents/dist/Select.js";
import Option from "@ui5/webcomponents/dist/Option.js";
import Switch from "@ui5/webcomponents/dist/Switch.js";
import DatePicker from "@ui5/webcomponents/dist/DatePicker.js";
import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import Bar from "@ui5/webcomponents/dist/Bar.js";

describe("Wizard general interaction", () => {
    beforeEach(() => {

        cy.document().then((doc) => {
            const style = doc.createElement('style');
            style.innerHTML = `
                .wizard_test4auto {
                    display: flex;
                    flex-direction: row;
                    margin-top: 1rem;
                    justify-content: flex-end;
                    align-items: center;
                }
                `;
            doc.head.appendChild(style);
        });

        cy.mount(
            <div style={{ position: "absolute", overflow: "hidden", height: "100%", width: "100%" }}>
                <Wizard id="wizTest">
                    <WizardStep id="st1" icon="sap-icon://product" selected titleText="Product type">
                        <div className="wizard_test2auto">
                            <Title>1. Product Type</Title><br />

                            <MessageStrip>
                                The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
                            </MessageStrip><br />

                            <Input id="inpStepChangeCounter" />
                            <Button id="btnOpenDialog">Open Wizard Dialog</Button>

                            <div className="wizard_test4auto">
                                <Label>Configure step-switch-threshold</Label>
                                <SegmentedButton id="setting">
                                    <ToggleButton data-threshold="0.3">0.5</ToggleButton>
                                    <ToggleButton data-threshold="0.7" pressed>default (0.7)</ToggleButton>
                                    <ToggleButton data-threshold="1">1</ToggleButton>
                                </SegmentedButton>
                            </div>
                        </div>

                        <Button id="toStep2" design="Emphasized">Step 2</Button>
                    </WizardStep>

                    <WizardStep id="st2" titleText="Product Information" disabled>
                        <div className="wizard_test5auto">
                            <Title>2. Product Information</Title><br />
                            <Label>
                                Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem...
                            </Label>

                            <Input id="inpStepChangeCause" placeholder="step changed via click" />

                            <div className="wizard_test6auto">
                                <div className="wizard_test7auto">
                                    <Label>Name</Label>
                                    <Input placeholder="product name..." />
                                </div>

                                <div className="wizard_test4auto">
                                    <Label>Weight</Label>
                                    <Input value="3.65" />
                                </div>

                                <div className="wizard_test4auto">
                                    <Label>Manufacturer</Label>
                                    <Select>
                                        <Option selected>Apple</Option>
                                        <Option>Samsung</Option>
                                        <Option>Huawei</Option>
                                    </Select>
                                </div>

                                <div className="wizard_test4auto">
                                    <Label>5 years guarantee included</Label>
                                    <Switch id="sw" />
                                </div>

                                <span id="scrollMarkerSt2"></span>
                                <div id="pureContent" style={{ height: "1800px", backgroundColor: "red", display: "none" }}></div>
                            </div>
                        </div>

                        <Button id="toStep3" design="Emphasized">Step 3</Button>
                    </WizardStep>
                    <WizardStep id="st3" titleText="Options" disabled>
                        <div className="wizard_test6auto">
                            <Title>3. Options</Title><br />

                            <Label>
                                Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
                            </Label>

                            <MessageStrip>
                                The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
                            </MessageStrip><br />

                            <div className="wizard_test6auto">
                                <div className="wizard_test7auto">
                                    <Label>Manifacture date</Label>
                                    <DatePicker />
                                </div>

                                <div className="wizard_test7auto">
                                    <Label>Availability</Label>
                                    <SegmentedButton id="segButton1">
                                        <ToggleButton icon="employee" pressed>In stock</ToggleButton>
                                        <ToggleButton>In depot</ToggleButton>
                                        <ToggleButton>Damaged</ToggleButton>
                                        <ToggleButton>Out of stock</ToggleButton>
                                    </SegmentedButton>
                                </div>

                                <div className="wizard_test7auto">
                                    <Label>Size</Label>
                                    <SegmentedButton id="sb">
                                        <ToggleButton icon="employee" pressed>Small</ToggleButton>
                                        <ToggleButton>Medium</ToggleButton>
                                        <ToggleButton>Largr</ToggleButton>
                                    </SegmentedButton>
                                </div>
                            </div>
                        </div>

                        <span id="scrollMarkerSt3"></span>

                        <Button id="toStep22" design="Emphasized">Step 2</Button>
                        <Button id="toStep4" design="Emphasized">Step 4</Button>
                    </WizardStep>
                    <WizardStep id="st4" titleText="Pricing" disabled>
                        <div className="wizard_test6auto">
                            <Title>4. Pricing</Title><br />

                            <Label>
                                Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
                            </Label>

                            <MessageStrip>
                                The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
                            </MessageStrip><br />

                            <div className="wizard_test6auto">
                                <div className="wizard_test7auto">
                                    <Label>Price</Label>
                                    <Input placeholder="product price..." />
                                </div>

                                <div className="wizard_test7auto">
                                    <Label>Quantity</Label>
                                    <Input placeholder="product quantity..." />
                                </div>

                                <div className="wizard_test4auto">
                                    <Label>Vat included</Label>
                                    <Switch checked />
                                </div>
                            </div>
                        </div>

                        <Button id="toStep5" design="Emphasized">Step 5</Button>
                    </WizardStep>
                    <WizardStep
                        id="st5"
                        titleText="Optional step to finish the example with very long, long, long, long, long, long, long, long, long text"
                        subtitleText="(Optional)"
                        disabled
                    >
                        <div className="wizard_test6auto">
                            <Title>5. Optional step</Title><br />
                            <Label>
                                Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien
                            </Label>
                            <MessageStrip>
                                The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to
                                work with.
                            </MessageStrip><br />
                        </div>

                        <span id="scrollMarkerSt5"></span>

                        <Button id="toStep6" design="Emphasized">Step 6</Button>
                    </WizardStep>
                </Wizard>
            </div>
        );

        cy.get("[ui5-wizard]")
            .as("wizard");

        cy.get("[ui5-wizard-step]")
            .eq(0)
            .as("firstWizardStep");

        cy.get("[ui5-wizard-step]")
            .eq(1)
            .as("secondWizardStep");

        cy.get("[ui5-wizard-step]")
            .eq(2)
            .as("thirdWizardStep");

        cy.get("[ui5-wizard-step]")
            .eq(3)
            .as("fourthWizardStep");

        cy.get("@wizard")
            .shadow()
            .find("[data-ui5-index='1']")
            .as("firstProgressStep");

        cy.get("@wizard")
            .shadow()
            .find("[data-ui5-index='2']")
            .as("secondProgressStep");

        cy.get("@wizard")
            .shadow()
            .find("[data-ui5-index='3']")
            .as("thirdProgressStep");


        cy.get("@wizard")
            .shadow()
            .find("[data-ui5-index='4']")
            .as("fourthProgressStep");

        cy.get("@wizard")
            .shadow()
            .find(".ui5-wiz-content")
            .as("wizardContent");

         cy.window().then((win) => {
            const wiz = win.document.getElementById("wizTest");
            const toStep2 = win.document.getElementById("toStep2");
            const toStep3 = win.document.getElementById("toStep3");
            const toStep22 = win.document.getElementById("toStep22");
            const toStep4 = win.document.getElementById("toStep4");
            const toStep5 = win.document.getElementById("toStep5");

            const sw = win.document.getElementById("sw");
            const pureContent = win.document.getElementById("pureContent");

            const setStep = (stepIndex, wizard) => {
                const steps = wizard.querySelectorAll("[ui5-wizard-step]");
                steps.forEach((step, index) => {
                    step.removeAttribute("selected");
                    step.disabled = index > stepIndex;
                });
                steps[stepIndex].setAttribute("selected", "");
            };

            function deselectAll(wiz) {
                Array.from(wiz.children).forEach(function (step: WizardStep) {
                    step.selected = false;
                });
            }

            toStep2?.addEventListener("click", () => {
                deselectAll(wiz);
                setStep(1, wiz);
            });

            toStep3?.addEventListener("click", () => {
                deselectAll(wiz);
                setStep(2, wiz);
            });

            toStep22.addEventListener("click", function () {
                deselectAll(wiz);
                setStep(1, wiz);
            });

            toStep4.addEventListener("click", function () {
                deselectAll(wiz);
                setStep(3, wiz);
            });

            toStep5.addEventListener("click", function () {
                deselectAll(wiz);
                setStep(4, wiz);
            });

            sw.addEventListener("ui5-change", function () {
                pureContent.style.display = "block";
            });
        });
    });

    it("test initial state", () => {
        cy.get("@firstWizardStep")
            .should("have.attr", "selected");

        cy.get("@firstProgressStep")
            .should("have.attr", "selected");
    });

    it("ARIA Attributes", () => {
        cy.get("@wizard")
            .shadow()
            .find(".ui5-wiz-root")
            .as("wizRoot");

        cy.get("@wizard")
            .shadow()
            .find(".ui5-wiz-nav")
            .as("wizNav");

        cy.get("@wizard")
            .shadow()
            .find(".ui5-wiz-nav-list")
            .as("wizNavList");

        cy.get("@wizard")
            .shadow()
            .find(".ui5-wiz-content-item")
            .as("wizContentItem");

        const wizRootText = "Wizard";
        const wizNavText = "Wizard Progress Bar";
        const wizListDescribedbyId = "wiz-nav-descr";
        const wizListText = "Wizard Steps";

        const step1Text = "Step 1 Product type Active";
        const step2Text = "Step 2 Product Information Inactive";

        cy.get("@firstProgressStep")
            .shadow()
            .find(".ui5-wiz-step-root")
            .as("step1InHeaderRoot");

        cy.get("@secondProgressStep")
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
        cy.get("@secondProgressStep")
            .as("disabledStep");

        cy.get("@disabledStep")
            .click({ force: true });

        cy.get("@disabledStep")
            .should("not.have.attr", "selected");

        cy.get("@firstProgressStep")
            .should("have.attr", "selected");
    });

    it("move to next step by API", () => {
        cy.get("@firstProgressStep")
            .shadow()
            .find(".ui5-wiz-step-root")
            .as("step1InHeaderRoot");

        cy.get("#toStep2")
            .click();

        cy.get("@firstWizardStep")
            .should("not.have.attr", "selected");

        cy.get("@firstProgressStep")
            .should("not.have.attr", "selected");

        cy.get("@step1InHeaderRoot")
            .should("have.attr", "role", "listitem");

        cy.get("@secondWizardStep")
            .should("have.attr", "selected");

        cy.get("@secondProgressStep")
            .should("have.attr", "selected");

        cy.get("@secondWizardStep")
            .should("not.have.attr", "disabled");

        cy.get("@secondProgressStep")
            .should("not.have.attr", "disabled");
    });

    it("move to next step by click", () => {
        cy.get("@firstWizardStep")
            .find("ui5-message-strip")
            .as("messageStripInStep1");

        cy.get("@messageStripInStep1")
            .shadow()
            .find("ui5-button")
            .as("firstFocusableElement");

        cy.get("@wizard")
            .then(wizard => {
                wizard.get(0).addEventListener("ui5-step-change", cy.stub().as("stepChange"));
            });

        cy.get("#toStep2")
            .click();

        cy.get("@firstProgressStep")
            .click();

        cy.get("@firstWizardStep")
            .should("have.attr", "selected");

        cy.get("@firstProgressStep")
            .should("have.attr", "selected");

        cy.get("@secondWizardStep")
            .should("not.have.attr", "selected");

        cy.get("@secondProgressStep")
            .should("not.have.attr", "selected");

        cy.get("@firstFocusableElement")
            .should("be.focused");

        cy.get("@firstProgressStep")
            .realPress(["Shift", "Tab"]);

        cy.get("@secondProgressStep")
            .realPress("Space");

        cy.get("@firstFocusableElement")
            .should("be.focused");

        cy.get("@stepChange")
            .should("have.been.calledOnce");
    });

    it("move to next step by SPACE/ENTER", () => {
        cy.get("@wizard")
            .then(wizard => {
                wizard.get(0).addEventListener("ui5-step-change", cy.stub().as("stepChange"));
            });

        cy.get("#toStep2")
            .click();

        cy.get("@firstProgressStep")
            .click();

        cy.get("@firstProgressStep")
            .realPress(["Shift", "Tab"]);

        cy.get("@firstProgressStep")
            .realPress("ArrowRight");

        cy.get("@secondProgressStep")
            .realPress("Space");

        cy.get("@secondProgressStep")
            .should("have.attr", "selected");

        cy.get("@secondWizardStep")
            .should("have.attr", "selected");

        cy.get("@firstProgressStep")
            .should("not.have.attr", "selected");

        cy.get("@firstWizardStep")
            .should("not.have.attr", "selected");

        cy.get("@stepChange")
            .should("have.been.calledTwice");

        cy.get("@firstProgressStep")
            .click();

        cy.get("@firstProgressStep")
            .should("have.attr", "selected");

        cy.get("@firstWizardStep")
            .should("have.attr", "selected");

        cy.get("@firstProgressStep")
            .realPress(["Shift", "Tab"]);

        cy.get("@firstProgressStep")
            .realPress("ArrowRight");

        cy.get("@secondProgressStep")
            .realPress("Enter");

        cy.get("@secondProgressStep")
            .should("have.attr", "selected");

        cy.get("@secondWizardStep")
            .should("have.attr", "selected");

        cy.get("@stepChange")
            .should("have.callCount", 4);
    });

    it("move to next step by scroll", () => {
        cy.get("@wizard")
            .then(wizard => {
                wizard.get(0).addEventListener("ui5-step-change", cy.stub().as("stepChange"));
            });

        cy.get("#toStep2")
            .click();

        cy.get("@wizardContent")
            .scrollTo("top");

        cy.get("@stepChange")
            .should("have.callCount", 1);
    })

    it("tests dynamically increase step size and move to next step", () => {
        cy.get("#toStep2")
            .click();

        cy.get("#toStep3")
            .click();

        cy.get("@secondProgressStep")
            .click();

        cy.get("#sw")
            .click();

        cy.get("@wizardContent")
            .scrollTo("bottom");

        cy.get("@thirdWizardStep")
            .should("have.attr", "selected");

        cy.get("@thirdProgressStep")
            .should("have.attr", "selected");
    });

    //TO BE LOOKED AT AGAIN
    it("tests no scrolling to step, if the step was not changed", () => {
        cy.get("#toStep2")
            .realClick();

        cy.get("@wizardContent")
            .scrollTo(0, 50);

        cy.get("@wizardContent")
            .then(($content) => {
                const contentEl = $content[0];
                const scrollPosBefore = contentEl.scrollTop;

                cy.window().then((win) => {
                    const wizard = win.document.querySelector("#wizTest");
                    (wizard as Wizard).onAfterRendering();
                });

                cy.get("@wizardContent")
                    .then(($contentAfter) => {
                        const scrollPosAfter = $contentAfter[0].scrollTop;
                        console.log(scrollPosAfter);

                        expect(scrollPosAfter).to.equal(scrollPosBefore);
                    });
            });
    });
     it("Tests long text on wizard step to be truncated correctly", () => {
        cy.get("@wizard")
            .shadow()
            .find("[data-ui5-index='5']")
            .as("fifthProgressStep");

        cy.get("@wizard")
            .shadow()
            .find("[data-ui5-index='4']")
            .as("fourthProgressStep");

        let step4ScrollHeight: number;
        let step5ScrollHeight: number;

         cy.get("@fourthProgressStep")
             .shadow()
             .find(".ui5-wiz-step-title-text")
             .invoke("prop", "scrollHeight")
             .then((scrollHeight) => {
                 step4ScrollHeight = scrollHeight;
             });

         cy.get("@fifthProgressStep")
             .shadow()
             .find(".ui5-wiz-step-title-text")
             .invoke("prop", "scrollHeight")
             .then((scrollHeight) => {
                 step5ScrollHeight = scrollHeight;
             });

         cy.then(() => {
             expect(step5ScrollHeight).to.be.greaterThan(step4ScrollHeight);
         });

        cy.get("@fifthProgressStep")
            .should("have.attr", "subtitle-text", "(Optional)");
    });
});

describe("Wizard inside Dialog", () => {
    beforeEach(() => {
        cy.mount(
            <div>
                <Dialog id="dialog" headerText="Wizard">
                    <Wizard id="wiz2" contentLayout="SingleStep">
                        <WizardStep id="dialogStep1" icon="sap-icon://home" selected titleText="Product type">
                            <div className="wizard_test2auto">
                                <Title>1. Product Type</Title><br />
                                <MessageStrip>
                                    The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
                                </MessageStrip><br />
                                <Label>
                                    Sed fermentum, mi et tristique ullamcorper, sapien sapien faucibus sem, quis pretium nibh lorem malesuada diam...
                                </Label>
                            </div>
                        </WizardStep>

                        <WizardStep id="dialogStep2" titleText="Product Information" disabled>
                            <div className="wizard_test5auto">
                                <Title>2. Product Information</Title><br />
                                <Label>Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem...</Label>
                                <div className="wizard_test6auto">
                                    <div className="wizard_test7auto">
                                        <Label>Name</Label>
                                        <Input placeholder="product name..." />
                                    </div>
                                    <div className="wizard_test4auto">
                                        <Label>Weight</Label>
                                        <Input value="3.65" />
                                    </div>
                                    <div className="wizard_test4auto">
                                        <Label>Manufacturer</Label>
                                        <Select>
                                            <Option selected>Apple</Option>
                                            <Option>Samsung</Option>
                                            <Option>Huawei</Option>
                                        </Select>
                                    </div>
                                    <div className="wizard_test4auto">
                                        <Label>5 years guarantee included</Label>
                                        <Switch id="sw2" />
                                    </div>
                                </div>
                            </div>
                        </WizardStep>

                        <WizardStep id="dialogStep3" titleText="Options" disabled>
                            <div className="wizard_test6auto">
                                <Title>3. Options</Title><br />
                                <Label>
                                    Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem...
                                </Label>
                                <MessageStrip>
                                    The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
                                </MessageStrip><br />
                                <div className="wizard_test6auto">
                                    <div className="wizard_test7auto">
                                        <Label>Manufacture date</Label>
                                        <DatePicker />
                                    </div>
                                    <div className="wizard_test7auto">
                                        <Label>Availability</Label>
                                        <SegmentedButton>
                                            <ToggleButton icon="employee" pressed>In stock</ToggleButton>
                                            <ToggleButton>In depot</ToggleButton>
                                            <ToggleButton>Damaged</ToggleButton>
                                            <ToggleButton>Out of stock</ToggleButton>
                                        </SegmentedButton>
                                    </div>
                                    <div className="wizard_test7auto">
                                        <Label>Size</Label>
                                        <SegmentedButton>
                                            <ToggleButton icon="employee" pressed>Small</ToggleButton>
                                            <ToggleButton>Medium</ToggleButton>
                                            <ToggleButton>Largr</ToggleButton>
                                        </SegmentedButton>
                                    </div>
                                </div>
                            </div>
                        </WizardStep>

                        <WizardStep id="dialogStep4" titleText="Pricing" disabled>
                            <div className="wizard_test6auto">
                                <Title>4. Pricing</Title><br />
                                <Label>
                                    Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem...
                                </Label>
                                <MessageStrip>
                                    The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
                                </MessageStrip><br />
                                <div className="wizard_test6auto">
                                    <div className="wizard_test7auto">
                                        <Label>Price</Label>
                                        <Input placeholder="product price..." />
                                    </div>
                                    <div className="wizard_test7auto">
                                        <Label>Quantity</Label>
                                        <Input placeholder="product quantity..." />
                                    </div>
                                    <div className="wizard_test4auto">
                                        <Label>Vat included</Label>
                                        <Switch checked />
                                    </div>
                                </div>
                            </div>
                        </WizardStep>
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
        cy.window().then((win) => {

            const btnOpenDialog = document.getElementById("button");
            const dialog = document.getElementById("dialog") as Dialog;
            const wiz2 = document.getElementById("wiz2") as Wizard;
            const nextStepButton = document.getElementById("nextButton");
            const previousStepButton = document.getElementById("prevButton");
            const cancelButton = document.getElementById("cancel");
            const finalizeButton = document.getElementById("finalize2");
            btnOpenDialog.addEventListener("click", () => {
                dialog.open = true;
            });

            const getStep = (wizard, idx) => Array.from(wizard.children)[idx];

            const deselectAll = (wizard) => {
                Array.from(wizard.children).forEach(step => {
                    (step as WizardStep).selected = false;
                });
            }

            const setNextStep = (wizard, currentStepIndex, nextStepIndex) => {
                const nextStep = getStep(wizard, nextStepIndex) as WizardStep;
                const currentStep = getStep(wizard, currentStepIndex) as WizardStep;

                nextStep.selected = true;
                currentStep.disabled = false;
            }

            const setPreviousStep = (wizard, currentStepIndex, previousStepIndex) => {
                const previousStep = getStep(wizard, previousStepIndex) as WizardStep;
                const currentStep = getStep(wizard, currentStepIndex) as WizardStep;

                previousStep.selected = true;
                currentStep.disabled = false;
            }

            const setButtonVisibility = (index, totalItems) => {
                const nextButton = document.getElementById('nextButton');
                const prevButton = document.getElementById('prevButton');
                const finalizeButton = document.getElementById('finalize2');

                if (index === 0) {
                    finalizeButton.style.display = 'none';
                    prevButton.style.display = 'none';
                    nextButton.style.display = 'block';
                } else if (index === totalItems - 1) {
                    prevButton.style.display = 'block';
                    finalizeButton.style.display = 'block';
                    nextButton.style.display = 'none';
                } else {
                    prevButton.style.display = 'block';
                    nextButton.style.display = 'block';
                }
            };

            nextStepButton.addEventListener("click", () => {
                const index = wiz2.getSelectedStepIndex();
                setNextStep(wiz2, index, index + 1);
                setButtonVisibility(index + 1, wiz2.children.length);
            });

            previousStepButton.addEventListener("click", () => {
                const index = wiz2.getSelectedStepIndex();
                deselectAll(wiz2);
                setPreviousStep(wiz2, index, index - 1);
                setButtonVisibility(index - 1, wiz2.children.length)
            });

            cancelButton.addEventListener("click", () => {
                dialog.open = false;
            });

            finalizeButton.addEventListener("click", () => {
                alert("Finalize");
                dialog.open = false;
            });
        });

        cy.get("#wiz2")
            .as("wizard");

        cy.get("#dialogStep1")
            .as("firstWizardStep");

        cy.get("#dialogStep2")
            .as("secondWizardStep");

        cy.get("#dialogStep3")
            .as("thirdWizardStep");

        cy.get("@wizard")
            .shadow()
            .find("[data-ui5-index='1']")
            .as("firstProgressStep");

        cy.get("@wizard")
            .shadow()
            .find("[data-ui5-index='2']")
            .as("secondProgressStep");

        cy.get("@wizard")
            .shadow()
            .find("[data-ui5-index='3']")
            .as("thirdProgressStep");

    });

    it("Tests if initial focus is set on the second (selected) step", () => {

        cy.get("#button")
            .click();

        cy.get("#nextButton")
            .click();

        cy.get("@wizard")
            .realPress("Escape");

        cy.get("#button")
            .click();

        cy.get("@wizard")
            .shadow()
            .find("[data-ui5-index='2']")
            .as("secondProgressStep");

        cy.get("@secondProgressStep")
            .should("have.focus");
    });

    it("Tests if second step is scrolled into view when first step's height is bigger than viewport", () => {
        cy.mount(
            <Wizard id="wizScroll" style="height: 100%;">
                <WizardStep id="step1" title-text="Step 1" selected>
                    <div>
                        <Title>Step 1</Title>
                        <div style="height: 4440px;"></div>
                        <Button id="toStep2">Step 2</Button>
                    </div>
                </WizardStep>
                <WizardStep id="step2" title-text="Step 2" disabled>
                    <div>
                        <Title>Step 2</Title>
                    </div>
                </WizardStep>
            </Wizard>
        );
        cy.get("#toStep2")
            .scrollIntoView();

        cy.get("#toStep2")
            .then(($btn) => {
                $btn[0].addEventListener("click", () => {
                    const step1 = document.getElementById("step1") as WizardStep;
                    const step2 = document.getElementById("step2") as WizardStep;

                    step1.selected = false;
                    step2.selected = true;
                    step2.disabled = false;
                });
            });

        cy.get("#toStep2")
            .click();

        cy.get("#step2")
            .should("be.visible");
    });

    it("WizardPageMode: move to next step", () => {
        cy.get("#button")
            .click();

        cy.get("@firstWizardStep")
            .should("have.attr", "selected");

        cy.get("@firstProgressStep")
            .should("have.attr", "selected");

        cy.get("#nextButton")
            .click();

        cy.get("@secondWizardStep")
            .should("have.attr", "selected");

        cy.get("@secondProgressStep")
            .should("have.attr", "selected");

        cy.get("@firstWizardStep")
            .should("not.have.attr", "selected");

        cy.get("@firstProgressStep")
            .should("not.have.attr", "selected");

        cy.get("#prevButton")
            .realClick();

        cy.get("@firstWizardStep")
            .should("have.attr", "selected");

        cy.get("@firstProgressStep")
            .should("have.attr", "selected");

        cy.get("@secondWizardStep")
            .should("not.have.attr", "selected");

        cy.get("@secondProgressStep")
            .should("not.have.attr", "selected");
    });

    it("WizardPageMode: prevent page change upon scrolling", () => {
        cy.mount(
            <Wizard content-layout="SingleStep" style={{height: "10rem", border: "1px solid red", boxSizing: "border-box"}}>
                <WizardStep id="dialogStep1" icon="sap-icon://home" selectedtitle-text="Product type">
                    <Title>1. Product Type</Title>

                    <MessageStrip>
                        The Wizard control is supposed to break down large tasks, into smaller steps, easier for the
                        user to work with.
                    </MessageStrip>

                    <Label>Sed fermentum, mi et tristique ullamcorper, sapien sapien faucibus
                        sem, quis pretium nibh lorem malesuada diam. Nulla quis arcu aliquet, feugiat massa semper,
                        volutpat diam. Nam vitae ante posuere, molestie neque sit amet, dapibus velit. Maecenas eleifend
                        tempor lorem. Mauris vitae elementum mi, sed eleifend ligula. Nulla tempor vulputate dolor, nec
                        dignissim quam convallis ut. Praesent vitae commodo felis, ut iaculis felis. Fusce quis eleifend
                        sapien, eget facilisis nibh. Suspendisse est velit, scelerisque ut commodo eget, dignissim quis
                        metus. Cras faucibus consequat gravida. Curabitur vitae quam felis. Phasellus ac leo eleifend,
                        commodo tortor et, varius quam. Aliquam erat volutpat.
                    </Label>
                    <MessageStrip>
                        The Wizard control is supposed to break down large tasks, into smaller steps, easier for the
                        user to work with.
                    </MessageStrip>
                    <Label>Sed fermentum, mi et tristique ullamcorper, sapien sapien faucibus
                        sem, quis pretium nibh lorem malesuada diam. Nulla quis arcu aliquet, feugiat massa semper,
                        volutpat diam. Nam vitae ante posuere, molestie neque sit amet, dapibus velit. Maecenas eleifend
                        tempor lorem. Mauris vitae elementum mi, sed eleifend ligula. Nulla tempor vulputate dolor, nec
                        dignissim quam convallis ut. Praesent vitae commodo felis, ut iaculis felis. Fusce quis eleifend
                        sapien, eget facilisis nibh. Suspendisse est velit, scelerisque ut commodo eget, dignissim quis
                        metus. Cras faucibus consequat gravida. Curabitur vitae quam felis. Phasellus ac leo eleifend,
                        commodo tortor et, varius quam. Aliquam erat volutpat.
                    </Label>
                    <br></br>
                    <Label>Sed fermentum, mi et tristique ullamcorper, sapien sapien faucibus
                        sem, quis pretium nibh lorem malesuada diam. Nulla quis arcu aliquet, feugiat massa semper,
                        volutpat diam. Nam vitae ante posuere, molestie neque sit amet, dapibus velit. Maecenas eleifend
                        tempor lorem. Mauris vitae elementum mi, sed eleifend ligula. Nulla tempor vulputate dolor, nec
                        dignissim quam convallis ut. Praesent vitae commodo felis, ut iaculis felis. Fusce quis eleifend
                        sapien, eget facilisis nibh. Suspendisse est velit, scelerisque ut commodo eget, dignissim quis
                        metus. Cras faucibus consequat gravida. Curabitur vitae quam felis. Phasellus ac leo eleifend,
                        commodo tortor et, varius quam. Aliquam erat volutpat.
                    </Label>
                </WizardStep>
                <WizardStep title-text="Second Page"><Title>SecondPage</Title></WizardStep>
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
});