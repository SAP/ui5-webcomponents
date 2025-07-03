import "../../src/AINoticeIndicator.js";
import AINoticeIndicator from "../../src/AINoticeIndicator.js";
import Popover from "../../src/Popover.js";

const linkText = "Created by AI";
const labelText = "Verify results before use.";

describe("Rendering and iteraction", () => {
    it("Should display IconOnly mode if attributionText and verificationText are not set", () => {
        cy.mount(<AINoticeIndicator></AINoticeIndicator>)

        cy.get("[ui5-ai-notice-indicator]").shadow().as("aiNoticeShadow");

        cy.get("@aiNoticeShadow")
            .find("[ui5-button]")
            .should("exist");

        cy.get("@aiNoticeShadow")
            .find("[ui5-link]")
            .should("not.exist");


        cy.get("@aiNoticeShadow")
            .find("[ui5-label]")
            .should("not.exist");
    });

    it("Should display link and label in Default mode", () => {
        cy.mount(<AINoticeIndicator attributionText={linkText} verificationText={labelText}></AINoticeIndicator>)

        cy.get("[ui5-ai-notice-indicator]").shadow().as("aiNoticeShadow");

        cy.get("@aiNoticeShadow")
            .find("[ui5-button]")
            .should("not.exist");

        cy.get("@aiNoticeShadow")
            .find("[ui5-link]")
            .contains(linkText)
            .should("exist");


        cy.get("@aiNoticeShadow")
            .find("[ui5-label]")
            .contains(labelText)
            .should("exist");
    });

    it("Should display button only in IconOnly mode", () => {
        cy.mount(<AINoticeIndicator attributionText={linkText} verificationText={labelText} displayMode="IconOnly"></AINoticeIndicator>)

        cy.get("[ui5-ai-notice-indicator]").shadow().as("aiNoticeShadow");

        cy.get("@aiNoticeShadow")
            .find("[ui5-button]")
            .should("exist");

        cy.get("@aiNoticeShadow")
            .find("[ui5-link]")
            .should("not.exist");


        cy.get("@aiNoticeShadow")
            .find("[ui5-label]")
            .should("not.exist");
    });

    it("Should display link only in Shortened mode", () => {
        cy.mount(<AINoticeIndicator attributionText={linkText} verificationText={labelText} displayMode="Shortened"></AINoticeIndicator>)

        cy.get("[ui5-ai-notice-indicator]").shadow().as("aiNoticeShadow");

        cy.get("@aiNoticeShadow")
            .find("[ui5-button]")
            .should("not.exist");

        cy.get("@aiNoticeShadow")
            .find("[ui5-link]")
            .contains(linkText)
            .should("exist");


        cy.get("@aiNoticeShadow")
            .find("[ui5-label]")
            .should("not.exist");
    });

    it("Should display button, linke and label in Emphasized mode", () => {
        cy.mount(<AINoticeIndicator attributionText={linkText} verificationText={labelText} displayMode="Emphasized"></AINoticeIndicator>)

        cy.get("[ui5-ai-notice-indicator]").shadow().as("aiNoticeShadow");

        cy.get("@aiNoticeShadow")
            .find("[ui5-button]")
            .should("exist");

        cy.get("@aiNoticeShadow")
            .find("[ui5-link]")
            .contains(linkText)
            .should("exist");


        cy.get("@aiNoticeShadow")
            .find("[ui5-label]")
            .contains(labelText)
            .should("exist");
    });

    it("Should render popover in slot", () => {
        cy.mount(
            <AINoticeIndicator attributionText={linkText} verificationText={labelText}>
                <Popover>This is popover content.</Popover>
            </AINoticeIndicator>
        )

        cy.get("ui5-ai-notice-indicator").find('[ui5-popover]').should("exist");
    });
});

describe("Responsive behaviour", () => {
    it("Should hide label in smaller containers", () => {
        cy.mount(
            <div style={{ width: "300px" }} id="test-container">
                <AINoticeIndicator
                    attributionText={linkText}
                    verificationText={labelText}>
                </AINoticeIndicator>
            </div>)

        cy.get("[ui5-ai-notice-indicator]").shadow().as("aiNoticeShadow");

        // Ensure everything renders
        cy.get("@aiNoticeShadow").find("[ui5-link]").should("exist");
        cy.get("@aiNoticeShadow").find("[ui5-label]").should("exist").and("be.visible");

        // Resize container to small width
        cy.get("#test-container").invoke("css", "width", "50px");

        cy.wait(200); // Give ResizeObserver time to react

        cy.get("@aiNoticeShadow").find("[ui5-label]").should("not.be.visible");
    });
});