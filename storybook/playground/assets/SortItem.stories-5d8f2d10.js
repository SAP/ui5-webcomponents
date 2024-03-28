import{x as c}from"./lit-element-c5a2b594.js";import{l as s}from"./if-defined-c29cffe1.js";const l={},b={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.16",tagName:"ui5-sort-item",showDefaultStoryOnly:!0};var i=Object.freeze,d=Object.defineProperty,u=(t,m)=>i(d(t,"raw",{value:i(m||t.slice())})),o;const p={title:"Fiori/View Settings Dialog/Sort Item",component:"SortItem",argTypes:l},g=t=>c`<ui5-view-settings-dialog id="vsd1">
    <ui5-sort-item slot="sortItems" text="${s(t.text)}" ?selected="${s(t.selected)}"></ui5-sort-item>
    <ui5-sort-item slot="sortItems" text="Name" selected=""></ui5-sort-item>
</ui5-view-settings-dialog>`,e=g.bind({});e.tags=["_hidden_"];e.args={text:"Current sort item"};e.decorators=[t=>c(o||(o=u([`<ui5-button id="btnOpenDialog1">Open ViewSettingsDialog</ui5-button>
	`,`
	<script>
		btnOpenDialog1.addEventListener("click", function () {
			vsd1.show();
		});
	<\/script>
	`])),t())];e.parameters={docs:{story:{inline:!1,iframeHeight:"500px"}}};var r,n,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:'args => html`<ui5-view-settings-dialog id="vsd1">\n    <ui5-sort-item slot="sortItems" text="${ifDefined(args.text)}" ?selected="${ifDefined(args.selected)}"></ui5-sort-item>\n    <ui5-sort-item slot="sortItems" text="Name" selected=""></ui5-sort-item>\n</ui5-view-settings-dialog>`',...(a=(n=e.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const f=["Basic"],x=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,__namedExportsOrder:f,default:p},Symbol.toStringTag,{value:"Module"}));export{x as C,b as c};
