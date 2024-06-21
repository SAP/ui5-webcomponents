import { html } from 'lit';

describe("List Tests", async () => {
	it("tests 'loadMore' event fired upon infinite scroll", () => {
		cy.mount(html`
		<ui5-list style="height: 300px;"  growing="Scroll">
			<ui5-li>Laptop Lenovo</ui5-li>
			<ui5-li>IPhone 3</ui5-li>
			<ui5-li>HP Monitor 24</ui5-li>
			<ui5-li>Audio cabel</ui5-li>
			<ui5-li>DVD set</ui5-li>
			<ui5-li>HP Monitor 24</ui5-li>
			<ui5-li>Audio cabel</ui5-li>
			<ui5-li id="lastItem">Last Item</ui5-li>
		</ui5-list>`)

		cy.get("[ui5-list]")
			.as("list");

		cy.get("@list")
			.then((list) => {
				list.get(0).addEventListener('ui5-load-more', cy.stub().as('loadMore'))
			})
			.shadow()
			.find(".ui5-list-scroll-container")
			.as("scrollContainer")
			.scrollTo('bottom', { duration: 100 })

		cy.get("@loadMore")
			.should("have.been.calledOnce");
	});
});