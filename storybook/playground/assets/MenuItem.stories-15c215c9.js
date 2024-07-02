import{x as d}from"./lit-element-c5a2b594.js";import{o as c}from"./unsafe-html-0ddd83da.js";import{l as t}from"./if-defined-c29cffe1.js";const u={default:{control:{type:"text"},table:{type:{summary:"Array<MenuItem>"}}}},x={package:"@ui5/webcomponents",since:"1.3.0",tagName:"ui5-menu-item",showDefaultStoryOnly:!0};var i=Object.freeze,l=Object.defineProperty,f=(e,m)=>i(l(e,"raw",{value:i(m||e.slice())})),a;const p={title:"Main/Menu/MenuItem",component:"MenuItem",argTypes:u},b=e=>d`<ui5-menu id="menuBasic">
    <ui5-menu-item
    accessible-name="${t(e.accessibleName)}"
    additional-text="${t(e.additionalText)}"
    ?loading="${t(e.loading)}"
    loading-delay="${t(e.loadingDelay)}"
    ?disabled="${t(e.disabled)}"
    icon="${t(e.icon)}"
    ?starts-section="${t(e.startsSection)}"
    text="${t(e.text)}"
    >
        ${c(e.default)}
    </ui5-menu-item>
</ui5-menu>`,n=b.bind({});n.storyName="MenuItem";n.args={icon:"open-folder",text:"Open",startsSection:!0,default:`<ui5-menu-item text="Open Locally" icon="open-folder"></ui5-menu-item>
  <ui5-menu-item text="Open from Cloud"></ui5-menu-item>`};n.decorators=[e=>d(a||(a=f([`<ui5-button id="btnOpenBasic" class="samples-margin" end-icon="slim-arrow-down">Open Menu</ui5-button> <br/>
	`,`
	<script>
		btnOpenBasic.addEventListener("click", function(event) {
			menuBasic.showAt(btnOpenBasic);
		});
	<\/script>`])),e())];n.tags=["_hidden_"];n.parameters={docs:{story:{inline:!1}}};var o,s,r;n.parameters={...n.parameters,docs:{...(o=n.parameters)==null?void 0:o.docs,source:{originalSource:`args => html\`<ui5-menu id="menuBasic">
    <ui5-menu-item
    accessible-name="\${ifDefined(args.accessibleName)}"
    additional-text="\${ifDefined(args.additionalText)}"
    ?loading="\${ifDefined(args.loading)}"
    loading-delay="\${ifDefined(args.loadingDelay)}"
    ?disabled="\${ifDefined(args.disabled)}"
    icon="\${ifDefined(args.icon)}"
    ?starts-section="\${ifDefined(args.startsSection)}"
    text="\${ifDefined(args.text)}"
    >
        \${unsafeHTML(args.default)}
    </ui5-menu-item>
</ui5-menu>\``,...(r=(s=n.parameters)==null?void 0:s.docs)==null?void 0:r.source}}};const g=["Basic"],O=Object.freeze(Object.defineProperty({__proto__:null,Basic:n,__namedExportsOrder:g,default:p},Symbol.toStringTag,{value:"Module"}));export{O as C,x as c};
