import{y as i}from"./lit-html.9e2e9691.js";import{D as w}from"./docs.9716d2dc.js";import"./index.766d49cf.js";import"./iframe.8d816ebf.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.2cfeaebe.js";import"./chunk-R4NKYYJA.15989c7a.js";const C={default:{control:{type:"text"}},close:{table:{category:"Methods"}},showAt:{table:{category:"Methods"}}},g={package:"@ui5/webcomponents",since:"1.3.0"};var o=Object.freeze,y=Object.defineProperty,u=(m,S)=>o(y(m,"raw",{value:o(S||m.slice())})),s,a,r;const c="ui5-menu",D={title:"Main/Menu",component:c,subcomponents:{MenuItem:"ui5-menu-item"},parameters:{docs:{page:w({...g,component:c})}},argTypes:C},e=()=>i(s||(s=u([`
<h3>Basic Menu</h3>
    <div class="snippet">
        <ui5-button id="btnOpenBasic" class="samples-margin">Open Menu</ui5-button> <br/>
        <ui5-menu id="menuBasic">
            <ui5-menu-item text="New File" icon="add-document"></ui5-menu-item>
            <ui5-menu-item text="New Folder" icon="add-folder" disabled=""></ui5-menu-item>
            <ui5-menu-item text="Open" icon="open-folder" starts-section=""></ui5-menu-item>
            <ui5-menu-item text="Close"></ui5-menu-item>
            <ui5-menu-item text="Preferences" icon="action-settings" starts-section=""></ui5-menu-item>
            <ui5-menu-item text="Exit" icon="journey-arrive"></ui5-menu-item>
        </ui5-menu>
        <script>
            btnOpenBasic.addEventListener("click", function(event) {
                menuBasic.showAt(btnOpenBasic);
            });
        <\/script>
    </div>
`])));e.parameters={docs:{story:{inline:!1}}};const n=()=>i(a||(a=u([`
<h3>Menu with Sub-menu items</h3>
    <div class="snippet">
        <ui5-button id="btnOpenSubs">Open Menu</ui5-button> <br/>
        <ui5-menu id="menuSubs">
            <ui5-menu-item text="New File" icon="add-document"></ui5-menu-item>
            <ui5-menu-item text="New Folder" icon="add-folder" disabled=""></ui5-menu-item>
            <ui5-menu-item text="Open" icon="open-folder" starts-section="">
                <ui5-menu-item text="Open Locally" icon="open-folder">
                    <ui5-menu-item text="Open from C"></ui5-menu-item>
                    <ui5-menu-item text="Open from D"></ui5-menu-item>
                    <ui5-menu-item text="Open from E"></ui5-menu-item>
                </ui5-menu-item>
                <ui5-menu-item text="Open from Cloud"></ui5-menu-item>
            </ui5-menu-item>
            <ui5-menu-item text="Save" icon="save">
                <ui5-menu-item text="Save Locally" icon="save">
                    <ui5-menu-item text="Save on C" icon="save"></ui5-menu-item>
                    <ui5-menu-item text="Save on D" icon="save"></ui5-menu-item>
                    <ui5-menu-item text="Save on E" icon="save"></ui5-menu-item>
                </ui5-menu-item>
                <ui5-menu-item text="Save on Cloud" icon="upload-to-cloud"></ui5-menu-item>
            </ui5-menu-item>
            <ui5-menu-item text="Close"></ui5-menu-item>
            <ui5-menu-item text="Preferences" icon="action-settings" starts-section=""></ui5-menu-item>
            <ui5-menu-item text="Exit" icon="journey-arrive"></ui5-menu-item>
        </ui5-menu>
        <script>
            btnOpenSubs.addEventListener("click", function(event) {
                menuSubs.showAt(btnOpenSubs);
            });
        <\/script>
    </div>
`])));n.parameters={docs:{story:{inline:!1}}};const t=()=>i(r||(r=u([`
<h3>Menu with additional text on menu items</h3>
    <div class="snippet">
        <ui5-button id="btnOpenAdditionalText" class="samples-margin">Open Menu</ui5-button> <br/>
        <ui5-menu id="menuAdditionalText">
            <ui5-menu-item text="New File" icon="add-document" additional-text="Ctrl+N"></ui5-menu-item>
            <ui5-menu-item text="New Folder" icon="add-folder" additional-text="Ctrl+F" disabled=""></ui5-menu-item>
            <ui5-menu-item text="Open" icon="open-folder" starts-section=""></ui5-menu-item>
            <ui5-menu-item text="Close"></ui5-menu-item>
            <ui5-menu-item text="Preferences" icon="action-settings" starts-section=""></ui5-menu-item>
            <ui5-menu-item text="Exit" icon="journey-arrive" additional-text="Ctrl+X"></ui5-menu-item>
        </ui5-menu>
        <script>
            btnOpenAdditionalText.addEventListener("click", function(event) {
                menuAdditionalText.showAt(btnOpenAdditionalText);
            });
        <\/script>
    </div>
`])));t.parameters={docs:{story:{inline:!1}}};var d,l,p;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`() => html\`
<h3>Basic Menu</h3>
    <div class="snippet">
        <ui5-button id="btnOpenBasic" class="samples-margin">Open Menu</ui5-button> <br/>
        <ui5-menu id="menuBasic">
            <ui5-menu-item text="New File" icon="add-document"></ui5-menu-item>
            <ui5-menu-item text="New Folder" icon="add-folder" disabled=""></ui5-menu-item>
            <ui5-menu-item text="Open" icon="open-folder" starts-section=""></ui5-menu-item>
            <ui5-menu-item text="Close"></ui5-menu-item>
            <ui5-menu-item text="Preferences" icon="action-settings" starts-section=""></ui5-menu-item>
            <ui5-menu-item text="Exit" icon="journey-arrive"></ui5-menu-item>
        </ui5-menu>
        <script>
            btnOpenBasic.addEventListener("click", function(event) {
                menuBasic.showAt(btnOpenBasic);
            });
        <\/script>
    </div>
\``,...(p=(l=e.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var x,b,v;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`() => html\`
<h3>Menu with Sub-menu items</h3>
    <div class="snippet">
        <ui5-button id="btnOpenSubs">Open Menu</ui5-button> <br/>
        <ui5-menu id="menuSubs">
            <ui5-menu-item text="New File" icon="add-document"></ui5-menu-item>
            <ui5-menu-item text="New Folder" icon="add-folder" disabled=""></ui5-menu-item>
            <ui5-menu-item text="Open" icon="open-folder" starts-section="">
                <ui5-menu-item text="Open Locally" icon="open-folder">
                    <ui5-menu-item text="Open from C"></ui5-menu-item>
                    <ui5-menu-item text="Open from D"></ui5-menu-item>
                    <ui5-menu-item text="Open from E"></ui5-menu-item>
                </ui5-menu-item>
                <ui5-menu-item text="Open from Cloud"></ui5-menu-item>
            </ui5-menu-item>
            <ui5-menu-item text="Save" icon="save">
                <ui5-menu-item text="Save Locally" icon="save">
                    <ui5-menu-item text="Save on C" icon="save"></ui5-menu-item>
                    <ui5-menu-item text="Save on D" icon="save"></ui5-menu-item>
                    <ui5-menu-item text="Save on E" icon="save"></ui5-menu-item>
                </ui5-menu-item>
                <ui5-menu-item text="Save on Cloud" icon="upload-to-cloud"></ui5-menu-item>
            </ui5-menu-item>
            <ui5-menu-item text="Close"></ui5-menu-item>
            <ui5-menu-item text="Preferences" icon="action-settings" starts-section=""></ui5-menu-item>
            <ui5-menu-item text="Exit" icon="journey-arrive"></ui5-menu-item>
        </ui5-menu>
        <script>
            btnOpenSubs.addEventListener("click", function(event) {
                menuSubs.showAt(btnOpenSubs);
            });
        <\/script>
    </div>
\``,...(v=(b=n.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var f,O,h;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`() => html\`
<h3>Menu with additional text on menu items</h3>
    <div class="snippet">
        <ui5-button id="btnOpenAdditionalText" class="samples-margin">Open Menu</ui5-button> <br/>
        <ui5-menu id="menuAdditionalText">
            <ui5-menu-item text="New File" icon="add-document" additional-text="Ctrl+N"></ui5-menu-item>
            <ui5-menu-item text="New Folder" icon="add-folder" additional-text="Ctrl+F" disabled=""></ui5-menu-item>
            <ui5-menu-item text="Open" icon="open-folder" starts-section=""></ui5-menu-item>
            <ui5-menu-item text="Close"></ui5-menu-item>
            <ui5-menu-item text="Preferences" icon="action-settings" starts-section=""></ui5-menu-item>
            <ui5-menu-item text="Exit" icon="journey-arrive" additional-text="Ctrl+X"></ui5-menu-item>
        </ui5-menu>
        <script>
            btnOpenAdditionalText.addEventListener("click", function(event) {
                menuAdditionalText.showAt(btnOpenAdditionalText);
            });
        <\/script>
    </div>
\``,...(h=(O=t.parameters)==null?void 0:O.docs)==null?void 0:h.source}}};const z=["Template0","Template1","Template2"];export{e as Template0,n as Template1,t as Template2,z as __namedExportsOrder,D as default};
//# sourceMappingURL=Menu.stories.fe9fe4fd.js.map
