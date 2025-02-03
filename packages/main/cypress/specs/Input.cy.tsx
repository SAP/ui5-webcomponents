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
