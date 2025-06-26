import Input from "../../src/Input.js";
import SuggestionItem from "../../src/SuggestionItem.js";
import SuggestionItemCustom from "../../src/SuggestionItemCustom.js";
import SuggestionItemGroup from "../../src/SuggestionItemGroup.js";
import Dialog from "../../src/Dialog.js";
import Link from "../../src/Link.js";

import add from "@ui5/webcomponents-icons/dist/add.js";
import type ResponsivePopover from "../../src/ResponsivePopover.js";

describe("Input Tests", () => {
	it("test input event prevention", () => {
		const inputHandler = e => {
			e.preventDefault();
			(e.target as Input).value = "test";
		}

		cy.mount(<Input onInput={inputHandler} />);

		cy.get("[ui5-input]")
			.as("input")
			.realClick();

		cy.get<Input>("@input")
			.should("be.focused");

		cy.realPress("a");

		cy.get("@input")
			.shadow()
			.find("input")
			.should("have.value", "test");
	});

	it("tests custom suggestion items tabindex", () => {
		cy.mount(
			<Input showSuggestions={true}>
				<SuggestionItemCustom text="Item 1">Item 1</SuggestionItemCustom>
				<SuggestionItemCustom text="Item 2">Item 2</SuggestionItemCustom>
				<SuggestionItemCustom text="Item 3">Item 3</SuggestionItemCustom>
			</Input>
		);

		cy.get("[ui5-input]")
			.as("input");

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realPress("i");

		cy.realPress("ArrowDown");

		cy.get("@input")
			.find("[ui5-suggestion-item-custom]")
			.shadow()
			.find("li")
			.should("not.have.attr", "tabindex", "0")
			.and("have.attr", "role", "option");
	});

	it("tests regular suggestion items tabindex", () => {
		cy.mount(
			<Input showSuggestions={true}>
				<SuggestionItem text="Item 1"></SuggestionItem>
				<SuggestionItem text="Item 2"></SuggestionItem>
				<SuggestionItem text="Item 3"></SuggestionItem>
			</Input>
		);

		cy.get("[ui5-input]")
			.as("input")
			.shadow()

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("i");

		cy.realPress("ArrowDown");

		cy.get("@input")
			.find("ui5-suggestion-item")
			.shadow()
			.find("li")
			.should("not.have.attr", "tabindex", "0")
			.and("have.attr", "role", "option");
	});

	it("tests suggestion group items tabindex", () => {
		cy.mount(
			<Input showSuggestions={true}>
				<SuggestionItemGroup headerText="Group 1">
					<SuggestionItem text="Item 1"></SuggestionItem>
					<SuggestionItem text="Item 2"></SuggestionItem>
					<SuggestionItem text="Item 3"></SuggestionItem>
				</SuggestionItemGroup>
				<SuggestionItemGroup headerText="Group 2">
					<SuggestionItem text="Item 4"></SuggestionItem>
					<SuggestionItem text="Item 5"></SuggestionItem>
					<SuggestionItem text="Item 6"></SuggestionItem>
				</SuggestionItemGroup>
			</Input>
		);

		cy.get("[ui5-input]")
			.as("input");

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("i");
		cy.realPress("ArrowDown");

		cy.get("@input")
			.find("[ui5-suggestion-item-group]")
			.shadow()
			.find("[ui5-li-group-header]")
			.shadow()
			.find("div")
			.should("not.have.attr", "tabindex", "0");
	});

	it("tests tabindex of the div holding icon slot ", () => {
		cy.mount(<Input />);

		cy.document().then(doc => {
			const input = doc.querySelector<Input>("[ui5-input]")!;
			const icon = document.createElement("ui5-icon");
			icon.setAttribute("slot", "icon");
			icon.setAttribute("name", add);
			icon.id = "icon";

			input.addEventListener("focus", () => {
				input.appendChild(icon);
			});
			input.addEventListener("focusout", () => {
				input.removeChild(icon);
			});
		});

		cy.get("[ui5-input]")
			.as("input");

		cy.get<Input>("@input").realClick();

		cy.get("[ui5-icon]")
			.as("icon");

		cy.get("@icon")
			.then($icon => {
				$icon[0].addEventListener("click", cy.spy().as("click"));
			});

		cy.get("@icon").realClick();

		cy.get("@click")
			.should("have.been.calledOnce");
	});

	it("tests submit and change event order", () => {
		cy.mount(
			<form>
				<Input onChange={cy.stub().as("change")}></Input>
			</form>
		);

		// spy submit event and prevent it
		cy.get("form")
			.then($form => {
				$form.get(0).addEventListener("submit", e => e.preventDefault());
				$form.get(0).addEventListener("submit", cy.spy().as("submit"));
			});

		// check if submit is triggered after change
		cy.get("[ui5-input]")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("test");

		cy.realPress("Enter");

		cy.get("@change").should("have.been.calledBefore", cy.get("@submit"));
		cy.get("@submit").should("have.been.calledOnce");
		cy.get("@change").should("have.been.calledOnce");
	});

	it("tests if pressing enter twice fires submit 2 times and change once", () => {
		cy.mount(
			<form>
				<Input onChange={cy.spy().as("change")}></Input>
			</form>
		);

		// spy submit event and prevent it
		cy.get("form")
			.then($form => {
				$form.get(0).addEventListener("submit", e => e.preventDefault());
				$form.get(0).addEventListener("submit", cy.spy().as("submit"));
			});

		cy.get("[ui5-input]")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("test");

		cy.realPress("Enter");

		cy.realPress("Enter");

		cy.get("@change").should("have.been.calledBefore", cy.get("@submit"));
		cy.get("@submit").should("have.been.calledTwice");
		cy.get("@change").should("have.been.calledOnce");
	});

	it("tests if submit is fired in case of autocomplete", () => {
		cy.mount(
			<form>
				<Input showSuggestions={true} onChange={cy.spy().as("change")}>
					<SuggestionItem text="Hello"></SuggestionItem>
				</Input>
			</form>
		);

		// spy submit event and prevent it
		cy.get("form")
			.then($form => {
				$form.get(0).addEventListener("submit", e => e.preventDefault());
				$form.get(0).addEventListener("submit", cy.spy().as("submit"));
			});

		// checks when the submit is triggered
		cy.get("[ui5-input]")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("H");

		cy.realPress("Enter");

		cy.get("@submit").should("have.not.been.called");
		cy.get("@change").should("have.been.calledOnce");

		cy.realPress("Enter");

		cy.get("@submit").should("have.been.calledOnce");
		cy.get("@change").should("have.been.calledOnce");
	});

	it("tests if submit event is fired upon item selection", () => {
		cy.mount(
			<form>
				<Input showSuggestions={true} onChange={cy.spy().as("change")}>
					<SuggestionItem text="Hello"></SuggestionItem>
				</Input>
			</form>
		);

		// spy submit event and prevent it
		cy.get("form")
			.then($form => {
				$form.get(0).addEventListener("submit", e => e.preventDefault());
				$form.get(0).addEventListener("submit", cy.spy().as("submit"));
			});

		// checks when the submit is triggered
		cy.get("[ui5-input]")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("H");

		cy.realPress("ArrowDown");

		cy.realPress("Enter");

		cy.get("@submit").should("have.not.been.called");
		cy.get("@change").should("have.been.calledOnce");

		cy.realPress("Enter");

		cy.get("@submit").should("have.been.calledOnce");
		cy.get("@change").should("have.been.calledOnce");
	});
});

