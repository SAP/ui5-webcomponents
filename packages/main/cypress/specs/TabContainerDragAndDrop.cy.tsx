import TabContainer from "../../src/TabContainer.js";
import type { TabContainerMoveEventDetail } from "../../src/TabContainer.js";
import Tab from "../../src/Tab.js";
import type { TabInStrip } from "../../src/Tab.js";
import TabSeparator from "../../src/TabSeparator.js";
import Button from "../../src/Button.js";

// TODO: test not calling moveover preventDefault()
// TODO: attempt to make failures more informative

describe("Drag and drop tests", () => {
	beforeEach(() => {
		const handleMoveOver = cy.stub();
		handleMoveOver.callsFake(function (e: CustomEvent<TabContainerMoveEventDetail>) {
			e.preventDefault();
		});
		handleMoveOver.as("handleMoveOverStub");
		
		const handleMove = cy.stub();
		handleMove.callsFake((e: CustomEvent<TabContainerMoveEventDetail>) => {
			e.preventDefault();
		});
		handleMove.as("handleMoveStub");

		cy.mount(
			<TabContainer id="tabContainer" collapsed={true} overflowMode="End" onMoveOver={handleMoveOver} onMove={handleMove}>
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
				<Tab id="tabThirteen" movable={true} text="Thirteen" selected></Tab>
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
	});

	it("Moving first strip item 'After' second", () => {
		cy.get<Tab>("#tabOne, #tabTwo")
			.then(($el) => {
				cy.ui5TabContainerDragAndDrop($el[0].getDomRefInStrip()!, "After", $el[1].getDomRefInStrip()!)
			})

		cy.get("@handleMoveOverStub")
			.should("have.been.calledWithMatch", Cypress.sinon.match((event: CustomEvent<TabContainerMoveEventDetail>) => {
				const { source, destination } = event.detail;

				return source.element.id === "tabOne" && destination.element.id === "tabTwo" && destination.placement === "After";
			}));

		cy.get("@handleMoveStub")
			.should("have.been.calledWithMatch", Cypress.sinon.match((event: CustomEvent<TabContainerMoveEventDetail>) => {
				const { source, destination } = event.detail;

				return source.element.id === "tabOne" && destination.element.id === "tabTwo" && destination.placement === "After";
			}));
	});

	it("Moving first strip item 'After' last", () => {
		cy.get("#tabContainer")
			.shadow()
			.find<TabInStrip>(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])")
			.then(($el) => {
				const firstItem = $el[0];
				const lastItem = $el[$el.length - 1];

				cy.ui5TabContainerDragAndDrop(firstItem, "After", lastItem, "Horizontal");

				cy.get("@handleMoveOverStub")
					.should("have.been.calledWithMatch", Cypress.sinon.match((event: CustomEvent<TabContainerMoveEventDetail>) => {
						const { source, destination } = event.detail;
		
						return source.element.id === "tabOne" && destination.element.id === lastItem.realTabReference.id && destination.placement === "After";
					}));
		
				cy.get("@handleMoveStub")
					.should("have.been.calledWithMatch", Cypress.sinon.match((event: CustomEvent<TabContainerMoveEventDetail>) => {
						const { source, destination } = event.detail;
		
						return source.element.id === "tabOne" && destination.element.id === lastItem.realTabReference.id && destination.placement === "After";
					}));
			})
	});

	it("Moving last strip item 'Before' last but one", () => {
		cy.get("#tabContainer")
			.shadow()
			.find<TabInStrip>(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])")
			.then(($el) => {
				const lastItem = $el[$el.length - 1];
				const lastButOneItem = $el[$el.length - 2];

				cy.ui5TabContainerDragAndDrop(lastItem, "Before", lastButOneItem);
				const helper = cy.stub();
				cy.get<typeof helper>("@handleMoveOverStub")
					.then((stub) => {
						debugger
						const event = stub.getCall(0).args[0];

						const { source, destination } = event.detail;
						expect(source.element.id).to.equal(lastItem.realTabReference.id);
						expect(destination.element.id).to.equal(lastButOneItem.realTabReference.id);
						expect(destination.placement).to.equal("Before");
					})

					// .should("have.been.calledWithMatch", Cypress.sinon.match((event: CustomEvent<TabContainerMoveEventDetail>) => {
					// 	const { source, destination } = event.detail;

					// 	return source.element.id === lastItem.realTabReference.id && destination.element.id === lastButOneItem.realTabReference.id && destination.placement === "Before";
					// }));

				cy.get("@handleMoveStub")
					.should("have.been.calledWithMatch", Cypress.sinon.match((event: CustomEvent<TabContainerMoveEventDetail>) => {
						const { source, destination } = event.detail;
						return source.element.id === lastItem.realTabReference.id && destination.element.id === lastButOneItem.realTabReference.id && destination.placement === "Before";
					}));
			})
	});

	it("Moving last strip item 'Before' first", () => {
		cy.get("#tabContainer")
			.shadow()
			.find<TabInStrip>(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])")
			.then(($el) => {
				const firstItem = $el[0];
				const lastItem = $el[$el.length - 1];

				cy.ui5TabContainerDragAndDrop(lastItem, "Before", firstItem);

				cy.get("@handleMoveOverStub")
					.should("have.been.calledWithMatch", Cypress.sinon.match((event: CustomEvent<TabContainerMoveEventDetail>) => {
						const { source, destination } = event.detail;

						return source.element.id === lastItem.realTabReference.id && destination.element.id === "tabOne" && destination.placement === "Before";
					}));

				cy.get("@handleMoveStub")
					.should("have.been.calledWithMatch", Cypress.sinon.match((event: CustomEvent<TabContainerMoveEventDetail>) => {
						const { source, destination } = event.detail;
						return source.element.id === lastItem.realTabReference.id && destination.element.id === "tabOne" && destination.placement === "Before";
					}));
			})
	});

	it ("Moving strip item 'On' another", () => {
		cy.get<Tab>("#tabFive, #tabSix")
			.then(($el) => {
				cy.ui5TabContainerDragAndDrop($el[0].getDomRefInStrip()!, "On", $el[1].getDomRefInStrip()!)
			})

		cy.get("@handleMoveOverStub")
			.should("have.been.calledWithMatch", Cypress.sinon.match((event: CustomEvent<TabContainerMoveEventDetail>) => {
				const { source, destination } = event.detail;

				return source.element.id === "tabFive" && destination.element.id === "tabSix" && destination.placement === "On";
			}));

		cy.get("@handleMoveStub")
			.should("have.been.calledWithMatch", Cypress.sinon.match((event: CustomEvent<TabContainerMoveEventDetail>) => {
				const { source, destination } = event.detail;

				return source.element.id === "tabFive" && destination.element.id === "tabSix" && destination.placement === "On";
			}));
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

				cy.get("@handleMoveOverStub")
					.should("have.been.calledWithMatch", Cypress.sinon.match((event: CustomEvent<TabContainerMoveEventDetail>) => {
						const { source, destination } = event.detail;
		
						return source.element.id === draggedPopoverItem.realTabReference.id && destination.element.id === dropTargetPopoverItem.realTabReference.id && destination.placement === "After";
					}));

				cy.get("@handleMoveStub")
					.should("have.been.calledWithMatch", Cypress.sinon.match((event: CustomEvent<TabContainerMoveEventDetail>) => {
						const { source, destination } = event.detail;

						return source.element.id === draggedPopoverItem.realTabReference.id && destination.element.id === dropTargetPopoverItem.realTabReference.id && destination.placement === "After";
					}));
			});
	});

	it("Moving item 'Before' another in end overflow popover", () => {
		cy.get("#tabContainer")
			.ui5TabContainerOpenEndOverflow();

		cy.get("#tabContainer")
			.shadow()
			.find<TabInStrip>(".ui5-tab-container-responsive-popover [ui5-li-custom]")
			.then(($el) => {
				const draggedPopoverItem = $el[1];
				const dropTargetPopoverItem = $el[0];

				cy.ui5TabContainerDragAndDrop(draggedPopoverItem, "Before", dropTargetPopoverItem, "Vertical");

				cy.get("@handleMoveOverStub")
					.should("have.been.calledWithMatch", Cypress.sinon.match((event: CustomEvent<TabContainerMoveEventDetail>) => {
						const { source, destination } = event.detail;

						return source.element.id === draggedPopoverItem.realTabReference.id && destination.element.id === dropTargetPopoverItem.realTabReference.id && destination.placement === "Before";
					}));
				cy.get("@handleMoveStub")
					.should("have.been.calledWithMatch", Cypress.sinon.match((event: CustomEvent<TabContainerMoveEventDetail>) => {
						const { source, destination } = event.detail;

						return source.element.id === draggedPopoverItem.realTabReference.id && destination.element.id === dropTargetPopoverItem.realTabReference.id && destination.placement === "Before";
					}));
			});
	});

	it("Moving item 'On' another in end overflow popover", () => {
		cy.get("#tabContainer")
			.ui5TabContainerOpenEndOverflow();

		cy.get("#tabContainer")
			.shadow()
			.find<TabInStrip>(".ui5-tab-container-responsive-popover [ui5-li-custom]")
			.then(($el) => {
				const draggedPopoverItem = $el[1];
				const dropTargetPopoverItem = $el[5];

				cy.ui5TabContainerDragAndDrop(draggedPopoverItem, "On", dropTargetPopoverItem, "Vertical");

				cy.get("@handleMoveOverStub")
					.should("have.been.calledWithMatch", Cypress.sinon.match((event: CustomEvent<TabContainerMoveEventDetail>) => {
						const { source, destination } = event.detail;

						return source.element.id === draggedPopoverItem.realTabReference.id && destination.element.id === dropTargetPopoverItem.realTabReference.id && destination.placement === "On";
					}));

				cy.get("@handleMoveStub")
					.should("have.been.calledWithMatch", Cypress.sinon.match((event: CustomEvent<TabContainerMoveEventDetail>) => {
						const { source, destination } = event.detail;

						return source.element.id === draggedPopoverItem.realTabReference.id && destination.element.id === dropTargetPopoverItem.realTabReference.id && destination.placement === "On";
					}));
			});
	});
});

