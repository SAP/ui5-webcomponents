import { html } from "lit";
import "../../src/Tag.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import {
	TAG_ROLE_DESCRIPTION,
	TAG_SUCCESS,
	TAG_DESCRIPTION_TAG,
} from "../../src/generated/i18n/i18n-defaults.js";

describe("Tag", () => {
	describe("Tag rendering", () => {
		it("initial rendering", () => {
			cy.mount(html`<ui5-tag id="tagWithTextAndIcon" style="width: 300px" color-scheme="1" design="Set1">
					<ui5-icon name="accept" slot="icon"></ui5-icon>bigger width
				</ui5-tag>
				<ui5-tag design="Positive" id="interactiveTag" interactive>
					Interactive
				</ui5-tag>
				<ui5-tag design="Positive" id="noninteractiveTag">
					Noninteractive
				</ui5-tag>`);

			cy.get("#tagWithTextAndIcon").shadow().find(".ui5-tag-root").should("have.prop", "tagName", "DIV");

			cy.get("#interactiveTag").shadow().find(".ui5-tag-root").should("have.prop", "tagName", "BUTTON");

			cy.get("#interactiveTag").shadow().find(".ui5-tag-root").should("have.attr", "aria-roledescription", `${TAG_ROLE_DESCRIPTION.defaultText}`);

			cy.get("#interactiveTag").shadow().find(".ui5-tag-root").should("have.attr", "aria-description", `${TAG_SUCCESS.defaultText}`);

			cy.get("#noninteractiveTag").shadow().find(".ui5-hidden-text").should("have.text", `${TAG_DESCRIPTION_TAG.defaultText} ${TAG_SUCCESS.defaultText}`);
		});

		it("tests that label is rendered if there is text content", () => {
			cy.mount(html`<ui5-tag id="tagWithTextAndIcon" style="width: 300px" color-scheme="1" design="Set1">
				<ui5-icon name="accept" slot="icon"></ui5-icon>bigger width
			</ui5-tag>`);

			cy.get("[ui5-tag]").shadow().find(".ui5-tag-text").should("exist");
		});

		it("tests that label is NOT rendered if there is only icon", () => {
			cy.mount(html`<ui5-tag style="width: 300px">
				<ui5-icon name="accept" slot="icon"></ui5-icon>
			</ui5-tag>`);

			cy.get("[ui5-tag]").shadow().find(".ui5-tag-text").should("not.exist");
		});
	});

	describe("Wrapping", () => {
		it("tests if tag text wraps - default wrappingType", () => {
			cy.mount(html`<ui5-tag id="tagWithWrappingDefault" style="width: 300px">
				<ui5-icon name="accept" slot="icon"></ui5-icon>Some long text with more lines text wrapping-type="Normal"
			</ui5-tag>`);

			cy.get("#tagWithWrappingDefault").shadow().find(".ui5-tag-root").should("have.css", "white-space", "normal");
		});

		it("tests if tag text wraps - wrappingType Normal", () => {
			cy.mount(html`<ui5-tag id="tagWithWrappingNormal" style="width: 300px" wrapping-type="Normal">
				<ui5-icon name="accept" slot="icon"></ui5-icon>Some long text with more lines text wrapping-type="Normal"
			</ui5-tag>`);

			cy.get("#tagWithWrappingNormal").shadow().find(".ui5-tag-root").should("have.css", "white-space", "normal");
		});

		it("tests if tag text wraps - wrappingType None", () => {
			cy.mount(html`<ui5-tag id="tagWithWrappingNone" style="width: 300px" wrapping-type="None">
				<ui5-icon name="accept" slot="icon"></ui5-icon>Some long text with more lines text wrapping-type="None"
			</ui5-tag>`);

			cy.get("#tagWithWrappingNone").shadow().find(".ui5-tag-root").should("have.css", "white-space", "nowrap");
		});
	});
});
