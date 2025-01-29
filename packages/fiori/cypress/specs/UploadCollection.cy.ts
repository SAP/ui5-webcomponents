import { html } from "lit";
import "../../src/UploadCollection.js";
import "../../src/UploadCollectionItem.js";
import "@ui5/webcomponents/dist/FileUploader.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/Option.js";

const uploadCollection = html`
<ui5-upload-collection id="uploadCollection" accessible-name="Uploaded (4)">
	<div slot="header" class="header">
		<ui5-title id="uploadCollectionTitle">Uploaded (4)</ui5-title>
		<ui5-label>Add new files and press to start uploading pending files:</ui5-label>
		<ui5-button id="startUploading">Start</ui5-button>
		<div class="spacer"></div>
		<ui5-file-uploader id="fileUploader" hide-input multiple>
			<ui5-button icon="add" design="Transparent"></ui5-button>
		</ui5-file-uploader>
	</div>
	<ui5-upload-collection-item
		id="firstItem"
		file-name="LaptopHT-1000.jpg"
		file-name-clickable
		upload-state="Complete"
	>
		<img src="./img/HT-1000.jpg" slot="thumbnail">
		File name is clickable.
	</ui5-upload-collection-item>
	<ui5-upload-collection-item
		id="secondItem"
		file-name=".gitignore"
		disable-delete-button
		upload-state="Complete"
	>
		<ui5-icon name="customize" slot="thumbnail"></ui5-icon>
		You cannot delete this file.
	</ui5-upload-collection-item>
	<ui5-upload-collection-item
		id="latestReportsPdf"
		file-name="latest.reports.pdf"
		upload-state="Complete"
	>
		<ui5-icon name="document-text" slot="thumbnail"></ui5-icon>
		Some description.
	</ui5-upload-collection-item>
	<ui5-upload-collection-item
		id="reportPdf"
		file-name="report.pdf"
		upload-state="Complete"
	>
		<ui5-icon name="document-text" slot="thumbnail"></ui5-icon>
		Some description.
	</ui5-upload-collection-item>
	<ui5-upload-collection-item
		id="disabledPdf"
		file-name="disabledFile.pdf"
		upload-state="Complete"
		disabled
	>
		<ui5-icon name="document-text" slot="thumbnail"></ui5-icon>
		Some description.
	</ui5-upload-collection-item>
	<ui5-upload-collection-item
		id="noFileExtension"
		file-name="noextension"
		upload-state="Complete"
	>
		<ui5-icon name="document-text" slot="thumbnail"></ui5-icon>
	</ui5-upload-collection-item>
	<ui5-upload-collection-item
		id="keyboardNavigation"
		file-name="Graph.docx"
		hide-delete-button
		upload-state="Complete"
	>
		<ui5-icon name="document-text" slot="thumbnail"></ui5-icon>
	</ui5-upload-collection-item>
</ui5-upload-collection>
`;

const uploadCollectionStates = html`
<ui5-upload-collection id="uploadCollectionStates">
	<div class="header" slot="header">
		<ui5-title>Upload States</ui5-title>
	</div>
	<ui5-upload-collection-item
		id="completeState"
		file-name="LaptopHT-1000.jpg"
		file-name-clickable
		upload-state="Complete"
	>
		<img src="./img/HT-1000.jpg" slot="thumbnail">
		uploadState="Complete"
	</ui5-upload-collection-item>
	<ui5-upload-collection-item
		id="uploadingState"
		file-name="Laptop.jpg"
		type="Detail"
		disable-delete-button
		upload-state="Uploading"
		progress="37"
	>
		<img src="./img/HT-1000.jpg" slot="thumbnail">
		uploadState="Uploading"
	</ui5-upload-collection-item>
	<ui5-upload-collection-item
		id="hiddenFileName"
		file-name=".gitignore"
		type="Detail"
		hide-terminate-button
		upload-state="Error"
		progress="89"
	>
		<img src="./img/HT-1000.jpg" slot="thumbnail">
		uploadState="Uploading" with hidden terminate button
	</ui5-upload-collection-item>
	<ui5-upload-collection-item
		file-name="Laptop (2).jpg"
		type="Detail"
		hide-terminate-button
		upload-state="Uploading"
		progress="89"
	>
		<img src="./img/HT-1000.jpg" slot="thumbnail">
		uploadState="Uploading" with hidden terminate button
	</ui5-upload-collection-item>
	<ui5-upload-collection-item
		id="errorState"
		file-name="latest.reports.pdf"
		type="Detail"
		upload-state="Error"
		progress="59"
	>
		<ui5-icon name="document-text" slot="thumbnail"></ui5-icon>
		uploadState="Error"
	</ui5-upload-collection-item>
	<ui5-upload-collection-item
		id="readyState"
		file-name="noextension"
		type="Detail"
	>
		<ui5-icon name="document-text" slot="thumbnail"></ui5-icon>
		uploadState="Ready" (default)
	</ui5-upload-collection-item>
</ui5-upload-collection>
`;

