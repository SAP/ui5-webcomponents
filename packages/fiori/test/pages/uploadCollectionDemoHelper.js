(function () {
	var pendingFiles = [],
		uploadCollection = document.getElementById("uploadCollection");

	function removePendingFile (uci) {
		pendingFiles = pendingFiles.filter(function (o) {
			return o.associatedItem !== uci;
		});
	}

	function fileExtensionToIcon(fileName) {
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

	function createUCI(settings) {
		var uci = document.createElement("ui5-upload-collection-item"),
			cont = document.createElement("ui5-label");

		uci.fileName = settings.name;
		uci.icon = fileExtensionToIcon(settings.name);
		cont.classList.add("description");
		cont.wrap = true;
		cont.textContent = "Last modified: " + settings.lastModifiedDate 
						+ ", size: " + settings.size;
		uci.appendChild(cont);
		return uci;
	}

	document.getElementById("changeMode").addEventListener("change", function(event) {
		uploadCollection.mode = event.detail.selectedOption.textContent;
	});

	document.getElementById("fileUploader").addEventListener("change", function(event) {
		var files = event.detail.files;

		for (var i = 0; i < files.length; i++) {
			uci = createUCI(files[i]);
			
			uploadCollection.appendChild(uci)
			pendingFiles.push({
				file: files[i],
				associatedItem: uci
			});
		}
	});

	document.getElementById("cb1").addEventListener("change", function(event) {
		uploadCollection.items.forEach(function (item) {
			item.editable = event.target.checked;
		});
	});

	uploadCollection.addEventListener("itemDelete", function (event) {
		removePendingFile(event.detail.item);
		uploadCollection.removeChild(event.detail.item)
	});

	document.getElementById("startUploading").addEventListener("click", function(event) {
		pendingFiles.forEach(function (file) {
			var oXHR = new XMLHttpRequest();

			oXHR.open("POST", "/backend", true);
			oXHR.send(file);
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