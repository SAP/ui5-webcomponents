import DynamicPage from "../../src/DynamicPage.js";
import DynamicPageTitle from "../../src/DynamicPageTitle.js";
import DynamicPageHeader from "../../src/DynamicPageHeader.js";
import Bar from "@ui5/webcomponents/dist/Bar.js";
import Button from "@ui5/webcomponents/dist/Button.js";

describe("DynamicPage", () => {
  beforeEach(() => {
    cy.mount(
      <DynamicPage id="test-dynamic-page" style="height: 600px;">
        <DynamicPageTitle slot="titleArea">
          <div slot="heading">Page Title</div>
        </DynamicPageTitle>
        <DynamicPageHeader slot="headerArea">
          <div>Header Content</div>
        </DynamicPageHeader>
        <div style={{ height: "1000px" }}>
          Page content with enough height to enable scrolling
        </div>
      </DynamicPage>
    );
    
    cy.get("#test-dynamic-page").as("dynamicPage");
  });

  it("should unpin the header when snapping after being pinned", () => {
    cy.get("@dynamicPage")
      .invoke("prop", "headerPinned", true);
    
    cy.get("@dynamicPage")
      .invoke("prop", "headerSnapped", true);
    
    cy.get("@dynamicPage")
      .invoke("prop", "headerSnapped", false);
    
    cy.get("@dynamicPage")
      .should("have.prop", "headerPinned", false);
  });

  it("toggles the header-snapped state with 'headerSnapped' property", () => {
    cy.get("@dynamicPage")
      .should("have.prop", "headerSnapped", false);
    
    cy.get("@dynamicPage")
      .shadow()
      .find("slot[name=headerArea]")
      .should("exist");
    
    cy.get("@dynamicPage")
      .invoke("prop", "headerSnapped", true);
    
    cy.get("@dynamicPage")
      .shadow()
      .find("slot[name=headerArea]")
      .should("not.exist");
  });

  it("propagates-down the 'headerSnapped' property", () => {
    cy.get("@dynamicPage")
      .invoke("prop", "headerSnapped", true);
    
    cy.get("@dynamicPage")
      .should("have.prop", "headerSnapped", true);
    
    cy.get("@dynamicPage")
      .shadow()
      .find("ui5-dynamic-page-header-actions")
      .should("have.prop", "snapped", true);
    
    cy.get("[ui5-dynamic-page-title]")
      .should("have.prop", "snapped", true);
    
    cy.get("@dynamicPage")
      .invoke("prop", "headerSnapped", false);
    
    cy.get("@dynamicPage")
      .shadow()
      .find("ui5-dynamic-page-header-actions")
      .should("have.prop", "snapped", false);
    
    cy.get("[ui5-dynamic-page-title]")
      .should("have.prop", "snapped", false);
  });

  it("toggles the header-pinned state with 'headerPinned' property", () => {
    cy.get("@dynamicPage")
      .should("have.prop", "headerPinned", false);
    
    cy.get("@dynamicPage")
      .shadow()
      .find("header.ui5-dynamic-page-title-header-wrapper > slot[name=headerArea]")
      .should("not.exist");
    
    cy.get("@dynamicPage")
      .shadow()
      .find(".ui5-dynamic-page-scroll-container > slot[name=headerArea]")
      .should("exist");
    
    cy.get("@dynamicPage")
      .invoke("prop", "headerPinned", true);
    
    cy.get("@dynamicPage")
      .shadow()
      .find("header.ui5-dynamic-page-title-header-wrapper > slot[name=headerArea]")
      .should("exist");
    
    cy.get("@dynamicPage")
      .shadow()
      .find(".ui5-dynamic-page-scroll-container > slot[name=headerArea]")
      .should("not.exist");
  });

  it("propagates-down the 'headerPinned' property", () => {
    cy.get("@dynamicPage")
      .invoke("prop", "headerPinned", true);
    
    cy.get("@dynamicPage")
      .should("have.prop", "headerPinned", true);
    
    cy.get("@dynamicPage")
      .shadow()
      .find("ui5-dynamic-page-header-actions")
      .should("have.prop", "pinned", true);
    
    cy.get("@dynamicPage")
      .invoke("prop", "headerPinned", false);
    
    cy.get("@dynamicPage")
      .shadow()
      .find("ui5-dynamic-page-header-actions")
      .should("have.prop", "pinned", false);
  });

  it("toggles the pin-button visibility with 'hidePinButton' property", () => {
    cy.get("@dynamicPage")
      .should("have.prop", "hidePinButton", false);
    
    cy.get("@dynamicPage")
      .shadow()
      .find("ui5-dynamic-page-header-actions")
      .should("have.prop", "hidePinButton", false);
    
    cy.get("@dynamicPage")
      .invoke("prop", "hidePinButton", true);
    
    cy.get("@dynamicPage")
      .shadow()
      .find("ui5-dynamic-page-header-actions")
      .should("have.prop", "hidePinButton", true);
  });
});

