import{x as u}from"./lit-element-c5a2b594.js";import{o as p}from"./unsafe-html-0ddd83da.js";import{l as g}from"./if-defined-c29cffe1.js";const R={default:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},header:{control:{type:"text"},table:{type:{summary:"Array<ICardHeader>"}}}},O={package:"@ui5/webcomponents",tagName:"ui5-card"},L={title:"Main/Card",component:"Card",parameters:{docs:{story:{iframeHeight:"370px",inline:!1}}},argTypes:R},o=e=>u`
<ui5-card
    accessible-name="${g(e.accessibleName)}"
    accessible-name-ref="${g(e.accessibleNameRef)}"
>
    ${p(e.header)}
    ${p(e.default)}
</ui5-card>
    `,r=(e,n,c,m,b,A)=>`<ui5-card-header
    slot="header"
    title-text="${e}"
    subtitle-text="${n}"
    ${c?`status="${c}"`:""}
    ${A?"interactive":""}
>
    ${b||""}
    ${m?m.map(C=>`<ui5-button design="Transparent" slot="action">${C}</ui5-button>`):""}
</ui5-card-header>`,d=e=>{const n=u`
        <style>
            ui5-card {
                width: ${e};
            }
        </style>`;return c=>u`
        ${n}
        ${c()}`},i=o.bind({});i.args={header:r("This header is interactive","Click, press Enter or Space","3 of 6",[],'<ui5-icon name="group" slot="avatar"></ui5-icon>',!0),default:`<ui5-list separators="None" style="margin-block-end: 0.75rem;">
    <ui5-li image="../assets/images/avatars/man_avatar_2.png" description="Software Architect">Richard Wilson</ui5-li>
    <ui5-li image="../assets/images/avatars/woman_avatar_3.png" description="Visual Designer">Elena Petrova</ui5-li>
    <ui5-li image="../assets/images/avatars/man_avatar_3.png" description="Quality Specialist">John Miller</ui5-li>
</ui5-list>`};i.decorators=[d("22rem")];const t=o.bind({});t.args={header:r("Team Space","Direct Reports","3 of 10",["View All"],'<ui5-icon name="group" slot="avatar"></ui5-icon>'),default:`<ui5-list separators="None" style="margin-block-end: 0.75rem;">
    <ui5-li image="../assets/images/avatars/man_avatar_1.png" description="User Researcher">Alain Chevalier</ui5-li>
    <ui5-li image="../assets/images/avatars/woman_avatar_1.png" description="Artist">Monique Legrand</ui5-li>
    <ui5-li image="../assets/images/avatars/woman_avatar_2.png" description="UX Specialist">Isabella Adams</ui5-li>
</ui5-list>`};t.decorators=[d("22rem")];const a=o.bind({});a.args={header:r("New Purchase Orders","Today","3 of 15"),default:`<style>
    .status-error { color: #b00; }
    .status-warning { color: #e9730c; }
    .status-success { color: #107e3e; }
</style>

<ui5-table style="margin-block-end: 0.75rem;">
    <ui5-table-column slot="columns">
        <ui5-label>Sales Order</ui5-label>
    </ui5-table-column>
    <ui5-table-column slot="columns">
        <ui5-label>Customer</ui5-label>
    </ui5-table-column>
    <ui5-table-column slot="columns">
        <ui5-label>Net Amount</ui5-label>
    </ui5-table-column>
    <ui5-table-column slot="columns" min-width="450" popin-text="Status" demand-popin>
        <ui5-label>Status</ui5-label>
    </ui5-table-column>

    <ui5-table-row>
        <ui5-table-cell>
            <ui5-label>5000010050</ui5-label>
        </ui5-table-cell>
        <ui5-table-cell>
            <ui5-label>Entertainment Argentina</ui5-label>
        </ui5-table-cell>
        <ui5-table-cell>
            <ui5-label>6k USD</ui5-label>
        </ui5-table-cell>
        <ui5-table-cell>
            <span class="status-success">Approved</span>
        </ui5-table-cell>
    </ui5-table-row>
    <ui5-table-row>
        <ui5-table-cell>
            <ui5-label>5000010051</ui5-label>
        </ui5-table-cell>
        <ui5-table-cell>
            <ui5-label>Brazil Technologies</ui5-label>
        </ui5-table-cell>
        <ui5-table-cell>
            <ui5-label>2k USD</ui5-label>
        </ui5-table-cell>
        <ui5-table-cell>
            <span class="status-error">Rejected</span>
        </ui5-table-cell>
    </ui5-table-row>
    <ui5-table-row>
        <ui5-table-cell>
            <ui5-label>5000010052</ui5-label>
        </ui5-table-cell>
        <ui5-table-cell>
            <ui5-label>Robert Brown Ent.</ui5-label>
        </ui5-table-cell>
        <ui5-table-cell>
            <ui5-label>17k USD</ui5-label>
        </ui5-table-cell>
        <ui5-table-cell>
            <span class="status-warning">Pending</span>
        </ui5-table-cell>
    </ui5-table-row>
</ui5-table>`};a.decorators=[d("40rem")];a.parameters={docs:{story:{iframeHeight:"250px",inline:!1}}};const l=o.bind({});l.args={header:r("Upcoming Activities","Today"),default:`<ui5-timeline>
    <ui5-timeline-item title-text="called" timestamp="1487583000000" icon="phone" name="John Smith" name-clickable></ui5-timeline-item>
    <ui5-timeline-item title-text="Weekly Sync - BTP Design" timestamp="1517349600000" icon="calendar">
        MR SOF02 2.43
    </ui5-timeline-item>
    <ui5-timeline-item title-text="Video Conference Call - UI5" timestamp="1485813600000" icon="calendar">
        Online meeting
    </ui5-timeline-item>
</ui5-timeline>`};l.decorators=[d("22rem")];const s=o.bind({}),W=[{header:r("David Williams","Sales Manager"),default:`<ui5-list separators="Inner" style="margin-block-end: 0.75rem;">
    <ui5-li icon="competitor" icon-end>Personal Development</ui5-li>
    <ui5-li icon="wallet" icon-end>Finance</ui5-li>
    <ui5-li icon="collaborate" icon-end>Communications Skills</ui5-li>
</ui5-list>`},{header:r("Project Cloud Transformation","Revenue per Product | EUR","3 of 3"),default:`<ui5-list separators="None" style="margin-block-end: 0.75rem;">
    <ui5-li description="ID234522566-D44" additional-text="27.25K EUR" additional-text-state="Success">Avantel</ui5-li>
    <ui5-li description="ID7125852785-A51" additional-text="22.89K EUR" additional-text-state="Warning">Telecomunicaciones Star</ui5-li>
    <ui5-li description="ID123555587-I05" additional-text="7.85K EUR" additional-text-state="Error">Talpa</ui5-li>
</ui5-list>`},{header:r("Donna Maria Moore","Senior Sales Executive",void 0,void 0,'<img src="../assets/images/avatars/man_avatar_1.png" slot="avatar">'),default:`<style>
    .content,
    .content-group {
        display: flex;
        flex-direction: column;
        padding-block-end: 1rem;
    }
    .content-padding {
        padding: 0.5rem 1rem 0 1rem;
        box-sizing: border-box;
    }
</style>
<div class="content content-padding">
    <ui5-title level="H5" style="padding-block-end: 1rem;">Contact details</ui5-title>
    <div class="content-group">
        <ui5-label show-colon>Company Name</ui5-label>
        <span>Company A</span>
    </div>
    <div class="content-group">
        <ui5-label show-colon>Address</ui5-label>
        <span>481 West Street, Anytown 45066, USA</span>
    </div>
    <div class="content-group">
        <ui5-label show-colon>Website</ui5-label>
        <ui5-link target="_blank">www.company_a.example.com</ui5-link>
    </div>
</div>`}];s.decorators=[e=>u`
            <style>
                .grid-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, 22rem);
                    grid-auto-rows: 1fr;
                    gap: 1rem;
                }
            </style>
            <div class="grid-container">
                ${W.map(n=>e({args:{...n}}))}
            </div>`];s.parameters={docs:{story:{iframeHeight:"680px",inline:!1}}};var f,h,v;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
  return html\`
<ui5-card
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
    \${unsafeHTML(args.header)}
    \${unsafeHTML(args.default)}
</ui5-card>
    \`;
}`,...(v=(h=i.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var y,$,S;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`args => {
  return html\`
<ui5-card
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
    \${unsafeHTML(args.header)}
    \${unsafeHTML(args.default)}
</ui5-card>
    \`;
}`,...(S=($=t.parameters)==null?void 0:$.docs)==null?void 0:S.source}}};var T,w,x;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`args => {
  return html\`
<ui5-card
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
    \${unsafeHTML(args.header)}
    \${unsafeHTML(args.default)}
</ui5-card>
    \`;
}`,...(x=(w=a.parameters)==null?void 0:w.docs)==null?void 0:x.source}}};var D,_,M;l.parameters={...l.parameters,docs:{...(D=l.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
  return html\`
<ui5-card
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
    \${unsafeHTML(args.header)}
    \${unsafeHTML(args.default)}
</ui5-card>
    \`;
}`,...(M=(_=l.parameters)==null?void 0:_.docs)==null?void 0:M.source}}};var N,k,H;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{originalSource:`args => {
  return html\`
<ui5-card
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
    \${unsafeHTML(args.header)}
    \${unsafeHTML(args.default)}
</ui5-card>
    \`;
}`,...(H=(k=s.parameters)==null?void 0:k.docs)==null?void 0:H.source}}};const E=["InteractiveHeader","WithList","WithTable","WithTimeline","More"],j=Object.freeze(Object.defineProperty({__proto__:null,InteractiveHeader:i,More:s,WithList:t,WithTable:a,WithTimeline:l,__namedExportsOrder:E,default:L},Symbol.toStringTag,{value:"Module"}));export{j as C,O as c};
