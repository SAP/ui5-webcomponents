import ComboBox from "../../src/ComboBox.js";
import ComboBoxItem from "../../src/ComboBoxItem.js";
import ComboBoxItemGroup from "../../src/ComboBoxItemGroup.js";
import ResponsivePopover from "../../src/ResponsivePopover.js";
import Link from "../../src/Link.js";
import Input from "../../src/Input.js";
import Button from "../../src/Button.js";

describe("General Interaction", () => {
	it("Scrolls the selected item into view after opening the popover", () => {
		cy.mount(
			<>
			<ComboBox>
				<ComboBoxItem text="Bulgaria"></ComboBoxItem>
				<ComboBoxItem text="Germany"></ComboBoxItem>
				<ComboBoxItem text="Austria"></ComboBoxItem>
				<ComboBoxItem text="Australia"></ComboBoxItem>
				<ComboBoxItem text="Mexico"></ComboBoxItem>
				<ComboBoxItem text="Brazil"></ComboBoxItem>
			</ComboBox>
			<Button>Dummy Button</Button>
			</>
		);
		cy.viewport(500,200);

		cy.get("[ui5-combobox]")
			.shadow()
			.find("[ui5-icon]")
			.as("dropdownIcon");

		cy.get("@dropdownIcon")
			.realClick();

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-combobox]")
			.shadow()
			.find("[ui5-responsive-popover]")
			.shadow()
			.find(".ui5-popup-content")
			.as("scrollContainer");

		cy.get("@scrollContainer")
			.scrollTo("bottom");

		cy.get("[ui5-cb-item")
			.eq(4)
			.realClick();

		cy.get("@dropdownIcon")
			.realClick();

		cy.get("@scrollContainer")
			.scrollTo("top");

		cy.get("[ui5-button]")
			.realClick();

		cy.get("@dropdownIcon")
			.realClick();

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-cb-item]")
			.eq(4)
			.should("be.visible");
	})
})

describe("Security", () => {
	it("tests setting malicious text to items", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="<script>alert('XSS')</script>"></ComboBoxItem>
				<ComboBoxItem text="<b onmouseover=alert('XSS')></b>"></ComboBoxItem>
				<ComboBoxItem text="Albania<button onClick='alert(1)'>alert</button>"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("ui5-cb-item").eq(0).shadow().find(".ui5-li-title")
			.should("have.text", "<script>alert('XSS')</script>");
		cy.get("ui5-cb-item").eq(1).shadow().find(".ui5-li-title")
			.should("have.text", "<b onmouseover=alert('XSS')></b>");
		cy.get("ui5-cb-item").eq(2).shadow().find(".ui5-li-title")
			.should("have.text", "Albania<button onClick='alert(1)'>alert</button>");
	});
});

describe("Keyboard interaction", () => {
	it("tests navigating with arrow down when item text is contained in the previous selected item", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Bulgaria 1"></ComboBoxItem>
				<ComboBoxItem text="Bulgaria"></ComboBoxItem>
				<ComboBoxItem text="Bul"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]").as("combobox");

		cy.get<ComboBox>("@combobox")
			.shadow()
			.find("input")
			.as("inner");

		cy.get("@inner").focus();

		cy.get("@inner").realPress("F4");
		cy.get("@combobox")
			.find("[ui5-cb-item]").eq(0).should("have.prop", "selected", true);

		cy.get("@inner").realPress("ArrowDown");
		cy.get("@combobox")
			.find("[ui5-cb-item]").eq(1).should("have.prop", "selected", true);

		cy.get("@inner").realPress("ArrowDown");
		cy.get("@combobox")
			.find("[ui5-cb-item]").eq(2).should("have.prop", "selected", true);
	});

	it("tests navigating with arrow down when item text is contained in the previous selected item (with grouping)", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItemGroup headerText="Bulgaria">
					<ComboBoxItem text="Bulgar"></ComboBoxItem>
					<ComboBoxItem text="Bulg"></ComboBoxItem>
					<ComboBoxItem text="Bul"></ComboBoxItem>
				</ComboBoxItemGroup>
			</ComboBox>
		);

		cy.get("[ui5-combobox]").as("combobox");

		cy.get<ComboBox>("@combobox")
			.shadow()
			.find("input")
			.as("inner");

		cy.get("@inner").focus();

		cy.get("@inner").realPress("F4");
		cy.get("@combobox")
			.find("[ui5-cb-item]").eq(0).should("have.prop", "selected", true);

		cy.get("@inner").realPress("ArrowDown");
		cy.get("@combobox")
			.find("[ui5-cb-item]").eq(1).should("have.prop", "selected", true);

		cy.get("@inner").realPress("ArrowDown");
		cy.get("@combobox")
			.find("[ui5-cb-item]").eq(2).should("have.prop", "selected", true);
	});
});

