import Breadcrumbs from "../../src/Breadcrumbs.js";
import BreadcrumbsItem from "../../src/BreadcrumbsItem.js";

describe("breadcrumbs navigation", () => {

    it("displays all items in the popover on mobile", () => {
        cy.mount(
            <Breadcrumbs>
                <BreadcrumbsItem id="first" href="#">Link1</BreadcrumbsItem>
                <BreadcrumbsItem id="second" href="#">Link2</BreadcrumbsItem>
                <BreadcrumbsItem id="third" href="#">Link3</BreadcrumbsItem>
            </Breadcrumbs>
        );

        cy.get("ui5-breadcrumbs")
            cy.realPress("Tab");

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