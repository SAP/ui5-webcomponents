import{x as l}from"./lit-element-c5a2b594.js";import{o as u}from"./unsafe-html-0ddd83da.js";import{l as i}from"./if-defined-c29cffe1.js";const p={values:{control:{type:"text"},table:{type:{summary:"Array<FilterItemOption>"}}}},y={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.16",tagName:"ui5-filter-item",showDefaultStoryOnly:!0};var o=Object.freeze,d=Object.defineProperty,c=(e,m)=>o(d(e,"raw",{value:o(m||e.slice())})),r;const f={title:"Fiori/View Settings Dialog/Filter Item",component:"FilterItem",argTypes:p},g=e=>l`<ui5-view-settings-dialog id="vsd1">
    <ui5-filter-item slot="filterItems" text="${i(e.text)}" additional-text="${i(e.additionalText)}">
        ${u(e.values)}
    </ui5-filter-item>
</ui5-view-settings-dialog>`,t=g.bind({});t.tags=["_hidden_"];t.args={text:"Department",values:`<ui5-filter-item-option slot="values" text="Sales"></ui5-filter-item-option>
<ui5-filter-item-option slot="values" text="Management"></ui5-filter-item-option>
<ui5-filter-item-option slot="values" text="PR"></ui5-filter-item-option>`};t.decorators=[e=>l(r||(r=c([`<ui5-button id="btnOpenDialog1">Open ViewSettingsDialog</ui5-button>
	`,`
	<script>
		btnOpenDialog1.addEventListener("click", function () {
			vsd1.show();
		});
	<\/script>
	`])),e())];t.parameters={docs:{story:{inline:!1,iframeHeight:"500px"}}};var n,a,s;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:'args => html`<ui5-view-settings-dialog id="vsd1">\n    <ui5-filter-item slot="filterItems" text="${ifDefined(args.text)}" additional-text="${ifDefined(args.additionalText)}">\n        ${unsafeHTML(args.values)}\n    </ui5-filter-item>\n</ui5-view-settings-dialog>`',...(s=(a=t.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const v=["Basic"],w=Object.freeze(Object.defineProperty({__proto__:null,Basic:t,__namedExportsOrder:v,default:f},Symbol.toStringTag,{value:"Module"}));export{w as C,y as c};
