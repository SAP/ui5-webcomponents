import{x as u}from"./lit-element-c5a2b594.js";import{l as o}from"./if-defined-c29cffe1.js";import{o as D}from"./unsafe-html-0ddd83da.js";import{B as i}from"./ButtonDesign-57d82709.js";const S={design:{control:"select",options:["Default","Positive","Negative","Transparent","Emphasized","Attention"]},default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}}},x={package:"@ui5/webcomponents",since:"1.1.0",tagName:"ui5-split-button"};var a=Object.freeze,_=Object.defineProperty,A=(t,$)=>a(_(t,"raw",{value:a($||t.slice())})),r;const h={title:"Main/SplitButton",component:"SplitButton",argTypes:S},B=t=>u`<ui5-split-button
    ?disabled="${o(t.disabled)}"
    design="${o(t.design)}"
    icon="${o(t.icon)}"
    accessible-name="${o(t.accessibleName)}"
>
    ${D(t.default)}
</ui5-split-button>`,n=B.bind({});n.args={default:"Default",accessibleName:"Split Button with Accessible Name"};const e=B.bind(void 0);e.args={default:"Open Menu"};e.decorators=[t=>u(r||(r=A([`
		<ui5-menu id="menuInSplitBtnDefaultAction">
			<ui5-menu-item text="Edit" icon="add"></ui5-menu-item>
			<ui5-menu-item text="Save" icon="save"></ui5-menu-item>
			<ui5-menu-item text="Delete" icon="delete"></ui5-menu-item>
		</ui5-menu>
	`,`
	<script>
	var splitBtn = document.querySelector("ui5-split-button");
	var menu = document.getElementById("menuInSplitBtnDefaultAction");
	
	splitBtn.addEventListener("ui5-arrow-click", function() {
		if (menu.open) {
			menu.close();
			splitBtn.activeArrowButton = false;
		} else {
			menu.showAt(splitBtn);
			splitBtn.activeArrowButton = true;
		}
	});
	
	menu.addEventListener("close", function() {
		splitBtn.activeArrowButton = false;
	});
	<\/script>`])),t())];e.parameters={docs:{story:{inline:!1,iframeHeight:"150px"}}};const s=()=>u`
    <ui5-split-button design="${i.Emphasized}"> Emphasized </ui5-split-button>
    <ui5-split-button design="${i.Attention}"> Attention </ui5-split-button>
    <ui5-split-button design="${i.Positive}"> Positive </ui5-split-button>
    <ui5-split-button design="${i.Negative}"> Negative </ui5-split-button>
    <ui5-split-button design="${i.Transparent}"> Transparent </ui5-split-button>
`;var l,p,c;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:'args => html`<ui5-split-button\n    ?disabled="${ifDefined(args.disabled)}"\n    design="${ifDefined(args.design)}"\n    icon="${ifDefined(args.icon)}"\n    accessible-name="${ifDefined(args.accessibleName)}"\n>\n    ${unsafeHTML(args.default)}\n</ui5-split-button>`',...(c=(p=n.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var d,m,b;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:"Template.bind(this)",...(b=(m=e.parameters)==null?void 0:m.docs)==null?void 0:b.source}}};var g,f,v;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:'() => html`\n    <ui5-split-button design="${ButtonDesign.Emphasized}"> Emphasized </ui5-split-button>\n    <ui5-split-button design="${ButtonDesign.Attention}"> Attention </ui5-split-button>\n    <ui5-split-button design="${ButtonDesign.Positive}"> Positive </ui5-split-button>\n    <ui5-split-button design="${ButtonDesign.Negative}"> Negative </ui5-split-button>\n    <ui5-split-button design="${ButtonDesign.Transparent}"> Transparent </ui5-split-button>\n`',...(v=(f=s.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};const y=["Basic","OpeningMenu","DifferentDesigns"],z=Object.freeze(Object.defineProperty({__proto__:null,Basic:n,DifferentDesigns:s,OpeningMenu:e,__namedExportsOrder:y,default:h},Symbol.toStringTag,{value:"Module"}));export{z as C,x as c};
