import ListItemGroup from "../../src/ListItemGroup.js";

describe("ListItemGroup Tests", () => {
	it("ListGroup is rendered", () => {
		cy.mount(<ListItemGroup headerText="New Items"></ListItemGroup>);

		cy.get("[ui5-li-group]").should("exist");
		
		cy.get("[ui5-li-group]")
			.shadow()
			.find("ui5-li-group-header")
			.should("exist");
	});

	it("ListGroup renders header-text property correctly", () => {
		cy.mount(<ListItemGroup headerText="New Items"></ListItemGroup>);

		cy.get("[ui5-li-group]")
			.shadow()
			.find("ui5-li-group-header")
			.should("contain.text", "New Items");
	});

	it("ListGroup propagates focused property to header item", () => {
		cy.mount(<ListItemGroup headerText="New Items"></ListItemGroup>);

		cy.get("[ui5-li-group]")
			.invoke("prop", "focused", true);

		cy.get("[ui5-li-group]")
			.shadow()
			.find("ui5-li-group-header")
			.should("have.prop", "focused", true);

		cy.get("[ui5-li-group]")
			.invoke("prop", "focused", false);

		cy.get("[ui5-li-group]")
			.shadow()
			.find("ui5-li-group-header")
			.should("have.prop", "focused", false);
	});
});

