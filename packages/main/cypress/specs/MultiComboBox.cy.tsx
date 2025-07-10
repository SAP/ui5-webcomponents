import MultiComboBox from "../../src/MultiComboBox.js";
import MultiComboBoxItem from "../../src/MultiComboBoxItem.js";
import type ResponsivePopover from "../../src/ResponsivePopover.js";

describe("Security", () => {
	it("tests setting malicious text to items", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="<script>alert('XSS')</script>"></MultiComboBoxItem>
				<MultiComboBoxItem text="<b onmouseover=alert('XSS')></b>"></MultiComboBoxItem>
				<MultiComboBoxItem text="Albania<button onClick='alert(1)'>alert</button>"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-mcb-item]")
			.eq(0)
			.shadow()
			.find(".ui5-li-title")
			.should("have.text", "<script>alert('XSS')</script>");

		cy.get("[ui5-mcb-item]")
			.eq(1)
			.shadow()
			.find(".ui5-li-title")
			.should("have.text", "<b onmouseover=alert('XSS')></b>");

		cy.get("[ui5-mcb-item]")
			.eq(2)
			.shadow()
			.find(".ui5-li-title")
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
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.realPress("t");

		cy.realPress('Enter');

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.then($tokenizer => {
				$tokenizer[0].addEventListener("ui5-token-delete", cy.stub().as("tokenDelete"))
			});

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("exist")
			.and("have.length", 1);

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		cy.get("@tokenDelete")
			.should("have.been.called");
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
		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.then(mcb => {
				mcb.get(0).addEventListener("input", e => {
					(mcb.get(0) as MultiComboBox).valueState = (e.target as MultiComboBox).value.length ? "Negative" : "Information";
				});
			});

		cy.get("@mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		// type "f"
		cy.realType("f");

		cy.get("@mcb")
			.shadow()
			.find(".ui5-valuestatemessage--error")

		cy.realPress("Backspace");

		cy.get("@mcb")
			.shadow()
			.find(".ui5-valuestatemessage--information")

		cy.realPress("f");

		cy.get("@mcb")
			.shadow()
			.find(".ui5-valuestatemessage--information")
			.should("not.exist");
	});
});

describe("Event firing", () => {
	it("tests if open and close events are fired correctly", () => {
		cy.mount(
			<MultiComboBox onOpen={cy.stub().as("mcbOpened")} onClose={cy.stub().as("mcbClosed")}>
				<MultiComboBoxItem text="Algeria"></MultiComboBoxItem>
				<MultiComboBoxItem text="Bulgaria"></MultiComboBoxItem>
				<MultiComboBoxItem text="England"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.then($mcb => {
				$mcb[0].addEventListener("focusin", () => {
					$mcb[0].setAttribute("open", "true");
				});
			});

		cy.get("@mcb")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened()

		cy.get("@mcbOpened")
			.should("have.been.calledOnce");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-icon]")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverClosed();

		cy.get("@icon")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened()

		cy.get("@mcbClosed")
			.should("have.been.calledOnce");

		cy.get("@mcbOpened")
			.should("have.been.calledTwice");
	});
});

