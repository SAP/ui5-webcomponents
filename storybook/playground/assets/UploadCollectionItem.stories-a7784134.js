import{x as r}from"./lit-element-c5a2b594.js";import{l as t}from"./if-defined-c29cffe1.js";import{o}from"./unsafe-html-0ddd83da.js";const c={uploadState:{control:"select",options:["Complete","Error","Ready","Uploading"]},type:{control:"select",options:["Inactive","Active","Detail","Navigation"]},highlight:{control:"select",options:["None","Success","Warning","Error","Information"]},default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}},thumbnail:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},deleteButton:{control:{type:"text"},table:{type:{summary:"Array<IButton>"}}}},b={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.7",tagName:"ui5-upload-collection-item",showDefaultStoryOnly:!0},d={title:"Fiori/Upload Collection/Upload Collection Item",component:"UploadCollectionItem",argTypes:c},s=e=>r`
<ui5-upload-collection>
    <ui5-upload-collection-item
        file-name="${t(e.fileName)}"
        accessibility-attributes="${t(e.accessibilityAttributes)}"
        ?navigated="${t(e.navigated)}"
        ?selected="${t(e.selected)}"
        upload-state="${t(e.uploadState)}"
        type="${t(e.type)}"
        progress="${t(e.progress)}"
        ?file-name-clickable="${t(e.fileNameClickable)}"
        ?disable-delete-button="${t(e.disableDeleteButton)}"
        ?hide-delete-button="${t(e.hideDeleteButton)}"
        ?hide-retry-button="${t(e.hideRetryButton)}"
        ?hide-terminate-button="${t(e.hideTerminateButton)}"
        tooltip="${t(e.tooltip)}"
    >
        ${o(e.default)}
        ${o(e.thumbnail)}
    </ui5-upload-collection-item>
</ui5-upload-collection>`,i=s.bind({});i.tags=["_hidden_"];i.args={fileName:"latest-reports.pdf",fileNameClickable:!1,uploadState:"Error",default:'uploadState="Error"',thumbnail:'<ui5-icon name="document-text" slot="thumbnail"></ui5-icon>',type:"Active",progress:59};var n,l,a;i.parameters={...i.parameters,docs:{...(n=i.parameters)==null?void 0:n.docs,source:{originalSource:`args => {
  return html\`
<ui5-upload-collection>
    <ui5-upload-collection-item
        file-name="\${ifDefined(args.fileName)}"
        accessibility-attributes="\${ifDefined(args.accessibilityAttributes)}"
        ?navigated="\${ifDefined(args.navigated)}"
        ?selected="\${ifDefined(args.selected)}"
        upload-state="\${ifDefined(args.uploadState)}"
        type="\${ifDefined(args.type)}"
        progress="\${ifDefined(args.progress)}"
        ?file-name-clickable="\${ifDefined(args.fileNameClickable)}"
        ?disable-delete-button="\${ifDefined(args.disableDeleteButton)}"
        ?hide-delete-button="\${ifDefined(args.hideDeleteButton)}"
        ?hide-retry-button="\${ifDefined(args.hideRetryButton)}"
        ?hide-terminate-button="\${ifDefined(args.hideTerminateButton)}"
        tooltip="\${ifDefined(args.tooltip)}"
    >
        \${unsafeHTML(args.default)}
        \${unsafeHTML(args.thumbnail)}
    </ui5-upload-collection-item>
</ui5-upload-collection>\`;
}`,...(a=(l=i.parameters)==null?void 0:l.docs)==null?void 0:a.source}}};const u=["Basic"],y=Object.freeze(Object.defineProperty({__proto__:null,Basic:i,__namedExportsOrder:u,default:d},Symbol.toStringTag,{value:"Module"}));export{y as C,b as c};