describe("Input general interaction", () => {
	it("handles suggestions selection cancel with ESC", () => {
		cy.mount(
			<Input showSuggestions>
				<SuggestionItem text="Chromium"></SuggestionItem>
				<SuggestionItem text="Titanium"></SuggestionItem>
				<SuggestionItem text="Iron"></SuggestionItem>
				<SuggestionItem text="Gold"></SuggestionItem>
				<SuggestionItem text="Silver"></SuggestionItem>
			</Input>
		);

		cy.get("[ui5-input]")
			.as("input")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("popover");

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.get("@input")
			.realType("C");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@input")
			.realPress("ArrowDown");

		cy.get("@input")
			.should("have.attr", "value", "Titanium");

		cy.get("@input")
			.realPress("Escape");

		cy.get("@input")
			.should("have.value", "C");
	});

	it("tests selection-change with custom items", () => {
		cy.mount(
			<Input showSuggestions>
				<SuggestionItem text="Cozy" />
				<SuggestionItem text="Compact" />
				<SuggestionItem text="Condensed" />
				<SuggestionItem text="Compact" />
				<SuggestionItem text="Condensed" />
			</Input>
		);

		cy.get("ui5-input")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.get("@input")
			.realType("c");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened()

		cy.get("@input")
			.realPress("ArrowDown");

		cy.get("@input")
			.should("have.value", "Compact")
			.should("not.have.attr", "focused");

		cy.get("ui5-suggestion-item")
			.eq(1)
			.should("have.attr", "focused");

		cy.get("@input")
			.realPress("ArrowDown");

		cy.get("ui5-suggestion-item")
			.eq(2)
			.should("have.attr", "focused");

		cy.get("ui5-suggestion-item")
			.eq(1)
			.should("not.have.attr", "focused");
	});

	it("Should fire 'input' event when the value is cleared with ESC", () => {
		cy.mount(<Input onInput={cy.spy().as("inputEvent")} />);

		cy.get("[ui5-input]").realClick();

		cy.get("[ui5-input]")
			.should("be.focused");

		cy.get("[ui5-input]")
			.realPress("a");

		cy.get("[ui5-input]")
			.realPress("Escape");

		cy.get("@inputEvent").should("have.been.calledTwice");
	});
});

