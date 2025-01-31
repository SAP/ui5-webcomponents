import Toast from "../../src/Toast.js";
import List from "../../src/List.js";
import ListItemStandard from "../../src/ListItemStandard.js";

describe("Toast - test popover API", () => {
	it("Should verify the toast has the popover attribute set to manual", () => {
		cy.mount(
			<Toast id="toast" open={true} placement="TopStart">TopStart</Toast>
		);
		cy.get<Toast>("[ui5-toast]")
			.should("have.attr", "popover", "manual")
			.should("be.visible");
	});

	it("Toast should stay on top of list after scroll", () => {
		cy.mount(
			<>
				<Toast id="toast" open duration={999999} placement="TopStart">TopStart</Toast>
				<List id="list" headerText="List with ListItemStandard" style={{ opacity: "0.7" }}>
					<ListItemStandard additionalText="3">List Item 1</ListItemStandard>
					<ListItemStandard additionalText="2">List Item 2</ListItemStandard>
					<ListItemStandard additionalText="1">List Item 3</ListItemStandard>
				</List>
			</>
		);

		cy.get<Toast>("[ui5-toast]")
			.should("have.attr", "popover", "manual")
			.should("be.visible");

		cy.get("#toast")
			.then($toast => {
				const toastRect = $toast[0].getBoundingClientRect();
				cy.get("#list")
					.should($list => {
						const listRect = $list[0].getBoundingClientRect();
						const isOverlapping = toastRect.right > listRect.left
							&& toastRect.left < listRect.right
							&& toastRect.bottom > listRect.top
							&& toastRect.top < listRect.bottom;
						expect(isOverlapping).to.be.true;
					});
			});
	});
});
