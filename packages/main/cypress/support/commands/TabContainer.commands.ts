
import type MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import Tab from "../../../src/Tab.js";

// Cypress.Commands.addQuery("ui5TabContainerGetDisplayedStripItems", function(subject: string) {
// 	// return browser.$(`#${tabContainerId}`).shadow$$(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])");

// 	return () => {
// 		return cy.wrap(subject)
// 			.shadow()
// 			.find(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])");
// 	}
// });

Cypress.Commands.add("ui5TabContainerDragAndDrop", (dragElementId, placement, dropElementId) => {
	const placementToPosition: Record<`${MovePlacement}`, "right" | "left" | "center" > = {
		"After": "right",
		"Before": "left",
		"On": "center"
	};
	let position = placementToPosition[placement];

	cy.get<Tab>(`#${dragElementId}`)
		.then(($el) => {
			return $el[0].getDomRefInStrip();
		})
		.trigger("dragstart", {
			force: true, // force the event on the `getDomRefInStrip` element, otherwise, cypress searches for an actionable child, resulting in wrong target
			eventConstructor: "DragEvent",
			dataTransfer: new DataTransfer()
		});

	cy.get<Tab>(`#${dropElementId}`)
		.then(($el) => {
			return $el[0].getDomRefInStrip();
		})
		.trigger(
			"dragover",
			position,
			{
				force: true,
				eventConstructor: "DragEvent"
			}
	);

	cy.get<Tab>(`#${dropElementId}`)
		.then(($el) => {
			return $el[0].getDomRefInStrip();
		})
		.trigger(
			"drop",
			position,
			{
				force: true,
				eventConstructor: "DragEvent"
			}
		);
});
