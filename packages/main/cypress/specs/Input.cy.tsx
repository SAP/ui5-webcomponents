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

	it("tests submit and change event order", () => {
		cy.mount(
			<form>
				<Input></Input>
			</form>
		);

		cy.get("form")
			.as("form");

		cy.get("[ui5-input]")
			.as("input");

		// spy change event
		cy.get<Input>("@input")
			.then($input => {
				$input.get(0).addEventListener("change", cy.spy().as("change"));
			});

		// spy submit event and prevent it
		cy.get("@form")
			.then($form => {
				$form.get(0).addEventListener("submit", e => e.preventDefault());
				$form.get(0).addEventListener("submit", cy.spy().as("submit"));
			});

		// check if submit is triggered after change
		cy.get<Input>("@input")
			.shadow()
			.find("input")
			.type("test{enter}");

		cy.get("@change").should("have.been.calledBefore", cy.get("@submit"));
		cy.get("@submit").should("have.been.calledOnce");
		cy.get("@change").should("have.been.calledOnce");
	});

	it("tests if pressing enter twice fires submit 2 times and change once", () => {
		cy.mount(
			<form>
				<Input></Input>
			</form>
		);

		cy.get("form")
			.as("form");

		cy.get("[ui5-input]")
			.as("input");

		// spy change event
		cy.get<Input>("@input")
			.then($input => {
				$input.get(0).addEventListener("change", cy.spy().as("change"));
			});

		// spy submit event and prevent it
		cy.get("@form")
			.then($form => {
				$form.get(0).addEventListener("submit", e => e.preventDefault());
				$form.get(0).addEventListener("submit", cy.spy().as("submit"));
			});

		// check if submit is triggered after change
		cy.get<Input>("@input")
			.shadow()
			.find("input")
			.type("test{enter}{enter}");

		cy.get("@change").should("have.been.calledBefore", cy.get("@submit"));
		cy.get("@submit").should("have.been.calledTwice");
		cy.get("@change").should("have.been.calledOnce");
	});

	it("tests if submits value if suggestion is autocompleted", () => {
		cy.mount(
			<form>
				<Input showSuggestions={true}>
					<SuggestionItem text="Hello"></SuggestionItem>
				</Input>
			</form>
		);

		cy.get("form")
			.as("form");

		cy.get("[ui5-input]")
			.as("input");

		// spy change event
		cy.get<Input>("@input")
			.then($input => {
				$input.get(0).addEventListener("change", cy.spy().as("change"));
			});

		// spy submit event and prevent it
		cy.get("@form")
			.then($form => {
				$form.get(0).addEventListener("submit", e => e.preventDefault());
				$form.get(0).addEventListener("submit", cy.spy().as("submit"));
			});

		// checks when the submit is triggered
		cy.get<Input>("@input")
			.shadow()
			.find("input")
			.as("inner");

		cy.get("@inner").realClick();
		cy.get("@inner").type("H{enter}");

		cy.get("@submit").should("have.not.been.called");
		cy.get("@change").should("have.been.calledOnce");

		cy.get("@inner").realPress("Enter");

		cy.get("@submit").should("have.been.calledOnce");
		cy.get("@change").should("have.been.calledOnce");
	});

	it("tests if submits value if suggestion is autocompleted", () => {
		cy.mount(
			<form>
				<Input showSuggestions={true}>
					<SuggestionItem text="Hello"></SuggestionItem>
				</Input>
			</form>
		);

		cy.get("form")
			.as("form");

		cy.get("[ui5-input]")
			.as("input");

		// spy change event
		cy.get<Input>("@input")
			.then($input => {
				$input.get(0).addEventListener("change", cy.spy().as("change"));
			});

		// spy submit event and prevent it
		cy.get("@form")
			.then($form => {
				$form.get(0).addEventListener("submit", e => e.preventDefault());
				$form.get(0).addEventListener("submit", cy.spy().as("submit"));
			});

		// checks when the submit is triggered
		cy.get<Input>("@input")
			.shadow()
			.find("input")
			.as("inner");

		cy.get("@inner").realClick();
		cy.get("@inner").type("H{downArrow}{enter}");

		cy.get("@submit").should("have.not.been.called");
		cy.get("@change").should("have.been.calledOnce");

		cy.get<Input>("@input")
			.shadow()
			.find("input")
			.type("{enter}");

		cy.get("@submit").should("have.been.calledOnce");
		cy.get("@change").should("have.been.calledOnce");
	});
});
