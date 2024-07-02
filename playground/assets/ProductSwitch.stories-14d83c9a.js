import{x as p}from"./lit-element-c5a2b594.js";import{o as h}from"./unsafe-html-0ddd83da.js";const w={default:{control:{type:"text"},table:{type:{summary:"Array<IProductSwitchItem>"}}}},y={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.5",tagName:"ui5-product-switch"};var c=Object.freeze,x=Object.defineProperty,g=(e,m)=>c(x(e,"raw",{value:c(m||e.slice())})),o;const b={title:"Fiori/Product Switch",component:"ProductSwitch",argTypes:w},d=e=>p`
    <ui5-product-switch> ${h(e.default)} </ui5-product-switch>
`,i=d.bind({});i.args={default:`
    <ui5-product-switch-item title-text="Home" subtitle-text="Central Home" icon="home"></ui5-product-switch-item>
    <ui5-product-switch-item title-text="Analytics Cloud" subtitle-text="Analytics Cloud" icon="business-objects-experience"></ui5-product-switch-item>
    <ui5-product-switch-item title-text="Catalog" subtitle-text="Ariba" icon="contacts"></ui5-product-switch-item>
    <ui5-product-switch-item title-text="Travel &amp; Expense" subtitle-text="Concur" icon="flight"></ui5-product-switch-item>
`};const t=d.bind({});t.decorators=[e=>p(o||(o=g([`
        <ui5-shellbar
            id="shellbar"
            primary-title="Corporate Portal"
            secondary-title="home"
            logo="../assets/images/sap-logo-svg.svg"
            show-product-switch=""
            show-co-pilot=""
        >
        </ui5-shellbar>
        <ui5-popover id="productswitch-popover" placement-type="Bottom">
            `,`
        </ui5-popover>
        <script>
            var shellBar = document.getElementById("shellbar");
            var popover = document.getElementById("productswitch-popover");
            shellbar.addEventListener("product-switch-click", (event) => {
                if (popover.opened) {
                    popover.close();
                } else {
                    event.preventDefault();
                    popover.showAt(event.detail.targetRef);
                }
            });
        <\/script>
    `])),e())];t.args={default:`
    <ui5-product-switch-item
        title-text="Home"
        subtitle-text="Central Home"
        icon="home"
    ></ui5-product-switch-item>
    <ui5-product-switch-item
        title-text="Analytics Cloud"
        subtitle-text="Analytics Cloud"
        icon="business-objects-experience"
    ></ui5-product-switch-item>
    <ui5-product-switch-item
        title-text="Catalog"
        subtitle-text="Ariba"
        icon="contacts"
    ></ui5-product-switch-item>
    <ui5-product-switch-item
        title-text="Guided Buying"
        icon="credit-card"
    ></ui5-product-switch-item>
    <ui5-product-switch-item
        title-text="Strategic Procurement"
        icon="cart-3"
    ></ui5-product-switch-item>
    <ui5-product-switch-item
        title-text="Travel &amp; Expense"
        subtitle-text="Concur"
        icon="flight"
    ></ui5-product-switch-item>
    <ui5-product-switch-item
        title-text="Vendor Management"
        subtitle-text="Fieldglass"
        icon="shipping-status"
    ></ui5-product-switch-item>
    <ui5-product-switch-item
        title-text="Human Capital Management"
        icon="customer"
    ></ui5-product-switch-item>
    <ui5-product-switch-item
        title-text="Sales Cloud"
        subtitle-text="Sales Cloud"
        icon="sales-notification"
    ></ui5-product-switch-item>
    <ui5-product-switch-item
        title-text="Commerce Cloud"
        subtitle-text="Commerce Cloud"
        icon="retail-store"
    ></ui5-product-switch-item>
    <ui5-product-switch-item
        title-text="Marketing Cloud"
        subtitle-text="Marketing Cloud"
        icon="marketing-campaign"
    ></ui5-product-switch-item>
    <ui5-product-switch-item
        title-text="Service Cloud"
        icon="family-care"
    ></ui5-product-switch-item>
    <ui5-product-switch-item
        title-text="Customer Data Cloud"
        icon="customer-briefing"
    ></ui5-product-switch-item>
    <ui5-product-switch-item
        title-text="S/4HANA"
        icon="batch-payments"
    ></ui5-product-switch-item>
    </ui5-product-switch>`};var r,s,u;i.parameters={...i.parameters,docs:{...(r=i.parameters)==null?void 0:r.docs,source:{originalSource:"args => html`\n    <ui5-product-switch> ${unsafeHTML(args.default)} </ui5-product-switch>\n`",...(u=(s=i.parameters)==null?void 0:s.docs)==null?void 0:u.source}}};var a,n,l;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:"args => html`\n    <ui5-product-switch> ${unsafeHTML(args.default)} </ui5-product-switch>\n`",...(l=(n=t.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};const f=["Basic","WithShellBar"],S=Object.freeze(Object.defineProperty({__proto__:null,Basic:i,WithShellBar:t,__namedExportsOrder:f,default:b},Symbol.toStringTag,{value:"Module"}));export{S as C,y as c};
