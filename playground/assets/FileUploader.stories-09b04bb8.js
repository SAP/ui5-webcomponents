import{x as t}from"./lit-element-c5a2b594.js";import{l as a}from"./if-defined-c29cffe1.js";import{o as n}from"./unsafe-html-0ddd83da.js";const v={valueState:{control:"select",options:["None","Success","Warning","Error","Information"]},files:{control:{type:!1}},default:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},valueStateMessage:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},change:{description:`Event is fired when the value of the file path has been changed.

**Note:** Keep in mind that because of the HTML input element of type file, the event is also fired in Chrome browser when the Cancel button of the uploads window is pressed.`,control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"FileList | null"},name:"files",_ui5privacy:"public",description:"The current files."}]}}},M={package:"@ui5/webcomponents",since:"1.0.0-rc.6",tagName:"ui5-file-uploader"};var r=Object.freeze,b=Object.defineProperty,h=(e,g)=>r(b(e,"raw",{value:r(g||e.slice())})),o;const $={title:"Main/FileUploader",component:"FileUploader",argTypes:v},m=e=>t`<ui5-file-uploader
    accept="${a(e.accept)}"
    ?hide-input="${a(e.hideInput)}"
    ?disabled="${a(e.disabled)}"
    ?multiple="${a(e.multiple)}"
    name="${a(e.name)}"
    placeholder="${a(e.placeholder)}"
    value="${a(e.value)}"
    valueState="${a(e.valueState)}"
    id="${a(e.id)}"
>
    ${n(e.default)}
    ${n(e.valueStateMessage)}
</ui5-file-uploader>`,l=m.bind({});l.args={default:'<ui5-button icon="upload" accessible-name-ref="upload-single-file-label">Upload Single File</ui5-button>'};l.decorators=[e=>t`<ui5-label id="upload-single-file-label" style="display: none">File Uploader, which accepts only one file.</ui5-label>
    ${e()}`];const i=m.bind({});i.storyName="Image Uploader";i.args={id:"fileuploader",accept:"image/*",default:'<ui5-button icon="upload" accessible-name-ref="upload-img-label">Upload Images</ui5-button>',multiple:!0};i.decorators=[e=>t(o||(o=h([`<ui5-label id="upload-img-label" style="display: none">File Uploader, which accepts only images.</ui5-label>
	`,`
	<div id="result"></div>
	<script>
		var fileUploader = document.querySelector("#fileuploader"),
		resultDiv = document.querySelector("#result");
		fileUploader.addEventListener("change", function(event) {
			var files = event.target.files;
			if (!files.length) {
				resultDiv.innerHTML = "<ui5-label>No Files Selected</ui5-label>";
			} else {
				resultDiv.innerHTML = "";
				resultDiv.style.marginTop = "1rem";
				for (var i = 0; i < files.length; i++) {
					var img = document.createElement("img");
					img.src = URL.createObjectURL(files[i]);
					img.width = 100;
					img.height = 100;
					img.onload = function() {
						URL.revokeObjectURL(img.src);
					}
					resultDiv.appendChild(img);
				}
			}
		})
	<\/script>`])),e())];i.parameters={docs:{story:{inline:!1}}};var s,d,u;l.parameters={...l.parameters,docs:{...(s=l.parameters)==null?void 0:s.docs,source:{originalSource:'args => html`<ui5-file-uploader\n    accept="${ifDefined(args.accept)}"\n    ?hide-input="${ifDefined(args.hideInput)}"\n    ?disabled="${ifDefined(args.disabled)}"\n    ?multiple="${ifDefined(args.multiple)}"\n    name="${ifDefined(args.name)}"\n    placeholder="${ifDefined(args.placeholder)}"\n    value="${ifDefined(args.value)}"\n    valueState="${ifDefined(args.valueState)}"\n    id="${ifDefined(args.id)}"\n>\n    ${unsafeHTML(args.default)}\n    ${unsafeHTML(args.valueStateMessage)}\n</ui5-file-uploader>`',...(u=(d=l.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var c,p,f;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:'args => html`<ui5-file-uploader\n    accept="${ifDefined(args.accept)}"\n    ?hide-input="${ifDefined(args.hideInput)}"\n    ?disabled="${ifDefined(args.disabled)}"\n    ?multiple="${ifDefined(args.multiple)}"\n    name="${ifDefined(args.name)}"\n    placeholder="${ifDefined(args.placeholder)}"\n    value="${ifDefined(args.value)}"\n    valueState="${ifDefined(args.valueState)}"\n    id="${ifDefined(args.id)}"\n>\n    ${unsafeHTML(args.default)}\n    ${unsafeHTML(args.valueStateMessage)}\n</ui5-file-uploader>`',...(f=(p=i.parameters)==null?void 0:p.docs)==null?void 0:f.source}}};const y=["Basic","Advanced"],U=Object.freeze(Object.defineProperty({__proto__:null,Advanced:i,Basic:l,__namedExportsOrder:y,default:$},Symbol.toStringTag,{value:"Module"}));export{U as C,M as c};
