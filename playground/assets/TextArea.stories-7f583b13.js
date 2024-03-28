import{x as t}from"./lit-element-c5a2b594.js";import{l as a}from"./if-defined-c29cffe1.js";import{o as b}from"./unsafe-html-0ddd83da.js";const v={valueState:{control:"select",options:["None","Success","Warning","Error","Information"]},valueStateMessage:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}}},_={package:"@ui5/webcomponents",tagName:"ui5-textarea"};var o=Object.freeze,w=Object.defineProperty,M=(e,D)=>o(w(e,"raw",{value:o(D||e.slice())})),l;let s=0;const S={title:"Main/Text Area",component:"TextArea",argTypes:v},d=e=>t`
<ui5-textarea
    id="textArea-${s++}"
    value="${a(e.value)}"
    ?disabled="${a(e.disabled)}"
    ?readonly="${a(e.readonly)}"
    ?required="${a(e.required)}"
    placeholder="${a(e.placeholder)}"
    value-state="${a(e.valueState)}"
    rows="${a(e.rows)}"
    maxlength="${a(e.maxlength)}"
    ?show-exceeded-text="${a(e.showExceededText)}"
    ?growing="${a(e.growing)}"
    growing-max-lines="${a(e.growingMaxLines)}"
    name="${a(e.name)}"
    accessible-name="${a(e.accessibleName)}"
    accessible-name-ref="${a(e.accessibleNameRef)}"
>
    ${b(e.valueStateMessage)}
</ui5-textarea>`,i=d.bind({});i.args={placeholder:"Enter text"};const n=d.bind({});n.decorators=[e=>t(l||(l=M([`
		`,`
		<script>
		(() => {
			const textAreaMaxLength = document.getElementById("textArea-`,`");

			textAreaMaxLength.addEventListener("input", function (event) {
				const { value, maxlength} = textAreaMaxLength;
				textAreaMaxLength.valueState = value.length > maxlength ? "Warning" : "None";	
			});
		})()
		<\/script>`])),e(),s-1)];n.args={placeholder:"Enter text",maxlength:10,showExceededText:!0,valueStateMessage:'<div id="warningMessage" slot="valueStateMessage">The characters limit is exceeded</div>'};const r=d.bind({});r.decorators=[e=>t`
        <ui5-label for="textArea-${s}">Description</ui5-label>
        ${e()}
        `];r.args={placeholder:"Enter description",required:!0};var f,c,g;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`args => html\`
<ui5-textarea
    id="textArea-\${index++}"
    value="\${ifDefined(args.value)}"
    ?disabled="\${ifDefined(args.disabled)}"
    ?readonly="\${ifDefined(args.readonly)}"
    ?required="\${ifDefined(args.required)}"
    placeholder="\${ifDefined(args.placeholder)}"
    value-state="\${ifDefined(args.valueState)}"
    rows="\${ifDefined(args.rows)}"
    maxlength="\${ifDefined(args.maxlength)}"
    ?show-exceeded-text="\${ifDefined(args.showExceededText)}"
    ?growing="\${ifDefined(args.growing)}"
    growing-max-lines="\${ifDefined(args.growingMaxLines)}"
    name="\${ifDefined(args.name)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
    \${unsafeHTML(args.valueStateMessage)}
</ui5-textarea>\``,...(g=(c=i.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};var m,x,u;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`args => html\`
<ui5-textarea
    id="textArea-\${index++}"
    value="\${ifDefined(args.value)}"
    ?disabled="\${ifDefined(args.disabled)}"
    ?readonly="\${ifDefined(args.readonly)}"
    ?required="\${ifDefined(args.required)}"
    placeholder="\${ifDefined(args.placeholder)}"
    value-state="\${ifDefined(args.valueState)}"
    rows="\${ifDefined(args.rows)}"
    maxlength="\${ifDefined(args.maxlength)}"
    ?show-exceeded-text="\${ifDefined(args.showExceededText)}"
    ?growing="\${ifDefined(args.growing)}"
    growing-max-lines="\${ifDefined(args.growingMaxLines)}"
    name="\${ifDefined(args.name)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
    \${unsafeHTML(args.valueStateMessage)}
</ui5-textarea>\``,...(u=(x=n.parameters)==null?void 0:x.docs)==null?void 0:u.source}}};var $,p,h;r.parameters={...r.parameters,docs:{...($=r.parameters)==null?void 0:$.docs,source:{originalSource:`args => html\`
<ui5-textarea
    id="textArea-\${index++}"
    value="\${ifDefined(args.value)}"
    ?disabled="\${ifDefined(args.disabled)}"
    ?readonly="\${ifDefined(args.readonly)}"
    ?required="\${ifDefined(args.required)}"
    placeholder="\${ifDefined(args.placeholder)}"
    value-state="\${ifDefined(args.valueState)}"
    rows="\${ifDefined(args.rows)}"
    maxlength="\${ifDefined(args.maxlength)}"
    ?show-exceeded-text="\${ifDefined(args.showExceededText)}"
    ?growing="\${ifDefined(args.growing)}"
    growing-max-lines="\${ifDefined(args.growingMaxLines)}"
    name="\${ifDefined(args.name)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
    \${unsafeHTML(args.valueStateMessage)}
</ui5-textarea>\``,...(h=(p=r.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};const y=["Basic","MaxLength","Label"],E=Object.freeze(Object.defineProperty({__proto__:null,Basic:i,Label:r,MaxLength:n,__namedExportsOrder:y,default:S},Symbol.toStringTag,{value:"Module"}));export{E as C,_ as c};