describe("MultiComboBox RTL/LTR Arrow Navigation", () => {
	it("should focus last token on arrow right in RTL mode when input is at start", () => {
		cy.mount(
			<div dir="rtl">
				<MultiComboBox noValidation={true}>
					<MultiComboBoxItem selected text="Token 1"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 2"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 3"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 4"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 5"></MultiComboBoxItem>
				</MultiComboBox>
			</div>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();
		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.then(($input) => {
				($input[0] as HTMLInputElement).setSelectionRange(0, 0);
			})
			.should(($input) => {
				expect(($input[0] as HTMLInputElement).selectionStart).to.equal(0);
			});

		cy.get("@mcb").realPress("ArrowRight");
		cy.focused().should("have.class", "ui5-token--wrapper");
	});

	it("should focus last token on arrow left in LTR mode when input is at start", () => {
		cy.mount(
			<div dir="ltr">
				<MultiComboBox noValidation={true}>
					<MultiComboBoxItem selected text="Token 1"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 2"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 3"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 4"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 5"></MultiComboBoxItem>
				</MultiComboBox>
			</div>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");
			
		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.realClick()
			.should("have.focus")
			.then(($input) => {
				($input[0] as HTMLInputElement).setSelectionRange(0, 0);
			})
			.should(($input) => {
				expect(($input[0] as HTMLInputElement).selectionStart).to.equal(0);
			});

		cy.get("@mcb").realPress("ArrowLeft");		
		cy.focused().should("have.class", "ui5-token--wrapper");
	});

	it("should not focus token when cursor is not at start of input in RTL mode", () => {
		cy.mount(
			<div dir="rtl">
				<MultiComboBox noValidation={true} value="test text">
					<MultiComboBoxItem selected text="Token 1"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 2"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 3"></MultiComboBoxItem>
				</MultiComboBox>
			</div>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb").should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.realClick()
			.should("be.focused")
			.then(($input) => {
				($input[0] as HTMLInputElement).setSelectionRange(2, 2);
			});

		cy.get("@mcb").realPress("ArrowRight");
		cy.focused().should("not.have.class", "ui5-token--wrapper");
	});

	it("should not focus token when text is selected in RTL mode", () => {
		cy.mount(
			<div dir="rtl">
				<MultiComboBox noValidation={true} value="test">
					<MultiComboBoxItem selected text="Token 1"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 2"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 3"></MultiComboBoxItem>
				</MultiComboBox>
			</div>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();
			
		cy.get("@mcb").should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.realClick()
			.realPress(["Control", "a"]);

		cy.get("@input")
			.should(($input) => {
				expect(($input[0] as HTMLInputElement).selectionStart).to.equal(0);
				expect(($input[0] as HTMLInputElement).selectionEnd).to.equal(4);
			});

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.as ("lastToken");

		cy.focused().should("not.have.class", "ui5-token--wrapper");
	});

	it("should navigate from last token back to input with arrow left in RTL mode", () => {
		cy.mount(
			<div dir="rtl">
				<MultiComboBox noValidation={true}>
					<MultiComboBoxItem selected text="Token 1"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 2"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 3"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 4"></MultiComboBoxItem>
				</MultiComboBox>
			</div>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick()
			
		cy.get("@mcb")
			.should("be.focused")
			.realPress("ArrowRight");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.as("lastToken");

		cy.get("@lastToken").should("be.visible");
		cy.get("@lastToken").should("be.focused");
		cy.get("@lastToken").realPress("ArrowLeft");

		cy.focused().should("not.have.class", "ui5-token--wrapper");
	});

	it("should navigate from last token back to input with arrow right in LTR mode", () => {
		cy.mount(
			<div dir="ltr">
				<MultiComboBox noValidation={true}>
					<MultiComboBoxItem selected text="Token 1"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 2"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 3"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 4"></MultiComboBoxItem>
				</MultiComboBox>
			</div>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();
			
		cy.get("@mcb")
			.should("be.focused")
			.realPress("ArrowLeft");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.realPress("ArrowRight");
		
		cy.focused().should("not.have.class", "ui5-token--wrapper");
	});

	it("should handle empty input case in RTL mode", () => {
		cy.mount(
			<div dir="rtl">
				<MultiComboBox noValidation={true}>
					<MultiComboBoxItem selected text="Token 1"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 2"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 3"></MultiComboBoxItem>
				</MultiComboBox>
			</div>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb").should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.realClick()
			.should("have.focus")
		
			cy.get("@input")
			.should("have.value", "")
			.should(($input) => {
				expect(($input[0] as HTMLInputElement).selectionStart).to.equal(0);
			});

		cy.get("@mcb").realPress("ArrowRight");
		debugger;
		cy.focused().should("have.class", "ui5-token--wrapper");
	});
});

describe("Accessibility", () => {
	it("should announce the associated label when MultiComboBox is focused", () => {
		const label = "MultiComboBox aria-label";

		cy.mount(
			<>
				<label for="mcb">{label}</label>
				<MultiComboBox id="mcb"></MultiComboBox>
			</>
		);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.attr", "aria-label", label);
	});
});