describe("UploadCollection Rendering", () => {
	it("Tests that Link is shown when 'fileNameClickable'", () => {
		cy.mount(uploadCollection);

		cy.get("#firstItem").shadow().find("ui5-link").should("be.visible");
	});

	it("Tests that span is shown when file name is NOT clickable", () => {
		cy.mount(uploadCollection);

		cy.get("#secondItem").shadow().find("span.ui5-uci-file-name").should("be.visible");
	});

	it("Tests that input and buttons are shown when editing", () => {
		cy.mount(uploadCollectionStates);

		cy.get("#errorState").shadow().find(".ui5-li-detailbtn").realClick();
		cy.get("#errorState").shadow().find(".ui5-uci-edit-container").should("be.visible");
		cy.get("#errorState").shadow().find(".ui5-uci-buttons").should("be.visible");
		cy.get("#errorState").shadow().find(".ui5-li-detailbtn").should("not.exist");

		cy.get("#errorState").invoke("removeAttr", "_editing");
	});

	it("Tests that no buttons besides 'Terminate' are shown, when uploadState is 'Uploading'", () => {
		cy.mount(uploadCollectionStates);

		cy.get("#uploadingState").shadow().find("ui5-button[icon=stop]").should("be.visible");
		cy.get("#uploadingState").shadow().find(".ui5-li-detailbtn").should("not.be.visible");
		cy.get("#uploadingState").shadow().find(".ui5-upload-collection-deletebtn")
			.should("be.visible")
			.and("have.attr", "disabled");
	});

	it("Tests that 'Retry' button is shown when uploadState is 'Error'", () => {
		cy.mount(uploadCollectionStates);

		cy.get("#errorState").shadow().find("ui5-button[icon=refresh]").should("be.visible");
		cy.get("#errorState").shadow().find(".ui5-li-detailbtn").should("be.visible");

		cy.get("#errorState").shadow().find(".ui5-li-detailbtn").realClick();

		cy.get("#errorState").shadow().find("ui5-button[icon=refresh]").should("not.exist");
		cy.get("#errorState").shadow().find(".ui5-li-detailbtn").should("not.exist");

		cy.get("#errorState").invoke("removeAttr", "_editing");
	});

	it("Tests the visibility of buttons", () => {
		cy.mount(html`
			<ui5-upload-collection id="uploadCollection3">
				<div class="header" slot="header">
					<ui5-title>Hidden buttons</ui5-title>
				</div>

				<ui5-upload-collection-item id="uc3-default" file-name="File name">
					<ui5-icon name="document-text" slot="thumbnail"></ui5-icon>
					Default, delete button always visible
				</ui5-upload-collection-item>

				<ui5-upload-collection-item id="uc3-default-hidden-delete" file-name="File name" hide-delete-button>
					<ui5-icon name="document-text" slot="thumbnail"></ui5-icon>
					Default, delete button hidden
				</ui5-upload-collection-item>

				<ui5-upload-collection-item id="uc3-error" file-name="File name" upload-state="Error">
					<ui5-icon name="document-text" slot="thumbnail"></ui5-icon>
					uploadState="Error" with retry button visible by default
				</ui5-upload-collection-item>

				<ui5-upload-collection-item id="uc3-error-hidden-retry" file-name="File name" upload-state="Error" hide-retry-button>
					<ui5-icon name="document-text" slot="thumbnail"></ui5-icon>
					uploadState="Error" with hidden retry button
				</ui5-upload-collection-item>

				<ui5-upload-collection-item id="uc3-uploading" file-name="File name" upload-state="Uploading">
					<ui5-icon name="document-text" slot="thumbnail"></ui5-icon>
					uploadState="Uploading" with terminate button visible by default
				</ui5-upload-collection-item>

				<ui5-upload-collection-item id="uc3-uploading-hidden-terminate" file-name="File name" upload-state="Uploading" hide-terminate-button>
					<ui5-icon name="document-text" slot="thumbnail"></ui5-icon>
					uploadState="Uploading" with hidden terminate button
				</ui5-upload-collection-item>

			</ui5-upload-collection>	
		`);

		cy.get("#uc3-default").shadow().find(".ui5-upload-collection-deletebtn").should("be.visible");
		cy.get("#uc3-default-hidden-delete").shadow().find(".ui5-upload-collection-deletebtn").should("not.exist");
		cy.get("#uc3-error").shadow().find(".ui5-upload-collection-deletebtn").should("be.visible");
		cy.get("#uc3-error").shadow().find("ui5-button[icon=refresh]").should("be.visible");
		cy.get("#uc3-error-hidden-retry").shadow().find(".ui5-upload-collection-deletebtn").should("be.visible");
		cy.get("#uc3-error-hidden-retry").shadow().find(".ui5-button[icon=refresh]").should("not.exist");
		cy.get("#uc3-uploading").shadow().find(".ui5-upload-collection-deletebtn").should("be.visible");
		cy.get("#uc3-uploading").shadow().find("ui5-button[icon=stop]").should("be.visible");
		cy.get("#uc3-uploading-hidden-terminate").shadow().find(".ui5-upload-collection-deletebtn").should("be.visible");
		cy.get("#uc3-uploading-hidden-terminate").shadow().find("ui5-button[icon=stop]").should("not.exist");
	});

	it("Tests that 'header' and 'accessible-name' get forwarded to the inner list", () => {
		cy.mount(uploadCollection);

		cy.get("#uploadCollection")
			.invoke("attr", "accessible-name").then(accessibleName => {
				cy.get("#uploadCollection")
					.shadow()
					.find("[ui5-list]")
					.invoke("attr", "accessible-name")
					.should("equal", accessibleName);
			});

		cy.get("#uploadCollection")
			.shadow()
			.find("ui5-list")
			.shadow()
			.find("slot[name='header']")
			.then(slot => {
				const slotElement = slot[0] as HTMLSlotElement;
				const assignedNodes = slotElement.assignedNodes() as HTMLElement[];
				const innerNode = assignedNodes[0] as HTMLSlotElement;
				const title = innerNode.assignedNodes()[0] as HTMLElement;
				return title.querySelector("#uploadCollectionTitle") as HTMLElement;
			})
			.should("exist")
			.and("be.visible");
	});

	it("Tests that in 'Multiple' selectionMode there is checkbox", () => {
		cy.mount(uploadCollection);

		cy.get("#uploadCollection").invoke("prop", "selectionMode", "Multiple");

		cy.get("#firstItem").shadow().find(".ui5-li-multisel-cb").should("be.visible");
		cy.get("#firstItem").shadow().find(".ui5-li-singlesel-radiobtn").should("not.exist");
	});

	it("Tests that in 'SingleStart' mode there is a radio button", () => {
		cy.mount(uploadCollection);

		cy.get("#uploadCollection").invoke("prop", "selectionMode", "SingleStart");

		cy.get("#firstItem").shadow().find(".ui5-li-multisel-cb").should("not.exist");
		cy.get("#firstItem").shadow().find(".ui5-li-singlesel-radiobtn").should("be.visible");

		// reset back to SelectionMode=None
		cy.get("#uploadCollection").invoke("prop", "selectionMode", "None");
	});

	it("Tests Disabled item", () => {
		cy.mount(uploadCollection);

		cy.get("#disabledPdf")
			.should("have.attr", "disabled");

		cy.get("#disabledPdf")
			.shadow()
			.find(".ui5-upload-collection-deletebtn")
			.should("have.prop", "design", "Transparent");
		// workaround since we do not set the button as diabled, possibly a bug
	});
});

