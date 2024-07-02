import{x as a}from"./lit-element-c5a2b594.js";import{l as i}from"./if-defined-c29cffe1.js";import{o as D}from"./unsafe-html-0ddd83da.js";import{B as s}from"./ButtonDesign-57d82709.js";const S={design:{control:"select",options:["Default","Positive","Negative","Transparent","Emphasized","Attention"]},default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}}},x={package:"@ui5/webcomponents",since:"1.1.0",tagName:"ui5-split-button"};var u=Object.freeze,_=Object.defineProperty,A=(t,$)=>u(_(t,"raw",{value:u($||t.slice())})),r;const h={title:"Main/SplitButton",component:"SplitButton",argTypes:S},B=t=>a`<ui5-split-button
    ?disabled="${i(t.disabled)}"
    design="${i(t.design)}"
    icon="${i(t.icon)}"
    active-icon="${i(t.activeIcon)}"
    accessible-name="${i(t.accessibleName)}"
>
    ${D(t.default)}
</ui5-split-button>`,n=B.bind({});n.args={default:"Default",accessibleName:"Split Button with Accessible Name"};const e=B.bind(void 0);e.args={default:"Open Menu"};e.decorators=[t=>a(r||(r=A([`
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
	
	menu.addEventListener("after-close", function() {
		splitBtn.activeArrowButton = false;
	});
	<\/script>`])),t())];e.parameters={docs:{story:{inline:!1,iframeHeight:"150px"}}};const o=()=>a`
    <ui5-split-button design="${s.Emphasized}"> Emphasized </ui5-split-button>
    <ui5-split-button design="${s.Attention}"> Attention </ui5-split-button>
    <ui5-split-button design="${s.Positive}"> Positive </ui5-split-button>
    <ui5-split-button design="${s.Negative}"> Negative </ui5-split-button>
    <ui5-split-button design="${s.Transparent}"> Transparent </ui5-split-button>
`;var l,p,c;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:'args => html`<ui5-split-button\n    ?disabled="${ifDefined(args.disabled)}"\n    design="${ifDefined(args.design)}"\n    icon="${ifDefined(args.icon)}"\n    active-icon="${ifDefined(args.activeIcon)}"\n    accessible-name="${ifDefined(args.accessibleName)}"\n>\n    ${unsafeHTML(args.default)}\n</ui5-split-button>`',...(c=(p=n.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var d,m,b;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:"Template.bind(this)",...(b=(m=e.parameters)==null?void 0:m.docs)==null?void 0:b.source}}};var f,g,v;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:'() => html`\n    <ui5-split-button design="${ButtonDesign.Emphasized}"> Emphasized </ui5-split-button>\n    <ui5-split-button design="${ButtonDesign.Attention}"> Attention </ui5-split-button>\n    <ui5-split-button design="${ButtonDesign.Positive}"> Positive </ui5-split-button>\n    <ui5-split-button design="${ButtonDesign.Negative}"> Negative </ui5-split-button>\n    <ui5-split-button design="${ButtonDesign.Transparent}"> Transparent </ui5-split-button>\n`',...(v=(g=o.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};const y=["Basic","OpeningMenu","DifferentDesigns"],z=Object.freeze(Object.defineProperty({__proto__:null,Basic:n,DifferentDesigns:o,OpeningMenu:e,__namedExportsOrder:y,default:h},Symbol.toStringTag,{value:"Module"}));export{z as C,x as c};
