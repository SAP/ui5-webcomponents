import{x as g}from"./lit-element-c5a2b594.js";import{o as a}from"./unsafe-html-0ddd83da.js";import{l as t}from"./if-defined-c29cffe1.js";const v={mode:{control:"select",options:["None","SingleSelect","SingleSelectBegin","SingleSelectEnd","SingleSelectAuto","MultiSelect","Delete"]},default:{control:{type:"text"},table:{type:{summary:"Array<TreeItemBase>"}}},header:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},walk:{description:"Perform Depth-First-Search walk on the tree and run a callback on each node",table:{category:"methods"},UI5CustomData:{parameters:[{name:"callback",type:{text:"WalkCallback",references:[{name:"WalkCallback",package:"@ui5/webcomponents",module:"dist/Tree.js"}]},description:"function to execute on each node of the tree with 3 arguments: the node, the level and the index",_ui5privacy:"public"}],returnValue:{type:{text:"void"}}}},"item-toggle":{description:"Fired when a tree item is expanded or collapsed.\n\n**Note:** You can call `preventDefault()` on the event object to suppress the event, if needed.\nThis may be handy for example if you want to dynamically load tree items upon the user expanding a node.\nEven if you prevented the event's default behavior, you can always manually call `toggle()` on a tree item.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"item",_ui5privacy:"public",description:"the toggled item."}]}},"item-mouseover":{description:"Fired when the mouse cursor enters the tree item borders.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"item",_ui5privacy:"public",description:"the hovered item."}]}},"item-mouseout":{description:"Fired when the mouse cursor leaves the tree item borders.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"item",_ui5privacy:"public",description:"the hovered item."}]}},"item-click":{description:"Fired when a tree item is activated.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"item",_ui5privacy:"public",description:"The clicked item."}]}},"item-delete":{description:"Fired when the Delete button of any tree item is pressed.\n\n**Note:** A Delete button is displayed on each item,\nwhen the component `mode` property is set to `Delete`.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"item",_ui5privacy:"public",description:"the deleted item."}]}},"selection-change":{description:"Fired when selection is changed by user interaction\nin `SingleSelect`, `SingleSelectBegin`, `SingleSelectEnd` and `MultiSelect` modes.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"Array"},name:"selectedItems",_ui5privacy:"public",description:"An array of the selected items."},{type:{text:"Array"},name:"previouslySelectedItems",_ui5privacy:"public",description:"An array of the previously selected items."},{type:{text:"HTMLElement"},name:"targetItem",_ui5privacy:"public",description:"The item triggering the event."}]}}},C={package:"@ui5/webcomponents",since:"1.0.0-rc.8",tagName:"ui5-tree"};var o=Object.freeze,T=Object.defineProperty,w=(e,x)=>o(T(e,"raw",{value:o(x||e.slice())})),c;const D={title:"Main/Tree",component:"Tree",argTypes:v},b=e=>g`<ui5-tree
    mode="${t(e.mode)}"
    no-data-text="${t(e.noDataText)}"
    header-text="${t(e.headerText)}"
    footer-text="${t(e.footerText)}"
    accessible-name="${t(e.accessibleName)}"
    accessible-name-ref="${t(e.accessibleNameRef)}"
>
    ${a(e.header)} ${a(e.default)}
</ui5-tree>`,i=b.bind({});i.args={default:`
    <ui5-tree-item expanded="" text="Tree 1" icon="paste" selected="">
        <ui5-tree-item expanded="" text="Tree 1.1" selected="">
            <ui5-tree-item text="Tree 1.1.1"></ui5-tree-item>
            <ui5-tree-item text="Tree 1.1.2"></ui5-tree-item>
        </ui5-tree-item>
    </ui5-tree-item>
    <ui5-tree-item text="Tree 2" icon="copy">
        <ui5-tree-item text="Tree 2.1">
            <ui5-tree-item text="Tree 2.1.1"></ui5-tree-item>
            <ui5-tree-item text="Tree 2.1.2">
                <ui5-tree-item text="Tree 2.1.2.1"></ui5-tree-item>
                <ui5-tree-item text="Tree 2.1.2.2"></ui5-tree-item>
                <ui5-tree-item text="Tree 2.1.2.3"></ui5-tree-item>
                <ui5-tree-item text="Tree 2.1.2.5"></ui5-tree-item>
            </ui5-tree-item>
        </ui5-tree-item>
        <ui5-tree-item text="Tree 2.2"></ui5-tree-item>
    </ui5-tree-item>
    <ui5-tree-item expanded="" text="Tree 3 (no icon)"> </ui5-tree-item>`};const r=()=>g(c||(c=w([`
    <ui5-busy-indicator id="busy" class="full-width">
        <ui5-tree id="treeDynamic" mode="None" class="full-width">
            <ui5-tree-item text="Has pre-loaded children">
                <ui5-tree-item text="Child 1"></ui5-tree-item>
                <ui5-tree-item text="Child 2"></ui5-tree-item>
            </ui5-tree-item>
            <ui5-tree-item text="Has no children at all"></ui5-tree-item>
            <ui5-tree-item
                id="dynamicNode"
                text="Has children, but not yet loaded"
                has-children=""
            ></ui5-tree-item>
        </ui5-tree>
    </ui5-busy-indicator>
    <script>
        const busyIndicator = document.getElementById("busy");
        const dynamicTree = document.getElementById("treeDynamic");
        dynamicTree.addEventListener("item-toggle", function (event) {
            const item = event.detail.item; // get the node that is toggled
            // Only for the dynamic node, and only when it's empty
            if (item.id === "dynamicNode" && item.children.length === 0) {
                busyIndicator.active = true; // block the tree from the user
                event.preventDefault(); // do not let the toggle button switch yet
                setTimeout(function () {
                    const newItem = document.createElement("ui5-tree-item"); // Fetching from db....
                    newItem.text = "Node fetched from DB after 2 sec";
                    item.appendChild(newItem); // add the newly fetched node to the tree
                    item.toggle(); // now manually switch the toggle button
                    busyIndicator.active = false; // unblock the tree
                }, 2000);
            }
        });
    <\/script>
`]))),n=b.bind({});n.args={header:`
    <div slot="header">
        <ui5-title>Tree with custom items</ui5-title>
    </div>`,default:`
    <ui5-tree-item-custom
        expanded="true"
        show-toggle-button=""
        hide-selection-element=""
        type="Active"
        level="1"
    >
        <ui5-button slot="content">Level 1</ui5-button>
        <ui5-tree-item-custom
            type="Active"
            show-toggle-button=""
            level="2"
            expanded="true"
        >
            <ui5-select slot="content">
                <ui5-option>Level 2</ui5-option>
                <ui5-option>Option 2.1</ui5-option>
                <ui5-option>Option 2.3</ui5-option>
            </ui5-select>
            <ui5-tree-item-custom
                hide-selection-element=""
                type="Active"
                level="3"
            >
                <ui5-button slot="content">Level 3</ui5-button>
            </ui5-tree-item-custom>
        </ui5-tree-item-custom>
    </ui5-tree-item-custom>`};var s,m,l;i.parameters={...i.parameters,docs:{...(s=i.parameters)==null?void 0:s.docs,source:{originalSource:'args => html`<ui5-tree\n    mode="${ifDefined(args.mode)}"\n    no-data-text="${ifDefined(args.noDataText)}"\n    header-text="${ifDefined(args.headerText)}"\n    footer-text="${ifDefined(args.footerText)}"\n    accessible-name="${ifDefined(args.accessibleName)}"\n    accessible-name-ref="${ifDefined(args.accessibleNameRef)}"\n>\n    ${unsafeHTML(args.header)} ${unsafeHTML(args.default)}\n</ui5-tree>`',...(l=(m=i.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var d,u,p;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`() => html\`
    <ui5-busy-indicator id="busy" class="full-width">
        <ui5-tree id="treeDynamic" mode="None" class="full-width">
            <ui5-tree-item text="Has pre-loaded children">
                <ui5-tree-item text="Child 1"></ui5-tree-item>
                <ui5-tree-item text="Child 2"></ui5-tree-item>
            </ui5-tree-item>
            <ui5-tree-item text="Has no children at all"></ui5-tree-item>
            <ui5-tree-item
                id="dynamicNode"
                text="Has children, but not yet loaded"
                has-children=""
            ></ui5-tree-item>
        </ui5-tree>
    </ui5-busy-indicator>
    <script>
        const busyIndicator = document.getElementById("busy");
        const dynamicTree = document.getElementById("treeDynamic");
        dynamicTree.addEventListener("item-toggle", function (event) {
            const item = event.detail.item; // get the node that is toggled
            // Only for the dynamic node, and only when it's empty
            if (item.id === "dynamicNode" && item.children.length === 0) {
                busyIndicator.active = true; // block the tree from the user
                event.preventDefault(); // do not let the toggle button switch yet
                setTimeout(function () {
                    const newItem = document.createElement("ui5-tree-item"); // Fetching from db....
                    newItem.text = "Node fetched from DB after 2 sec";
                    item.appendChild(newItem); // add the newly fetched node to the tree
                    item.toggle(); // now manually switch the toggle button
                    busyIndicator.active = false; // unblock the tree
                }, 2000);
            }
        });
    <\/script>
\``,...(p=(u=r.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var h,y,f;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:'args => html`<ui5-tree\n    mode="${ifDefined(args.mode)}"\n    no-data-text="${ifDefined(args.noDataText)}"\n    header-text="${ifDefined(args.headerText)}"\n    footer-text="${ifDefined(args.footerText)}"\n    accessible-name="${ifDefined(args.accessibleName)}"\n    accessible-name-ref="${ifDefined(args.accessibleNameRef)}"\n>\n    ${unsafeHTML(args.header)} ${unsafeHTML(args.default)}\n</ui5-tree>`',...(f=(y=n.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};const I=["Basic","DynamicContent","TreeWithCustomItems"],E=Object.freeze(Object.defineProperty({__proto__:null,Basic:i,DynamicContent:r,TreeWithCustomItems:n,__namedExportsOrder:I,default:D},Symbol.toStringTag,{value:"Module"}));export{E as C,C as c};
