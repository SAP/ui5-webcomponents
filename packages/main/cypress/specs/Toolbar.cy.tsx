import Toolbar from "../../src/Toolbar.js";
import ToolbarButton from "../../src/ToolbarButton.js";
import ToolbarSelect from "../../src/ToolbarSelect.js";
import ToolbarSelectOption from "../../src/ToolbarSelectOption.js";
import ToolbarSeparator from "../../src/ToolbarSeparator.js";
import ToolbarSpacer from "../../src/ToolbarSpacer.js";
import ToolbarItem from "../../src/ToolbarItem.js";
import add from "@ui5/webcomponents-icons/dist/add.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import employee from "@ui5/webcomponents-icons/dist/employee.js";
import Button from "../../src/Button.js";
import Dialog from "../../src/Dialog.js";

describe("Toolbar general interaction", () => {
	it("Should not return null upon calling getDomRef for all direct child items", () => {
		cy.mount(
			<Toolbar id="otb_standard">
				<ToolbarButton text="Button 1"></ToolbarButton>
				<ToolbarButton text="Button 2"></ToolbarButton>
				<ToolbarButton text="Button 3"></ToolbarButton>
				<ToolbarSelect>
					<ToolbarSelectOption>1</ToolbarSelectOption>
					<ToolbarSelectOption>2</ToolbarSelectOption>
					<ToolbarSelectOption>3</ToolbarSelectOption>
				</ToolbarSelect>
				<ToolbarSeparator></ToolbarSeparator>
				<ToolbarButton text="Button 4"></ToolbarButton>
				<ToolbarButton text="Button 5"></ToolbarButton>
				<ToolbarButton text="Button 6"></ToolbarButton>
			</Toolbar>
		);

		cy.get("#otb_standard")
			.as("toolbar");

		cy.get("@toolbar")
			.should("exist");

		cy.get("@toolbar")
			.children()
			.each($el => {
				const toolbarItem = $el[0] as ToolbarItem;
				cy.wrap(toolbarItem.getDomRef())
					.should("not.be.null")
					.should("not.be.undefined");
			});
	});

	it("shouldn't have toolbar button as popover opener when there is spacer before last toolbar item", () => {
		cy.mount(
			<Toolbar id="otb_spacer">
				<ToolbarButton icon={add} text="Plus" design="Default"></ToolbarButton>
				<ToolbarButton icon={employee} text="Hire"></ToolbarButton>
				<ToolbarSeparator></ToolbarSeparator>
				<ToolbarButton icon={add} text="Add"></ToolbarButton>
				<ToolbarButton icon={decline} text="Decline"></ToolbarButton>
				<ToolbarSpacer></ToolbarSpacer>
				<ToolbarButton icon={add} text="Append"></ToolbarButton>
			</Toolbar>
		);

		cy.get("#otb_spacer")
			.as("toolbar");

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		cy.get("@toolbar")
			.shadow()
			.find(".ui5-tb-overflow-btn-hidden")
			.should("exist", "hidden class attached to tb button, meaning it's not shown as expected");
	});

	it("shouldn't show overflow button if there is enough space", () => {
		cy.mount(
			<Toolbar style={{ width: "fit-content", " max-width": "100%;" }}>
				<ToolbarButton icon={decline}>
				</ToolbarButton>

				<ToolbarButton icon={add}>
				</ToolbarButton>

				<ToolbarButton icon={employee}>
				</ToolbarButton>
			</Toolbar>
		);

		cy.get("[ui5-toolbar]")
			.as("toolbar");

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		cy.get("@toolbar")
			.shadow()
			.find(".ui5-tb-overflow-btn-hidden")
			.should("exist", "hidden class attached to tb button, meaning it's not shown as expected");
	});

	it("shouldn't display the overflow button when initially rendered in a hidden container and later made visible", () => {
		cy.mount(
			<div id="otb_hidden_container" style="display:none;">
				<Toolbar id="otb_hidden">
					<ToolbarButton icon={add} text="Append"></ToolbarButton>
				</Toolbar>
			</div>
		);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		cy.get("#otb_hidden_container")
			.as("hiddenContainer");

		// show the hidden container
		cy.get("@hiddenContainer")
			.invoke("show");

		// overflowbutton should not be rendered
		cy.get("#otb_hidden")
			.shadow()
			.find(".ui5-tb-overflow-btn-hidden")
			.should("exist", "hidden class attached to tb button, meaning it's not shown as expected");
	});

	it("Should call event handlers on abstract item", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton text="Button 1"></ToolbarButton>
				<ToolbarSelect>
					<ToolbarSelectOption>1</ToolbarSelectOption>
					<ToolbarSelectOption selected={true}>2</ToolbarSelectOption>
					<ToolbarSelectOption>3</ToolbarSelectOption>
				</ToolbarSelect>
			</Toolbar>
		);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		cy.get("ui5-toolbar-button[text='Button 1']")
			.then(button => {
				button.get(0).addEventListener("click", cy.stub().as("clicked"));
			});

		cy.get("ui5-button", { includeShadowDom: true }).contains("Button 1")
			.click();

		cy.get("@clicked")
			.should("have.been.calledOnce");

		cy.get("ui5-toolbar-select")
			.then(select => {
				select.get(0).addEventListener("ui5-click", cy.stub().as("clicked"));
				select.get(0).addEventListener("ui5-change", cy.stub().as("changed"));
				select.get(0).addEventListener("ui5-open", cy.stub().as("opened"));
				select.get(0).addEventListener("ui5-close", cy.stub().as("closed"));
			});

		cy.get("ui5-select", { includeShadowDom: true })
			.click();

		cy.get("@clicked")
			.should("have.been.calledOnce");
		cy.get("@opened")
			.should("have.been.calledOnce");

		cy.get("ui5-option", { includeShadowDom: true })
			.first()
			.click();

		cy.get("@changed")
			.should("have.been.calledOnce");
		cy.get("@closed")
			.should("have.been.calledOnce");
	});

	it.skip("Should move button with alwaysOverflow priority to overflow popover", async () => {

		cy.mount(
			<Toolbar id="otb_d">
				<ToolbarButton text="Add" icon={add} overflow-priority="AlwaysOverflow" stableDomRef="tb-button-add-d"></ToolbarButton>
				<ToolbarButton text="Employee" icon={employee} overflow-priority="AlwaysOverflow" stableDomRef="tb-button-employee-d"></ToolbarButton>
			</Toolbar>
		);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		const otb = cy.get("#otb_d");

		cy.get("otb")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.click();
		const overflowButton = otb.shadow().find(".ui5-tb-overflow-btn");

		cy.get("#otb_d")
			.shadow()
			.find(".ui5-overflow-popover")
			.should("have.attr", "open", "true");
		overflowButton.click();
		cy.wait(500);

		cy.get("@popover")
			.find(".ui5-tb-popover-item")
			.should("have.length", 2);

		cy.get("@popover")
			.find(`[stable-dom-ref="tb-button-employee-d"]`)
			.should("have.class", "ui5-tb-popover-item");
	});

	it("Should properly prevent the closing of the overflow menu when preventClosing = true", () => {
		cy.mount(
			<div style="width: 250px;">
				<Toolbar id="testEventpreventClosing-toolbar">
					<ToolbarButton text="Some longer title text">

					</ToolbarButton>
					<ToolbarSelect>
						<ToolbarSelectOption>
							test
						</ToolbarSelectOption>
					</ToolbarSelect>
				</Toolbar>
			</div>
		)

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(1000);

		cy.get("#testEventpreventClosing-toolbar")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.click();
		cy.get("[ui5-toolbar-select]")
			.shadow()
			.find("[ui5-select]")
			.click();

		cy.get("#testEventpreventClosing-toolbar")
			.shadow()
			.find(".ui5-overflow-popover")
			.should("have.attr", "open", "open");
	});

	it("Should close the popover when interacting with item in the overflow menu", () => {
		cy.viewport(300, 1080);

		cy.mount(
			<Toolbar>
				<ToolbarButton text="Example Button"></ToolbarButton>
				<ToolbarButton text="Example Button"></ToolbarButton>
				<ToolbarButton text="Example Button"></ToolbarButton>
				<ToolbarButton text="Example Button"></ToolbarButton>
				<ToolbarButton text="Example Button"></ToolbarButton>
			</Toolbar>
		);


		cy.get("ui5-toolbar")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.as("overflowButton")

		cy.get("@overflowButton")
			.should("exist");

		cy.get("@overflowButton")
			.click();

		cy.get("ui5-toolbar")
			.shadow()
			.find("[ui5-popover]")
			.as("popover")

		cy.get("@popover")
			.should("have.prop", "open", true);

		cy.get("[ui5-toolbar-button]")
			.first()
			.shadow()
			.find("[ui5-button]")
			.click();

		cy.get("@popover")
			.should("have.prop", "open", false);
	});

	it("Should focus on the last interactive element outside the overflow popover when overflow button disappears", () => {
		// Mount the Toolbar with multiple buttons
		cy.mount(
			<Toolbar>
				<ToolbarButton text="Button 1" />
				<ToolbarButton text="Button 2" />
				<ToolbarButton text="Button 3" />
				<ToolbarButton text="Button 4" />
				<ToolbarButton text="Button 5" />
			</Toolbar>
		);

		// Set initial viewport size to ensure the overflow button is visible
		cy.viewport(300, 1080);

		// Focus on the overflow button
		cy.get("ui5-toolbar")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.click()
			.click()
			.should("be.focused");

		// Resize the viewport to make the overflow button disappear
		cy.viewport(800, 1080);

		// Verify the focus shifts to the last interactive element outside the overflow popover
		cy.get("ui5-toolbar")
			.shadow()
			.find(".ui5-tb-item")
			.eq(3)
			.should("be.focused");
	});

	it("Should render ui5-button by toolbar template, when slotting ui5-toolbar-button elements", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton
					icon="decline"
					stableDomRef="tb-button-decline"
					overflowPriority="NeverOverflow"
					text="Left 2"
				/>
				<ToolbarButton
					icon="employee"
					overflowPriority="NeverOverflow"
					text="Left 3"
				/>
			</Toolbar>
		);

		cy.get("[ui5-toolbar]")
			.find("[ui5-toolbar-button]")
			.first()
			.shadow()
			.find("ui5-button")
			.should("have.prop", "tagName", "UI5-BUTTON");

		cy.viewport(200, 400);

		cy.get("[ui5-toolbar]")
			.find("[ui5-toolbar-button][overflow-priority='NeverOverflow']")
			.should("be.visible")
			.should("have.length", 2);
	});

	it("Should call child events only once", () => {
		cy.mount(
			<>
				<Toolbar data-testid="clickCountToolbar">
					<ToolbarButton
						icon="add"
						text="Left 1 (long)"
						data-testid="clickCounter"
					/>
					<ToolbarButton
						icon="decline"
						text="Left 2"
						data-testid="clearCounter"
					/>
				</Toolbar>
				<input data-testid="input" defaultValue="0" />
			</>
		);

		// Create stubs for event tracking
		cy.get("[data-testid='clickCountToolbar']")
			.as("toolbar")
			.then($toolbar => {
				$toolbar.get(0).addEventListener("click", cy.stub().as("toolbarClickStub"));
			});

		cy.get("[data-testid='clickCounter']")
			.as("clickCounter")
			.then($button => {
				$button.get(0).addEventListener("click", cy.stub().as("counterClickStub"));
			});

		cy.get("[data-testid='clearCounter']")
			.as("clearCounter")
			.then($button => {
				$button.get(0).addEventListener("click", cy.stub().as("clearClickStub"));
			});

		// Set up input manipulation logic
		cy.get("@toolbar").then($toolbar => {
			$toolbar.get(0).addEventListener("click", (e) => {
				const input = document.querySelector("[data-testid='input']") as HTMLInputElement;
				const target = e.target as HTMLElement;

				if (target.dataset.testid === "clearCounter") {
					input.value = "0";
				} else if (target.dataset.testid === "clickCounter") {
					let currentValue = parseInt(input.value);
					input.value = `${++currentValue}`;
				}
			});
		});

		cy.get("[data-testid='input']").invoke("val", "0");

		cy.get("@clickCounter").realClick();

		cy.get("[data-testid='input']").should("have.prop", "value", "1");

		cy.get("@toolbarClickStub").should("have.been.calledOnce");
		cy.get("@counterClickStub").should("have.been.calledOnce");

		cy.get("[data-testid='input']").invoke("val", "0");
	});
});

