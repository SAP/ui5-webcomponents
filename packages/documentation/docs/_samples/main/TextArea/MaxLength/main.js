import "@ui5/webcomponents/dist/TextArea.js"

const textArea = [...document.getElementsByTagName("ui5-textarea")][0];

debugger;
textArea.addEventListener("input", () => {
	const value = textArea.value;
	const maxlength = textArea.maxlength;

	textArea.valueState = value.length > maxlength ? "Warning" : "None";	
});