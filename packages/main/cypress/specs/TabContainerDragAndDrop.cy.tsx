import TabContainer from "../../src/TabContainer.js";
import type { TabContainerMoveEventDetail } from "../../src/TabContainer.js";
import Tab from "../../src/Tab.js";
import type { TabInStrip } from "../../src/Tab.js";
import TabSeparator from "../../src/TabSeparator.js";
import Button from "../../src/Button.js";
import type MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";

// TODO: test not calling moveover preventDefault()
// TODO: test moveOver and move events in keyboard tests also
// TODO: dragend

const verifyMoveOverEvent = (sourceElementId: string, destinationPlacement: `${MovePlacement}`,  destinationElementId: string) => {
	cy.get<Cypress.Agent<sinon.SinonSpy<any[], any>>>("@handleMoveOverSpy")
		.then((spy) => {
			const event = spy.getCall(0).args[0];
			const { source, destination } = event.detail;

			expect(source.element.id).to.equal(sourceElementId);
			expect(destination.element.id).to.equal(destinationElementId);
			expect(destination.placement).to.equal(destinationPlacement);
		});
};

const verifyMoveEvent = (sourceElementId: string, destinationPlacement: `${MovePlacement}`,  destinationElementId: string) => {
	cy.get<Cypress.Agent<sinon.SinonSpy<any[], any>>>("@handleMoveSpy")
		.then((spy) => {
			const event = spy.getCall(0).args[0];
			const { source, destination } = event.detail;

			expect(source.element.id).to.equal(sourceElementId);
			expect(destination.element.id).to.equal(destinationElementId);
			expect(destination.placement).to.equal(destinationPlacement);
		});
};