describe("Input arrow navigation", () => {
	it("Value state header and group headers should not be included in the arrow navigation", () => {
		cy.mount(
			<Input showSuggestions valueState="Negative" placeholder="Search for a country ...">
				<div slot="valueStateMessage">
					Custom error value state message with a <a href="#">Link</a>.
				</div>
				<SuggestionItem text="Cozy" />
				<SuggestionItem text="Compact" />
				<SuggestionItem text="Condensed" />
				<SuggestionItem text="Compact" />
				<SuggestionItem text="Condensed" />
			</Input>
		);

		cy.get("[ui5-input]")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("c");

		cy.realPress("ArrowDown");

		cy.get("@input")
			.should("not.have.attr", "focused");

		cy.get("@input")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("ui5-responsive-popover")
			.find("div")
			.as("valueMessage")
			.should("not.have.class", "ui5-responsive-popover-header--focused");

		cy.get("ui5-suggestion-item")
			.eq(1)
			.should("have.attr", "focused");

		cy.get("@input")
			.realPress("ArrowUp")
			.realPress("ArrowUp");

		cy.get("@valueMessage")
			.should("not.have.class", "ui5-responsive-popover-header--focused");

		cy.get("@input")
			.should("have.attr", "focused");
	});

	it("Should navigate up and down through the suggestions popover with arrow keys", () => {
		cy.mount(
			<Input showSuggestions>
				<SuggestionItem text="Cozy" />
				<SuggestionItem text="Compact" />
				<SuggestionItem text="Condensed" />
				<SuggestionItem text="Compact" />
				<SuggestionItem text="Condensed" />
			</Input>
		);

		cy.get("[ui5-input]")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("c");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.realPress("ArrowDown");

		cy.get("[ui5-suggestion-item]")
			.eq(1)
			.should("have.attr", "text", "Compact");

		cy.get("@input")
			.should("not.have.attr", "focused");

		cy.get("[ui5-suggestion-item]")
			.eq(1).should("have.attr", "focused");

		cy.realPress("ArrowDown");

		cy.get("[ui5-suggestion-item]").eq(2).should("have.attr", "focused");
		cy.get("[ui5-suggestion-item]").eq(1).should("not.have.attr", "focused");

		cy.realPress("ArrowUp");

		cy.get("[ui5-suggestion-item]")
			.eq(1)
			.should("have.attr", "focused");

		cy.get("[ui5-suggestion-item]")
			.eq(2)
			.should("not.have.attr", "focused");

		cy.realPress("ArrowUp");

		cy.realPress("ArrowUp");

		cy.get("@input")
			.should("have.attr", "focused");

		cy.get("[ui5-suggestion-item]")
			.first()
			.should("not.have.attr", "focused");
	});
});

