import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
import UploadState from "@ui5/webcomponents-fiori/dist/types/UploadState.js";
import ListMode from "@ui5/webcomponents/dist/types/ListMode.js";
import ListItemType from "@ui5/webcomponents/dist/types/ListItemType.js";
export default {
    title: "Fiori/Upload Collection",
    component: "UploadCollection",
    argTypes,
};
const uploadCollectionItem = (fileName, fileNameClickable, uploadState, defaultSlot, thumbnail, type, progress, disableDeleteButton, hideDeleteButton, hideRetryButton, hideTerminateButton) => {
    return `<ui5-upload-collection-item file-name="${fileName}" upload-state="${uploadState}" ${type ? `type="${type}"` : ""} ${progress ? `progress="${progress}"` : ""} ${fileNameClickable ? `file-name-clickable` : ""} ${disableDeleteButton ? `disable-delete-button=` : ""} ${hideDeleteButton ? `hide-delete-button` : ""} ${hideRetryButton ? `hide-retry-button` : ""} ${hideTerminateButton ? `hide-terminate-button` : ""}>
	${defaultSlot}
	${thumbnail ? thumbnail : ""}
</ui5-upload-collection-item>`;
};
const Template = (args) => {
    return html `
<ui5-upload-collection
	id="${ifDefined(args.id)}"
	mode="${ifDefined(args.mode)}"
	no-data-description="${ifDefined(args.noDataDescription)}"
	no-data-text="${ifDefined(args.noDataText)}"
	?hide-drag-overlay="${ifDefined(args.hideDragOverlay)}"
	accessible-name="${ifDefined(args.accessibleName)}"
>
	${unsafeHTML(args.header)}
	${unsafeHTML(args.default)}
</ui5-upload-collection>`;
};
const handleItemDeleteEvent = (story) => {
    return html `${story()}

<script>
	var uploadCollection = document.querySelector("ui5-upload-collection");
	uploadCollection.addEventListener("ui5-item-delete", e => {
		uploadCollection.removeChild(e.detail.item);
	});
</script>`;
};
const setHeaderStyles = (story) => {
    return html `<style>
	.header {
		display: flex;
		align-items: center;
		overflow: hidden;
		flex-wrap: wrap;
	}

	.spacer {
		flex: 1 1 auto;
	}

	.header > * {
		margin: 0.25rem;
	}
</style>

${story()}`;
};
const handleFileUpload = (story) => {
    return html `${story()}

<script>
	var uploadCollection = document.querySelector("ui5-upload-collection");
	var fileUploader = document.getElementById("fileUploader");
	var startUploading = document.getElementById("startUploading");

	fileUploader.addEventListener("change", e => {
		var files = e.detail.files;
		for (var i = 0; i < files.length; i++) {
			uploadCollection.appendChild(createUCI(files[i]));
		}
	});

	function createUCI(file) {
		var uci = document.createElement("ui5-upload-collection-item");
		var description = document.createTextNode("Last modified: " + file.lastModifiedDate + ", size: " + file.size);

		uci.appendChild(createThumbnail(file.name));
		uci.appendChild(description);
		uci.file = file;
		uci.fileName = file.name;
		return uci;
	}

	function createThumbnail(fileName) {
		var icon = document.createElement("ui5-icon");
		icon.name = "document";
		icon.slot = "thumbnail";
		return icon;
	}

	startUploading.addEventListener("click", e => {
		uploadCollection.items
			.filter(item => item.uploadState === "Ready" && item.file)
			.forEach(item => {
				item.uploadState = "Uploading";

				fetch("/upload", {
					method: "POST",
					body: item.file
				}).then(res => {
					item.uploadState = res.status === 200 ? "Complete" : "Error";
				});
			});
	});
</script>`;
};
export const Basic = Template.bind({});
Basic.args = {
    mode: ListMode.Delete,
    id: "uploadCollection",
    accessibleName: "Uploaded (2)",
    header: `<div slot="header" class="header">
	<ui5-title>Uploaded (2)</ui5-title>
	<ui5-label show-colon>Add new files and press to start uploading pending files</ui5-label>
	<ui5-button id="startUploading">Start</ui5-button>
	<div class="spacer"></div>
	<ui5-file-uploader id="fileUploader" hide-input multiple>
		<ui5-button icon="add" design="Transparent"></ui5-button>
	</ui5-file-uploader>
</div>`,
    default: `${uploadCollectionItem("LaptopHT-1000.jpg", true, UploadState.Complete, "Uploaded By: David Keane · Uploaded On: 2014-07-26 · File Size: 35 KB", `<img src="../assets/images/HT-1000.jpg" slot="thumbnail">`)}
${uploadCollectionItem("Notes.txt", false, UploadState.Complete, `Uploaded By: John Smith · Uploaded On: 2014-09-02 · File Size: 226.6 KB`, `<ui5-icon name="document-text" slot="thumbnail"></ui5-icon>`)}`,
};
Basic.parameters = {
    docs: {
        story: {
            iframeHeight: "500px",
        },
    },
};
Basic.decorators = [
    setHeaderStyles,
    handleFileUpload,
    handleItemDeleteEvent,
];
const alertOnFileRename = (story) => {
    return html `${story()}

<script>
	var uploadCollection = document.querySelector("ui5-upload-collection");
	uploadCollection.addEventListener("rename", e => {
		alert("Rename event: " + e.target.fileName);
	});
</script>`;
};
export const RenamingFiles = Template.bind({});
RenamingFiles.args = {
    header: `<div slot="header" class="header">
	<ui5-title>Attachments (2)</ui5-title>
</div>`,
    default: `${uploadCollectionItem("LaptopHT-1000.jpg", true, UploadState.Complete, "Uploaded By: David Keane · Uploaded On: 2014-07-26 · File Size: 35 KB", `<img src="../assets/images/HT-1000.jpg" slot="thumbnail">`, ListItemType.Detail)}
${uploadCollectionItem("Notes.txt", false, UploadState.Complete, "Uploaded By: John Smith · Uploaded On: 2014-09-02 · File Size: 226.6 KB", `<ui5-icon name="document-text" slot="thumbnail"></ui5-icon>`, ListItemType.Detail)}`,
};
RenamingFiles.decorators = [
    alertOnFileRename,
    handleItemDeleteEvent,
];
const alertOnFileRetryTerminate = (story) => {
    return html `${story()}

<script>
	var uploadCollection = document.querySelector("ui5-upload-collection");
	uploadCollection.addEventListener("retry", e => {
		alert("Retry uploading: " + e.target.fileName);
	});
	uploadCollection.addEventListener("terminate", e => {
		alert("Terminate uploading of: " + e.target.fileName);
	});
</script>`;
};
export const VariousUploadStates = Template.bind({});
VariousUploadStates.args = {
    header: `<div class="header" slot="header">
	<ui5-title>Upload States</ui5-title>
</div>`,
    default: `
${uploadCollectionItem("LaptopHT-1000.jpg", false, UploadState.Complete, `uploadState="Complete"`, `<img src="../assets/images/HT-1000.jpg" slot="thumbnail">`)}
${uploadCollectionItem("Laptop.jpg", false, UploadState.Uploading, `uploadState="Uploading"`, `<img src="../assets/images/HT-1000.jpg" slot="thumbnail">`, ListItemType.Active, "37")}
${uploadCollectionItem("latest-reports.pdf", false, UploadState.Error, `uploadState="Error"`, `<ui5-icon name="document-text" slot="thumbnail"></ui5-icon>`, ListItemType.Active, "59")}
${uploadCollectionItem("Notes.txt", false, UploadState.Ready, `uploadState="Ready" (default)`, `<ui5-icon name="document-text" slot="thumbnail"></ui5-icon>`)}`,
};
VariousUploadStates.parameters = {
    docs: {
        story: {
            iframeHeight: "400px",
        },
    },
};
VariousUploadStates.decorators = [
    alertOnFileRetryTerminate,
    handleItemDeleteEvent,
];
const handleDropEvent = (story) => {
    return html `${story()}

<script>
	var uploadCollection = document.querySelector("ui5-upload-collection");
	uploadCollection.addEventListener("drop", e => {
		e.preventDefault();

		var files = e.dataTransfer.files;
		// Take the files from the drop event and create <ui5-upload-collection-item> from them
		for (var i = 0; i < files.length; i++) {
			uploadCollection.appendChild(createUCI(files[i]));
		}
	});

	function createUCI(file) {
		var uci = document.createElement("ui5-upload-collection-item");
		var description = document.createTextNode("Last modified: " + file.lastModifiedDate + ", size: " + file.size);

		uci.appendChild(createThumbnail(file.name));
		uci.appendChild(description);
		uci.file = file;
		uci.fileName = file.name;
		return uci;
	}

	function createThumbnail(fileName) {
		var icon = document.createElement("ui5-icon");
		icon.name = "document";
		icon.slot = "thumbnail";
		return icon;
	}
</script>`;
};
export const DragAndDrop = Template.bind({});
DragAndDrop.args = {
    header: `<div slot="header" class="header">
	<ui5-title>Attachments</ui5-title>
	<ui5-label show-colon>Add new files and press to start uploading pending files</ui5-label>
	<ui5-button id="startUploading">Start</ui5-button>
	<div class="spacer"></div>
	<ui5-file-uploader id="fileUploader" hide-input multiple>
		<ui5-button icon="add" design="Transparent"></ui5-button>
	</ui5-file-uploader>
</div>`,
};
DragAndDrop.parameters = {
    docs: {
        story: {
            iframeHeight: "500px",
        },
    },
};
DragAndDrop.decorators = [
    setHeaderStyles,
    handleFileUpload,
    handleDropEvent,
    handleItemDeleteEvent,
];
//# sourceMappingURL=UploadCollection.stories.js.map