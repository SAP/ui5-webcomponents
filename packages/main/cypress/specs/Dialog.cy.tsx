import "@ui5/webcomponents-base/dist/features/F6Navigation.js";
import Dialog from "../../src/Dialog.js";

describe("Keyboard", () => {
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
