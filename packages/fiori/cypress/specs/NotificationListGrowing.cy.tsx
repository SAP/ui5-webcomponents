import NotificationListGroupItem from "../../src/NotificationListGroupItem.js";

describe("Notification List Group Item Tests", () => {
	it("tests click growing button", () => {
		const myStub = cy.stub().as("myStub");
		cy.mount(<NotificationListGroupItem id="notificationListFirstGroup" growing="Button" onLoadMore={myStub} />);

		cy.get('#notificationListFirstGroup')
			.find('[id$="growing-btn"]', { includeShadowDom: true })
			.as("growingBtn")
			.should("be.visible");

		cy.get('@growingBtn').realClick();

		cy.get("@myStub")
			.should("have.been.calledOnce");
	});
});
