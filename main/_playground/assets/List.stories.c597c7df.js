import{y as f}from"./lit-html.9e2e9691.js";import{l as i}from"./if-defined.fd0de8da.js";import{o as F}from"./unsafe-html.9d6beac9.js";import{L as u,a as W}from"./ListSeparators.180f4cfd.js";import{D as j}from"./docs.7a9434d6.js";import"./index.8cb7a9d9.js";import"./iframe.d5a3589f.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.8974bf6a.js";import"./chunk-R4NKYYJA.15989c7a.js";const z={growing:{control:"select",options:["Button","None","Scroll"]},mode:{control:"select",options:["Delete","MultiSelect","None","SingleSelect","SingleSelectAuto","SingleSelectBegin","SingleSelectEnd"]},separators:{control:"select",options:["All","Inner","None"]},default:{control:{type:"text"}},header:{control:{type:"text"}}},J={package:"@ui5/webcomponents"};var g=Object.freeze,q=Object.defineProperty,K=(e,G)=>g(q(e,"raw",{value:g(G||e.slice())})),p;const m="ui5-list",de={title:"Main/List",component:m,subcomponents:{StandardListItem:"ui5-li",CustomListItem:"ui5-li-custom",GroupHeaderListItem:"ui5-li-groupheader"},parameters:{docs:{page:j({...J,component:m})}},argTypes:z},d=e=>f` <ui5-list
    mode="${i(e.mode)}"
    ?busy="${i(e.busy)}"
    ?indent="${i(e.indent)}"
    ?growing="${i(e.growing)}"
    busy-delay="${i(e.busyDelay)}"
    separators="${i(e.separators)}"
    header-text="${i(e.headerText)}"
    footer-text="${i(e.footerText)}"
    no-data-text="${i(e.noDataText)}"
    accessible-name="${i(e.accessibleName)}"
    accessible-role="${i(e.accessibleRole)}"
  >
    ${F(e.default)}
  </ui5-list>`,n=d.bind({});n.storyName="Basic";n.args={default:`<ui5-li
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
        >Mango</ui5-li>`};const t=()=>f(p||(p=K([`<ui5-list id="infiniteScrollEx" style="height: 200px" growing="Scroll">
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
    <\/script>`])));t.storyName="Growing";t.parameters={docs:{story:{inline:!1}}};const a=d.bind({});a.storyName="Single Selection";a.args={mode:u.SingleSelect,headerText:"Select a country:",default:`
    <ui5-li selected icon="map" icon-end>Argentina</ui5-li>
    <ui5-li icon="map" icon-end>Bulgaria</ui5-li>
    <ui5-li icon="map" icon-end>China</ui5-li>
    <ui5-li type="Inactive" icon="map" icon-end>Denmark (ui5-li type='Inactive')</ui5-li>`};const r=d.bind({});r.storyName="Multi Selection";r.args={mode:u.MultiSelect,headerText:"Multiple selection is possible",default:`
    <ui5-li>Pineapple</ui5-li>
    <ui5-li selected="">Orange</ui5-li>
    <ui5-li>Banana</ui5-li>
    <ui5-li>Mango</ui5-li>`};const s=d.bind({});s.storyName="Group Headers";s.args={mode:u.MultiSelect,default:`<ui5-li-groupheader
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
    >`};const o=d.bind({});o.storyName="Delete Mode";o.args={mode:u.Delete,headerText:"Note: The list items removal is up to application developers",default:`
    <ui5-li>Argentina</ui5-li>
    <ui5-li>Bulgaria</ui5-li>
    <ui5-li>China</ui5-li>`};const l=d.bind({});l.storyName="No Data";l.args={headerText:"Products",noDataText:"No Data Available",separators:W.None};const c=()=>f` <ui5-list
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
    </ui5-list>`;var D,x,y;n.parameters={...n.parameters,docs:{...(D=n.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
  return html\` <ui5-list
    mode="\${ifDefined(args.mode)}"
    ?busy="\${ifDefined(args.busy)}"
    ?indent="\${ifDefined(args.indent)}"
    ?growing="\${ifDefined(args.growing)}"
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
}`,...(y=(x=n.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var $,b,h;t.parameters={...t.parameters,docs:{...($=t.parameters)==null?void 0:$.docs,source:{originalSource:`() => html\`<ui5-list id="infiniteScrollEx" style="height: 200px" growing="Scroll">
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
    <\/script>\``,...(h=(b=t.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var v,S,T;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`args => {
  return html\` <ui5-list
    mode="\${ifDefined(args.mode)}"
    ?busy="\${ifDefined(args.busy)}"
    ?indent="\${ifDefined(args.indent)}"
    ?growing="\${ifDefined(args.growing)}"
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
}`,...(T=(S=a.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var w,N,I;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`args => {
  return html\` <ui5-list
    mode="\${ifDefined(args.mode)}"
    ?busy="\${ifDefined(args.busy)}"
    ?indent="\${ifDefined(args.indent)}"
    ?growing="\${ifDefined(args.growing)}"
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
}`,...(I=(N=r.parameters)==null?void 0:N.docs)==null?void 0:I.source}}};var _,E,M;s.parameters={...s.parameters,docs:{...(_=s.parameters)==null?void 0:_.docs,source:{originalSource:`args => {
  return html\` <ui5-list
    mode="\${ifDefined(args.mode)}"
    ?busy="\${ifDefined(args.busy)}"
    ?indent="\${ifDefined(args.indent)}"
    ?growing="\${ifDefined(args.growing)}"
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
}`,...(M=(E=s.parameters)==null?void 0:E.docs)==null?void 0:M.source}}};var L,B,R;o.parameters={...o.parameters,docs:{...(L=o.parameters)==null?void 0:L.docs,source:{originalSource:`args => {
  return html\` <ui5-list
    mode="\${ifDefined(args.mode)}"
    ?busy="\${ifDefined(args.busy)}"
    ?indent="\${ifDefined(args.indent)}"
    ?growing="\${ifDefined(args.growing)}"
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
}`,...(R=(B=o.parameters)==null?void 0:B.docs)==null?void 0:R.source}}};var k,H,O;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`args => {
  return html\` <ui5-list
    mode="\${ifDefined(args.mode)}"
    ?busy="\${ifDefined(args.busy)}"
    ?indent="\${ifDefined(args.indent)}"
    ?growing="\${ifDefined(args.growing)}"
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
}`,...(O=(H=l.parameters)==null?void 0:H.docs)==null?void 0:O.source}}};var P,C,A;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`() => html\` <ui5-list
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
    </ui5-list>\``,...(A=(C=c.parameters)==null?void 0:C.docs)==null?void 0:A.source}}};const ce=["Basic","Growing","SingleSelection","MultiSelection","GroupHeaders","Delete","NoData","SeparationTypes"];export{n as Basic,o as Delete,s as GroupHeaders,t as Growing,r as MultiSelection,l as NoData,c as SeparationTypes,a as SingleSelection,ce as __namedExportsOrder,de as default};
//# sourceMappingURL=List.stories.c597c7df.js.map
