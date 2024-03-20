import { html } from 'lit';

describe("Attributes propagation", () => {
	it("Should change the placeholder of the inner input", () => {
		cy.mount(html`<ui5-input
		show-suggestions
		placeholder="Search for a country ..."
	>
	</ui5-input>`)
		const sExpected = "New placeholder text";

		cy.get("[ui5-input]")
			.as("input");

		cy.get("@input")
			.then($input => {
				$input.attr("placeholder", sExpected);
			});

		cy.get("@input")
			.shadow()
			.find("input")
			.should("have.attr", "placeholder", sExpected, "The placeholder was set correctly")
	});

	it("Disabled attribute is propagated properly", () => {
		cy.mount(html`<ui5-input disabled placeholder="Disabled one ...">
		<ui5-icon slot="icon" name="appointment-2"></ui5-icon>
	</ui5-input>`)

		cy.get("[ui5-input]")
			.shadow()
			.find(".ui5-input-inner")
			.should("have.attr", "disabled")
	});

	it("Redonly attribute is propagated properly", () => {
		cy.mount(html`<ui5-input value="Value can\`t be changed" readonly></ui5-input>`)

		cy.get("[ui5-input]")
			.shadow()
			.find(".ui5-input-inner")
			.should("have.attr", "readonly");
	});

	it("Required attribute is propagated properly", () => {
		cy.mount(html`<ui5-input value="This input is required" required></ui5-input>`)

		cy.get("[ui5-input]")
			.shadow()
			.find(".ui5-input-inner")
			.should("have.attr", "aria-required", "true", "Aria-required attribute is set correctly");
	});

	it("Required attribute is propagated properly", () => {
		cy.mount(html`<ui5-input type="Number" placeholder="Numbers are allowed only ..."></ui5-input>`)

		cy.get("[ui5-input]")
			.shadow()
			.find(".ui5-input-inner")
			.should("have.attr", "aria-required", "false", "Aria-required attribute is set correctly");
	});

	it("Value attribute is propagated properly", () => {
		cy.mount(html`<ui5-input placeholder="Search ...">
		<ui5-icon slot="icon" name="search"></ui5-icon>
		<ui5-icon slot="icon" name="decline"></ui5-icon>
	</ui5-input>`)

		const sExpectedValue = "Test test";

		cy.get("[ui5-input]")
			.as("input");

		cy.get("@input")
			.then($input => {
				$input.attr("value", sExpectedValue)
			})

		cy.get("@input")
			.shadow()
			.find(".ui5-input-inner")
			.should("have.value", sExpectedValue, "Value property was set correctly");
	});

	it("sets empty value to an input", () => {
		cy.mount(html`<ui5-input value-state="Warning" placeholder="Warning state ..."></ui5-input>`)

		cy.get("[ui5-input]")
			.as("input");

		cy.get("@input")
			.then($input => {
				$input.attr("value", "")
			})

		cy.get("@input")
			.should("have.value", "", "Property value should be empty");

		cy.get("@input")
			.shadow()
			.find("input")
			.should("have.value", "", "Inner's property value should be empty");
	});
})

