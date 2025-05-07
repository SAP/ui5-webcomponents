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
		.should("have.attr", "open");

	cy.get("@menu")
		.shadow()
		.find("[ui5-responsive-popover]")
<<<<<<< HEAD
		.should("have.attr", "open");

	cy.get("@menu")
		.find(" > [ui5-menu-item], > [ui5-menu-item-group]")
		.first()
		.should("be.visible");
=======
		.should($rp => {
			expect($rp.is(":popover-open")).to.be.true;
			expect($rp.width()).to.not.equal(0);
			expect($rp.height()).to.not.equal(0);
		})
		.and("have.attr", "open");
>>>>>>> main
});

Cypress.Commands.add("ui5MenuItemClick", { prevSubject: true }, subject => {
	cy.get(subject)
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
