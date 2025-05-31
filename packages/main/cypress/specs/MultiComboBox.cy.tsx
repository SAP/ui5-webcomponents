import MultiComboBox from "../../src/MultiComboBox.js";
import MultiComboBoxItem from "../../src/MultiComboBoxItem.js";
import Link from "../../src/Link.js";
import Input from "../../src/Input.js";

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

describe("Keyboard interaction when pressing Ctrl + Alt + F8 for navigation", () => {
	beforeEach(() => {
		cy.mount(<>
			<MultiComboBox valueState="Negative">
				<div slot="valueStateMessage">
					Custom error value state message with a <Link href="#">Link</Link>  <Link href="#">Second Link</Link>.
				</div>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
			<Input id="nextInput" class="input2auto" placeholder="Next input"></Input>
		</>);
	});
	it("Should move the focus from the MultiComboBox to the first link in the value state message", () => {
		cy.get("ui5-multi-combobox")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("ui5-multi-combobox")
		.as("multi-combobox");

		cy.get("@innerInput")
			.realClick()
			.realPress(["Control", "Alt", "F1"]);

		cy.get("@multi-combobox")
			.shadow()
			.find("ui5-popover")
			.as("popover")
			.should("have.class", "ui5-valuestatemessage-popover");

		cy.get("@popover")
			.should("have.attr", "open")

		cy.get("ui5-link")
			.eq(0)
			.should("have.focus");
	});
	it("When pressing [Tab], the focus moves to the next value state message link. Pressing [Tab] again closes the popup and moves the focus to the next input", () => {
		cy.get("ui5-multi-combobox")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("ui5-multi-combobox")
			.as("multi-combobox");

		cy.get("ui5-input")
			.as("input");

		cy.get("@innerInput")
			.realClick()
			.realPress(["Control", "Alt", "F1"]);

		cy.get("@multi-combobox")
			.shadow()
			.find("ui5-popover")
			.as("ui5-popover")
			.should("have.attr", "open");

		cy.get("ui5-link")
			.eq(0)
			.as("firstLink")
			.should("have.focus");

		cy.get("@firstLink")
			.realPress("Tab");

		cy.get("@firstLink")
			.should("not.have.focus");

		cy.get("ui5-link")
			.eq(1)
			.as("secondLink")
			.should("have.focus");

		cy.get("@secondLink")
			.realPress("Tab");

		cy.get("@input")
			.should("have.focus");
	});
	it("Pressing [Shift + Tab] moves the focus from the second link in the value state message to the first one. Pressing it again shifts the focus to the MultiComboBox", () => {
		cy.get("ui5-multi-combobox")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("ui5-multi-combobox")
			.as("multi-combobox");

		cy.get("@innerInput")
			.realClick()
			.realPress(["Control", "Alt", "F1"]);

		cy.get("@multi-combobox")
			.shadow()
			.find("ui5-popover")
			.as("ui5-popover")
			.should("have.attr", "open");

		cy.get("ui5-link")
			.eq(0)
			.as("firstLink")
			.should("have.focus");

		cy.get("@firstLink")
			.realPress("Tab");

		cy.get("@firstLink")
			.should("not.have.focus");

		cy.get("ui5-link")
			.eq(1)
			.as("secondLink")
			.should("have.focus");

		cy.get("@secondLink")
			.realPress(["Shift", "Tab"]);

		cy.get("@firstLink")
			.should("have.focus");

		cy.get("@firstLink")
			.realPress(["Shift", "Tab"]);

		cy.get("@innerInput")
			.should("have.focus");

	});
	it("When pressing [Down Arrow] while focused on the first value state message link and suggestions are open, the focus shifts to the next suggestion item ", () => {
		cy.get("ui5-multi-combobox")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("ui5-multi-combobox")
			.as("multi-combobox");

		cy.get("@innerInput")
			.realClick()
			.realPress(["Control", "Alt", "F1"]);

		cy.get("@multi-combobox")
			.shadow()
			.find("ui5-responsive-popover")
			.as("popover");

		cy.get("@multi-combobox")
			.realClick();

		cy.get("@multi-combobox")
			.realType("i");

		cy.get("@popover")
			.should("have.attr", "open");

		cy.get("@innerInput")
			.realClick()
			.realPress(["Control", "Alt", "F1"]);

		cy.get("ui5-link")
			.as("firstLink")
			.should("have.focus");

		cy.get("@firstLink")
			.realPress("ArrowDown");

		cy.get("@multi-combobox")
			.should("have.attr", "value", "Item 1")
			.should("have.focus");
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
