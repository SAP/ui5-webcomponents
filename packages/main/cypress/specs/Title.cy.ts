import { html } from "lit";
import "../../src/Title.js";

describe("Title", () => {
	describe("Rendering ", () => {
		it("h{n} tags rendered correctly", () => {
			cy.mount(html`<ui5-title id="titleH1" level="H1">Title Size 1</ui5-title>`);
			cy.get("#titleH1").shadow().find("h1").should("exist");

			cy.mount(html`<ui5-title id="titleAuto">Title Size Auto (2)</ui5-title>`);
			cy.get("#titleAuto").shadow().find("h2").should("exist");

			cy.mount(html`<ui5-title id="titleH2" level="H2">Title Size 2</ui5-title>`);
			cy.get("#titleH2").shadow().find("h2").should("exist");

			cy.mount(html`<ui5-title id="titleH3" level="H3">Title Size 3</ui5-title>`);
			cy.get("#titleH3").shadow().find("h3").should("exist");

			cy.mount(html`<ui5-title id="titleH4" level="H4">Title Size 4</ui5-title>`);
			cy.get("#titleH4").shadow().find("h4").should("exist");

			cy.mount(html`<ui5-title id="titleH5" level="H5">Title Size 5</ui5-title>`);
			cy.get("#titleH5").shadow().find("h5").should("exist");

			cy.mount(html`<ui5-title id="titleH6" level="H6">Title Size 6</ui5-title>`);
			cy.get("#titleH6").shadow().find("h6").should("exist");
		});

		it("should wrap the text of the title", () => {
			cy.mount(html`<ui5-title size="H6" level="H6" id="wrapping-title" style="width: 200px;">Wrapping Title Lorem Ipsum Dolor, Sit Amet Consectetur Adipisicing Elit. Numquam, Ab.</ui5-title>`);
			cy.get("#wrapping-title").should("have.css", "height", "64px");

			cy.mount(html`<ui5-title size="H6" level="H6" id="truncated-title" wrapping-type="None" style="width: 200px;">Truncated Title Lorem Ipsum Dolor, Sit Amet Consectetur Adipisicing Elit. Numquam, Ab.</ui5-title>`);
			cy.get("#truncated-title").should("have.css", "height", "16px");
		});
	});
});
