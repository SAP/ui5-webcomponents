import{x as a}from"./lit-element-c5a2b594.js";import{l as e}from"./if-defined-c29cffe1.js";const d={type:{control:"select",options:["Inactive","Active","Detail","Navigation"]},additionalTextState:{control:"select",options:["None","Success","Warning","Error","Information"]}},m={package:"@ui5/webcomponents",tagName:"ui5-suggestion-item",showDefaultStoryOnly:!0},r={title:"Main/Input/Suggestion Item",component:"SuggestionItem",argTypes:d},c=t=>a`
<ui5-input show-suggestions>
    <ui5-suggestion-item
    additional-text="${e(t.additionalText)}"
    additional-text-state="${e(t.additionalTextState)}"
    description="${e(t.description)}"
    icon="${e(t.icon)}"
    ?icon-end="${e(t.iconEnd)}"
    image="${e(t.image)}"
    text="${e(t.text)}"
    type="${e(t.type)}"
    ></ui5-suggestion-item>
</ui5-input>`,i=c.bind({});i.tags=["_hidden_"];i.args={text:"Germany"};var n,o,s;i.parameters={...i.parameters,docs:{...(n=i.parameters)==null?void 0:n.docs,source:{originalSource:`args => html\`
<ui5-input show-suggestions>
    <ui5-suggestion-item
    additional-text="\${ifDefined(args.additionalText)}"
    additional-text-state="\${ifDefined(args.additionalTextState)}"
    description="\${ifDefined(args.description)}"
    icon="\${ifDefined(args.icon)}"
    ?icon-end="\${ifDefined(args.iconEnd)}"
    image="\${ifDefined(args.image)}"
    text="\${ifDefined(args.text)}"
    type="\${ifDefined(args.type)}"
    ></ui5-suggestion-item>
</ui5-input>\``,...(s=(o=i.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};const g=["Basic"],l=Object.freeze(Object.defineProperty({__proto__:null,Basic:i,__namedExportsOrder:g,default:r},Symbol.toStringTag,{value:"Module"}));export{l as C,m as c};
