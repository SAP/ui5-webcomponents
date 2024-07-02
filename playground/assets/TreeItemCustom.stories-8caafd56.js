import{x as r}from"./lit-element-c5a2b594.js";import{o as n}from"./unsafe-html-0ddd83da.js";import{l as t}from"./if-defined-c29cffe1.js";const c={additionalTextState:{control:"select",options:["None","Success","Warning","Error","Information"]},type:{control:"select",options:["Inactive","Active","Detail","Navigation"]},highlight:{control:"select",options:["None","Success","Warning","Error","Information"]},content:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},default:{control:{type:"text"},table:{type:{summary:"Array<TreeItemBase>"}}},deleteButton:{control:{type:"text"},table:{type:{summary:"Array<IButton>"}}},toggle:{description:"Call this method to manually switch the `expanded` state of a tree item.",table:{category:"methods"},UI5CustomData:{returnValue:{type:{text:"void"}}}}},$={package:"@ui5/webcomponents",since:"1.9.2",tagName:"ui5-tree-item-custom",showDefaultStoryOnly:!0},l={title:"Main/Tree/Tree Item Custom",component:"TreeItemCustom",argTypes:c},d=e=>r`<ui5-tree>
    <ui5-tree-item-custom
        hide-selection-element="${t(e.hideSelectionElement)}"
        accessible-name="${t(e.accessibleName)}"
        additional-text-state="${t(e.additionalTextState)}"
        expanded="${t(e.expanded)}"
        has-children="${t(e.hasChildren)}"
        icon="${t(e.icon)}"
        indeterminate="${t(e.indeterminate)}"
        accessibility-attributes="${t(e.accessibilityAttributes)}"
        navigated="${t(e.navigated)}"
        type="${t(e.type)}"
        selected="${t(e.selected)}"
        tooltip="${t(e.tooltip)}"
    >
        ${n(e.content)}
        ${n(e.default)}
        ${n(e.deleteButton)}
    </ui5-tree-item-custom>
</ui5-tree>`,i=d.bind({});i.tags=["_hidden_"];i.args={expanded:!0,content:'<ui5-button slot="content">Level 1</ui5-button>',default:`<ui5-tree-item-custom>
    <ui5-button slot="content">Level 2</ui5-button>
    <ui5-tree-item-custom>
        <ui5-button slot="content">Level 3</ui5-button>
    </ui5-tree-item-custom>
</ui5-tree-item-custom>`};var o,a,s;i.parameters={...i.parameters,docs:{...(o=i.parameters)==null?void 0:o.docs,source:{originalSource:`args => html\`<ui5-tree>
    <ui5-tree-item-custom
        hide-selection-element="\${ifDefined(args.hideSelectionElement)}"
        accessible-name="\${ifDefined(args.accessibleName)}"
        additional-text-state="\${ifDefined(args.additionalTextState)}"
        expanded="\${ifDefined(args.expanded)}"
        has-children="\${ifDefined(args.hasChildren)}"
        icon="\${ifDefined(args.icon)}"
        indeterminate="\${ifDefined(args.indeterminate)}"
        accessibility-attributes="\${ifDefined(args.accessibilityAttributes)}"
        navigated="\${ifDefined(args.navigated)}"
        type="\${ifDefined(args.type)}"
        selected="\${ifDefined(args.selected)}"
        tooltip="\${ifDefined(args.tooltip)}"
    >
        \${unsafeHTML(args.content)}
        \${unsafeHTML(args.default)}
        \${unsafeHTML(args.deleteButton)}
    </ui5-tree-item-custom>
</ui5-tree>\``,...(s=(a=i.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const u=["Basic"],y=Object.freeze(Object.defineProperty({__proto__:null,Basic:i,__namedExportsOrder:u,default:l},Symbol.toStringTag,{value:"Module"}));export{y as C,$ as c};
