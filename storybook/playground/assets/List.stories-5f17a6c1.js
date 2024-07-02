import{x as s}from"./lit-element-c5a2b594.js";import{l as i}from"./if-defined-c29cffe1.js";import{o as E}from"./unsafe-html-0ddd83da.js";import{L}from"./ListSelectionMode-8532a49f.js";const B={selectionMode:{control:"select",options:["None","Single","SingleStart","SingleEnd","SingleAuto","Multiple","Delete"]},separators:{control:"select",options:["All","Inner","None"]},growing:{control:"select",options:["Button","Scroll","None"]},accessibleRole:{control:"select",options:["List","Menu","Tree","ListBox"]},listItems:{control:{type:!1}},default:{control:{type:"text"},table:{type:{summary:"Array<ListItemBase | ListItemGroup>"}}},header:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},"item-click":{description:"Fired when an item is activated, unless the item's `type` property\nis set to `Inactive`.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"item",_ui5privacy:"public",description:"The clicked item."}]}},"item-close":{description:"Fired when the `Close` button of any item is clicked\n\n**Note:** This event is only applicable to list items that can be closed (such as notification list items),\nnot to be confused with `item-delete`.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"item",_ui5privacy:"public",description:"the item about to be closed."}]}},"item-toggle":{description:"Fired when the `Toggle` button of any item is clicked.\n\n**Note:** This event is only applicable to list items that can be toggled (such as notification group list items).",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"item",_ui5privacy:"public",description:"the toggled item."}]}},"item-delete":{description:"Fired when the Delete button of any item is pressed.\n\n**Note:** A Delete button is displayed on each item,\nwhen the component `selectionMode` property is set to `Delete`.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"item",_ui5privacy:"public",description:"the deleted item."}]}},"selection-change":{description:"Fired when selection is changed by user interaction\nin `Single`, `SingleStart`, `SingleEnd` and `Multiple` selection modes.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"Array<ListItemBase>",references:[{name:"ListItemBase",package:"@ui5/webcomponents",module:"dist/ListItemBase.js"}]},name:"selectedItems",_ui5privacy:"public",description:"An array of the selected items."},{type:{text:"Array<ListItemBase>",references:[{name:"ListItemBase",package:"@ui5/webcomponents",module:"dist/ListItemBase.js"}]},name:"previouslySelectedItems",_ui5privacy:"public",description:"An array of the previously selected items."}]}},"move-over":{description:"Fired when a movable list item is moved over a potential drop target during a dragging operation.\n\nIf the new position is valid, prevent the default action of the event using `preventDefault()`.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"object"},name:"source",_ui5privacy:"public",description:"Contains information about the moved element under `element` property."},{type:{text:"object"},name:"destination",_ui5privacy:"public",description:"Contains information about the destination of the moved element. Has `element` and `placement` properties."}]}},move:{description:"Fired when a movable list item is dropped onto a drop target.\n\n**Note:** `move` event is fired only if there was a preceding `move-over` with prevented default action.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"object"},name:"source",_ui5privacy:"public",description:"Contains information about the moved element under `element` property."},{type:{text:"object"},name:"destination",_ui5privacy:"public",description:"Contains information about the destination of the moved element. Has `element` and `placement` properties."}]}}},G={package:"@ui5/webcomponents",tagName:"ui5-list"};var c=Object.freeze,A=Object.defineProperty,P=(e,C)=>c(A(e,"raw",{value:c(C||e.slice())})),u;const k={title:"Main/List",component:"List",argTypes:B},N=e=>s` <ui5-list
    selection-mode="${i(e.selectionMode)}"
    ?loading="${i(e.loading)}"
    ?indent="${i(e.indent)}"
    ?growing="${i(e.growing)}"
    growing-button-text="${i(e.growingButtonText)}"
    loading-delay="${i(e.loadingDelay)}"
    separators="${i(e.separators)}"
    header-text="${i(e.headerText)}"
    footer-text="${i(e.footerText)}"
    no-data-text="${i(e.noDataText)}"
    accessible-name="${i(e.accessibleName)}"
    accessible-role="${i(e.accessibleRole)}"
  >
    ${E(e.default)}
  </ui5-list>`,t=N.bind({});t.storyName="Basic";t.args={default:`<ui5-li
        icon="nutrition-activity"
        description="Tropical plant with an edible fruit"
        additional-text="In-stock"
        additional-text-state="Positive"
        >Pineapple</ui5-li>
    <ui5-li
        icon="nutrition-activity"
        description="Occurs between red and yellow"
        additional-text="Expires"
        additional-text-state="Critical"
        >Orange</ui5-li>
    <ui5-li
        icon="nutrition-activity"
        description="The yellow lengthy fruit"
        additional-text="Re-stock"
        additional-text-state="Information"
        >Blueberry</ui5-li>
    <ui5-li
        icon="nutrition-activity"
        description="The tropical stone fruit"
        additional-text="Re-stock"
        additional-text-state="Negative"
        >Mango</ui5-li>`};const n=()=>s(u||(u=P([`<ui5-list id="infiniteScrollEx" style="height: 200px" growing="Scroll">
      <ui5-li
        icon="nutrition-activity"
        description="Tropical plant with an edible fruit"
        additional-text="In-stock"
        additional-text-state="Positive"
        >Pineapple</ui5-li
      >
      <ui5-li
        icon="nutrition-activity"
        description="Occurs between red and yellow"
        additional-text="Expires"
        additional-text-state="Critical"
        >Orange</ui5-li
      >
      <ui5-li
        icon="nutrition-activity"
        description="The yellow lengthy fruit"
        additional-text="Re-stock"
        additional-text-state="Negative"
        >Banana</ui5-li
      >
    </ui5-list>
    <script>
      function template(i) {
        var li = document.createElement("ui5-li");
        li.textContent = "Fruit name";
        li.description = "the description goes here " + i;
        li.additionalText = "Available";
        li.additionalTextState = "Positive";
        li.icon = "nutrition-activity";
        return li;
      }
      function insertItems(el, num) {
        for (var i = 0; i < num; i++) {
          el.appendChild(template(i));
        }
      }
      infiniteScrollEx.addEventListener("load-more", (e) => {
        var el = infiniteScrollEx;
        el.loading = true;
        setTimeout(() => {
          insertItems(el, 5);
          el.loading = false;
        }, 200);
      });
    <\/script>`])));n.storyName="Growing";n.parameters={docs:{story:{inline:!1}}};const o=()=>s`
<ui5-list selection-mode="Single" header-text="Single Selection Mode:">
<ui5-li selected icon="map" icon-end>Argentina</ui5-li>
    <ui5-li icon="map" icon-end>Bulgaria</ui5-li>
    <ui5-li icon="map" icon-end>China</ui5-li>
    <ui5-li type="Inactive" icon="map" icon-end>Denmark (ui5-li type='Inactive')</ui5-li>
</ui5-list>

</br>

<ui5-list selection-mode="Multiple" header-text="Multiple Selection Mode:">
<ui5-li>Pineapple</ui5-li>
<ui5-li selected="">Orange</ui5-li>
<ui5-li>Banana</ui5-li>
<ui5-li>Mango</ui5-li>
</ui5-list>

</br>

<ui5-list selection-mode="Delete" header-text="Delete Mode:">
<ui5-li>Argentina</ui5-li>
<ui5-li>Bulgaria</ui5-li>
<ui5-li>China</ui5-li>
</ui5-list>

</br>

<ui5-list selection-mode="None" header-text="None Selection Mode:" no-data-text="No Data Available">
</ui5-list>
`,a=N.bind({});a.storyName="Group Headers";a.args={selectionMode:L.Multiple,default:`<ui5-li-group header-text="Front End Developers">
    <ui5-li
        image="../assets/images/avatars/woman_avatar_3.png"
        icon="navigation-right-arrow"
        icon-end=""
        >Jennifer</ui5-li
    >
    <ui5-li
        image="../assets/images/avatars/woman_avatar_4.png"
        icon="navigation-right-arrow"
        icon-end=""
        >Lora</ui5-li
    >
    <ui5-li
        image="../assets/images/avatars/woman_avatar_5.png"
        icon="navigation-right-arrow"
        icon-end=""
        >Carlotta</ui5-li
    >
</ui5-li-group>  
<ui5-li-group header-text="Front End Developers">
  <ui5-li
    image="../assets/images/avatars/man_avatar_1.png"
    icon="navigation-right-arrow"
    icon-end=""
  >Clark</ui5-li
  >
  <ui5-li
    image="../assets/images/avatars/woman_avatar_1.png"
    icon="navigation-right-arrow"
    icon-end=""
  >Ellen</ui5-li
  >
  <ui5-li
    image="../assets/images/avatars/man_avatar_2.png"
    icon="navigation-right-arrow"
    icon-end=""
  >Adam</ui5-li
  >
</ui5-li-group>`};const l=()=>s` <ui5-list
      header-text="No separators"
      separators="None"
      class="full-width"
    >
      <ui5-li icon="product">Item #1</ui5-li>
      <ui5-li icon="product">Item #2</ui5-li>
      <ui5-li icon="product">Item #3</ui5-li>
    </ui5-list>
    <ui5-list
      header-text="Inner separators"
      separators="Inner"
      class="full-width"
    >
      <ui5-li icon="shipping-status">Devilered</ui5-li>
      <ui5-li icon="shipping-status">Pending</ui5-li>
      <ui5-li icon="shipping-status">Declined</ui5-li>
    </ui5-list>`,r=()=>s` <ui5-list
      header-text="Highlight Types"
      separators="Inner"
      class="full-width"
    >
      <ui5-li highlight="None">None</ui5-li>
      <ui5-li highlight="Positive">Success</ui5-li>
      <ui5-li highlight="Critical">Warning</ui5-li>
      <ui5-li highlight="Negative">Error</ui5-li>
      <ui5-li highlight="Information">Information</ui5-li>
    </ui5-list>`;var d,p,m;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`args => {
  return html\` <ui5-list
    selection-mode="\${ifDefined(args.selectionMode)}"
    ?loading="\${ifDefined(args.loading)}"
    ?indent="\${ifDefined(args.indent)}"
    ?growing="\${ifDefined(args.growing)}"
    growing-button-text="\${ifDefined(args.growingButtonText)}"
    loading-delay="\${ifDefined(args.loadingDelay)}"
    separators="\${ifDefined(args.separators)}"
    header-text="\${ifDefined(args.headerText)}"
    footer-text="\${ifDefined(args.footerText)}"
    no-data-text="\${ifDefined(args.noDataText)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-role="\${ifDefined(args.accessibleRole)}"
  >
    \${unsafeHTML(args.default)}
  </ui5-list>\`;
}`,...(m=(p=t.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var g,h,f;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`() => html\`<ui5-list id="infiniteScrollEx" style="height: 200px" growing="Scroll">
      <ui5-li
        icon="nutrition-activity"
        description="Tropical plant with an edible fruit"
        additional-text="In-stock"
        additional-text-state="Positive"
        >Pineapple</ui5-li
      >
      <ui5-li
        icon="nutrition-activity"
        description="Occurs between red and yellow"
        additional-text="Expires"
        additional-text-state="Critical"
        >Orange</ui5-li
      >
      <ui5-li
        icon="nutrition-activity"
        description="The yellow lengthy fruit"
        additional-text="Re-stock"
        additional-text-state="Negative"
        >Banana</ui5-li
      >
    </ui5-list>
    <script>
      function template(i) {
        var li = document.createElement("ui5-li");
        li.textContent = "Fruit name";
        li.description = "the description goes here " + i;
        li.additionalText = "Available";
        li.additionalTextState = "Positive";
        li.icon = "nutrition-activity";
        return li;
      }
      function insertItems(el, num) {
        for (var i = 0; i < num; i++) {
          el.appendChild(template(i));
        }
      }
      infiniteScrollEx.addEventListener("load-more", (e) => {
        var el = infiniteScrollEx;
        el.loading = true;
        setTimeout(() => {
          insertItems(el, 5);
          el.loading = false;
        }, 200);
      });
    <\/script>\``,...(f=(h=n.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var v,y,x;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`() => html\`
<ui5-list selection-mode="Single" header-text="Single Selection Mode:">
<ui5-li selected icon="map" icon-end>Argentina</ui5-li>
    <ui5-li icon="map" icon-end>Bulgaria</ui5-li>
    <ui5-li icon="map" icon-end>China</ui5-li>
    <ui5-li type="Inactive" icon="map" icon-end>Denmark (ui5-li type='Inactive')</ui5-li>
</ui5-list>

</br>

<ui5-list selection-mode="Multiple" header-text="Multiple Selection Mode:">
<ui5-li>Pineapple</ui5-li>
<ui5-li selected="">Orange</ui5-li>
<ui5-li>Banana</ui5-li>
<ui5-li>Mango</ui5-li>
</ui5-list>

</br>

<ui5-list selection-mode="Delete" header-text="Delete Mode:">
<ui5-li>Argentina</ui5-li>
<ui5-li>Bulgaria</ui5-li>
<ui5-li>China</ui5-li>
</ui5-list>

</br>

<ui5-list selection-mode="None" header-text="None Selection Mode:" no-data-text="No Data Available">
</ui5-list>
\``,...(x=(y=o.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var b,w,D;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`args => {
  return html\` <ui5-list
    selection-mode="\${ifDefined(args.selectionMode)}"
    ?loading="\${ifDefined(args.loading)}"
    ?indent="\${ifDefined(args.indent)}"
    ?growing="\${ifDefined(args.growing)}"
    growing-button-text="\${ifDefined(args.growingButtonText)}"
    loading-delay="\${ifDefined(args.loadingDelay)}"
    separators="\${ifDefined(args.separators)}"
    header-text="\${ifDefined(args.headerText)}"
    footer-text="\${ifDefined(args.footerText)}"
    no-data-text="\${ifDefined(args.noDataText)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-role="\${ifDefined(args.accessibleRole)}"
  >
    \${unsafeHTML(args.default)}
  </ui5-list>\`;
}`,...(D=(w=a.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};var I,S,T;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`() => html\` <ui5-list
      header-text="No separators"
      separators="None"
      class="full-width"
    >
      <ui5-li icon="product">Item #1</ui5-li>
      <ui5-li icon="product">Item #2</ui5-li>
      <ui5-li icon="product">Item #3</ui5-li>
    </ui5-list>
    <ui5-list
      header-text="Inner separators"
      separators="Inner"
      class="full-width"
    >
      <ui5-li icon="shipping-status">Devilered</ui5-li>
      <ui5-li icon="shipping-status">Pending</ui5-li>
      <ui5-li icon="shipping-status">Declined</ui5-li>
    </ui5-list>\``,...(T=(S=l.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var $,M,_;r.parameters={...r.parameters,docs:{...($=r.parameters)==null?void 0:$.docs,source:{originalSource:`() => html\` <ui5-list
      header-text="Highlight Types"
      separators="Inner"
      class="full-width"
    >
      <ui5-li highlight="None">None</ui5-li>
      <ui5-li highlight="Positive">Success</ui5-li>
      <ui5-li highlight="Critical">Warning</ui5-li>
      <ui5-li highlight="Negative">Error</ui5-li>
      <ui5-li highlight="Information">Information</ui5-li>
    </ui5-list>\``,...(_=(M=r.parameters)==null?void 0:M.docs)==null?void 0:_.source}}};const H=["Basic","Growing","SelectionModes","GroupHeaders","SeparationTypes","HighlightTypes"],U=Object.freeze(Object.defineProperty({__proto__:null,Basic:t,GroupHeaders:a,Growing:n,HighlightTypes:r,SelectionModes:o,SeparationTypes:l,__namedExportsOrder:H,default:k},Symbol.toStringTag,{value:"Module"}));export{U as C,G as c};
