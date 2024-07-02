import{x as u}from"./lit-element-c5a2b594.js";import{o as m}from"./unsafe-html-0ddd83da.js";import{l as n}from"./if-defined-c29cffe1.js";const d={default:{control:{type:"text"},table:{type:{summary:"Array<MenuItem>"}}}},O={package:"@ui5/webcomponents",since:"1.3.0",tagName:"ui5-menu-item",showDefaultStoryOnly:!0};var i=Object.freeze,l=Object.defineProperty,f=(e,c)=>i(l(e,"raw",{value:i(c||e.slice())})),a;const p={title:"Main/Menu/MenuItem",component:"MenuItem",argTypes:d},b=e=>u`<ui5-menu id="menuBasic">
    <ui5-menu-item
    accessible-name="${n(e.accessibleName)}"
    additional-text="${n(e.additionalText)}"
    ?busy="${n(e.busy)}"
    busy-delay="${n(e.busyDelay)}"
    ?disabled="${n(e.disabled)}"
    icon="${n(e.icon)}"
    ?starts-section="${n(e.startsSection)}"
    text="${n(e.text)}"
    >
        ${m(e.default)}
    </ui5-menu-item>
</ui5-menu>`,t=b.bind({});t.storyName="MenuItem";t.args={icon:"open-folder",text:"Open",startsSection:!0,default:`<ui5-menu-item text="Open Locally" icon="open-folder"></ui5-menu-item>
  <ui5-menu-item text="Open from Cloud"></ui5-menu-item>`};t.decorators=[e=>u(a||(a=f([`<ui5-button id="btnOpenBasic" class="samples-margin" icon="slim-arrow-down" icon-end>Open Menu</ui5-button> <br/>
	`,`
	<script>
		btnOpenBasic.addEventListener("click", function(event) {
			menuBasic.showAt(btnOpenBasic);
		});
	<\/script>`])),e())];t.tags=["_hidden_"];t.parameters={docs:{story:{inline:!1}}};var s,o,r;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`args => html\`<ui5-menu id="menuBasic">
    <ui5-menu-item
    accessible-name="\${ifDefined(args.accessibleName)}"
    additional-text="\${ifDefined(args.additionalText)}"
    ?busy="\${ifDefined(args.busy)}"
    busy-delay="\${ifDefined(args.busyDelay)}"
    ?disabled="\${ifDefined(args.disabled)}"
    icon="\${ifDefined(args.icon)}"
    ?starts-section="\${ifDefined(args.startsSection)}"
    text="\${ifDefined(args.text)}"
    >
        \${unsafeHTML(args.default)}
    </ui5-menu-item>
</ui5-menu>\``,...(r=(o=t.parameters)==null?void 0:o.docs)==null?void 0:r.source}}};const y=["Basic"],g=Object.freeze(Object.defineProperty({__proto__:null,Basic:t,__namedExportsOrder:y,default:p},Symbol.toStringTag,{value:"Module"}));export{g as C,O as c};
