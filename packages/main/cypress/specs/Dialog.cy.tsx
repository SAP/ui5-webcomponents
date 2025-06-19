import "@ui5/webcomponents-base/dist/features/F6Navigation.js";
import Dialog from "../../src/Dialog.js";
import Label from "../../src/Label.js";
import Toolbar from "../../src/Toolbar.js";
import ToolbarButton from "../../src/ToolbarButton.js";
import Tokenizer from "../../src/Tokenizer.js";
import Token from "../../src/Token.js";

describe("Keyboard", () => {
	it("TAB navigation", () => {
		cy.mount(
			<>
				<button id="buttonId"></button>
				<Dialog id="dialogId">
					<Toolbar slot="footer">
						<ToolbarButton
							id="toolbarButtonId"
							design="Emphasized"
							text="Submit"
						></ToolbarButton>
					</Toolbar>
				</Dialog>
			</>
		);

		cy.get("#dialogId")
			.invoke("prop", "open", true);

		cy.get("#dialogId")
			.should("be.visible");

		cy.get("#toolbarButtonId")
			.should("be.focused");

		cy.realPress(["Tab"]);

		cy.get("#toolbarButtonId")
			.should("be.focused");

		cy.realPress(["Shift", "Tab"]);

		cy.get("#toolbarButtonId")
			.should("be.focused");
	});

	it("F6 navigation", () => {
		cy.mount(
			<>
				<button data-sap-ui-fastnavgroup="true" id="test"></button>
				<Dialog open={true}>
					<div data-sap-ui-fastnavgroup="true">
						<button id="first">First group focusable</button>
					</div>
					<div data-sap-ui-fastnavgroup="true">
						<button id="second">Second group focusable</button>
					</div>
				</Dialog>
				<button data-sap-ui-fastnavgroup="true"></button>
			</>
		);

		cy.get("#first")
			.should("be.focused");

		cy.realPress(["Shift", "F6"]);

		cy.get("#second")
			.should("be.focused");

		cy.realPress(["Shift", "F6"]);

		cy.get("#first")
			.should("be.focused");

		cy.realPress("F6");

		cy.get("#second")
			.should("be.focused");

		cy.realPress("F6");

		cy.get("#first")
			.should("be.focused");
	});
});

describe("Initial Focus", () => {
	it("Tokenizer focusing", () => {
		cy.mount(
			<>
				<Dialog id="dialogId" headerText="Tokens">
					<Tokenizer id="tokenizer">
						<Token text="Token 1" id="token1"/>
						<Token text="Token 2" id="token2"/>
					</Tokenizer>
				</Dialog>
			</>
		);

		// Wait tokenizer item navigation to be initialized
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(100);

		cy.get("#dialogId")
			.invoke("prop", "open", true);

		cy.get("#token1")
			.should("be.visible");

		cy.get("#token1")
			.should("be.focused");
	});
});