// describe("Keyboard drag and drop tests", () => {
// 	before(async () => {
// 		await browser.url(`test/pages/TabContainerDragAndDrop.html`);
// 		await browser.setWindowSize(1024, 1000);
// 	});

// 	describe("Moving strip items", () => {
// 		it("Moving strip items with arrow keys", async () => {
// 			await browser.$("#tabContainer").shadow$(".ui5-tab-strip-item").click();
// 			const tab = await browser.$("#tabOne");

// 			assert.notOk(await tab.previousElement().isExisting(), "TabOne is the first tab");

// 			await browser.keys(["Control", "ArrowRight"]);
// 			assert.strictEqual(await tab.previousElement().getAttribute("id"), "tabTwo", "TabOne is after tabTwo");

// 			await browser.keys(["Control", "ArrowDown"]);
// 			assert.strictEqual(await tab.previousElement().getAttribute("id"), "tabThree", "TabOne is after tabThree");

// 			await browser.keys(["Control", "ArrowLeft"]);
// 			assert.strictEqual(await tab.previousElement().getAttribute("id"), "tabTwo", "TabOne is after tabTwo");

// 			await browser.keys(["Control", "ArrowUp"]);
// 			assert.notOk(await tab.previousElement().isExisting(), "TabOne is the first tab");
// 		});

