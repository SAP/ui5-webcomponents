Cypress.Commands.add('ui5MenuOpen', { prevSubject: 'element' }, (subject, options) => {
	cy.wrap(subject)
		.as("menu")
		.then($menu => {
			if (options?.opener) {
				$menu.attr("opener", options.opener);
			}

			$menu.attr("open", true);
		});

	cy.get("@menu")
		.ui5MenuOpened()

	return cy.wrap(subject)
});

Cypress.Commands.add('ui5MenuOpened', { prevSubject: 'element' }, (subject) => {
	cy.wrap(subject)
		.as("menu")

	cy.get("@menu")
		.should("be.visible")
		.should("have.attr", "open")

	cy.get("@menu")
		.shadow()
		.find("[ui5-responsive-popover]")
		.and("have.attr", "open")

	return cy.wrap(subject)
});

Cypress.Commands.add('ui5MenuItemClick', { prevSubject: 'element' }, (subject) => {
	cy.wrap(subject)
		.as("item")
		.should("be.visible");

	cy.get("@item")
		.realClick();

	return cy.wrap(subject)
});

Cypress.Commands.add('ui5MenuItemPress', { prevSubject: 'element' }, (subject, keys) => {
	cy.wrap(subject)
		.as("item")
		.should("be.focused")
		.and("be.visible");

	cy.realPress(keys);

	return cy.wrap(subject)
});