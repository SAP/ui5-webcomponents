(function () {
	var uploadCollection = document.getElementById("uploadCollection");

	function fileExtensionToIconName(fileName) {
		switch (fileName.split(".").pop()) {
			case "bmp" :
			case "jpg" :
			case "jpeg" :
			case "png" :
				return "card";
			case "csv" :
			case "xls" :
			case "xlsx" :
				return "excel-attachment";
			case "doc" :
			case "docx" :
			case "odt" :
				return "doc-attachment";
			case "pdf" :
				return "pdf-attachment";
			case "ppt" :
			case "pptx" :
				return "ppt-attachment";
			case "txt" :
				return "document-text";
			default :
				return "document";
		}
	}

	function createThumbnail(fileName) {
		var icon = document.createElement("ui5-icon");
		icon.name = fileExtensionToIconName(fileName);
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

	document.getElementById("changeMode").addEventListener("ui5-change", function(event) {
		uploadCollection.mode = event.detail.selectedOption.textContent;
	});

	document.getElementById("changeType").addEventListener("ui5-change", function(event) {
		uploadCollection.items.forEach(function (uci) {
			uci.type = event.detail.selectedOption.textContent;
		});
	});

	document.getElementById("fileUploader").addEventListener("ui5-change", function(event) {
		var files = event.detail.files;

		for (var i = 0; i < files.length; i++) {
			uploadCollection.appendChild(createUCI(files[i]));
		}
	});

	uploadCollection.addEventListener("ui5-selectionChange", function (event) {
		var selectedItems = event.detail.selectedItems.reduce(function (acc, item) {
			return acc + item.fileName + ",";
		}, "[");

		selectedItems += "]"

		document.getElementById("selectedItems").innerText = selectedItems;
	});

	uploadCollection.addEventListener("ui5-fileDeleted", function (event) {
		uploadCollection.removeChild(event.detail.item)
	});

	uploadCollection.addEventListener("ui5-rename", function (event) {
		document.getElementById("renamedFileIndex").innerText = uploadCollection.items.indexOf(event.target);
	});

	document.getElementById("startUploading").addEventListener("click", function(event) {
		uploadCollection.items.forEach(function (item) {
			if (item.uploadState === "Ready" && item.file) {
				var oXHR = new XMLHttpRequest();
				
				oXHR.open("POST", "/upload", true);
				oXHR.onreadystatechange  = function () {
					if (this.status !== 200) {
						item.uploadState = "Error";
					}
				};
				oXHR.send(item.file);
				item.uploadState="Uploading";
			}
		});
	});

	// DND
	document.getElementById("uploadCollectionDnD").addEventListener("drop", function(event) {
		event.preventDefault();

		var files = event.dataTransfer.files;

		for (var i = 0; i < files.length; i++) {
			uci = createUCI(files[i]);
			document.getElementById("uploadCollectionDnD").appendChild(uci)
		}
	});

	// Upload States
	var uploadCollectionDifferentStates = document.getElementById("uploadCollectionStates");

	uploadCollectionDifferentStates.addEventListener("ui5-retry", function (event) {
		console.log("Retry uploading: ", event.target);
		document.getElementById("uploadStateEvent").innerText = "Retry";
	});

	uploadCollectionDifferentStates.addEventListener("ui5-terminate", function (event) {
		console.log("Terminate uploading of: ", event.target);
		document.getElementById("uploadStateEvent").innerText = "Terminate";
	});
})()