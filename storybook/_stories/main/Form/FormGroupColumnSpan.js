import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
const FormGroupColumnSpanTemplate = (args) => html `
<ui5-form header-text="Address" layout="S1 M2 L3 XL4">
	${unsafeHTML(args.default)}
</ui5-form>`;
const FormGroupColumnSpan = FormGroupColumnSpanTemplate.bind({});
FormGroupColumnSpan.args = {
    default: `
	<ui5-form-group header-text="Address" column-span="2">
	<ui5-form-item>
		<ui5-label slot="labelContent">Name:</ui5-label>
		<span>Red Point Stores</span>
	</ui5-form-item>
	
	<ui5-form-item>
		<ui5-label slot="labelContent">ZIP Code/City:</ui5-label>
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
		<ui5-label slot="labelContent">WebSite:</ui5-label>
		<ui5-link href="sap.com">sap.com</ui5-link>
	</ui5-form-item>
</ui5-form-group>

<ui5-form-group header-text="Contact"  column-span="1">
	<ui5-form-item>
		<ui5-label slot="labelContent">Twitter:</ui5-label>
		<span>@sap</span>
	</ui5-form-item>
	
	<ui5-form-item>
		<ui5-label slot="labelContent">Email:</ui5-label>
		<span>john.smith@sap.com</span>
	</ui5-form-item>
	
	<ui5-form-item>
		<ui5-label slot="labelContent">Tel:</ui5-label>
		<span>+49 6227 747474</span>
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label slot="labelContent">SMS:</ui5-label>
		<span>+49 6227 747474</span>
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label slot="labelContent">Mobile:</ui5-label>
		<ui5-link href="sap.com">+49 6227 747474</ui5-link>
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label slot="labelContent">Pager:</ui5-label>
		<ui5-link href="sap.com">+49 6227 747474</ui5-link>
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label slot="labelContent">Fax:</ui5-label>
		<ui5-link href="sap.com">+49 6227 747474</ui5-link>
	</ui5-form-item>

</ui5-form-group>`
};
export { FormGroupColumnSpan };
//# sourceMappingURL=FormGroupColumnSpan.js.map