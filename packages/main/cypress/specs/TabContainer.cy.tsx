import TabContainer from "../../src/TabContainer.js";
import Tab from "../../src/Tab.js";

describe("TabContainer general interaction", () => {
	it("Tests no auto selection", () => {
		cy.mount(
			<TabContainer noAutoSelection id="tcNoAuto">
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

describe("TabContainer keyboard handling", () => {
	it("Tests preventing of known and unknown events on tab", () => {
		cy.mount(
			<TabContainer id="tc">
				<Tab text="Tab 1" movable={true}>tab 1</Tab>
			</TabContainer>
		);

		cy.get("#tc")
			.find<Tab>("[text='Tab 1']")
			.then(tab => {
				return tab[0].getDomRefInStrip();
			})
			.as("tabInStrip")
			.should("be.visible");

		[
			{
				event: new KeyboardEvent("keydown", {
					cancelable: true, bubbles: true, key: "R", ctrlKey: true,
				}),
				expectedDefaultPrevented: false,
			},
			{
				event: new KeyboardEvent("keydown", {
					cancelable: true, bubbles: true, key: "ArrowLeft", ctrlKey: true,
				}),
				expectedDefaultPrevented: true,
			},
			{
				event: new KeyboardEvent("keydown", {
					cancelable: true, bubbles: true, key: " ", ctrlKey: false,
				}),
				expectedDefaultPrevented: true,
			}
		].forEach(({ event, expectedDefaultPrevented }) => {
			// Act
			cy.get<HTMLElement>("@tabInStrip")
				.then(tabInStrip => {
					tabInStrip[0].dispatchEvent(event);
				});

			// Assert
			cy.wrap(event)
				.should("have.property", "defaultPrevented", expectedDefaultPrevented);
		});
	});
});