describe("Input general interaction", () => {
	it("Should not open suggestions popover when focused", () => {
		cy.mount(html`<ui5-input show-suggestions>
		<ui5-li>Cozy</ui5-li>
		<ui5-li>Compact</ui5-li>
		<ui5-li>Condensed</ui5-li>
		<ui5-li type="Inactive">Inactive Compact</ui5-li>
		<ui5-li type="Inactive">Inactive Condensed</ui5-li>
	</ui5-input>`);

		cy.get("[ui5-input]")
			.as("input");

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.ui5ElementGetStaticAreaItem()
			.find("[ui5-responsive-popover]")
			.should("not.be.visible")
	});

	it("fires change", () => {
		cy.mount(html`<ui5-input value-state="Warning" placeholder="Warning state ..."></ui5-input>`);

		cy.get("[ui5-input]")
			.as("input");

		cy.get("@input")
			.then((button) => {
				button.get(0).addEventListener('ui5-change', cy.stub().as('changed'))
			})

		cy.get("@input")
			.realClick()

		// Start typing.
		cy.get("@input")
			.realType("abc")

		cy.get("@input").blur();

		cy.get("@input")
			.should("have.value", "abc");

		cy.get("@input")
			.realClick()

		// Get back and continue typing.
		cy.get("@input")
			.realType("def")

		cy.get("@input").blur();

		cy.get("@changed")
			.should("have.been.calledTwice");

		cy.get("@input")
			.should("have.value", "abcdef");
	});

	it("fires change on tab", () => {
		cy.mount(html`<ui5-input show-suggestions>
		<ui5-icon slot="icon" name="message-warning"></ui5-icon>
		<ui5-suggestion-item text="Project"></ui5-suggestion-item>
		<ui5-suggestion-item text="Fellowship"></ui5-suggestion-item>
		<ui5-suggestion-item text="Vocational Training"></ui5-suggestion-item>
	</ui5-input>`);

		cy.get("[ui5-input]")
			.as("input");

		cy.get("@input")
			.then((button) => {
				button.get(0).addEventListener('ui5-change', cy.stub().as('changed'))
			})

		cy.get("@input")
			.realClick()

		cy.wait(100) // BugFix

		cy.get("@input")
			.realType("c")

		cy.get("@input")
			.should("have.attr", "open");

		cy.get("@input")
			.realPress("ArrowDown")

		cy.get("@input")
			.blur();

		cy.get("@changed")
			.should("have.been.calledOnce");

		cy.get("@input")
			.should("have.value", "Project");
	});

	it("fires change only once when there was already a value on focus in", () => {
		cy.mount(html`<ui5-input show-suggestions value="Project">
		<ui5-icon slot="icon" name="message-warning"></ui5-icon>
		<ui5-suggestion-item text="Project"></ui5-suggestion-item>
		<ui5-suggestion-item text="Fellowship"></ui5-suggestion-item>
		<ui5-suggestion-item text="Vocational Training"></ui5-suggestion-item>
	</ui5-input>`);

		cy.get("[ui5-input]")
			.as("input");

		cy.get("@input")
			.then((button) => {
				button.get(0).addEventListener('ui5-change', cy.stub().as('changed'))
			})

		cy.get("@input")
			.realClick()

		cy.wait(100) // BugFix

		cy.get("@input")
			.realPress("Backspace")

		cy.get("@input")
			.should("have.attr", "open");

		cy.get("@input")
			.realPress("ArrowDown")

		cy.get("@input")
			.realPress("ArrowDown")

		cy.get("@input")
			.blur();

		cy.get("@changed")
			.should("have.been.calledOnce");

		cy.get("@input")
			.should("have.value", "Fellowship");
	});

	it("fires input", () => {
		cy.mount(html`<ui5-input value-state="Warning" placeholder="Warning state ..."></ui5-input>`);

		cy.get("[ui5-input]")
			.as("input");

		cy.get("@input")
			.then((button) => {
				button.get(0).addEventListener('ui5-input', cy.stub().as('inputed'))
			})

		cy.get("@input")
			.realClick()

		cy.get("@input")
			.realType("a")

		cy.get("@inputed")
			.should("have.been.calledOnce");

		cy.get("@input")
			.realType("a")

		cy.get("@inputed")
			.should("have.been.calledTwice");

		cy.get("@input")
			.realType("a")

		cy.get("@inputed")
			.should("have.been.calledThrice");

		cy.get("@input")
			.should("have.value", "aaa");
	});

	it("fires change when same value typed, but value is mutated via API in between", () => {
		cy.mount(html`<ui5-input id="inputChange"></ui5-input>`);

		cy.get("[ui5-input]")
			.as("input");

		cy.get("@input")
			.then((button) => {
				button.get(0).addEventListener('ui5-change', cy.stub().as('changed'))
			})

		cy.get("@input")
			.realClick()

		cy.get("@input")
			.realType("abc")

		// The submit event listener mutates the value via the API
		// Note: along with the sumbit event - the first change event is fired.
		cy.get("@input")
			.realPress("Enter")

		// Type the same value once again.
		cy.get("@input")
			.realType("abc")

		cy.get("@input")
			.blur();

		cy.get("@changed")
			.should("have.been.calledTwice");

		cy.get("@input")
			.should("have.value", "abcabc");
	});

	it("Change event behaviour when focusing", () => {
		cy.mount(html`<ui5-input show-suggestions placeholder="Search for a country ..."></ui5-input>`)

		cy.get("[ui5-input]")
			.as("input");

		cy.get("@input")
			.then((button) => {
				button.get(0).addEventListener('ui5-change', cy.stub().as('changed'))
			})

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.realType("z");

		cy.get("@input")
			.blur();

		cy.get("@changed")
			.should("have.been.calledOnce");

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.blur();

		cy.get("@changed")
			.should("have.been.calledOnce");

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.realType("f");

		cy.get("@input")
			.blur();

		cy.get("@changed")
			.should("have.been.calledTwice");

		cy.get("@input")
			.should("have.value", "zf");
	});

	it("Change event behaviour when focusing + ENTER", () => {
		cy.mount(html`<ui5-input show-suggestions placeholder="Search for a country ..."></ui5-input>`)

		cy.get("[ui5-input]")
			.as("input");

		cy.get("@input")
			.then((button) => {
				button.get(0).addEventListener('ui5-change', cy.stub().as('changed'))
			})

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.realType("z");

		cy.get("@input")
			.blur();

		cy.get("@changed")
			.should("have.been.calledOnce");

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.realPress("Enter");

		cy.get("@changed")
			.should("have.been.calledOnce");

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.realType("f");

		cy.get("@input")
			.realPress("Enter");

		cy.get("@changed")
			.should("have.been.calledTwice");

		cy.get("@input")
			.should("have.value", "zf");
	});
})