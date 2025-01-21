Cypress.Commands.add("ui5UserMenuOpen", { prevSubject: true }, (prevSubject, options) => {
	cy.wrap(prevSubject)
		.as("userMenu")
		.then($userMenu => {
			if (options?.opener) {
				cy.wrap($userMenu)
					.invoke("attr", "opener", options.opener);
			}

			cy.wrap($userMenu)
				.invoke("attr", "open", true);
		});

	cy.get("@userMenu")
		.ui5UserMenuOpened();
});

Cypress.Commands.add("ui5UserMenuOpened", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.as("userMenu");

	cy.get("@userMenu")
		.should("have.attr", "open");

	cy.get("@userMenu")
		.shadow()
		.find("[ui5-responsive-popover]")
		.should("have.attr", "open");
});
