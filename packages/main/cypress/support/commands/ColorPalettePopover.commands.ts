Cypress.Commands.add("ui5PaletteOpen", { prevSubject: true }, (prevSubject, options) => {
	cy.wrap(prevSubject)
		.as("palette")
		.then($palette => {
			if (options?.opener) {
				cy.wrap($palette)
					.invoke("attr", "opener", options.opener);
			}

			cy.wrap($palette)
				.invoke("attr", "open", true);
		});

	cy.get("@palette")
		.ui5PaletteOpened();
});

Cypress.Commands.add("ui5PaletteOpened", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.as("palette");

	cy.get("@palette")
		.should("have.attr", "open");

	cy.get("@palette")
		.shadow()
		.find("[ui5-responsive-popover]")
		.should($rp => {
			expect($rp.is(":popover-open")).to.be.true;
			expect($rp.width()).to.not.equal(0);
			expect($rp.height()).to.not.equal(0);
		})
		.and("have.attr", "open");
});


declare global {
	namespace Cypress {
		interface Chainable {
			ui5PaletteOpen(options?: { opener?: string }): Chainable<void>
			ui5PaletteOpened(): Chainable<void>
		}
	}
}