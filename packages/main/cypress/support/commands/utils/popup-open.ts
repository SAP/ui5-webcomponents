const isPopupOpen = (subject: any) => {
	cy.wrap(subject)
		.as("popup");

	cy.get("@popup")
		.should("have.attr", "open");

	cy.get("@popup")
		.should($rp => {
			expect($rp.is(":popover-open")).to.be.true;
			expect($rp.width()).to.not.equal(0);
			expect($rp.height()).to.not.equal(0);
		})
		.and("have.attr", "open");
};

export {
	isPopupOpen
}