describe("Accessibility", () => {
	it("Dialog accessibleDescriptionRef Tests", () => {
		cy.mount(
			<>
				<Label id="lblDesc1">FirstDesc</Label>
				<Label id="lblDesc2">SecondDesc</Label>
				<Label id="lblDesc3">ThirdDesc</Label>
				<Dialog id="dialog" accessibleDescriptionRef="lblDesc1 lblDesc3"></Dialog>
			</>
		);

		// assert
		cy.get("#dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "FirstDesc ThirdDesc");

		// act - update text of referenced label
		cy.get("#lblDesc1")
			.then($el => {
				$el.get(0).innerHTML = "First Label Desc";
			});

		// assert
		cy.get("#dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "First Label Desc ThirdDesc");

		// act - update accessible-description-ref
		cy.get("#dialog")
			.invoke("attr", "accessible-description-ref", "lblDesc2");

		// assert
		cy.get("#dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "SecondDesc");

		// act - update accessible-description-ref
		cy.get("#dialog")
			.invoke("attr", "accessible-description-ref", "lblDesc3");

		// assert
		cy.get("#dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "ThirdDesc");

		// act - remove accessible-description-ref
		cy.get("#dialog")
			.invoke("removeAttr", "accessible-description-ref");

		// assert
		cy.get("#dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("not.have.text", "");
	});

	it("Dialog accessibleDescription Tests", () => {
		cy.mount(
			<>
				<Dialog id="dialog" accessibleDescription="Some description added by accessibleDescription"></Dialog>
			</>
		);
		// assert
		cy.get("#dialog")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "aria-describedby",  "accessibleDescription");

		cy.get("#dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "Some description added by accessibleDescription");

		// act - update accessible-description
		cy.get("#dialog")
			.invoke("attr", "accessible-description", "Some description added by accessibleDescription");

		// assert
		cy.get("#dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "Some description added by accessibleDescription");

		// act - remove accessible-description
		cy.get("#dialog")
			.invoke("removeAttr", "accessible-description");

		// assert
		cy.get("#dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("not.have.text", "");
	});

	// both
	it("Dialog accessibleDescriptionRef and accessibleDescription Tests", () => {
		cy.mount(
			<>
				<Label id="lblDesc1">FirstDesc</Label>
				<Label id="lblDesc2">SecondDesc</Label>
				<Dialog id="dialog" accessibleDescriptionRef="lblDesc1" accessibleDescription="Some description added by accessibleDescription"></Dialog>
			</>
		);

		// assert - accessibleDescription is used
		cy.get("#dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "FirstDesc");

		// act - update text of referenced label
		cy.get("#lblDesc1")
			.then($el => {
				$el.get(0).innerHTML = "First Label Desc";
			});

		// assert - accessibleDescriptionRef is used
		cy.get("#dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "First Label Desc");

		// act - remove accessible-description-ref
		cy.get("#dialog")
			.invoke("removeAttr", "accessible-description-ref");

		// assert - accessibleDescription is used
		cy.get("#dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "Some description added by accessibleDescription");

		// act - remove accessible-description
		cy.get("#dialog")
			.invoke("removeAttr", "accessible-description");

		// assert - accessibleDescriptionRef is used
		cy.get("#dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("not.have.text", "");
	});
});

describe("Events", () => {
	it("before-open", () => {
		cy.mount(
			<>
				<Dialog id="dialogId">
					<div data-sap-ui-fastnavgroup="true">
						<button id="first">First group focusable</button>
					</div>
					<div data-sap-ui-fastnavgroup="true">
						<button id="second">Second group focusable</button>
					</div>
				</Dialog>
			</>
		);

		cy.get("#dialogId")
			.should("not.be.visible");

		const preventDefault = (e : Event) => {
			e.preventDefault();
		};

		cy.get("#dialogId").then($dialog => {
			$dialog.get(0).addEventListener("before-open", preventDefault);
		});

		cy.get("#dialogId")
			.invoke("prop", "open", true);

		cy.get("#dialogId")
			.should("not.be.visible");

		cy.get("#dialogId").then($dialog => {
			$dialog.get(0).removeEventListener("before-open", preventDefault);
		});

		cy.get("#dialogId")
			.invoke("prop", "open", true);

		cy.get("#dialogId")
			.should("be.visible");
	});

	it("before-close", () => {
		cy.mount(
			<>
				<Dialog id="dialogId">
					<div data-sap-ui-fastnavgroup="true">
						<button id="first">First group focusable</button>
					</div>
					<div data-sap-ui-fastnavgroup="true">
						<button id="second">Second group focusable</button>
					</div>
				</Dialog>
			</>
		);

		cy.get("#dialogId")
			.invoke("prop", "open", true);

		cy.get("#dialogId")
			.should("be.visible");

		const preventDefault = (e : Event) => {
			e.preventDefault();
		};

		cy.get("#dialogId").then($dialog => {
			$dialog.get(0).addEventListener("before-close", preventDefault);
		});

		cy.get("#dialogId")
			.invoke("prop", "open", false);

		cy.get("#dialogId")
			.should("be.visible");

		cy.get("#dialogId").then($dialog => {
			$dialog.get(0).removeEventListener("before-close", preventDefault);
		});

		cy.get("#dialogId")
			.invoke("prop", "open", false);

		cy.get("#dialogId")
			.should("not.be.visible");
	});
});
