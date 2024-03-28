import{x as d}from"./lit-element-c5a2b594.js";import{l as n}from"./if-defined-c29cffe1.js";import{o as l}from"./unsafe-html-0ddd83da.js";import{V as O}from"./ValueState-2c5e5904.js";const C={state:{control:"select",options:["None","Success","Warning","Error","Information"]},accessibleRole:{control:"select",options:["None","Dialog","AlertDialog"]},header:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},footer:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},default:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},show:{description:"Shows the dialog.",table:{category:"methods"},UI5CustomData:{parameters:[{name:"preventInitialFocus",default:"false",description:"Prevents applying the focus inside the popup",optional:!0,_ui5privacy:"public",type:{text:"boolean"}}],returnValue:{type:{text:"Promise<void>"},description:"Resolves when the dialog is open"}}},applyFocus:{description:"Focuses the element denoted by `initialFocus`, if provided,\nor the first focusable element otherwise.",table:{category:"methods"},UI5CustomData:{returnValue:{type:{text:"Promise<void>"},description:"Promise that resolves when the focus is applied"}}},isOpen:{description:"Tells if the component is opened",table:{category:"methods"},UI5CustomData:{returnValue:{type:{text:"boolean"}}}},close:{description:"Closes the popup.",table:{category:"methods"},UI5CustomData:{returnValue:{type:{text:"void"}}}},"before-close":{description:"Fired before the component is closed. This event can be cancelled, which will prevent the popup from closing. **This event does not bubble.**",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"boolean"},name:"escPressed",_ui5privacy:"public",description:"Indicates that `ESC` key has triggered the event."}]}}},A={package:"@ui5/webcomponents",tagName:"ui5-dialog"};var c=Object.freeze,T=Object.defineProperty,w=(e,r)=>c(T(e,"raw",{value:c(r||e.slice())})),g;const L={title:"Main/Dialog",component:"Dialog",argTypes:C,parameters:{docs:{story:{iframeHeight:"800px",inline:!1}}}},s=e=>d(g||(g=w([`
<ui5-button id="dialogOpener">Open Dialog</ui5-button>

<ui5-dialog
	id="dialog"
	header-text="`,`"
	?stretch="`,`"
	?draggable="`,`"
	?resizable="`,`"
	state="`,`"
	initial-focus="`,`"
	?prevent-focus-restore="`,`"
	?open="`,`"
	accessible-name="`,`"
	accessible-name-ref="`,`"
	accessible-role="`,`"
>
	`,`
	`,`
	`,`
</ui5-dialog>

<script>
	var dialogOpener = document.getElementById("dialogOpener");
	var dialog = document.getElementById("dialog"); 
	var dialogClosers = [...dialog.querySelectorAll(".dialogCloser")];

	dialogOpener.accessibilityAttributes = {
		hasPopup: "dialog",
		controls: dialog.id,
	};
	dialogOpener.addEventListener("click", () => {
		dialog.open = true;
	});
	dialogClosers.forEach(btn => {
		btn.addEventListener("click", () => {
			dialog.open = false;
		});
	})
<\/script>`])),n(e.headerText),n(e.stretch),n(e.draggable),n(e.resizable),n(e.state),n(e.initialFocus),n(e.preventFocusRestore),n(e.open),n(e.accessibleName),n(e.accessibleNameRef),n(e.accessibleRole),l(e.header),l(e.default),l(e.footer)),a=s.bind({});a.args={headerText:"Register Form",default:`<section class="login-form">
    <div>
        <ui5-label for="username" required show-colon>Username</ui5-label>
        <ui5-input id="username"></ui5-input>
    </div>
    <div>
        <ui5-label for="password" required show-colon>Password</ui5-label>
        <ui5-input id="password" type="Password" value-state="Error"></ui5-input>
    </div>
    <div>
        <ui5-label for="email" type="Email" required show-colon>Email</ui5-label>
        <ui5-input id="email"></ui5-input>
    </div>
    <div>
        <ui5-label for="address" show-colon>Address</ui5-label>
        <ui5-input id="address"></ui5-input>
    </div>
</section>`,footer:`<div slot="footer" style="display: flex; justify-content: flex-end; width: 100%; align-items: center">
    <div style="flex: 1;"></div>
    <ui5-button class="dialogCloser" design="Emphasized">Register</ui5-button>
</div>`};a.decorators=[e=>d`<style>
    .login-form {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-start;
        margin: 3rem 6rem;
    }
    
    .login-form > div {
        display: grid;
        width: 15rem;
        margin-bottom: .5rem;
    }

    @media(max-width: 600px) {
        .login-form {
            margin: 3rem 1rem;
        }
    }
</style>
${e()}`];const o=s.bind({});o.args={resizable:!0,draggable:!0,headerText:"Draggable/Resizable dialog",default:`<p>Move this dialog around the screen by dragging it by its header.</p>
<p>Resize this dialog by dragging it by its resize handle.</p>
<p>These features are available only on Desktop.</p>`,footer:`<div slot="footer" style="display: flex; justify-content: flex-end; width: 100%; align-items: center">
    <ui5-button class="dialogCloser" design="Emphasized">OK</ui5-button>
</div>`};const i=s.bind({});i.storyName="Bar in Header/Footer";i.args={header:`<ui5-bar slot="header" design="Header">
    <ui5-title level="H5" slot="startContent">Bar used in Header and Footer</ui5-title>
    <ui5-button class="dialogCloser" design="Transparent" id="closeDialogButton" slot="endContent" icon="decline"></ui5-button>
</ui5-bar>`,default:"<p>Adding styles for the parts to remove the default Dialog's paddings when ui5-bar is used inside Header and Footer</p>",footer:`<ui5-bar slot="footer" design="Footer">
    <ui5-button class="dialogCloser" design="Emphasized" slot="endContent" style="min-width: 4rem;">OK</ui5-button>
</ui5-bar>`};i.decorators=[e=>d`<style>
    #dialog::part(header),
    #dialog::part(footer) {
        padding-inline: 0;
    }
</style>
${e()}`];const t=s.bind({});t.args={state:O.Error,default:"<p>Dialog with state</p>",footer:`<div slot="footer" style="display: flex; justify-content: flex-end; width: 100%; align-items: center">
    <ui5-button class="dialogCloser">Close</ui5-button>
</div>`};t.decorators=[(e,{args:r})=>e({args:{...r,headerText:r.state}})];var u,p,f;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  return html\`
<ui5-button id="dialogOpener">Open Dialog</ui5-button>

<ui5-dialog
    id="dialog"
    header-text="\${ifDefined(args.headerText)}"
    ?stretch="\${ifDefined(args.stretch)}"
    ?draggable="\${ifDefined(args.draggable)}"
    ?resizable="\${ifDefined(args.resizable)}"
    state="\${ifDefined(args.state)}"
    initial-focus="\${ifDefined(args.initialFocus)}"
    ?prevent-focus-restore="\${ifDefined(args.preventFocusRestore)}"
    ?open="\${ifDefined(args.open)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
    accessible-role="\${ifDefined(args.accessibleRole)}"
>
    \${unsafeHTML(args.header)}
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.footer)}
</ui5-dialog>

<script>
    var dialogOpener = document.getElementById("dialogOpener");
    var dialog = document.getElementById("dialog"); 
    var dialogClosers = [...dialog.querySelectorAll(".dialogCloser")];

    dialogOpener.accessibilityAttributes = {
        hasPopup: "dialog",
        controls: dialog.id,
    };
    dialogOpener.addEventListener("click", () => {
        dialog.open = true;
    });
    dialogClosers.forEach(btn => {
        btn.addEventListener("click", () => {
            dialog.open = false;
        });
    })
<\/script>\`;
}`,...(f=(p=a.parameters)==null?void 0:p.docs)==null?void 0:f.source}}};var b,m,h;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`args => {
  return html\`
<ui5-button id="dialogOpener">Open Dialog</ui5-button>

<ui5-dialog
    id="dialog"
    header-text="\${ifDefined(args.headerText)}"
    ?stretch="\${ifDefined(args.stretch)}"
    ?draggable="\${ifDefined(args.draggable)}"
    ?resizable="\${ifDefined(args.resizable)}"
    state="\${ifDefined(args.state)}"
    initial-focus="\${ifDefined(args.initialFocus)}"
    ?prevent-focus-restore="\${ifDefined(args.preventFocusRestore)}"
    ?open="\${ifDefined(args.open)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
    accessible-role="\${ifDefined(args.accessibleRole)}"
>
    \${unsafeHTML(args.header)}
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.footer)}
</ui5-dialog>

<script>
    var dialogOpener = document.getElementById("dialogOpener");
    var dialog = document.getElementById("dialog"); 
    var dialogClosers = [...dialog.querySelectorAll(".dialogCloser")];

    dialogOpener.accessibilityAttributes = {
        hasPopup: "dialog",
        controls: dialog.id,
    };
    dialogOpener.addEventListener("click", () => {
        dialog.open = true;
    });
    dialogClosers.forEach(btn => {
        btn.addEventListener("click", () => {
            dialog.open = false;
        });
    })
<\/script>\`;
}`,...(h=(m=o.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};var y,v,D;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`args => {
  return html\`
<ui5-button id="dialogOpener">Open Dialog</ui5-button>

<ui5-dialog
    id="dialog"
    header-text="\${ifDefined(args.headerText)}"
    ?stretch="\${ifDefined(args.stretch)}"
    ?draggable="\${ifDefined(args.draggable)}"
    ?resizable="\${ifDefined(args.resizable)}"
    state="\${ifDefined(args.state)}"
    initial-focus="\${ifDefined(args.initialFocus)}"
    ?prevent-focus-restore="\${ifDefined(args.preventFocusRestore)}"
    ?open="\${ifDefined(args.open)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
    accessible-role="\${ifDefined(args.accessibleRole)}"
>
    \${unsafeHTML(args.header)}
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.footer)}
</ui5-dialog>

<script>
    var dialogOpener = document.getElementById("dialogOpener");
    var dialog = document.getElementById("dialog"); 
    var dialogClosers = [...dialog.querySelectorAll(".dialogCloser")];

    dialogOpener.accessibilityAttributes = {
        hasPopup: "dialog",
        controls: dialog.id,
    };
    dialogOpener.addEventListener("click", () => {
        dialog.open = true;
    });
    dialogClosers.forEach(btn => {
        btn.addEventListener("click", () => {
            dialog.open = false;
        });
    })
<\/script>\`;
}`,...(D=(v=i.parameters)==null?void 0:v.docs)==null?void 0:D.source}}};var $,x,E;t.parameters={...t.parameters,docs:{...($=t.parameters)==null?void 0:$.docs,source:{originalSource:`args => {
  return html\`
<ui5-button id="dialogOpener">Open Dialog</ui5-button>

<ui5-dialog
    id="dialog"
    header-text="\${ifDefined(args.headerText)}"
    ?stretch="\${ifDefined(args.stretch)}"
    ?draggable="\${ifDefined(args.draggable)}"
    ?resizable="\${ifDefined(args.resizable)}"
    state="\${ifDefined(args.state)}"
    initial-focus="\${ifDefined(args.initialFocus)}"
    ?prevent-focus-restore="\${ifDefined(args.preventFocusRestore)}"
    ?open="\${ifDefined(args.open)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
    accessible-role="\${ifDefined(args.accessibleRole)}"
>
    \${unsafeHTML(args.header)}
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.footer)}
</ui5-dialog>

<script>
    var dialogOpener = document.getElementById("dialogOpener");
    var dialog = document.getElementById("dialog"); 
    var dialogClosers = [...dialog.querySelectorAll(".dialogCloser")];

    dialogOpener.accessibilityAttributes = {
        hasPopup: "dialog",
        controls: dialog.id,
    };
    dialogOpener.addEventListener("click", () => {
        dialog.open = true;
    });
    dialogClosers.forEach(btn => {
        btn.addEventListener("click", () => {
            dialog.open = false;
        });
    })
<\/script>\`;
}`,...(E=(x=t.parameters)==null?void 0:x.docs)==null?void 0:E.source}}};const R=["Basic","DraggableAndResizable","BarInDialog","WithState"],M=Object.freeze(Object.defineProperty({__proto__:null,BarInDialog:i,Basic:a,DraggableAndResizable:o,WithState:t,__namedExportsOrder:R,default:L},Symbol.toStringTag,{value:"Module"}));export{M as C,A as c};
