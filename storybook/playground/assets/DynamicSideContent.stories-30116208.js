import{x as r}from"./lit-element-c5a2b594.js";import{l as t}from"./if-defined-c29cffe1.js";import{o as n}from"./unsafe-html-0ddd83da.js";import{S as l}from"./SideContentVisibility-420b58b7.js";const c={sideContentPosition:{control:"select",options:["End","Start"]},sideContentVisibility:{control:"select",options:["AlwaysShow","ShowAboveL","ShowAboveM","ShowAboveS","NeverShow"]},sideContentFallDown:{control:"select",options:["BelowXL","BelowL","BelowM","OnMinimumWidth"]},default:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},sideContent:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},toggleContents:{description:"Toggles visibility of main and side contents on S screen size (mobile device).",table:{category:"methods"},UI5CustomData:{returnValue:{type:{text:"void"}}}},"layout-change":{description:"Fires when the current breakpoint has been changed.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"string"},name:"currentBreakpoint",_ui5privacy:"public",description:"the current breakpoint."},{type:{text:"string"},name:"previousBreakpoint",_ui5privacy:"public",description:"the breakpoint that was active before change to current breakpoint."},{type:{text:"boolean"},name:"mainContentVisible",_ui5privacy:"public",description:"visibility of the main content."},{type:{text:"boolean"},name:"sideContentVisible",_ui5privacy:"public",description:"visibility of the side content."}]}}},v={package:"@ui5/webcomponents-fiori",since:"1.1.0",tagName:"ui5-dynamic-side-content"},u={title:"Fiori/DynamicSideContent",component:"DynamicSideContent",argTypes:c},d=e=>r`
<style>
    .text {
        display: inline-block;
        font-size: var(--sapFontSize);
        font-family: var(--sapFontFamily);
        color: var(--sapTextColor);
        line-height: normal;
        white-space: pre-line;
        word-wrap: break-word;
        cursor: text;
}
</style>
<ui5-dynamic-side-content
    ?equal-split="${t(e.equalSplit)}"
    ?hide-main-content="${t(e.hideMainContent)}"
    ?hide-side-content="${t(e.hideSideContent)}"
    side-content-position="${t(e.sideContentPosition)}"
    side-content-visibility="${t(e.sideContentVisibility)}"
    side-content-fall-down="${t(e.sideContentFallDown)}"
>
    ${n(e.default)}
    ${n(e.sideContent)}
</ui5-dynamic-side-content>`,i=d.bind({});i.args={default:`<div>
    <ui5-title level="h1">Main Content</ui5-title>
    <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex mi, elementum et ante commodo, semper sollicitudin magna. Sed dapibus ut tortor quis varius. Sed luctus sem at nunc porta vulputate. Suspendisse lobortis arcu est, quis ultrices ipsum fermentum a. Vestibulum a ipsum placerat ligula gravida fringilla at id ex. Etiam pellentesque lorem sed sagittis aliquam. Quisque semper orci risus, vel efficitur dui euismod aliquet. Morbi sapien sapien, rhoncus et rutrum nec, rhoncus id nisl. Cras non tincidunt enim, id eleifend neque.</p>
</div>`,sideContent:`<div slot="sideContent">
    <ui5-title level="h1">Side Content</ui5-title>
    <p class="text">Morbi lorem libero, imperdiet id condimentum ac, tempor ut velit. Integer a laoreet sem. Nunc at sagittis nisi. Sed placerat diam eu porttitor dignissim. Maecenas nec fringilla tortor. Pellentesque ut elit est. Curabitur quis elit at mauris ullamcorper fringilla. Nullam diam mi, porttitor dictum orci nec, molestie luctus metus. Nunc ut ex blandit, elementum erat eget, pulvinar sapien. Donec nec lorem eu nunc eleifend tempor at non tortor. In quam velit, ornare at rutrum ac, porta ac augue. Suspendisse venenatis semper lacus at venenatis. Praesent vestibulum ligula nulla, at tempus lorem consequat suscipit. Aenean consequat dapibus dui, at bibendum mauris porta a.</p>
</div>`,sideContentVisibility:l.AlwaysShow};var o,a,s;i.parameters={...i.parameters,docs:{...(o=i.parameters)==null?void 0:o.docs,source:{originalSource:`args => html\`
<style>
    .text {
        display: inline-block;
        font-size: var(--sapFontSize);
        font-family: var(--sapFontFamily);
        color: var(--sapTextColor);
        line-height: normal;
        white-space: pre-line;
        word-wrap: break-word;
        cursor: text;
}
</style>
<ui5-dynamic-side-content
    ?equal-split="\${ifDefined(args.equalSplit)}"
    ?hide-main-content="\${ifDefined(args.hideMainContent)}"
    ?hide-side-content="\${ifDefined(args.hideSideContent)}"
    side-content-position="\${ifDefined(args.sideContentPosition)}"
    side-content-visibility="\${ifDefined(args.sideContentVisibility)}"
    side-content-fall-down="\${ifDefined(args.sideContentFallDown)}"
>
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.sideContent)}
</ui5-dynamic-side-content>\``,...(s=(a=i.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const m=["Basic"],h=Object.freeze(Object.defineProperty({__proto__:null,Basic:i,__namedExportsOrder:m,default:u},Symbol.toStringTag,{value:"Module"}));export{h as C,v as c};
