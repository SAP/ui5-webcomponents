import MultiComboBox from "../../src/MultiComboBox.js";
import MultiComboBoxItem from "../../src/MultiComboBoxItem.js";

describe("Security", () => {
	it("tests setting malicious text to items", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="<script>alert('XSS')</script>"></MultiComboBoxItem>
				<MultiComboBoxItem text="<b onmouseover=alert('XSS')></b>"></MultiComboBoxItem>
				<MultiComboBoxItem text="Albania<button onClick='alert(1)'>alert</button>"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("ui5-mcb-item").eq(0).shadow().find(".ui5-li-title")
			.should("have.text", "<script>alert('XSS')</script>");
		cy.get("ui5-mcb-item").eq(1).shadow().find(".ui5-li-title")
			.should("have.text", "<b onmouseover=alert('XSS')></b>");
		cy.get("ui5-mcb-item").eq(2).shadow().find(".ui5-li-title")
			.should("have.text", "Albania<button onClick='alert(1)'>alert</button>");
	});
});

describe("General interaction", () => {
	it("should be able to delete long tokens", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="This is a token with ridicilously long long long text which should be deletable when the 'x' icon is clicked"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.type('t');

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.realPress('Enter');

		cy.get("[ui5-multi-combobox]").shadow().find("[ui5-tokenizer]").then($tokenizer => {
			$tokenizer[0].addEventListener("ui5-token-delete", cy.stub().as("tokenDelete"))
		});

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-multi-combobox]").shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]").shadow()
			.find("[ui5-icon]").realClick();

		cy.get("@tokenDelete").should("have.been.called");
	});
});

describe("Value State", () => {
	it("should be able to change value states upon typing", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		// add event listener
		cy.get("ui5-multi-combobox")
			.then(mcb => {
				mcb.get(0).addEventListener("input", e => {
					(mcb.get(0) as MultiComboBox).valueState = (e.target as MultiComboBox).value.length ? "Negative" : "Information";
				});
			});

		// type "f"
		cy.get("ui5-multi-combobox")
			.shadow()
			.find("input")
			.realType("f");

		cy.realPress("Backspace");

		cy.get("ui5-multi-combobox")
			.shadow()
			.find("input")
			.realPress("f");

		cy.get("ui5-multi-combobox")
			.shadow()
			.find(".ui5-valuestatemessage--information")
			.should("not.exist");
	});
});

describe("Event firing", () => {
	it("tests if open and close events are fired correctly", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Algeria"></MultiComboBoxItem>
				<MultiComboBoxItem text="Bulgaria"></MultiComboBoxItem>
				<MultiComboBoxItem text="England"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("ui5-multi-combobox")
			.as("multiComboBox");

		cy.get("@multiComboBox")
			.then($mcb => {
				$mcb[0].addEventListener("focusin", () => {
					$mcb[0].setAttribute("open", "true");
				});
			});

		cy.get("@multiComboBox")
			.then($mcb => {
				$mcb[0].addEventListener("ui5-open", cy.stub().as("mcbOpened"));
			});

		cy.get("@multiComboBox")
			.then($mcb => {
				$mcb[0].addEventListener("ui5-close", cy.stub().as("mcbClosed"));
			});

		cy.get("@multiComboBox")
			.shadow()
			.find("input")
			.as("input");

		cy.get("@input")
			.click();

		cy.get("@multiComboBox")
			.shadow()
			.find("ui5-responsive-popover")
			.as("respPopover");

		cy.get("@respPopover")
			.should("have.attr", "open");

		cy.get("@mcbOpened")
			.should("have.been.calledOnce");

		cy.get("@multiComboBox")
			.shadow()
			.find("ui5-icon")
			.as("icon");

		cy.get("@icon")
			.click();

		cy.get("@icon")
			.click();

		cy.get("@mcbClosed")
			.should("have.been.calledOnce");

		cy.get("@mcbOpened")
			.should("have.been.calledTwice");
	});
});

describe("Accessibility", () => {
	it("should announce the associated label when MultiComboBox is focused", () => {
		cy.mount(
			<>
				<label for="mcb">MultiComboBox aria-label</label>
				<MultiComboBox id="mcb"></MultiComboBox>
			</>
		);

		cy.get('label[for="mcb"]')
			.invoke('text')
			.then((labelText) => {

				cy.get("[ui5-multi-combobox]")
					.shadow()
					.find("input")
					.as("innerInput");

				cy.get("@innerInput")
					.click();

				cy.get("@innerInput")
					.should("have.attr", "aria-label", labelText);
			});
	});
});
