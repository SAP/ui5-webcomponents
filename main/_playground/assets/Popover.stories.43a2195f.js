import{y as a}from"./lit-html.9e2e9691.js";import{D as c}from"./docs.ac7cb078.js";import"./index.854754ad.js";import"./iframe.7e023a71.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.028c5fc4.js";import"./chunk-R4NKYYJA.15989c7a.js";const d={horizontalAlign:{control:"select",options:["Center","Left","Right","Stretch"]},placementType:{control:"select",options:["Bottom","Left","Right","Top"]},verticalAlign:{control:"select",options:["Bottom","Center","Stretch","Top"]},footer:{control:{type:"text"}},header:{control:{type:"text"}},showAt:{table:{category:"Methods"}},accessibleRole:{control:"select",options:["AlertDialog","Dialog","None"]},default:{control:{type:"text"}},applyFocus:{table:{category:"Methods"}},close:{table:{category:"Methods"}},isOpen:{table:{category:"Methods"}}},v={package:"@ui5/webcomponents",since:"1.0.0-rc.6"};var t=Object.freeze,u=Object.defineProperty,m=(o,l)=>t(u(o,"raw",{value:t(l||o.slice())})),n;const p="ui5-popover",w={title:"Main/Popover",component:p,parameters:{docs:{page:c({...v,component:p})}},argTypes:d},e=()=>a(n||(n=m([`
<h3>Basic Popover</h3>
    <div class="snippet">
        <ui5-button id="openPopoverButton" design="Emphasized">Open Popover</ui5-button>
        <ui5-popover id="hello-popover" header-text="Newsletter subscription">
            <div class="popover-content">
                <div class="flex-column">
                    <ui5-label for="emailInput" required="">Email: </ui5-label>
                    <ui5-input id="emailInput" class="samples-margin-top" style="min-width: 150px;" placeholder="Enter Email"></ui5-input>
                </div>
            </div>
            <div slot="footer" class="popover-footer">
                <div style="flex: 1;"></div>
                <ui5-button id="closePopoverButton" design="Emphasized">Subscribe</ui5-button>
            </div>
        </ui5-popover>
        <script>
            var popoverOpener = document.getElementById("openPopoverButton");
            var popover = document.getElementById("hello-popover");
            var popoverCloser = document.getElementById("closePopoverButton");
            popoverOpener.addEventListener("click", function() {
                popover.showAt(popoverOpener);
            });
            popoverCloser.addEventListener("click", function() {
                popover.close();
            });
        <\/script>
    </div>
`])));e.parameters={docs:{story:{inline:!1}}};var r,i,s;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`() => html\`
<h3>Basic Popover</h3>
    <div class="snippet">
        <ui5-button id="openPopoverButton" design="Emphasized">Open Popover</ui5-button>
        <ui5-popover id="hello-popover" header-text="Newsletter subscription">
            <div class="popover-content">
                <div class="flex-column">
                    <ui5-label for="emailInput" required="">Email: </ui5-label>
                    <ui5-input id="emailInput" class="samples-margin-top" style="min-width: 150px;" placeholder="Enter Email"></ui5-input>
                </div>
            </div>
            <div slot="footer" class="popover-footer">
                <div style="flex: 1;"></div>
                <ui5-button id="closePopoverButton" design="Emphasized">Subscribe</ui5-button>
            </div>
        </ui5-popover>
        <script>
            var popoverOpener = document.getElementById("openPopoverButton");
            var popover = document.getElementById("hello-popover");
            var popoverCloser = document.getElementById("closePopoverButton");
            popoverOpener.addEventListener("click", function() {
                popover.showAt(popoverOpener);
            });
            popoverCloser.addEventListener("click", function() {
                popover.close();
            });
        <\/script>
    </div>
\``,...(s=(i=e.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};const z=["Template0"];export{e as Template0,z as __namedExportsOrder,w as default};
//# sourceMappingURL=Popover.stories.43a2195f.js.map
