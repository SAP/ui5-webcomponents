import Text from "../../src/Text.js";

describe("Text", () => {
	it("tests root element is bdi", () => {
		cy.mount(<Text>Text</Text>);
		cy.get("[ui5-text]").shadow().find(":first-child").should("have.prop", "tagName", "SPAN");
	});

	it("tests default wrapping behavior", () => {
		cy.mount(<Text >Text</Text>);
		cy.get("[ui5-text]").should("have.css", "word-wrap", "break-word");
	});

	it("tests maxLines default behavior", () => {
		cy.mount(<Text >Text</Text>);
		cy.get("[ui5-text]").should("have.css", "-webkit-line-clamp", "none");
	});

	it("tests maxLines", () => {
		cy.mount(<Text maxLines={1}>Text</Text>);
		cy.get("[ui5-text]").should("have.css", "-webkit-line-clamp", "1");
	});

	it("tests emptyIndicatorMode", () => {
		cy.mount(<Text emptyIndicatorMode="On"></Text>);

		cy.get("[ui5-text]").shadow().find(".empty-indicator").should("have.text", "–");
		cy.get("[ui5-text]").shadow().find(".empty-indicator-aria-label").should("have.text", "Empty Value");
	});
});
