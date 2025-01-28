import { html } from "lit";
import "../../src/Input.js";
import type Input from "../../src/Input.js";
import "../../src/SuggestionItem.js";
import "../../src/SuggestionItemCustom.js";
import "../../src/SuggestionItemGroup.js";
import "../../src/features/InputSuggestions.js";

describe("Input Tests", () => {
	it("tets input event prevention", () => {
		cy.mount(html`
			<ui5-input></ui5-input>
		`);

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
		cy.mount(html`
			<ui5-input show-suggestions>
				<ui5-suggestion-item-custom text="Item 1">Item 1</ui5-suggestion-item-custom>
				<ui5-suggestion-item-custom text="Item 2">Item 2</ui5-suggestion-item-custom>
				<ui5-suggestion-item-custom text="Item 3">Item 3</ui5-suggestion-item-custom>
			</ui5-input>
		`);

		cy.get("[ui5-input]")
			.as("input");

		cy.get<Input>("@input")
			.shadow()
			.find("input")
			.as("inner");

		cy.get("@inner").realClick();
		cy.get("@inner").type("i");
		cy.get("@inner").realPress("ArrowDown");

		cy.get("@input")
			.find("[ui5-suggestion-item-custom]")
			.shadow()
			.find("li")
			.should("not.have.attr", "tabindex", "0")
			.should("have.attr", "role", "option");
	});

	it("tests regular suggestion items tabindex", () => {
		cy.mount(html`
			<ui5-input show-suggestions>
				<ui5-suggestion-item text="Item 1"></ui5-suggestion-item>
				<ui5-suggestion-item text="Item 2"></ui5-suggestion-item>
				<ui5-suggestion-item text="Item 3"></ui5-suggestion-item>
			</ui5-input>
		`);

		cy.get("[ui5-input]")
			.as("input");

		cy.get<Input>("@input")
			.shadow()
			.find("input")
			.as("inner");

		cy.get("@inner").realClick();
		cy.get("@inner").type("i");
		cy.get("@inner").realPress("ArrowDown");

		cy.get("@input")
			.find("ui5-suggestion-item")
			.shadow()
			.find("li")
			.should("not.have.attr", "tabindex", "0")
			.should("have.attr", "role", "option");
	});

	it("tests suggestion group items tabindex", () => {
		cy.mount(html`
			<ui5-input show-suggestions>
				<ui5-suggestion-item-group header-text="Group 1">
					<ui5-suggestion-item text="Item 1"></ui5-suggestion-item>
					<ui5-suggestion-item text="Item 2"></ui5-suggestion-item>
					<ui5-suggestion-item text="Item 3"></ui5-suggestion-item>
				</ui5-suggestion-item-group>
				<ui5-suggestion-item-group header-text="Group 2">
					<ui5-suggestion-item text="Item 4"></ui5-suggestion-item>
					<ui5-suggestion-item text="Item 5"></ui5-suggestion-item>
					<ui5-suggestion-item text="Item 6"></ui5-suggestion-item>
				</ui5-suggestion-item-group>
			</ui5-input>
		`);

		cy.get("[ui5-input]")
			.as("input");

		cy.get<Input>("@input")
			.shadow()
			.find("input")
			.as("inner");

		cy.get("@inner").realClick();
		cy.get("@inner").type("i");
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
		cy.mount(`
			<ui5-input id="myInputEsc" show-suggestions class="input3auto">
		<ui5-suggestion-item text="Chromium"></ui5-suggestion-item>
		<ui5-suggestion-item text="Titanium"></ui5-suggestion-item>
		<ui5-suggestion-item text="Iron"></ui5-suggestion-item>
		<ui5-suggestion-item text="Gold"></ui5-suggestion-item>
		<ui5-suggestion-item text="Silver"></ui5-suggestion-item>
	</ui5-input>
			`);

		cy.get("ui5-input")
			.as("input");

		cy.get("@input")
			.realClick();
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("@input")
			.realType("C");
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("@input")
			.realPress("ArrowDown");
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("@input")
			.should("have.attr", "value", "Titanium");

		cy.get("@input")
			.realPress("Escape");
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("@input")
			.should("have.value", "C");
	});

	it("tests selection-change with custom items", () => {
		cy.mount(`<ui5-input id="myInput2" show-suggestions class="input3auto">
		<ui5-suggestion-item text="Cozy"></ui5-suggestion-item>
		<ui5-suggestion-item text="Compact"></ui5-suggestion-item>
		<ui5-suggestion-item text="Condensed"></ui5-suggestion-item>
		<ui5-suggestion-item text="Compact"></ui5-suggestion-item>
		<ui5-suggestion-item text="Condensed"></ui5-suggestion-item>
	</ui5-input>`);

		cy.get("ui5-input")
			.as("input");

		cy.get("@input")
			.realClick();
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("@input")
			.realPress("c");
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("@input")
			.realPress("ArrowDown");
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("@input")
			.should("have.value", "Compact")
			.should("not.have.attr", "focused");

		cy.get("ui5-suggestion-item")
			.eq(1)
			.should("have.attr", "focused");

		cy.get("@input")
			.realPress("ArrowDown");
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

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
		cy.mount(`<ui5-input id="inputError" class="input2auto" show-suggestions value-state="Negative"
			placeholder="Search for a country ...">
			<div slot="valueStateMessage">Custom error value state message with a <a href="#">Link</a>.</div>
			<ui5-suggestion-item text="Cozy"></ui5-suggestion-item>
			<ui5-suggestion-item text="Compact"></ui5-suggestion-item>
			<ui5-suggestion-item text="Condensed"></ui5-suggestion-item>
			<ui5-suggestion-item text="Compact"></ui5-suggestion-item>
			<ui5-suggestion-item text="Condensed"></ui5-suggestion-item>
			</ui5-input>`);

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
		cy.mount(`<ui5-input id="myInput2" show-suggestions class="input3auto">
		<ui5-suggestion-item text="Cozy"></ui5-suggestion-item>
		<ui5-suggestion-item text="Compact"></ui5-suggestion-item>
		<ui5-suggestion-item text="Condensed"></ui5-suggestion-item>
		<ui5-suggestion-item text="Compact"></ui5-suggestion-item>
		<ui5-suggestion-item text="Condensed"></ui5-suggestion-item>
		</ui5-input>`);

		cy.get("#myInput2").click();
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);
		cy.get("#myInput2").realType("c");
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);
		cy.get("#myInput2").realPress("ArrowDown");
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("ui5-suggestion-item").eq(1).should("have.attr", "text", "Compact");
		cy.get("#myInput2").should("not.have.attr", "focused");
		cy.get("ui5-suggestion-item").eq(1).should("have.attr", "focused");

		cy.get("#myInput2")
			.realPress("ArrowDown");
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("ui5-suggestion-item").eq(2).should("have.attr", "focused");
		cy.get("ui5-suggestion-item").eq(1).should("not.have.attr", "focused");

		cy.get("#myInput2")
			.realPress("ArrowUp");
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("ui5-suggestion-item").eq(1).should("have.attr", "focused");
		cy.get("ui5-suggestion-item").eq(2).should("not.have.attr", "focused");

		cy.get("#myInput2").realPress("ArrowUp");
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);
		cy.get("#myInput2").realPress("ArrowUp");
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("#myInput2").should("have.attr", "focused");
		cy.get("ui5-suggestion-item").first().should("not.have.attr", "focused");
	});
});