describe("Keyboard interaction when pressing Ctrl + Alt + F8 for navigation", () => {
	beforeEach(() => {
		cy.mount(<>
			<ComboBox valueState="Negative">
				<div slot="valueStateMessage">
					Custom error value state message with a <Link href="#">Link</Link>  <Link href="#">Second Link</Link>.
				</div>
				<ComboBoxItem text="alert('XSS')"></ComboBoxItem>
				<ComboBoxItem text="<b onmouseover=alert('XSS')></b>"></ComboBoxItem>
				<ComboBoxItem text="Albania"></ComboBoxItem>
			</ComboBox>
			<Input id="nextInput" class="input2auto" placeholder="Next input"></Input>
		</>);
	});

	it("Should move the focus from the ComboBox to the first link in the value state message", () => {
		cy.get("ui5-combobox")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("ui5-combobox")
			.as("combobox");

		cy.get("@innerInput")
			.realClick()
			.should("be.focused");

		cy.realPress(["Control", "Alt", "F8"]);

		cy.get("@combobox")
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

	it("Pressing [Tab] moves the focus to the next value state message link. Pressing [Tab] again closes the popup and moves the focus to the next input", () => {
		cy.get("ui5-combobox")
			.as("combobox");

		cy.get("@combobox")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("@innerInput")
			.realClick()
			.should("be.focused");

		cy.realPress(["Control", "Alt", "F8"]);

		cy.get("@combobox")
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


		cy.get("ui5-input")
			.as("input");

		cy.get("@input")
			.should("have.focus");
	});

	it("Pressing [Shift+Tab] moves the focus from the second value state message link to the first. Pressing it again shifts the focus to the ComboBox", () => {
		cy.get("ui5-combobox")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("ui5-combobox")
			.as("combobox");

		cy.get("@innerInput")
			.realClick()
			.should("be.focused");

		cy.realPress(["Control", "Alt", "F8"]);

		cy.get("@combobox")
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

	it("When pressing [Down Arrow] while focused on the first value state message link and suggestions are open, the focus moves to the next suggestion item", () => {
		cy.get("ui5-combobox")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("ui5-combobox")
			.as("combobox");

		cy.get("@innerInput")
			.realClick()
			.should("be.focused");

		cy.realPress(["Control", "Alt", "F8"]);

		cy.get("@combobox")
			.shadow()
			.find("ui5-responsive-popover")
			.as("popover");

		cy.get("@combobox")
			.realClick()
			.should("be.focused");

		cy.realType("A");

		cy.get("@popover")
			.should("have.attr", "open");

		cy.get("@innerInput")
			.realClick()
			.should("be.focused");

		cy.realPress(["Control", "Alt", "F8"]);

		cy.get("ui5-link")
			.as("firstLink")
			.should("have.focus");

		cy.get("@firstLink")
			.realPress("ArrowDown");

		cy.get("@combobox")
			.should("have.attr", "value", "Albania");

		cy.get("@combobox")
			.find("[ui5-cb-item]").eq(2).should("have.prop", "focused", true);
	});
});

describe("Event firing", () => {
	it("tests if open and close events are fired correctly", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Algeria"></ComboBoxItem>
				<ComboBoxItem text="Bulgaria"></ComboBoxItem>
				<ComboBoxItem text="England"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("ui5-combobox")
			.as("combo");

		cy.get("@combo").then($combo => {
			$combo[0].addEventListener("focusin", () => {
			$combo[0].setAttribute("open", "true");
			});
		});

		cy.get("@combo").then($combo => {
			$combo[0].addEventListener("ui5-open", cy.stub().as("comboOpened"));
		});

		cy.get("@combo").then($combo => {
			$combo[0].addEventListener("ui5-close", cy.stub().as("comboClosed"));
		});

		cy.get("@combo")
			.shadow()
			.find("input")
			.focus();

		cy.get("@combo")
			.shadow()
			.find("ui5-icon")
			.as("icon");

		cy.get("@icon")
			.click();

		cy.get("@icon")
			.click();

		cy.get("@combo")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.attr", "open");

		cy.get("@comboClosed")
			.should("have.been.calledOnce");

		cy.get("@comboOpened")
			.should("have.been.calledTwice");
	});

	it("should not fire 'change' event on focusout if value is not changed by user interaction", () => {
		cy.mount(
			<>
				<ComboBox id="cb" value="ComboBox item text"></ComboBox>
				<ComboBox id="another-cb"></ComboBox>
			</>
		);

		cy.get("#cb").then($cb => {
			$cb[0].addEventListener("ui5-change", cy.stub().as("changeStub"));
		});

		cy.get("#cb").shadow().find("input").click();
		cy.get("#another-cb").shadow().find("input").click();
		cy.get("@changeStub").should("not.have.been.called");

		cy.get("#cb").then(($cb) => {
			const comboBox = $cb[0] as ComboBox;
			comboBox.value = "Another ComboBox item text";
		});

		cy.get("#cb").shadow().find("input").click();
		cy.get("#another-cb").shadow().find("input").click();
		cy.get("@changeStub").should("not.have.been.called");
	});
});

describe("Accessibility", () => {
	it("should announce the associated label when ComboBox is focused", () => {
		cy.mount(
			<>
				<label for="cb">Should be the aria-label</label>
				<ComboBox id="cb"/>
			</>
		);

		cy.get('label[for="cb"]')
			.invoke('text')
			.then((labelText) => {

				cy.get("[ui5-combobox]")
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

describe("Selection-change event", () => {
	it("should fire selection-change event when item is selected", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Bulgaria"></ComboBoxItem>
				<ComboBoxItem text="Canada"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.invoke('on', 'ui5-selection-change', cy.spy().as('selectionChangeSpy'));

		cy.get("@combo")
			.shadow()
			.find("input")
			.as("input");

		// Type to select an item
		cy.get("@input")
			.focus()
			.realType("Bulgaria");

		cy.get("@selectionChangeSpy")
			.should("have.been.calledOnce");

		cy.get("@selectionChangeSpy")
			.should("have.been.calledWith", Cypress.sinon.match.has("detail", Cypress.sinon.match.has("item")));
	});

	it("should fire selection-change event when item is selected after backspace", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Bulgaria"></ComboBoxItem>
				<ComboBoxItem text="Canada"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.invoke('on', 'ui5-selection-change', cy.spy().as('selectionChangeSpy'));

		cy.get("@combo")
			.shadow()
			.find("input")
			.as("input");

		// Type partial text, then backspace, then complete selection
		cy.get("@input")
			.focus()
			.realType("Bulg")
			.realPress("Backspace")
			.realType("garia");

		cy.get("@selectionChangeSpy")
			.should("have.been.called");

		cy.get("@selectionChangeSpy")
			.should("have.been.calledWith", Cypress.sinon.match.has("detail", Cypress.sinon.match.has("item")));
	});

	it("should fire selection-change event when item is selected after delete key", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Bulgaria"></ComboBoxItem>
				<ComboBoxItem text="Canada"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.invoke('on', 'ui5-selection-change', cy.spy().as('selectionChangeSpy'));

		cy.get("@combo")
			.shadow()
			.find("input")
			.as("input");

		// Type text, position cursor, use delete key, then complete selection
		cy.get("@input")
			.focus()
			.realType("Bulgxaria")
			.realPress(["Home"])
			.realPress(["ArrowRight", "ArrowRight", "ArrowRight", "ArrowRight"])
			.realPress("Delete")
			.realPress("End");

		cy.get("@selectionChangeSpy")
			.should("have.been.called");

		cy.get("@selectionChangeSpy")
			.should("have.been.calledWith", Cypress.sinon.match.has("detail", Cypress.sinon.match.has("item")));
	});

	it("should fire selection-change event when selection is cleared by typing non-matching text", () => {
		cy.mount(
			<ComboBox value="Bulgaria">
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Bulgaria" selected></ComboBoxItem>
				<ComboBoxItem text="Canada"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.invoke('on', 'ui5-selection-change', cy.spy().as('selectionChangeSpy'));

		cy.get("@combo")
			.shadow()
			.find("input")
			.as("input");

		// Clear existing value and type non-matching text
		cy.get("@input")
			.focus()
			.clear()
			.realType("NonExistentCountry");

		cy.get("@selectionChangeSpy")
			.should("have.been.called");

		cy.get("@selectionChangeSpy")
			.should("have.been.calledWith", Cypress.sinon.match.has("detail", Cypress.sinon.match.has("item")));
	});

	it("should fire selection-change event when clear icon is clicked", () => {
		cy.mount(
			<ComboBox value="Bulgaria" showClearIcon>
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Bulgaria" selected></ComboBoxItem>
				<ComboBoxItem text="Canada"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.invoke('on', 'ui5-selection-change', cy.spy().as('selectionChangeSpy'));

		// Click the clear icon
		cy.get("@combo")
			.shadow()
			.find(".ui5-input-clear-icon-wrapper")
			.click();

		cy.get("@selectionChangeSpy")
			.should("have.been.calledOnce");

		cy.get("@selectionChangeSpy")
			.should("have.been.calledWith", Cypress.sinon.match.has("detail", Cypress.sinon.match.has("item")));
	});

	it("should fire selection-change event when item is clicked from dropdown", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Bulgaria"></ComboBoxItem>
				<ComboBoxItem text="Canada"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.invoke('on', 'ui5-selection-change', cy.spy().as('selectionChangeSpy'));

		// Open dropdown and click an item
		cy.get("@combo")
			.shadow()
			.find("ui5-icon")
			.click();

		cy.get("@combo")
			.find("ui5-cb-item")
			.eq(1)
			.click();

		cy.get("@selectionChangeSpy")
			.should("have.been.calledOnce");

		cy.get("@selectionChangeSpy")
			.should("have.been.calledWith", Cypress.sinon.match.has("detail", Cypress.sinon.match.has("item")));
	});

	it("should fire selection-change event when navigating with arrow keys and pressing Enter", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Bulgaria"></ComboBoxItem>
				<ComboBoxItem text="Canada"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.invoke('on', 'ui5-selection-change', cy.spy().as('selectionChangeSpy'));

		cy.get("@combo")
			.shadow()
			.find("input")
			.as("input");

		// Open dropdown with F4, navigate with arrow keys, and select with Enter
		cy.get("@input")
			.focus()
			.realPress("F4")
			.realPress("ArrowDown")
			.realPress("Enter");

		cy.get("@selectionChangeSpy")
			.should("have.been.calledWith", Cypress.sinon.match.has("detail", Cypress.sinon.match.has("item")));
	});

	it("should fire selection-change event with correct item data", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Bulgaria"></ComboBoxItem>
				<ComboBoxItem text="Canada"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.invoke('on', 'ui5-selection-change', cy.spy().as('selectionChangeSpy'));

		cy.get("@combo")
			.shadow()
			.find("input")
			.focus()
			.realType("Bulgaria");

		cy.get("@selectionChangeSpy").should("have.been.calledWithMatch", Cypress.sinon.match(event => {
				return event.detail.item.text === "Bulgaria";
	}));
});

	it("should work correctly with grouped items", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItemGroup headerText="Europe">
					<ComboBoxItem text="Bulgaria"></ComboBoxItem>
					<ComboBoxItem text="Germany"></ComboBoxItem>
				</ComboBoxItemGroup>
				<ComboBoxItemGroup headerText="Americas">
					<ComboBoxItem text="Argentina"></ComboBoxItem>
					<ComboBoxItem text="Canada"></ComboBoxItem>
				</ComboBoxItemGroup>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo");

		cy.get("ui5-combobox")
			.as("combo")
			.invoke('on', 'ui5-selection-change', cy.spy().as('selectionChangeSpy'));

		cy.get("@combo")
			.shadow()
			.find("input")
			.focus()
			.realType("Bulgaria");

		cy.get("@selectionChangeSpy")
			.should("have.been.calledOnce");

		cy.get("@selectionChangeSpy")
			.should("have.been.calledWith", Cypress.sinon.match.has("detail", Cypress.sinon.match.has("item")));
	});
});