// 		it("Moving strip item beyond the end with Arrow Right", async () => {
// 			for (let i = 0; i < 20; i++) {
// 				await browser.keys(["Control", "ArrowRight"]);
// 			}

// 			const displayedStripItems = await tabContainer.getDisplayedTabStripItems("tabContainer");

// 			assert.strictEqual(await tabContainer.getRealTabId(displayedStripItems.at(-1)), "tabOne", "TabOne is last in the strip");
// 		});

// 		it("Moving strip item beyond the beginning with Arrow Left", async () => {
// 			for (let i = 0; i < 20; i++) {
// 				await browser.keys(["Control", "ArrowLeft"]);
// 			}

// 			const displayedStripItems = await tabContainer.getDisplayedTabStripItems("tabContainer");

// 			assert.strictEqual(await tabContainer.getRealTabId(displayedStripItems.at(0)), "tabOne", "TabOne is the first in the strip");
// 		});

// 		it("Moving strip item with End", async () => {
// 			await tabContainer.focusItem("tabOne");
// 			await browser.keys(["Control", "End"]);

// 			const displayedStripItems = await tabContainer.getDisplayedTabStripItems("tabContainer");

// 			assert.strictEqual(await tabContainer.getRealTabId(displayedStripItems.at(-1)), "tabOne", "TabOne is the first in the strip");
// 		});

// 		it("Moving strip item with Home", async () => {
// 			await browser.keys(["Control", "Home"]);

// 			const displayedStripItems = await tabContainer.getDisplayedTabStripItems("tabContainer");

// 			assert.strictEqual(await tabContainer.getRealTabId(displayedStripItems.at(0)), "tabOne", "TabOne is the first in the strip");
// 		});
// 	});

// 	describe("Moving items in popover", () => {
// 		it("Moving sub items with arrow keys", async () => {
// 			await browser.$("#tabContainer").shadow$(".ui5-tab-strip-item:nth-child(3) [ui5-button]").click();

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
// 			await tabContainer.getEndOverflow("tabContainer").click();

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
// 	});

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
// });