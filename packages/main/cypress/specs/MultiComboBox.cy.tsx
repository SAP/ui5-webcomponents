import MultiComboBox from "../../src/MultiComboBox.js";
import MultiComboBoxItem from "../../src/MultiComboBoxItem.js";
import MultiComboBoxItemGroup from "../../src/MultiComboBoxItemGroup.js";
import ResponsivePopover from "../../src/ResponsivePopover.js";
import Button from "../../src/Button.js";
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
			.realClick()
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
			.realClick()
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
		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("[ui5-multi-combobox]")
			.as("multi-combobox");

		cy.get("@innerInput")
			.realClick()
			.should("be.focused");

		cy.realPress(["Control", "Alt", "F8"]);

		cy.get("@multi-combobox")
			.shadow()
			.find("ui5-popover")
			.as("popover")
			.should("have.class", "ui5-valuestatemessage-popover");

		cy.get("@popover")
			.should("have.attr", "open")

		cy.get("[ui5-link]")
			.eq(0)
			.should("have.focus");
	});

	it("When pressing [Tab], the focus moves to the next value state message link. Pressing [Tab] again closes the popup and moves the focus to the next input", () => {
		cy.get("[ui5-multi-combobox]")
			.as("multi-combobox");

		cy.get("@multi-combobox")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("@innerInput")
			.realClick()
			.should("be.focused");

		cy.realPress(["Control", "Alt", "F8"]);

		cy.get("@multi-combobox")
			.shadow()
			.find("ui5-popover")
			.as("ui5-popover")
			.should("have.attr", "open");

		cy.get("[ui5-link]")
			.eq(0)
			.as("firstLink")
			.should("have.focus");

		cy.get("@firstLink")
			.realPress("Tab");

		cy.get("@firstLink")
			.should("not.have.focus");

		cy.get("[ui5-link]")
			.eq(1)
			.as("secondLink")
			.should("have.focus");

		cy.get("@secondLink")
			.realPress("Tab");

		cy.get("[ui5-input]")
			.as("input");

		cy.get("@input")
			.should("have.focus");
	});

	it("Pressing [Shift + Tab] moves the focus from the second link in the value state message to the first one. Pressing it again shifts the focus to the MultiComboBox", () => {
		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("[ui5-multi-combobox]")
			.as("multi-combobox");

		cy.get("@innerInput")
			.realClick()
			.should("be.focused");

		cy.realPress(["Control", "Alt", "F8"]);

		cy.get("@multi-combobox")
			.shadow()
			.find("ui5-popover")
			.as("ui5-popover")
			.should("have.attr", "open");

		cy.get("[ui5-link]")
			.eq(0)
			.as("firstLink")
			.should("have.focus");

		cy.get("@firstLink")
			.realPress("Tab");

		cy.get("@firstLink")
			.should("not.have.focus");

		cy.get("[ui5-link]")
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

	it("When list item is selected and pressing [Ctrl + Alt + F8], first link is focused. [Arrow Down] moves focus to the first list item", () => {
		cy.get("[ui5-multi-combobox]")
			.as("multi-combobox");

		cy.get("@multi-combobox")
			.shadow()
			.find("input")
			.as("innerInput");

		// open the popover
		cy.get("@multi-combobox")
			.realClick()
			.should("be.focused");

		// focuses the fisrt list item
		cy.realPress("F4");

		cy.get("@multi-combobox")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-mcb-item]").eq(0).as("firstItem");

		cy.get("@firstItem").should("be.focused");

		// Focus moves from the first item to the link in the value state header
		cy.get("@firstItem").realPress(["Control", "Alt", "F8"]);

		cy.get("[ui5-link]")
			.eq(0)
			.as("firstLink");

		cy.focused().should("have.class", "ui5-link-root");

		// Focus moves from the link to the first list item
		cy.get("@firstLink").realPress("ArrowDown");

		cy.get("@firstItem").should("be.focused");
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
			.realClick()
			.should("be.focused");

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
	it.skip("should focus last token on arrow right in RTL mode when input is at start", () => {
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

	it.skip("should focus last token on arrow left in LTR mode when input is at start", () => {
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

	it.skip("should not focus token when cursor is not at start of input in RTL mode", () => {
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

	it.skip("should navigate from last token back to input with arrow left in RTL mode", () => {
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

		cy.focused().should("have.class", "ui5-token--wrapper");

		cy.get("@lastToken").realPress("ArrowLeft");

		cy.focused().should("not.have.class", "ui5-token--wrapper");
	});

	it.skip("should navigate from last token back to input with arrow right in LTR mode", () => {
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

	it.skip("should handle empty input case in RTL mode", () => {
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

		cy.get("@mcb").realPress("ArrowRight");		;
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

	it("checkbox should be presentational", () => {
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
			.shadow()
			.find("ui5-icon")
			.as("icon");

		cy.get("@icon")
			.click();

		cy.get("ui5-mcb-item")
			.eq(0)
			.shadow()
			.find("ui5-checkbox")
			.as("checkbox");

		cy.get("@checkbox")
			.shadow()
			.find("input[type='checkbox']")
			.should("not.exist");
		
		cy.get("@checkbox")
			.shadow()
			.find(".ui5-checkbox-root")
			.should("have.attr", "role", "presentation");

		cy.get("@checkbox")
			.shadow()
			.find(".ui5-checkbox-root")
			.should("not.have.attr", "tabindex");
	});
});

describe("Keyboard Handling", () => {
	it("Tests Backspace when combobox has an empty value and tokens", () => {
		cy.mount(
			<MultiComboBox style="width: 100%">
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 2);

		cy.get("[ui5-multi-combobox]")
			.realPress("Backspace");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.should("be.focused");
		
		cy.get("[ui5-multi-combobox]")
			.realPress("Backspace");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 1);
	});

	it("Value should be reset on ESC key", () => {
		cy.mount(
			<MultiComboBox style="width: 100%">
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.realPress("I");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.realPress("Escape");

		cy.get("[ui5-multi-combobox]")
			.realPress("Escape");
		
		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverClosed();

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "");
	});

	it("Value should not be reset on when focus goes out of the control, returns and ESC is pressed", () => {
		cy.mount(
			<>
				<Button id="btn"></Button>
				<MultiComboBox style="width: 100%" noTypeahead={true}>
					<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
				</MultiComboBox>
			</>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("I");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();

		cy.get("#btn")
			.realClick()
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.realPress("Escape");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "I");
	});

	it("Selects an item when enter is pressed and value matches a text of an item in the list", () => {
		cy.mount(
			<>
				<Button id="btn"></Button>
				<MultiComboBox style="width: 100%" noTypeahead={true}>
					<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
				</MultiComboBox>
			</>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realType("Item 1");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();

		cy.realPress("Enter");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverClosed();

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 1);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "");
	});

	it("Focuses the item group, then select all item checkbox on arrow up", () => {
		cy.mount(
			<MultiComboBox noValidation={true} showSelectAll={true}>
				<MultiComboBoxItemGroup headerText="Group 1">
					<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				</MultiComboBoxItemGroup>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("F4");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.should("not.be.focused");

		cy.realPress("ArrowUp");

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item-group]")
			.should("be.focused");

		cy.realPress("ArrowUp");

		cy.get("@popover")
			.find(".ui5-mcb-select-all-checkbox")
			.should("be.focused");
	});

	it("Focuses the item group, then select all item checkbox on arrow up", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("ArrowDown");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "Item 1");

		cy.realPress("ArrowDown");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "Item 2");

		cy.realPress("ArrowUp");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "Item 1");
	});

	it("Should only navigate through not already selected items with arrow keys when the picker is closed", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2" selected={true}></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 3"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("ArrowDown");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "Item 1");

		cy.realPress("ArrowDown");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "Item 3");
	});

	it("Should reset current inline navigation state on user input", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 3"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 4"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("ArrowDown");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "Item 1");

		cy.realPress("ArrowDown");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "Item 2");

		cy.realType("a");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "a");

		cy.realPress("ArrowDown");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "Item 1");
	});

	it("Arrow up when no item is selected should go to the last item", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 3"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 4"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("ArrowUp");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "Item 4");
	});

	it("Should focus input after all tokens are deleted", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("ArrowLeft");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.should("be.focused");

		cy.realPress(["Shift", "ArrowLeft"]);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.first()
			.should("be.focused");

		cy.realPress("Delete");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("not.exist");
		
		cy.get("[ui5-multi-combobox]")
			.should("be.focused");
	});

	it("First HOME should move caret to start of the input, second HOME should focus the first token, END should focus last token", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realType("123{home}");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.then(input => {
				return input.get(0).selectionStart;
			})
			.should("be.equal", 0);

		cy.realPress("Home");

		cy.wait(100);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.first()
			.should("be.focused");

		cy.realPress("End");

		cy.wait(100);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.should("be.focused");
	});

	it("CTRL + HOME focus the first item, CTRL + END should focus last item", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("F4");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.first()
			.should("be.focused");

		cy.realPress(["Meta", "End"]);

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.last()
			.should("be.focused");

		cy.realPress(["Meta", "Home"]);

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.first()
			.should("be.focused");
	});

	it("Should close the picker and focus the next element on TAB", () => {
		cy.mount(
			<>
				<MultiComboBox noValidation={true}>
					<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
					<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
				</MultiComboBox>
				<input id="dummy-input"></input>
			</>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("F4");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.first()
			.should("be.focused");

		cy.realPress("Tab");

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverClosed();

		cy.get("#dummy-input")
			.should("be.focused");
	});

	it("Should select/unselect next/previous item on shift+arrow", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 3"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 4"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("F4");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.first()
			.should("be.focused");

		cy.realPress("Space");

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.first()
			.should("have.attr", "selected");

		cy.realPress(["Shift", "ArrowDown"]);

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.eq(1)
			.should("have.attr", "selected");

		cy.realPress("ArrowDown");

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.eq(2)
			.should("be.focused");

		cy.realPress(["Shift", "ArrowUp"]);

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.eq(1)
			.should("not.have.attr", "selected");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 1);
	});

	it("Should move focus to the previous token with arrow left", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("ArrowLeft");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.should("be.focused");

		cy.realPress("ArrowLeft");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.first()
			.should("be.focused");
	});

	it("Should navigate through the items with CTRL + arrow up/down keys when the picker is closed", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 3"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress(["Meta", "ArrowDown"]);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "Item 1");

		cy.realPress(["Meta", "ArrowDown"]);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "Item 2");

		cy.realPress(["Meta", "ArrowUp"]);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "Item 1");
	});

	it("Focuses the first item on CTRL + arrow down then the input on CTRL + arrow up", () => {
		cy.mount(
			<>
				<MultiComboBox noValidation={true} open={true}>
					<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
				</MultiComboBox>
				<input id="dummy-input"></input>
			</>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.realPress(["Meta", "ArrowDown"]);

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.first()
			.should("be.focused");

		cy.realPress(["Meta", "ArrowUp"]);

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");
	});

	it("Should select all filtered items on CTRL+A", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Algeria"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Bulgaria"></MultiComboBoxItem>
				<MultiComboBoxItem text="England"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.realPress("F4");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.should("not.be.focused");

		cy.realPress(["Meta", "a"]);

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 3);
	});

	it("Should select a token with CTRL+SPACE", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("ArrowLeft");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.as("lastToken")
			.should("be.focused");

		cy.realPress(["Meta", "Space"]);

		cy.get("@lastToken")
			.should("have.attr", "selected");
	});

	it("CTRL+SPACE should do nothing when pressed in the input field", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress(["Meta", "Space"]);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "");
	});

	it("F4 should focus the selected item or the first one if there is no selected", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("F4");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.last()
			.should("be.focused");

		cy.realPress("Enter");

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverClosed();

		cy.realPress("F4");

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.first()
			.should("be.focused");
	});

	it("Alt + Down should focus the corresponding item to the token from which the combination is pressed", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 3"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("ArrowLeft");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.should("be.focused");

		cy.realPress(["Alt", "ArrowDown"]);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.last()
			.should("be.focused");
	});

	it("Alt + Down should focus the first item if no selected items are present", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 3"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress(["Alt", "ArrowDown"]);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.first()
			.should("be.focused");
	});

	it("Alt + Down should reset filtering", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="1"></MultiComboBoxItem>
				<MultiComboBoxItem text="2"></MultiComboBoxItem>
				<MultiComboBoxItem text="3"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realType("4");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverClosed();

		cy.realPress(["Alt", "ArrowDown"]);

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.first()
			.should("be.focused");
	});

	it("Alt + Down should focus the item corresponding to the text value", () => {
		cy.mount(
			<MultiComboBox noValidation={true} value="12">
				<MultiComboBoxItem text="1"></MultiComboBoxItem>
				<MultiComboBoxItem text="12"></MultiComboBoxItem>
				<MultiComboBoxItem text="123"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress(["Alt", "ArrowDown"]);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.eq(1)
			.should("be.focused");
	});

	it("Backspace deletes token and forwards the focus to the last token without collapsing the tokenizer", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 3"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("ArrowLeft");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.should("be.focused");

		cy.realPress("Backspace");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 2);
	});

	it("Backspace should not delete tokens, when MCB is readonly", () => {
		cy.mount(
			<MultiComboBox noValidation={true} readonly={true}>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 3"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("ArrowLeft");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.should("be.focused");

		cy.realPress("Backspace");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 3);
	});

	it("Should open/close popover on keyboard combination ctrl + i", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem selected={true} text="This is a token with ridicilously long long long long long long long long long long long long long long long text"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress(["Meta", "I"]);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.realPress(["Meta", "I"]);

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverClosed();
	});

	it("Shouldn't open popover on keyboard combination ctrl + i when there are no tokens", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="This is a token with ridicilously long long long long long long long long long long long long long long long text"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress(["Meta", "I"]);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverClosed();
	});
});