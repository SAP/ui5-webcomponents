import{x as r}from"./lit-element-c5a2b594.js";import{o as i}from"./unsafe-html-0ddd83da.js";const c={default:{control:{type:"text"},table:{type:{summary:"Array<IColorPaletteItem>"}}},"item-click":{description:"Fired when the user selects a color.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"string"},name:"color",_ui5privacy:"public",description:"the selected color"}]}}},d={package:"@ui5/webcomponents",since:"1.0.0-rc.12",tagName:"ui5-color-palette"},u={title:"Main/ColorPalette",component:"ColorPalette",argTypes:c},p=a=>r`<ui5-color-palette>
    ${i(a.default)}
</ui5-color-palette>`,e=p.bind({});e.storyName="Color Palette with Items";e.args={default:`<ui5-color-palette-item value="darkblue"></ui5-color-palette-item>
<ui5-color-palette-item value="pink"></ui5-color-palette-item>
<ui5-color-palette-item value="#444444"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(0,200,0)"></ui5-color-palette-item>
<ui5-color-palette-item value="green"></ui5-color-palette-item>
<ui5-color-palette-item value="darkred"></ui5-color-palette-item>
<ui5-color-palette-item value="yellow"></ui5-color-palette-item>
<ui5-color-palette-item value="blue"></ui5-color-palette-item>
<ui5-color-palette-item value="cyan"></ui5-color-palette-item>
<ui5-color-palette-item value="orange"></ui5-color-palette-item>
<ui5-color-palette-item value="#5480e7"></ui5-color-palette-item>
<ui5-color-palette-item value="#ff6699"></ui5-color-palette-item>`};var t,o,l;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:"args => html`<ui5-color-palette>\n    ${unsafeHTML(args.default)}\n</ui5-color-palette>`",...(l=(o=e.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};const m=["Basic"],v=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,__namedExportsOrder:m,default:u},Symbol.toStringTag,{value:"Module"}));export{v as C,d as c};
