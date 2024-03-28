import{x as m}from"./lit-element-c5a2b594.js";import{o as i}from"./unsafe-html-0ddd83da.js";import{l as s}from"./if-defined-c29cffe1.js";const c={sortItems:{control:{type:"text"},table:{type:{summary:"Array<SortItem>"}}},filterItems:{control:{type:"text"},table:{type:{summary:"Array<FilterItem>"}}},show:{description:"Shows the dialog.",table:{category:"methods"},UI5CustomData:{returnValue:{type:{text:"void"}}}},setConfirmedSettings:{description:`Sets a JavaScript object, as settings to the \`ui5-view-settings-dialog\`.
This method can be used after the dialog is initially open, as the dialog needs
to set its initial settings.
The \`ui5-view-settings-dialog\` throws an event called "before-open",
which can be used as a trigger point.
The object should have the following format:`,table:{category:"methods"},UI5CustomData:{parameters:[{name:"settings",type:{text:"VSDSettings",references:[{name:"VSDSettings",package:"@ui5/webcomponents-fiori",module:"dist/ViewSettingsDialog.js"}]},description:"predefined settings.",_ui5privacy:"public"}],returnValue:{type:{text:"void"}}}},confirm:{description:"Fired when confirmation button is activated.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"String"},name:"sortOrder",_ui5privacy:"public",description:"The current sort order selected."},{type:{text:"String"},name:"sortBy",_ui5privacy:"public",description:"The currently selected `ui5-sort-item` text attribute."},{type:{text:"HTMLElement"},name:"sortByItem",_ui5privacy:"public",description:"The currently selected `ui5-sort-item`."},{type:{text:"Boolean"},name:"sortDescending",_ui5privacy:"public",description:"The selected sort order (true = descending, false = ascending)."},{type:{text:"Array"},name:"filters",_ui5privacy:"public",description:"The selected filters items."}]}},cancel:{description:"Fired when cancel button is activated.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"String"},name:"sortOrder",_ui5privacy:"public",description:"The current sort order selected."},{type:{text:"String"},name:"sortBy",_ui5privacy:"public",description:"The currently selected `ui5-sort-item` text attribute."},{type:{text:"HTMLElement"},name:"sortByItem",_ui5privacy:"public",description:"The currently selected `ui5-sort-item`."},{type:{text:"Boolean"},name:"sortDescending",_ui5privacy:"public",description:"The selected sort order (true = descending, false = ascending)."},{type:{text:"Array"},name:"filters",_ui5privacy:"public",description:"The selected filters items."}]}}},h={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.16",tagName:"ui5-view-settings-dialog"};var o=Object.freeze,p=Object.defineProperty,d=(t,u)=>o(p(t,"raw",{value:o(u||t.slice())})),r;const f={title:"Fiori/View Settings Dialog",component:"ViewSettingsDialog",subcomponents:{SortItem:"SortItem",FilterItem:"FilterItem",FilterItemOption:"FilterItemOption"},argTypes:c},g=t=>m`<ui5-view-settings-dialog
    id="${s(t.id)}"
    sort-descending="${s(t.sortDescending)}"
>
    ${i(t.sortItems)}
    ${i(t.filterItems)}
</ui5-view-settings-dialog>`,e=g.bind({});e.storyName="Example Usage";e.args={id:"vsd1",sortDescending:!0,sortItems:`<ui5-sort-item slot="sortItems" text="Name" selected=""></ui5-sort-item>
<ui5-sort-item slot="sortItems" text="Position"></ui5-sort-item>
<ui5-sort-item slot="sortItems" text="Company"></ui5-sort-item>
<ui5-sort-item slot="sortItems" text="Department"></ui5-sort-item>`,filterItems:`<ui5-filter-item slot="filterItems" text="Position">
    <ui5-filter-item-option slot="values" text="CTO"></ui5-filter-item-option>
    <ui5-filter-item-option slot="values" text="CPO"></ui5-filter-item-option>
    <ui5-filter-item-option slot="values" text="VP"></ui5-filter-item-option>
</ui5-filter-item>
<ui5-filter-item slot="filterItems" text="Department">
    <ui5-filter-item-option slot="values" text="Sales"></ui5-filter-item-option>
    <ui5-filter-item-option slot="values" text="Management"></ui5-filter-item-option>
    <ui5-filter-item-option slot="values" text="PR"></ui5-filter-item-option>
</ui5-filter-item>
<ui5-filter-item slot="filterItems" text="Location">
    <ui5-filter-item-option slot="values" text="Walldorf"></ui5-filter-item-option>
    <ui5-filter-item-option slot="values" text="New York"></ui5-filter-item-option>
    <ui5-filter-item-option slot="values" text="London"></ui5-filter-item-option>
</ui5-filter-item>
<ui5-filter-item slot="filterItems" text="Reports to">
    <ui5-filter-item-option slot="values" text="CTO"></ui5-filter-item-option>
    <ui5-filter-item-option slot="values" text="CPO"></ui5-filter-item-option>
    <ui5-filter-item-option slot="values" text="VP"></ui5-filter-item-option>
</ui5-filter-item>`};e.decorators=[t=>m(r||(r=d([`<ui5-button id="btnOpenDialog1">Open ViewSettingsDialog</ui5-button>
	`,`
	<br/>
	<br/>
	<div id="vsdResults"></div>
	<script>
		var vsdResults = document.getElementById("vsdResults");
		btnOpenDialog1.addEventListener("click", function () {
			vsdResults.innerHTML = "";
			vsd1.show();
		});
		vsd1.addEventListener("confirm", function(evt) {
			vsdResults.innerHTML = JSON.stringify(evt.detail);
		});
	<\/script>
	`])),t())];e.parameters={docs:{story:{inline:!1,iframeHeight:"500px"}}};var n,l,a;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:'args => html`<ui5-view-settings-dialog\n    id="${ifDefined(args.id)}"\n    sort-descending="${ifDefined(args.sortDescending)}"\n>\n    ${unsafeHTML(args.sortItems)}\n    ${unsafeHTML(args.filterItems)}\n</ui5-view-settings-dialog>`',...(a=(l=e.parameters)==null?void 0:l.docs)==null?void 0:a.source}}};const v=["Basic"],I=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,__namedExportsOrder:v,default:f},Symbol.toStringTag,{value:"Module"}));export{I as C,h as c};
