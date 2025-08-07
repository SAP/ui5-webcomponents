import Breadcrumbs from "../../src/Breadcrumbs.js";
import BreadcrumbsItem from "../../src/BreadcrumbsItem.js";
import { getFirstFocusableElement } from "@ui5/webcomponents-base/dist/util/FocusableElements.js";
import type UI5Element from "@ui5/webcomponents-base";

describe("breadcrumbs navigation", () => {

    it("displays all items in the popover on mobile", () => {
        cy.mount(
            <Breadcrumbs>
                <BreadcrumbsItem id="first" href="#">Link1</BreadcrumbsItem>
                <BreadcrumbsItem id="second" href="#">Link2</BreadcrumbsItem>
                <BreadcrumbsItem id="third" href="#">Link3</BreadcrumbsItem>
            </Breadcrumbs>
        );

        cy.get("ui5-breadcrumbs").then( async ($container) => {
		   const firstFocusable = await getFirstFocusableElement($container.get(0));
		   await firstFocusable?.focus();
		});

        cy.realPress("ArrowRight");

        cy.get("ui5-breadcrumbs").invoke("prop", "_itemNavigation").then(_itemNavigation => {
            return _itemNavigation._currentIndex;
        })
        .should("equal", 1); // index is 1 after arrow right

        cy.realPress("ArrowUp");

        cy.get("ui5-breadcrumbs").invoke("prop", "_itemNavigation").then(_itemNavigation => {
            return _itemNavigation._currentIndex;
        })
        .should("equal", 0); // index is back to 0 after arrow up
    });
});

describe("Breadcrumbs - getFocusDomRef Method", () => {
	it("should return undefined when the Breadcrumbs is empty", () => {
		cy.mount(<Breadcrumbs design="NoCurrentPage"></Breadcrumbs>);

		cy.get<Breadcrumbs>("[ui5-breadcrumbs]")
			.then(($el) => {
				expect($el[0].getFocusDomRef()).to.be.undefined;
			});
	});

	it("should return first item if no item was focused before", () => {
		cy.mount(
            <Breadcrumbs>
                <BreadcrumbsItem id="first">Link1</BreadcrumbsItem>
                <BreadcrumbsItem>Link2</BreadcrumbsItem>
            </Breadcrumbs>
		);

		cy.get<UI5Element>("[ui5-breadcrumbs], #first")
		.then(($el) => {
			const breadcrumbs = $el[0];
			const item = $el[1];

			const breadcrumbsAnchor = breadcrumbs.getFocusDomRef();
			const itemAnchor = item.getFocusDomRef().shadowRoot.querySelector("a");

			expect(breadcrumbsAnchor.textContent).to.equal(itemAnchor.textContent);
		});
	});

	it("should return last focused item in the Breadcrumbs", () => {
		cy.mount(
            <Breadcrumbs id="breadcrumbs">
                <BreadcrumbsItem>Link1</BreadcrumbsItem>
                <BreadcrumbsItem id="second">Link2</BreadcrumbsItem>
                <BreadcrumbsItem>Link1</BreadcrumbsItem>
                <BreadcrumbsItem>Link1</BreadcrumbsItem>
            </Breadcrumbs>
		);

		cy.get("#breadcrumbs")
			.shadow()
			.find("ui5-link")
			.eq(1)
			.as("second");

		cy.get("@second").click();

		cy.get<UI5Element>("[ui5-breadcrumbs], #second")
		.then(($el) => {
			const breadcrumbs = $el[0];
			const item = $el[1];

			const breadcrumbsAnchor = breadcrumbs.getFocusDomRef();
			const itemAnchor = item.getFocusDomRef().shadowRoot.querySelector("a");

			expect(breadcrumbsAnchor.textContent).to.equal(itemAnchor.textContent);
		});
	});
});
