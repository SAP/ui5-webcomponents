import{y as u}from"./lit-html.9e2e9691.js";import{D as p}from"./docs.7a9434d6.js";import"./index.8cb7a9d9.js";import"./iframe.d5a3589f.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.8974bf6a.js";import"./chunk-R4NKYYJA.15989c7a.js";const a={filterItems:{control:{type:"text"}},sortItems:{control:{type:"text"}},setConfirmedSettings:{table:{category:"Methods"}},show:{table:{category:"Methods"}}},f={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.16"};var e=Object.freeze,v=Object.defineProperty,d=(i,m)=>e(v(i,"raw",{value:e(m||i.slice())})),o;const n="ui5-view-settings-dialog",C={title:"Fiori/ViewSettingsDialog",component:n,subcomponents:{SortItem:"ui5-sort-item",FilterItem:"ui5-filter-item",FilterItemOption:"ui5-filter-item-option"},parameters:{docs:{page:p({...f,component:n})}},argTypes:a},t=()=>u(o||(o=d([`
<h3>Usage</h3>
    <div class="snippet">
        <ui5-button id="btnOpenDialog1">Open ViewSettingsDialog</ui5-button>
        <ui5-view-settings-dialog id="vsd1">
                <ui5-sort-item slot="sortItems" text="Name" selected=""></ui5-sort-item>
                <ui5-sort-item slot="sortItems" text="Position"></ui5-sort-item>
                <ui5-sort-item slot="sortItems" text="Company"></ui5-sort-item>
                <ui5-sort-item slot="sortItems" text="Department"></ui5-sort-item>
                <ui5-filter-item slot="filterItems" text="Position">
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
                </ui5-filter-item>
            </ui5-view-settings-dialog>
        <br/>
        <br/>
        <div id="vsdResults"></div>
    </div>
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
`])));t.parameters={docs:{story:{inline:!1}}};var s,l,r;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`() => html\`
<h3>Usage</h3>
    <div class="snippet">
        <ui5-button id="btnOpenDialog1">Open ViewSettingsDialog</ui5-button>
        <ui5-view-settings-dialog id="vsd1">
                <ui5-sort-item slot="sortItems" text="Name" selected=""></ui5-sort-item>
                <ui5-sort-item slot="sortItems" text="Position"></ui5-sort-item>
                <ui5-sort-item slot="sortItems" text="Company"></ui5-sort-item>
                <ui5-sort-item slot="sortItems" text="Department"></ui5-sort-item>
                <ui5-filter-item slot="filterItems" text="Position">
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
                </ui5-filter-item>
            </ui5-view-settings-dialog>
        <br/>
        <br/>
        <div id="vsdResults"></div>
    </div>
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
\``,...(r=(l=t.parameters)==null?void 0:l.docs)==null?void 0:r.source}}};const S=["Template0"];export{t as Template0,S as __namedExportsOrder,C as default};
//# sourceMappingURL=ViewSettingsDialog.stories.795d4e80.js.map
