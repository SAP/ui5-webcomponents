import{y as a}from"./lit-html.9e2e9691.js";import{D as c}from"./docs.7a9434d6.js";import"./index.8cb7a9d9.js";import"./iframe.d5a3589f.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.8974bf6a.js";import"./chunk-R4NKYYJA.15989c7a.js";const d={close:{table:{category:"Methods"}},isOpen:{table:{category:"Methods"}},showAt:{table:{category:"Methods"}},horizontalAlign:{control:"select",options:["Center","Left","Right","Stretch"]},placementType:{control:"select",options:["Bottom","Left","Right","Top"]},verticalAlign:{control:"select",options:["Bottom","Center","Stretch","Top"]},footer:{control:{type:"text"}},header:{control:{type:"text"}},accessibleRole:{control:"select",options:["AlertDialog","Dialog","None"]},default:{control:{type:"text"}},applyFocus:{table:{category:"Methods"}}},u={package:"@ui5/webcomponents",since:"1.0.0-rc.6"};var t=Object.freeze,v=Object.defineProperty,m=(o,l)=>t(v(o,"raw",{value:t(l||o.slice())})),n;const p="ui5-responsive-popover",_={title:"Main/ResponsivePopover",component:p,parameters:{docs:{page:c({...u,component:p})}},argTypes:d},e=()=>a(n||(n=m([`
<h3>Basic ResponsivePopover</h3>
    <div class="snippet">
        <ui5-button id="openBtn" design="Emphasized">Open ResponsivePopover</ui5-button>
        <ui5-responsive-popover id="hello-popover" header-text="Newsletter subscription">
            <div style="width: auto;padding: 2rem;display: flex;flex-direction: column;justify-content: center;">
                <ui5-label for="emailInput" required="">Email: </ui5-label>
                <ui5-input id="emailInput" class="samples-margin-top" style="min-width: 150px;" placeholder="Enter Email"></ui5-input>
                <ui5-label>Note: If you open the page in mobile, dialog would be displayed.</ui5-label>
            </div>
            <div slot="footer" class="popover-footer">
                <ui5-button id="closePopoverButton" design="Emphasized">Subscribe</ui5-button>
            </div>
        </ui5-responsive-popover>
        <script>
            var popover = document.getElementById("hello-popover");
            var popoverOpener = document.getElementById("openBtn");
            var popoverCloser = document.getElementById("closePopoverButton");
            popoverOpener.addEventListener("click", function() {
                popover.showAt(popoverOpener);
            });
            popoverCloser.addEventListener("click", function() {
                popover.close();
            });
        <\/script>
    </div>
`])));e.parameters={docs:{story:{inline:!1}}};var i,r,s;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`() => html\`
<h3>Basic ResponsivePopover</h3>
    <div class="snippet">
        <ui5-button id="openBtn" design="Emphasized">Open ResponsivePopover</ui5-button>
        <ui5-responsive-popover id="hello-popover" header-text="Newsletter subscription">
            <div style="width: auto;padding: 2rem;display: flex;flex-direction: column;justify-content: center;">
                <ui5-label for="emailInput" required="">Email: </ui5-label>
                <ui5-input id="emailInput" class="samples-margin-top" style="min-width: 150px;" placeholder="Enter Email"></ui5-input>
                <ui5-label>Note: If you open the page in mobile, dialog would be displayed.</ui5-label>
            </div>
            <div slot="footer" class="popover-footer">
                <ui5-button id="closePopoverButton" design="Emphasized">Subscribe</ui5-button>
            </div>
        </ui5-responsive-popover>
        <script>
            var popover = document.getElementById("hello-popover");
            var popoverOpener = document.getElementById("openBtn");
            var popoverCloser = document.getElementById("closePopoverButton");
            popoverOpener.addEventListener("click", function() {
                popover.showAt(popoverOpener);
            });
            popoverCloser.addEventListener("click", function() {
                popover.close();
            });
        <\/script>
    </div>
\``,...(s=(r=e.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};const R=["Template0"];export{e as Template0,R as __namedExportsOrder,_ as default};
//# sourceMappingURL=ResponsivePopover.stories.9cf26107.js.map
