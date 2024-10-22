Cypress.Commands.add("ui5MenuOpen", { prevSubject: true }, (prevSubject, options) => {
	cy.wrap(prevSubject)
		.as("menu")
		.then($menu => {
			if (options?.opener) {
				cy.wrap($menu)
					.invoke("attr", "opener", options.opener);
			}

			cy.wrap($menu)
				.invoke("attr", "open", true);
		});

	cy.get("@menu")
		.ui5MenuOpened();
});

Cypress.Commands.add("ui5MenuOpened", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.as("menu");

	cy.get("@menu")
		.should("be.visible")
		.should("have.attr", "open");

	cy.get("@menu")
		.shadow()
		.find("[ui5-responsive-popover]")
		.and("have.attr", "open");
});

Cypress.Commands.add("ui5MenuItemClick", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.as("item")
		.should("be.visible");

	cy.get("@item")
		.realClick();
});

Cypress.Commands.add("ui5MenuItemPress", { prevSubject: true }, (subject, key) => {
	cy.get(subject)
		.should("have.focused")
		.and("be.visible");

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	cy.realPress(key);
});