describe("Input PAGEUP/PAGEDOWN navigation", () => {
	beforeEach(() => {
		cy.mount(
			<Input showSuggestions placeholder="Search for a country ...">
				<SuggestionItemGroup headerText="A">
					<SuggestionItem text="Afghanistan" />
					<SuggestionItem text="Argentina" />
					<SuggestionItem text="Albania" />
					<SuggestionItem text="Armenia" />
					<SuggestionItem text="Algeria" />
					<SuggestionItem text="Andorra" />
					<SuggestionItem text="Angola" />
					<SuggestionItem text="Austria" />
					<SuggestionItem text="Australia" />
					<SuggestionItem text="Azerbaijan" />
					<SuggestionItem text="Aruba" />
					<SuggestionItem text="Antigua and Barbuda" />
				</SuggestionItemGroup>
			</Input>
		);
	});
	it("Should focus the tenth item from the suggestions popover with PAGEDOWN", () => {
		cy.get("[ui5-input]")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("a");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.realPress("ArrowDown");

		cy.realPress("PageDown");

		cy.get("[ui5-suggestion-item]")
			.eq(11)
			.should("have.attr", "text", "Antigua and Barbuda");

		cy.get("[ui5-suggestion-item]")
			.eq(11)
			.should("have.attr", "focused");
	});

	it("Should focus the -10 item/group header from the suggestions popover with PAGEUP", () => {
		cy.get("[ui5-input]")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("a");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.realPress("ArrowUp");

		cy.get("[ui5-suggestion-item-group]")
			.eq(0)
			.should("have.attr", "focused");

		cy.realPress("PageDown");

		cy.realPress("PageUp");

		cy.get("[ui5-suggestion-item-group]")
			.eq(0)
			.should("have.attr", "focused");
	});
});

describe("Input Ctrl + Alt + F8 navigation", () => {
	beforeEach(() => {
		cy.mount(<Input id="inputWithLinkInValueState" class="input2auto" valueState="Negative" placeholder="Input with Link in error value state">
			<div slot="valueStateMessage">
				Custom error value state message with a <Link href="#">Link</Link>.
			</div>
		</Input>);
	});
	it("Should move the focus from the input to the first link in the value state message", () => {
		cy.get("ui5-input")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("ui5-input")
		.as("input");

		cy.get("@innerInput")
			.realClick()
			.realPress(["Control", "Alt", "F8"]);

		cy.get("@input")
			.shadow()
			.find("ui5-popover")
			.as("popover")
			.should("have.class", "ui5-valuestatemessage-popover");

		cy.get("@popover")
			.should("have.attr", "open")

		cy.get("ui5-link")
			.should("have.focus");
	});
	it("When pressing [Tab], the focus moves to the next value state message link. Pressing [Tab] again closes the popup and moves the focus to the next input", () => {
		cy.mount(<>
			<Input id="inputError" class="input2auto" valueState="Negative" placeholder="Input in error state">
				<div slot="valueStateMessage">
					Custom error value state message with a <Link href="#">First Link</Link> <Link href="#">Second Link</Link>.
				</div>
			</Input>
			<Input id="nextInput" class="input2auto" placeholder="Next input"></Input>
		</>);

		cy.get("ui5-input")
			.eq(0)
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("ui5-input")
			.eq(0)
			.as("input");

		cy.get("ui5-input")
			.eq(1)
			.as("secondInput");

		cy.get("@innerInput")
			.realClick()
			.realPress(["Control", "Alt", "F8"]);

		cy.get("@input")
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

		cy.get("@secondInput")
			.should("have.focus");
	});
	it("Pressing [Shift+Tab] moves the focus from the second value state message link to the first one. Pressing it again shifts the focus to the input", () => {
		cy.mount(<Input id="inputError" class="input2auto" valueState="Negative" placeholder="Input in error state">
			<div slot="valueStateMessage">
				Custom error value state message with a <Link href="#">First Link</Link> <Link href="#">Second Link</Link>.
			</div>
		</Input>);
		cy.get("ui5-input")
		.eq(0)
		.shadow()
		.find("input")
		.as("innerInput");

		cy.get("ui5-input")
			.eq(0)
			.as("input");

		cy.get("@innerInput")
		.realClick()
		.realPress(["Control", "Alt", "F8"]);

		cy.get("@input")
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
		cy.mount(
			<Input id="myInputEsc" showSuggestions valueState="Critical" class="input3auto">
				<div slot="valueStateMessage">
					Custom warning value state message with a <Link href="#">First Link</Link>.
				</div>
				<SuggestionItem text="Chromium"></SuggestionItem>
				<SuggestionItem text="Titanium"></SuggestionItem>
				<SuggestionItem text="Iron"></SuggestionItem>
				<SuggestionItem text="Gold"></SuggestionItem>
				<SuggestionItem text="Silver"></SuggestionItem>
			</Input>
		);

		cy.get("ui5-input")
			.as("input");

		cy.get("ui5-input")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("@input")
			.shadow()
			.find("ui5-responsive-popover")
			.as("popover");

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.realType("C");

		cy.get("@popover")
			.should("have.attr", "open");

		cy.get("@innerInput")
		.realClick()
		.realPress(["Control", "Alt", "F8"]);

		cy.get("ui5-link")
			.as("firstLink")
			.should("have.focus");

		cy.get("@firstLink")
			.realPress("ArrowDown");

		cy.get("ui5-suggestion-item")
			.eq(0)
			.should("have.attr", "focused");

		cy.get("@input")
			.should("have.attr", "value", "Chromium")
			.should("have.focus");
	});
});