describe("Scroll", () => {
  beforeEach(() => {
    cy.mount(
      <DynamicPage id="test-dynamic-page" style="height: 600px;">
        <DynamicPageTitle slot="titleArea">
          <div slot="heading">Page Title</div>
        </DynamicPageTitle>
        <DynamicPageHeader slot="headerArea">
          <div>Header Content</div>
        </DynamicPageHeader>
        <div style={{ height: "1000px" }}>
          Page content with enough height to enable scrolling
        </div>
      </DynamicPage>
    );
    
    cy.get("#test-dynamic-page").as("dynamicPage");
  });

  it("snaps the header upon scroll", () => {
    cy.get("@dynamicPage")
      .invoke("prop", "skipSnapOnScroll", false);
    
    cy.get("@dynamicPage")
      .shadow()
      .find(".ui5-dynamic-page-scroll-container")
      .scrollTo(0, 500);
    
    cy.get("@dynamicPage")
      .should("have.prop", "headerSnapped", true);
  });

  it("expands the header upon scroll", () => {
    cy.get("@dynamicPage")
      .invoke("prop", "skipSnapOnScroll", false);
    
    cy.get("@dynamicPage")
      .shadow()
      .find(".ui5-dynamic-page-scroll-container")
      .scrollTo(0, 0);
    
    cy.get("@dynamicPage")
      .should("have.prop", "headerSnapped", false);
    
    cy.get("@dynamicPage")
      .should("have.prop", "headerSnapped", false);
  });
});

