import{x as o}from"./lit-element-c5a2b594.js";import{l as i}from"./if-defined-c29cffe1.js";import{o as n}from"./unsafe-html-0ddd83da.js";const u={default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}}},b={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.10",tagName:"ui5-wizard-step",showDefaultStoryOnly:!0},l={title:"Fiori/Wizard/Wizard Step",component:"WizardStep",argTypes:u},d=e=>o`
<ui5-wizard>
    <ui5-wizard-step
        icon="${i(e.icon)}"
        title-text="${i(e.titleText)}"
        ?selected="${i(e.selected)}"
        ?branching="${i(e.branching)}"
        ?disabled="${i(e.disabled)}"
        subtitle-text="${i(e.subtitleText)}"
    >
        ${n(e.default)}
    </ui5-wizard-step>
</ui5-wizard>`,t=d.bind({});t.tags=["_hidden_"];t.args={titleText:"Product type",icon:"product",default:`<div style="display: flex; min-height: 200px; flex-direction: column;">
    <ui5-title>1. Product Type</ui5-title><br/>
    <ui5-message-strip>
        The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.
    </ui5-message-strip><br/>
    <ui5-label wrapping-type="Normal">Sed fermentum, mi et tristique ullamcorper, sapien sapien faucibus sem, quis pretium nibh lorem malesuada diam. Nulla quis arcu aliquet, feugiat massa semper, volutpat diam. Nam vitae ante posuere, molestie neque sit amet, dapibus velit. Maecenas eleifend tempor lorem. Mauris vitae elementum mi, sed eleifend ligula. Nulla tempor vulputate dolor, nec dignissim quam convallis ut. Praesent vitae commodo felis, ut iaculis felis. Fusce quis eleifend sapien, eget facilisis nibh. Suspendisse est velit, scelerisque ut commodo eget, dignissim quis metus. Cras faucibus consequat gravida. Curabitur vitae quam felis. Phasellus ac leo eleifend, commodo tortor et, varius quam. Aliquam erat volutpat.
    </ui5-label>
</div>
<ui5-button design="Emphasized">Step 2</ui5-button>`};var a,s,r;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
  return html\`
<ui5-wizard>
    <ui5-wizard-step
        icon="\${ifDefined(args.icon)}"
        title-text="\${ifDefined(args.titleText)}"
        ?selected="\${ifDefined(args.selected)}"
        ?branching="\${ifDefined(args.branching)}"
        ?disabled="\${ifDefined(args.disabled)}"
        subtitle-text="\${ifDefined(args.subtitleText)}"
    >
        \${unsafeHTML(args.default)}
    </ui5-wizard-step>
</ui5-wizard>\`;
}`,...(r=(s=t.parameters)==null?void 0:s.docs)==null?void 0:r.source}}};const m=["Basic"],g=Object.freeze(Object.defineProperty({__proto__:null,Basic:t,__namedExportsOrder:m,default:l},Symbol.toStringTag,{value:"Module"}));export{g as C,b as c};
