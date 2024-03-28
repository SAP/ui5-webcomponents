import{x as m}from"./lit-element-c5a2b594.js";import{o as b}from"./unsafe-html-0ddd83da.js";import{l as i}from"./if-defined-c29cffe1.js";import{B as p}from"./BusyIndicatorSize-c7535361.js";const v={size:{control:"select",options:["Small","Medium","Large"]},textPlacement:{control:"select",options:["Top","Bottom"]},default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}}},I={package:"@ui5/webcomponents",since:"0.12.0",tagName:"ui5-busy-indicator"};var a=Object.freeze,g=Object.defineProperty,x=(e,y)=>a(g(e,"raw",{value:a(y||e.slice())})),r;const $={title:"Main/Busy Indicator",component:"BusyIndicator",argTypes:v},f=e=>m`<ui5-busy-indicator
    text="${i(e.text)}"
    size="${i(e.size)}"
    ?active="${i(e.active)}"
    delay="${i(e.delay)}"
>
    ${b(e.default)}
</ui5-busy-indicator>`,n=f.bind({});n.args={active:!0,size:p.Medium};const t=f.bind({});t.args={size:p.Medium,default:`<ui5-list
    no-data-text="No Data"
    header-text="Available Items"
    >
</ui5-list>`};t.decorators=[e=>m(r||(r=x([`<style>
	.sample {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>

<div class="sample">
	<ui5-button>Fetch List Data</ui5-button>
	`,`
</div>

<script>
	var busyIndicator = document.querySelector("ui5-busy-indicator");
	var list = document.querySelector("ui5-list");
	var fetchBtn = document.querySelector("ui5-button");

	fetchBtn.addEventListener("click", event => {
		busyIndicator.active = true;

		setTimeout(() => {
			["UI5", "Web", "Components"].forEach(title => {
				const el = document.createElement("ui5-li");
				el.textContent = title;
				list.appendChild(el);
			});

			busyIndicator.active = false;
		}, 3000);
	});
<\/script>`])),e())];t.parameters={docs:{story:{iframeHeight:"500px",inline:!1}}};var s,o,c;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
  return html\`<ui5-busy-indicator
    text="\${ifDefined(args.text)}"
    size="\${ifDefined(args.size)}"
    ?active="\${ifDefined(args.active)}"
    delay="\${ifDefined(args.delay)}"
>
    \${unsafeHTML(args.default)}
</ui5-busy-indicator>\`;
}`,...(c=(o=n.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};var u,d,l;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  return html\`<ui5-busy-indicator
    text="\${ifDefined(args.text)}"
    size="\${ifDefined(args.size)}"
    ?active="\${ifDefined(args.active)}"
    delay="\${ifDefined(args.delay)}"
>
    \${unsafeHTML(args.default)}
</ui5-busy-indicator>\`;
}`,...(l=(d=t.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};const _=["Basic","UsageWithComponents"],S=Object.freeze(Object.defineProperty({__proto__:null,Basic:n,UsageWithComponents:t,__namedExportsOrder:_,default:$},Symbol.toStringTag,{value:"Module"}));export{S as C,I as c};