describe("Selection-change event", () => {
	it("Selection-change event fires with null arguments when suggestion was selected but user alters input value to something else", () => {
		cy.mount(
			<Input showSuggestions onSelectionChange={cy.stub().as("inputSelectionChange")}>
				<SuggestionItem text="Cozy" />
				<SuggestionItem text="Compact" />
				<SuggestionItem text="Condensed" />
			</Input>
		);

		cy.get("ui5-input")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("C");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.realPress("ArrowDown");

		cy.realPress("Enter");

		cy.get("@input")
			.should("have.value", "Compact");

		cy.get("@input")
			.realClick({ clickCount: 3 }); // select single word

		cy.get("@input")
			.should("be.focused");

		cy.realType("N");

		cy.realPress("Enter");

		cy.get("@input")
			.should("have.value", "N");

		cy.get("@inputSelectionChange")
			.should("be.calledTwice");
	});

	it("Fires selection-change when same item is reselected after input is changed", () => {
		cy.mount(
			<Input showSuggestions onSelectionChange={cy.stub().as("inputSelectionChange")}>
				<SuggestionItem text="Cozy" />
				<SuggestionItem text="Compact" />
				<SuggestionItem text="Condensed" />
			</Input>
		);

		cy.get("ui5-input")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.get("[ui5-suggestion-item")
			.eq(0)
			.as("suggestion-item");

		cy.realType("C");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("@suggestion-item")
			.realClick();

		cy.get("@inputSelectionChange")
			.should("have.been.calledOnce");

		cy.get("@input")
			.should("have.value", "Cozy");

		cy.get("@input")
			.realClick({ clickCount: 3 }); // select all

		cy.get("@input")
			.should("be.focused");

		cy.realPress("Backspace");

		cy.get("@inputSelectionChange")
			.should("have.been.calledTwice");

		cy.realType("C");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("@suggestion-item")
			.realClick();

		cy.get("@inputSelectionChange")
			.should("have.been.calledThrice");

		cy.get("@input")
			.should("have.value", "Cozy");
	});
});