describe("Input PAGEUP/PAGEDOWN navigation", () => {
	beforeEach(() => {
		cy.mount(`<ui5-input id="myInput" show-suggestions placeholder="Search for a country ...">
			<ui5-suggestion-item-group header-text="A">
 	  	<ui5-suggestion-item text="Afghanistan"></ui5-suggestion-item>
 	  	<ui5-suggestion-item text="Argentina"></ui5-suggestion-item>
 	  	<ui5-suggestion-item text="Albania"></ui5-suggestion-item>
		 <ui5-suggestion-item text="Armenia"></ui5-suggestion-item>
	  	<ui5-suggestion-item text="Algeria"></ui5-suggestion-item>
		<ui5-suggestion-item text="Andorra"></ui5-suggestion-item>
		<ui5-suggestion-item text="Angola"></ui5-suggestion-item>
		<ui5-suggestion-item text="Austria"></ui5-suggestion-item>
		<ui5-suggestion-item text="Australia"></ui5-suggestion-item>
		<ui5-suggestion-item text="Azerbaijan"></ui5-suggestion-item>
		<ui5-suggestion-item text="Aruba"></ui5-suggestion-item>
		<ui5-suggestion-item text="Antigua and Barbuda"></ui5-suggestion-item>
		</ui5-suggestion-item-group>
	  	</ui5-input>`);
	});
	it("Should focus the tenth item from the suggestions popover with PAGEDOWN", () => {
		cy.get("ui5-input")
			.as("input");

		cy.get("@input")
			.realClick();
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("@input")
			.realType("a");
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("@input")
			.realPress("ArrowDown");
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("@input")
			.realPress("PageDown");
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

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
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("@input")
			.realType("a");
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("@input")
			.realPress("ArrowUp");
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("ui5-suggestion-item-group")
			.eq(0)
			.should("have.attr", "focused");

		cy.get("@input")
			.realPress("PageDown");
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("@input")
			.realPress("PageUp");
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("ui5-suggestion-item-group")
			.eq(0)
			.should("have.attr", "focused");
	});
});

