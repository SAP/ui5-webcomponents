import { html } from "lit";
import "../../src/TextArea.js";
import "../../src/Label.js";

describe("TextArea general interaction", () => {
	describe("Attribute propagation", () => {
		it("Should change the placeholder of the inner textarea", () => {
			const attributeValue = "test";

			cy.mount(html`<ui5-textarea placeholder=${attributeValue}></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "placeholder", attributeValue);
		});

		it("Disabled attribute is propagated properly", () => {
			cy.mount(html`<ui5-textarea disabled></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "disabled");
		});

		it("Redonly attribute is propagated properly", () => {
			cy.mount(html`<ui5-textarea readonly></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "readonly");
		});

		it("Required attribute is propagated properly", () => {
			cy.mount(html`<ui5-textarea required></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "aria-required", "true");

			cy.mount(html`<ui5-textarea></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "aria-required", "false");
		});

		it("Value attribute is propagated properly", () => {
			const attributeValue = "test";

			cy.mount(html`<ui5-textarea value=${attributeValue}></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("have.value", attributeValue);
		});

		it("Tests aria-label", () => {
			const attributeValue = "test";

			cy.mount(html`<ui5-textarea accessible-name=${attributeValue}></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "aria-label", attributeValue);
		});

		it("Tests aria-labelledby", () => {
			const attributeValue = "test";

			cy.mount(html`<span id="ref">${attributeValue}</span>
			<ui5-textarea accessible-name-ref="ref"></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "aria-label", attributeValue);
		});

		it("Checks if aria-invalid is set correctly", () => {
			cy.mount(html`<ui5-textarea value-state="Negative"></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "aria-invalid", "true");

			cy.mount(html`<ui5-textarea value-state="Critical"></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("not.have.attr", "aria-invalid");
		});

		it("Tests aria-label is set to match the label text when label is for that text area", () => {
			const attributeValue = "test";

			cy.mount(html`<ui5-label for="ref">${attributeValue}</ui5-label>
			<ui5-textarea id="ref"></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "aria-label", attributeValue);
		});

		it("Tests aria-label is set directly from the property accessible-name of the text-area", () => {
			const attributeValue = "test";

			cy.mount(html`<ui5-label for="ref">some text</ui5-label>
			<ui5-textarea id="ref" accessible-name="${attributeValue}"></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "aria-label", attributeValue);
		});
	});

	describe("disabled and readonly textarea", () => {
		it("can not be edited when disabled", () => {
			cy.mount(html`<ui5-textarea disabled></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.realPress("a")
				.realPress("b")
				.realPress("c");

			cy.get("@textarea")
				.shadow()
				.find("textarea")
				.should("have.value", "");
		});

		it("can not be edited when readonly", () => {
			cy.mount(html`<ui5-textarea readonly></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.realPress("a")
				.realPress("b")
				.realPress("c");

			cy.get("@textarea")
				.shadow()
				.find("textarea")
				.should("have.value", "");
		});
	});

	describe("when enabled", () => {
		it("shows value state message", () => {
			cy.mount(html`<ui5-textarea value-state="Negative"></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.shadow()
				.find("[ui5-popover].ui5-valuestatemessage-popover")
				.should("be.visible")
				.and("have.attr", "open");
		});

		it("does not show value state msg when valueState='None'", () => {
			cy.mount(html`<ui5-textarea value-state="None"></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.shadow()
				.find("[ui5-popover].ui5-valuestatemessage-popover")
				.should("not.exist");
		});

		it("Should not open value state message when textarea is in readonly state", () => {
			cy.mount(html`<ui5-textarea readonly value-state="Negative"></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.shadow()
				.find("[ui5-popover].ui5-valuestatemessage-popover")
				.should("not.exist");
		});

		it("fires change event", () => {
			cy.mount(html`<ui5-textarea></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.then(textarea => {
					textarea.get(0).addEventListener("ui5-change", cy.stub().as("changed"));
				});

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.realPress("a")
				.realPress("b")
				.realPress("c");

			cy.focused()
				.blur();

			cy.get("@changed")
				.should("have.been.calledOnce");
		});

		it("fires input event", () => {
			cy.mount(html`<ui5-textarea></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.then(textarea => {
					textarea.get(0).addEventListener("ui5-input", cy.stub().as("input"));
				});

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.realPress("a")
				.realPress("b")
				.realPress("c");

			cy.get("@input")
				.should("have.been.calledThrice");
		});
	});

	describe("when growing", () => {
		it("Should have 8 rows and grow", () => {
			cy.mount(html`<ui5-textarea growing rows="8"></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.then(textarea => {
					const initialTextareaSize = textarea.height();

					cy.focused()
						.type("1{enter}");

					cy.focused()
						.type("2{enter}");

					cy.focused()
						.type("3{enter}");

					cy.focused()
						.type("4{enter}");

					cy.focused()
						.type("5{enter}");

					cy.focused()
						.type("6{enter}");

					cy.focused()
						.type("7{enter}");

					cy.focused()
						.type("8");

					cy.get("@textarea")
						.invoke("height")
						.should("be.equal", initialTextareaSize);

					cy.focused()
						.realType("{enter}9");

					cy.get("@textarea")
						.invoke("height")
						.should("be.greaterThan", initialTextareaSize);
				});
		});

		it("Should have 8 rows and grow", () => {
			cy.mount(html`<ui5-textarea growing growing-max-rows="4"></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.then(textarea => {
					const initialTextareaSize = textarea.height();

					cy.get("@textarea")
						.realType("1{enter}")
						.realType("2");

					cy.get("@textarea")
						.invoke("height")
						.should("be.equal", initialTextareaSize);
				});

			cy.get("@textarea")
				.then(textarea => {
					const initialTextareaSize = textarea.height();

					cy.get("@textarea")
						.realType("{enter}3")
						.realType("{enter}4");

					cy.get("@textarea")
						.invoke("height")
						.should("be.greaterThan", initialTextareaSize);
				});

			cy.get("@textarea")
				.then(textarea => {
					const initialTextareaSize = textarea.height();

					cy.get("@textarea")
						.realType("{enter}5")
						.realType("{enter}6");

					cy.get("@textarea")
						.invoke("height")
						.should("be.equal", initialTextareaSize);
				});
		});
	});

	describe("When having max length set", () => {
		it("prevents input when max is reached", () => {
			cy.mount(html`<ui5-textarea maxlength="10"></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.realType("123456789123456789121111");

			cy.get("@textarea")
				.shadow()
				.find("textarea")
				.should("have.value", "1234567891");
		});

		describe("When having max length set", () => {
			it("Shows counter", () => {
				cy.mount(html`<ui5-textarea maxlength="10" show-exceeded-text></ui5-textarea>`);

				cy.get("[ui5-textarea]")
					.as("textarea");

				cy.get("@textarea")
					.realClick();

				cy.get("@textarea")
					.should("be.focused");

				cy.get("@textarea")
					.shadow()
					.find(".ui5-textarea-exceeded-text")
					.as("exceededText")
					.should("contain.text", "10 characters remaining");

				cy.get("@textarea")
					.realType("1234567890");

				cy.get("@exceededText")
					.should("contain.text", "0 characters remaining");

				cy.get("@textarea")
					.realType("12345");

				cy.get("@exceededText")
					.should("contain.text", "5 characters over limit");
			});

			it("Shows exceeded text when maxLength is 0", () => {
				cy.mount(html`<ui5-textarea maxlength="0" show-exceeded-text></ui5-textarea>`);

				cy.get("[ui5-textarea]")
					.as("textarea");

				cy.get("@textarea")
					.realClick();

				cy.get("@textarea")
					.should("be.focused");

				cy.get("@textarea")
					.shadow()
					.find(".ui5-textarea-exceeded-text")
					.as("exceededText")
					.should("contain.text", "0 characters remaining");

				cy.get("@textarea")
					.realType("12345");

				cy.get("@exceededText")
					.should("contain.text", "5 characters over limit");
			});
		});
	});

	describe("Value update", () => {
		it("Should revert the DOM value, when escape is pressed", () => {
			cy.mount(html`<ui5-textarea></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.realType("1234");

			cy.get("@textarea")
				.shadow()
				.find("textarea")
				.should("have.value", "1234");

			cy.get("@textarea")
				.realPress("Escape");

			cy.get("@textarea")
				.shadow()
				.find("textarea")
				.should("have.value", "");
		});

		it("Value state type should be added to the screen readers default value states announcement", () => {
			// Negative
			cy.mount(html`<ui5-textarea value-state="Negative"></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.shadow()
				.find("[ui5-popover].ui5-valuestatemessage-popover")
				.should("be.visible")
				.should("have.text", "Invalid entry")
				.and("have.attr", "open");

			cy.get("@textarea")
				.shadow()
				.find(".ui5-hidden-text")
				.should("have.text", "Value State Error Invalid entry");

			// Critical
			cy.mount(html`<ui5-textarea value-state="Critical"></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.shadow()
				.find("[ui5-popover].ui5-valuestatemessage-popover")
				.should("be.visible")
				.should("have.text", "Warning issued")
				.and("have.attr", "open");

			cy.get("@textarea")
				.shadow()
				.find(".ui5-hidden-text")
				.should("have.text", "Value State Warning Warning issued");

			// Critical
			cy.mount(html`<ui5-textarea value-state="Critical"></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.shadow()
				.find("[ui5-popover].ui5-valuestatemessage-popover")
				.should("be.visible")
				.should("have.text", "Warning issued")
				.and("have.attr", "open");

			cy.get("@textarea")
				.shadow()
				.find(".ui5-hidden-text")
				.should("have.text", "Value State Warning Warning issued");

			// Information
			cy.mount(html`<ui5-textarea value-state="Information"></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.shadow()
				.find("[ui5-popover].ui5-valuestatemessage-popover")
				.should("be.visible")
				.should("have.text", "Informative entry")
				.and("have.attr", "open");

			cy.get("@textarea")
				.shadow()
				.find(".ui5-hidden-text")
				.should("have.text", "Value State Information Informative entry");

			// Custom
			cy.mount(html`<ui5-textarea value-state="Negative">
				<div slot="valueStateMessage">Custom message</div>
			</ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.find("[slot=\"valueStateMessage\"]")
				.should("be.visible")
				.should("have.text", "Custom message");

			cy.get("@textarea")
				.shadow()
				.find(".ui5-hidden-text")
				.should("have.text", "Value State Error Custom message");
		});

		it("Should select all exceeded characters on paste", () => {
			const text = "Text longer then twenty characters";
			const maxlength = 20;
			const expectedSelectionRange = text.length - maxlength;

			cy.mount(html`<ui5-textarea value="${text}" maxlength="${maxlength}" show-exceeded-text></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.shadow()
				.find("textarea")
				.as("nativeTextarea")
				.then($nativeTextarea => {
					const inputElement = $nativeTextarea.get(0);

					const inputEvent = new InputEvent("input", {
						inputType: "insertFromPaste",
						data: text,
					});

					inputElement.dispatchEvent(inputEvent);
				});

			cy.get<HTMLTextAreaElement>("@nativeTextarea")
				.then(textarea => {
					return textarea.get(0).selectionEnd - textarea.get(0).selectionStart;
				})
				.should("be.equal", expectedSelectionRange);

			cy.get("@textarea")
				.shadow()
				.find(".ui5-textarea-exceeded-text")
				.should("contain.text", `${expectedSelectionRange} characters over limit`);
		});
	});

	describe("selection events", () => {
		it("fires select event", () => {
			cy.mount(html`<ui5-textarea style="height: 320px; width: 400px" value="Ipsum enim esse ipsum cupidatat ex veniam labore quis irure. Eiusmod labore anim anim nulla aute ut. Aliqua officia non ex cupidatat consequat non magna eiusmod aliquip laborum aliqua excepteur exercitation. Pariatur deserunt dolore aute sint in minim nisi magna proident proident consequat exercitation consectetur nostrud. Sint voluptate consectetur eu mollit non ullamco minim. In enim velit ea Lorem fugiat nulla esse deserunt nulla cupidatat non. Excepteur proident non ad anim enim culpa occaecat magna incididunt consequat do. Enim minim quis nisi enim est voluptate irure laborum ea cillum eu. Aliquip labore officia amet non exercitation dolore enim incididunt ullamco irure nulla ad nulla et. Ipsum enim esse ipsum cupidatat ex veniam labore quis irure. Eiusmod labore anim anim nulla aute ut. Aliqua officia non ex cupidatat consequat non magna eiusmod aliquip laborum aliqua excepteur exercitation. Pariatur deserunt dolore aute sint in minim nisi magna proident proident consequat exercitation consectetur nostrud. Sint voluptate consectetur eu mollit non ullamco minim. In enim velit ea Lorem fugiat nulla esse deserunt nulla cupidatat non. Excepteur proident non ad anim enim culpa occaecat magna incididunt consequat do. Enim minim quis nisi enim est voluptate irure laborum ea cillum eu. Aliquip labore officia amet non exercitation dolore enim incididunt ullamco irure nulla ad nulla et."></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.as("textarea")
				.then(textarea => {
					textarea.get(0).addEventListener("ui5-select", cy.stub().as("select"));
				});

			cy.get("@textarea")
				.realClick({ clickCount: 2 });

			cy.get("@select")
				.should("have.been.calledOnce");
		});

		it("fires select event", () => {
			cy.mount(html`<ui5-textarea style="height: 320px; width: 400px" value="Ipsum enim esse ipsum cupidatat ex veniam labore quis irure. Eiusmod labore anim anim nulla aute ut. Aliqua officia non ex cupidatat consequat non magna eiusmod aliquip laborum aliqua excepteur exercitation. Pariatur deserunt dolore aute sint in minim nisi magna proident proident consequat exercitation consectetur nostrud. Sint voluptate consectetur eu mollit non ullamco minim. In enim velit ea Lorem fugiat nulla esse deserunt nulla cupidatat non. Excepteur proident non ad anim enim culpa occaecat magna incididunt consequat do. Enim minim quis nisi enim est voluptate irure laborum ea cillum eu. Aliquip labore officia amet non exercitation dolore enim incididunt ullamco irure nulla ad nulla et. Ipsum enim esse ipsum cupidatat ex veniam labore quis irure. Eiusmod labore anim anim nulla aute ut. Aliqua officia non ex cupidatat consequat non magna eiusmod aliquip laborum aliqua excepteur exercitation. Pariatur deserunt dolore aute sint in minim nisi magna proident proident consequat exercitation consectetur nostrud. Sint voluptate consectetur eu mollit non ullamco minim. In enim velit ea Lorem fugiat nulla esse deserunt nulla cupidatat non. Excepteur proident non ad anim enim culpa occaecat magna incididunt consequat do. Enim minim quis nisi enim est voluptate irure laborum ea cillum eu. Aliquip labore officia amet non exercitation dolore enim incididunt ullamco irure nulla ad nulla et."></ui5-textarea>`);

			cy.get("[ui5-textarea]")
				.as("textarea")
				.then(textarea => {
					textarea.get(0).addEventListener("ui5-scroll", cy.stub().as("scroll"));
				});

			cy.get("@textarea")
				.shadow()
				.find("textarea")
				.then(nativeTextarea => {
					nativeTextarea.get(0).scroll({ top: 100 });
				});

			cy.get("@scroll")
				.should("have.been.calledOnce");
		});
	});
});
