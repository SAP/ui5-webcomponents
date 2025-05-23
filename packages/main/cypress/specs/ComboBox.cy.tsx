import ComboBox from "../../src/ComboBox.js";
import ComboBoxItem from "../../src/ComboBoxItem.js";
import ComboBoxItemGroup from "../../src/ComboBoxItemGroup.js";
import Link from "../../src/Link.js";
import Input from "../../src/Input.js";

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

describe("Keyboard interaction when Ctrl + Alt + F8 navigation", () => {
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
	it("Should moves focus from the comboBox to the first link in value state message", () => {
		cy.get("ui5-combobox")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("ui5-combobox")
		.as("combobox");

		cy.get("@innerInput")
			.realClick()
			.realPress(["Control", "Alt", "F1"]);

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
	it("When press [Tab] then move the focus to the next value state message link then on [Tab] close popup and move to the next input", () => {
		cy.get("ui5-combobox")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("ui5-combobox")
			.as("combobox");

		cy.get("ui5-input")
			.as("input");

		cy.get("@innerInput")
			.realClick()
			.realPress(["Control", "Alt", "F1"]);

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

		cy.get("@input")
			.should("have.focus");
	});
	it("When pressing [SHIFT+TAB] moves focus from the second link to the first and when pressing again to the comboBox", () => {
		cy.get("ui5-combobox")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("ui5-combobox")
			.as("combobox");

		cy.get("@innerInput")
			.realClick()
			.realPress(["Control", "Alt", "F1"]);

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
	it("When press [ArrowDown] after focus is in the first value state message link and suggestions are open, to the next suggestion item ", () => {
		cy.get("ui5-combobox")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("ui5-combobox")
			.as("combobox");

		cy.get("@innerInput")
			.realClick()
			.realPress(["Control", "Alt", "F1"]);

		cy.get("@combobox")
			.shadow()
			.find("ui5-responsive-popover")
			.as("popover");

		cy.get("@combobox")
			.realClick();

		cy.get("@combobox")
			.realType("A");

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

		cy.get("@combobox")
			.should("have.attr", "value", "Albania")
			.should("have.focus");
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


