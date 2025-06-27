import SplitButton from "../../src/SplitButton.js";
import Menu from "../../src/Menu.js";
import MenuItem from "../../src/MenuItem.js";

describe("Split Button general interaction", () => {
	it("tests inner buttons design", () => {
		cy.mount(<SplitButton id="sbDefault" design="Default">Default</SplitButton>);

		cy.get("#sbDefault")
			.as("splitButton");

		cy.get("@splitButton")
			.shadow()
			.find(".ui5-split-text-button")
			.should("have.attr", "design", "Default");

		cy.get("@splitButton")
			.shadow()
			.find(".ui5-split-arrow-button")
			.should("have.attr", "design", "Default");
	});

	it("tests text button 'click' event", () => {
		cy.mount(<SplitButton id="sbDefault" design="Default" onClick={cy.stub().as("clicked")}>Default</SplitButton>);

		cy.get("[ui5-split-button]")
			.as("splitButton");

		cy.get("@splitButton")
			.shadow()
			.find(".ui5-split-text-button")
			.as("textButton");

		cy.get("@textButton")
			.realClick();

		cy.get("@textButton")
			.should("be.focused");

		cy.realPress("Space");

		cy.realPress("Enter");

		cy.get("@clicked")
			.should("have.been.calledThrice");
	});

 	it("tests arrow button 'arrow-click' event (arrow down)", () => {
		cy.mount(<SplitButton id="sbDefault" design="Default" onArrowClick={cy.stub().as("arrowClicked")}>Default</SplitButton>);

		cy.get("#sbDefault")
		.as("splitButton");

		cy.get("@splitButton")
			.shadow()
			.find(".ui5-split-arrow-button")
			.realClick();

		cy.get("@splitButton")
			.realPress("ArrowDown");

		cy.get("@splitButton")
			.realPress("ArrowUp");

		cy.get("@arrowClicked")
			.should("have.been.calledThrice");
	});

 	it("tests arrow button 'arrow-click' event (alt + arrow down / arrow up)", () => {
		cy.mount(<SplitButton id="sbDefault" design="Default" onArrowClick={cy.stub().as("arrowClicked")}>Default</SplitButton>);

		cy.get("#sbDefault")
		.as("splitButton");

		cy.get("@splitButton")
			.shadow()
			.find(".ui5-split-arrow-button")
			.realClick();

		cy.get("@splitButton")
			.realPress(["Alt", "ArrowDown"]);

		cy.get("@splitButton")
			.realPress(["Alt", "ArrowUp"]);

		cy.get("@arrowClicked")
			.should("have.been.calledThrice");
 	});

	it("tests arrow button 'arrow-click' event (F4)",  () => {
		cy.mount(<SplitButton id="sbDefault" design="Default" onArrowClick={cy.stub().as("arrowClicked")}>Default</SplitButton>);

		cy.get("#sbDefault")
		.as("splitButton");

		cy.get("@splitButton")
			.shadow()
			.find(".ui5-split-arrow-button")
			.realClick();

		cy.get("@splitButton")
			.realPress("F4");

		cy.get("@arrowClicked")
			.should("have.been.calledTwice");
	});

 	it("tests arrow button aria attributes", () => {
		cy.mount(
			<>
				<SplitButton id="splitBtnWithMenuDefault">openMenu</SplitButton>
				<Menu id="menu">
					<MenuItem text="New File" accessible-name="Opens a file explorer" additional-text="Ctrl+Alt+Shift+N" icon="add-document"></MenuItem>
				</Menu>
			</>
		)

		cy.get("#splitBtnWithMenuDefault")
			.as("splitButton");

		cy.get("@splitButton")
			.shadow()
			.find(".ui5-split-arrow-button")
			.as("arrowButton");

		cy.get("@arrowButton")
			.should("have.attr", "tooltip", "Open Menu");

		cy.get("@arrowButton")
			.shadow()
			.find("button")
			.should("have.attr", "aria-haspopup", "menu");
 	});
});