describe("Selection-change event", () => {
	it("Selection-change event fires with null arguments when suggestion was selected but user alters input value to something else", () => {
		cy.mount(`<Ui5-input id="input-selection-change" show-suggestions>
		<ui5-suggestion-item text="Cozy"></ui5-suggestion-item>
		<ui5-suggestion-item text="Compact"></ui5-suggestion-item>
		<ui5-suggestion-item text="Condensed"></ui5-suggestion-item>
		</Ui5-input>`);

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
			.click();
		cy.get("@innerInput")
			.type("C");
		cy.get("@innerInput")
			.realPress("ArrowDown");
		cy.get("@innerInput")
			.realPress("Enter");

		cy.get("@innerInput")
			.should("have.value", "Compact");

		cy.get("@innerInput")
			.click();
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
		cy.mount(`<ui5-input id="myInput" show-suggestions placeholder="Search for a country ...">
			<ui5-suggestion-item-group header-text="A">
 	  	<ui5-suggestion-item text="Afghanistan"></ui5-suggestion-item>
 	  	<ui5-suggestion-item text="Argentina"></ui5-suggestion-item>
 	  	<ui5-suggestion-item text="Albania"></ui5-suggestion-item>
		 <ui5-suggestion-item text="Armenia"></ui5-suggestion-item>
	  	<ui5-suggestion-item text="Algeria"></ui5-suggestion-item>
		</ui5-suggestion-item-group>
	  	</ui5-input>`);

		cy.get("#myInput").then($el => {
			$el[0].addEventListener("change", () => {
				changeCount++;
			});
		});
	});

	it("Change event is not fired when the same suggestion item is selected (with typeahead)", () => {
		cy.get("#myInput")
			.click();

		cy.get("#myInput")
			.realType("a");

		cy.get("#myInput").realPress("Enter");
		cy.get("#myInput").should("have.value", "Afghanistan");

		cy.get("#myInput").realPress("Backspace");
		cy.get("#myInput").realPress("ArrowDown");
		cy.get("#myInput").realPress("ArrowDown");
		cy.get("#myInput").realPress("Enter");

		cy.get("#myInput").should("have.value", "Afghanistan");
		cy.then(() => {
			expect(changeCount).to.equal(1);
		});
	});

	it("Change event is not fired when the same suggestion item is selected (no-typeahead)", () => {
		cy.get("#myInput").invoke("attr", "value", "Afghanistan");
		cy.get("#myInput").invoke("attr", "no-typeahead", true);

		cy.get("#myInput").realPress("Backspace");

		cy.get("#myInput").realPress("ArrowDown");
		cy.get("#myInput").realPress("ArrowDown");
		cy.get("#myInput").realPress("Enter");

		cy.get("#myInput").should("have.value", "Afghanistan");
		cy.then(() => {
			expect(changeCount).to.equal(1);
		});
	});

	it("Change event is not fired when the same suggestion item is selected after focus out and selecting suggestion again", () => {
		cy.get("#myInput")
			.invoke("attr", "value", "Afghanistan");

		cy.get("#myInput")
			.realPress("Tab");

		cy.get("#myInput")
			.realClick();
		cy.get("#myInput")
			.realPress("ArrowDown");
		cy.get("#myInput")
			.realPress("ArrowDown");
		cy.get("#myInput")
			.realPress("Enter");

		cy.get("#myInput").should("have.value", "Afghanistan");
		cy.then(() => {
			expect(changeCount).to.equal(1);
		});
	});
});
