import{x as s}from"./lit-element-c5a2b594.js";import{o as a}from"./unsafe-html-0ddd83da.js";import{l as t}from"./if-defined-c29cffe1.js";const d={additionalTextState:{control:"select",options:["None","Positive","Critical","Negative","Information"]},type:{control:"select",options:["Inactive","Active","Detail","Navigation"]},highlight:{control:"select",options:["None","Positive","Critical","Negative","Information"]},default:{control:{type:"text"},table:{type:{summary:"Array<TreeItemBase>"}}},deleteButton:{control:{type:"text"},table:{type:{summary:"Array<IButton>"}}},toggle:{description:"Call this method to manually switch the `expanded` state of a tree item.",table:{category:"methods"},UI5CustomData:{returnValue:{type:{text:"void"}}}}},$={package:"@ui5/webcomponents",since:"1.0.0-rc.8",tagName:"ui5-tree-item",showDefaultStoryOnly:!0},l={title:"Main/Tree/Tree Item",component:"TreeItem",argTypes:d},c=e=>s`<ui5-tree>
    <ui5-tree-item
        additional-text="${t(e.additionalText)}"
        additional-text-state="${t(e.additionalTextState)}"
        text="${t(e.text)}"
        accessible-name="${t(e.accessibleName)}"
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
        ${a(e.default)}
        ${a(e.deleteButton)}
    </ui5-tree-item>
</ui5-tree>`,i=c.bind({});i.tags=["_hidden_"];i.args={text:"Tree 1",expanded:!0,icon:"paste",default:`<ui5-tree-item text="Tree 1.1">
    <ui5-tree-item text="Tree 1.1.1"></ui5-tree-item>
</ui5-tree-item>`};var n,o,r;i.parameters={...i.parameters,docs:{...(n=i.parameters)==null?void 0:n.docs,source:{originalSource:`args => html\`<ui5-tree>
    <ui5-tree-item
        additional-text="\${ifDefined(args.additionalText)}"
        additional-text-state="\${ifDefined(args.additionalTextState)}"
        text="\${ifDefined(args.text)}"
        accessible-name="\${ifDefined(args.accessibleName)}"
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
        \${unsafeHTML(args.default)}
        \${unsafeHTML(args.deleteButton)}
    </ui5-tree-item>
</ui5-tree>\``,...(r=(o=i.parameters)==null?void 0:o.docs)==null?void 0:r.source}}};const m=["Basic"],x=Object.freeze(Object.defineProperty({__proto__:null,Basic:i,__namedExportsOrder:m,default:l},Symbol.toStringTag,{value:"Module"}));export{x as C,$ as c};
