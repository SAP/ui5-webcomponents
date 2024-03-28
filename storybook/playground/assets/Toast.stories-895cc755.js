import{x as v}from"./lit-element-c5a2b594.js";import{l as s}from"./if-defined-c29cffe1.js";import{o as y}from"./unsafe-html-0ddd83da.js";import{T as b}from"./ToastPlacement-9320f5e7.js";const E={placement:{control:"select",options:["TopStart","TopCenter","TopEnd","MiddleStart","MiddleCenter","MiddleEnd","BottomStart","BottomCenter","BottomEnd"]},default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}},show:{description:"Shows the component.",table:{category:"methods"},UI5CustomData:{returnValue:{type:{text:"void"}}}}},C={package:"@ui5/webcomponents",since:"1.0.0-rc.6",tagName:"ui5-toast"};var i=Object.freeze,h=Object.defineProperty,B=(e,T)=>i(h(e,"raw",{value:i(T||e.slice())})),d;const S={title:"Main/Toast",component:"Toast",argTypes:E};let t=0;const r=e=>v(d||(d=B([`
<ui5-button id="btn-`,`">Show Toast</ui5-button>
<ui5-toast
	id="toast-`,`"
	duration="`,`"
	placement="`,`"
	>`,`</ui5-toast>
<script>
	var toastOpener`,' = document.getElementById("btn-',`");
	var toast`,' = document.getElementById("toast-',`"); 

	toastOpener`,`.addEventListener("click", () => {
		toast`,`.show();
	});
<\/script>`])),++t,t,s(e.duration),s(e.placement),y(e.default),t,t,t,t,t,t),n=r.bind({});n.args={placement:b.BottomCenter,default:"Basic Toast"};const a=r.bind({});a.args={duration:4500,default:"Long Toast"};const o=r.bind({});o.args={placement:b.MiddleCenter,default:"Middle Center Toast"};var c,u,m;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
  return html\`
<ui5-button id="btn-\${++index}">Show Toast</ui5-button>
<ui5-toast
    id="toast-\${index}"
    duration="\${ifDefined(args.duration)}"
    placement="\${ifDefined(args.placement)}"
    >\${unsafeHTML(args.default)}</ui5-toast>
<script>
    var toastOpener\${index} = document.getElementById("btn-\${index}");
    var toast\${index} = document.getElementById("toast-\${index}"); 

    toastOpener\${index}.addEventListener("click", () => {
        toast\${index}.show();
    });
<\/script>\`;
}`,...(m=(u=n.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var p,l,f;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
  return html\`
<ui5-button id="btn-\${++index}">Show Toast</ui5-button>
<ui5-toast
    id="toast-\${index}"
    duration="\${ifDefined(args.duration)}"
    placement="\${ifDefined(args.placement)}"
    >\${unsafeHTML(args.default)}</ui5-toast>
<script>
    var toastOpener\${index} = document.getElementById("btn-\${index}");
    var toast\${index} = document.getElementById("toast-\${index}"); 

    toastOpener\${index}.addEventListener("click", () => {
        toast\${index}.show();
    });
<\/script>\`;
}`,...(f=(l=a.parameters)==null?void 0:l.docs)==null?void 0:f.source}}};var $,g,x;o.parameters={...o.parameters,docs:{...($=o.parameters)==null?void 0:$.docs,source:{originalSource:`args => {
  return html\`
<ui5-button id="btn-\${++index}">Show Toast</ui5-button>
<ui5-toast
    id="toast-\${index}"
    duration="\${ifDefined(args.duration)}"
    placement="\${ifDefined(args.placement)}"
    >\${unsafeHTML(args.default)}</ui5-toast>
<script>
    var toastOpener\${index} = document.getElementById("btn-\${index}");
    var toast\${index} = document.getElementById("toast-\${index}"); 

    toastOpener\${index}.addEventListener("click", () => {
        toast\${index}.show();
    });
<\/script>\`;
}`,...(x=(g=o.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};const _=["Basic","Duration","Placement"],D=Object.freeze(Object.defineProperty({__proto__:null,Basic:n,Duration:a,Placement:o,__namedExportsOrder:_,default:S},Symbol.toStringTag,{value:"Module"}));export{D as C,C as c};
