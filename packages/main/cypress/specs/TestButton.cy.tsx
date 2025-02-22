import TestButton from "../../src/TestButton.js";
import TestButtonState from "../../src/TestButtonState.js";
import ai from "@ui5/webcomponents-icons/dist/ai.js";

["Default", "Emphasized", "Transparent"].forEach(design => {
	describe(`${design} button - eventing and keyboard`, () => {
		beforeEach(() => {
			cy.mount(<>
				<button id="before"></button>
				<TestButton design={design} >
					<TestButtonState icon={ai} text="Some text" showArrowButton={true} />
				</TestButton>
				<button id="after"></button>
			</>);
		});
		it("Tab", () => {
			cy.get("#before")
				.realClick();

			cy.get("#before")
				.should("be.focused");

			cy.realPress("Tab");

			cy.get("[test-button]")
				.shadow()
				.find(".test-button-root")
				.should("be.focused");

			cy.realPress("Tab");

			cy.get("#after")
				.should("be.focused");
		});

		it("Readonly focus", () => {
			cy.get("[test-button]")
				.invoke("attr", "readonly", true);

			cy.get("[test-button]")
				.shadow()
				.find(".test-button-root")
				.should("have.attr", "tabindex", "-1");

			cy.get("#before")
				.realClick();

			cy.get("#before")
				.should("be.focused");

			cy.realPress("Tab");

			cy.get("#after")
				.should("be.focused");
		});

		it("Readonly focus with click", () => {
			cy.get("[test-button]")
				.invoke("attr", "readonly", true);

			cy.get("[test-button]")
				.realClick();

			cy.get("[test-button]")
				.shadow()
				.find(".test-button-root")
				.should("have.attr", "tabindex", "-1");

			cy.get("[test-button]")
				.should("not.be.focused");

			cy.get("[test-button]")
				.shadow()
				.find(".test-button-root")
				.should("not.be.focused");

			cy.get("[test-button]")
				.shadow()
				.find("#main-btn")
				.should("not.be.focused");

			cy.get("[test-button]")
				.shadow()
				.find("#arrow-btn")
				.should("not.be.focused");
		});

		["#main-btn", "#arrow-btn"].forEach(id => {
			it(`${id} Tab from main button`, () => {
				cy.mount(<>
					<button id="before"></button>
					<TestButton>
						<TestButtonState icon={ai} text="Some text" showArrowButton={true} />
					</TestButton>
					<button id="after"></button>
				</>);

				cy.get("[test-button]")
					.shadow()
					.find(id)
					.realClick();

				cy.get("[test-button]")
					.shadow()
					.find(id)
					.should("be.focused");

				cy.realPress("Tab");

				cy.get("#after")
					.should("be.focused");
			});

			it(`${id} Shift + Tab from main button`, () => {
				cy.mount(<>
					<button id="before"></button>
					<TestButton>
						<TestButtonState icon={ai} text="Some text" showArrowButton={true} />
					</TestButton>
					<button id="after"></button>
				</>);

				cy.get("[test-button]")
					.shadow()
					.find(id)
					.realClick();

				cy.get("[test-button]")
					.shadow()
					.find(id)
					.should("be.focused");

				cy.realPress(["Shift", "Tab"]);

				cy.get("#before")
					.should("be.focused");
			});
		});

		it("Enter", () => {
			cy.get("[test-button]")
				.then($el => {
					$el[0].addEventListener("ui5-click", cy.stub().as("clicked"));
					$el[0].addEventListener("ui5-arrow-click", cy.stub().as("arrowClicked"));
				});

			cy.get("#before")
				.realClick();

			cy.get("#before")
				.should("be.focused");

			cy.realPress("Tab");

			cy.get("[test-button]")
				.shadow()
				.find(".test-button-root")
				.should("be.focused");

			cy.realPress("Enter");

			cy.get("@clicked")
				.should("have.been.calledOnce");

			cy.get("@arrowClicked")
				.should("not.have.been.calledOnce");
		});

		it("Space", () => {
			cy.get("[test-button]")
				.then($el => {
					$el[0].addEventListener("ui5-click", cy.stub().as("clicked"));
					$el[0].addEventListener("ui5-arrow-click", cy.stub().as("arrowClicked"));
				});

			cy.get("#before")
				.realClick();

			cy.get("#before")
				.should("be.focused");

			cy.realPress("Tab");

			cy.get("[test-button]")
				.shadow()
				.find(".test-button-root")
				.should("be.focused");

			cy.realPress("Space");

			cy.get("@clicked")
				.should("have.been.calledOnce");

			cy.get("@arrowClicked")
				.should("not.have.been.calledOnce");
		});

		it("#main-btn click", () => {
			cy.get("[test-button]")
				.then($el => {
					$el[0].addEventListener("ui5-click", cy.stub().as("clicked"));
					$el[0].addEventListener("ui5-arrow-click", cy.stub().as("arrowClicked"));
				});

			cy.get("[test-button]")
				.shadow()
				.find("#main-btn")
				.realClick();

			cy.get("[test-button]")
				.shadow()
				.find("#main-btn")
				.should("be.focused");

			cy.get("@clicked")
				.should("have.been.calledOnce");

			cy.get("@arrowClicked")
				.should("not.have.been.calledOnce");
		});

		it("#main-btn Enter", () => {
			cy.get("[test-button]")
				.shadow()
				.find("#main-btn")
				.realClick();

			cy.get("[test-button]")
				.shadow()
				.find("#main-btn")
				.should("be.focused");

			cy.get("[test-button]")
				.then($el => {
					$el[0].addEventListener("ui5-click", cy.stub().as("clicked"));
					$el[0].addEventListener("ui5-arrow-click", cy.stub().as("arrowClicked"));
				});

			cy.realPress("Enter");

			cy.get("@clicked")
				.should("have.been.calledOnce");

			cy.get("@arrowClicked")
				.should("not.have.been.calledOnce");
		});

		it("#main-btn Space", () => {
			cy.get("[test-button]")
				.shadow()
				.find("#main-btn")
				.realClick();

			cy.get("[test-button]")
				.shadow()
				.find("#main-btn")
				.should("be.focused");

			cy.get("[test-button]")
				.then($el => {
					$el[0].addEventListener("ui5-click", cy.stub().as("clicked"));
					$el[0].addEventListener("ui5-arrow-click", cy.stub().as("arrowClicked"));
				});

			cy.realPress("Space");

			cy.get("@clicked")
				.should("have.been.calledOnce");

			cy.get("@arrowClicked")
				.should("not.have.been.calledOnce");
		});

		it("#arrow-btn click", () => {
			cy.get("[test-button]")
				.then($el => {
					$el[0].addEventListener("ui5-click", cy.stub().as("clicked"));
					$el[0].addEventListener("ui5-arrow-click", cy.stub().as("arrowClicked"));
				});

			cy.get("[test-button]")
				.shadow()
				.find("#arrow-btn")
				.realClick();

			cy.get("[test-button]")
				.shadow()
				.find("#arrow-btn")
				.should("be.focused");

			cy.get("@clicked")
				.should("not.have.been.calledOnce");

			cy.get("@arrowClicked")
				.should("have.been.calledOnce");
		});

		it("#arrow-btn Enter", () => {
			cy.get("[test-button]")
				.shadow()
				.find("#arrow-btn")
				.realClick();

			cy.get("[test-button]")
				.shadow()
				.find("#arrow-btn")
				.should("be.focused");

			cy.get("[test-button]")
				.then($el => {
					$el[0].addEventListener("ui5-click", cy.stub().as("clicked"));
					$el[0].addEventListener("ui5-arrow-click", cy.stub().as("arrowClicked"));
				});

			cy.realPress("Enter");

			cy.get("@clicked")
				.should("not.have.been.calledOnce");

			cy.get("@arrowClicked")
				.should("have.been.calledOnce");
		});

		it("#arrow-btn Space", () => {
			cy.get("[test-button]")
				.shadow()
				.find("#arrow-btn")
				.realClick();

			cy.get("[test-button]")
				.shadow()
				.find("#arrow-btn")
				.should("be.focused");

			cy.get("[test-button]")
				.then($el => {
					$el[0].addEventListener("ui5-click", cy.stub().as("clicked"));
					$el[0].addEventListener("ui5-arrow-click", cy.stub().as("arrowClicked"));
				});

			cy.realPress("Space");

			cy.get("@clicked")
				.should("not.have.been.calledOnce");

			cy.get("@arrowClicked")
				.should("have.been.calledOnce");
		});
	});
});
