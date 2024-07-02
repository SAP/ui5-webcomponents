import{x as l}from"./lit-element-c5a2b594.js";import{l as i}from"./if-defined-c29cffe1.js";import{S as m}from"./SwitchDesign-b1007d8d.js";const u={design:{control:"select",options:["Textual","Graphical"]}},x={package:"@ui5/webcomponents",since:"0.8.0",tagName:"ui5-switch"},p={title:"Main/Switch",component:"Switch",argTypes:u},f=e=>l`<ui5-switch
    design="${i(e.design)}"
    ?checked="${i(e.checked)}"
    ?disabled="${i(e.disabled)}"
    ?required="${i(e.required)}"
    ?name="${i(e.name)}"
    text-on="${i(e.textOn)}"
    text-off="${i(e.textOff)}"
    accessible-name="${i(e.accessibleName)}"
    accessible-name-ref="${i(e.accessibleNameRef)}"
    tooltip="${i(e.tooltip)}"
></ui5-switch>`,s=f.bind({});s.args={accessibleName:"Switch with Accessible Name"};const t=f.bind({});t.args={required:!0,name:"termsAndConditions",disabled:!1,design:m.Textual,textOn:"Yes",textOff:"No"};t.decorators=[e=>l`
        <style>
            .switch-form {
                max-width: fit-content;
                border: 1px solid var(--sapList_BorderColor);
                border-radius: 0.5rem;
                padding: 1rem;
            }
        </style>
        <form id="myForm" class="switch-form">
            <h3 style="margin: 0 0 1rem 0; color: var(--sapTextColor);">Switch in Registration form sample</h3>
            <div style="display: flex; flex-direction: column;">
                <ui5-input required type="Email" placeholder="Email" value="your@email.com"></ui5-input>
                <ui5-input required type="Password" placeholder="Password" value="your@email.com"></ui5-input>
            </div>
            <div style="display: flex; flex-direction: column; justify-content: center;">
                <ui5-label for="mySwitch" style="margin: 1rem 0 0 0; color: var(--sapTextColor);">Please accept the terms and conditions, in order to proceed</ui5-label>
                <div style="width: fit-content">
                    ${e()}
                </div>
            </div>
            <br>
            <ui5-button type="Submit">Submit Form</ui5-button>
        </form>`];var r,n,a;s.parameters={...s.parameters,docs:{...(r=s.parameters)==null?void 0:r.docs,source:{originalSource:'args => html`<ui5-switch\n    design="${ifDefined(args.design)}"\n    ?checked="${ifDefined(args.checked)}"\n    ?disabled="${ifDefined(args.disabled)}"\n    ?required="${ifDefined(args.required)}"\n    ?name="${ifDefined(args.name)}"\n    text-on="${ifDefined(args.textOn)}"\n    text-off="${ifDefined(args.textOff)}"\n    accessible-name="${ifDefined(args.accessibleName)}"\n    accessible-name-ref="${ifDefined(args.accessibleNameRef)}"\n    tooltip="${ifDefined(args.tooltip)}"\n></ui5-switch>`',...(a=(n=s.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};var o,c,d;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:'args => html`<ui5-switch\n    design="${ifDefined(args.design)}"\n    ?checked="${ifDefined(args.checked)}"\n    ?disabled="${ifDefined(args.disabled)}"\n    ?required="${ifDefined(args.required)}"\n    ?name="${ifDefined(args.name)}"\n    text-on="${ifDefined(args.textOn)}"\n    text-off="${ifDefined(args.textOff)}"\n    accessible-name="${ifDefined(args.accessibleName)}"\n    accessible-name-ref="${ifDefined(args.accessibleNameRef)}"\n    tooltip="${ifDefined(args.tooltip)}"\n></ui5-switch>`',...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const b=["Basic","RequiredInForm"],w=Object.freeze(Object.defineProperty({__proto__:null,Basic:s,RequiredInForm:t,__namedExportsOrder:b,default:p},Symbol.toStringTag,{value:"Module"}));export{w as C,x as c};