describe("Events", () => {
	it("Tests that item fires 'rename'", () => {
	});

	it("Tests firing 'item-delete' regardless of the selectionMode", () => {
	});

	it("Tests firing 'item-delete' when 'DELETE' key is pressed on item", () => {
	});

	it("Tests that item fires 'retry'", () => {
	});

	it("Tests that item fires 'terminate'", () => {
	});
});

describe("Keyboard handling", () => {
	it("Tests item tab order", () => {
		cy.mount(uploadCollectionStates);

		cy.get("#hiddenFileName").realClick();
		cy.get("#hiddenFileName").should("be.focused");

		cy.realPress("Tab");
		cy.get("#hiddenFileName")
			.shadow()
			.find("[ui5-button][icon=refresh]")
			.then($el => {
				cy.document().its("activeElement.shadowRoot.activeElement").should("eq", $el[0]);
			});

		cy.realPress("Tab");
		cy.get("#hiddenFileName")
			.shadow()
			.find(".ui5-uci-edit")
			.then($el => {
				cy.document().its("activeElement.shadowRoot.activeElement").should("eq", $el[0]);
			});

		cy.realPress("Tab");
		cy.get("#hiddenFileName")
			.shadow()
			.find(".ui5-upload-collection-deletebtn")
			.then($el => {
				cy.document().its("activeElement.shadowRoot.activeElement").should("eq", $el[0]);
			});
	});

	it("Tests Tab through empty upload collection", () => {
	});
});

describe("Edit - various file names", () => {
	it("Tests that dots are preserved in the file name", () => {
	});

	it("Tests that extension is able to be added, if there isn't such", () => {
	});

	it("Tests that hidden file name is NOT considered as extension", () => {
	});

	it("Tests cancelling of name change via keyboard", () => {
	});
});

describe("Drag and Drop", () => {
	it("Tests that drag and drop overlay is NOT shown when NOT dragging files", () => {
	});
});
