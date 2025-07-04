import { assert } from "chai";
import FileUploader from "../../src/FileUploader.js";
import Button from "../../src/Button.js";
import Label from "../../src/Label.js";
import "@ui5/webcomponents-icons/dist/upload.js";

describe("API", () => {
	it("files property", () => {
		cy.mount(
			<FileUploader></FileUploader>
		);

		cy.get("[ui5-file-uploader]")
			.should("exist")
			.then($el => {
				const uploader = $el[0] as FileUploader;
				expect(uploader.files).to.exist;
				expect(uploader.files.length).to.equal(0);
			});
	});

	it("hide-input property", () => {
		cy.mount(
			<FileUploader hide-input>
				<Button icon="upload"></Button>
			</FileUploader>
		);

		cy.get("[ui5-file-uploader]")
			.as("uploader");

		cy.get("@uploader")
			.shadow()
			.find("input[type='file']")
			.should("exist");

		cy.get("@uploader")
			.shadow()
			.find(".ui5-file-uploader-display-elements")
			.should("not.exist");
	});

	it("default slot", () => {
		cy.mount(
			<FileUploader hide-input>
				<Button icon="upload"></Button>
			</FileUploader>
		);

		cy.get("[ui5-file-uploader]")
			.find("ui5-button")
			.should("exist");
	});

	it("disabled property", () => {
		cy.mount(
			<FileUploader disabled></FileUploader>
		);

		cy.get("[ui5-file-uploader]")
			.shadow()
			.find("input[type='file']")
			.should("be.disabled");
	});

	it("required property", () => {
		cy.mount(
			<FileUploader required></FileUploader>
		);

		cy.get("[ui5-file-uploader]")
			.shadow()
			.find("input[type='file']")
			.should("have.attr", "aria-required", "true");
	});

	it("accept property", () => {
		cy.mount(
			<FileUploader accept=".txt,.docx"></FileUploader>
		);

		cy.get("[ui5-file-uploader]")
			.shadow()
			.find("input[type='file']")
			.should("have.attr", "accept", ".txt,.docx");
	});
});

describe("Interaction", () => {
	it("focus into default file uploader", () => {
		cy.mount(
			<>
				<Label for="uploader">Application context</Label>
				<FileUploader id="uploader">
					<Button icon="upload"></Button>
				</FileUploader>
			</>
		);

		cy.get("[ui5-label]")
			.realClick();

		cy.get("[ui5-file-uploader]")
			.as("uploader")
			.should("be.focused");

		cy.get("@uploader")
			.realPress("Tab");

		cy.get("@uploader")
			.find("[ui5-button]")
			.should("be.focused");
	});

	it("focus into the button-only file uploader", () => {
		cy.mount(
			<>
				<Label for="button-only-uploader">Application context</Label>
				<FileUploader id="button-only-uploader" hide-input>
					<Button icon="upload"></Button>
				</FileUploader>
			</>
		);

	   cy.get("[ui5-label]")
			.realClick();

		cy.get("[ui5-file-uploader]")
			.as("uploader")
			.should("be.focused");

		cy.get("@uploader")
			.should("be.focused");

		cy.get("@uploader")
			.find("[ui5-button]")
			.should("have.attr", "tabindex", "-1");
	});

	it("focus into critical value state file uploader", () => {
		cy.mount(
			<>
				<Label for="critical-uploader">Application context</Label>
				<FileUploader id="critical-uploader" value-state="Critical"></FileUploader>
			</>
		);

		cy.get("[ui5-label]")
			.realClick();

		cy.get("[ui5-file-uploader]")
			.as("uploader")
			.should("be.focused");

		cy.get("@uploader")
			.shadow()
			.find("[ui5-popover]")
			.as("popover")
			.should("exist")
			.and("have.attr", "open");

		cy.get("@popover")
			.find(".ui5-valuestatemessage-root")
			.should("have.class", "ui5-valuestatemessage--warning");
	});
});

describe("Accessibility", () => {
	it("A11y attributes", () => {
		cy.mount(
			<>
				<Label for="uploader">Application context</Label>
				<FileUploader id="uploader" value-state="Negative"></FileUploader>
			</>
		);

		cy.get("[ui5-file-uploader]")
			.as("uploader")
			.shadow()
			.find("input[type='file']")
			.should("have.attr", "aria-roledescription", "File Uploader")
			.should("have.attr", "aria-haspopup", "dialog")
			.should("have.attr", "aria-label", "Application context")
			.should("have.attr", "aria-invalid", "true")
			.and("have.attr", "data-sap-focus-ref", "true");
	});
});