describe("Accessibility", () => {
	it("Should apply accessibile-name to the popover", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton text="Button 1"></ToolbarButton>
				<ToolbarButton text="Button 2"></ToolbarButton>
				<ToolbarButton text="Button 3"></ToolbarButton>
				<ToolbarSelect accessibleName="Select">
					<ToolbarSelectOption>1</ToolbarSelectOption>
					<ToolbarSelectOption>2</ToolbarSelectOption>
					<ToolbarSelectOption>3</ToolbarSelectOption>
				</ToolbarSelect>
			</Toolbar>
		);
		cy.wait(1000);

		cy.get("ui5-toolbar")
			.shadow()
			.find(".ui5-overflow-popover")
			.should("have.attr", "accessible-name", "Available Values");
	});
});

describe("Toolbar in Dialog", () => {
	it("Should correctly process overflow layout when rendered inside a dialog", () => {
		cy.viewport(400, 600);

		cy.mount(
			<div>
				<Button id="open-dialog-button" onClick={() => {
					const dialog = document.getElementById("dialog") as Dialog;
					dialog.open = true;
				}}>Open Dialog</Button>

				<Dialog id="dialog">
					<Toolbar id="toolbar-in-dialog">
						<ToolbarButton icon={add} text="Plus" design="Default"></ToolbarButton>
						<ToolbarButton icon={employee} text="Hire"></ToolbarButton>
						<ToolbarSeparator></ToolbarSeparator>
						<ToolbarButton icon={add} text="Add"></ToolbarButton>
						<ToolbarButton icon={decline} text="Decline"></ToolbarButton>
						<ToolbarSpacer></ToolbarSpacer>
						<ToolbarButton icon={add} text="Append"></ToolbarButton>
						<ToolbarButton icon={employee} text="More"></ToolbarButton>
						<ToolbarButton icon={decline} text="Extra"></ToolbarButton>
						<ToolbarButton icon={add} text="Final"></ToolbarButton>
						<ToolbarButton icon={employee} text="Last"></ToolbarButton>
						<ToolbarButton icon={decline} text="Final"></ToolbarButton>
						<ToolbarButton icon={add} text="Plus"></ToolbarButton>
					</Toolbar>
				</Dialog>
			</div>
		);

		// Open dialog
		cy.get("#open-dialog-button").click();
		cy.get<Dialog>("#dialog").ui5DialogOpened();

		// Verify toolbar is rendered inside the dialog
		cy.get("#toolbar-in-dialog")
			.should("exist")
			.should("be.visible");

		// Check that overflow processing has occurred by verifying overflow button exists and is visible
		// Since we have many items in a constrained width, some should overflow
		cy.get("#toolbar-in-dialog")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.should("exist")
			.should("not.have.class", "ui5-tb-overflow-btn-hidden");
	});
});

