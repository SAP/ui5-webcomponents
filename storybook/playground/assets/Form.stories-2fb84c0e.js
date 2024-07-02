import{x as t}from"./lit-element-c5a2b594.js";import{o as l}from"./unsafe-html-0ddd83da.js";import{l as i}from"./if-defined-c29cffe1.js";import{F as D}from"./FormItemSpacing-c50221fe.js";const O={itemSpacing:{control:"select",options:["Normal","Large"]},header:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},default:{control:{type:"text"},table:{type:{summary:"Array<IFormItem>"}}}},me={package:"@ui5/webcomponents",since:"2.0.0",tagName:"ui5-form"},z=e=>t`
<ui5-form header-text="Address" layout="S1 M2 L3 XL4">
	${l(e.default)}
</ui5-form>`,q=z.bind({});q.args={default:`
	<ui5-form-group header-text="Address">
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

<ui5-form-group header-text="Contact">
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

</ui5-form-group>

<ui5-form-group header-text="Other info">
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
	</ui5-form-group>`};var b=Object.freeze,H=Object.defineProperty,U=(e,p)=>b(H(e,"raw",{value:b(p||e.slice())})),d;const J=e=>t(d||(d=U([`

<ui5-toggle-button id="tbEdit" slot="endContent">Edit</ui5-toggle-button>
<ui5-form id="addressForm" header-text="Address" item-spacing="Large">
	`,`
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
		<ui5-label id="cityLbl" for="cityInp" slot="labelContent">ZIP Code/City:</ui5-label>
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
<\/script>`],[`

<ui5-toggle-button id="tbEdit" slot="endContent">Edit</ui5-toggle-button>
<ui5-form id="addressForm" header-text="Address" item-spacing="Large">
	`,`
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
	return edit ? \\\`<ui5-form-item>
		<ui5-label for="nameInp" slot="labelContent">Name:</ui5-label>
		<ui5-input value="Red Point Stores" id="nameInp"></ui5-input>
	</ui5-form-item>
	
	<ui5-form-item>
		<ui5-label id="cityLbl" for="cityInp" slot="labelContent">ZIP Code/City:</ui5-label>
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
	</ui5-form-item>\\\`
	:
	\\\`<ui5-form-item>
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
		<ui5-label for="wsInp" slot="labelContent">WebSite:</ui5-label>
		<ui5-link href="sap.com">sap.com</ui5-link>
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label for="delInp" slot="labelContent">Delivery address:</ui5-label>
		<span>Newtown</span>
	</ui5-form-item>\\\`;
};


editToggleBtn.addEventListener("click", function (event) {
	switchContent(event.target.pressed);
});

})();
<\/script>`])),l(e.default)),B=J.bind({});B.args={default:`
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
			<ui5-label for="wsInp" slot="labelContent">WebSite:</ui5-label>
			<ui5-link href="sap.com">sap.com</ui5-link>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label for="delInp" slot="labelContent">Delivery address:</ui5-label>
			<span>Newtown</span>
		</ui5-form-item>`};var f=Object.freeze,K=Object.defineProperty,Q=(e,p)=>f(K(e,"raw",{value:f(p||e.slice())})),c;const V=e=>t(c||(c=Q([`
<ui5-slider id="slider" min="1" max="100" value="100" style="width: 1250px;"></ui5-slider>

<div id="container" style="width: 1250px;">
	<ui5-form header-text="`,'" layout="','" label-span="','" item-spacing="',`">
		`,`
	</ui5-form>
</div>

<script>
		document.getElementById("slider").addEventListener("ui5-input", function (event) {
			document.getElementById("container").style.width = (event.target.value/100 * 1250) + 'px';
		});
<\/script>`])),i(e.headerText),i(e.layout),i(e.labelSpan),i(e.itemSpacing),l(e.default)),W=V.bind({});W.args={headerText:"Address",layout:"S1 M1 L2 XL2",labelSpan:"S12 M4 L4 XL4",itemSpacing:D.Normal,default:`
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
		</ui5-form-item>`};const Y=e=>t`
<div id="container" style="width: 1250px"; max-width: 100%>

	<ui5-form header-text="Address (labels on top)" layout="${i(e.layout)}" label-span="${i(e.labelSpan)}">
		${l(e.default)}
	</ui5-form>

	<br><br>

	<ui5-form header-text="Address (labels take half of FormItem)" layout="S1 M2 L2 XL2" label-span="S6 M6 L6 XL6">
		<ui5-form-group header-text="Address">
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

			<ui5-form-item>
				<ui5-label slot="labelContent">Twitter:</ui5-label>
				<span>@sap</span>
			</ui5-form-item>
			
			<ui5-form-item>
				<ui5-label slot="labelContent">Email:</ui5-label>
				<span>john.smith@sap.com</span>
			</ui5-form-item>
		</ui5-form-group>
	</ui5-form>
</div>
`,j=Y.bind({});j.args={labelSpan:"S12 M12 L12 XL12",layout:"S1 M2 L2 XL2",default:`
	<ui5-form-group header-text="Address">
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

		<ui5-form-item>
			<ui5-label slot="labelContent">Twitter:</ui5-label>
			<span>@sap</span>
		</ui5-form-item>
		
		<ui5-form-item>
			<ui5-label slot="labelContent">Email:</ui5-label>
			<span>john.smith@sap.com</span>
		</ui5-form-item>
	</ui5-form-group>`};const ee=e=>t`
<ui5-form header-text="Address" layout="S1 M2 L3 XL4">
	${l(e.default)}
</ui5-form>`,R=ee.bind({});R.args={default:`
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

</ui5-form-group>`};const ie=e=>t`
<ui5-form header-text="Personal Data" layout="${i(e.layout)}" label-span="${i(e.labelSpan)}">
	${l(e.default)}
</ui5-form>
`,X=ie.bind({});X.args={labelSpan:"S12 M12 L12 XL12",layout:"S1 M1 L1 XL1",default:`
	<ui5-form-group>
		<ui5-form-item>
			<ui5-label for="nameInpSingleGroup" slot="labelContent">Name:</ui5-label>
			<ui5-input id="nameInpSingleGroup" value="Typed text"></ui5-input>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-form-item>
				<ui5-label for="addressInpSingleGroup" slot="labelContent">Address:</ui5-label>
				<ui5-input id="addressInpSingleGroup" value="Typed text"></ui5-input>
			</ui5-form-item>
			<ui5-form-item>
				<ui5-label for="countrySelSingleGroup" slot="labelContent">Country:</ui5-label>
				<ui5-select id="countrySelSingleGroup" accessible-name-ref="countryLbl">
					<ui5-option>Australia</ui5-option>
					<ui5-option selected>Germany</ui5-option>
					<ui5-option>England</ui5-option>
				</ui5-select>
			</ui5-form-item>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label for="streetInpSingleGroup" slot="labelContent">Additional Comments:</ui5-label>
			<ui5-textarea id="streetInpSingleGroup" placeholder="Write your message here" show-exceeded-text  maxlength="10"></ui5-textarea>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-checkbox id="cbSingleGroup" text="Home Address:"></ui5-checkbox>
		</ui5-form-item>
	</ui5-form-group>`};const te=e=>t`
<div id="container" style="width: 1250px"; max-width: 100%>

	<ui5-form header-text="Address" layout="${i(e.layout)}" label-span="${i(e.labelSpan)}">
		${l(e.default)}
	</ui5-form>

</div>
`,Z=te.bind({});Z.args={labelSpan:"S12 M12 L12 XL12",layout:"S1 M2 L3 XL3",default:`
	<ui5-form-group header-text="Group1 (Text Fields)" column-span="2">

		<ui5-form-item>
			<ui5-label required for="nameInp1" slot="labelContent">Label:</ui5-label>
			<ui5-input id="nameInp1" value="Typed text"></ui5-input>
		</ui5-form-item>
		
		<ui5-form-item>
			<ui5-label required for="cityInp1" slot="labelContent">Label:</ui5-label>
			<div class="row-align-center">
				<ui5-input id="cityInp1" placeholder="Placeholder" style="flex-grow: 1; margin-inline-end: 0.25rem;"></ui5-input>
				<span class="text">UNIT</span>
			</div>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label required for="streetInp1" slot="labelContent">Label:</ui5-label>
			<ui5-textarea id="streetInp1" placeholder="Write your message here" show-exceeded-text  maxlength="10"></ui5-textarea>
		</ui5-form-item>
		
		<ui5-form-item>
			<ui5-label required for="cityInp2" slot="labelContent">Label:</ui5-label>
			<div class="row-align-center">
				<ui5-input id="cityInp2"  placeholder="Placeholder" style="flex-grow: 1; margin-inline-end: 0.25rem;"></ui5-input>
				<ui5-icon name="decline"></ui5-icon>
			</div>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label required slot="labelContent">Label:</ui5-label>
			<ui5-file-uploader placeholder="Choose a file">
				<ui5-button>Browse...</ui5-button>
			</ui5-file-uploader>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label required for="durationInp" slot="labelContent">Duration:</ui5-label>
			<ui5-time-picker id="durationInp" format-pattern="hh:mm:ss" value="12:00:01"></ui5-time-picker>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label required for="cityInp3" slot="labelContent">Label:</ui5-label>
			<ui5-input id="cityInp3" placeholder="Placeholder"></ui5-input>
			<ui5-input placeholder="Placeholder"></ui5-input>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label required for="mcb-grouping" slot="labelContent">Label:</ui5-label>
			<ui5-multi-input id="mcb-grouping" show-value-help-icon>
				<ui5-token slot="tokens" text="Amet"></ui5-token>
				<ui5-token slot="tokens" text="Incididunt"></ui5-token>
				<ui5-token slot="tokens" text="laboris"></ui5-token>
				<ui5-token slot="tokens" text="ea"></ui5-token>
				<ui5-token slot="tokens" text="eu"></ui5-token>
				<ui5-token slot="tokens" text="ipsum"></ui5-token>
				<ui5-token slot="tokens" text="do"></ui5-token>
				<ui5-token slot="tokens" text="esse"></ui5-token>
				<ui5-token slot="tokens" text="eu"></ui5-token>
				<ui5-token slot="tokens" text="amet"></ui5-token>
				<ui5-token slot="tokens" text="do"></ui5-token>
			</ui5-multi-input>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label required for="stepInput1" slot="labelContent">Label:</ui5-label>
			<ui5-step-input id="stepInput1" value="50" style="width: 50%"></ui5-step-input>
		</ui5-form-item>
	</ui5-form-group>

	<ui5-form-group header-text="Group2 (Cb, Rb, Switch)">
		<ui5-form-item>
			<ui5-checkbox text="Here comes your checkbox text"></ui5-checkbox>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label for="rd1" required slot="labelContent">Label:</ui5-label>

			<div role="radiogroup" class="radioGroup">
				<ui5-radio-button id="rd1" text="With Text" name="test"></ui5-radio-button>
				<ui5-radio-button id="rd2" text="With Tex" name="test"></ui5-radio-button>
			</div>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label required slot="labelContent">Label:</ui5-label>
			<ui5-switch checked></ui5-switch>
		</ui5-form-item>
	</ui5-form-group>

	<ui5-form-group header-text="Group3 (Select Fields)">
		<ui5-form-item>
			<ui5-label required for="countrySel1" slot="labelContent">Label:</ui5-label>
			<ui5-select id="countrySel1" accessible-name-ref="countryLbl">
				<ui5-option>Australia</ui5-option>
				<ui5-option selected>Germany</ui5-option>
				<ui5-option>England</ui5-option>
			</ui5-select>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label required for="countrySel2" slot="labelContent">Label:</ui5-label>
			<ui5-select id="countrySel2" accessible-name-ref="countryLbl">
				<ui5-option>Australia</ui5-option>
				<ui5-option>Germany</ui5-option>
				<ui5-option selected>England</ui5-option>
			</ui5-select>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label required for="mcb-grouping1" slot="labelContent">Label:</ui5-label>
			<ui5-multi-input id="mcb-grouping1" show-value-help-icon>
				<ui5-token slot="tokens" text="laboris"></ui5-token>
				<ui5-token slot="tokens" text="ipsum"></ui5-token>
				<ui5-token slot="tokens" text="esse"></ui5-token>
				<ui5-token slot="tokens" text="amet"></ui5-token>
			</ui5-multi-input>
		</ui5-form-item>
	</ui5-form-group>

	<ui5-form-group header-text="Group4 (Date & Time Fields)">
		<ui5-form-item>
			<ui5-label required for="dp1" slot="labelContent">Label:</ui5-label>
			<ui5-date-picker id="dp1"></ui5-date-picker>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label required for="dtp1" slot="labelContent">Label:</ui5-label>
			<ui5-daterange-picker id="dtp1"></ui5-daterange-picker>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label required for="dtp2" slot="labelContent">Label:</ui5-label>
			<ui5-datetime-picker id="dtp2"></ui5-datetime-picker>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label required for="dtp3" slot="labelContent">Label:</ui5-label>
			<ui5-time-picker id="dtp3"></ui5-time-picker>
		</ui5-form-item>
	</ui5-form-group>

	<ui5-form-group header-text="Group 5 (Example with Slider)">
		<ui5-form-item>
			<ui5-label for="rs" required slot="labelContent">Label:</ui5-label>
			<ui5-range-slider id="rs" start-value="40" end-value="60"></ui5-range-slider>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label  for="rs2" required slot="labelContent">Label:</ui5-label>
			<ui5-slider id="rs2" value="20"></ui5-slider>
		</ui5-form-item>
	</ui5-form-group>`};const le={title:"Main/Form",component:"Form",argTypes:O},o=W,n=j,u=B,a=q,r=R,m=X,s=Z;var C,y,S;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:"FormBasicStory",...(S=(y=o.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var g,h,k;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:"FormLabelSpanStory",...(k=(h=n.parameters)==null?void 0:h.docs)==null?void 0:k.source}}};var x,L,I;u.parameters={...u.parameters,docs:{...(x=u.parameters)==null?void 0:x.docs,source:{originalSource:"FormEditStory",...(I=(L=u.parameters)==null?void 0:L.docs)==null?void 0:I.source}}};var v,w,F;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:"FormGroupStory",...(F=(w=a.parameters)==null?void 0:w.docs)==null?void 0:F.source}}};var G,M,T;r.parameters={...r.parameters,docs:{...(G=r.parameters)==null?void 0:G.docs,source:{originalSource:"FormGroupColumnSpanStory",...(T=(M=r.parameters)==null?void 0:M.docs)==null?void 0:T.source}}};var P,E,A;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:"FormSingleGroupStory",...(A=(E=m.parameters)==null?void 0:E.docs)==null?void 0:A.source}}};var N,$,_;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{originalSource:"FormMultipleGroupsStory",...(_=($=s.parameters)==null?void 0:$.docs)==null?void 0:_.source}}};const oe=["FormBasic","FormLabelSpan","FormEdit","FormGroup","FormGroupColumnSpan","FormSingleGroup","FormMultipleGroups"],se=Object.freeze(Object.defineProperty({__proto__:null,FormBasic:o,FormEdit:u,FormGroup:a,FormGroupColumnSpan:r,FormLabelSpan:n,FormMultipleGroups:s,FormSingleGroup:m,__namedExportsOrder:oe,default:le},Symbol.toStringTag,{value:"Module"}));export{se as C,me as c};
