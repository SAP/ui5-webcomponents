import{x as r}from"./lit-element-c5a2b594.js";import{o as w}from"./unsafe-html-0ddd83da.js";import{l as o}from"./if-defined-c29cffe1.js";const O={default:{control:{type:"text"},table:{type:{summary:"Array<MenuItem>"}}},showAt:{description:"Shows the Menu near the opener element.",table:{category:"methods"},UI5CustomData:{parameters:[{name:"opener",type:{text:"HTMLElement"},description:"the element that the popover is shown at",_ui5privacy:"public"}],returnValue:{type:{text:"Promise<void>"}}}},close:{description:"Closes the Menu.",table:{category:"methods"},UI5CustomData:{returnValue:{type:{text:"void"}}}},"item-click":{description:`Fired when an item is being clicked.

**Note:** Since 1.17.0 the event is preventable, allowing the menu to remain open after an item is pressed.`,control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"item",_ui5privacy:"public",description:"The currently clicked menu item."},{type:{text:"string"},name:"text",_ui5privacy:"public",description:"The text of the currently clicked menu item."}]}},"before-open":{description:`Fired before the menu is opened. This event can be cancelled, which will prevent the menu from opening. **This event does not bubble.**

**Note:** Since 1.14.0 the event is also fired before a sub-menu opens.`,control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"item",_ui5privacy:"public",description:"The `ui5-menu-item` that triggers opening of the sub-menu or undefined when fired upon root menu opening.",_ui5since:"1.14.0"}]}},"before-close":{description:"Fired before the menu is closed. This event can be cancelled, which will prevent the menu from closing. **This event does not bubble.**",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"boolean"},name:"escPressed",_ui5privacy:"public",description:"Indicates that `ESC` key has triggered the event."}]}},"item-focus":{description:"Fired when a menu item receives focus.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"ref",_ui5privacy:"public",description:"The currently focused element representing a <code>ui5-menu-item</code>."},{type:{text:"HTMLElement"},name:"item",_ui5privacy:"public",description:"The <code>ui5-menu-item</code> represented by the focused element."}]}}},E={package:"@ui5/webcomponents",since:"1.3.0",tagName:"ui5-menu"};var m=Object.freeze,M=Object.defineProperty,u=(e,T)=>m(M(e,"raw",{value:m(T||e.slice())})),s,c,d;const _={title:"Main/Menu",component:"Menu",argTypes:O},a=e=>r`<ui5-menu
    header-text="${o(e.headerText)}"
    opener="${o(e.opener)}"
    ?open="${o(e.open)}"
    id="${o(e.id)}"
>
    ${w(e.default)}
</ui5-menu>`,t=a.bind({});t.storyName="Basic";t.args={id:"menuBasic",headerText:"Basic Menu with Items",default:`<ui5-menu-item text="New File" icon="add-document"></ui5-menu-item>
<ui5-menu-item text="New Folder" icon="add-folder" disabled=""></ui5-menu-item>
<ui5-menu-item text="Open" icon="open-folder" starts-section=""></ui5-menu-item>
<ui5-menu-item text="Close"></ui5-menu-item>
<ui5-menu-item text="Preferences" icon="action-settings" starts-section=""></ui5-menu-item>
<ui5-menu-item text="Exit" icon="journey-arrive"></ui5-menu-item>`};t.decorators=[e=>r(s||(s=u([`<ui5-button id="btnOpenBasic" class="samples-margin" icon="slim-arrow-down" icon-end>Open Menu</ui5-button> <br/>
	`,`
	<script>
		btnOpenBasic.addEventListener("click", function(event) {
			menuBasic.showAt(btnOpenBasic);
		});
	<\/script>`])),e())];t.parameters={docs:{story:{inline:!1}}};const n=a.bind({});n.storyName="Menu with Submenu";n.args={id:"menuSubs",default:`<ui5-menu-item text="New File" icon="add-document"></ui5-menu-item>
<ui5-menu-item text="New Folder" icon="add-folder" disabled=""></ui5-menu-item>
<ui5-menu-item text="Open" icon="open-folder" starts-section="">
    <ui5-menu-item text="Open Locally" icon="open-folder">
        <ui5-menu-item text="Open from C"></ui5-menu-item>
        <ui5-menu-item text="Open from D"></ui5-menu-item>
        <ui5-menu-item text="Open from E"></ui5-menu-item>
    </ui5-menu-item>
    <ui5-menu-item text="Open from Cloud"></ui5-menu-item>
</ui5-menu-item>
<ui5-menu-item text="Save" icon="save">
    <ui5-menu-item text="Save Locally" icon="save">
        <ui5-menu-item text="Save on C" icon="save"></ui5-menu-item>
        <ui5-menu-item text="Save on D" icon="save"></ui5-menu-item>
        <ui5-menu-item text="Save on E" icon="save"></ui5-menu-item>
    </ui5-menu-item>
    <ui5-menu-item text="Save on Cloud" icon="upload-to-cloud"></ui5-menu-item>
</ui5-menu-item>
<ui5-menu-item text="Close"></ui5-menu-item>
<ui5-menu-item text="Preferences" icon="action-settings" starts-section=""></ui5-menu-item>
<ui5-menu-item text="Exit" icon="journey-arrive"></ui5-menu-item>`};n.decorators=[e=>r(c||(c=u([`<ui5-button id="btnOpenBasic" class="samples-margin" icon="slim-arrow-down" icon-end>Open Menu</ui5-button> <br/>
	`,`
	<script>
		btnOpenBasic.addEventListener("click", function(event) {
			menuSubs.showAt(btnOpenBasic);
		});
	<\/script>`])),e())];n.parameters={docs:{story:{inline:!1}}};const i=a.bind({});i.storyName="Menu Items with Additional Text";i.args={id:"menuAdditionalText",default:`<ui5-menu-item text="New File" icon="add-document" additional-text="Ctrl+N"></ui5-menu-item>
<ui5-menu-item text="New Folder" icon="add-folder" additional-text="Ctrl+F" disabled=""></ui5-menu-item>
<ui5-menu-item text="Open" icon="open-folder" starts-section=""></ui5-menu-item>
<ui5-menu-item text="Close"></ui5-menu-item>
<ui5-menu-item text="Preferences" icon="action-settings" starts-section=""></ui5-menu-item>
<ui5-menu-item text="Exit" icon="journey-arrive" additional-text="Ctrl+X"></ui5-menu-item>`};i.decorators=[e=>r(d||(d=u([`<ui5-button id="btnOpenAdditionalText" class="samples-margin" icon="slim-arrow-down" icon-end>Open Menu</ui5-button> <br/>
	`,`
	<script>
		btnOpenAdditionalText.addEventListener("click", function(event) {
			menuAdditionalText.showAt(btnOpenAdditionalText);
		});
	<\/script>`])),e())];i.parameters={docs:{story:{inline:!1}}};var p,l,f;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:'args => html`<ui5-menu\n    header-text="${ifDefined(args.headerText)}"\n    opener="${ifDefined(args.opener)}"\n    ?open="${ifDefined(args.open)}"\n    id="${ifDefined(args.id)}"\n>\n    ${unsafeHTML(args.default)}\n</ui5-menu>`',...(f=(l=t.parameters)==null?void 0:l.docs)==null?void 0:f.source}}};var b,x,h;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:'args => html`<ui5-menu\n    header-text="${ifDefined(args.headerText)}"\n    opener="${ifDefined(args.opener)}"\n    ?open="${ifDefined(args.open)}"\n    id="${ifDefined(args.id)}"\n>\n    ${unsafeHTML(args.default)}\n</ui5-menu>`',...(h=(x=n.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var v,y,g;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:'args => html`<ui5-menu\n    header-text="${ifDefined(args.headerText)}"\n    opener="${ifDefined(args.opener)}"\n    ?open="${ifDefined(args.open)}"\n    id="${ifDefined(args.id)}"\n>\n    ${unsafeHTML(args.default)}\n</ui5-menu>`',...(g=(y=i.parameters)==null?void 0:y.docs)==null?void 0:g.source}}};const S=["Basic","SubMenu","AditionalText"],A=Object.freeze(Object.defineProperty({__proto__:null,AditionalText:i,Basic:t,SubMenu:n,__namedExportsOrder:S,default:_},Symbol.toStringTag,{value:"Module"}));export{A as C,E as c};
