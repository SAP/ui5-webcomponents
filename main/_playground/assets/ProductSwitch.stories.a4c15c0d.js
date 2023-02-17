import{y as d}from"./lit-html.9e2e9691.js";import{D as h}from"./docs.7a9434d6.js";import"./index.8cb7a9d9.js";import"./iframe.d5a3589f.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.8974bf6a.js";import"./chunk-R4NKYYJA.15989c7a.js";const w={default:{control:{type:"text"}}},x={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.5"};var c=Object.freeze,b=Object.defineProperty,v=(i,m)=>c(b(i,"raw",{value:c(m||i.slice())})),o;const s="ui5-product-switch",k={title:"Fiori/ProductSwitch",component:s,subcomponents:{ProductSwitchItem:"ui5-product-switch-item"},parameters:{docs:{page:h({...x,component:s})}},argTypes:w},e=()=>d`
<h3>Basic sample</h3>
    <div class="snippet">
        <ui5-product-switch style="display:flex;">
            <ui5-product-switch-item title-text="Home" subtitle-text="Central Home" icon="home"></ui5-product-switch-item>
            <ui5-product-switch-item title-text="Analytics Cloud" subtitle-text="Analytics Cloud" icon="business-objects-experience"></ui5-product-switch-item>
            <ui5-product-switch-item title-text="Catalog" subtitle-text="Ariba" icon="contacts"></ui5-product-switch-item>
            <ui5-product-switch-item title-text="Travel &amp; Expense" subtitle-text="Concur" icon="flight"></ui5-product-switch-item>
        </ui5-product-switch>
    </div>
`,t=()=>d(o||(o=v([`
<h3>ProductSwitch within ShellBar</h3>
    <div class="snippet">
        <ui5-shellbar id="shellbar" primary-title="Corporate Portal" secondary-title="home" logo="../assets/images/sap-logo-svg.svg" show-product-switch="" show-co-pilot="">
        </ui5-shellbar>
        <ui5-popover id="productswitch-popover" placement-type="Bottom">
            <ui5-product-switch>
                <ui5-product-switch-item title-text="Home" subtitle-text="Central Home" icon="home"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="Analytics Cloud" subtitle-text="Analytics Cloud" icon="business-objects-experience"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="Catalog" subtitle-text="Ariba" icon="contacts"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="Guided Buying" icon="credit-card"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="Strategic Procurement" icon="cart-3"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="Travel &amp; Expense" subtitle-text="Concur" icon="flight"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="Vendor Management" subtitle-text="Fieldglass" icon="shipping-status"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="Human Capital Management" icon="customer"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="Sales Cloud" subtitle-text="Sales Cloud" icon="sales-notification"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="Commerce Cloud" subtitle-text="Commerce Cloud" icon="retail-store"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="Marketing Cloud" subtitle-text="Marketing Cloud" icon="marketing-campaign"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="Service Cloud" icon="family-care"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="Customer Data Cloud" icon="customer-briefing"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="S/4HANA" icon="batch-payments"></ui5-product-switch-item>
            </ui5-product-switch>
        </ui5-popover>
        <script>
            var shellBar = document.getElementById("shellbar");
            var popover = document.getElementById("productswitch-popover");
            shellbar.addEventListener("product-switch-click", function(event) {
                if (popover.opened) {
                    popover.close();
                } else {
                    event.preventDefault();
                    popover.showAt(event.detail.targetRef);
                }
            });
        <\/script>
    </div>
`])));t.parameters={docs:{story:{inline:!1}}};var u,r,n;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`() => html\`
<h3>Basic sample</h3>
    <div class="snippet">
        <ui5-product-switch style="display:flex;">
            <ui5-product-switch-item title-text="Home" subtitle-text="Central Home" icon="home"></ui5-product-switch-item>
            <ui5-product-switch-item title-text="Analytics Cloud" subtitle-text="Analytics Cloud" icon="business-objects-experience"></ui5-product-switch-item>
            <ui5-product-switch-item title-text="Catalog" subtitle-text="Ariba" icon="contacts"></ui5-product-switch-item>
            <ui5-product-switch-item title-text="Travel &amp; Expense" subtitle-text="Concur" icon="flight"></ui5-product-switch-item>
        </ui5-product-switch>
    </div>
\``,...(n=(r=e.parameters)==null?void 0:r.docs)==null?void 0:n.source}}};var p,l,a;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`() => html\`
<h3>ProductSwitch within ShellBar</h3>
    <div class="snippet">
        <ui5-shellbar id="shellbar" primary-title="Corporate Portal" secondary-title="home" logo="../assets/images/sap-logo-svg.svg" show-product-switch="" show-co-pilot="">
        </ui5-shellbar>
        <ui5-popover id="productswitch-popover" placement-type="Bottom">
            <ui5-product-switch>
                <ui5-product-switch-item title-text="Home" subtitle-text="Central Home" icon="home"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="Analytics Cloud" subtitle-text="Analytics Cloud" icon="business-objects-experience"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="Catalog" subtitle-text="Ariba" icon="contacts"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="Guided Buying" icon="credit-card"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="Strategic Procurement" icon="cart-3"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="Travel &amp; Expense" subtitle-text="Concur" icon="flight"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="Vendor Management" subtitle-text="Fieldglass" icon="shipping-status"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="Human Capital Management" icon="customer"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="Sales Cloud" subtitle-text="Sales Cloud" icon="sales-notification"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="Commerce Cloud" subtitle-text="Commerce Cloud" icon="retail-store"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="Marketing Cloud" subtitle-text="Marketing Cloud" icon="marketing-campaign"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="Service Cloud" icon="family-care"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="Customer Data Cloud" icon="customer-briefing"></ui5-product-switch-item>
                <ui5-product-switch-item title-text="S/4HANA" icon="batch-payments"></ui5-product-switch-item>
            </ui5-product-switch>
        </ui5-popover>
        <script>
            var shellBar = document.getElementById("shellbar");
            var popover = document.getElementById("productswitch-popover");
            shellbar.addEventListener("product-switch-click", function(event) {
                if (popover.opened) {
                    popover.close();
                } else {
                    event.preventDefault();
                    popover.showAt(event.detail.targetRef);
                }
            });
        <\/script>
    </div>
\``,...(a=(l=t.parameters)==null?void 0:l.docs)==null?void 0:a.source}}};const M=["Template0","Template1"];export{e as Template0,t as Template1,M as __namedExportsOrder,k as default};
//# sourceMappingURL=ProductSwitch.stories.a4c15c0d.js.map
