import Breadcrumbs from "../../src/Breadcrumbs.js";
import BreadcrumbsItem from "../../src/BreadcrumbsItem.js";
import { getFirstFocusableElement } from "@ui5/webcomponents-base/dist/util/FocusableElements.js";

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