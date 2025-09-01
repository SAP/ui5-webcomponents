import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import AITextArea from "../../src/AITextArea.js";
import Menu from "@ui5/webcomponents/dist/Menu.js";
import MenuItem from "@ui5/webcomponents/dist/MenuItem.js";
describe("Initialization", () => {
    it("should render with Initial properties", () => {
        cy.mount(_jsx(AITextArea, {}));
        cy.get("[ui5-ai-textarea]")
            .as("textarea")
            .should("exist")
            .should("have.prop", "assistantState", "Initial")
            .should("have.prop", "actionText", "")
            .should("have.prop", "currentVersionIndex", 1)
            .should("have.prop", "totalVersions", 0);
        cy.get("@textarea")
            .shadow()
            .find("[sap-ai-rich-text-editor-toolbar]")
            .as("toolbar")
            .should("exist");
    });
    it("should set initial value as a property", () => {
        cy.mount(_jsx(AITextArea, { value: "AI initial value" }));
        cy.get("[ui5-ai-textarea]")
            .as("textarea")
            .should("have.prop", "value", "AI initial value");
    });
});
describe("Assistant States", () => {
    it("should display Initial state correctly", () => {
        cy.mount(_jsx(AITextArea, { assistantState: "Initial" }));
        cy.get("[ui5-ai-textarea]")
            .as("textarea")
            .shadow()
            .find("[sap-ai-rich-text-editor-toolbar]")
            .as("toolbar")
            .should("have.prop", "assistantState", "Initial");
    });
    it("should display Loading state correctly", () => {
        cy.mount(_jsx(AITextArea, { assistantState: "Loading", actionText: "Generating content..." }));
        cy.get("[ui5-ai-textarea]")
            .as("textarea")
            .shadow()
            .find("[sap-ai-rich-text-editor-toolbar]")
            .as("toolbar")
            .should("have.prop", "assistantState", "Loading")
            .should("have.prop", "actionText", "Generating content...");
    });
    it("should display SingleResult state correctly", () => {
        cy.mount(_jsx(AITextArea, { assistantState: "SingleResult", actionText: "Generated text", currentVersionIndex: 1, totalVersions: 1 }));
        cy.get("[ui5-ai-textarea]")
            .as("textarea")
            .shadow()
            .find("[sap-ai-rich-text-editor-toolbar]")
            .as("toolbar")
            .should("have.prop", "assistantState", "SingleResult")
            .should("have.prop", "actionText", "Generated text")
            .should("have.prop", "currentVersionIndex", 1)
            .should("have.prop", "totalVersions", 1);
    });
    it("should display MultipleResults state correctly", () => {
        cy.mount(_jsx(AITextArea, { assistantState: "MultipleResults", actionText: "Generated text", currentVersionIndex: 2, totalVersions: 3 }));
        cy.get("[ui5-ai-textarea]")
            .as("textarea")
            .shadow()
            .find("[sap-ai-rich-text-editor-toolbar]")
            .as("toolbar")
            .should("have.prop", "assistantState", "MultipleResults")
            .should("have.prop", "actionText", "Generated text")
            .should("have.prop", "currentVersionIndex", 2)
            .should("have.prop", "totalVersions", 3);
    });
});
describe("Version Navigation", () => {
    it("should fire previous-version-click event with proper event details", () => {
        let eventDetail = null;
        cy.mount(_jsx(AITextArea, { assistantState: "MultipleResults", currentVersionIndex: 2, totalVersions: 3, onPreviousVersionClick: (e) => { eventDetail = e.detail; } }));
        cy.get("[ui5-ai-textarea]")
            .as("textarea")
            .shadow()
            .find("[sap-ai-rich-text-editor-toolbar]")
            .as("toolbar")
            .shadow()
            .find("[sap-writing-assistant-versioning]")
            .as("versioning");
        cy.get("@versioning")
            .shadow()
            .find('[data-ui5-versioning-button="previous"]')
            .should("not.be.disabled")
            .realClick();
        cy.wrap(null).should(() => {
            expect(eventDetail).to.not.be.null;
            expect(eventDetail.currentIndex).to.eq(2);
            expect(eventDetail.totalVersions).to.eq(3);
        });
    });
    it("should fire next-version-click event with proper event details", () => {
        let eventDetail = null;
        cy.mount(_jsx(AITextArea, { assistantState: "MultipleResults", currentVersionIndex: 1, totalVersions: 3, onNextVersionClick: (e) => { eventDetail = e.detail; } }));
        cy.get("[ui5-ai-textarea]")
            .as("textarea")
            .shadow()
            .find("[sap-ai-rich-text-editor-toolbar]")
            .as("toolbar")
            .shadow()
            .find("[sap-writing-assistant-versioning]")
            .as("versioning");
        cy.get("@versioning")
            .shadow()
            .find('[data-ui5-versioning-button="next"]')
            .should("not.be.disabled")
            .realClick();
        cy.wrap(null).should(() => {
            expect(eventDetail).to.not.be.null;
            expect(eventDetail.currentIndex).to.eq(1);
            expect(eventDetail.totalVersions).to.eq(3);
        });
    });
    it("should disable previous button when at first version", () => {
        cy.mount(_jsx(AITextArea, { assistantState: "MultipleResults", currentVersionIndex: 1, totalVersions: 3 }));
        cy.get("[ui5-ai-textarea]")
            .shadow()
            .find("[sap-ai-rich-text-editor-toolbar]")
            .shadow()
            .find("[sap-writing-assistant-versioning]")
            .shadow()
            .find('[data-ui5-versioning-button="previous"]')
            .should("be.disabled");
    });
    it("should disable next button when at last version", () => {
        cy.mount(_jsx(AITextArea, { assistantState: "MultipleResults", currentVersionIndex: 3, totalVersions: 3 }));
        cy.get("[ui5-ai-textarea]")
            .shadow()
            .find("[sap-ai-rich-text-editor-toolbar]")
            .shadow()
            .find("[sap-writing-assistant-versioning]")
            .shadow()
            .find('[data-ui5-versioning-button="next"]')
            .should("be.disabled");
    });
    it("should sync textarea content after version navigation", () => {
        const initialValue = "Version 1 content";
        const newValue = "Version 2 content";
        cy.mount(_jsx(AITextArea, { value: initialValue, assistantState: "MultipleResults", currentVersionIndex: 1, totalVersions: 2 }));
        cy.get("[ui5-ai-textarea]")
            .as("textarea")
            .then(($el) => {
            $el[0].value = newValue;
        });
        cy.get("@textarea")
            .shadow()
            .find("[sap-ai-rich-text-editor-toolbar]")
            .as("toolbar")
            .shadow()
            .find("[sap-writing-assistant-versioning]")
            .as("versioning")
            .shadow()
            .find('[data-ui5-versioning-button="next"]')
            .realClick();
        cy.wait(100);
        cy.get("@textarea")
            .shadow()
            .find("textarea")
            .should("have.value", newValue);
    });
});
describe("Menu Integration", () => {
    it("should handle menu slot correctly", () => {
        cy.mount(_jsx(AITextArea, { children: _jsx(Menu, { slot: "menu", id: "test-menu", children: _jsx(MenuItem, { text: "Generate text" }) }) }));
        cy.get("[ui5-ai-textarea]")
            .as("textarea")
            .find("ui5-menu[slot='menu']")
            .should("exist");
    });
    it("should open menu when generate button is clicked", () => {
        let menuOpened = false;
        cy.mount(_jsx(AITextArea, { children: _jsx(Menu, { slot: "menu", id: "test-menu", onOpen: () => { menuOpened = true; }, children: _jsx(MenuItem, { text: "Generate text" }) }) }));
        cy.get("[ui5-ai-textarea]")
            .as("textarea")
            .shadow()
            .find("[sap-ai-rich-text-editor-toolbar]")
            .as("toolbar")
            .shadow()
            .find("#ai-menu-btn")
            .as("menuButton")
            .realClick();
        cy.wrap(null).should(() => {
            expect(menuOpened).to.be.true;
        });
    });
});
describe("Stop Generation", () => {
    it("should fire stop-generation event", () => {
        let stopEventFired = false;
        cy.mount(_jsx(AITextArea, { assistantState: "Loading", onStopGeneration: () => { stopEventFired = true; } }));
        cy.get("[ui5-ai-textarea]")
            .as("textarea")
            .shadow()
            .find("[sap-ai-rich-text-editor-toolbar]")
            .as("toolbar")
            .shadow()
            .find("#ai-menu-btn")
            .as("menuButton")
            .realClick();
        cy.wrap(null).should(() => {
            expect(stopEventFired).to.be.true;
        });
    });
});
describe("Keyboard Shortcuts", () => {
    it("should handle Shift+F4 to focus AI button", () => {
        cy.mount(_jsx(AITextArea, {}));
        cy.get("[ui5-ai-textarea]")
            .as("textarea")
            .shadow()
            .find("textarea")
            .focus()
            .realPress(['Shift', 'F4']);
        cy.get("@textarea")
            .shadow()
            .find("[sap-ai-rich-text-editor-toolbar]")
            .as("toolbar")
            .shadow()
            .find("#ai-menu-btn")
            .as("menuButton")
            .should("be.focused");
    });
    it("should handle Ctrl+Shift+Z for previous version in MultipleResults state", () => {
        let previousVersionClicked = false;
        cy.mount(_jsx(AITextArea, { assistantState: "MultipleResults", currentVersionIndex: 2, totalVersions: 3, onPreviousVersionClick: () => { previousVersionClicked = true; } }));
        cy.get("[ui5-ai-textarea]")
            .as("textarea")
            .shadow()
            .find("textarea")
            .focus()
            .realPress(['Control', 'Shift', 'z']);
        cy.wrap(null).should(() => {
            expect(previousVersionClicked).to.be.true;
        });
    });
    it("should handle Ctrl+Shift+Y for next version in MultipleResults state", () => {
        let nextVersionClicked = false;
        cy.mount(_jsx(AITextArea, { assistantState: "MultipleResults", currentVersionIndex: 1, totalVersions: 3, onNextVersionClick: () => { nextVersionClicked = true; } }));
        cy.get("[ui5-ai-textarea]")
            .as("textarea")
            .shadow()
            .find("textarea")
            .focus()
            .realPress(['Control', 'Shift', 'y']);
        cy.wrap(null).should(() => {
            expect(nextVersionClicked).to.be.true;
        });
    });
});
describe("TextArea Integration", () => {
    it("should inherit TextArea functionality", () => {
        cy.mount(_jsx(AITextArea, { value: "Test content" }));
        cy.get("[ui5-ai-textarea]")
            .as("textarea")
            .shadow()
            .find("textarea")
            .should("have.value", "Test content")
            .type(" additional text");
        cy.get("@textarea")
            .should("have.prop", "value")
            .and("include", "Test content")
            .and("include", "additional text");
    });
    it("should support readonly mode", () => {
        cy.mount(_jsx(AITextArea, { value: "Readonly content", readonly: true }));
        cy.get("[ui5-ai-textarea]")
            .as("textarea")
            .should("have.attr", "readonly");
        cy.get("@textarea")
            .shadow()
            .find("textarea")
            .should("have.attr", "readonly")
            .should("have.value", "Readonly content");
    });
    it("should support disabled mode", () => {
        cy.mount(_jsx(AITextArea, { value: "Disabled content", disabled: true }));
        cy.get("[ui5-ai-textarea]")
            .as("textarea")
            .should("have.attr", "disabled");
        cy.get("@textarea")
            .shadow()
            .find("textarea")
            .should("have.attr", "disabled")
            .should("have.value", "Disabled content");
    });
});
describe("Event Handling", () => {
    it("should handle input events", () => {
        let inputCount = 0;
        cy.mount(_jsx(AITextArea, { onInput: () => { inputCount++; } }));
        cy.get("[ui5-ai-textarea]")
            .shadow()
            .find("textarea")
            .type("Hello");
        cy.wrap(null).should(() => {
            expect(inputCount).to.eq(5);
        });
    });
    it("should handle change events", () => {
        let changeEventDetail = null;
        cy.mount(_jsx(AITextArea, { onChange: (e) => { changeEventDetail = e.detail; } }));
        cy.get("[ui5-ai-textarea]")
            .shadow()
            .find("textarea")
            .type("test")
            .blur();
        cy.wrap(null).should(() => {
            expect(changeEventDetail?.value).to.include("test");
        });
    });
});
describe("Busy State", () => {
    it("should show busy indicator when in Loading state", () => {
        cy.mount(_jsx(AITextArea, { assistantState: "Loading" }));
        cy.get("[ui5-ai-textarea]")
            .shadow()
            .find("ui5-busy-indicator")
            .should("have.attr", "active");
    });
    it("should hide busy indicator when not in Loading state", () => {
        cy.mount(_jsx(AITextArea, { assistantState: "Initial" }));
        cy.get("[ui5-ai-textarea]")
            .shadow()
            .find("ui5-busy-indicator")
            .should("not.have.attr", "active");
    });
});
describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
        cy.mount(_jsx(AITextArea, { ariaLabel: "AI-powered textarea" }));
        cy.get("[ui5-ai-textarea]")
            .shadow()
            .find("textarea")
            .should("have.attr", "aria-label", "AI-powered textarea");
    });
    it("should support required attribute", () => {
        cy.mount(_jsx(AITextArea, { required: true }));
        cy.get("[ui5-ai-textarea]")
            .shadow()
            .find("textarea")
            .should("have.attr", "aria-required", "true");
    });
});
describe("Error Handling", () => {
    it("should handle invalid assistant state gracefully", () => {
        cy.mount(_jsx(AITextArea, { assistantState: "InvalidState" }));
        cy.get("[ui5-ai-textarea]")
            .should("exist");
        cy.get("[ui5-ai-textarea]")
            .shadow()
            .find("[sap-ai-rich-text-editor-toolbar]")
            .should("exist");
    });
    it("should handle invalid version indices gracefully", () => {
        cy.mount(_jsx(AITextArea, { assistantState: "MultipleResults", currentVersionIndex: -1, totalVersions: 3 }));
        cy.get("[ui5-ai-textarea]")
            .should("exist");
        cy.get("[ui5-ai-textarea]")
            .shadow()
            .find("[sap-ai-rich-text-editor-toolbar]")
            .should("exist");
    });
});
//# sourceMappingURL=AITextArea.cy.js.map