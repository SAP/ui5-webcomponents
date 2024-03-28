import{x as n}from"./lit-element-c5a2b594.js";import{l as u}from"./if-defined-c29cffe1.js";const g={},l={package:"@ui5/webcomponents",since:"1.0.0-rc.15",tagName:"ui5-suggestion-group-item",showDefaultStoryOnly:!0},r={title:"Main/Input/Suggestion Group Item",component:"SuggestionGroupItem",argTypes:g},m=o=>n`
<ui5-input
    show-suggestions
>
<ui5-suggestion-group-item text="${u(o.text)}"></ui5-suggestion-group-item>
<ui5-suggestion-item text="Germany"></ui5-suggestion-item>
<ui5-suggestion-item text="France"></ui5-suggestion-item>
</ui5-input>`,t=m.bind({});t.tags=["_hidden_"];t.args={text:"Europe"};var e,i,s;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`args => html\`
<ui5-input
    show-suggestions
>
<ui5-suggestion-group-item text="\${ifDefined(args.text)}"></ui5-suggestion-group-item>
<ui5-suggestion-item text="Germany"></ui5-suggestion-item>
<ui5-suggestion-item text="France"></ui5-suggestion-item>
</ui5-input>\``,...(s=(i=t.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};const a=["Basic"],d=Object.freeze(Object.defineProperty({__proto__:null,Basic:t,__namedExportsOrder:a,default:r},Symbol.toStringTag,{value:"Module"}));export{d as C,l as c};