describe("TabContainer Drag and Drop Generic Tests", () => {
	beforeEach(() => {
		const handlers = {
			moveOver: (e: CustomEvent<TabContainerMoveEventDetail>) => {
				e.preventDefault();
			},
			move: (e: CustomEvent<TabContainerMoveEventDetail>) => {
				const { destination, source } = e.detail;

				switch (destination.placement) {
					case "Before":
						destination.element.before(source.element);
						break;
					case "After":
						destination.element.after(source.element);
						break;
					case "On":
						destination.element.prepend(source.element);
						break;
				}
			}
		};

		cy.spy(handlers, "moveOver").as("handleMoveOverSpy");
		cy.spy(handlers, "move").as("handleMoveSpy");

		cy.mount(
			<TabContainer id="tabContainer" collapsed={true} overflowMode="End" style={{ width: "1000px" }} onMoveOver={handlers.moveOver} onMove={handlers.move}>
				<Tab id="tabOne" movable={true} design="Positive" text="One"></Tab>
				<Tab id="tabTwo" movable={true} design="Negative" text="Two" disabled>
					<Tab slot="items" movable={true} text="2.1"></Tab>
				</Tab>
				<Tab id="tabThree" movable={true} design="Critical" text="Three">
					<Tab id="tabThree1" slot="items" movable={true} design="Positive" text="3.1">
						<Button>Button 3.1</Button>
					</Tab>
					<Tab id="tabThree2" slot="items" movable={true} design="Positive" text="3.2">
						<Tab id="tabThree21" slot="items" movable={true} design="Positive" text="3.2.1">
							<Button>Button 3.2.1</Button>
						</Tab>
						<Tab id="tabThree22" slot="items" movable={true} design="Positive" text="3.2.2">
							<Button>Button 3.2.2</Button>
						</Tab>
						<Button>Button 3.2</Button>
					</Tab>
					<Tab id="tabThree3" slot="items" movable={true} design="Positive" text="3.3">
						<Button>Button 3.3</Button>
					</Tab>
					content
				</Tab>
				<Tab id="tabFour" movable={true} text="Four (forbids nesting)"></Tab>
				<Tab id="tabFive" movable={true} text="Five">
					<Tab slot="items" movable={true} text="nested in Five">
						<Tab slot="items" movable={true} text="nested deeper in Five">text</Tab>
						text
					</Tab>
				</Tab>
				<Tab id="tabSix" movable={true} text="Six"></Tab>
				<Tab id="tabSeven" movable={true} text="Seven"></Tab>
				<TabSeparator />
				<Tab id="tabEight" movable={true} design="Positive" text="Eight"></Tab>
				<Tab id="tabNine" movable={true} design="Negative" text="Nine"></Tab>
				<Tab id="tabTen" movable={true} design="Critical" text="Ten"></Tab>
				<Tab id="tabEleven" movable={true} text="Eleven"></Tab>
				<TabSeparator />
				<Tab id="tabTwelve" movable={true} text="Twelve"></Tab>
				<Tab id="tabThirteen" movable={true} text="Thirteen"></Tab>
				<Tab id="tabFourteen" movable={true} text="Fourteen"></Tab>
				<Tab id="tabFifteen" movable={true} text="Fifteen"></Tab>
				<Tab id="tabSixteen" movable={true} text="Sixteen"></Tab>
				<Tab id="tabSeventeen" movable={true} text="Seventeen (forbids nesting)"></Tab>
				<Tab id="tabEighteen" movable={true} text="Eighteen"></Tab>
				<TabSeparator />
				<Tab id="tabNinteen" movable={true} text="Nineteen"></Tab>
				<Tab id="tabTwenty" movable={true} text="Twenty"></Tab>
				<Tab id="tabTwentyOne" movable={true} text="Twenty One"></Tab>
				<Tab id="tabTwentyTwo" movable={true} text="Twenty Two"></Tab>
				<Tab id="tabTwentyThree" movable={true} text="Twenty Three"></Tab>
				<Tab id="tabTwentyFour" movable={true} text="Twenty Four"></Tab>
				<TabSeparator />
				<Tab id="tabTwentyFive" movable={true} text="Twenty Five"></Tab>
				<Tab id="tabTwentySix" movable={true} text="Twenty Six"></Tab>
				<Tab id="tabTwentySeven" movable={true} text="Twenty Seven"></Tab>
				<TabSeparator />
				<Tab id="tabTwentyEight" movable={true} text="Twenty Eight"></Tab>
				<Tab id="tabTwentyNine" movable={true} text="Twenty Nine"></Tab>
				<Tab id="tabThirty" movable={true} text="Thirty"></Tab>
			</TabContainer>
		);

		cy.get("#tabContainer")
			.should("have.attr", "media-range", "M");
		
		cy.get("#tabContainer")
			.find(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])")
			.should(($elements) => {
				$elements.each((index, element) => {
					expect(element).to.have.attr('tabindex');
				});
			});
	});

	describe("Using Mouse", () => {
		it("Moving first strip item 'After' second", () => {
			cy.get<Tab>("#tabOne, #tabTwo")
				.then(($el) => {
					cy.ui5TabContainerDragAndDrop($el[0].getDomRefInStrip()!, "After", $el[1].getDomRefInStrip()!)
				})

			verifyMoveOverEvent("tabOne", "After", "tabTwo");
			verifyMoveEvent("tabOne", "After", "tabTwo");
		});

		it("Moving first strip item 'After' last", () => {
			cy.get("#tabContainer")
				.shadow()
				.find<TabInStrip>(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])")
				.then(($el) => {
					const firstItem = $el[0];
					const lastItem = $el[$el.length - 1];

					cy.ui5TabContainerDragAndDrop(firstItem, "After", lastItem);

					verifyMoveOverEvent(firstItem.realTabReference.id, "After", lastItem.realTabReference.id);
					verifyMoveEvent(firstItem.realTabReference.id, "After", lastItem.realTabReference.id);
				});
		});

		it("Moving last strip item 'Before' last but one", () => {
			cy.get("#tabContainer")
				.shadow()
				.find<TabInStrip>(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])")
				.then(($el) => {
					const lastItem = $el[$el.length - 1];
					const lastButOneItem = $el[$el.length - 2];

					cy.ui5TabContainerDragAndDrop(lastItem, "Before", lastButOneItem);

					verifyMoveOverEvent(lastItem.realTabReference.id, "Before", lastButOneItem.realTabReference.id);
					verifyMoveEvent(lastItem.realTabReference.id, "Before", lastButOneItem.realTabReference.id);
				});
		});

		it("Moving last strip item 'Before' first", () => {
			cy.get("#tabContainer")
				.shadow()
				.find<TabInStrip>(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])")
				.then(($el) => {
					const firstItem = $el[0];
					const lastItem = $el[$el.length - 1];

					cy.ui5TabContainerDragAndDrop(lastItem, "Before", firstItem);

					verifyMoveOverEvent(lastItem.realTabReference.id, "Before", firstItem.realTabReference.id);
					verifyMoveEvent(lastItem.realTabReference.id, "Before", firstItem.realTabReference.id);
				});
		});

		it("Moving strip item 'On' another", () => {
			cy.get<Tab>("#tabFive, #tabSix")
				.then(($el) => {
					cy.ui5TabContainerDragAndDrop($el[0].getDomRefInStrip()!, "On", $el[1].getDomRefInStrip()!)
				})

			verifyMoveOverEvent("tabFive", "On", "tabSix");
			verifyMoveEvent("tabFive", "On", "tabSix");
		});

		it("Moving item 'After' another in end overflow popover", () => {
			cy.get("#tabContainer")
				.ui5TabContainerOpenEndOverflow();

			cy.get("#tabContainer")
				.shadow()
				.find<TabInStrip>(".ui5-tab-container-responsive-popover [ui5-li-custom]")
				.then(($el) => {
					const draggedPopoverItem = $el[0];
					const dropTargetPopoverItem = $el[2];
			
					cy.ui5TabContainerDragAndDrop(draggedPopoverItem, "After", dropTargetPopoverItem, "Vertical");

					verifyMoveOverEvent(draggedPopoverItem.realTabReference.id, "After", dropTargetPopoverItem.realTabReference.id);
					verifyMoveEvent(draggedPopoverItem.realTabReference.id, "After", dropTargetPopoverItem.realTabReference.id);
				});
		});

		it("Moving item 'Before' another in end overflow popover", () => {
			cy.get("#tabContainer")
				.ui5TabContainerOpenEndOverflow();

			cy.get("#tabContainer")
				.shadow()
				.find<TabInStrip>(".ui5-tab-container-responsive-popover [ui5-li-custom]")
				.then(($el) => {
					const draggedPopoverItem = $el[2];
					const dropTargetPopoverItem = $el[0];

					cy.ui5TabContainerDragAndDrop(draggedPopoverItem, "Before", dropTargetPopoverItem, "Vertical");

					verifyMoveEvent(draggedPopoverItem.realTabReference.id, "Before", dropTargetPopoverItem.realTabReference.id);
					verifyMoveOverEvent(draggedPopoverItem.realTabReference.id, "Before", dropTargetPopoverItem.realTabReference.id);
				});
		});

		it("Moving item 'On' another in end overflow popover", () => {
			cy.get("#tabContainer")
				.ui5TabContainerOpenEndOverflow();

			cy.get("#tabContainer")
				.shadow()
				.find<TabInStrip>(".ui5-tab-container-responsive-popover [ui5-li-custom]")
				.then(($el) => {
					const draggedPopoverItem = $el[0];
					const dropTargetPopoverItem = $el[5];

					cy.ui5TabContainerDragAndDrop(draggedPopoverItem, "On", dropTargetPopoverItem, "Vertical");

					verifyMoveEvent(draggedPopoverItem.realTabReference.id, "On", dropTargetPopoverItem.realTabReference.id);
					verifyMoveOverEvent(draggedPopoverItem.realTabReference.id, "On", dropTargetPopoverItem.realTabReference.id);
				});
		});
	});

	describe("Using Keyboard", () => {
		const waitUntilTabIsFocusedInStrip = (tabText: string) => {
			cy.get("#tabContainer")
				.shadow()
				.find(".ui5-tab-strip-item")
				.contains(tabText)
				.closest(".ui5-tab-strip-item")
				.should("have.focus")
		};

		describe("Moving strip items", () => {
			it("Moving strip items using arrow keys", () => {
				cy.get("#tabContainer")
					.shadow()
					.find(".ui5-tab-strip-item")
					.first()
					.realClick();
					
				// Act
				waitUntilTabIsFocusedInStrip("One");
				cy.realPress(["ControlLeft", "ArrowRight"]);

				verifyMoveOverEvent("tabOne", "After", "tabTwo");
				verifyMoveEvent("tabOne", "After", "tabTwo");

				cy.get("#tabContainer")
					.children().eq(0)
					.should("have.id", "tabTwo")
		
				cy.get("#tabContainer")
					.children().eq(1)
					.should("have.id", "tabOne");

				// Act
				cy.get("@handleMoveOverSpy")
					.invoke("resetHistory");

				cy.get("@handleMoveSpy")
					.invoke("resetHistory");
				waitUntilTabIsFocusedInStrip("One");
				cy.realPress(["ControlLeft", "ArrowDown"]);

				verifyMoveOverEvent("tabOne", "After", "tabThree");
				verifyMoveEvent("tabOne", "After", "tabThree");

				cy.get("#tabContainer")
					.children().eq(1)
					.should("have.id", "tabThree")

				cy.get("#tabContainer")
					.children().eq(2)
					.should("have.id", "tabOne");

				// Act
				cy.get("@handleMoveOverSpy")
					.invoke("resetHistory");

				cy.get("@handleMoveSpy")
					.invoke("resetHistory");
				waitUntilTabIsFocusedInStrip("One");
				cy.realPress(["ControlLeft", "ArrowLeft"]);

				verifyMoveOverEvent("tabOne", "Before", "tabThree");
				verifyMoveEvent("tabOne", "Before", "tabThree");

				cy.get("#tabContainer")
					.children().eq(1)
					.should("have.id", "tabOne");

				cy.get("#tabContainer")
					.children().eq(2)
					.should("have.id", "tabThree");

				cy.get("@handleMoveOverSpy")
					.invoke("resetHistory");

				cy.get("@handleMoveSpy")
					.invoke("resetHistory");

				// Act
				cy.get("@handleMoveOverSpy")
					.invoke("resetHistory");

				cy.get("@handleMoveSpy")
					.invoke("resetHistory");
				waitUntilTabIsFocusedInStrip("One");
				cy.realPress(["ControlLeft", "ArrowUp"]);

				verifyMoveOverEvent("tabOne", "Before", "tabTwo");
				verifyMoveEvent("tabOne", "Before", "tabTwo");

				cy.get("#tabContainer")
					.children().eq(0)
					.should("have.id", "tabOne")
					.prev()
					.should("not.exist");

				cy.get("#tabContainer")
					.children().eq(1)
					.should("have.id", "tabTwo");
			});

			it("Moving strip item beyond the end using 'Arrow Right'", () => {
				cy.get("#tabContainer")
					.shadow()
					.find(".ui5-tab-strip-item")
					.first()
					.realClick()
					.then(() => {
						// Act
						const performDrag = (cnt: number) => {
							if (cnt == 0) {
								cy.get("#tabContainer")
									.shadow()
									.find(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])")
									.last<TabInStrip>()
									.then($el => {
										return $el[0].realTabReference.id;
									})
									.should("equal", "tabOne");
							} else {
								waitUntilTabIsFocusedInStrip("One");
								cy.realPress(["ControlLeft", "ArrowRight"])
									.then(() => {
										performDrag(cnt - 1)
									});

							}

						};

						performDrag(20)
					});
			});

			it("Moving strip item beyond the beginning with 'Arrow Left'", () => {
				cy.get("#tabContainer")
					.shadow()
					.find(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow]")
					.last<TabInStrip>()
					.as("lastTabInStrip");

				cy.get("@lastTabInStrip")
					.realClick()
					.then(() => {
						// Act
						cy.get<TabInStrip>("@lastTabInStrip")
							.then(($lastTab) => {
								const lastTabText = $lastTab[0].realTabReference.text!;
			
								for (let i = 0; i < 20; i++) {
									waitUntilTabIsFocusedInStrip(lastTabText);
									cy.realPress(["ControlLeft", "ArrowLeft"]);
								}
			
								cy.get("#tabContainer")
									.shadow()
									.find<TabInStrip>(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])")
									.first()
									.then($el => {
										return $el[0].realTabReference.text;
									})
									.should("equal", lastTabText);
							});
					});
			});

			it("Moving strip item with 'End'", () => {
				cy.get("#tabContainer")
					.shadow()
					.find(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])")
					.first()
					.realClick()
					.then(() => {
						// Act
						waitUntilTabIsFocusedInStrip("One");
						cy.realPress(["ControlLeft", "End"]);
			
						// Assert
						cy.get("#tabContainer")
							.shadow()
							.find(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])")
							.last<TabInStrip>()
							.then($el => {
								return $el[0].realTabReference.id;
							})
							.should("equal", "tabOne");
					})
			});

			it("Moving strip item with 'Home'", () => {
				cy.get("#tabContainer")
					.shadow()
					.find(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow]")
					.last<TabInStrip>()
					.as("lastTabInStrip");

				cy.get("@lastTabInStrip")
					.realClick()
					.then(() => {
						// Act
						cy.get<TabInStrip>("@lastTabInStrip")
							.then(($lastTab) => {
								const lastTabText = $lastTab[0].realTabReference.text!;
			
								waitUntilTabIsFocusedInStrip(lastTabText);
								cy.realPress(["ControlLeft", "Home"]);

								verifyMoveOverEvent($lastTab[0].realTabReference.id, "Before", "tabOne");
								verifyMoveEvent($lastTab[0].realTabReference.id, "Before", "tabOne");
			
								cy.get("#tabContainer")
									.shadow()
									.find<TabInStrip>(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])")
									.first()
									.then($el => {
										return $el[0].realTabReference.text;
									})
									.should("equal", lastTabText);
							});
					})

			});
		});

	// 	describe("Moving items in popover", () => {
	// 		it("Moving sub items with arrow keys", async () => {
	// 			await browser.$("#tabContainer").shadow$(".ui5-tab-strip-item:nth-child(3) [ui5-button]").realClick();

	// 			assert.notOk(await browser.$("#tabThree1").previousElement().isExisting(), "tabThree1 is the first tab");

	// 			await browser.keys(["Control", "ArrowDown"]);
	// 			assert.strictEqual(await browser.$("#tabThree1").previousElement().getAttribute("id"), "tabThree2", "tabThree1 is after tabThree2");

	// 			await browser.keys(["Control", "ArrowUp"]);
	// 			assert.notOk(await browser.$("#tabThree1").previousElement().isExisting(), "tabThree1 is the first tab");

	// 			await browser.keys("ArrowDown");
	// 			await browser.keys("ArrowDown");
	// 			assert.notOk(await browser.$("#tabThree21").previousElement().isExisting(), "tabThree21 is the first tab");

	// 			await browser.keys(["Control", "ArrowDown"]);
	// 			assert.strictEqual(await browser.$("#tabThree21").previousElement().getAttribute("id"), "tabThree22", "tabThree21 is after tabThree22");

	// 			await browser.keys(["Control", "ArrowDown"]);
	// 			assert.strictEqual(await browser.$("#tabThree21").previousElement().getAttribute("id"), "tabThree22", "tabThree21 is after tabThree22");

	// 			await browser.keys(["Control", "ArrowUp"]);
	// 			assert.notOk(await browser.$("#tabThree21").previousElement().isExisting(), "tabThree21 is the first tab");
	// 		});

	// 		it("Moving overflow items with arrow keys", async () => {
	// 			await tabContainer.getEndOverflow("tabContainer").realClick();

	// 			let displayedPopoverItems = await tabContainer.getCurrentPopoverItems("tabContainer");
	// 			let id = await displayedPopoverItems[0].getAttribute("id");

	// 			await browser.keys(["Control", "ArrowDown"]);
	// 			displayedPopoverItems = await tabContainer.getCurrentPopoverItems("tabContainer");
	// 			assert.strictEqual(await displayedPopoverItems[1].getAttribute("id"), id, "item was moved down");

	// 			await browser.keys(["Control", "ArrowUp"]);
	// 			displayedPopoverItems = await tabContainer.getCurrentPopoverItems("tabContainer");
	// 			assert.strictEqual(await displayedPopoverItems[0].getAttribute("id"), id, "item was moved up");
	// 		});

	// 		it("Moving overflow item with End", async () => {
	// 			let displayedPopoverItems = await tabContainer.getCurrentPopoverItems("tabContainer");
	// 			const id = await displayedPopoverItems[0].getAttribute("id");

	// 			await browser.keys(["Control", "End"]);
	// 			displayedPopoverItems = await tabContainer.getCurrentPopoverItems("tabContainer");
	// 			assert.strictEqual(await displayedPopoverItems.at(-1).getAttribute("id"), id, "item was moved last");
	// 		});

	// 		it("Moving overflow item with Home", async () => {
	// 			let displayedPopoverItems = await tabContainer.getCurrentPopoverItems("tabContainer");
	// 			const id = await displayedPopoverItems.at(-1).getAttribute("id");

	// 			await browser.keys(["Control", "Home"]);
	// 			displayedPopoverItems = await tabContainer.getCurrentPopoverItems("tabContainer");
	// 			assert.strictEqual(await displayedPopoverItems.at(0).getAttribute("id"), id, "item was moved first");
	// 		});
		// });

	});
});

// 	describe("Moving strip items when there are fixed tabs", () => {
// 		it("Moving strip items with arrow keys", async () => {
// 			await tabContainer.focusItem("fixedTabsTabSeven");

// 			for (let i = 0; i < 20; i++) {
// 				await browser.keys(["Control", "ArrowLeft"]);
// 			}

// 			assert.strictEqual(await browser.$("#fixedTabsTabSeven").previousElement().getAttribute("id"), "fixedTabsSeparatorOne", "Tab seven has stopped when reached fixed tabs");
// 		});

// 		it("Moving strip item with Home", async () => {
// 			await tabContainer.focusItem("fixedTabsTabSix");
// 			await browser.keys(["Control", "Home"]);

// 			assert.strictEqual(await browser.$("#fixedTabsTabSix").previousElement().getAttribute("id"), "fixedTabsSeparatorOne", "Tab six is placed after fixed tabs");
// 		});
// 	});