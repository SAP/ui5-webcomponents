import TimePickerClock from "../../src/TimePickerClock.js";
import { setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import type ResponsivePopover from "../../src/ResponsivePopover.js";

describe("Clock API", () => {
    it("regular clocks", () => {
        cy.mount(<TimePickerClock id="myHours12" label="myHours12" itemMin={1} itemMax={12} displayStep={1} selectedValue={12} active/>);
        cy.get("#myHours12").shadow().find(".ui5-tp-clock-cover").as("enabled");

        cy.get("@enabled").click(45, -110);
        cy.wait(500);
        cy.get("#myHours12").should("have.prop", "selectedValue", 1);
    });

    it("disabled property", () => {
        cy.mount(<TimePickerClock id="myHours12Disabled" itemMin={1} itemMax={12} displayStep={1} selectedValue={12} active disabled/>);
        cy.get("#myHours12Disabled").shadow().find(".ui5-tp-clock-cover").as("disabled");
  
        cy.get("@disabled").click(45, -110);
        cy.wait(500);
        cy.get("#myHours12Disabled").should("have.prop", "selectedValue", 12);
    });
  
    it("'active' property", () => {
        cy.get("#myMinutes").shadow().find(".ui5-tp-clock").should("have.css", "display", "block");
        cy.get("#myMinutesInactive")
            .shadow()
            .find(".ui5-tp-clock")
            .should("have.css", "display", "none");
    });
  
    it("'displayStep' and 'valueStep' properties", () => {
        const getNumbers = (selector: string) =>
            cy.get(selector).shadow().find(".ui5-tp-clock-number");
    
        getNumbers("#myHours12").its("length").should("equal", 12);
        getNumbers("#myMinutes").its("length").should("equal", 12);
        getNumbers("#myMinutes10").its("length").should("equal", 6);
    });
  
    it("'lastItemReplacement' and 'prependZero' properties", () => {
        cy.get("#myHours24")
            .shadow()
            .find(".ui5-tp-clock-number")
            .last()
            .should("have.text", "0");
    
        cy.get("#myMinutes")
            .shadow()
            .find(".ui5-tp-clock-number")
            .last()
            .should("have.text", "0");
    });
  });
  
  describe("Clock item selection", () => {
    beforeEach(() => {
      cy.visit("test/pages/TimePickerClock.html");
    });
  
    it("select clock item and 'change' event", () => {
      cy.get("#myHours12").shadow().find(".ui5-tp-clock-cover").as("h12");
      cy.get("#myHours24").shadow().find(".ui5-tp-clock-cover").as("h24");
      cy.get("#clockChangeValue").as("valueInput");
      cy.get("#clockChangeEvent").as("countInput");
  
      cy.get("@h12").click(50, -100);
      cy.wait(500);
      cy.get("#myHours12").should("have.prop", "selectedValue", 1);
      cy.get("@valueInput").should("have.value", "1");
      cy.get("@countInput").should("have.value", "2");
  
      cy.get("@h12").click(0, -110);
      cy.wait(500);
      cy.get("#myHours12").should("have.prop", "selectedValue", 12);
      cy.get("@valueInput").should("have.value", "12");
      cy.get("@countInput").should("have.value", "3");
  
      cy.get("@h24").click(-55, -105);
      cy.wait(500);
      cy.get("#myHours24").should("have.prop", "selectedValue", 22);
      cy.get("@valueInput").should("have.value", "22");
      cy.get("@countInput").should("have.value", "4");
  
      cy.get("@h24").click(-40, -60);
      cy.wait(500);
      cy.get("#myHours24").should("have.prop", "selectedValue", 22);
      cy.get("@valueInput").should("have.value", "22");
      cy.get("@countInput").should("have.value", "4");
    });
  });
  