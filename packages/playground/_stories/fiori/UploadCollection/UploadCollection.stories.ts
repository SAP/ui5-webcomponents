import { html } from "lit";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type UploadCollection from "@ui5/webcomponents-fiori/dist/UploadCollection.js";

const component = "ui5-upload-collection";

export default {
    title: "Fiori/UploadCollection",
    component,
    subcomponents: {'UploadCollectionItem' : 'ui5-upload-collection-item'},
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<UploadCollection>;

const Template: UI5StoryArgs<UploadCollection, StoryArgsSlots> = (args) => html`<div></div>`;


export const Template0: StoryFn = () => html`
<h3>UploadCollection</h3>
	<div class="snippet">
		<ui5-upload-collection id="uploadCollection" mode="Delete" accessible-name="Uploaded (2)">
			<div slot="header" class="header">
				<ui5-title>Uploaded (2)</ui5-title>
				<ui5-label>Add new files and press to start uploading pending files:</ui5-label>
				<ui5-button id="startUploading">Start</ui5-button>
				<div class="spacer"></div>
				<ui5-file-uploader id="fileUploader" hide-input="" multiple="">
					<ui5-button icon="add" design="Transparent"></ui5-button>
				</ui5-file-uploader>
			</div>
			<ui5-upload-collection-item file-name="LaptopHT-1000.jpg" file-name-clickable="" upload-state="Complete">
				<img src="../assets/images/HT-1000.jpg" slot="thumbnail">
				Uploaded By: David Keane · Uploaded On: 2014-07-26 · File Size: 35 KB
			</ui5-upload-collection-item>
			<ui5-upload-collection-item file-name="Notes.txt" upload-state="Complete">
				<ui5-icon name="document-text" slot="thumbnail"></ui5-icon>
				Uploaded By: John Smith · Uploaded On: 2014-09-02 · File Size: 226.6 KB ·
			</ui5-upload-collection-item>
		</ui5-upload-collection>
		<script>
			function createThumbnail(fileName) {
				var icon = document.createElement("ui5-icon");
				icon.name = "document";
				icon.slot = "thumbnail";
				return icon;
			}
			function createUCI(file) {
				var uci = document.createElement("ui5-upload-collection-item");
					description = document.createTextNode("Last modified: " + file.lastModifiedDate + ", size: " + file.size);
				uci.appendChild(createThumbnail(file.name));
				uci.appendChild(description);
				uci.file = file;
				uci.fileName = file.name;
				return uci;
			}
			fileUploader.addEventListener("change", function(event) {
				var files = event.detail.files;
				for (var i = 0; i < files.length; i++) {
					uploadCollection.appendChild(createUCI(files[i]));
				}
			});
			startUploading.addEventListener("click", function(event) {
				uploadCollection.items.forEach(function(item) {
					// if there is a file ready to be uploaded send request
					if (item.uploadState === "Ready" && item.file) {
						var oXHR = new XMLHttpRequest();
						oXHR.open("POST", "/upload", true);
						oXHR.onreadystatechange = function () {
							if (this.status !== 200) {
								item.uploadState = "Error";
							}
						};
						oXHR.send(item.file);
						item.uploadState="Uploading";
					}
				});
			});
			uploadCollection.addEventListener("ui5-item-delete", function (event) {
					uploadCollection.removeChild(event.detail.item)
			});
		</script>
	</div>
`;
Template0.parameters = {
	docs: {
		story: {
			// Opt-out of inline rendering
			inline: false,
		},
	}
};

export const Template1: StoryFn = () => html`
<h3>UploadCollection With File Renaming Enabled</h3>
	<div class="snippet">
		<ui5-upload-collection id="uploadCollectionWithRenaming">
			<div slot="header" class="header">
				<ui5-title>Attachments(2)</ui5-title>
			</div>
			<ui5-upload-collection-item file-name="LaptopHT-1000.jpg" file-name-clickable="" type="Detail" upload-state="Complete">
				<img src="../assets/images/HT-1000.jpg" slot="thumbnail">
				Uploaded By: David Keane · Uploaded On: 2014-07-26 · File Size: 35 KB
			</ui5-upload-collection-item>
			<ui5-upload-collection-item file-name="Notes.txt" type="Detail" upload-state="Complete">
				<ui5-icon name="document-text" slot="thumbnail"></ui5-icon>
				Uploaded By: John Smith · Uploaded On: 2014-09-02 · File Size: 226.6 KB ·
			</ui5-upload-collection-item>
		</ui5-upload-collection>
		<script>
			uploadCollectionWithRenaming.addEventListener("rename", function(event) {
				alert("Rename event:" + event.target.fileName)
			});
		</script>
	</div>
`;
Template1.parameters = {
	docs: {
		story: {
			// Opt-out of inline rendering
			inline: false,
		},
	}
};

export const Template2: StoryFn = () => html`
<h3>UploadCollection With Different Uploading States of Items</h3>
	<div class="snippet">
		<ui5-upload-collection id="uploadCollectionStates">
			<div class="header" slot="header">
				<ui5-title>Upload States</ui5-title>
			</div>
			<ui5-upload-collection-item file-name="LaptopHT-1000.jpg" upload-state="Complete">
				<img src="../assets/images/HT-1000.jpg" slot="thumbnail">
				uploadState="Complete"
			</ui5-upload-collection-item>
			<ui5-upload-collection-item file-name="Laptop.jpg" upload-state="Uploading" progress="37">
				<img src="../assets/images/HT-1000.jpg" slot="thumbnail">
				uploadState="Uploading"
			</ui5-upload-collection-item>
			<ui5-upload-collection-item file-name="latest.reports.pdf" upload-state="Error" progress="59">
				<ui5-icon name="document-text" slot="thumbnail"></ui5-icon>
				uploadState="Error"
			</ui5-upload-collection-item>
			<ui5-upload-collection-item file-name="Notes.txt">
				<ui5-icon name="document-text" slot="thumbnail"></ui5-icon>
				uploadState="Ready" (default)
			</ui5-upload-collection-item>
		</ui5-upload-collection>
		<script>
			uploadCollectionStates.addEventListener("retry", function(event) {
				alert("Retry uploading: " + event.target.fileName);
			});
			uploadCollectionStates.addEventListener("terminate", function(event) {
				alert("Terminate uploading of: " + event.target.fileName);
			});
		</script>
	</div>
`;
Template2.parameters = {
	docs: {
		story: {
			// Opt-out of inline rendering
			inline: false,
		},
	}
};

export const Template3: StoryFn = () => html`
<h3>UploadCollection With Drag and Drop and No Initial Data</h3>
	<div class="snippet">
		<ui5-upload-collection id="uploadCollectionDnD" style="height: 30rem;">
			<div class="header" slot="header">
				<ui5-title>Attachments</ui5-title>
			</div>
		</ui5-upload-collection>
		<script>
			uploadCollectionDnD.addEventListener("drop", function(event) {
				event.preventDefault();
				var files = event.dataTransfer.files;
				// Take the files from the drop event and create <ui5-upload-collection-item> from them
				for (var i = 0; i < files.length; i++) {
					uci = createUCI(files[i]);
					uploadCollectionDnD.appendChild(uci)
				}
			});
		</script>
	</div>
`;
Template3.parameters = {
	docs: {
		story: {
			// Opt-out of inline rendering
			inline: false,
		},
	}
};