import{x as b}from"./lit-element-c5a2b594.js";import{l as s}from"./if-defined-c29cffe1.js";import{o as r}from"./unsafe-html-0ddd83da.js";import{M}from"./MessageStripDesign-392e00c5.js";const h={design:{control:"select",options:["Information","Positive","Negative","Warning"]},default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}},icon:{control:{type:"text"},table:{type:{summary:"Array<IIcon>"}}}},N={package:"@ui5/webcomponents",since:"0.9.0",tagName:"ui5-message-strip"};var o=Object.freeze,w=Object.defineProperty,$=(e,y)=>o(w(e,"raw",{value:o(y||e.slice())})),a;const x={title:"Main/Message Strip",component:"MessageStrip",argTypes:h},v=e=>b`<ui5-message-strip 
    design="${s(e.design)}"
    ?hide-icon="${s(e.hideIcon)}"
    ?hide-close-button="${s(e.hideCloseButton)}"
>
    ${r(e.icon)}
    ${r(e.default)}
</ui5-message-strip>
`,t=v.bind({});t.args={design:M.Information,default:"Information MessageStrip"};const i=()=>b(a||(a=$([`
<div class="wrapper">
	<ui5-button id="button1">Generate MessageStrip</ui5-button>
</div>
<script>
	const container = document.querySelector(".wrapper");
	const button =  document.querySelector("#button1");
	button.addEventListener("click", function(event) {
		let invisibleMessage =  window["sap-ui-webcomponents-bundle"].invisibleMessage;
		const messageStrip = document.querySelector("#msgStrip");
		const types = ["Information", "Warning", "Negative", "Positive"];
		const text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco.";
		let type = types[Math.round(Math.random() * 3)];
		if (messageStrip) {
			container.removeChild(messageStrip);
		}
		let generatedMsgStrip = document.createElement("ui5-message-strip");
		generatedMsgStrip.id = "msgStrip";
		generatedMsgStrip.design = type;
		generatedMsgStrip.textContent = text;
		invisibleMessage.announce(\`New Information Bar of type \${type} \${text}\`, "Assertive");
		container.appendChild(generatedMsgStrip);
	});
<\/script>
`],[`
<div class="wrapper">
	<ui5-button id="button1">Generate MessageStrip</ui5-button>
</div>
<script>
	const container = document.querySelector(".wrapper");
	const button =  document.querySelector("#button1");
	button.addEventListener("click", function(event) {
		let invisibleMessage =  window["sap-ui-webcomponents-bundle"].invisibleMessage;
		const messageStrip = document.querySelector("#msgStrip");
		const types = ["Information", "Warning", "Negative", "Positive"];
		const text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco.";
		let type = types[Math.round(Math.random() * 3)];
		if (messageStrip) {
			container.removeChild(messageStrip);
		}
		let generatedMsgStrip = document.createElement("ui5-message-strip");
		generatedMsgStrip.id = "msgStrip";
		generatedMsgStrip.design = type;
		generatedMsgStrip.textContent = text;
		invisibleMessage.announce(\\\`New Information Bar of type \\\${type} \\\${text}\\\`, "Assertive");
		container.appendChild(generatedMsgStrip);
	});
<\/script>
`]))),n=v.bind({});n.args={design:M.Negative,icon:'<img src="../assets/images/loading.gif" width="16" height="16" slot="icon">',default:"Custom MessageStrip with animated gif"};var d,c,p;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`args => html\`<ui5-message-strip 
    design="\${ifDefined(args.design)}"
    ?hide-icon="\${ifDefined(args.hideIcon)}"
    ?hide-close-button="\${ifDefined(args.hideCloseButton)}"
>
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.default)}
</ui5-message-strip>
\``,...(p=(c=t.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var u,m,g;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`() => html\`
<div class="wrapper">
    <ui5-button id="button1">Generate MessageStrip</ui5-button>
</div>
<script>
    const container = document.querySelector(".wrapper");
    const button =  document.querySelector("#button1");
    button.addEventListener("click", function(event) {
        let invisibleMessage =  window["sap-ui-webcomponents-bundle"].invisibleMessage;
        const messageStrip = document.querySelector("#msgStrip");
        const types = ["Information", "Warning", "Negative", "Positive"];
        const text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco.";
        let type = types[Math.round(Math.random() * 3)];
        if (messageStrip) {
            container.removeChild(messageStrip);
        }
        let generatedMsgStrip = document.createElement("ui5-message-strip");
        generatedMsgStrip.id = "msgStrip";
        generatedMsgStrip.design = type;
        generatedMsgStrip.textContent = text;
        invisibleMessage.announce(\\\`New Information Bar of type \\\${type} \\\${text}\\\`, "Assertive");
        container.appendChild(generatedMsgStrip);
    });
<\/script>
\``,...(g=(m=i.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var l,f,S;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`args => html\`<ui5-message-strip 
    design="\${ifDefined(args.design)}"
    ?hide-icon="\${ifDefined(args.hideIcon)}"
    ?hide-close-button="\${ifDefined(args.hideCloseButton)}"
>
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.default)}
</ui5-message-strip>
\``,...(S=(f=n.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};const C=["Basic","Dynamic","Custom"],D=Object.freeze(Object.defineProperty({__proto__:null,Basic:t,Custom:n,Dynamic:i,__namedExportsOrder:C,default:x},Symbol.toStringTag,{value:"Module"}));export{D as C,N as c};
