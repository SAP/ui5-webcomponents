import{x as y}from"./lit-element-c5a2b594.js";import{l as i}from"./if-defined-c29cffe1.js";import{o as a}from"./unsafe-html-0ddd83da.js";import{I as T}from"./IllustrationMessageType-f0f4890b.js";const x={design:{control:"select",options:["Auto","Base","Dot","Spot","Dialog","Scene"]},title:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement> & string"}}},subtitle:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},default:{control:{type:"text"},table:{type:{summary:"Array<IButton>"}}}},C={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.15",tagName:"ui5-illustrated-message"};var s=Object.freeze,B=Object.defineProperty,E=(e,$)=>s(B(e,"raw",{value:s($||e.slice())})),l;const h={title:"Fiori/Illustrated Message",component:"IllustratedMessage",argTypes:x},D=e=>y` <ui5-illustrated-message
    name="${i(e.name)}"
    design="${i(e.design)}"
    subtitle-text="${i(e.subtitleText)}"
    title-text="${i(e.titleText)}"
    accessible-name-ref="${i(e.accessibleNameRef)}"
>
    ${a(e.title)}
    ${a(e.subtitle)}
    ${a(e.default)}
</ui5-illustrated-message>`,t=D.bind({});t.args={name:T.UnableToUpload,default:`
    <ui5-button design="Emphasized">Action 1</ui5-button>
    <ui5-button>Action 2</ui5-button>
    `};const o=()=>y(l||(l=E([`
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
            dialog.open = true;
        });
        dialogCloser.addEventListener("click", function () {
            dialog.open = false;
        });
    <\/script>
`]))),n=D.bind({});n.args={name:T.UnableToUpload,title:`
    <ui5-title slot="title" level="H1">Something went wrong</ui5-title>
    `,subtitle:`
    <div slot="subtitle">
        Please try again or contact us at
        <ui5-link>example@example.com</ui5-link>
    </div>
    `,default:`
    <ui5-button icon="refresh">Try again</ui5-button>`};var r,u,d;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:'args => html` <ui5-illustrated-message\n    name="${ifDefined(args.name)}"\n    design="${ifDefined(args.design)}"\n    subtitle-text="${ifDefined(args.subtitleText)}"\n    title-text="${ifDefined(args.titleText)}"\n    accessible-name-ref="${ifDefined(args.accessibleNameRef)}"\n>\n    ${unsafeHTML(args.title)}\n    ${unsafeHTML(args.subtitle)}\n    ${unsafeHTML(args.default)}\n</ui5-illustrated-message>`',...(d=(u=t.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var c,g,m;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`() => html\`
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
            dialog.open = true;
        });
        dialogCloser.addEventListener("click", function () {
            dialog.open = false;
        });
    <\/script>
\``,...(m=(g=o.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};var p,f,b;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:'args => html` <ui5-illustrated-message\n    name="${ifDefined(args.name)}"\n    design="${ifDefined(args.design)}"\n    subtitle-text="${ifDefined(args.subtitleText)}"\n    title-text="${ifDefined(args.titleText)}"\n    accessible-name-ref="${ifDefined(args.accessibleNameRef)}"\n>\n    ${unsafeHTML(args.title)}\n    ${unsafeHTML(args.subtitle)}\n    ${unsafeHTML(args.default)}\n</ui5-illustrated-message>`',...(b=(f=n.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};const L=["Basic","WithADialog","CustomTitle"],O=Object.freeze(Object.defineProperty({__proto__:null,Basic:t,CustomTitle:n,WithADialog:o,__namedExportsOrder:L,default:h},Symbol.toStringTag,{value:"Module"}));export{O as C,C as c};
