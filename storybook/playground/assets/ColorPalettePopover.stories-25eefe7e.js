import{x as r}from"./lit-element-c5a2b594.js";import{o as h}from"./unsafe-html-0ddd83da.js";import{l}from"./if-defined-c29cffe1.js";const P={default:{control:{type:"text"},table:{type:{summary:"Array<IColorPaletteItem>"}}},"item-click":{description:"Fired when the user selects a color.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"string"},name:"color",_ui5privacy:"public",description:"the selected color"}]}}},y={package:"@ui5/webcomponents",since:"1.0.0-rc.16",tagName:"ui5-color-palette-popover"};var a=Object.freeze,b=Object.defineProperty,f=(e,g)=>a(b(e,"raw",{value:a(g||e.slice())})),i,c;const C={title:"Main/ColorPalettePopover",component:"ColorPalettePopover",argTypes:P},v=e=>r`<ui5-color-palette-popover
    id="${l(e.id)}"
    opener="${l(e.opener)}"
    ?show-recent-colors="${l(e.showRecentColors)}"
    ?show-more-colors="${l(e.showMoreColors)}"
    ?show-default-color="${l(e.showDefaultColor)}"
    default-color="${l(e.defaultColor)}"
>
    ${h(e.default)}
</ui5-color-palette-popover>`,t=v.bind({});t.args={id:"colorPalettePopover",opener:"colorPaletteBtn",default:`<ui5-color-palette-item value="lightsalmon"></ui5-color-palette-item>
<ui5-color-palette-item value="lightpink"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(216,124,172)"></ui5-color-palette-item>
<ui5-color-palette-item value="#6c666d"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(55,81,95)"></ui5-color-palette-item>
<ui5-color-palette-item value="#0072bb"></ui5-color-palette-item>
<ui5-color-palette-item value="powderblue"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(143,201,58)"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(195,172,206)"></ui5-color-palette-item>
<ui5-color-palette-item value="orange"></ui5-color-palette-item>`};t.decorators=[e=>r(i||(i=f([`<ui5-button id="colorPaletteBtn">Open ColorPalettePopover</ui5-button>
	`,`
	<script>
		colorPaletteBtn.addEventListener("click", (event) => {
			colorPalettePopover.open = !colorPalettePopover.open;
		});
	<\/script>`])),e())];t.parameters={docs:{story:{inline:!1,iframeHeight:"500px"}}};const o=v.bind({});o.storyName="Default, Recent, and More Colors";o.args={id:"colorPalettePopover",opener:"colorPaletteBtn",defaultColor:"orange",showDefaultColor:!0,showRecentColors:!0,showMoreColors:!0,default:`<ui5-color-palette-item value="lightsalmon"></ui5-color-palette-item>
<ui5-color-palette-item value="lightpink"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(216,124,172)"></ui5-color-palette-item>
<ui5-color-palette-item value="#6c666d"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(55,81,95)"></ui5-color-palette-item>
<ui5-color-palette-item value="#0072bb"></ui5-color-palette-item>
<ui5-color-palette-item value="powderblue"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(143,201,58)"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(195,172,206)"></ui5-color-palette-item>
<ui5-color-palette-item value="orange"></ui5-color-palette-item>
<ui5-color-palette-item value="#ef3054"></ui5-color-palette-item>
<ui5-color-palette-item value="#ff6f59"></ui5-color-palette-item>
<ui5-color-palette-item value="moccasin"></ui5-color-palette-item>
<ui5-color-palette-item value="#07A0C3"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(8,103,136)"></ui5-color-palette-item>`};o.decorators=[e=>r(c||(c=f([`<ui5-button id="colorPaletteBtn">Open ColorPalettePopover</ui5-button>
	`,`
	<script>
		colorPaletteBtn.addEventListener("click", (event) => {
			colorPalettePopover.open = !colorPalettePopover.open;
		});
	<\/script>`])),e())];o.parameters={docs:{story:{inline:!1,iframeHeight:"500px"}}};var p,u,n;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:'args => html`<ui5-color-palette-popover\n    id="${ifDefined(args.id)}"\n    opener="${ifDefined(args.opener)}"\n    ?show-recent-colors="${ifDefined(args.showRecentColors)}"\n    ?show-more-colors="${ifDefined(args.showMoreColors)}"\n    ?show-default-color="${ifDefined(args.showDefaultColor)}"\n    default-color="${ifDefined(args.defaultColor)}"\n>\n    ${unsafeHTML(args.default)}\n</ui5-color-palette-popover>`',...(n=(u=t.parameters)==null?void 0:u.docs)==null?void 0:n.source}}};var s,m,d;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:'args => html`<ui5-color-palette-popover\n    id="${ifDefined(args.id)}"\n    opener="${ifDefined(args.opener)}"\n    ?show-recent-colors="${ifDefined(args.showRecentColors)}"\n    ?show-more-colors="${ifDefined(args.showMoreColors)}"\n    ?show-default-color="${ifDefined(args.showDefaultColor)}"\n    default-color="${ifDefined(args.defaultColor)}"\n>\n    ${unsafeHTML(args.default)}\n</ui5-color-palette-popover>`',...(d=(m=o.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};const w=["Basic","DefaultColor"],M=Object.freeze(Object.defineProperty({__proto__:null,Basic:t,DefaultColor:o,__namedExportsOrder:w,default:C},Symbol.toStringTag,{value:"Module"}));export{M as C,y as c};