describe("Page general interaction", () => {
  beforeEach(() => {
    cy.mount(
      <DynamicPage id="test-dynamic-page" style="height: 600px;" show-footer>
        <DynamicPageTitle slot="titleArea">
          <div slot="heading">Page Title</div>
        </DynamicPageTitle>
        <DynamicPageHeader slot="headerArea">
          <div>Header Content</div>
        </DynamicPageHeader>
        <div style={{ height: "1000px" }}>
          Page content with enough height to enable scrolling
        </div>
        <Bar slot="footerArea" design="FloatingFooter">
          <Button slot="endContent">Save</Button>
          <Button slot="endContent">Close</Button>
        </Bar>
      </DynamicPage>
    );
    
    cy.get("#test-dynamic-page").as("dynamicPage");
  });

  it("toggles the header when scrollTop is between SCROLL_THRESHOLD and headerHeight", () => {
    cy.get("@dynamicPage")
      .shadow()
      .find(".ui5-dynamic-page-scroll-container")
      .invoke("prop", "scrollTop", 20);
  
    cy.get("@dynamicPage")
      .should("have.prop", "headerSnapped", false);
  
    cy.get("@dynamicPage")
      .shadow()
      .find("ui5-dynamic-page-header-actions")
      .shadow()
      .find(".ui5-dynamic-page-header-action")
      .first()
      .click();
  
    cy.get("@dynamicPage")
      .should("have.prop", "headerSnapped", true);
  
    cy.get("@dynamicPage")
      .should("have.prop", "showHeaderInStickArea", true);
  
    cy.get("@dynamicPage")
      .shadow()
      .find("ui5-dynamic-page-header-actions")
      .shadow()
      .find(".ui5-dynamic-page-header-action")
      .first()
      .click();
  
    cy.get("@dynamicPage")
      .should("have.prop", "headerSnapped", false);
  
    cy.get("@dynamicPage")
      .should("have.prop", "showHeaderInStickArea", false);
  
    cy.get("@dynamicPage")
      .shadow()
      .find(".ui5-dynamic-page-scroll-container")
      .invoke("prop", "scrollTop")
      .should("equal", 0);
  });

  it("allows toggle the footer", () => {
    cy.get("@dynamicPage")
      .shadow()
      .find(".ui5-dynamic-page-footer")
      .should("exist");

    cy.get("@dynamicPage")
      .invoke("prop", "showFooter", false);

    cy.get("@dynamicPage")
      .shadow()
      .find(".ui5-dynamic-page-footer")
      .should("not.be.visible");
  });

  it("snaps the header upon pressing the snap button", () => {
    cy.get("@dynamicPage")
      .should("have.prop", "headerSnapped", false);
  
    cy.get("@dynamicPage")
      .shadow()
      .find("ui5-dynamic-page-header-actions")
      .shadow()
      .find(".ui5-dynamic-page-header-action")
      .should("have.length.greaterThan", 0);
  
    cy.get("@dynamicPage")
      .shadow()
      .find("ui5-dynamic-page-header-actions")
      .shadow()
      .find(".ui5-dynamic-page-header-action")
      .first()
      .click();
  
    cy.get("@dynamicPage")
      .should("have.prop", "headerSnapped", true);
  });

  it("expands the header upon pressing the expand button", () => {
    cy.get("@dynamicPage")
      .invoke("prop", "headerSnapped", true);
  
    cy.get("@dynamicPage")
      .should("have.prop", "headerSnapped", true);
  
    cy.get("@dynamicPage")
      .shadow()
      .find("slot[name=headerArea]")
      .should("not.exist");
  
    cy.get("@dynamicPage")
      .shadow()
      .find("ui5-dynamic-page-header-actions")
      .shadow()
      .find(".ui5-dynamic-page-header-action")
      .first()
      .click();
  
    cy.get("@dynamicPage")
      .should("have.prop", "headerSnapped", false);
  
    cy.get("@dynamicPage")
      .shadow()
      .find("slot[name=headerArea]")
      .should("exist");
  });

  it("expands the header in the sticky area", () => {
    cy.get("@dynamicPage")
      .invoke("prop", "headerSnapped", true);
  
    cy.get("@dynamicPage")
      .should("have.prop", "headerInContent", false);
  
    cy.get("@dynamicPage")
      .shadow()
      .find("ui5-dynamic-page-header-actions")
      .shadow()
      .find(".ui5-dynamic-page-header-action")
      .first()
      .click();
  
    cy.get("@dynamicPage")
      .should("have.prop", "headerSnapped", false);
  
    cy.get("@dynamicPage")
      .shadow()
      .find("slot[name=headerArea]")
      .should("exist");
  });

  it("pins the header", () => {
    cy.get("@dynamicPage")
      .shadow()
      .find("ui5-dynamic-page-header-actions")
      .shadow()
      .find(".ui5-dynamic-page-header-action")
      .eq(1)
      .click();
  
    cy.get("@dynamicPage")
      .should("have.prop", "headerPinned", true);
  
    cy.get("@dynamicPage")
      .should("have.prop", "headerSnapped", false);
  });

  it("keeps the pinned header expanded during scroll", () => {
    cy.get("@dynamicPage")
      .invoke("prop", "headerPinned", true);
  
    cy.get("@dynamicPage")
      .shadow()
      .find(".ui5-dynamic-page-scroll-container")
      .scrollTo(0, 500);
  
    cy.get("@dynamicPage")
      .should("have.prop", "headerPinned", true);
  
    cy.get("@dynamicPage")
      .should("have.prop", "headerSnapped", false);
  
    cy.get("@dynamicPage")
      .shadow()
      .find(".ui5-dynamic-page-scroll-container")
      .invoke("prop", "scrollTop")
      .should("equal", 500);
  });

  it("unpins the header upon press of snap button", () => {
    cy.get("@dynamicPage")
      .invoke("prop", "headerPinned", true);
  
    cy.get("@dynamicPage")
      .shadow()
      .find("ui5-dynamic-page-header-actions")
      .shadow()
      .find(".ui5-dynamic-page-header-action")
      .first()
      .click();
  
    cy.get("@dynamicPage")
      .should("have.prop", "headerSnapped", true);
  
    cy.get("@dynamicPage")
      .should("have.prop", "headerPinned", false);
  });

  it("expands the title with click", () => {
    cy.get("@dynamicPage")
      .invoke("prop", "headerSnapped", true);
  
    cy.get("@dynamicPage")
      .should("have.prop", "headerSnapped", true);
  
    cy.get("[ui5-dynamic-page-title]").click();
  
    cy.get("@dynamicPage")
      .should("have.prop", "headerSnapped", false);
  });

  it("snaps the title with click", () => {
    cy.get("@dynamicPage")
      .invoke("prop", "headerSnapped", false);
  
    cy.get("[ui5-dynamic-page-title]")
      .shadow()
      .find(".ui5-dynamic-page-title-focus-area")
      .click(50, 50);
  
    cy.get("@dynamicPage")
      .should("have.prop", "headerSnapped", true);
  });

  it("expands the title using keyboard", () => {
    cy.get("@dynamicPage")
      .invoke("prop", "headerSnapped", true);
  
    cy.get("@dynamicPage")
      .should("have.prop", "headerSnapped", true);
  
    cy.get("[ui5-dynamic-page-title]")
      .shadow()
      .find(".ui5-dynamic-page-title-focus-area")
      .focus()
      .realPress('Enter');
  
    cy.get("@dynamicPage")
      .should("have.prop", "headerSnapped", false);
  });

  it("snaps the title using keyboard", () => {
    cy.get("@dynamicPage")
      .invoke("prop", "headerSnapped", false);
  
    cy.get("@dynamicPage")
      .should("have.prop", "headerSnapped", false);
  
    cy.get("[ui5-dynamic-page-title]")
      .shadow()
      .find(".ui5-dynamic-page-title-focus-area")
      .focus()
      .realPress('Enter');
  
    cy.get("@dynamicPage")
      .should("have.prop", "headerSnapped", true);
  });
});

