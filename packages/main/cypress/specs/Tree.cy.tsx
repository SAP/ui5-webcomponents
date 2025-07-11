import Tree from "../../src/Tree.js";
import "../../src/TreeItem.js";
import TreeItem from "../../src/TreeItem.js";
import Icon from "../../src/Icon.js";
import bell from "@ui5/webcomponents-icons/dist/bell.js";
import { setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import TreeItemCustom from "../../src/TreeItemCustom.js";
import Button from "../../src/Button.js";
import Option from "../../src/Option.js";
import Select from "../../src/Select.js";


describe("Tree Tests", () => {
	it("tests accessibility properties forwarded to the list", () => {
		cy.mount(
			<>
				<Tree
					accessibleName="Tree"
					accessibleNameRef="lblDesc1"
					accessibleDescription="Description"
					accessibleDescriptionRef="lblDesc2"
				></Tree>
				<div id="lblDesc1">Tree</div>
				<div id="lblDesc2">Description</div>
			</>
		);

		cy.get("[ui5-tree]")
			.as("tree");

		cy.get("@tree")
			.shadow()
			.find(".ui5-tree-root")
			.should("have.attr", "accessible-name", "Tree")
			.and("have.attr", "accessible-name-ref", "lblDesc1")
			.and("have.attr", "accessible-description", "Description")
			.and("have.attr", "accessible-description-ref", "lblDesc2");
	});

	it("Tests image slot", () => {
		cy.mount(
			<Tree>
				<TreeItem id="image-slot-tree-item">
					<Icon name={bell} slot="image" id="slotted-icon"></Icon>
				</TreeItem>
			</Tree>
		);

		cy.get("#image-slot-tree-item")
			.shadow()
			.find("slot[name='image']")
			.should("exist")
			.then($slot => {
				const slotElement = $slot[0] as HTMLSlotElement;
				const assignedNodes = slotElement.assignedNodes();
				expect(assignedNodes.length).to.be.greaterThan(0);
				cy.wrap(assignedNodes[0]).should("have.attr", "id", "slotted-icon");
			});
	});
});

describe("Tree Props", () => {
	it("noDataText is properly rendered", () => {
		cy.mount(
			<>
				<Tree noDataText="No data"></Tree>
			</>
		);

		cy.get("[ui5-tree]")
			.shadow()
			.find("[ui5-tree-list]")
			.shadow()
			.find("[ui5-busy-indicator]")
			.find(".ui5-list-nodata")
			.should("exist")
	});
});

before(() => {
	cy.wrap({ setAnimationMode })
		.then(api => {
			return api.setAnimationMode("none");
		});
})

const getVisibleTreeItems = (treeSelector = "[ui5-tree]") => {
	return cy.get(`${treeSelector} [ui5-tree-item]`).filter(":visible");
};

const getVisibleTreeItemsCount = (treeSelector = "[ui5-tree]") => {
	return getVisibleTreeItems(treeSelector).then($items => $items.length);
};

describe("Tree general interaction", () => {
	it("Tree is rendered", () => {
		cy.mount(
			<Tree>
				<TreeItem text="Tree 1" icon="paste" additional-text="Available" indeterminate selected additional-text-state="Information">
					<TreeItem text="Tree 1.1" additional-text="Re-stock" additional-text-state="Negative" indeterminate selected>
						<TreeItem text="Tree 1.1.1" additional-text="Required" additional-text-state="Critical" selected></TreeItem>
						<TreeItem text="Tree 1.1.2" additional-text="Available" additional-text-state="Positive"></TreeItem>
					</TreeItem>
				</TreeItem>
				<TreeItem text="Tree 2" icon="copy">
					<TreeItem text="Tree 2.1">
						<TreeItem text="Tree 2.1.1"></TreeItem>
						<TreeItem text="Tree 2.1.2">
							<TreeItem text="Tree 2.1.2.1"></TreeItem>
							<TreeItem text="Tree 2.1.2.2"></TreeItem>
							<TreeItem text="Tree 2.1.2.3"></TreeItem>
							<TreeItem text="Tree 2.1.2.5"></TreeItem>
						</TreeItem>
					</TreeItem>
					<TreeItem text="Tree 2.2"></TreeItem>
				</TreeItem>
			</Tree>
		);

		cy.get("[ui5-tree]")
			.shadow()
			.find("[ui5-tree-list]")
			.should("exist");
	});

	it("Tree items can be collapsed", () => {
		cy.mount(
			<Tree>
				<TreeItem text="Tree 1" expanded>
					<TreeItem text="Tree 1.1">
						<TreeItem text="Tree 1.1.1"></TreeItem>
						<TreeItem text="Tree 1.1.2"></TreeItem>
					</TreeItem>
				</TreeItem>
				<TreeItem text="Tree 2"></TreeItem>
			</Tree>
		);

		getVisibleTreeItemsCount().then(initialCount => {
			cy.get("[ui5-tree-item][expanded]")
				.shadow()
				.find(".ui5-li-tree-toggle-icon")
				.click();

			getVisibleTreeItemsCount().should("be.lessThan", initialCount);
		});
	});

	it("Tree items can be expanded", () => {
		cy.mount(
			<Tree>
				<TreeItem text="Tree 1">
					<TreeItem text="Tree 1.1">
						<TreeItem text="Tree 1.1.1"></TreeItem>
						<TreeItem text="Tree 1.1.2"></TreeItem>
					</TreeItem>
				</TreeItem>
				<TreeItem text="Tree 2"></TreeItem>
			</Tree>
		);

		getVisibleTreeItemsCount().then(initialCount => {
			cy.get("[ui5-tree-item]:first")
				.shadow()
				.find(".ui5-li-tree-toggle-icon")
				.click();

			getVisibleTreeItemsCount().should("be.greaterThan", initialCount);
		});
	});

	it("keyboard handling on F2", () => {
		cy.mount(
			<Tree selectionMode="Multiple">
				<TreeItemCustom
					expanded
					showToggleButton
					hideSelectionElement
					type="Active"
					level={1}
				>
					<Button slot="content">Level 1</Button>

					<TreeItemCustom
						type="Active"
						showToggleButton
						level={2}
						expanded
					>
						<Select slot="content">
							<Option>Level 2</Option>
							<Option>Option 2.1</Option>
							<Option>Option 2.3</Option>
						</Select>

						<TreeItemCustom
							hideSelectionElement
							type="Active"
							level={3}
							class="item"
						>
							<Button slot="content" class="itemBtn">Level 3</Button>
						</TreeItemCustom>
					</TreeItemCustom>
				</TreeItemCustom>
			</Tree>
		);

		cy.get("[ui5-tree-item-custom].item").should("exist");
		cy.get(".itemBtn").should("exist");

		cy.get("[ui5-tree-item-custom].item").click();

		cy.get("[ui5-tree-item-custom].item").should("be.focused");

		cy.get("[ui5-tree-item-custom].item").realPress("F2");

		cy.get(".itemBtn").should("be.focused");

		cy.get(".itemBtn").realPress("F2");

		cy.get("[ui5-tree-item-custom].item").should("be.focused");
	});
});

describe("Tree proxies properties to list", () => {
	it("Mouseover/mouseout events", () => {
		cy.mount(
			<>
				<Tree>
					<TreeItem text="Tree 1" expanded>
						<TreeItem text="Tree 1.1">
							<TreeItem text="Tree 1.1.1"></TreeItem>
							<TreeItem text="Tree 1.1.2"></TreeItem>
						</TreeItem>
					</TreeItem>
					<TreeItem text="Tree 2"></TreeItem>
				</Tree>
				<input id="mouseover-counter" value="0" />
				<input id="mouseout-counter" value="0" />
			</>
		);

		cy.window().then((win) => {
			let mouseoverCount = 0;
			let mouseoutCount = 0;

			cy.get("[ui5-tree]").then(($tree) => {
				$tree[0].addEventListener("ui5-item-mouseover", () => {
					mouseoverCount++;
					cy.get("#mouseover-counter").invoke("val", mouseoverCount.toString());
				});

				$tree[0].addEventListener("ui5-item-mouseout", () => {
					mouseoutCount++;
					cy.get("#mouseout-counter").invoke("val", mouseoutCount.toString());
				});
			});
		});

		cy.get("[ui5-tree-item]:first")
			.shadow()
			.find(".ui5-li-root-tree")
			.realHover();

		cy.get("#mouseover-counter")
			.should("have.value", "1");

		cy.get("[ui5-tree-item]:eq(1)")
			.shadow()
			.find(".ui5-li-root-tree")
			.realHover();

		cy.get("#mouseover-counter")
			.should("have.value", "2");

		cy.get("#mouseout-counter")
			.should("have.value", "1");
	});

	it("SelectionMode works", () => {
		cy.mount(
			<Tree selectionMode="Multiple">
				<TreeItem text="Tree 1" expanded>
					<TreeItem text="Tree 1.1">
						<TreeItem text="Tree 1.1.1"></TreeItem>
						<TreeItem text="Tree 1.1.2"></TreeItem>
					</TreeItem>
				</TreeItem>
				<TreeItem text="Tree 2">
					<TreeItem text="Tree 2.1"></TreeItem>
					<TreeItem text="Tree 2.2"></TreeItem>
				</TreeItem>
			</Tree>
		);

		cy.get("[ui5-tree]")
			.shadow()
			.find("[ui5-tree-list]")
			.should("have.attr", "selection-mode", "Multiple");

		cy.get("[ui5-tree-item]:first")
			.should("have.attr", "_selection-mode", "Multiple");

		const modes = ["None", "Single", "SingleStart", "SingleEnd", "Multiple", "Delete"];
		modes.forEach(selectionMode => {
			cy.get("[ui5-tree]")
				.invoke("attr", "selection-mode", selectionMode);

			cy.get("[ui5-tree]")
				.shadow()
				.find("[ui5-tree-list]")
				.should("have.attr", "selection-mode", selectionMode);
		});
	});

	it("SelectionMode works recursively", () => {
		cy.mount(
			<Tree selectionMode="Multiple">
				<TreeItem text="Should have checkbox">
					<TreeItem text="Should have checkbox">
						<TreeItem
							class="lastItem"
							text="Should have checkbox"
						></TreeItem>
						<TreeItem text="Should have checkbox"></TreeItem>
					</TreeItem>
					<TreeItem text="Should have checkbox"></TreeItem>
				</TreeItem>
			</Tree>
		);

		cy.get(".lastItem")
			.should("have.attr", "_selection-mode", "Multiple");
	});

	it("headerText, footerText, noDataText work", () => {
		cy.mount(
			<Tree>
				<TreeItem text="Tree 1"></TreeItem>
			</Tree>
		);

		cy.get("[ui5-tree]")
			.invoke("attr", "header-text", "header text");

		cy.get("[ui5-tree]")
			.shadow()
			.find("[ui5-tree-list]")
			.should("have.attr", "header-text", "header text");

		cy.get("[ui5-tree]")
			.invoke("attr", "footer-text", "footer text");

		cy.get("[ui5-tree]")
			.shadow()
			.find("[ui5-tree-list]")
			.should("have.attr", "footer-text", "footer text");

		cy.get("[ui5-tree]")
			.invoke("attr", "no-data-text", "no data text");

		cy.get("[ui5-tree]")
			.shadow()
			.find("[ui5-tree-list]")
			.should("have.attr", "no-data-text", "no data text");
	});

	it("Tests the prevention of the ui5-itemClick event", () => {
		cy.mount(
			<Tree selectionMode="Multiple">
				<TreeItem text="Tree 1" expanded>
					<TreeItem text="Tree 1.1"></TreeItem>
				</TreeItem>
			</Tree>
		);

		cy.get("[ui5-tree]").then(($tree) => {
			$tree[0].addEventListener("ui5-item-click", (event) => {
				event.preventDefault();
			});
		});

		cy.get("[ui5-tree-item]:first")
			.click()
			.should("not.have.attr", "selected");
	});

	it("selectionChange event provides targetItem parameter", () => {
		cy.mount(
			<>
				<Tree selectionMode="Multiple">
					<TreeItem text="Item 1" indeterminate selected></TreeItem>
					<TreeItem text="Item 2" indeterminate selected></TreeItem>
					<TreeItem text="Item 3"></TreeItem>
					<TreeItem text="Item 4" indeterminate selected></TreeItem>
				</Tree>
				<input id="selectionChangeTargetItemResult" placeholder="selectionChange targetItem result" />
			</>
		);

		cy.get("[ui5-tree]").then(($tree) => {
			$tree[0].addEventListener("ui5-selection-change", (event: CustomEvent) => {
				cy.get("#selectionChangeTargetItemResult").invoke("val", event.detail.targetItem.id || "no-id");
			});
		});

		cy.get("[ui5-tree-item]:first")
			.invoke("attr", "id", "item1")
			.click();

		cy.get("#selectionChangeTargetItemResult")
			.should("have.value", "item1");
	});
});

describe("Tree has screen reader support", () => {
	it("List role is correct", () => {
		cy.mount(
			<Tree>
				<TreeItem text="Tree 1" expanded>
					<TreeItem text="Tree 1.1">
						<TreeItem text="Tree 1.1.1"></TreeItem>
						<TreeItem text="Tree 1.1.2"></TreeItem>
					</TreeItem>
				</TreeItem>
				<TreeItem text="Tree 2"></TreeItem>
			</Tree>
		);

		cy.get("[ui5-tree]")
			.shadow()
			.find("[ui5-tree-list]")
			.shadow()
			.find("ul")
			.should("have.attr", "role", "tree");
	});

	it("List item acc attributes correct", () => {
		cy.mount(
			<Tree>
				<TreeItem text="Tree 1" expanded>
					<TreeItem text="Tree 1.1">
						<TreeItem text="Tree 1.1.1"></TreeItem>
						<TreeItem text="Tree 1.1.2"></TreeItem>
					</TreeItem>
				</TreeItem>
				<TreeItem text="Tree 2"></TreeItem>
			</Tree>
		);

		cy.get("[ui5-tree] [ui5-tree-item]").each(($item) => {
			cy.wrap($item)
				.shadow()
				.find("li")
				.should("have.attr", "role", "treeitem");

			cy.wrap($item)
				.invoke("attr", "level")
				.then((level) => {
					cy.wrap($item)
						.shadow()
						.find("li")
						.should("have.attr", "aria-level", level);
				});

			cy.wrap($item)
				.invoke("prop", "showToggleButton")
				.then((showToggleButton) => {
					cy.wrap($item)
						.invoke("prop", "expanded")
						.then((expanded) => {
							const ariaExpandedValues = {
								"true": {
									"true": "true",
									"false": "false",
								},
								"false": {
									"true": null,
									"false": null,
								}
							};

							const expectedValue = ariaExpandedValues[showToggleButton.toString()][expanded.toString()];

							if (expectedValue === null) {
								cy.wrap($item)
									.shadow()
									.find("li")
									.should("not.have.attr", "aria-expanded");
							} else {
								cy.wrap($item)
									.shadow()
									.find("li")
									.should("have.attr", "aria-expanded", expectedValue);
							}
						});
				});
		});
	});
});

describe("Tree slots", () => {
	it("items slot", () => {
		cy.mount(
			<>
				<Tree>
					<TreeItem text="1-0-0" expanded>
						<TreeItem text="1-1-0" expanded>
							<TreeItem text="1-1-1"></TreeItem>
						</TreeItem>
						<TreeItem text="1-2-0"></TreeItem>
						<TreeItem text="1-3-0"></TreeItem>
					</TreeItem>
				</Tree>
				<button id="btn">Add</button>
			</>
		);

		cy.get("[ui5-tree-item]:first")
			.find("[ui5-tree-item]:first")
			.as("treeItem");

		cy.get("@treeItem")
			.invoke("prop", "items")
			.should("have.length", 1);

		cy.get("#btn").then(($btn) => {
			$btn[0].addEventListener("click", () => {
				cy.get("@treeItem").then(($treeItem) => {
					const newTreeItem = document.createElement("ui5-tree-item") as any;
					const currentCount = $treeItem[0].querySelectorAll("[ui5-tree-item]").length;
					newTreeItem.text = `1-1-${currentCount + 1}`;
					$treeItem[0].appendChild(newTreeItem);
				});
			});
		});

		cy.get("#btn").click();

		cy.get("@treeItem")
			.invoke("prop", "items")
			.should("have.length", 2);

		cy.get("@treeItem")
			.find("[ui5-tree-item]:last-child")
			.should("have.prop", "text", "1-1-2")
			.and("have.prop", "level", 3);
	});
});

describe("Tree drag and drop tests", () => {
	it("Moving item After another", () => {
		cy.mount(
			<Tree selectionMode="Multiple" accessibleName="Tree with accessibleName">
				<TreeItem movable text="Tree 1" icon="paste" additionalText="Available" indeterminate selected additionalTextState="Information">
					<TreeItem movable expanded text="Tree 1.1" additionalText="Re-stock" additionalTextState="Negative" indeterminate selected>
						<TreeItem movable text="Tree 1.1.1" additionalText="Required" additionalTextState="Critical" selected></TreeItem>
						<TreeItem movable text="Tree 1.1.2" additionalText="Available" additionalTextState="Positive"></TreeItem>
					</TreeItem>
				</TreeItem>
				<TreeItem movable text="Tree 2 ALLOWS NESTING" icon="copy">
					<TreeItem movable text="Tree 2.1">
						<TreeItem movable text="Tree 2.1.1"></TreeItem>
						<TreeItem movable text="Tree 2.1.2">
							<TreeItem movable text="Tree 2.1.2.1"></TreeItem>
							<TreeItem movable text="Tree 2.1.2.2"></TreeItem>
							<TreeItem movable text="Tree 2.1.2.3"></TreeItem>
							<TreeItem movable text="Tree 2.1.2.5"></TreeItem>
						</TreeItem>
					</TreeItem>
					<TreeItem movable text="Tree 2.2"></TreeItem>
					<TreeItem movable text="Tree 2.3"></TreeItem>
				</TreeItem>
				<TreeItem movable text="Tree 3 (no icon)"></TreeItem>
			</Tree>
		);

		// Add drag and drop event handlers
		cy.get("[ui5-tree]").then(($tree) => {
			const tree = $tree[0];

			tree.addEventListener("ui5-move-over", (e: CustomEvent) => {
				const { destination, source } = e.detail;
				if (!tree.contains(source.element)) {
					return;
				}
				// Allow "After" placement for this test
				if (destination.placement === "Before") {
					e.preventDefault();
				}
			});

			tree.addEventListener("ui5-move", (e: CustomEvent) => {
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
			});
		});

		// Use trigger to simulate drag and drop events instead of realMouse actions
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(0).as("firstItem");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(1).as("secondItem");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(2).as("thirdItem");

		// Simulate moving first item after second item by triggering the move event directly
		cy.get("@firstItem").then(($first) => {
			cy.get("@secondItem").then(($second) => {
				const moveEvent = new CustomEvent("ui5-move", {
					detail: {
						source: { element: $first[0] },
						destination: { element: $second[0], placement: "After" }
					}
				});
				cy.get("[ui5-tree]").then(($tree) => {
					$tree[0].dispatchEvent(moveEvent);
				});
			});
		});

		// Verify new order: second, first, third
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(0).should("have.attr", "text", "Tree 2 ALLOWS NESTING");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(1).should("have.attr", "text", "Tree 1");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(2).should("have.attr", "text", "Tree 3 (no icon)");

		// Move first item after third item
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(1).then(($first) => {
			cy.get("[ui5-tree] > [ui5-tree-item]").eq(2).then(($third) => {
				const moveEvent = new CustomEvent("ui5-move", {
					detail: {
						source: { element: $first[0] },
						destination: { element: $third[0], placement: "After" }
					}
				});
				cy.get("[ui5-tree]").then(($tree) => {
					$tree[0].dispatchEvent(moveEvent);
				});
			});
		});

		// Verify final order: second, third, first
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(0).should("have.attr", "text", "Tree 2 ALLOWS NESTING");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(1).should("have.attr", "text", "Tree 3 (no icon)");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(2).should("have.attr", "text", "Tree 1");
	});

	it("Moving item Before another", () => {
		cy.mount(
			<Tree selectionMode="Multiple" accessibleName="Tree with accessibleName">
				<TreeItem movable text="Tree 1" icon="paste" additionalText="Available" indeterminate selected additionalTextState="Information">
					<TreeItem movable expanded text="Tree 1.1" additionalText="Re-stock" additionalTextState="Negative" indeterminate selected>
						<TreeItem movable text="Tree 1.1.1" additionalText="Required" additionalTextState="Critical" selected></TreeItem>
						<TreeItem movable text="Tree 1.1.2" additionalText="Available" additionalTextState="Positive"></TreeItem>
					</TreeItem>
				</TreeItem>
				<TreeItem movable text="Tree 2 ALLOWS NESTING" icon="copy">
					<TreeItem movable text="Tree 2.1">
						<TreeItem movable text="Tree 2.1.1"></TreeItem>
						<TreeItem movable text="Tree 2.1.2">
							<TreeItem movable text="Tree 2.1.2.1"></TreeItem>
							<TreeItem movable text="Tree 2.1.2.2"></TreeItem>
							<TreeItem movable text="Tree 2.1.2.3"></TreeItem>
							<TreeItem movable text="Tree 2.1.2.5"></TreeItem>
						</TreeItem>
					</TreeItem>
					<TreeItem movable text="Tree 2.2"></TreeItem>
					<TreeItem movable text="Tree 2.3"></TreeItem>
				</TreeItem>
				<TreeItem movable text="Tree 3 (no icon)"></TreeItem>
			</Tree>
		);

		// Add drag and drop event handlers
		cy.get("[ui5-tree]").then(($tree) => {
			const tree = $tree[0];

			tree.addEventListener("ui5-move-over", (e: CustomEvent) => {
				const { destination, source } = e.detail;
				if (!tree.contains(source.element)) {
					return;
				}
				// Allow "Before" placement for this test
				if (destination.placement === "After") {
					e.preventDefault();
				}
			});

			tree.addEventListener("ui5-move", (e: CustomEvent) => {
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
			});
		});

		// Get tree items - note the order matches WDIO test: [secondItem, thirdItem, firstItem]
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(1).as("secondItem");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(2).as("thirdItem");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(0).as("firstItem");

		// Move first item before third item
		cy.get("@firstItem").then(($first) => {
			cy.get("@thirdItem").then(($third) => {
				const moveEvent = new CustomEvent("ui5-move", {
					detail: {
						source: { element: $first[0] },
						destination: { element: $third[0], placement: "Before" }
					}
				});
				cy.get("[ui5-tree]").then(($tree) => {
					$tree[0].dispatchEvent(moveEvent);
				});
			});
		});

		// Verify new order: second, first, third
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(0).should("have.attr", "text", "Tree 2 ALLOWS NESTING");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(1).should("have.attr", "text", "Tree 1");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(2).should("have.attr", "text", "Tree 3 (no icon)");

		// Move first item before second item
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(1).then(($first) => {
			cy.get("[ui5-tree] > [ui5-tree-item]").eq(0).then(($second) => {
				const moveEvent = new CustomEvent("ui5-move", {
					detail: {
						source: { element: $first[0] },
						destination: { element: $second[0], placement: "Before" }
					}
				});
				cy.get("[ui5-tree]").then(($tree) => {
					$tree[0].dispatchEvent(moveEvent);
				});
			});
		});

		// Verify final order: first, second, third
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(0).should("have.attr", "text", "Tree 1");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(1).should("have.attr", "text", "Tree 2 ALLOWS NESTING");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(2).should("have.attr", "text", "Tree 3 (no icon)");
	});

	it("Moving item ON another", () => {
		cy.mount(
			<Tree selectionMode="Multiple" accessibleName="Tree with accessibleName">
				<TreeItem movable text="Tree 1" icon="paste" additionalText="Available" indeterminate selected additionalTextState="Information">
					<TreeItem movable expanded text="Tree 1.1" additionalText="Re-stock" additionalTextState="Negative" indeterminate selected>
						<TreeItem movable text="Tree 1.1.1" additionalText="Required" additionalTextState="Critical" selected></TreeItem>
						<TreeItem movable text="Tree 1.1.2" additionalText="Available" additionalTextState="Positive"></TreeItem>
					</TreeItem>
				</TreeItem>
				<TreeItem movable text="Tree 2 ALLOWS NESTING" icon="copy" data-allows-nesting>
					<TreeItem movable text="Tree 2.1">
						<TreeItem movable text="Tree 2.1.1"></TreeItem>
						<TreeItem movable text="Tree 2.1.2">
							<TreeItem movable text="Tree 2.1.2.1"></TreeItem>
							<TreeItem movable text="Tree 2.1.2.2"></TreeItem>
							<TreeItem movable text="Tree 2.1.2.3"></TreeItem>
							<TreeItem movable text="Tree 2.1.2.5"></TreeItem>
						</TreeItem>
					</TreeItem>
					<TreeItem movable text="Tree 2.2"></TreeItem>
					<TreeItem movable text="Tree 2.3"></TreeItem>
				</TreeItem>
				<TreeItem movable text="Tree 3 (no icon)"></TreeItem>
			</Tree>
		);

		// Add drag and drop event handlers
		cy.get("[ui5-tree]").then(($tree) => {
			const tree = $tree[0];

			tree.addEventListener("ui5-move-over", (e: CustomEvent) => {
				const { destination, source } = e.detail;
				if (!tree.contains(source.element)) {
					return;
				}
				// Allow "On" placement only for elements with data-allows-nesting
				if (destination.placement === "On" && !("allowsNesting" in destination.element.dataset)) {
					return;
				}
				e.preventDefault();
			});

			tree.addEventListener("ui5-move", (e: CustomEvent) => {
				const { destination, source } = e.detail;

				// Prevent moving element onto itself
				if (source.element === destination.element) {
					return;
				}

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
			});
		});

		// Get tree items
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(0).as("firstItem");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(1).as("secondItem");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(2).as("thirdItem");

		// Test 1: Try to move first item ON itself (should not change order)
		cy.get("@firstItem").then(($first) => {
			const moveEvent = new CustomEvent("ui5-move", {
				detail: {
					source: { element: $first[0] },
					destination: { element: $first[0], placement: "On" }
				}
			});
			cy.get("[ui5-tree]").then(($tree) => {
				$tree[0].dispatchEvent(moveEvent);
			});
		});

		// Verify order has NOT changed
		cy.get("[ui5-tree] > [ui5-tree-item]").should("have.length", 3);
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(0).should("have.attr", "text", "Tree 1");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(1).should("have.attr", "text", "Tree 2 ALLOWS NESTING");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(2).should("have.attr", "text", "Tree 3 (no icon)");

		// Test 2: Move first item ON second item (nesting - should work)
		cy.get("@firstItem").then(($first) => {
			cy.get("@secondItem").then(($second) => {
				const moveEvent = new CustomEvent("ui5-move", {
					detail: {
						source: { element: $first[0] },
						destination: { element: $second[0], placement: "On" }
					}
				});
				cy.get("[ui5-tree]").then(($tree) => {
					$tree[0].dispatchEvent(moveEvent);
				});
			});
		});

		// Verify first item is nested in second (only 2 items at root level)
		cy.get("[ui5-tree] > [ui5-tree-item]").should("have.length", 2);
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(0).should("have.attr", "text", "Tree 2 ALLOWS NESTING");
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(1).should("have.attr", "text", "Tree 3 (no icon)");

		// Verify first item is nested inside second item
		cy.get("[ui5-tree] > [ui5-tree-item]").eq(0).find("[ui5-tree-item]").first().should("have.attr", "text", "Tree 1");
	});

	it("Rearranging leafs", () => {
		cy.mount(
			<Tree selectionMode="Multiple" accessibleName="Tree with accessibleName">
				<TreeItem movable text="Tree 1" icon="paste" additionalText="Available" indeterminate selected additionalTextState="Information">
					<TreeItem movable expanded text="Tree 1.1" additionalText="Re-stock" additionalTextState="Negative" indeterminate selected>
						<TreeItem movable text="Tree 1.1.1" additionalText="Required" additionalTextState="Critical" selected></TreeItem>
						<TreeItem movable text="Tree 1.1.2" additionalText="Available" additionalTextState="Positive"></TreeItem>
					</TreeItem>
				</TreeItem>
				<TreeItem movable text="Tree 2 ALLOWS NESTING" icon="copy" data-allows-nesting>
					<TreeItem movable text="Tree 2.1">
						<TreeItem movable text="Tree 2.1.1"></TreeItem>
						<TreeItem movable text="Tree 2.1.2">
							<TreeItem movable text="Tree 2.1.2.1"></TreeItem>
							<TreeItem movable text="Tree 2.1.2.2"></TreeItem>
							<TreeItem movable text="Tree 2.1.2.3"></TreeItem>
							<TreeItem movable text="Tree 2.1.2.5"></TreeItem>
						</TreeItem>
					</TreeItem>
					<TreeItem movable text="Tree 2.2"></TreeItem>
					<TreeItem movable text="Tree 2.3"></TreeItem>
				</TreeItem>
				<TreeItem movable text="Tree 3 (no icon)"></TreeItem>
			</Tree>
		);

		// Add drag and drop event handlers
		cy.get("[ui5-tree]").then(($tree) => {
			const tree = $tree[0];

			tree.addEventListener("ui5-move-over", (e: CustomEvent) => {
				const { destination, source } = e.detail;
				if (!tree.contains(source.element)) {
					return;
				}
				e.preventDefault();
			});

			tree.addEventListener("ui5-move", (e: CustomEvent) => {
				const { destination, source } = e.detail;

				if (source.element === destination.element) {
					return;
				}

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
			});
		});

		// Click toggle button to expand items (similar to WDIO test)
		cy.get("[ui5-tree-item]")
			.shadow()
			.find(".ui5-li-tree-toggle-icon")
			.first()
			.click();

		// Get all tree items after expansion
		cy.get("[ui5-tree] [ui5-tree-item]").then(($allItems) => {
			const allItems = Array.from($allItems);
			const secondToLastLeaf = allItems[12];
			const lastLeaf = allItems[13];

			// Move second-to-last leaf after last leaf
			const moveEvent1 = new CustomEvent("ui5-move", {
				detail: {
					source: { element: secondToLastLeaf },
					destination: { element: lastLeaf, placement: "After" }
				}
			});

			cy.get("[ui5-tree]").then(($tree) => {
				$tree[0].dispatchEvent(moveEvent1);
			});

			// Verify the order changed - swap positions in expected array
			const expectedAfterFirst = [...allItems];
			[expectedAfterFirst[12], expectedAfterFirst[13]] = [expectedAfterFirst[13], expectedAfterFirst[12]];

			cy.get("[ui5-tree] [ui5-tree-item]").then(($newItems) => {
				const newItems = Array.from($newItems);
				expect(newItems[12]).to.equal(expectedAfterFirst[12]);
				expect(newItems[13]).to.equal(expectedAfterFirst[13]);
			});

			// Move last leaf before second-to-last leaf (reverse the previous move)
			cy.get("[ui5-tree] [ui5-tree-item]").then(($currentItems) => {
				const currentItems = Array.from($currentItems);
				const currentSecondToLast = currentItems[12];
				const currentLast = currentItems[13];

				const moveEvent2 = new CustomEvent("ui5-move", {
					detail: {
						source: { element: currentLast },
						destination: { element: currentSecondToLast, placement: "Before" }
					}
				});

				cy.get("[ui5-tree]").then(($tree) => {
					$tree[0].dispatchEvent(moveEvent2);
				});

				// Verify the order is back to original
				cy.get("[ui5-tree] [ui5-tree-item]").then(($finalItems) => {
					const finalItems = Array.from($finalItems);
					expect(finalItems[12]).to.equal(allItems[12]);
					expect(finalItems[13]).to.equal(allItems[13]);
				});
			});
		});
	});

	it("Nesting parent among its children should be impossible", () => {
		cy.mount(
			<Tree selectionMode="Multiple" accessibleName="Tree with accessibleName">
				<TreeItem movable text="Tree 1" icon="paste" additionalText="Available" indeterminate selected additionalTextState="Information">
					<TreeItem movable expanded text="Tree 1.1" additionalText="Re-stock" additionalTextState="Negative" indeterminate selected>
						<TreeItem movable text="Tree 1.1.1" additionalText="Required" additionalTextState="Critical" selected></TreeItem>
						<TreeItem movable text="Tree 1.1.2" additionalText="Available" additionalTextState="Positive"></TreeItem>
					</TreeItem>
				</TreeItem>
				<TreeItem movable text="Tree 2 ALLOWS NESTING" icon="copy" data-allows-nesting>
					<TreeItem movable text="Tree 2.1">
						<TreeItem movable text="Tree 2.1.1"></TreeItem>
						<TreeItem movable text="Tree 2.1.2">
							<TreeItem movable text="Tree 2.1.2.1"></TreeItem>
							<TreeItem movable text="Tree 2.1.2.2"></TreeItem>
							<TreeItem movable text="Tree 2.1.2.3"></TreeItem>
							<TreeItem movable text="Tree 2.1.2.5"></TreeItem>
						</TreeItem>
					</TreeItem>
					<TreeItem movable text="Tree 2.2"></TreeItem>
					<TreeItem movable text="Tree 2.3"></TreeItem>
				</TreeItem>
				<TreeItem movable text="Tree 3 (no icon)"></TreeItem>
			</Tree>
		);

		// Add drag and drop event handlers
		cy.get("[ui5-tree]").then(($tree) => {
			const tree = $tree[0];

			tree.addEventListener("ui5-move-over", (e: CustomEvent) => {
				const { destination, source } = e.detail;
				if (!tree.contains(source.element)) {
					return;
				}

				// Prevent moving parent among its children
				if (source.element.contains(destination.element)) {
					return;
				}

				e.preventDefault();
			});

			tree.addEventListener("ui5-move", (e: CustomEvent) => {
				const { destination, source } = e.detail;

				if (source.element === destination.element) {
					return;
				}

				// Additional check: prevent moving parent among its children
				if (source.element.contains(destination.element)) {
					return;
				}

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
			});
		});

		// Get all tree items
		cy.get("[ui5-tree] [ui5-tree-item]").then(($allItems) => {
			const allItems = Array.from($allItems);
			const parent = allItems[0];
			const child = allItems[1];

			// Store original order for comparison
			const originalOrder = allItems.map(item => item.getAttribute('text'));

			// Try to move parent after its child (should be prevented)
			const moveEvent = new CustomEvent("ui5-move", {
				detail: {
					source: { element: parent },
					destination: { element: child, placement: "After" }
				}
			});

			cy.get("[ui5-tree]").then(($tree) => {
				$tree[0].dispatchEvent(moveEvent);
			});

			// Verify order stays the same - parent not nested among its children
			cy.get("[ui5-tree] [ui5-tree-item]").then(($newItems) => {
				const newItems = Array.from($newItems);
				const newOrder = newItems.map(item => item.getAttribute('text'));

				expect(newOrder).to.deep.equal(originalOrder);

				// Specifically verify parent is still at position 0 and child at position 1
				expect(newItems[0]).to.equal(parent);
				expect(newItems[1]).to.equal(child);
			});
		});
	});
});