import{x as a}from"./lit-element-c5a2b594.js";import{l as i}from"./if-defined-c29cffe1.js";const p={},x={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.16",tagName:"ui5-filter-item-option",showDefaultStoryOnly:!0};var n=Object.freeze,u=Object.defineProperty,c=(t,m)=>n(u(t,"raw",{value:n(m||t.slice())})),o;const f={title:"Fiori/View Settings Dialog/Filter Item Option",component:"FilterItemOption",argTypes:p},d=t=>a`<ui5-view-settings-dialog id="vsd1">
    <ui5-filter-item slot="filterItems" text="Department">
        <ui5-filter-item-option
            slot="values"
            text="${i(t.text)}"
            ?selected="${i(t.selected)}"
        ></ui5-filter-item-option>
        <ui5-filter-item-option
            slot="values"
            text="Management"
        ></ui5-filter-item-option>
    </ui5-filter-item>
</ui5-view-settings-dialog>`,e=d.bind({});e.tags=["_hidden_"];e.args={text:"Current filter item option",selected:!0};e.decorators=[t=>a(o||(o=c([`<ui5-button id="btnOpenDialog1">Open ViewSettingsDialog</ui5-button>
	`,`
	<script>
		btnOpenDialog1.addEventListener("click", function () {
			vsd1.show();
		});
	<\/script>
	`])),t())];e.parameters={docs:{story:{inline:!1,iframeHeight:"500px"}}};var r,s,l;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`args => html\`<ui5-view-settings-dialog id="vsd1">
    <ui5-filter-item slot="filterItems" text="Department">
        <ui5-filter-item-option
            slot="values"
            text="\${ifDefined(args.text)}"
            ?selected="\${ifDefined(args.selected)}"
        ></ui5-filter-item-option>
        <ui5-filter-item-option
            slot="values"
            text="Management"
        ></ui5-filter-item-option>
    </ui5-filter-item>
</ui5-view-settings-dialog>\``,...(l=(s=e.parameters)==null?void 0:s.docs)==null?void 0:l.source}}};const g=["Basic"],O=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,__namedExportsOrder:g,default:f},Symbol.toStringTag,{value:"Module"}));export{O as C,x as c};
