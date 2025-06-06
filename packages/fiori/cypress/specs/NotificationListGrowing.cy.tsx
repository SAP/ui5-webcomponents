import NotificationListGroupItem from "../../src/NotificationListGroupItem.js";
import NotificationListItem from "../../src/NotificationListItem.js";

describe("Notification List Group Item Tests", () => {
	it("tests click growing button", () => {
		cy.mount(
			<NotificationListGroupItem id="notificationListFirstGroup" growing="Button">
				<NotificationListItem />
				<NotificationListItem />
				<NotificationListItem />
			</NotificationListGroupItem>
		);

		cy.get('#notificationListFirstGroup')
			.find('[id$="growing-btn"]', { includeShadowDom: true })
			.as("growingBtn")
			.should("be.visible");

		cy.get('#notificationListFirstGroup')
			.find("ui5-li-notification")
			.should("have.length", 3);

		cy.window().then(win => {
			const group = win.document.getElementById("notificationListFirstGroup");

			const insertItems = (groupEl) => {
				for (let i = 0; i < 5; i++) {
					const item = win.document.createElement("ui5-li-notification");
					groupEl.appendChild(item);
				}
			};

			insertItems(group);
		});

		cy.get('#notificationListFirstGroup')
			.find("ui5-li-notification")
			.should("have.length", 8);
	});
});
