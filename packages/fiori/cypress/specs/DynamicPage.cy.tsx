import DynamicPage from "../../src/DynamicPage.js";
import DynamicPageTitle from "../../src/DynamicPageTitle.js";
import DynamicPageHeader from "../../src/DynamicPageHeader.js";

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
      .invoke("prop", "headerPinned")
      .should("be.false");
  });

  it("should show correct tooltip for pin button based on pinned state", () => {
    // Initially the header should not be pinned, so tooltip should be "Pin Header"
    cy.get("@dynamicPage")
      .shadow()
      .find("ui5-dynamic-page-header-actions")
      .shadow()
      .find(".ui5-dynamic-page-header-action-pin")
      .should("have.attr", "tooltip", "Pin Header");

    // Pin the header
    cy.get("@dynamicPage")
      .invoke("prop", "headerPinned", true);

    // After pinning, tooltip should change to "Unpin Header"
    cy.get("@dynamicPage")
      .shadow()
      .find("ui5-dynamic-page-header-actions")
      .shadow()
      .find(".ui5-dynamic-page-header-action-pin")
      .should("have.attr", "tooltip", "Unpin Header");

    // Unpin the header
    cy.get("@dynamicPage")
      .invoke("prop", "headerPinned", false);

    // After unpinning, tooltip should change back to "Pin Header"
    cy.get("@dynamicPage")
      .shadow()
      .find("ui5-dynamic-page-header-actions")
      .shadow()
      .find(".ui5-dynamic-page-header-action-pin")
      .should("have.attr", "tooltip", "Pin Header");
  });
});