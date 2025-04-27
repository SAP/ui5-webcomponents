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

		cy.get("ui5-toolbar-button[text='Button 1']")
			.then(button => {
				button.get(0).addEventListener("click", cy.stub().as("clicked"));
			});

		cy.get("ui5-button").contains("Button 1")
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

		cy.get("ui5-toolbar")
			.shadow()
			.find(".ui5-overflow-popover")
			.should("have.attr", "accessible-name", "Available Values");
	});
});