describe("Page layout when content has 100% height", () => {
  beforeEach(() => {
    cy.mount(
      <DynamicPage id="test-dynamic-page" style="height: 600px;" show-footer>
        <DynamicPageTitle slot="titleArea">
          <div slot="heading">Page Title</div>
        </DynamicPageTitle>
        <DynamicPageHeader slot="headerArea">
          <div>Header Content</div>
        </DynamicPageHeader>
        <div id="content" style={{ height: "100%", backgroundColor: "#e0e0e0" }}>
          Content with 100% height
        </div>
        <Bar id="footer" slot="footerArea" design="FloatingFooter">
          <button slot="endContent">Save</button>
          <button slot="endContent">Close</button>
        </Bar>
      </DynamicPage>
    );
    
    cy.get("#test-dynamic-page").as("dynamicPage");
  });

  it("footer does not hide the content", () => {
    cy.get("@dynamicPage")
      .should("have.prop", "showFooter", true);

    cy.get("#content")
      .then(($content) => {
        const contentBottom = $content[0].getBoundingClientRect().bottom;
        
        cy.get("#footer")
          .then(($footer) => {
            const footerTop = $footer[0].getBoundingClientRect().top;
            
            expect(contentBottom).to.be.at.most(footerTop);
          });
      });
  });

  it("content expands to fill the space between header and footer", () => {
    cy.get("@dynamicPage")
      .should("have.prop", "showFooter", true);
  
    cy.get("[ui5-dynamic-page-header]")
      .then(($header) => {
        const headerBottom = $header[0].getBoundingClientRect().bottom;
        
        cy.get("@dynamicPage")
          .shadow()
          .find(".ui5-dynamic-page-spacer")
          .then(($footerSpacer) => {
            const footerTop = $footerSpacer[0].getBoundingClientRect().top;
            
            cy.get("@dynamicPage")
              .shadow()
              .find(".ui5-dynamic-page-fit-content")
              .then(($content) => {
                const contentTop = $content[0].getBoundingClientRect().top;
                const contentBottom = $content[0].getBoundingClientRect().bottom;
                
                expect(contentTop).to.equal(headerBottom);
                expect(contentBottom).to.equal(footerTop);
              });
          });
      });
  });
});

