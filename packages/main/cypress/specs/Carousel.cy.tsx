import Button from "../../src/Button.js";
import Carousel from "../../src/Carousel.js";
import Card from "../../src/Card.js";
import Input from "../../src/Input.js";
import List from "../../src/List.js";
import CardHeader from "../../src/CardHeader.js";
import Icon from "../../src/Icon.js";
import ListItemGroup from "../../src/ListItemGroup.js";
import Avatar from "../../src/Avatar.js";
import ListItemStandard from "../../src/ListItemStandard.js";

describe("Carousel general interaction", () => {
	it("rendering", () => {
		cy.mount(
			<Carousel id="carousel1">
				<Button>Button 1</Button>
				<Button>Button 2</Button>
			</Carousel>);

		cy.get("#carousel1")
			.shadow()
			.find(".ui5-carousel-root")
			.should("exist");

		cy.get("#carousel1")
			.shadow()
			.find(".ui5-carousel-item:nth-child(1)")
			.should("not.have.class", "ui5-carousel-item--hidden");

		cy.get("#carousel1")
			.shadow()
			.find(".ui5-carousel-item:nth-child(2)")
			.should("have.class", "ui5-carousel-item--hidden");
	});

	it("Carousel navigates left", () => {
		cy.mount(
			<Carousel id="carousel1" cyclic={true}>
				<Button>Button 1</Button>
				<Button>Button 2</Button>
				<Button>Button 3</Button>
			</Carousel>);

		cy.get("#carousel1")
			.realHover()
			.shadow()
			.find(".ui5-carousel-navigation-arrows .ui5-carousel-navigation-button:not(.ui5-carousel-navigation-button--hidden)")
			.realClick();

		cy.get("#carousel1").should("have.prop", "_selectedIndex", 2);
	});

	it("Carousel navigates right", () => {
		cy.mount(
			<Carousel id="carousel1">
				<Button>Button 1</Button>
				<Button>Button 2</Button>
				<Button>Button 3</Button>
			</Carousel>);

		cy.get("#carousel1")
			.realHover()
			.shadow()
			.find(".ui5-carousel-navigation-arrows .ui5-carousel-navigation-button:not(.ui5-carousel-navigation-button--hidden)")
			.realClick();

		cy.get("#carousel1").should("have.prop", "_selectedIndex", 1);
	});

	it("Navigation is rendered for carousel with less than 9 elements", () => {
		cy.mount(
			<Carousel id="carousel1">
				<Button>Button 1</Button>
				<Button>Button 2</Button>
				<Button>Button 3</Button>
			</Carousel>);

		cy.get("#carousel1")
			.shadow()
			.find(".ui5-carousel-navigation > div")
			.should("exist");
	});

	it("Navigation is rendered for carousel with more than 9 elements", () => {
		cy.mount(
			<Carousel id="carousel2">
				<Button>Button 1 </Button>
				<Button>Button 2 </Button>
				<Button>Button 3 </Button>
				<Button>Button 4 </Button>
				<Button>Button 5 </Button>
				<Button>Button 6 </Button>
				<Button>Button 7 </Button>
				<Button>Button 8 </Button>
				<Button>Button 9 </Button>
			</Carousel>);

		cy.get("#carousel2")
			.shadow()
			.find(".ui5-carousel-navigation > .ui5-carousel-navigation-text")
			.should("exist")
			.and("have.attr", "dir", "auto");
	});

	it("Buttons are rendered in the content only when hovering (arrows-placement)", () => {
		cy.mount(
			<Carousel id="carousel2">
				<Button>Button 1 </Button>
				<Button>Button 2 </Button>
				<Button>Button 3 </Button>
				<Button>Button 4 </Button>
				<Button>Button 5 </Button>
				<Button>Button 6 </Button>
				<Button>Button 7 </Button>
				<Button>Button 8 </Button>
				<Button>Button 9 </Button>
			</Carousel>);

		cy.get("#carousel2")
			.realHover()
			.shadow()
			.find(".ui5-carousel-navigation-arrows .ui5-carousel-navigation-button:not(.ui5-carousel-navigation-button--hidden)")
			.should("have.length", 1);

		cy.get("#carousel2")
			.realHover()
			.shadow()
			.find(".ui5-carousel-navigation-arrows .ui5-carousel-navigation-button:not(.ui5-carousel-navigation-button--hidden)")
			.realClick();

		cy.get("#carousel2")
			.realHover()
			.shadow()
			.find(".ui5-carousel-navigation-arrows .ui5-carousel-navigation-button:not(.ui5-carousel-navigation-button--hidden)")
			.should("have.length", 2);
	});

	it("Buttons are rendered in the navigation without hovering (arrows-placement)", () => {
		cy.mount(
			<Carousel id="carousel3" arrowsPlacement="Navigation">
				<Button>Button 1</Button>
				<Button>Button 2</Button>
				<Button>Button 3</Button>
			</Carousel>);

		cy.get("#carousel3")
			.shadow()
			.find(".ui5-carousel-navigation-button[data-ui5-arrow-forward]")
			.realClick();

		cy.get("#carousel3")
			.shadow()
			.find(".ui5-carousel-navigation-wrapper .ui5-carousel-navigation-button:not(.ui5-carousel-navigation-button--hidden)")
			.should("have.length", 2)
	});

	it("ItemsPerPage property is working properly", () => {
		cy.mount(
			<Carousel id="carousel4">
				<span>page 1</span>
				<span>page 2</span>
				<span>page 3</span>
			</Carousel>);

		cy.get("#carousel4")
			.should("have.prop", "pagesCount", 3)
	});

	it("Aria attributes are set", () => {
		const PAGE_INDICATOR_ARIA_LABEL1 = "Item 1 of 5 displayed";
		const PAGE_INDICATOR_ARIA_LABEL2 = "Item 2 of 5 displayed";
		const CAROUSEL_ITEM3_POS = "3";
		const CAROUSEL_ITEM4_POS = "4";
		const SETSIZE = "8";

		cy.mount(
			<>
				<Carousel id="carousel5" itemsPerPage="S1 M4 L4 XL4">
					<Button>Button 1</Button>
					<Button>Button 2</Button>
					<Button>Button 3</Button>
					<Button>Button 4</Button>
					<Button>Button 5</Button>
					<Button>Button 6</Button>
					<Button>Button 7</Button>
					<Button>Button 8</Button>
				</Carousel>
				<Carousel id="carouselAccName" cyclic={true} accessibleName="Buttons Carousel">
					<Button>Button 1</Button>
					<Button>Button 2</Button>
					<Button>Button 3</Button>
				</Carousel>
				<h4 id="manyButtons">Many Buttons Carousel</h4>
				<Carousel id="carouselAccNameRef" accessibleNameRef="manyButtons">
					<Button>Button 1</Button>
					<Button>Button 2</Button>
					<Button>Button 3</Button>
					<Button>Button 4</Button>
					<Button>Button 5</Button>
					<Button>Button 6</Button>
					<Button>Button 7</Button>
					<Button>Button 8</Button>
					<Button>Button 9</Button>
				</Carousel>
			</>);

		cy.get("#carousel5")
			.shadow()
			.find(".ui5-carousel-navigation-dot:first-child")
			.should("have.attr", "aria-label", PAGE_INDICATOR_ARIA_LABEL1);

		cy.get("#carousel5")
			.shadow()
			.find(".ui5-carousel-navigation-dot:nth-child(2)")
			.should("have.attr", "aria-label", PAGE_INDICATOR_ARIA_LABEL2);

		cy.get("#carousel5")
			.shadow()
			.find(".ui5-carousel-item:first-child")
			.should("have.attr", "aria-selected", "true");

		cy.get("#carousel5")
			.shadow()
			.find(".ui5-carousel-item:nth-child(3)")
			.should("have.attr", "aria-posinset", CAROUSEL_ITEM3_POS)
			.and("have.attr", "aria-setsize", SETSIZE);

		cy.get("#carousel5")
			.shadow()
			.find(".ui5-carousel-item:nth-child(4)")
			.should("have.attr", "aria-posinset", CAROUSEL_ITEM4_POS)
			.and("have.attr", "aria-setsize", SETSIZE);

		cy.get<Carousel>('#carousel5')
			.then(($carousel) => {
				const el = $carousel[0];

				cy.get('#carousel5')
					.shadow()
					.find('.ui5-carousel-root')
					.should('have.attr', 'aria-activedescendant', `${el._id}-carousel-item-1`);
			});

		cy.get("#carousel5")
			.shadow()
			.find(".ui5-carousel-navigation-button:nth-child(2)")
			.realClick();

		cy.get<Carousel>('#carousel5')
			.then(($carousel) => {
				const el = $carousel[0];
				cy.get('#carousel5')
					.shadow()
					.find('.ui5-carousel-root')
					.should('have.attr', 'aria-activedescendant', `${el._id}-carousel-item-2`);
			});

		cy.get("#carouselAccName")
			.shadow()
			.find(".ui5-carousel-root")
			.should("have.attr", "aria-label", "Buttons Carousel");

		cy.get("#carouselAccNameRef")
			.shadow()
			.find(".ui5-carousel-root")
			.should("have.attr", "aria-label", "Many Buttons Carousel");

		cy.get("#carousel5")
			.shadow()
			.find(".ui5-carousel-root")
			.should("have.attr", "role", "list");

		cy.get("#carousel5")
			.shadow()
			.find(".ui5-carousel-item")
			.should("have.attr", "role", "listitem");

		cy.get("#carousel5")
			.shadow()
			.find(".ui5-carousel-root")
			.should("have.attr", "aria-roledescription", "Carousel");
	});

	it("all visible elements in the current page have correct tabindex values", () => {
		cy.mount(
			<Carousel id="carouselCards" itemsPerPage="S3 M3 L3 XL3">
				<span>item 1</span>
				<span>item 2</span>
				<span>item 3</span>
			</Carousel>);

		cy.get("#carouselCards")
			.shadow()
			.find(".ui5-carousel-item:nth-child(1) slot")
			.should("have.prop", "tabindex", 0);

		cy.get("#carouselCards")
			.shadow()
			.find(".ui5-carousel-item:nth-child(2) slot")
			.should("have.prop", "tabindex", 0);

		cy.get("#carouselCards")
			.shadow()
			.find(".ui5-carousel-item:nth-child(3) slot")
			.should("have.prop", "tabindex", 0);
	});

	it("Arrows and Dots not displayed in case of single page", () => {
		cy.mount(
			<Carousel id="carousel6">
				<Button>Button 1</Button>
			</Carousel>);

		cy.get("#carousel6")
			.shadow()
			.find(".ui5-carousel-navigation-wrapper")
			.should("not.exist");

		cy.get("#carousel6")
			.shadow()
			.find(".ui5-carousel-navigation-arrows")
			.should("not.exist");

		cy.get("#carousel6")
			.should("have.prop", "pagesCount", 1);
	});

	it("Event navigate fired when pressing navigation arrows", () => {
		const navigateEventStub = cy.stub().as("myStub");
		cy.mount(
			<Carousel id="carousel8" itemsPerPage="S1 M4 L4 XL4" onNavigate={navigateEventStub}>
				<Button>Button 1</Button>
				<Button>Button 2</Button>
				<Button>Button 3</Button>
				<Button>Button 4</Button>
				<Button>Button 5</Button>
				<Button>Button 6</Button>
				<Button>Button 7</Button>
				<Button>Button 8</Button>
			</Carousel>);

		cy.get("#carousel8")
			.shadow()
			.find("ui5-button[data-ui5-arrow-forward]")
			.should("exist")
			.realClick();
		cy.get("@myStub").should("have.been.calledOnce");

		cy.get("#carousel8")
			.shadow()
			.find("ui5-button[data-ui5-arrow-forward]")
			.should("exist")
			.realClick();
		cy.get("@myStub").should("have.been.calledTwice");

		cy.get("#carousel8")
			.shadow()
			.find("ui5-button[data-ui5-arrow-back]")
			.should("exist")
			.realClick();
		cy.get("@myStub").should("have.been.calledThrice");

		cy.get("#carousel8")
			.shadow()
			.find("ui5-button[data-ui5-arrow-back]")
			.should("exist")
			.realClick();
		cy.get("@myStub").should("have.callCount", 4);

		cy.get("#carousel8").realClick();
		cy.get("#carousel8").realPress("ArrowRight");
		cy.get("@myStub").should("have.callCount", 5);

		cy.get("#carousel8").realPress("ArrowLeft");
		cy.get("@myStub").should("have.callCount", 6);
	});

	it("page-indicator-type property", () => {
		cy.mount(
			<Carousel id="carouselNumericPageIndicator" pageIndicatorType="Numeric">
				<Button>Button 1</Button>
				<Button>Button 2</Button>
			</Carousel>);

		cy.get("#carouselNumericPageIndicator")
			.shadow()
			.find(".ui5-carousel-navigation .ui5-carousel-navigation-text")
			.contains("1 of 2");
	});

	it("hide-page-indicator property", () => {
		cy.mount(
			<Carousel id="carouselHiddenPageIndicator" arrowsPlacement="Navigation" hidePageIndicator>
				<Button>Button 1</Button>
				<Button>Button 2</Button>
				<Button>Button 3</Button>
			</Carousel>);

		cy.get("#carouselHiddenPageIndicator")
			.shadow()
			.find(".ui5-carousel-navigation > *")
			.should('have.length', 0);

	});

	it("navigateTo method and visibleItemsIndices", () => {
		cy.mount(
			<Carousel id="carousel9" itemsPerPage="S1 M2 L2 XL2">
				<Button>Button 1</Button>
				<Button>Button 2</Button>
				<Button>Button 3</Button>
				<Button>Button 4</Button>
				<Button>Button 5</Button>
				<Button>Button 6</Button>
				<Button>Button 7</Button>
				<Button>Button 8</Button>
				<Button>Button 9</Button>
				<Button>Button 10</Button>
			</Carousel>);

		cy.get("#carousel9")
			.invoke("prop", "visibleItemsIndices")
			.should("deep.equal", [0, 1]);

		cy.get<Carousel>("#carousel9").then(($carousel) => {
			$carousel[0].navigateTo(1);
		});

		cy.get("#carousel9")
			.invoke("prop", "visibleItemsIndices")
			.should("deep.equal", [1, 2]);
	});

	it("F7 keyboard navigation", () => {
		cy.mount(
			<Carousel id="carouselF7" itemsPerPage="S3 M3 L3 XL3">
				<Card class="myCard">
					<div>
						Page 1 <br />
						<Button>Button 1</Button>
						<br />
						<Button id="carouselF7Button">Button 2</Button>
						<br />
						<Input></Input>
					</div>
				</Card>
				<Card class="myCard">
					<div>
						Page 2 <br />
						<Button>Button 1</Button>
						<br />
						<Button>Button 2</Button>
						<br />
						<Input></Input>
					</div>
				</Card>
				<Card class="myCard">
					<div>
						Page 3 <br />
						<Button>Button 1</Button>
						<br />
						<Button>Button 2</Button>
						<br />
						<Input id="carouselF7Input"></Input>
					</div>
				</Card>
				<Card class="myCard">
					<div>
						Page 4 <br />
						<Button>Button 1</Button>
						<br />
						<Button>Button 2</Button>
						<br />
						<Input></Input>
					</div>
				</Card>
				<Card class="myCard">
					<div>
						Page 5 <br />
						<Button>Button 1</Button>
						<br />
						<Button>Button 2</Button>
						<br />
						<Input></Input>
					</div>
				</Card>
				<Card class="myCard">
					<div>
						Page 6 <br />
						<Button>Button 1</Button>
						<br />
						<Button>Button 2</Button>
						<br />
						<Input></Input>
					</div>
				</Card>
			</Carousel>);

		cy.get(".myCard").should("be.visible");

		cy.get("#carouselF7Button").realClick();
		cy.get("#carouselF7Button").should('be.focused');

		cy.realPress("F7");
		cy.focused().should("have.class", "ui5-carousel-root");

		cy.realPress("F7");
		cy.focused().should("have.class", "ui5-button-root");

		cy.get("#carouselF7Input").realClick();
		cy.realPress("F7");
		cy.focused().should("have.class", "ui5-carousel-root");

		cy.realPress("F7");
		cy.focused().should("have.class", "ui5-input-inner");

		cy.get("#carouselF7Button").realClick();
		cy.realPress("F7");

		cy.get<Carousel>("#carouselF7").then(($carousel) => {
			$carousel[0].navigateTo(1);
		});
		cy.realPress("F7");
		cy.focused().should("have.class", "ui5-input-inner");
	});

	it("Items per page", () => {
		cy.mount(
			<Carousel
				id="itemsPerPage"
				cyclic
				itemsPerPage="S1 M2 L3 XL4"
				arrowsPlacement="Navigation"
			>
				<span>item 1</span>
				<span>item 2</span>
				<span>item 3</span>
				<span>item 4</span>
				<span>item 5</span>
			</Carousel>);

		cy.viewport(500, 500);
		cy.get("#itemsPerPage")
			.shadow()
			.find(".ui5-carousel-item:nth-child(2)")
			.should("have.class", "ui5-carousel-item--hidden");

		cy.viewport(1000, 500);
		cy.get("#itemsPerPage")
			.shadow()
			.find(".ui5-carousel-item:nth-child(2)")
			.should("not.have.class", "ui5-carousel-item--hidden");

		cy.get("#itemsPerPage")
			.shadow()
			.find(".ui5-carousel-item:nth-child(3)")
			.should("have.class", "ui5-carousel-item--hidden");

		cy.viewport(1240, 500);
		cy.get("#itemsPerPage")
			.shadow()
			.find(".ui5-carousel-item:nth-child(3)")
			.should("not.have.class", "ui5-carousel-item--hidden");

		cy.get("#itemsPerPage")
			.shadow()
			.find(".ui5-carousel-item:nth-child(4)")
			.should("have.class", "ui5-carousel-item--hidden");

		cy.viewport(1540, 500);
		cy.get("#itemsPerPage")
			.shadow()
			.find(".ui5-carousel-item:nth-child(4)")
			.should("not.have.class", "ui5-carousel-item--hidden");

		cy.get("#itemsPerPage")
			.shadow()
			.find(".ui5-carousel-item:nth-child(5)")
			.should("have.class", "ui5-carousel-item--hidden");
	});
});