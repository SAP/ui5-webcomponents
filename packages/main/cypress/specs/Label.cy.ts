import { html } from "lit";
import "../../src/Label.js";
import "../../src/Input.js";
import "../../src/TextArea.js";
import "../../src/DatePicker.js";
import "../../test/pages/modules/LabelPageCustomElement.js";
import {
	LABEL_COLON,
} from "../../src/generated/i18n/i18n-defaults.js";

describe("Label", () => {
	describe("General API ", () => {
		it("tests initial rendering - root and slot", () => {
			cy.mount(html`<ui5-label>Basic Label</ui5-label>`);
			cy.get("[ui5-label]").shadow().find(".ui5-label-root").should("exist");
			cy.get("[ui5-label]").shadow().find("slot:not([name])");
		});

		it("should show required star", () => {
			cy.mount(html`<ui5-label required>Required Label</ui5-label>`);
			cy.get("[ui5-label]")
				.shadow()
				.find(".ui5-label-required-colon")
				.then($el => {
					return getComputedStyle($el[0], ":after").content;
				})
				.should("equal", `"*"`);
		});

		it("tests show-colon does not force truncation", () => {
			cy.mount(html`
				<ui5-label id="showColon-false">Basic Label</ui5-label>
				<ui5-label show-colon id="showColon-true">Basic Label</ui5-label>
			`);

			cy.get("#showColon-true").shadow().find(".ui5-label-text-wrapper").invoke("width")
				.then(labelWithColonWidth => {
					cy.get("#showColon-false").shadow().find(".ui5-label-text-wrapper").should("have.css", "width", `${labelWithColonWidth}px`);
				});
		});

		it("should wrap the text of the label by default and truncate when wrappingType is None", () => {
			cy.mount(html`
				<ui5-label id="wrapping-label-1" style="width: 200px">Reprehenderit amet cillum tempor ex eu dolor adipisicing reprehenderit pariatur.</ui5-label>
				<ui5-label id="truncated-label-1" wrapping-type="None" style="width: 200px">Reprehenderit amet cillum tempor ex eu dolor adipisicing reprehenderit pariatur.</ui5-label>
			`);

			cy.get("#wrapping-label-1").invoke("height").then(wrappingLabelHeight => {
				cy.get("#truncated-label-1").invoke("height").should(truncatedLabelHeight => {
					expect(wrappingLabelHeight).to.be.greaterThan(16);
					expect(truncatedLabelHeight).to.be.lessThan(17);
				});
			});
		});

		it("colon symbol should be taken from the i18n bundle", () => {
			cy.mount(html`<ui5-label show-colon id="showColon-true">Basic Label</ui5-label>`);

			cy.get("#showColon-true").shadow().find(".ui5-label-required-colon").then($el => {
				return getComputedStyle($el[0], ":before").content;
			}).should("equal", `"${LABEL_COLON.defaultText}"`);
		});
	});

	describe("linked element with 'for' property", () => {
		it("should focus ui5-input on click and set correct aria-label", () => {
			cy.mount(html`
				<ui5-label for="form-ui5-input">Label for Input</ui5-label>
				<ui5-input id="form-ui5-input" style="width: 200px"></ui5-input>
			`);

			cy.get("[ui5-label]").realClick();
			cy.get("[ui5-input]").should("be.focused");

			cy.get("[ui5-input]").shadow().find(".ui5-input-inner").should("have.attr", "aria-label", "Label for Input");
		});

		it("should focus native HTML input on click", () => {
			cy.mount(html`
				<ui5-label for="native-input">Label for Native Input</ui5-label>
				<input id="native-input" />
			`);

			cy.get("[ui5-label]").realClick();
			cy.get("#native-input").should("be.focused");
		});

		it("should focus ui5-textarea on click", () => {
			cy.mount(html`
				<ui5-label for="ui5-textarea">Label for Textarea</ui5-label>
				<ui5-textarea id="ui5-textarea"></ui5-textarea>
			`);

			cy.get("[ui5-label]").realClick();
			cy.get("#ui5-textarea").should("be.focused");
		});

		it("should focus native HTML textarea on click", () => {
			cy.mount(html`
				<ui5-label for="native-textarea">Label for Native Textarea</ui5-label>
				<textarea id="native-textarea"></textarea>
			`);

			cy.get("[ui5-label]").realClick();
			cy.get("#native-textarea").should("be.focused");
		});

		it("should focus ui5-date-picker on click", () => {
			cy.mount(html`
				<ui5-label for="ui5-datepicker">Label for Date Picker</ui5-label>
				<ui5-date-picker id="ui5-datepicker"></ui5-date-picker>
			`);

			cy.get("[ui5-label]").realClick();
			cy.get("#ui5-datepicker").should("be.focused");
		});

		it("should focus within a shadow root", () => {
			cy.mount(html`
				<label-page-custom-element id="custom-element-with-label"></label-page-custom-element>
			`);

			cy.get("#custom-element-with-label").shadow().find("[ui5-label]").realClick();
			cy.get("#custom-element-with-label").shadow().find("#input").should("be.focused");
		});
	});
});
