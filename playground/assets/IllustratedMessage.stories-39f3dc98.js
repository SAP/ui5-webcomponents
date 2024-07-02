import{x as $}from"./lit-element-c5a2b594.js";import{l as n}from"./if-defined-c29cffe1.js";import{o as a}from"./unsafe-html-0ddd83da.js";import{I as D}from"./IllustrationMessageType-f0f4890b.js";const x={size:{control:"select",options:["Auto","Base","Dot","Spot","Dialog","Scene"]},titleLevel:{control:"select",options:["H1","H2","H3","H4","H5","H6"]},title:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement> & string"}}},subtitle:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},default:{control:{type:"text"},table:{type:{summary:"Array<IButton>"}}}},I={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.15",tagName:"ui5-illustrated-message"};var l=Object.freeze,v=Object.defineProperty,L=(e,T)=>l(v(e,"raw",{value:l(T||e.slice())})),s;const h={title:"Fiori/Illustrated Message",component:"IllustratedMessage",argTypes:x},y=e=>$` <ui5-illustrated-message
    name="${n(e.name)}"
    size="${n(e.size)}"
    subtitle-text="${n(e.subtitleText)}"
    title-text="${n(e.titleText)}"
    accessible-name-ref="${n(e.accessibleNameRef)}"
    title-level="${n(e.titleLevel)}"
>
    ${a(e.title)}
    ${a(e.subtitle)}
    ${a(e.default)}
</ui5-illustrated-message>`,i=y.bind({});i.args={name:D.UnableToUpload,default:`
    <ui5-button design="Emphasized">Action 1</ui5-button>
    <ui5-button>Action 2</ui5-button>
    `};const o=()=>$(s||(s=L([`
    <ui5-button id="openDialogButton">Open Dialog</ui5-button>
    <ui5-dialog id="hello-dialog" header-text="Error">
        <ui5-illustrated-message name="UnableToLoad"></ui5-illustrated-message>
        <ui5-bar design="Footer" slot="footer">
            <ui5-button
                id="closeDialogButton"
                design="Emphasized"
                slot="endContent"
                >Close</ui5-button
            >
        </ui5-bar>
    </ui5-dialog>
    <script>
        const dialogOpener = document.getElementById("openDialogButton");
        const dialog = document.getElementById("hello-dialog");
        const dialogCloser = document.getElementById("closeDialogButton");
        dialogOpener.addEventListener("click", function () {
            dialog.show();
        });
        dialogCloser.addEventListener("click", function () {
            dialog.close();
        });
    <\/script>
`]))),t=y.bind({});t.args={name:D.UnableToUpload,title:`
    <ui5-title slot="title" level="H1">Something went wrong</ui5-title>
    `,subtitle:`
    <div slot="subtitle">
        Please try again or contact us at
        <ui5-link>example@example.com</ui5-link>
    </div>
    `,default:`
    <ui5-button icon="refresh">Try again</ui5-button>`};t.parameters={controls:{exclude:["titleLevel"]}};var r,u,d;i.parameters={...i.parameters,docs:{...(r=i.parameters)==null?void 0:r.docs,source:{originalSource:'args => html` <ui5-illustrated-message\n    name="${ifDefined(args.name)}"\n    size="${ifDefined(args.size)}"\n    subtitle-text="${ifDefined(args.subtitleText)}"\n    title-text="${ifDefined(args.titleText)}"\n    accessible-name-ref="${ifDefined(args.accessibleNameRef)}"\n    title-level="${ifDefined(args.titleLevel)}"\n>\n    ${unsafeHTML(args.title)}\n    ${unsafeHTML(args.subtitle)}\n    ${unsafeHTML(args.default)}\n</ui5-illustrated-message>`',...(d=(u=i.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var c,m,g;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`() => html\`
    <ui5-button id="openDialogButton">Open Dialog</ui5-button>
    <ui5-dialog id="hello-dialog" header-text="Error">
        <ui5-illustrated-message name="UnableToLoad"></ui5-illustrated-message>
        <ui5-bar design="Footer" slot="footer">
            <ui5-button
                id="closeDialogButton"
                design="Emphasized"
                slot="endContent"
                >Close</ui5-button
            >
        </ui5-bar>
    </ui5-dialog>
    <script>
        const dialogOpener = document.getElementById("openDialogButton");
        const dialog = document.getElementById("hello-dialog");
        const dialogCloser = document.getElementById("closeDialogButton");
        dialogOpener.addEventListener("click", function () {
            dialog.show();
        });
        dialogCloser.addEventListener("click", function () {
            dialog.close();
        });
    <\/script>
\``,...(g=(m=o.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var f,p,b;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:'args => html` <ui5-illustrated-message\n    name="${ifDefined(args.name)}"\n    size="${ifDefined(args.size)}"\n    subtitle-text="${ifDefined(args.subtitleText)}"\n    title-text="${ifDefined(args.titleText)}"\n    accessible-name-ref="${ifDefined(args.accessibleNameRef)}"\n    title-level="${ifDefined(args.titleLevel)}"\n>\n    ${unsafeHTML(args.title)}\n    ${unsafeHTML(args.subtitle)}\n    ${unsafeHTML(args.default)}\n</ui5-illustrated-message>`',...(b=(p=t.parameters)==null?void 0:p.docs)==null?void 0:b.source}}};const B=["Basic","WithADialog","CustomTitle"],M=Object.freeze(Object.defineProperty({__proto__:null,Basic:i,CustomTitle:t,WithADialog:o,__namedExportsOrder:B,default:h},Symbol.toStringTag,{value:"Module"}));export{M as C,I as c};