//ToolbarSelect
describe("Toolbar Select", () => {

	//ToolbarButton
	it.skip("Should render the button with the correct text inside the popover", async () => {
		cy.viewport(200, 1080);

		cy.get("#otb_d").within(() => {
			cy.get(".ui5-tb-overflow-btn").click();
			cy.get("ui5-popover").shadow().within(() => {
				cy.get("ui5-toolbar-button").shadow().within(() => {
					cy.get("ui5-button").then($button => {
						expect($button).to.have.text("Back");
						expect($button).to.have.attr("design", "Emphasized");
						expect($button).to.have.attr("disabled", "true");
						expect($button).to.have.attr("icon", "sap-icon://add");
						expect($button).to.have.attr("end-icon", "sap-icon://employee");
						expect($button).to.have.attr("tooltip", "Add");
					});
				});
			});
		});
	});

	it.skip("Should render the button with the correct accessible name inside the popover", async () => {
		cy.viewport(100, 1080);

		cy.get("#otb_d").within(() => {
			cy.get(".ui5-tb-overflow-btn").click();
			cy.get("ui5-popover").shadow().within(() => {
				cy.get("ui5-button[accessible-name]").then($button => {
					expect($button).to.have.attr("accessible-name", "Add");
					expect($button).to.have.attr("accessible-name-ref", "btn");
				});
			});
		});
	});

	it.skip("Should render the button with the correct accessibilityAttributes inside the popover", async () => {
		cy.viewport(100, 1080);

		cy.get("#otb_d").within(() => {
			cy.get(".ui5-tb-overflow-btn").click();
			cy.get("ui5-popover").shadow().within(() => {
				cy.get("ui5-button[accessible-name]").invoke("prop", "accessibilityAttributes").should("have.property", "expanded", "true");
			});
		});
	});
});

