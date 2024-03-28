import{x as p}from"./lit-element-c5a2b594.js";import{l as t}from"./if-defined-c29cffe1.js";import{o as n}from"./unsafe-html-0ddd83da.js";const d={placementType:{control:"select",options:["Left","Right","Top","Bottom"]},horizontalAlign:{control:"select",options:["Center","Left","Right","Stretch"]},verticalAlign:{control:"select",options:["Center","Top","Bottom","Stretch"]},accessibleRole:{control:"select",options:["None","Dialog","AlertDialog"]},header:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},footer:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},default:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},showAt:{description:"Shows the popover.",table:{category:"methods"},UI5CustomData:{parameters:[{name:"opener",type:{text:"HTMLElement"},description:"the element that the popover is shown at",_ui5privacy:"public"},{name:"preventInitialFocus",default:"false",description:"prevents applying the focus inside the popover",optional:!0,_ui5privacy:"public",type:{text:"boolean"}}],returnValue:{type:{text:"Promise<void>"},description:"Resolved when the popover is open"}}},applyFocus:{description:"Focuses the element denoted by `initialFocus`, if provided,\nor the first focusable element otherwise.",table:{category:"methods"},UI5CustomData:{returnValue:{type:{text:"Promise<void>"},description:"Promise that resolves when the focus is applied"}}},isOpen:{description:"Tells if the component is opened",table:{category:"methods"},UI5CustomData:{returnValue:{type:{text:"boolean"}}}},close:{description:"Closes the popup.",table:{category:"methods"},UI5CustomData:{returnValue:{type:{text:"void"}}}},"before-close":{description:"Fired before the component is closed. This event can be cancelled, which will prevent the popup from closing. **This event does not bubble.**",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"boolean"},name:"escPressed",_ui5privacy:"public",description:"Indicates that `ESC` key has triggered the event."}]}}},$={package:"@ui5/webcomponents",since:"1.0.0-rc.6",tagName:"ui5-popover"};var r=Object.freeze,u=Object.defineProperty,m=(e,c)=>r(u(e,"raw",{value:r(c||e.slice())})),i;const f={title:"Main/Popover",component:"Popover",parameters:{docs:{story:{inline:!1,iframeHeight:"700px"}}},argTypes:d},v=e=>p`<ui5-popover
    initial-focus="${t(e.initialFocus)}"
    ?prevent-focus-restore="${t(e.preventFocusRestore)}"
    ?open="${t(e.open)}"
    accessible-name="${t(e.accessibleName)}"
    accessible-name-ref="${t(e.accessibleNameRef)}"
    accessible-role="${t(e.accessibleRole)}"
    header-text="${t(e.headerText)}"
    placement-type="${t(e.placementType)}"
    horizontal-align="${t(e.horizontalAlign)}"
    vertical-align="${t(e.verticalAlign)}"
    ?modal="${t(e.modal)}"
    ?hide-backdrop="${t(e.hideBackdrop)}"
    ?hire-arrow="${t(e.hideArrow)}"
    ?allow-target-overlap="${t(e.allowTargetOverlap)}"
    opener="${t(e.opener)}"
    >
    ${n(e.header)}
    ${n(e.default)}
    ${n(e.footer)}
</ui5-popover>`,o=v.bind({});o.args={headerText:"Newsletter subscription",default:`<div class="popover-content">
    <div class="flex-column">
        <ui5-label for="emailInput" required show-colon>Email</ui5-label>
        <ui5-input id="emailInput" style="min-width: 150px; margin-top: 1rem;" placeholder="Enter Email"></ui5-input>
    </div>
</div>`,footer:`<div slot="footer" class="popover-footer">
    <div style="flex: 1;"></div>
    <ui5-button id="closePopoverButton" design="Emphasized">Subscribe</ui5-button>
</div>`};o.decorators=[e=>p(i||(i=m([`<style>
	.popover-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.flex-column {
		display: flex;
		flex-direction: column;
	}

	.popover-footer {
		display: flex;
		justify-content: flex-end;
		width: 100%;
		align-items: center;
		padding: 0.5rem 0;
	}
</style>

<ui5-button id="openPopoverButton" design="Emphasized">Open Popover</ui5-button>
`,`

<script>
	var popoverOpener = document.getElementById("openPopoverButton");
	var popover = document.querySelector("ui5-popover");
	var popoverCloser = document.getElementById("closePopoverButton");
	popoverOpener.addEventListener("click", () => {
		popover.showAt(popoverOpener);
	});
	popoverCloser.addEventListener("click", () => {
		popover.close();
	});
<\/script>`])),e())];var a,l,s;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
  return html\`<ui5-popover
    initial-focus="\${ifDefined(args.initialFocus)}"
    ?prevent-focus-restore="\${ifDefined(args.preventFocusRestore)}"
    ?open="\${ifDefined(args.open)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
    accessible-role="\${ifDefined(args.accessibleRole)}"
    header-text="\${ifDefined(args.headerText)}"
    placement-type="\${ifDefined(args.placementType)}"
    horizontal-align="\${ifDefined(args.horizontalAlign)}"
    vertical-align="\${ifDefined(args.verticalAlign)}"
    ?modal="\${ifDefined(args.modal)}"
    ?hide-backdrop="\${ifDefined(args.hideBackdrop)}"
    ?hire-arrow="\${ifDefined(args.hideArrow)}"
    ?allow-target-overlap="\${ifDefined(args.allowTargetOverlap)}"
    opener="\${ifDefined(args.opener)}"
    >
    \${unsafeHTML(args.header)}
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.footer)}
</ui5-popover>\`;
}`,...(s=(l=o.parameters)==null?void 0:l.docs)==null?void 0:s.source}}};const h=["Basic"],x=Object.freeze(Object.defineProperty({__proto__:null,Basic:o,__namedExportsOrder:h,default:f},Symbol.toStringTag,{value:"Module"}));export{x as C,$ as c};
