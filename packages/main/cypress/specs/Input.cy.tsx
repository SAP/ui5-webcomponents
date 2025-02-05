import Input from "../../src/Input.js";
import SuggestionItem from "../../src/SuggestionItem.js";
import SuggestionItemCustom from "../../src/SuggestionItemCustom.js";
import SuggestionItemGroup from "../../src/SuggestionItemGroup.js";

describe("Input Tests", () => {
	it("tets input event prevention", () => {
		cy.mount(
			<Input></Input>
		);

		cy.get("[ui5-input]")
			.as("input");

		cy.get<Input>("@input")
			.then($input => {
				$input.get(0).addEventListener("input", e => {
					e.preventDefault();
					(e.target as Input).value = "test";
				});
			});

		cy.get<Input>("@input")
			.realClick();

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

		cy.get<Input>("@input")
			.shadow()
			.find("input")
			.as("inner");

		cy.get("@inner").realClick();
		cy.get("@inner").realType("i");
		cy.get("@inner").realPress("ArrowDown");

		cy.get("@input")
			.find("[ui5-suggestion-item-custom]")
			.shadow()
			.find("li")
			.should("not.have.attr", "tabindex", "0")
			.should("have.attr", "role", "option");
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
			.as("input");

		cy.get<Input>("@input")
			.shadow()
			.find("input")
			.as("inner");

		cy.get("@inner").realClick();
		cy.get("@inner").realType("i");
		cy.get("@inner").realPress("ArrowDown");

		cy.get("@input")
			.find("ui5-suggestion-item")
			.shadow()
			.find("li")
			.should("not.have.attr", "tabindex", "0")
			.should("have.attr", "role", "option");
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

		cy.get<Input>("@input")
			.shadow()
			.find("input")
			.as("inner");

		cy.get("@inner").realClick();
		cy.get("@inner").realType("i");
		cy.get("@inner").realPress("ArrowDown");

		cy.get("@input")
			.find("[ui5-suggestion-item-group]")
			.shadow()
			.find("[ui5-li-group-header]")
			.shadow()
			.find("ul")
			.should("not.have.attr", "tabindex", "0");
	});
});