describe("Page layout when content overflows", () => {
  beforeEach(() => {
    cy.mount(
      <DynamicPage id="test-dynamic-page" style="height: 700px;" show-footer>
        <DynamicPageTitle slot="titleArea">
          <div slot="heading">Page Title</div>
        </DynamicPageTitle>
        <DynamicPageHeader slot="headerArea">
          <div>Header Content</div>
        </DynamicPageHeader>
        <div id="col1list" style={{ height: "1500px", backgroundColor: "#f0f0f0" }}>
          Very tall content that overflows and requires scrolling
        </div>
        <Bar id="footer" slot="footerArea" design="FloatingFooter">
          <button slot="endContent">Save</button>
          <button slot="endContent">Close</button>
        </Bar>
      </DynamicPage>
    );
    
    cy.get("#test-dynamic-page").as("dynamicPage");
  });

  it("footer does not hide the content", () => {
    cy.get("@dynamicPage")
      .should("have.prop", "showFooter", true);

    cy.get("@dynamicPage")
      .shadow()
      .find(".ui5-dynamic-page-scroll-container")
      .scrollTo(0, 500);

    cy.get("#col1list").should("be.visible");
    
    cy.get("@dynamicPage")
      .shadow()
      .find(".ui5-dynamic-page-scroll-container")
      .invoke("prop", "scrollTop")
      .should("be.greaterThan", 0);

    cy.get("#footer").should("be.visible");
  });
});

describe("ARIA attributes", () => {
  beforeEach(() => {
    cy.mount(
      <DynamicPage style={{ height: "600px" }}>
        <DynamicPageTitle slot="titleArea">
          <div slot="heading">Page Title</div>
        </DynamicPageTitle>
        <DynamicPageHeader slot="headerArea">
          <div>Header Content</div>
        </DynamicPageHeader>
        <div style={{ height: "1000px" }}>
          Page content with enough height to enable scrolling
        </div>
      </DynamicPage>
    );
  });

  it("sets expanded state attributes", () => {
    cy.get("[ui5-dynamic-page]")
      .should("have.prop", "headerSnapped", false);

    cy.get("[ui5-dynamic-page]")
      .shadow()
      .find(".ui5-dynamic-page-title-header-wrapper")
      .should("have.attr", "aria-label", "Header Expanded");

    cy.get("[ui5-dynamic-page-header]")
      .shadow()
      .find(".ui5-dynamic-page-header-root")
      .should("have.attr", "role", "region");

    cy.get("[ui5-dynamic-page-title]")
      .shadow()
      .find(".ui5-dynamic-page-title-focus-area")
      .should("have.attr", "aria-expanded", "true")
      .should("have.attr", "role", "button");

    cy.get("[ui5-dynamic-page-title]")
      .should("have.prop", "__id")
      .then((titleId) => {
        cy.get("[ui5-dynamic-page-title]")
          .shadow()
          .find(".ui5-dynamic-page-title-focus-area")
          .should("have.attr", "aria-describedby", `${titleId}-toggle-description`);
      });

    cy.get("[ui5-dynamic-page]")
      .shadow()
      .find("ui5-dynamic-page-header-actions")
      .shadow()
      .find("ui5-button.ui5-dynamic-page-header-action-expand")
      .should("have.prop", "accessibleName", "Snap Header")
      .should("have.prop", "tooltip", "Snap Header");

    cy.get("[ui5-dynamic-page]")
      .shadow()
      .find("ui5-dynamic-page-header-actions")
      .shadow()
      .find("ui5-toggle-button.ui5-dynamic-page-header-action-pin")
      .should("have.prop", "accessibleName", "Pin Header")
      .should("have.prop", "tooltip", "Pin Header");
  });

  it("sets snapped state attributes", () => {
    cy.get("[ui5-dynamic-page]")
      .invoke("prop", "headerSnapped", true);

    cy.get("[ui5-dynamic-page]")
      .shadow()
      .find(".ui5-dynamic-page-title-header-wrapper")
      .should("have.attr", "aria-label", "Header Snapped");

    cy.get("[ui5-dynamic-page-title]")
      .shadow()
      .find(".ui5-dynamic-page-title-focus-area")
      .should("have.attr", "aria-expanded", "false")
      .should("have.attr", "role", "button");

    cy.get("[ui5-dynamic-page-title]")
      .should("have.prop", "__id")
      .then((titleId) => {
        cy.get("[ui5-dynamic-page-title]")
          .shadow()
          .find(".ui5-dynamic-page-title-focus-area")
          .should("have.attr", "aria-describedby", `${titleId}-toggle-description`);
      });

    cy.get("[ui5-dynamic-page]")
      .shadow()
      .find("ui5-dynamic-page-header-actions")
      .shadow()
      .find("ui5-button")
      .should("exist")
      .should("have.prop", "accessibleName", "Expand Header")
      .should("have.prop", "tooltip", "Expand Header");
  });
});