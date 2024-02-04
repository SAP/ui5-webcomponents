import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type Form from "@ui5/webcomponents/dist/Form.js";
import type { UI5StoryArgs } from "../../../types.js";
import type { StoryArgsSlots } from "./argTypes.js";

const FormEditTemplate: UI5StoryArgs<Form, StoryArgsSlots> = (args) => html`

<ui5-toggle-button id="tbEdit" slot="endContent">Edit</ui5-toggle-button>
<ui5-form id="addressForm" header-text="Address" item-spacing="Large">
	${unsafeHTML(args.default)}
</ui5-form>

<script>
(function () {

const editToggleBtn = document.getElementById("tbEdit");
const addressForm = document.getElementById("addressForm");


const switchContent = (edit) => {
	removeAllContent();

	addressForm.itemSpacing = edit ? "Normal" : "Large";
	addressForm.insertAdjacentHTML("afterbegin",  getTemplate(edit));
};

const removeAllContent = () => {
	while (addressForm.firstChild) {
		addressForm.removeChild(addressForm.firstChild);
	}
};

const getTemplate = (edit) => {
	return edit ? \`<ui5-form-item>
		<ui5-label for="nameInp" slot="labelContent">Name:</ui5-label>
		<ui5-input value="Red Point Stores" id="nameInp"></ui5-input>
	</ui5-form-item>
	
	<ui5-form-item>
		<ui5-label id="cityLbl" for="cityInp" slot="labelContent">ZIPCode/City:</ui5-label>
		<ui5-input id="cityInp" value="411" accessible-name-ref="cityLbl"></ui5-input>
		<ui5-input value="Maintown" accessible-name-ref="cityLbl"></ui5-input>
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label id="streetLbl" for="streetInp" slot="labelContent">Street:</ui5-label>
		<ui5-input id="streetInp" value="Main St" accessible-name-ref="streetLbl"></ui5-input>
		<ui5-input id="streetNumberInp" value="1618" accessible-name-ref="streetLbl"></ui5-input>
	</ui5-form-item>
	
	<ui5-form-item>
		<ui5-label id="countryLbl" for="countrySel" slot="labelContent">Country:</ui5-label>
		<ui5-select id="countrySel" accessible-name-ref="countryLbl">
			<ui5-option>Australia</ui5-option>
			<ui5-option selected>Germany</ui5-option>
			<ui5-option>England</ui5-option>
		</ui5-select>
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label for="wsInp" slot="labelContent">WebSite:</ui5-label>
		<ui5-input value="sap.com" id="wsInp"></ui5-input>
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label for="delInp" slot="labelContent">Delivery address:</ui5-label>
		<ui5-input value="Newtown" id="delInp"></ui5-input>
	</ui5-form-item>\`
	:
	\`<ui5-form-item>
	<ui5-label slot="labelContent">Name:</ui5-label>
		<span>Red Point Stores</span>
	</ui5-form-item>
	
	<ui5-form-item>
		<ui5-label slot="labelContent">ZIPCode/City:</ui5-label>
		<span>411 Maintown</span>
	</ui5-form-item>
	
	<ui5-form-item>
		<ui5-label slot="labelContent">Street:</ui5-label>
		<span>Main St 1618</span>
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label slot="labelContent">Country:</ui5-label>
		<span>Germany</span>
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label for="wsInp" slot="labelContent">WebSite:</ui5-label>
		<ui5-link href="sap.com">sap.com</ui5-link>
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label for="delInp" slot="labelContent">Delivery address:</ui5-label>
		<span>Newtown</span>
	</ui5-form-item>\`;
};


editToggleBtn.addEventListener("click", function (event) {
	switchContent(event.target.pressed);
});

})();
</script>`;
const FormEdit = FormEditTemplate.bind({});
FormEdit.args = {
	default: `
		<ui5-form-item>
			<ui5-label slot="labelContent">Name:</ui5-label>
			<span>Red Point Stores</span>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label slot="labelContent">ZIPCode/City:</ui5-label>
			<span>411 Maintown</span>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label slot="labelContent">Street:</ui5-label>
			<span>Main St 1618</span>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label slot="labelContent">Country:</ui5-label>
			<span>Germany</span>
		</ui5-form-item>
		<ui5-form-item>
			<ui5-label for="wsInp" slot="labelContent">WebSite:</ui5-label>
			<ui5-link href="sap.com">sap.com</ui5-link>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label for="delInp" slot="labelContent">Delivery address:</ui5-label>
			<span>Newtown</span>
		</ui5-form-item>`
};

export { FormEdit };