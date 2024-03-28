import{x as s}from"./lit-element-c5a2b594.js";import{l as i}from"./if-defined-c29cffe1.js";import{o as l}from"./unsafe-html-0ddd83da.js";import{P as x}from"./PanelAccessibleRole-3fbc63f7.js";const D={accessibleRole:{control:"select",options:["Complementary","Form","Region"]},headerLevel:{control:"select",options:["H1","H2","H3","H4","H5","H6"]},default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}},header:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}}},C={package:"@ui5/webcomponents",tagName:"ui5-panel"};let q=0;const H={title:"Main/Panel",component:"Panel",argTypes:D},o=e=>s`
<ui5-panel
    id="panel-${++q}"
    accessible-role="${i(e.accessibleRole)}"
    header-text="${i(e.headerText)}"
    ?fixed="${i(e.fixed)}"
    ?collapsed="${i(e.collapsed)}"
    ?no-animation="${i(e.noAnimation)}"
    header-level="${i(e.headerLevel)}"
    accessible-name="${i(e.accessibleName)}"
    ?sticky-header="${i(e.stickyHeader)}"
>
    ${l(e.header)}
    ${l(e.default)}
</ui5-panel>`,a=o.bind({});a.decorators=[e=>s`
            <style>
                .content-color {
                    color: var(--sapField_TextColor);
                }
            </style>
            ${e()}`];a.args={headerText:"Both expandable and expanded",default:`
    <ui5-title level="H1"> I am a heading! </ui5-title>
    <ui5-label wrapping-type="Normal">Short text.</ui5-label>
    <br/>
    <ui5-label wrapping-type="Normal">Another text.</ui5-label>
    <p class="content-color">Aute ullamco officia fugiat culpa do tempor tempor aute excepteur magna.
        Quis velit adipisicing excepteur do eu duis elit. Sunt ea pariatur nulla est laborum proident sunt labore
        commodo Lorem laboris nisi Lorem.
    </p>`};const n=o.bind({});n.args={headerText:"Country Of Birth",accessibleRole:x.Complementary,fixed:!0,default:`
    <ui5-list mode="SingleSelectBegin">
        <ui5-li key="country1">Argentina</ui5-li>
        <ui5-li key="country2">Bulgaria</ui5-li>
        <ui5-li key="country3">China</ui5-li>
        <ui5-li key="country4">Germany</ui5-li>
    </ui5-list>`};const r=o.bind({});r.decorators=[e=>s`
            <style>
                #panel-${q+1} {
                    width: 90%;
                    margin: 0 auto 0 auto;
                }
                .content-color {
                    color: var(--sapField_TextColor);
                }
            </style>
            <div style="height: 250px; overflow: scroll;">
                ${e()}
            </div>`];r.args={headerText:"Sticky header",stickyHeader:!0,default:`
    <ui5-title>Lorem ipsum!</ui5-title>
    <p class="content-color">
        Lorem ipsum dolor sit amet, tamquam invidunt cu sed, unum regione mel ea, quo ea alia novum. Ne qui illud zril
        nostrum, vel ea sint dicant postea. Vel ne facete tritani, neglegentur concludaturque sed te. His animal dolorum ut.
        Aeterno appareat ei mei, cu sed elit scripserit, an quodsi oportere accusamus quo. Pri ea probo corpora rationibus,
        soluta incorrupte ex his.
        Mei ei brute cetero, id duo magna aeque torquatos. Quodsi erroribus mediocritatem his ut, ad pri legere iracundia
        democritum. Menandri intellegam in mea, ex vero movet qualisque sed. Maiorum verterem perfecto nec ea, est velit
        elaboraret consequuntur eu, eam ad reque postea admodum. Ne inimicus convenire pri, doctus vidisse te ius.
        Percipitur contentiones in vis, cu vim propriae phaedrum. Has ad magna errem honestatis, duo vero graeco epicurei
        no, populo semper sit ne. Vulputate dissentiunt interpretaris ea vis, nec civibus moderatius at. Cu vim stet
        dissentias, no vidit saperet indoctum nec, et pro magna prima nobis. Vis consul feugiat qualisque in, regione
        persecuti cotidieque id eos, id ius omnesque vituperata.
        Lorem ipsum dolor sit amet, tamquam invidunt cu sed, unum regione mel ea, quo ea alia novum. Ne qui illud zril
        nostrum, vel ea sint dicant postea. Vel ne facete tritani, neglegentur concludaturque sed te. His animal dolorum ut.
        Aeterno appareat ei mei, cu sed elit scripserit, an quodsi oportere accusamus quo. Pri ea probo corpora rationibus,
        soluta incorrupte ex his.
        Mei ei brute cetero, id duo magna aeque torquatos. Quodsi erroribus mediocritatem his ut, ad pri legere iracundia
        democritum. Menandri intellegam in mea, ex vero movet qualisque sed. Maiorum verterem perfecto nec ea, est velit
        elaboraret consequuntur eu, eam ad reque postea admodum. Ne inimicus convenire pri, doctus vidisse te ius.
        Percipitur contentiones in vis, cu vim propriae phaedrum. Has ad magna errem honestatis, duo vero graeco epicurei
        no, populo semper sit ne. Vulputate dissentiunt interpretaris ea vis, nec civibus moderatius at. Cu vim stet
        dissentias, no vidit saperet indoctum nec, et pro magna prima nobis. Vis consul feugiat qualisque in, regione
        persecuti cotidieque id eos, id ius omnesque vituperata.
    </p>`};const t=o.bind({});t.decorators=[e=>s`
<style>
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
</style>
    ${e()}`];t.args={accessibleRole:x.Complementary,header:`
    <div slot="header" class="header">
        <ui5-title>Countries</ui5-title>
        <div>
            <ui5-button design="Emphasized">Add</ui5-button>
            <ui5-button design="Negative">Remove</ui5-button>
            <ui5-button>Edit</ui5-button>
        </div>
    </div>`,default:`
    <ui5-list mode="MultiSelect">
        <ui5-li key="country1">Argentina</ui5-li>
        <ui5-li key="country2">Bulgaria</ui5-li>
        <ui5-li key="country3">China</ui5-li>
    </ui5-list>`};var u,d,c;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`args => html\`
<ui5-panel
    id="panel-\${++index}"
    accessible-role="\${ifDefined(args.accessibleRole)}"
    header-text="\${ifDefined(args.headerText)}"
    ?fixed="\${ifDefined(args.fixed)}"
    ?collapsed="\${ifDefined(args.collapsed)}"
    ?no-animation="\${ifDefined(args.noAnimation)}"
    header-level="\${ifDefined(args.headerLevel)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    ?sticky-header="\${ifDefined(args.stickyHeader)}"
>
    \${unsafeHTML(args.header)}
    \${unsafeHTML(args.default)}
</ui5-panel>\``,...(c=(d=a.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var m,p,f;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`args => html\`
<ui5-panel
    id="panel-\${++index}"
    accessible-role="\${ifDefined(args.accessibleRole)}"
    header-text="\${ifDefined(args.headerText)}"
    ?fixed="\${ifDefined(args.fixed)}"
    ?collapsed="\${ifDefined(args.collapsed)}"
    ?no-animation="\${ifDefined(args.noAnimation)}"
    header-level="\${ifDefined(args.headerLevel)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    ?sticky-header="\${ifDefined(args.stickyHeader)}"
>
    \${unsafeHTML(args.header)}
    \${unsafeHTML(args.default)}
</ui5-panel>\``,...(f=(p=n.parameters)==null?void 0:p.docs)==null?void 0:f.source}}};var g,b,h;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`args => html\`
<ui5-panel
    id="panel-\${++index}"
    accessible-role="\${ifDefined(args.accessibleRole)}"
    header-text="\${ifDefined(args.headerText)}"
    ?fixed="\${ifDefined(args.fixed)}"
    ?collapsed="\${ifDefined(args.collapsed)}"
    ?no-animation="\${ifDefined(args.noAnimation)}"
    header-level="\${ifDefined(args.headerLevel)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    ?sticky-header="\${ifDefined(args.stickyHeader)}"
>
    \${unsafeHTML(args.header)}
    \${unsafeHTML(args.default)}
</ui5-panel>\``,...(h=(b=r.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var v,$,y;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`args => html\`
<ui5-panel
    id="panel-\${++index}"
    accessible-role="\${ifDefined(args.accessibleRole)}"
    header-text="\${ifDefined(args.headerText)}"
    ?fixed="\${ifDefined(args.fixed)}"
    ?collapsed="\${ifDefined(args.collapsed)}"
    ?no-animation="\${ifDefined(args.noAnimation)}"
    header-level="\${ifDefined(args.headerLevel)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    ?sticky-header="\${ifDefined(args.stickyHeader)}"
>
    \${unsafeHTML(args.header)}
    \${unsafeHTML(args.default)}
</ui5-panel>\``,...(y=($=t.parameters)==null?void 0:$.docs)==null?void 0:y.source}}};const k=["Basic","Fixed","StickyHeader","CustomHeader"],S=Object.freeze(Object.defineProperty({__proto__:null,Basic:a,CustomHeader:t,Fixed:n,StickyHeader:r,__namedExportsOrder:k,default:H},Symbol.toStringTag,{value:"Module"}));export{S as C,C as c};
