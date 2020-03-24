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
		var uci = document.createElement("ui5-upload-collection-item"),
			cont = document.createElement("ui5-label");

		uci.appendChild(createThumbnail(file.name));
		uci.file = file;
		uci.fileName = file.name;

		cont.classList.add("description");
		cont.wrap = true;
		cont.textContent = "Last modified: " + file.lastModifiedDate 
						+ ", size: " + file.size;
		uci.appendChild(cont);
		return uci;
	}

	document.getElementById("changeMode").addEventListener("change", function(event) {
		uploadCollection.mode = event.detail.selectedOption.textContent;
	});

	document.getElementById("changeType").addEventListener("change", function(event) {
		uploadCollection.items.forEach(function (uci) {
			uci.type = event.detail.selectedOption.textContent;
		});
	});

	document.getElementById("fileUploader").addEventListener("change", function(event) {
		var files = event.detail.files;

		for (var i = 0; i < files.length; i++) {
			uploadCollection.appendChild(createUCI(files[i]));
		}
	});

	uploadCollection.addEventListener("selectionChange", function (event) {
		var selectedItems = event.detail.selectedItems.reduce(function (acc, item) {
			return acc + item.fileName + ",";
		}, "[");

		selectedItems += "]"

		document.getElementById("selectedItems").innerText = selectedItems;
	});

	uploadCollection.addEventListener("fileDeleted", function (event) {
		uploadCollection.removeChild(event.detail.item)
	});

	document.getElementById("startUploading").addEventListener("click", function(event) {
		uploadCollection.items.forEach(function (item) {
			if (item.file) {
				var oXHR = new XMLHttpRequest();
	
				oXHR.open("POST", "/upload", true);
				oXHR.send(item.file);
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
})()