describe("Toolbar Button", () => {
	it("Should not trigger click event on disabled button", () => {
		// Use cy.mount to create the toolbar with buttons and input field
		cy.mount(
			<div>
				<Toolbar id="test-toolbar">
					<ToolbarButton disabled>Disabled Button</ToolbarButton>
					<ToolbarButton
						onClick={() => {
							const input = document.getElementById("value-input") as HTMLInputElement;
							input.value = (parseInt(input.value, 10) + 1).toString();
						}}
					>
						Enabled Button
					</ToolbarButton>
					<input id="value-input" type="number" defaultValue="0" />
				</Toolbar>
			</div>
		);

		// Test clicking the disabled button
		cy.get("ui5-toolbar-button[disabled]").realClick();
		cy.get("#value-input").should("have.value", "0");

		// Test clicking the non-disabled button
		cy.get("ui5-toolbar-button:not([disabled])").realClick();
		cy.get("#value-input").should("have.value", "1");
	});
});

describe("Toolbar Item", () => {
    it("Should render ui5-toolbar-item with correct properties and not suppress events", () => {
        // Mount the Toolbar with a ui5-toolbar-item wrapping a web component
        cy.mount(
            <Toolbar>
                <ToolbarItem prevent-overflow-closing overflow-priority="AlwaysOverflow">
                    <Button id="innerButton" icon="employee">User Menu</Button>
                </ToolbarItem>
            </Toolbar>
        );

        // Verify the ui5-toolbar-item has the correct properties
        cy.get("ui5-toolbar-item").should((item) => {
			expect(item).to.have.attr("prevent-overflow-closing");
			expect(item).to.have.attr("overflow-priority", "AlwaysOverflow");
		  });

        // Verify the inner component (ui5-button) is rendered
        cy.get("ui5-toolbar-item")
            .find("ui5-button").should((button) => {
				expect(button).to.exist;
				expect(button).to.contain.text("User Menu");
			  });

        // Attach a click event to the inner button
        cy.get("ui5-button#innerButton")
            .then(button => {
                button.get(0).addEventListener("click", cy.stub().as("buttonClicked"));
            });

        // Trigger a click event on the inner button
        cy.get("ui5-button#innerButton").click();

        // Verify the click event was triggered
        cy.get("@buttonClicked").should("have.been.calledOnce");
    });

    it("Should respect prevent-overflow-closing property", () => {
        // Mount the Toolbar with a ui5-toolbar-item
        cy.mount(
            <Toolbar>
                <ToolbarItem overflow-priority="AlwaysOverflow" prevent-overflow-closing>
                    <Button id="innerButton" icon="employee">User Menu</Button>
                </ToolbarItem>
            </Toolbar>
        );

        // Simulate overflow behavior
        cy.get("ui5-toolbar-item")
            .invoke("attr", "prevent-overflow-closing")
            .should("exist");

        // Verify the inner button is still visible and not hidden
        cy.get("ui5-toolbar-item")
            .find("ui5-button")
            .should("be.visible");

			cy.get("ui5-toolbar-item")
            .find("ui5-button")
            .realClick();
		expect(cy.get("ui5-popover").should("be.visible"));
    });

    it("Should respect overflow-priority property", () => {
        // Mount the Toolbar with multiple ui5-toolbar-items
        cy.mount(
            <Toolbar>
                <ToolbarItem overflow-priority="AlwaysOverflow">
                    <Button id="highPriorityButton" icon="employee">High Priority</Button>
                </ToolbarItem>
                <ToolbarItem overflow-priority="NeverOverflow">
                    <Button id="lowPriorityButton" icon="employee">Low Priority</Button>
                </ToolbarItem>
            </Toolbar>
        );

        // Verify the overflow-priority property is respected
        cy.get("ui5-toolbar-item[overflow-priority='AlwaysOverflow']")
            .should("exist")
            .should("have.attr", "overflow-priority", "AlwaysOverflow");

        cy.get("ui5-toolbar-item[overflow-priority='NeverOverflow']")
            .should("exist")
            .should("have.attr", "overflow-priority", "NeverOverflow");

        // Simulate overflow behavior and ensure high-priority item remains visible
        cy.viewport(300, 1080); // Simulate a smaller viewport
        cy.get("ui5-toolbar-item[overflow-priority='NeverOverflow']")
            .should("be.visible");

        // Ensure low-priority item is hidden or moved to overflow
        cy.get("ui5-toolbar-item[overflow-priority='AlwaysOverflow']")
            .should("not.be.visible");
    });
})
