import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/Option.js";
import UploadCollection from "../../src/UploadCollection.js";
import UploadCollectionItem from "../../src/UploadCollectionItem.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import FileUploader from "@ui5/webcomponents/dist/FileUploader.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";

function UploadCollectionSample() {
	return <UploadCollection id="uploadCollection" accessibleName="Uploaded (4)">
		<div slot="header" class="header">
			<Title id="uploadCollectionTitle">Uploaded (4)</Title>
			<Label>Add new files and press to start uploading pending files:</Label>
			<Button id="startUploading">Start</Button>
			<div class="spacer"></div>
			<FileUploader id="fileUploader" hideInput={true} multiple={true}>
				<Button icon="add" design="Transparent"></Button>
			</FileUploader>
		</div>
		<UploadCollectionItem
			id="firstItem"
			fileName="LaptopHT-1000.jpg"
			fileNameClickable={true}
			uploadState="Complete"
		>
			<img src="./img/HT-1000.jpg" slot="thumbnail" />
			File name is clickable.
		</UploadCollectionItem>
		<UploadCollectionItem
			id="secondItem"
			fileName=".gitignore"
			disable-delete-button
			uploadState="Complete"
		>
			<Icon name="customize" slot="thumbnail"></Icon>
			You cannot delete this file.
		</UploadCollectionItem>
		<UploadCollectionItem
			id="latestReportsPdf"
			fileName="latest.reports.pdf"
			uploadState="Complete"
		>
			<Icon name="document-text" slot="thumbnail"></Icon>
			Some description.
		</UploadCollectionItem>
		<UploadCollectionItem
			id="reportPdf"
			fileName="report.pdf"
			uploadState="Complete"
		>
			<Icon name="document-text" slot="thumbnail"></Icon>
			Some description.
		</UploadCollectionItem>
		<UploadCollectionItem
			id="disabledPdf"
			fileName="disabledFile.pdf"
			uploadState="Complete"
			disabled={true}
		>
			<Icon name="document-text" slot="thumbnail"></Icon>
			Some description.
		</UploadCollectionItem>
		<UploadCollectionItem
			id="noFileExtension"
			fileName="noextension"
			uploadState="Complete"
		>
			<Icon name="document-text" slot="thumbnail"></Icon>
		</UploadCollectionItem>
		<UploadCollectionItem
			id="keyboardNavigation"
			fileName="Graph.docx"
			hideDeleteButton={true}
			uploadState="Complete"
		>
			<Icon name="document-text" slot="thumbnail"></Icon>
		</UploadCollectionItem>
	</UploadCollection>;
}

function UploadCollectionStatesSample() {
	return <UploadCollection id="uploadCollectionStates">
		<div class="header" slot="header">
			<Title>Upload States</Title>
		</div>
		<UploadCollectionItem
			id="completeState"
			fileName="LaptopHT-1000.jpg"
			fileNameClickable={true}
			uploadState="Complete"
		>
			<img src="./img/HT-1000.jpg" slot="thumbnail" />
			uploadState="Complete"
		</UploadCollectionItem>

		<UploadCollectionItem
			id="uploadingState"
			fileName="Laptop.jpg"
			type="Detail"
			disableDeleteButton={true}
			uploadState="Uploading"
			progress={37}
		>
			<img src="./img/HT-1000.jpg" slot="thumbnail" />
			uploadState="Uploading"
		</UploadCollectionItem>

		<UploadCollectionItem
			id="hiddenFileName"
			fileName=".gitignore"
			type="Detail"
			hideTerminateButton={true}
			uploadState="Error"
			progress={89}
		>
			<img src="./img/HT-1000.jpg" slot="thumbnail" />
			uploadState="Uploading" with hidden terminate button
		</UploadCollectionItem>

		<UploadCollectionItem
			fileName="Laptop (2).jpg"
			type="Detail"
			hideTerminateButton={true}
			uploadState="Uploading"
			progress={89}
		>
			<img src="./img/HT-1000.jpg" slot="thumbnail" />
			uploadState="Uploading" with hidden terminate button
		</UploadCollectionItem>

		<UploadCollectionItem
			id="errorState"
			fileName="latest.reports.pdf"
			type="Detail"
			uploadState="Error"
			progress={59}
		>
			<Icon name="document-text" slot="thumbnail"></Icon>
			uploadState="Error"
		</UploadCollectionItem>

		<UploadCollectionItem
			id="readyState"
			fileName="noextension"
			type="Detail"
		>
			<Icon name="document-text" slot="thumbnail"></Icon>
			uploadState="Ready" (default)
		</UploadCollectionItem>
	</UploadCollection>;
}

