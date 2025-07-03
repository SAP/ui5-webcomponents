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
		.should($rp => {
			expect($rp.is(":popover-open")).to.be.true;
			expect($rp.width()).to.not.equal(0);
			expect($rp.height()).to.not.equal(0);
		})
		.and("have.attr", "open");
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

Cypress.Commands.add("ui5MenuItemCheckShiftClickAndPress", { prevSubject: true }, (subject, menuItem, shouldStatement) => {
	cy.get(subject)
		.as("menu");

	cy.get("@menu")
		.find(menuItem)
		.as("menuItem");

	cy.get("@menu")
		.ui5MenuOpen();

	cy.get("@menuItem")
		.realClick({ shiftKey: true });

	cy.get("@menu")
		.should(shouldStatement, "open");

	cy.get("@menu")
		.ui5MenuOpen();

	cy.get("@menuItem")
		.realPress(["Shift", "Enter"]);

	cy.get("@menu")
		.should(shouldStatement, "open");

	cy.get("@menu")
		.ui5MenuOpen();

	cy.get("@menuItem")
		.realPress(["Shift", "Space"]);

	cy.get("@menu")
		.should(shouldStatement, "open");
});
