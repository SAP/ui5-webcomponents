Cypress.Commands.add("ui5ColorPalettePopoverOpen", { prevSubject: true }, (prevSubject, options) => {
	cy.wrap(prevSubject)
		.as("colorPalettePopover")
		.then(popover => {
			if (options?.opener) {
				cy.wrap(popover)
					.invoke("attr", "opener", options.opener);
			}

			cy.wrap(popover)
				.invoke("attr", "open", true);
		});

	cy.get("@colorPalettePopover")
		.ui5ColorPalettePopoverOpened();
});

Cypress.Commands.add("ui5ColorPalettePopoverOpened", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.as("colorPalettePopover");

	cy.get("@colorPalettePopover")
		.should("have.attr", "open");

	cy.get("@colorPalettePopover")
		.shadow()
		.find("[ui5-responsive-popover]")
		.should(respPopover => {
			expect(respPopover.is(":popover-open")).to.be.true;
			expect(respPopover.width()).to.not.equal(0);
			expect(respPopover.height()).to.not.equal(0);
		})
		.and("have.attr", "open");
});

Cypress.Commands.add("ui5GetColorPaletteInPopover", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.shadow()
		.find("[ui5-responsive-popover]")
		.find("[ui5-color-palette]");
});

Cypress.Commands.add("ui5GetColorPaletteDefaultButton", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.shadow()
		.find(".ui5-cp-default-color-button");
});

Cypress.Commands.add("ui5GetColorPaletteFirstItem", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.shadow()
		.find("ui5-color-palette-item")
		.first();
});

Cypress.Commands.add("ui5GetColorPaletteMoreColorsButton", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.shadow()
		.find(".ui5-cp-more-colors");
});

Cypress.Commands.add("ui5ColorPalettePopoverClose", { prevSubject: true }, subject => {
	cy.wrap(subject).as("colorPalettePopover");

	// close the popover
	cy.get("@colorPalettePopover")
		.realPress("Escape");

	cy.get("@colorPalettePopover")
		.should("not.have.attr", "open");
});

Cypress.Commands.add("ui5RegisterCloseCounter", { prevSubject: true }, (subject, inputSelector: string) => {
	cy.wrap(subject).then(element => {
		const popoverElement = element[0];
		let openChangeCounter = 0;

		popoverElement.addEventListener("ui5-close", () => {
			// increment the value of the input field, indicating that the event close was fired
			openChangeCounter++;
			Cypress.$(inputSelector).val(`${openChangeCounter}`);
		});
	});
});