describe("Change event behavior when selecting the same suggestion item", () => {
	beforeEach(() => {
		cy.mount(
			<Input placeholder="Search for a country ..." showSuggestions onChange={cy.stub().as("changeEvent")}>
				<SuggestionItemGroup headerText="A">
					<SuggestionItem text="Afghanistan" />
					<SuggestionItem text="Argentina" />
					<SuggestionItem text="Albania" />
					<SuggestionItem text="Armenia" />
					<SuggestionItem text="Algeria" />
				</SuggestionItemGroup>
			</Input>
		);

		cy.get("[ui5-input]")
			.as("input")
	});

	it("Change event is not fired when the same suggestion item is selected (with typeahead)", () => {
		cy.get("@input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("a");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.realPress("Enter");

		cy.get("@input")
			.should("have.value", "Afghanistan");

		cy.realPress("Backspace");

		cy.realPress("ArrowDown");

		cy.realPress("ArrowDown");

		cy.realPress("Enter");

		cy.get("@input").should("have.value", "Afghanistan");

		cy.get("@changeEvent")
			.should("have.been.calledOnce");
	});

	it("Change event is not fired when the same suggestion item is selected (no-typeahead)", () => {
		cy.get("@input").invoke("attr", "value", "Afghanistan");
		cy.get("@input").invoke("attr", "no-typeahead", true);

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realPress("Backspace");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.realPress("ArrowDown");

		cy.realPress("ArrowDown");

		cy.realPress("Enter");

		cy.get("@input")
			.should("have.value", "Afghanistan");

		cy.get("@changeEvent")
			.should("not.have.been.calledOnce");
	});

	it("Change event is not fired when the same suggestion item is selected after focus out and selecting suggestion again", () => {
		cy.get("@input")
			.invoke("attr", "value", "Afghanistan");

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realPress("Tab");

		cy.get("@input")
			.should("not.be.focused");

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realPress("ArrowDown");

		cy.realPress("ArrowDown");

		cy.realPress("Enter");

		cy.get("@input")
			.should("have.value", "Afghanistan");

		cy.get("@changeEvent")
			.should("not.have.been.calledOnce");
	});

	it("Change event fires after typing a new value following a clear icon click", () => {
		cy.mount(<Input showClearIcon={true} onChange={cy.stub().as("inputChange")} />);

		cy.get("@input")
			.shadow()
			.find("#inner")
			.as("innerInput")

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("Albania");

		cy.realPress("Enter");

		cy.get("@inputChange")
			.should("have.been.calledOnce");
		// Check input value
		cy.get("@input")
			.should("have.value", "Albania");

		// TODO: Could be fixed once rendering is moved to sync
		cy.get("@innerInput")
			.should("have.value", "Albania");

		cy.get("@input")
			.shadow()
			.find("[ui5-icon]")
			.as("icon")
			.realClick();
		// Check input value
		cy.get("@input")
			.should("have.value", "");

		// TODO: Could be fixed once rendering is moved to sync
		cy.get("@innerInput")
			.should("have.value", "");

		cy.realType("Argentina");
		// Check input value
		cy.get("@input")
			.should("have.value", "Argentina");

		// TODO: Could be fixed once rendering is moved to sync
		cy.get("@innerInput")
			.should("have.value", "Argentina");

		cy.realPress("Enter");

		cy.get("@icon")
			.realClick();
		// Check input value
		cy.get("@input")
			.should("have.value", "");

		// TODO: Could be fixed once rendering is moved to sync
		cy.get("@innerInput")
			.should("have.value", "");

		cy.realType("Argentina");
		// Check input value
		cy.get("@input")
			.should("have.value", "Argentina");

		// TODO: Could be fixed once rendering is moved to sync
		cy.get("@innerInput")
			.should("have.value", "Argentina");

		cy.realPress("Enter");

		cy.get("@inputChange")
			.should("have.been.calledTwice");
	});

	it("should not close the dialog when item is selected", () => {
		cy.mount(<Dialog open>
			<Input showSuggestions={true}>
				<SuggestionItem text="First item"></SuggestionItem>
				<SuggestionItem text="Second item"></SuggestionItem>
			</Input>
		</Dialog>);


		cy.get("[ui5-dialog]")
			.as("dialog");

		cy.get<Dialog>("@dialog")
			.ui5DialogOpened();

		cy.get("[ui5-input]")
			.as("input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("f");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-suggestion-item")
			.eq(0)
			.realClick();

		cy.get<Dialog>("@dialog")
			.ui5DialogOpened();
	});
});

describe("Accessibility", () => {
	it("tests accessibleDescription property", () => {
		cy.mount(<Input accessibleDescription="This is an input" />);

		cy.get("[ui5-input]")
			.as("input")
			.shadow()
			.find("input")
			.should("have.attr", "aria-describedby", "accessibleDescription");

		cy.get("@input")
			.shadow()
			.find("span#accessibleDescription")
			.should("have.text", "This is an input");
	});

	it("tests accessibleDescriptionRef property", () => {
		cy.mount(
			<>
				<p id="inputDescription">This is an input</p>
				<Input accessibleDescriptionRef="inputDescription"></Input>
			</>
		);

		cy.get("[ui5-input]")
			.as("input")
			.shadow()
			.find("input")
			.should("have.attr", "aria-describedby", "accessibleDescription");

		cy.get("@input")
			.shadow()
			.find("span#accessibleDescription")
			.should("have.text", "This is an input");
	});
});
