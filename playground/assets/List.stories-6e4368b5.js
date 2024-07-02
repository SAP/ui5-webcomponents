import{x as s}from"./lit-element-c5a2b594.js";import{l as i}from"./if-defined-c29cffe1.js";import{o as B}from"./unsafe-html-0ddd83da.js";import{L}from"./ListMode-b6a2b1ad.js";const A={mode:{control:"select",options:["None","SingleSelect","SingleSelectBegin","SingleSelectEnd","SingleSelectAuto","MultiSelect","Delete"]},separators:{control:"select",options:["All","Inner","None"]},growing:{control:"select",options:["Button","Scroll","None"]},default:{control:{type:"text"},table:{type:{summary:"Array<ListItemBase>"}}},header:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},"item-click":{description:"Fired when an item is activated, unless the item's `type` property\nis set to `Inactive`.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"item",_ui5privacy:"public",description:"The clicked item."}]}},"item-close":{description:"Fired when the `Close` button of any item is clicked\n\n**Note:** This event is only applicable to list items that can be closed (such as notification list items),\nnot to be confused with `item-delete`.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"item",_ui5privacy:"public",description:"the item about to be closed."}]}},"item-toggle":{description:"Fired when the `Toggle` button of any item is clicked.\n\n**Note:** This event is only applicable to list items that can be toggled (such as notification group list items).",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"item",_ui5privacy:"public",description:"the toggled item."}]}},"item-delete":{description:"Fired when the Delete button of any item is pressed.\n\n**Note:** A Delete button is displayed on each item,\nwhen the component `mode` property is set to `Delete`.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"item",_ui5privacy:"public",description:"the deleted item."}]}},"selection-change":{description:"Fired when selection is changed by user interaction\nin `SingleSelect`, `SingleSelectBegin`, `SingleSelectEnd` and `MultiSelect` modes.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"Array<ListItemBase>",references:[{name:"ListItemBase",package:"@ui5/webcomponents",module:"dist/ListItemBase.js"}]},name:"selectedItems",_ui5privacy:"public",description:"An array of the selected items."},{type:{text:"Array<ListItemBase>",references:[{name:"ListItemBase",package:"@ui5/webcomponents",module:"dist/ListItemBase.js"}]},name:"previouslySelectedItems",_ui5privacy:"public",description:"An array of the previously selected items."}]}}},j={package:"@ui5/webcomponents",tagName:"ui5-list"};var u=Object.freeze,C=Object.defineProperty,k=(e,N)=>u(C(e,"raw",{value:u(N||e.slice())})),c;const H={title:"Main/List",component:"List",argTypes:A},M=e=>s` <ui5-list
    mode="${i(e.mode)}"
    ?busy="${i(e.busy)}"
    ?indent="${i(e.indent)}"
    ?growing="${i(e.growing)}"
    growing-button-text="${i(e.growingButtonText)}"
    busy-delay="${i(e.busyDelay)}"
    separators="${i(e.separators)}"
    header-text="${i(e.headerText)}"
    footer-text="${i(e.footerText)}"
    no-data-text="${i(e.noDataText)}"
    accessible-name="${i(e.accessibleName)}"
    accessible-role="${i(e.accessibleRole)}"
  >
    ${B(e.default)}
  </ui5-list>`,t=M.bind({});t.storyName="Basic";t.args={default:`<ui5-li
        icon="nutrition-activity"
        description="Tropical plant with an edible fruit"
        additional-text="In-stock"
        additional-text-state="Success"
        >Pineapple</ui5-li>
    <ui5-li
        icon="nutrition-activity"
        description="Occurs between red and yellow"
        additional-text="Expires"
        additional-text-state="Warning"
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
        additional-text-state="Error"
        >Mango</ui5-li>`};const n=()=>s(c||(c=k([`<ui5-list id="infiniteScrollEx" style="height: 200px" growing="Scroll">
      <ui5-li
        icon="nutrition-activity"
        description="Tropical plant with an edible fruit"
        additional-text="In-stock"
        additional-text-state="Success"
        >Pineapple</ui5-li
      >
      <ui5-li
        icon="nutrition-activity"
        description="Occurs between red and yellow"
        additional-text="Expires"
        additional-text-state="Warning"
        >Orange</ui5-li
      >
      <ui5-li
        icon="nutrition-activity"
        description="The yellow lengthy fruit"
        additional-text="Re-stock"
        additional-text-state="Error"
        >Banana</ui5-li
      >
    </ui5-list>
    <script>
      function template(i) {
        var li = document.createElement("ui5-li");
        li.textContent = "Fruit name";
        li.description = "the description goes here " + i;
        li.additionalText = "Available";
        li.additionalTextState = "Success";
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
        el.busy = true;
        setTimeout(() => {
          insertItems(el, 5);
          el.busy = false;
        }, 200);
      });
    <\/script>`])));n.storyName="Growing";n.parameters={docs:{story:{inline:!1}}};const l=()=>s`
<ui5-list mode="SingleSelect" header-text="Single Select Mode:">
<ui5-li selected icon="map" icon-end>Argentina</ui5-li>
    <ui5-li icon="map" icon-end>Bulgaria</ui5-li>
    <ui5-li icon="map" icon-end>China</ui5-li>
    <ui5-li type="Inactive" icon="map" icon-end>Denmark (ui5-li type='Inactive')</ui5-li>
</ui5-list>

</br>

<ui5-list mode="MultiSelect" header-text="Multi Select Mode:">
<ui5-li>Pineapple</ui5-li>
<ui5-li selected="">Orange</ui5-li>
<ui5-li>Banana</ui5-li>
<ui5-li>Mango</ui5-li>
</ui5-list>

</br>

<ui5-list mode="Delete" header-text="Delete Mode:">
<ui5-li>Argentina</ui5-li>
<ui5-li>Bulgaria</ui5-li>
<ui5-li>China</ui5-li>
</ui5-list>

</br>

<ui5-list mode="NoData" header-text="No Data Mode:" no-data-text="No Data Available">
</ui5-list>
`,a=M.bind({});a.storyName="Group Headers";a.args={mode:L.MultiSelect,default:`<ui5-li-groupheader
    >Front End Developers</ui5-li-groupheader
    >
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
    <ui5-li-groupheader>Back End Developers</ui5-li-groupheader>
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
    >`};const o=()=>s` <ui5-list
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
      <ui5-li highlight="Success">Success</ui5-li>
      <ui5-li highlight="Warning">Warning</ui5-li>
      <ui5-li highlight="Error">Error</ui5-li>
      <ui5-li highlight="Information">Information</ui5-li>
    </ui5-list>`;var d,p,m;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`args => {
  return html\` <ui5-list
    mode="\${ifDefined(args.mode)}"
    ?busy="\${ifDefined(args.busy)}"
    ?indent="\${ifDefined(args.indent)}"
    ?growing="\${ifDefined(args.growing)}"
    growing-button-text="\${ifDefined(args.growingButtonText)}"
    busy-delay="\${ifDefined(args.busyDelay)}"
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
        additional-text-state="Success"
        >Pineapple</ui5-li
      >
      <ui5-li
        icon="nutrition-activity"
        description="Occurs between red and yellow"
        additional-text="Expires"
        additional-text-state="Warning"
        >Orange</ui5-li
      >
      <ui5-li
        icon="nutrition-activity"
        description="The yellow lengthy fruit"
        additional-text="Re-stock"
        additional-text-state="Error"
        >Banana</ui5-li
      >
    </ui5-list>
    <script>
      function template(i) {
        var li = document.createElement("ui5-li");
        li.textContent = "Fruit name";
        li.description = "the description goes here " + i;
        li.additionalText = "Available";
        li.additionalTextState = "Success";
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
        el.busy = true;
        setTimeout(() => {
          insertItems(el, 5);
          el.busy = false;
        }, 200);
      });
    <\/script>\``,...(f=(h=n.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var y,x,b;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`() => html\`
<ui5-list mode="SingleSelect" header-text="Single Select Mode:">
<ui5-li selected icon="map" icon-end>Argentina</ui5-li>
    <ui5-li icon="map" icon-end>Bulgaria</ui5-li>
    <ui5-li icon="map" icon-end>China</ui5-li>
    <ui5-li type="Inactive" icon="map" icon-end>Denmark (ui5-li type='Inactive')</ui5-li>
</ui5-list>

</br>

<ui5-list mode="MultiSelect" header-text="Multi Select Mode:">
<ui5-li>Pineapple</ui5-li>
<ui5-li selected="">Orange</ui5-li>
<ui5-li>Banana</ui5-li>
<ui5-li>Mango</ui5-li>
</ui5-list>

</br>

<ui5-list mode="Delete" header-text="Delete Mode:">
<ui5-li>Argentina</ui5-li>
<ui5-li>Bulgaria</ui5-li>
<ui5-li>China</ui5-li>
</ui5-list>

</br>

<ui5-list mode="NoData" header-text="No Data Mode:" no-data-text="No Data Available">
</ui5-list>
\``,...(b=(x=l.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var v,S,w;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`args => {
  return html\` <ui5-list
    mode="\${ifDefined(args.mode)}"
    ?busy="\${ifDefined(args.busy)}"
    ?indent="\${ifDefined(args.indent)}"
    ?growing="\${ifDefined(args.growing)}"
    growing-button-text="\${ifDefined(args.growingButtonText)}"
    busy-delay="\${ifDefined(args.busyDelay)}"
    separators="\${ifDefined(args.separators)}"
    header-text="\${ifDefined(args.headerText)}"
    footer-text="\${ifDefined(args.footerText)}"
    no-data-text="\${ifDefined(args.noDataText)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-role="\${ifDefined(args.accessibleRole)}"
  >
    \${unsafeHTML(args.default)}
  </ui5-list>\`;
}`,...(w=(S=a.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var D,I,T;o.parameters={...o.parameters,docs:{...(D=o.parameters)==null?void 0:D.docs,source:{originalSource:`() => html\` <ui5-list
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
    </ui5-list>\``,...(T=(I=o.parameters)==null?void 0:I.docs)==null?void 0:T.source}}};var $,_,E;r.parameters={...r.parameters,docs:{...($=r.parameters)==null?void 0:$.docs,source:{originalSource:`() => html\` <ui5-list
      header-text="Highlight Types"
      separators="Inner"
      class="full-width"
    >
      <ui5-li highlight="None">None</ui5-li>
      <ui5-li highlight="Success">Success</ui5-li>
      <ui5-li highlight="Warning">Warning</ui5-li>
      <ui5-li highlight="Error">Error</ui5-li>
      <ui5-li highlight="Information">Information</ui5-li>
    </ui5-list>\``,...(E=(_=r.parameters)==null?void 0:_.docs)==null?void 0:E.source}}};const O=["Basic","Growing","Modes","GroupHeaders","SeparationTypes","HighlightTypes"],G=Object.freeze(Object.defineProperty({__proto__:null,Basic:t,GroupHeaders:a,Growing:n,HighlightTypes:r,Modes:l,SeparationTypes:o,__namedExportsOrder:O,default:H},Symbol.toStringTag,{value:"Module"}));export{G as C,j as c};
