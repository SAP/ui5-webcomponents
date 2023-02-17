import{y as v}from"./lit-html.9e2e9691.js";import{D as f}from"./docs.7a9434d6.js";import"./index.8cb7a9d9.js";import"./iframe.d5a3589f.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.8974bf6a.js";import"./chunk-R4NKYYJA.15989c7a.js";const h={default:{control:{type:"text"}},openPopover:{table:{category:"Methods"}},showAt:{table:{category:"Methods"}}},b={package:"@ui5/webcomponents",since:"1.0.0-rc.16"};var l=Object.freeze,g=Object.defineProperty,d=(o,P)=>l(g(o,"raw",{value:l(P||o.slice())})),i,r;const a="ui5-color-palette-popover",M={title:"Main/ColorPalettePopover",component:a,parameters:{docs:{page:f({...b,component:a})}},argTypes:h},e=()=>v(i||(i=d([`
<h3>Color Palette Popover with recent colors, default color and more colors features</h3>
    <div class="snippet">
        <ui5-button id="colorPaletteBtn">Open ColorPalettePopover</ui5-button>
        <ui5-color-palette-popover id="colorPalettePopover" show-recent-colors="" show-more-colors="" show-default-color="" default-color="green">
            <ui5-color-palette-item value="pink"></ui5-color-palette-item>
            <ui5-color-palette-item value="darkblue"></ui5-color-palette-item>
            <ui5-color-palette-item value="#444444"></ui5-color-palette-item>
            <ui5-color-palette-item value="rgb(0,200,0)"></ui5-color-palette-item>
            <ui5-color-palette-item value="green"></ui5-color-palette-item>
            <ui5-color-palette-item value="darkred"></ui5-color-palette-item>
            <ui5-color-palette-item value="yellow"></ui5-color-palette-item>
            <ui5-color-palette-item value="blue"></ui5-color-palette-item>
            <ui5-color-palette-item value="cyan"></ui5-color-palette-item>
            <ui5-color-palette-item value="orange"></ui5-color-palette-item>
            <ui5-color-palette-item value="#5480e7"></ui5-color-palette-item>
            <ui5-color-palette-item value="#ff6699"></ui5-color-palette-item>
        </ui5-color-palette-popover>
    </div>
    <script>
        colorPaletteBtn.addEventListener("click", function(event) {
            colorPalettePopover.showAt(this);
        });
    <\/script>
`])));e.parameters={docs:{story:{inline:!1}}};const t=()=>v(r||(r=d([`
<h3>Color Palette Popover without any additional features</h3>
    <div class="snippet">
        <ui5-button id="colorPaletteBtn1">Open ColorPalettePopover</ui5-button>
        <ui5-color-palette-popover id="colorPalettePopover1">
            <ui5-color-palette-item value="pink"></ui5-color-palette-item>
            <ui5-color-palette-item value="darkblue"></ui5-color-palette-item>
            <ui5-color-palette-item value="#444444"></ui5-color-palette-item>
            <ui5-color-palette-item value="rgb(0,200,0)"></ui5-color-palette-item>
            <ui5-color-palette-item value="green"></ui5-color-palette-item>
            <ui5-color-palette-item value="darkred"></ui5-color-palette-item>
            <ui5-color-palette-item value="yellow"></ui5-color-palette-item>
            <ui5-color-palette-item value="blue"></ui5-color-palette-item>
            <ui5-color-palette-item value="cyan"></ui5-color-palette-item>
            <ui5-color-palette-item value="orange"></ui5-color-palette-item>
            <ui5-color-palette-item value="#5480e7"></ui5-color-palette-item>
            <ui5-color-palette-item value="#ff6699"></ui5-color-palette-item>
        </ui5-color-palette-popover>
    </div>
    <script>
        colorPaletteBtn1.addEventListener("click", function (event) {
            colorPalettePopover1.showAt(this);
        });
    <\/script>
`])));t.parameters={docs:{story:{inline:!1}}};var p,u,c;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`() => html\`
<h3>Color Palette Popover with recent colors, default color and more colors features</h3>
    <div class="snippet">
        <ui5-button id="colorPaletteBtn">Open ColorPalettePopover</ui5-button>
        <ui5-color-palette-popover id="colorPalettePopover" show-recent-colors="" show-more-colors="" show-default-color="" default-color="green">
            <ui5-color-palette-item value="pink"></ui5-color-palette-item>
            <ui5-color-palette-item value="darkblue"></ui5-color-palette-item>
            <ui5-color-palette-item value="#444444"></ui5-color-palette-item>
            <ui5-color-palette-item value="rgb(0,200,0)"></ui5-color-palette-item>
            <ui5-color-palette-item value="green"></ui5-color-palette-item>
            <ui5-color-palette-item value="darkred"></ui5-color-palette-item>
            <ui5-color-palette-item value="yellow"></ui5-color-palette-item>
            <ui5-color-palette-item value="blue"></ui5-color-palette-item>
            <ui5-color-palette-item value="cyan"></ui5-color-palette-item>
            <ui5-color-palette-item value="orange"></ui5-color-palette-item>
            <ui5-color-palette-item value="#5480e7"></ui5-color-palette-item>
            <ui5-color-palette-item value="#ff6699"></ui5-color-palette-item>
        </ui5-color-palette-popover>
    </div>
    <script>
        colorPaletteBtn.addEventListener("click", function(event) {
            colorPalettePopover.showAt(this);
        });
    <\/script>
\``,...(c=(u=e.parameters)==null?void 0:u.docs)==null?void 0:c.source}}};var n,m,s;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`() => html\`
<h3>Color Palette Popover without any additional features</h3>
    <div class="snippet">
        <ui5-button id="colorPaletteBtn1">Open ColorPalettePopover</ui5-button>
        <ui5-color-palette-popover id="colorPalettePopover1">
            <ui5-color-palette-item value="pink"></ui5-color-palette-item>
            <ui5-color-palette-item value="darkblue"></ui5-color-palette-item>
            <ui5-color-palette-item value="#444444"></ui5-color-palette-item>
            <ui5-color-palette-item value="rgb(0,200,0)"></ui5-color-palette-item>
            <ui5-color-palette-item value="green"></ui5-color-palette-item>
            <ui5-color-palette-item value="darkred"></ui5-color-palette-item>
            <ui5-color-palette-item value="yellow"></ui5-color-palette-item>
            <ui5-color-palette-item value="blue"></ui5-color-palette-item>
            <ui5-color-palette-item value="cyan"></ui5-color-palette-item>
            <ui5-color-palette-item value="orange"></ui5-color-palette-item>
            <ui5-color-palette-item value="#5480e7"></ui5-color-palette-item>
            <ui5-color-palette-item value="#ff6699"></ui5-color-palette-item>
        </ui5-color-palette-popover>
    </div>
    <script>
        colorPaletteBtn1.addEventListener("click", function (event) {
            colorPalettePopover1.showAt(this);
        });
    <\/script>
\``,...(s=(m=t.parameters)==null?void 0:m.docs)==null?void 0:s.source}}};const j=["Template0","Template1"];export{e as Template0,t as Template1,j as __namedExportsOrder,M as default};
//# sourceMappingURL=ColorPalettePopover.stories.543ecad6.js.map
