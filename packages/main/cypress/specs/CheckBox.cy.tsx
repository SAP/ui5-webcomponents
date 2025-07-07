import CheckBox from "../../src/CheckBox.js";
import Input from "../../src/Input.js";
import Title from "../../src/Title.js";
import Button from "../../src/Button.js";

describe('CheckBox Component', () => {
	it('should have correct type and value attributes in shadow dom', () => {
		cy.mount(<CheckBox value="testValue" />);
		cy.get("[ui5-checkbox]")
			.shadow()
			.find('[type="checkbox"]')
			.should('have.attr', 'value', 'testValue');
	});

	it('should omit value attribute in shadow dom when checkbox has default value', () => {
		cy.mount(<CheckBox />);
		cy.get("[ui5-checkbox]")
			.shadow()
			.find('[type="checkbox"]')
			.should('not.have.attr', 'value');
	});

});

describe("CheckBox general interaction", () => {
	it("tests checked default value is false", () => {
        cy.mount(
			<CheckBox id="cb1" text="Long long long text"></CheckBox>
		);

		cy.get("#cb1")
			.should("have.prop", "checked", false);
	});

    it("tests change event", () => {
        cy.mount(
            <div>
                <CheckBox id="cb1" text="Long long long text"></CheckBox>
                <Input id="field"></Input>
            </div>
        );
    
        let counter = 0;
        cy.get("#cb1").then(($checkbox) => {
            $checkbox[0].addEventListener("ui5-change", function() {
                counter += 1;
                (document.getElementById("field") as HTMLInputElement).value = `${counter}`;
            });
        });
    
        cy.get("#cb1").realClick();
        cy.get("#cb1").realPress("Space");
        cy.get("#cb1").realPress("Enter");
    
        cy.get("#field")
            .should("have.value", "3");
    });

    it("tests readonly space and enter keys active state", () => {
        cy.mount(
            <CheckBox id="cbReadonly" readonly text="Option"></CheckBox>
        );
    
        cy.get("#cbReadonly").realClick();
    
        cy.get("#cbReadonly").realPress("Space");
        cy.get("#cbReadonly")
            .should("not.have.attr", "active");
    
        cy.get("#cbReadonly").realPress("Enter");
        cy.get("#cbReadonly")
            .should("not.have.attr", "active");
    });

    it("tests change event not fired, when disabled", () => {
        cy.mount(
            <div>
                <CheckBox id="cb2" disabled></CheckBox>
                <Input id="field" value="3"></Input>
            </div>
        );
    
        let counter = 3;
        cy.get("#cb2").then(($checkbox) => {
            $checkbox[0].addEventListener("ui5-change", function() {
                counter += 1;
                (document.getElementById("field") as HTMLInputElement).value = `${counter}`;
            });
        });
    
        cy.get("#cb2").realClick();
        cy.get("#cb2").realPress("Space");
        cy.get("#cb2").realPress("Enter");
    
        cy.get("#field")
            .should("have.value", "3");
    });
    
    it("tests change events not fired when displayOnly", () => {
        cy.mount(
            <div>
                <CheckBox id="displayOnlyCb" displayOnly></CheckBox>
                <Input id="field" value="3"></Input>
            </div>
        );
    
        let counter = 3;
        cy.get("#displayOnlyCb").then(($checkbox) => {
            $checkbox[0].addEventListener("ui5-change", function() {
                counter += 1;
                (document.getElementById("field") as HTMLInputElement).value = `${counter}`;
            });
        });
    
        cy.get("#displayOnlyCb").realClick();
        cy.get("#displayOnlyCb").realPress("Space");
        cy.get("#displayOnlyCb").realPress("Enter");
    
        cy.get("#field")
            .should("have.value", "3");
    });

    it("tests truncating and wrapping", () => {
        const CHECKBOX_DEFAULT_HEIGHT = 44;
        
        cy.mount(
            <div>
                <CheckBox id="truncatingCb" wrappingType="None" style={{width: "200px"}} text="Longest ever text written in English that have to truncate because it is so long of course!"></CheckBox>
                <CheckBox id="wrappingCb" style={{width: "200px"}} text="Long long long text that should wrap at some point and make the checkbox taller than default"></CheckBox>
            </div>
        );
    
        cy.get("#truncatingCb")
            .shadow()
            .find(".ui5-checkbox-root")
            .should("have.prop", "offsetHeight", CHECKBOX_DEFAULT_HEIGHT);
    
        cy.get("#wrappingCb")
            .invoke("prop", "offsetHeight")
            .should("be.greaterThan", CHECKBOX_DEFAULT_HEIGHT);
    });
    
    it("tests accessible-name and accessible-name-ref", () => {
        cy.mount(
            <div>
                <CheckBox id="cb2" disabled></CheckBox>
                <CheckBox id="accCb" accessibleName="Hello world"></CheckBox>
                <CheckBox id="accCb1" accessibleNameRef="cb-label"></CheckBox>
                <Title id="cb-label">ACC Test - aria-label</Title>
            </div>
        );
    
        const EXPECTED_ARIA_LABEL = "Hello world";
        const EXPECTED_ARIA_LABEL_NAME_REF = "ACC Test - aria-label";
    
        cy.get("#cb2")
            .shadow()
            .find(".ui5-checkbox-root")
            .should("not.have.attr", "aria-label");
    
        cy.get("#accCb")
            .shadow()
            .find(".ui5-checkbox-root")
            .should("have.attr", "aria-label", EXPECTED_ARIA_LABEL);
    
        cy.get("#accCb1")
            .shadow()
            .find(".ui5-checkbox-root")
            .should("have.attr", "aria-label", EXPECTED_ARIA_LABEL_NAME_REF);
    });
    
    it("tests ui5-icon", () => {
        cy.mount(
            <CheckBox id="checkboxChecked" checked></CheckBox>
        );
    
        cy.get("#checkboxChecked")
            .shadow()
            .find(".ui5-checkbox-icon")
            .should("have.attr", "aria-hidden", "true");
    });

    it("tests change event - value is changed", () => {
        cy.mount(
            <CheckBox id="cb1" text="Long long long text"></CheckBox>
        );
    
        cy.get("#cb1")
            .should("have.prop", "checked", false);
    
        cy.get("#cb1").realClick();
    
        cy.get("#cb1")
            .should("have.prop", "checked", true);
    });
    
    it("tests change event preventDefault - value is not changed", () => {
        cy.mount(
            <div>
                <CheckBox class="defaultPreventedCb"></CheckBox>
                <CheckBox class="defaultPreventedCb" checked></CheckBox>
                <CheckBox class="defaultPreventedCb" indeterminate></CheckBox>
                <CheckBox class="defaultPreventedCb" indeterminate checked></CheckBox>
            </div>
        );
    
        cy.get(".defaultPreventedCb").each(($checkbox) => {
            $checkbox[0].addEventListener("ui5-change", function(event) {
                event.preventDefault();
            });
        });
    
        cy.get(".defaultPreventedCb").eq(0).realClick();
        cy.get(".defaultPreventedCb").eq(0).should("have.prop", "checked", false);
        cy.get(".defaultPreventedCb").eq(0).should("have.prop", "indeterminate", false);
    
        cy.get(".defaultPreventedCb").eq(1).realClick();
        cy.get(".defaultPreventedCb").eq(1).should("have.prop", "checked", true);
        cy.get(".defaultPreventedCb").eq(1).should("have.prop", "indeterminate", false);
    
        cy.get(".defaultPreventedCb").eq(2).realClick();
        cy.get(".defaultPreventedCb").eq(2).should("have.prop", "checked", false);
        cy.get(".defaultPreventedCb").eq(2).should("have.prop", "indeterminate", true);
    
        cy.get(".defaultPreventedCb").eq(3).realClick();
        cy.get(".defaultPreventedCb").eq(3).should("have.prop", "checked", true);
        cy.get(".defaultPreventedCb").eq(3).should("have.prop", "indeterminate", true);
    });
    
    it("tests form submission when checkbox is required, but unchecked", () => {
        cy.mount(
            <form id="cbForm">
                <CheckBox id="cbItem1" text="Option 1" checked></CheckBox>
                <CheckBox id="cbItem2" text="Option 2" checked></CheckBox>
                <CheckBox id="cbItem3" text="Option 3" required></CheckBox>
                <Button id="cbSubmit" type="Submit">Submit</Button>
                <input type="hidden" id="cbFormSubmitted" value="false" />
            </form>
        );
    
        cy.get("#cbForm").then(($form) => {
            $form[0].addEventListener("submit", function(event) {
                event.preventDefault();
                (document.getElementById("cbFormSubmitted") as HTMLInputElement).value = "true";
            });
        });
    
        cy.get("#cbSubmit").realClick();
    
        cy.get("#cbFormSubmitted")
            .should("have.value", "false");
    });

    it("tests form submission when checkbox is checked and button is clicked", () => {
        cy.mount(
            <form id="cbForm">
                <CheckBox id="cbItem1" text="Option 1" checked></CheckBox>
                <CheckBox id="cbItem2" text="Option 2" checked></CheckBox>
                <CheckBox id="cbItem3" text="Option 3" required></CheckBox>
                <Button id="cbSubmit" type="Submit">Submit</Button>
                <input type="hidden" id="cbFormSubmitted" value="false" />
            </form>
        );
    
        cy.get("#cbForm").then(($form) => {
            $form[0].addEventListener("submit", function(event) {
                event.preventDefault();
                (document.getElementById("cbFormSubmitted") as HTMLInputElement).value = "true";
            });
        });
    
        cy.get("#cbItem3").realClick();
        cy.get("#cbSubmit").realClick();
    
        cy.get("#cbFormSubmitted")
            .should("have.value", "true");
    });
    
    it("tests displayOnly mode - checkbox cannot be toggled", () => {
        cy.mount(
            <CheckBox id="displayOnlyCb" displayOnly></CheckBox>
        );
    
        cy.get("#displayOnlyCb")
            .should("have.prop", "checked", false);
    
        cy.get("#displayOnlyCb").realClick();
    
        cy.get("#displayOnlyCb")
            .should("have.prop", "checked", false);
    });
    
    it("tests displayOnly mode - checkbox is not focusable", () => {
        cy.mount(
            <CheckBox id="displayOnlyCb" displayOnly></CheckBox>
        );
    
        cy.get("#displayOnlyCb").realClick();
    
        cy.get("#displayOnlyCb")
            .should("not.be.focused");
    });

    it("tests displayOnly mode - checkbox is not in the tab chain", () => {
        cy.mount(
            <CheckBox id="displayOnlyCb" displayOnly></CheckBox>
        );
    
        cy.get("#displayOnlyCb")
            .shadow()
            .find(".ui5-checkbox-root")
            .should("not.have.attr", "tabindex");
    });
    
    it("tests displayOnly mode - displays the correct icon", () => {
        cy.mount(
            <CheckBox id="displayOnlyCb" displayOnly></CheckBox>
        );
    
        cy.get("#displayOnlyCb")
            .shadow()
            .find("ui5-icon")
            .should("have.attr", "name", "border");
    
        cy.get("#displayOnlyCb")
            .invoke("prop", "checked", true);
    
        cy.get("#displayOnlyCb")
            .shadow()
            .find("ui5-icon")
            .should("have.attr", "name", "complete");
    
        cy.get("#displayOnlyCb")
            .invoke("prop", "indeterminate", true);
    
        cy.get("#displayOnlyCb")
            .shadow()
            .find("ui5-icon")
            .should("have.attr", "name", "tri-state");
    });
});