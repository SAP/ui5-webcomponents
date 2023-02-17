import{y as n}from"./lit-html.9e2e9691.js";import{D as v}from"./docs.7a9434d6.js";import"./index.8cb7a9d9.js";import"./iframe.d5a3589f.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.8974bf6a.js";import"./chunk-R4NKYYJA.15989c7a.js";const k={accessibleRole:{control:"select",options:["Complementary","Form","Region"]},headerLevel:{control:"select",options:["H1","H2","H3","H4","H5","H6"]},default:{control:{type:"text"}},header:{control:{type:"text"}}},x={package:"@ui5/webcomponents"},a="ui5-panel",M={title:"Main/Panel",component:a,parameters:{docs:{page:v({...x,component:a})}},argTypes:k},e=()=>n`
<h3>Basic Panel</h3>
    <div class="snippet">
        <ui5-panel width="100%" accessible-role="Complementary" header-text="Both expandable and expanded" class="full-width">
            <h1 class="content-color">I am a native heading!</h1>
            <ui5-label wrapping-type="Normal">Short text.</ui5-label>
            <br/>
            <ui5-label wrapping-type="Normal">Another text.</ui5-label>
            <p class="content-color">
                Aute ullamco officia fugiat culpa do tempor tempor aute excepteur magna. Quis velit adipisicing excepteur do eu duis elit. Sunt ea pariatur nulla est laborum proident sunt labore commodo Lorem laboris nisi Lorem.
            </p>
        </ui5-panel>
    </div>
`,i=()=>n`
<h3>Panel with List</h3>
    <div class="snippet">
        <ui5-panel accessible-role="Complementary" header-text="Select your country" class="full-width">
            <ui5-list id="myList1" mode="MultiSelect">
                <ui5-li key="country1">Argentina</ui5-li>
                <ui5-li key="country2">Bulgaria</ui5-li>
                <ui5-li key="country3">China</ui5-li>
                <ui5-li key="country4">Germany</ui5-li>
                <ui5-li key="country5">Hungary</ui5-li>
                <ui5-li key="country6">England</ui5-li>
                <ui5-li key="country7">USA</ui5-li>
                <ui5-li key="country8">Canada</ui5-li>
            </ui5-list>
        </ui5-panel>
    </div>
`,t=()=>n`
<h3>Fixed Panel (Can't be Collapsed/Expanded)</h3>
    <div class="snippet panel-snippet">
        <ui5-panel class="full-width" fixed="" accessible-role="Complementary" header-text="Country Of Birth">
            <ui5-list id="myList2" mode="SingleSelectBegin">
                <ui5-li key="country1">Argentina</ui5-li>
                <ui5-li key="country2">Bulgaria</ui5-li>
                <ui5-li key="country3">China</ui5-li>
                <ui5-li key="country4">Germany</ui5-li>
            </ui5-list>
        </ui5-panel>
    </div>
`,l=()=>n`
<h3>Panel with Custom Header</h3>
    <div class="snippet">
        <ui5-panel accessible-role="Complementary" class="full-width">
            <!-- Panel header -->
            <div slot="header" class="header">
                <ui5-title>Countries</ui5-title>
                <div>
                    <ui5-button>Edit</ui5-button>
                    <ui5-button design="Emphasized">Add</ui5-button>
                    <ui5-button design="Negative">Remove</ui5-button>
                </div>
            </div>
            <ui5-list id="myList1" mode="MultiSelect">
                <ui5-li key="country1">Argentina</ui5-li>
                <ui5-li key="country2">Bulgaria</ui5-li>
                <ui5-li key="country3">China</ui5-li>
            </ui5-list>
        </ui5-panel>
    </div>
`;var u,o,r;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`() => html\`
<h3>Basic Panel</h3>
    <div class="snippet">
        <ui5-panel width="100%" accessible-role="Complementary" header-text="Both expandable and expanded" class="full-width">
            <h1 class="content-color">I am a native heading!</h1>
            <ui5-label wrapping-type="Normal">Short text.</ui5-label>
            <br/>
            <ui5-label wrapping-type="Normal">Another text.</ui5-label>
            <p class="content-color">
                Aute ullamco officia fugiat culpa do tempor tempor aute excepteur magna. Quis velit adipisicing excepteur do eu duis elit. Sunt ea pariatur nulla est laborum proident sunt labore commodo Lorem laboris nisi Lorem.
            </p>
        </ui5-panel>
    </div>
\``,...(r=(o=e.parameters)==null?void 0:o.docs)==null?void 0:r.source}}};var s,c,p;i.parameters={...i.parameters,docs:{...(s=i.parameters)==null?void 0:s.docs,source:{originalSource:`() => html\`
<h3>Panel with List</h3>
    <div class="snippet">
        <ui5-panel accessible-role="Complementary" header-text="Select your country" class="full-width">
            <ui5-list id="myList1" mode="MultiSelect">
                <ui5-li key="country1">Argentina</ui5-li>
                <ui5-li key="country2">Bulgaria</ui5-li>
                <ui5-li key="country3">China</ui5-li>
                <ui5-li key="country4">Germany</ui5-li>
                <ui5-li key="country5">Hungary</ui5-li>
                <ui5-li key="country6">England</ui5-li>
                <ui5-li key="country7">USA</ui5-li>
                <ui5-li key="country8">Canada</ui5-li>
            </ui5-list>
        </ui5-panel>
    </div>
\``,...(p=(c=i.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var d,m,y;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`() => html\`
<h3>Fixed Panel (Can't be Collapsed/Expanded)</h3>
    <div class="snippet panel-snippet">
        <ui5-panel class="full-width" fixed="" accessible-role="Complementary" header-text="Country Of Birth">
            <ui5-list id="myList2" mode="SingleSelectBegin">
                <ui5-li key="country1">Argentina</ui5-li>
                <ui5-li key="country2">Bulgaria</ui5-li>
                <ui5-li key="country3">China</ui5-li>
                <ui5-li key="country4">Germany</ui5-li>
            </ui5-list>
        </ui5-panel>
    </div>
\``,...(y=(m=t.parameters)==null?void 0:m.docs)==null?void 0:y.source}}};var h,g,b;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`() => html\`
<h3>Panel with Custom Header</h3>
    <div class="snippet">
        <ui5-panel accessible-role="Complementary" class="full-width">
            <!-- Panel header -->
            <div slot="header" class="header">
                <ui5-title>Countries</ui5-title>
                <div>
                    <ui5-button>Edit</ui5-button>
                    <ui5-button design="Emphasized">Add</ui5-button>
                    <ui5-button design="Negative">Remove</ui5-button>
                </div>
            </div>
            <ui5-list id="myList1" mode="MultiSelect">
                <ui5-li key="country1">Argentina</ui5-li>
                <ui5-li key="country2">Bulgaria</ui5-li>
                <ui5-li key="country3">China</ui5-li>
            </ui5-list>
        </ui5-panel>
    </div>
\``,...(b=(g=l.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};const G=["Template0","Template1","Template2","Template3"];export{e as Template0,i as Template1,t as Template2,l as Template3,G as __namedExportsOrder,M as default};
//# sourceMappingURL=Panel.stories.8b26ed32.js.map
