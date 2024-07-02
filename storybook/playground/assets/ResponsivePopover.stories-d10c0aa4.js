import{x as p}from"./lit-element-c5a2b594.js";import{l as o}from"./if-defined-c29cffe1.js";import{o as n}from"./unsafe-html-0ddd83da.js";const d={placement:{control:"select",options:["Start","End","Top","Bottom"]},horizontalAlign:{control:"select",options:["Center","Start","End","Stretch"]},verticalAlign:{control:"select",options:["Center","Top","Bottom","Stretch"]},accessibleRole:{control:"select",options:["None","Dialog","AlertDialog"]},header:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},footer:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},default:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},applyFocus:{description:"Focuses the element denoted by `initialFocus`, if provided,\nor the first focusable element otherwise.",table:{category:"methods"},UI5CustomData:{returnValue:{type:{text:"Promise<void>"},description:"Promise that resolves when the focus is applied"}}},"before-close":{description:"Fired before the component is closed. This event can be cancelled, which will prevent the popup from closing. **This event does not bubble.**",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"boolean"},name:"escPressed",_ui5privacy:"public",description:"Indicates that `ESC` key has triggered the event."}]}}},$={package:"@ui5/webcomponents",since:"1.0.0-rc.6",tagName:"ui5-responsive-popover"};var r=Object.freeze,u=Object.defineProperty,f=(e,c)=>r(u(e,"raw",{value:r(c||e.slice())})),i;const m={title:"Main/Responsive Popover",component:"ResponsivePopover",parameters:{docs:{story:{inline:!1,iframeHeight:"700px"}}},argTypes:d},v=e=>p`<ui5-responsive-popover
    initial-focus="${o(e.initialFocus)}"
    ?prevent-focus-restore="${o(e.preventFocusRestore)}"
    ?open="${o(e.open)}"
    accessible-name="${o(e.accessibleName)}"
    accessible-name-ref="${o(e.accessibleNameRef)}"
    accessible-role="${o(e.accessibleRole)}"
    header-text="${o(e.headerText)}"
    placement="${o(e.placement)}"
    horizontal-align="${o(e.horizontalAlign)}"
    vertical-align="${o(e.verticalAlign)}"
    ?modal="${o(e.modal)}"
    ?hire-arrow="${o(e.hideArrow)}"
    ?allow-target-overlap="${o(e.allowTargetOverlap)}"
    opener="${o(e.opener)}"
    >
    ${n(e.header)}
    ${n(e.default)}
    ${n(e.footer)}
</ui5-responsive-popover>`,t=v.bind({});t.args={headerText:"Newsletter subscription",default:`<div class="popover-content">
    <ui5-label for="emailInput" required show-colon>Email</ui5-label>
    <ui5-input id="emailInput" style="min-width: 150px;" placeholder="Enter Email"></ui5-input>
    <ui5-label>Note: If you open the page in mobile, a dialog would be displayed.</ui5-label>
</div>`,footer:`<div slot="footer" class="popover-footer">
    <ui5-button id="closePopoverButton" design="Emphasized">Subscribe</ui5-button>
</div>`};t.decorators=[e=>p(i||(i=f([`<style>
	.popover-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.popover-footer {
		display: flex;
		justify-content: flex-end;
		width: 100%;
		align-items: center;
		padding: 0.5rem 0;
	}
</style>

<ui5-button id="openPopoverButton" design="Emphasized">Open ResponsivePopover</ui5-button>
`,`

<script>
	var popoverOpener = document.getElementById("openPopoverButton");
	var popover = document.querySelector("ui5-responsive-popover");
	var popoverCloser = document.getElementById("closePopoverButton");
	popoverOpener.addEventListener("click", () => {
		popover.opener = popoverOpener;
		popover.open = true;
	});
	popoverCloser.addEventListener("click", () => {
		popover.open = false;
	});
<\/script>`])),e())];var a,s,l;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
  return html\`<ui5-responsive-popover
    initial-focus="\${ifDefined(args.initialFocus)}"
    ?prevent-focus-restore="\${ifDefined(args.preventFocusRestore)}"
    ?open="\${ifDefined(args.open)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
    accessible-role="\${ifDefined(args.accessibleRole)}"
    header-text="\${ifDefined(args.headerText)}"
    placement="\${ifDefined(args.placement)}"
    horizontal-align="\${ifDefined(args.horizontalAlign)}"
    vertical-align="\${ifDefined(args.verticalAlign)}"
    ?modal="\${ifDefined(args.modal)}"
    ?hire-arrow="\${ifDefined(args.hideArrow)}"
    ?allow-target-overlap="\${ifDefined(args.allowTargetOverlap)}"
    opener="\${ifDefined(args.opener)}"
    >
    \${unsafeHTML(args.header)}
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.footer)}
</ui5-responsive-popover>\`;
}`,...(l=(s=t.parameters)==null?void 0:s.docs)==null?void 0:l.source}}};const b=["Basic"],w=Object.freeze(Object.defineProperty({__proto__:null,Basic:t,__namedExportsOrder:b,default:m},Symbol.toStringTag,{value:"Module"}));export{w as C,$ as c};
