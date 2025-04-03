
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

Cypress.Commands.add("ui5TabContainerOpenEndOverflow",{ prevSubject: true } , (subject) => {
	cy.wrap(subject)
		.shadow()
		.find("[data-ui5-stable='overflow-end']")
		.should("be.visible")
		.trigger("click");

	cy.wrap(subject)
		.shadow()
		.find(".ui5-tab-container-responsive-popover")
		.should("be.visible")
});

Cypress.Commands.add("ui5TabContainerDragAndDrop", (elementToDrag, placement, target, orientation = "Horizontal") => {
	const horizontalPlacementToPosition: Record<`${MovePlacement}`, "right" | "left" | "center" > = {
		"After": "right",
		"Before": "left",
		"On": "center"
	};

	const verticalPlacementToPosition: Record<`${MovePlacement}`, "top" | "bottom" | "center"> = {
		"After": "bottom",
		"Before": "top",
		"On": "center"
	};

	const position = orientation === "Horizontal" ? horizontalPlacementToPosition[placement] : verticalPlacementToPosition[placement];

	cy.wrap(Cypress.$(elementToDrag))
		.should("be.visible")
		.trigger("dragstart", {
			force: true, // force the event on the given element, otherwise cypress searches for an actionable child, resulting in wrong target
			eventConstructor: "DragEvent",
			dataTransfer: new DataTransfer()
		});

	cy.wrap(Cypress.$(target))
		.should("be.visible")
		.trigger(
			"dragover",
			position,
			{
				force: true,
				eventConstructor: "DragEvent"
			}
	);

	cy.wrap(Cypress.$(target))
		.should("be.visible")
		.trigger(
			"drop",
			position,
			{
				force: true,
				eventConstructor: "DragEvent"
			}
		);
});
