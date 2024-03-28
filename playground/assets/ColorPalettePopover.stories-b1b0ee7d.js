import{x as r}from"./lit-element-c5a2b594.js";import{o as g}from"./unsafe-html-0ddd83da.js";import{l}from"./if-defined-c29cffe1.js";const b={default:{control:{type:"text"},table:{type:{summary:"Array<IColorPaletteItem>"}}},showAt:{description:"Shows the ColorPalettePopover.",table:{category:"methods"},UI5CustomData:{parameters:[{name:"opener",type:{text:"HTMLElement"},description:"the element that the popover is shown at",_ui5privacy:"public"}],returnValue:{type:{text:"void"}}}},openPopover:{description:"Shows the ColorPalettePopover.",table:{category:"methods"},UI5CustomData:{parameters:[{name:"opener",type:{text:"HTMLElement"},description:"the element that the popover is shown at",_ui5privacy:"public"}],returnValue:{type:{text:"void"}}}},"item-click":{description:"Fired when the user selects a color.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"string"},name:"color",_ui5privacy:"public",description:"the selected color"}]}}},$={package:"@ui5/webcomponents",since:"1.0.0-rc.16",tagName:"ui5-color-palette-popover"};var a=Object.freeze,w=Object.defineProperty,f=(e,h)=>a(w(e,"raw",{value:a(h||e.slice())})),i,c;const C={title:"Main/ColorPalettePopover",component:"ColorPalettePopover",argTypes:b},v=e=>r`<ui5-color-palette-popover
    id="${l(e.id)}"
    ?show-recent-colors="${l(e.showRecentColors)}"
    ?show-more-colors="${l(e.showMoreColors)}"
    ?show-default-color="${l(e.showDefaultColor)}"
    default-color="${l(e.defaultColor)}"
>
    ${g(e.default)}
</ui5-color-palette-popover>`,o=v.bind({});o.args={id:"colorPalettePopover",default:`<ui5-color-palette-item value="lightsalmon"></ui5-color-palette-item>
<ui5-color-palette-item value="lightpink"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(216,124,172)"></ui5-color-palette-item>
<ui5-color-palette-item value="#6c666d"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(55,81,95)"></ui5-color-palette-item>
<ui5-color-palette-item value="#0072bb"></ui5-color-palette-item>
<ui5-color-palette-item value="powderblue"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(143,201,58)"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(195,172,206)"></ui5-color-palette-item>
<ui5-color-palette-item value="orange"></ui5-color-palette-item>`};o.decorators=[e=>r(i||(i=f([`<ui5-button id="colorPaletteBtn">Open ColorPalettePopover</ui5-button>
	`,`
	<script>
		colorPaletteBtn.addEventListener("click", function(event) {
			colorPalettePopover.showAt(this);
		});
	<\/script>`])),e())];o.parameters={docs:{story:{inline:!1,iframeHeight:"500px"}}};const t=v.bind({});t.storyName="Default, Recent, and More Colors";t.args={id:"colorPalettePopover",defaultColor:"orange",showDefaultColor:!0,showRecentColors:!0,showMoreColors:!0,default:`<ui5-color-palette-item value="lightsalmon"></ui5-color-palette-item>
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
<ui5-color-palette-item value="rgb(8,103,136)"></ui5-color-palette-item>`};t.decorators=[e=>r(c||(c=f([`<ui5-button id="colorPaletteBtn">Open ColorPalettePopover</ui5-button>
	`,`
	<script>
		colorPaletteBtn.addEventListener("click", function(event) {
			colorPalettePopover.showAt(this);
		});
	<\/script>`])),e())];t.parameters={docs:{story:{inline:!1,iframeHeight:"500px"}}};var p,u,s;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:'args => html`<ui5-color-palette-popover\n    id="${ifDefined(args.id)}"\n    ?show-recent-colors="${ifDefined(args.showRecentColors)}"\n    ?show-more-colors="${ifDefined(args.showMoreColors)}"\n    ?show-default-color="${ifDefined(args.showDefaultColor)}"\n    default-color="${ifDefined(args.defaultColor)}"\n>\n    ${unsafeHTML(args.default)}\n</ui5-color-palette-popover>`',...(s=(u=o.parameters)==null?void 0:u.docs)==null?void 0:s.source}}};var n,m,d;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:'args => html`<ui5-color-palette-popover\n    id="${ifDefined(args.id)}"\n    ?show-recent-colors="${ifDefined(args.showRecentColors)}"\n    ?show-more-colors="${ifDefined(args.showMoreColors)}"\n    ?show-default-color="${ifDefined(args.showDefaultColor)}"\n    default-color="${ifDefined(args.defaultColor)}"\n>\n    ${unsafeHTML(args.default)}\n</ui5-color-palette-popover>`',...(d=(m=t.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};const P=["Basic","DefaultColor"],x=Object.freeze(Object.defineProperty({__proto__:null,Basic:o,DefaultColor:t,__namedExportsOrder:P,default:C},Symbol.toStringTag,{value:"Module"}));export{x as C,$ as c};
