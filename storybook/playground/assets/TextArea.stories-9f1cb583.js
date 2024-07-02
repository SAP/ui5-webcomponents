import{x as i}from"./lit-element-c5a2b594.js";import{l as a}from"./if-defined-c29cffe1.js";import{o as D}from"./unsafe-html-0ddd83da.js";const v={valueState:{control:"select",options:["None","Positive","Critical","Negative","Information"]},valueStateMessage:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}}},L={package:"@ui5/webcomponents",tagName:"ui5-textarea"};var o=Object.freeze,b=Object.defineProperty,M=(e,h)=>o(b(e,"raw",{value:o(h||e.slice())})),l;let s=0;const S={title:"Main/Text Area",component:"TextArea",argTypes:v},d=e=>i`
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
    growing-max-rows="${a(e.growingMaxRows)}"
    name="${a(e.name)}"
    accessible-name="${a(e.accessibleName)}"
    accessible-name-ref="${a(e.accessibleNameRef)}"
>
    ${D(e.valueStateMessage)}
</ui5-textarea>`,t=d.bind({});t.args={placeholder:"Enter text"};const n=d.bind({});n.decorators=[e=>i(l||(l=M([`
		`,`
		<script>
		(() => {
			const textAreaMaxLength = document.getElementById("textArea-`,`");

			textAreaMaxLength.addEventListener("input", function (event) {
				const { value, maxlength} = textAreaMaxLength;
				textAreaMaxLength.valueState = value.length > maxlength ? "Warning" : "None";	
			});
		})()
		<\/script>`])),e(),s-1)];n.args={placeholder:"Enter text",maxlength:10,showExceededText:!0,valueStateMessage:'<div id="warningMessage" slot="valueStateMessage">The characters limit is exceeded</div>'};const r=d.bind({});r.decorators=[e=>i`
        <ui5-label for="textArea-${s}">Description</ui5-label>
        ${e()}
        `];r.args={placeholder:"Enter description",required:!0};var f,c,g;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`args => html\`
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
    growing-max-rows="\${ifDefined(args.growingMaxRows)}"
    name="\${ifDefined(args.name)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
    \${unsafeHTML(args.valueStateMessage)}
</ui5-textarea>\``,...(g=(c=t.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};var m,x,u;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`args => html\`
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
    growing-max-rows="\${ifDefined(args.growingMaxRows)}"
    name="\${ifDefined(args.name)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
    \${unsafeHTML(args.valueStateMessage)}
</ui5-textarea>\``,...(u=(x=n.parameters)==null?void 0:x.docs)==null?void 0:u.source}}};var $,p,w;r.parameters={...r.parameters,docs:{...($=r.parameters)==null?void 0:$.docs,source:{originalSource:`args => html\`
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
    growing-max-rows="\${ifDefined(args.growingMaxRows)}"
    name="\${ifDefined(args.name)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
    \${unsafeHTML(args.valueStateMessage)}
</ui5-textarea>\``,...(w=(p=r.parameters)==null?void 0:p.docs)==null?void 0:w.source}}};const y=["Basic","MaxLength","Label"],E=Object.freeze(Object.defineProperty({__proto__:null,Basic:t,Label:r,MaxLength:n,__namedExportsOrder:y,default:S},Symbol.toStringTag,{value:"Module"}));export{E as C,L as c};
