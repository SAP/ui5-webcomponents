
var select = document.getElementById("languageSelect");

var labelText = {
	"en": "This is a label",
	"fr": "c'est une étiquette",
	"zh-CN": "这是一个标签",
	"zh-Hans": "这是一个标签",
	"zh-TW": "這是一個標籤",
	"zh-Hant": "這是一個標籤"
}

function updateLabelsText(lang) {
	document.getElementById("differentLanguages").querySelectorAll("ui5-label").forEach(function (label) {
		label.innerText = labelText[lang];
	})
}

select.addEventListener("ui5-change", function (e) {
	var lang = e.detail.selectedOption.id;

	window["sap-ui-webcomponents-bundle"].configuration.setLanguage(lang);
	updateLabelsText(lang);
});

updateLabelsText("en");