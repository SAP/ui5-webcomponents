import TabContainer from "../../src/TabContainer.js";
import Tab from "../../src/Tab.js";

describe("TabContainer general interaction", () => {
	it("Tests no auto selection", () => {
		cy.mount(
			<TabContainer no-auto-selection id="tcNoAuto">
				<Tab text="Products ID">
					tab1
				</Tab>
				<Tab text="Availability">
					tab2
				</Tab>
				<Tab text="Expiration Date">
					tab3
				</Tab>
			</TabContainer>
		);

		cy.get("#tcNoAuto")
			.then(tc => {
				const tabContainer = tc.get(0) as TabContainer;
				const allItems = tabContainer.allItems;
				allItems.forEach(item => {
					cy.wrap(item).should("have.prop", "selected", false);
				});
			});
	});
});