describe("Input general interaction", () => {
	it("handles suggestions selection cancel with ESC", () => {
		cy.mount(
			<Input id="myInputEsc" show-suggestions class="input3auto">
				<SuggestionItem text="Chromium"></SuggestionItem>
				<SuggestionItem text="Titanium"></SuggestionItem>
				<SuggestionItem text="Iron"></SuggestionItem>
				<SuggestionItem text="Gold"></SuggestionItem>
				<SuggestionItem text="Silver"></SuggestionItem>
			</Input>
		);

		cy.get("ui5-input")
			.as("input");

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
			<Input id="myInput2" showSuggestions class="input3auto">
			  <SuggestionItem text="Cozy" />
			  <SuggestionItem text="Compact" />
			  <SuggestionItem text="Condensed" />
			  <SuggestionItem text="Compact" />
			  <SuggestionItem text="Condensed" />
			</Input>
		  );

		cy.get("ui5-input")
			.as("input");

		cy.get("@input")
			.shadow()
			.find("ui5-responsive-popover")
			.as("popover");

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.realType("c");

		cy.get("@popover")
			.should("have.attr", "open");

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
});

describe("Input arrow navigation", () => {
	it("Value state header and group headers should be included in the arrow navigation", () => {
		cy.mount(
			<Input id="inputError" class="input2auto" showSuggestions valueState="Negative" placeholder="Search for a country ...">
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

		cy.get("ui5-input")
			.as("input");

		cy.get("@input")
			.realClick()
			.realType("a")
			.realPress("ArrowDown");

		cy.get("@input")
			.should("not.have.attr", "focused");

		cy.get("@input")
			.shadow()
			.find("ui5-responsive-popover")
			.as("ui5-responsive-popover");

		cy.get("@ui5-responsive-popover")
			.find("div")
			.as("valueMessage")
			.should("have.class", "ui5-responsive-popover-header--focused");

		cy.get("@input")
			.realPress("ArrowDown");

		cy.get("@valueMessage")
			.should("not.have.class", "ui5-responsive-popover-header--focused");

		cy.get("ui5-suggestion-item")
			.eq(0)
			.should("have.attr", "focused");
	});

	it("Should navigate up and down through the suggestions popover with arrow keys", () => {
		cy.mount(
			<Input id="myInput2" showSuggestions class="input3auto">
			  <SuggestionItem text="Cozy" />
			  <SuggestionItem text="Compact" />
			  <SuggestionItem text="Condensed" />
			  <SuggestionItem text="Compact" />
			  <SuggestionItem text="Condensed" />
			</Input>
		  );

		cy.get("#myInput2")
			.as("input");

		cy.get("@input")
			.shadow()
			.find("ui5-responsive-popover")
			.as("popover");

		cy.get("@input").realClick();
		cy.get("@input").realType("c");

		cy.get("@popover")
			.should("have.attr", "open");

		cy.get("@input").realPress("ArrowDown");

		cy.get("ui5-suggestion-item").eq(1).should("have.attr", "text", "Compact");
		cy.get("@input").should("not.have.attr", "focused");
		cy.get("ui5-suggestion-item").eq(1).should("have.attr", "focused");

		cy.get("@input")
			.realPress("ArrowDown");

		cy.get("ui5-suggestion-item").eq(2).should("have.attr", "focused");
		cy.get("ui5-suggestion-item").eq(1).should("not.have.attr", "focused");

		cy.get("@input")
			.realPress("ArrowUp");

		cy.get("ui5-suggestion-item").eq(1).should("have.attr", "focused");
		cy.get("ui5-suggestion-item").eq(2).should("not.have.attr", "focused");

		cy.get("@input").realPress("ArrowUp");
		cy.get("@input").realPress("ArrowUp");

		cy.get("@input").should("have.attr", "focused");
		cy.get("ui5-suggestion-item").first().should("not.have.attr", "focused");
	});
});

describe("Input PAGEUP/PAGEDOWN navigation", () => {
	beforeEach(() => {
		cy.mount(
			<Input id="myInput" showSuggestions placeholder="Search for a country ...">
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
		cy.get("ui5-input")
			.as("input");

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.realType("a");

		cy.get("@input")
			.realPress("ArrowDown");

		cy.get("@input")
			.realPress("PageDown");

		cy.get("ui5-suggestion-item")
			.eq(11)
			.should("have.attr", "text", "Antigua and Barbuda");

		cy.get("ui5-suggestion-item")
			.eq(11)
			.should("have.attr", "focused");
	});

	it("Should focus the -10 item/group header from the suggestions popover with PAGEUP", () => {
		cy.get("ui5-input")
			.as("input");

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.realType("a");

		cy.get("@input")
			.realPress("ArrowUp");

		cy.get("ui5-suggestion-item-group")
			.eq(0)
			.should("have.attr", "focused");

		cy.get("@input")
			.realPress("PageDown");

		cy.get("@input")
			.realPress("PageUp");

		cy.get("ui5-suggestion-item-group")
			.eq(0)
			.should("have.attr", "focused");
	});
});

describe("Selection-change event", () => {
	it("Selection-change event fires with null arguments when suggestion was selected but user alters input value to something else", () => {
		cy.mount(
			<Input id="input-selection-change" showSuggestions>
			  <SuggestionItem text="Cozy" />
			  <SuggestionItem text="Compact" />
			  <SuggestionItem text="Condensed" />
			</Input>
		  );

		cy.get("ui5-input")
			.as("input");

		cy.get("ui5-input")
			.shadow()
			.find("input")
			.as("innerInput");

		let eventCount = 0;

		cy.get("@input").then($input => {
			$input[0].addEventListener("ui5-selection-change", () => {
				eventCount++;
			});
		});

		cy.get("@innerInput")
			.realClick();
		cy.get("@innerInput")
			.type("C");
		cy.get("@innerInput")
			.realPress("ArrowDown");
		cy.get("@innerInput")
			.realPress("Enter");

		cy.get("@innerInput")
			.should("have.value", "Compact");

		cy.get("@innerInput")
			.realClick();
		cy.get("@innerInput")
			.clear();
		cy.get("@innerInput")
			.type("N");
		cy.get("@innerInput")
			.realPress("Enter");

		cy.get("@innerInput")
			.should("have.value", "N");

		cy.then(() => {
			expect(eventCount).to.equal(2);
		});
	});
});

describe("Change event behavior when selecting the same suggestion item", () => {
	let changeCount = 0;

	beforeEach(() => {
		cy.mount(
			<Input id="myInput" showSuggestions placeholder="Search for a country ...">
			  <SuggestionItemGroup headerText="A">
					<SuggestionItem text="Afghanistan" />
					<SuggestionItem text="Argentina" />
					<SuggestionItem text="Albania" />
					<SuggestionItem text="Armenia" />
					<SuggestionItem text="Algeria" />
			  </SuggestionItemGroup>
			</Input>
		  );

		cy.get("#myInput")
			.as("input");

		cy.get("@input").then($el => {
			$el[0].addEventListener("change", () => {
				changeCount++;
			});
		});
	});

	it("Change event is not fired when the same suggestion item is selected (with typeahead)", () => {
		cy.get("@input")
			.realClick();

		cy.get("@input")
			.realType("a");

		cy.get("@input").realPress("Enter");
		cy.get("@input").should("have.value", "Afghanistan");

		cy.get("@input").realPress("Backspace");
		cy.get("@input").realPress("ArrowDown");
		cy.get("@input").realPress("ArrowDown");
		cy.get("@input").realPress("Enter");

		cy.get("@input").should("have.value", "Afghanistan");
		cy.then(() => {
			expect(changeCount).to.equal(1);
		});
	});

	it("Change event is not fired when the same suggestion item is selected (no-typeahead)", () => {
		cy.get("@input").invoke("attr", "value", "Afghanistan");
		cy.get("@input").invoke("attr", "no-typeahead", true);

		cy.get("@input").realPress("Backspace");

		cy.get("@input").realPress("ArrowDown");
		cy.get("@input").realPress("ArrowDown");
		cy.get("@input").realPress("Enter");

		cy.get("@input").should("have.value", "Afghanistan");
		cy.then(() => {
			expect(changeCount).to.equal(1);
		});
	});

	it("Change event is not fired when the same suggestion item is selected after focus out and selecting suggestion again", () => {
		cy.get("@input")
			.invoke("attr", "value", "Afghanistan");

		cy.get("@input")
			.realPress("Tab");

		cy.get("@input")
			.realClick();
		cy.get("@input")
			.realPress("ArrowDown");
		cy.get("@input")
			.realPress("ArrowDown");
		cy.get("@input")
			.realPress("Enter");

		cy.get("@input").should("have.value", "Afghanistan");
		cy.then(() => {
			expect(changeCount).to.equal(1);
		});
	});
});