describe("UploadCollection Rendering", () => {
	it("Tests that Link is shown when 'fileNameClickable'", () => {
		cy.mount(<UploadCollectionSample />);

		cy.get("#firstItem").shadow().find("ui5-link").should("be.visible");
	});

	it("Tests that span is shown when file name is NOT clickable", () => {
		cy.mount(<UploadCollectionSample />);

		cy.get("#secondItem").shadow().find("span.ui5-uci-file-name").should("be.visible");
	});

	it("Tests that input and buttons are shown when editing", () => {
		cy.mount(<UploadCollectionStatesSample />);

		cy.get("#errorState").shadow().find(".ui5-li-detailbtn").realClick();
		cy.get("#errorState").shadow().find(".ui5-uci-edit-container").should("be.visible");
		cy.get("#errorState").shadow().find(".ui5-uci-buttons").should("be.visible");
		cy.get("#errorState").shadow().find(".ui5-li-detailbtn").should("not.exist");

		cy.get("#errorState").invoke("removeAttr", "_editing");
	});

	it("Tests that no buttons besides 'Terminate' are shown, when uploadState is 'Uploading'", () => {
		cy.mount(<UploadCollectionStatesSample />);

		cy.get("#uploadingState").shadow().find("ui5-button[icon=stop]").should("be.visible");
		cy.get("#uploadingState").shadow().find(".ui5-li-detailbtn").should("not.be.visible");
		cy.get("#uploadingState").shadow().find(".ui5-upload-collection-deletebtn")
			.should("be.visible")
			.and("have.attr", "disabled");
	});

	it("Tests that 'Retry' button is shown when uploadState is 'Error'", () => {
		cy.mount(<UploadCollectionStatesSample />);

		cy.get("#errorState").shadow().find("ui5-button[icon=refresh]").should("be.visible");
		cy.get("#errorState").shadow().find(".ui5-li-detailbtn").should("be.visible");

		cy.get("#errorState").shadow().find(".ui5-li-detailbtn").realClick();

		cy.get("#errorState").shadow().find("ui5-button[icon=refresh]").should("not.exist");
		cy.get("#errorState").shadow().find(".ui5-li-detailbtn").should("not.exist");

		cy.get("#errorState").invoke("removeAttr", "_editing");
	});

	it("Tests the visibility of buttons", () => {
		cy.mount(
			<UploadCollection id="uploadCollection3">
				<div class="header" slot="header">
					<Title>Hidden buttons</Title>
				</div>

				<UploadCollectionItem id="uc3-default" fileName="File name">
					<Icon name="document-text" slot="thumbnail"></Icon>
					Default, delete button always visible
				</UploadCollectionItem>

				<UploadCollectionItem id="uc3-default-hidden-delete" fileName="File name" hideDeleteButton={true}>
					<Icon name="document-text" slot="thumbnail"></Icon>
					Default, delete button hidden
				</UploadCollectionItem>

				<UploadCollectionItem id="uc3-error" fileName="File name" uploadState="Error">
					<Icon name="document-text" slot="thumbnail"></Icon>
					uploadState="Error" with retry button visible by default
				</UploadCollectionItem>

				<UploadCollectionItem id="uc3-error-hidden-retry" fileName="File name" uploadState="Error" hideRetryButton>
					<Icon name="document-text" slot="thumbnail"></Icon>
					uploadState="Error" with hidden retry button
				</UploadCollectionItem>

				<UploadCollectionItem id="uc3-uploading" fileName="File name" uploadState="Uploading">
					<Icon name="document-text" slot="thumbnail"></Icon>
					uploadState="Uploading" with terminate button visible by default
				</UploadCollectionItem>

				<UploadCollectionItem id="uc3-uploading-hidden-terminate" fileName="File name" uploadState="Uploading" hideTerminateButton={true}>
					<Icon name="document-text" slot="thumbnail"></Icon>
					uploadState="Uploading" with hidden terminate button
				</UploadCollectionItem>
			</UploadCollection>
		);

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

	it("Tests rendering of 'deleteButton' slot", () => {
		cy.mount(
			<UploadCollection id="uploadCollection">
				<UploadCollectionItem id="item" fileName="File name">
					<button slot="deleteButton" id="deleteButton">custom delete button</button>
				</UploadCollectionItem>
			</UploadCollection>
		);

		cy.get("#deleteButton").should("be.visible");
		cy.get("#item").shadow().find(".ui5-upload-collection-deletebtn").should("not.exist");
	});

	it("Tests that 'header' and 'accessible-name' get forwarded to the inner list", () => {
		const EXPECTED_ACC_NAME = "Uploaded (4)";

		cy.mount(<UploadCollectionSample />);

		cy.get("#uploadCollection")
			.shadow()
			.find("[ui5-list]")
			.as("list");

		cy.get("@list")
			.invoke("prop", "accessibleName")
			.should("equal", EXPECTED_ACC_NAME);

		cy.get("@list")
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
		cy.mount(<UploadCollectionSample />);

		cy.get("#uploadCollection").invoke("prop", "selectionMode", "Multiple");

		cy.get("#firstItem").shadow().find(".ui5-li-multisel-cb").should("be.visible");
		cy.get("#firstItem").shadow().find(".ui5-li-singlesel-radiobtn").should("not.exist");
	});

	it("Tests that in 'SingleStart' mode there is a radio button", () => {
		cy.mount(<UploadCollectionSample />);

		cy.get("#uploadCollection").invoke("prop", "selectionMode", "SingleStart");

		cy.get("#firstItem").shadow().find(".ui5-li-multisel-cb").should("not.exist");
		cy.get("#firstItem").shadow().find(".ui5-li-singlesel-radiobtn").should("be.visible");

		// reset back to SelectionMode=None
		cy.get("#uploadCollection").invoke("prop", "selectionMode", "None");
	});

	it("Tests Disabled item", () => {
		cy.mount(<UploadCollectionSample />);

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
		const renameEventStub = cy.stub();

		cy.mount(
			<UploadCollection id="uploadCollection">
				<UploadCollectionItem id="item" onRename={renameEventStub} fileName="File name" type="Detail" />
			</UploadCollection>);

		cy.get("#item")
			.shadow()
			.find(".ui5-li-detailbtn")
			.realClick();

		cy.get("#item")
			.shadow()
			.find("#ui5-uci-edit-input")
			.should("have.focus")
			.realType("fileNameSuffix");

		cy.realPress("Enter");

		cy.wrap(renameEventStub)
			.should("have.been.called");
	});

	it("Tests firing 'item-delete' regardless of the selectionMode", () => {
		cy.mount(
			<UploadCollection id="uploadCollection">
				<UploadCollectionItem id="item" fileName="File name" />
			</UploadCollection>);

		cy.get("#item")
			.shadow()
			.find(".ui5-upload-collection-deletebtn")
			.realClick();

		cy.get("#uploadCollection")
			.shadow()
			.find("#item")
			.should("not.exist");
	});

	it("Tests firing 'item-delete' when 'DELETE' key is pressed on item", () => {
		cy.mount(
			<UploadCollection id="uploadCollection">
				<UploadCollectionItem id="item" fileName="File name" />
			</UploadCollection>);

		cy.get("#item")
			.realClick();

		cy.realPress("Delete");

		cy.get("#uploadCollection")
			.shadow()
			.find("#item")
			.should("not.exist");
	});

	it("Tests that item fires 'retry'", () => {
		const retryEventStub = cy.stub();

		cy.mount(
			<UploadCollection id="uploadCollection">
				<UploadCollectionItem id="item" onRetry={retryEventStub} fileName="File name" uploadState="Error" />
			</UploadCollection>);

		cy.get("#item")
			.shadow()
			.find(".ui5-uci-buttons ui5-button")
			.realClick();

		cy.wrap(retryEventStub)
			.should("have.been.called");
	});

	it("Tests that item fires 'terminate'", () => {
		const terminateEventStub = cy.stub();

		cy.mount(
			<UploadCollection id="uploadCollection">
				<UploadCollectionItem id="item" onTerminate={terminateEventStub} fileName="File name" uploadState="Uploading" />
			</UploadCollection>);

		cy.get("#item")
			.shadow()
			.find(".ui5-uci-buttons ui5-button")
			.realClick();

		cy.wrap(terminateEventStub)
			.should("have.been.called");
	});
});

describe("Keyboard handling", () => {
	it("Tests item tab order", () => {
		cy.mount(<UploadCollectionStatesSample />);

		cy.get("#hiddenFileName")
			.shadow()
			.find("li")
			.should("have.attr", "tabindex", "-1");

		cy.get("#hiddenFileName").realClick();
		cy.get("#hiddenFileName").should("have.focus");

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
		cy.mount(<>
			<button id="tabStop1">Tab stop helper</button>
			<UploadCollection id="uploadCollection" />
			<button id="tabStop2">Tab stop helper</button>
		</>);

		cy.get("#tabStop1").realClick();
		cy.realPress("Tab");
		cy.realPress("Tab");

		cy.get("#uploadCollection")
			.shadow()
			.find(".uc-no-files")
			.should("have.attr", "forced-tab-index", "0");

		cy.get("#uploadCollection")
			.shadow()
			.find(".uc-no-files")
			.should("not.have.focus");

		cy.get("#tabStop2").should("have.focus");
	});
});

describe("Edit - various file names", () => {
	it("Tests that dots are preserved in the file name", () => {
		cy.mount(
			<UploadCollection id="uploadCollection">
				<UploadCollectionItem id="item" fileName="File name" type="Detail" upload-state="Error" />
			</UploadCollection>);

		cy.get("#item")
			.shadow()
			.find(".ui5-li-detailbtn")
			.realClick();

		cy.get("#item")
			.shadow()
			.find("#ui5-uci-edit-input")
			.should("have.focus")
			.realType("last.reports-edited");

		cy.realPress("Enter");

		cy.get("#item")
			.shadow()
			.find(".ui5-uci-file-name")
			.should("have.text", "last.reports-edited");
	});

	it("Tests that extension is able to be added, if there isn't such", () => {
		const newFileName = "newFileName.newExtension";
		const newFileName2 = "newFileName2";

		cy.mount(
			<UploadCollection id="uploadCollection">
				<UploadCollectionItem id="item" fileName="File name" type="Detail" />
			</UploadCollection>);

		cy.get("#item")
			.shadow()
			.find(".ui5-li-detailbtn")
			.realClick();

		cy.get("#item")
			.shadow()
			.find("#ui5-uci-edit-input")
			.should("have.focus")
			.realType(newFileName);

		cy.realPress("Enter");

		cy.get("#item")
			.shadow()
			.find(".ui5-uci-file-name")
			.should("have.text", newFileName);

		cy.get("#item")
			.shadow()
			.find(".ui5-li-detailbtn")
			.realClick();

		cy.get("#item")
			.shadow()
			.find("#ui5-uci-edit-input")
			.should("have.focus")
			.realType(newFileName2);

		cy.realPress("Enter");

		cy.get("#item")
			.shadow()
			.find(".ui5-uci-file-name")
			.should("have.text", newFileName2 + ".newExtension");
	});

	it.only("Tests that hidden file name is NOT considered as extension", () => {
		cy.mount(
			<UploadCollection id="uploadCollection">
				<UploadCollectionItem id="item" fileName=".gitignore" type="Detail" />
			</UploadCollection>);

		cy.get("#item")
			.shadow()
			.find(".ui5-li-detailbtn")
			.realClick();

		cy.get("#item")
			.shadow()
			.find("#ui5-uci-edit-input")
			.should("be.visible")
			.and("be.focused")
			.and("have.value", ".gitignore")

		cy.get("#item")
			.shadow()
			.find(".ui5-uci-file-extension")
			.should("exist")
			.and("have.text", "");
	});

	it("Tests cancelling of name change via keyboard", () => {
		cy.mount(
			<UploadCollection id="uploadCollection">
				<UploadCollectionItem id="item" fileName=".gitignore" type="Detail" />
			</UploadCollection>);

		cy.get("#item")
			.shadow()
			.find(".ui5-li-detailbtn")
			.realClick();

		cy.get("#item")
			.shadow()
			.find("#ui5-uci-edit-input")
			.should("have.focus")
			.realType("new name");

		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress("Enter");

		cy.get("#item")
			.shadow()
			.find(".ui5-uci-file-name")
			.should("have.text", ".gitignore");
	});
});

describe("Drag and Drop", () => {
	it("Tests drag and drop overlay when dragging a file", () => {
		cy.mount(<UploadCollection id="uploadCollection" />);

		const dataTransfer = new DataTransfer();
		dataTransfer.items.add(new File([new Blob(["file content"], { type: "text/html" })], "test.txt"))

		cy.document()
			.then((document) => {
				return document.body;
			})
			.trigger("dragenter", {
				eventConstructor: "DragEvent",
				force: true,
				dataTransfer
			});

		cy.get("#uploadCollection")
			.should("have.prop", "_dndOverlayMode", "Drag")
			.shadow()
			.find(".uc-dnd-overlay.uc-drag-overlay")
			.should("be.visible");

		cy.get("#uploadCollection")
			.shadow()
			.find(".uc-dnd-overlay")
			.trigger("dragenter", {
				eventConstructor: "DragEvent",
				force: true,
				dataTransfer
			});

		cy.get("#uploadCollection")
			.should("have.prop", "_dndOverlayMode", "Drop")
			.shadow()
			.find(".uc-dnd-overlay.uc-drop-overlay")
			.should("be.visible");

		cy.get("#uploadCollection")
			.shadow()
			.find(".uc-dnd-overlay")
			.trigger("drop", {
				eventConstructor: "DragEvent",
				force: true,
				dataTransfer
			});

		cy.get("#uploadCollection")
			.should("have.prop", "_dndOverlayMode", "None")
			.shadow()
			.find(".uc-dnd-overlay")
			.should("not.exist");
	});

	it("Tests that drag and drop overlay is NOT shown when NOT dragging files", () => {
		cy.mount(<UploadCollection id="uploadCollection" />);

		const dataTransfer = new DataTransfer();

		cy.document()
			.then((document) => {
				return document.body;
			})
			.trigger("dragenter", {
				eventConstructor: "DragEvent",
				force: true,
				dataTransfer
			});

		cy.get("#uploadCollection")
			.should("have.prop", "_dndOverlayMode", "None")
			.shadow()
			.find(".uc-dnd-overlay")
			.should("not.exist");
	});
});