describe("List drag and drop tests", () => {
	const setupDragAndDrop = (listId: string, acceptExternal = false) => {
		cy.get(`#${listId}`).then(($list) => {
			const list = $list[0];

			list.addEventListener("ui5-move-over", (e: CustomEvent) => {
				const { destination, source } = e.detail;

				if (!acceptExternal && !list.contains(source.element)) {
					return;
				}

				if (destination.placement === "Before" || destination.placement === "After") {
					e.preventDefault();
				}

				if (destination.placement === "On" && "allowsNesting" in destination.element.dataset) {
					e.preventDefault();
				}
			});

			list.addEventListener("ui5-move", (e: CustomEvent) => {
				const { destination, source } = e.detail;

				if (source.element === destination.element) return;

				const parent = destination.element.closest("[ui5-li-group]");

				if (destination.placement === "Before") {
					parent.insertBefore(source.element, destination.element);
				} else if (destination.placement === "After") {
					const nextElement = Array.from(parent.children).at(
						Array.from(parent.children).indexOf(destination.element) + 1
					);
					parent.insertBefore(source.element, nextElement);
				} else if (destination.placement === "On") {
					destination.element.prepend(source.element);
				}
			});
		});
	};

	const dispatchMoveEvent = (sourceAlias: string, targetAlias: string, placement: string) => {
		cy.get(sourceAlias).then($source => {
			cy.get(targetAlias).then($target => {
				const moveEvent = new CustomEvent("ui5-move", {
					detail: {
						source: { element: $source[0] },
						destination: { element: $target[0], placement }
					}
				});
				
				const listElement = $target[0].closest("[ui5-li-group]");
				if (listElement) {
					listElement.dispatchEvent(moveEvent);
				}
			});
		});
	};

	beforeEach(() => {
		cy.mount(
			<div>
				<a id="link" href="http://sap.com" draggable={true}>http://sap.com</a>
				<ListItemGroup id="listDnd1" headerText="List 1"></ListItemGroup>
				<ListItemGroup id="listDnd2" headerText="List 2"></ListItemGroup>
			</div>
		);

		// Set up both lists
		setupDragAndDrop("listDnd1", false);
		setupDragAndDrop("listDnd2", true);

		// Create items for list1
		cy.get("#listDnd1").then($list => {
			$list[0].innerHTML = `
				<ui5-li id="bg1" movable>1. Bulgaria</ui5-li>
				<ui5-li id="de1" movable>1. Germany</ui5-li>
				<ui5-li id="es1" movable>1. Spain</ui5-li>
			`;
		});

		// Create items for list2
		cy.get("#listDnd2").then($list => {
			$list[0].innerHTML = `
				<ui5-li id="bg2" movable>2. Bulgaria</ui5-li>
				<ui5-li id="de2" movable data-allows-nesting>2. Germany (Allows nesting)</ui5-li>
				<ui5-li id="es2" movable>2. Spain</ui5-li>
			`;
		});

		cy.get("#listDnd1 ui5-li").should("have.length", 3);
		cy.get("#listDnd2 ui5-li").should("have.length", 3);
	});

	it("Moving item After another", () => {
		cy.get("#listDnd1 ui5-li").eq(0).as("first");
		cy.get("#listDnd1 ui5-li").eq(1).as("second");

		dispatchMoveEvent("@first", "@second", "After");

		cy.get("#listDnd1 ui5-li").eq(0).should("contain.text", "1. Germany");
		cy.get("#listDnd1 ui5-li").eq(1).should("contain.text", "1. Bulgaria");

		cy.get("#listDnd1 ui5-li").eq(1).as("currentFirst");
		cy.get("#listDnd1 ui5-li").eq(2).as("currentThird");

		dispatchMoveEvent("@currentFirst", "@currentThird", "After");

		cy.get("#listDnd1 ui5-li").eq(0).should("contain.text", "1. Germany");
		cy.get("#listDnd1 ui5-li").eq(1).should("contain.text", "1. Spain");
		cy.get("#listDnd1 ui5-li").eq(2).should("contain.text", "1. Bulgaria");
	});

	it("Moving item Before another", () => {
		cy.get("#listDnd1 ui5-li").eq(0).as("first");
		cy.get("#listDnd1 ui5-li").eq(2).as("third");

		dispatchMoveEvent("@first", "@third", "Before");

		cy.get("#listDnd1 ui5-li").eq(0).should("contain.text", "1. Germany");
		cy.get("#listDnd1 ui5-li").eq(1).should("contain.text", "1. Bulgaria");
		cy.get("#listDnd1 ui5-li").eq(2).should("contain.text", "1. Spain");

		cy.get("#listDnd1 ui5-li").eq(1).as("currentFirst");
		cy.get("#listDnd1 ui5-li").eq(0).as("currentSecond");

		dispatchMoveEvent("@currentFirst", "@currentSecond", "Before");

		cy.get("#listDnd1 ui5-li").eq(0).should("contain.text", "1. Bulgaria");
		cy.get("#listDnd1 ui5-li").eq(1).should("contain.text", "1. Germany");
		cy.get("#listDnd1 ui5-li").eq(2).should("contain.text", "1. Spain");
	});

	it("Moving item ON another", () => {
		cy.get("#listDnd2 ui5-li").eq(0).as("first");
		cy.get("#listDnd2 ui5-li").eq(1).as("second");

		dispatchMoveEvent("@first", "@second", "On");

		cy.get("#listDnd2 > ui5-li").should("have.length", 2);
		cy.get("#listDnd2 > ui5-li").eq(0).find("ui5-li").should("contain.text", "2. Bulgaria");
	});

	it("Moving item from one list to another", () => {
		cy.get("#bg2").as("listTwoItem");
		cy.get("#listDnd1 ui5-li").eq(0).as("listOneFirst");

		dispatchMoveEvent("@listTwoItem", "@listOneFirst", "After");

		cy.get("#listDnd1 ui5-li").should("have.length", 4);
		cy.get("#listDnd2 ui5-li").should("have.length", 2);
	});

	it("Moving link to list that doesn't accept it", () => {
		cy.get("#link").as("link");
		cy.get("#listDnd1 ui5-li").eq(0).as("first");

		dispatchMoveEvent("@link", "@first", "After");

		cy.get("#listDnd1 ui5-li").should("have.length", 3);
		cy.get("#link").should("exist");
	});

	it("Moving link to list that accepts it", () => {
		cy.get("#link").as("link");
		cy.get("#listDnd2 ui5-li").eq(1).as("second");

		dispatchMoveEvent("@link", "@second", "Before");

		cy.get("#listDnd2").children().should("have.length", 4);
		cy.get("#listDnd2 #link").should("exist");
	});
});