import{y as S}from"./lit-html.9e2e9691.js";import{l as o}from"./if-defined.fd0de8da.js";import{o as a}from"./unsafe-html.9d6beac9.js";import{D as E}from"./docs.7a9434d6.js";import{I as h}from"./IllustrationMessageType.01083692.js";import"./index.8cb7a9d9.js";import"./iframe.d5a3589f.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.8974bf6a.js";import"./chunk-R4NKYYJA.15989c7a.js";const B={name:{control:"select",options:["AddColumn","AddDimensions","AddPeople","BalloonSky","BeforeSearch","Connection","EmptyCalendar","EmptyList","EmptyPlanningCalendar","ErrorScreen","FilterTable","GroupTable","NoActivities","NoData","NoDimensionsSet","NoEntries","NoFilterResults","NoMail","NoMail_v1","NoNotifications","NoSavedItems","NoSavedItems_v1","NoSearchResults","NoTasks","NoTasks_v1","PageNotFound","ReloadScreen","ResizeColumn","SearchEarth","SearchFolder","SimpleBalloon","SimpleBell","SimpleCalendar","SimpleCheckMark","SimpleConnection","SimpleEmptyDoc","SimpleEmptyList","SimpleError","SimpleMagnifier","SimpleMail","SimpleNoSavedItems","SimpleNotFoundMagnifier","SimpleReload","SimpleTask","SleepingBell","SortColumn","SuccessBalloon","SuccessCheckMark","SuccessHighFive","SuccessScreen","Tent","TntChartArea","TntChartArea2","TntChartBar","TntChartBPMNFlow","TntChartBullet","TntChartDoughnut","TntChartFlow","TntChartGantt","TntChartOrg","TntChartPie","TntCodePlaceholder","TntCompany","TntComponents","TntExternalLink","TntFaceID","TntFingerprint","TntLock","TntMission","TntNoApplications","TntNoFlows","TntNoUsers","TntRadar","TntSecrets","TntServices","TntSessionExpired","TntSessionExpiring","TntSuccess","TntSuccessfulAuth","TntSystems","TntTeams","TntTools","TntUnableToLoad","TntUnlock","TntUnsuccessfulAuth","TntUser2","UnableToLoad","UnableToLoadImage","UnableToUpload","UploadCollection","UploadToCloud"]},size:{control:"select",options:["Auto","Base","Dialog","Scene","Spot"]},default:{control:{type:"text"}},subtitle:{control:{type:"text"}},title:{control:{type:"text"}}},x={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.15"};var s=Object.freeze,N=Object.defineProperty,y=(e,D)=>s(N(e,"raw",{value:s(D||e.slice())})),l;const r="ui5-illustrated-message",z={title:"Fiori/IllustratedMessage",component:r,parameters:{docs:{page:E({...x,component:r})}},argTypes:B},C=e=>S` <ui5-illustrated-message
    name="${o(e.name)}"
    subtitle-text="${o(e.subtitleText)}"
    title-text="${o(e.titleText)}"
    accessible-name-ref="${o(e.accessibleNameRef)}"
>
    ${a(e.title)} 
    ${a(e.subtitle)}
    ${a(e.default)}
</ui5-illustrated-message>`,t=C.bind({});t.args={name:h.UnableToUpload,default:`
    <ui5-button design="Emphasized">Action 1</ui5-button>
    <ui5-button>Action 2</ui5-button>
    `};const i=()=>S(l||(l=y([`
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
`]))),n=C.bind({});n.args={name:h.UnableToUpload,title:`
    <ui5-title slot="title" level="H1">Something went wrong</ui5-title>
    `,subtitle:`
    <div slot="subtitle">
        Please try again or contact us at
        <ui5-link>example@example.com</ui5-link>
    </div>
    `,default:`
    <ui5-button icon="refresh">Try again</ui5-button>`};var u,d,c;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:'args => html` <ui5-illustrated-message\n    name="${ifDefined(args.name)}"\n    subtitle-text="${ifDefined(args.subtitleText)}"\n    title-text="${ifDefined(args.titleText)}"\n    accessible-name-ref="${ifDefined(args.accessibleNameRef)}"\n>\n    ${unsafeHTML(args.title)} \n    ${unsafeHTML(args.subtitle)}\n    ${unsafeHTML(args.default)}\n</ui5-illustrated-message>`',...(c=(d=t.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var m,p,g;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`() => html\`
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
\``,...(g=(p=i.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var T,f,b;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:'args => html` <ui5-illustrated-message\n    name="${ifDefined(args.name)}"\n    subtitle-text="${ifDefined(args.subtitleText)}"\n    title-text="${ifDefined(args.titleText)}"\n    accessible-name-ref="${ifDefined(args.accessibleNameRef)}"\n>\n    ${unsafeHTML(args.title)} \n    ${unsafeHTML(args.subtitle)}\n    ${unsafeHTML(args.default)}\n</ui5-illustrated-message>`',...(b=(f=n.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};const j=["Basic","WithADialog","CustomTitle"];export{t as Basic,n as CustomTitle,i as WithADialog,j as __namedExportsOrder,z as default};
//# sourceMappingURL=IllustratedMessage.stories.93f38ff5.js.map
