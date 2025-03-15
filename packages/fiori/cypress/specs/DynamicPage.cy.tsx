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
});