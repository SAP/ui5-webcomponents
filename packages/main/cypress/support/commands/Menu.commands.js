Cypress.Commands.add("ui5MenuOpen", { prevSubject: "element" }, (subject, { opener }) => {
	cy.wrap(subject)
		.as("menu")
		.then($menu => {
			if (opener) {
				$menu.attr("opener", opener);
			}

			$menu.attr("open", true);
		});

	cy.get("@menu")
		.ui5MenuOpened();
});

Cypress.Commands.add("ui5MenuOpened", { prevSubject: "element" }, subject => {
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

Cypress.Commands.add("ui5MenuItemClick", { prevSubject: "element" }, subject => {
	cy.wrap(subject)
		.as("item")
		.should("be.visible");

	cy.get("@item")
		.realClick();
});

Cypress.Commands.add("ui5MenuItemPress", { prevSubject: "element" }, (subject, key) => {
	cy.get(subject)
		.should("have.focused")
		.and("be.visible");

	cy.realPress(key);
});
