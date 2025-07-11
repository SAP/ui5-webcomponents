import Toolbar from "../../src/Toolbar.js";
import ToolbarButton from "../../src/ToolbarButton.js";
import ToolbarSelect from "../../src/ToolbarSelect.js";
import ToolbarSelectOption from "../../src/ToolbarSelectOption.js";
import ToolbarSeparator from "../../src/ToolbarSeparator.js";
import ToolbarSpacer from "../../src/ToolbarSpacer.js";
import type ToolbarItem from "../../src/ToolbarItem.js";
import add from "@ui5/webcomponents-icons/dist/add.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import employee from "@ui5/webcomponents-icons/dist/employee.js";

describe("Toolbar general interaction", () => {
	it.skip("Should not return null upon calling getDomRef for all direct child items", () => {
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

	it("Should move button with alwaysOverflow priority to overflow popover", async () => {

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

//ToolbarSelect
describe("Toolbar Select", () => {
	it("Should render the select with the correct attributes inside the popover", () => {
		cy.mount(
			<div style="width: 250px;">
				<Toolbar id="otb_e">
					<ToolbarSelect value-state="Critical" accessible-name="Add" accessible-name-ref="title" id="toolbar-select">
						<ToolbarSelectOption>1</ToolbarSelectOption>
						<ToolbarSelectOption selected>2</ToolbarSelectOption>
						<ToolbarSelectOption>3</ToolbarSelectOption>
					</ToolbarSelect>


					<ToolbarSelect disabled class="custom-class">
						<ToolbarSelectOption>1</ToolbarSelectOption>
						<ToolbarSelectOption selected>2</ToolbarSelectOption>
						<ToolbarSelectOption>3</ToolbarSelectOption>
					</ToolbarSelect>
				</Toolbar>
			</div>
		);

		const otb = cy.get("#otb_e").as("otb");

		cy.get("@otb")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.click();
		const overflowButton = otb.shadow().find(".ui5-tb-overflow-btn");

		cy.get("@otb")
			.shadow()
			.find(".ui5-overflow-popover").as("popover")
			.should("have.attr", "open", "open");
		overflowButton.click();
		cy.wait(500);

		cy.get("@otb")
		.find("#toolbar-select")
			.should("have.attr", "value-state", "Critical")

			.should("have.attr", "accessible-name", "Add")

			.should("have.attr", "accessible-name-ref", "title")

		cy.get("@otb")
		.find(".custom-class")
		.should("have.attr", "disabled", "disabled");

	});

	//ToolbarButton
	it("Should render the button with the correct text inside the popover", async () => {
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

	it ("Should render the button with the correct accessible name inside the popover", async () => {
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

	it("Should render the button with the correct accessibilityAttributes inside the popover", async () => {
		cy.viewport(100, 1080);

		cy.get("#otb_d").within(() => {
			cy.get(".ui5-tb-overflow-btn").click();
			cy.get("ui5-popover").shadow().within(() => {
				cy.get("ui5-button[accessible-name]").invoke("prop", "accessibilityAttributes").should("have.property", "expanded", "true");
			});
		});
	});
});