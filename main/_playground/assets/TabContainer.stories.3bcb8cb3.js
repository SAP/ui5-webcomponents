import{y as t}from"./lit-html.9e2e9691.js";import{D as A}from"./docs.9716d2dc.js";import"./index.766d49cf.js";import"./iframe.8d816ebf.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.2cfeaebe.js";import"./chunk-R4NKYYJA.15989c7a.js";const O={contentBackgroundDesign:{control:"select",options:["Solid","Translucent","Transparent"]},headerBackgroundDesign:{control:"select",options:["Solid","Translucent","Transparent"]},tabLayout:{control:"select",options:["Inline","Standard"]},tabsOverflowMode:{control:"select",options:["End","StartAndEnd"]},default:{control:{type:"text"}},overflowButton:{control:{type:"text"}},startOverflowButton:{control:{type:"text"}}},W={package:"@ui5/webcomponents"};var b=Object.freeze,_=Object.defineProperty,H=(r,P)=>b(_(r,"raw",{value:b(P||r.slice())})),d;const l="ui5-tabcontainer",Y={title:"Main/TabContainer",component:l,subcomponents:{Tab:"ui5-tab",TabSeparator:"ui5-tab-separator"},parameters:{docs:{page:A({...W,component:l})}},argTypes:O},a=()=>t`
<!-- Workaround for IE issue -->
    <style>
        ui5-tabcontainer {
            width: calc(100% + 2 * .0625rem) !important;
        }
    </style>
    <h3>Basic TabContainer</h3>
    <div class="snippet">
        <ui5-tabcontainer class="full-width">
            <ui5-tab icon="menu" text="Tab 1">
                <ui5-label>Quibusdam, veniam! Architecto debitis iusto ad et, asperiores quisquam perferendis reprehenderit ipsa voluptate minus minima, perspiciatis cum. Totam harum necessitatibus numquam voluptatum.</ui5-label>
            </ui5-tab>
            <ui5-tab icon="activities" text="Tab 2" selected="">
                <ui5-label>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga magni facere error dicta beatae optio repudiandae vero, quidem voluptatibus perferendis eum maiores rem tempore voluptates aperiam eos enim delectus unde.</ui5-label>
            </ui5-tab>
            <ui5-tab icon="add" text="Tab 3">
                <ui5-label>Dignissimos debitis architecto temporibus doloribus reiciendis libero rem nemo, nobis quidem dolor praesentium, beatae voluptatum iste eveniet, nam voluptatem obcaecati ducimus dolore.</ui5-label>
            </ui5-tab>
            <ui5-tab icon="calendar" text="Tab 4">
                <ui5-label>Possimus ipsa eos impedit aut nisi repellendus recusandae, temporibus ducimus, necessitatibus tenetur facere, minima vero fugit rem reiciendis natus ratione quia numquam?</ui5-label>
            </ui5-tab>
            <ui5-tab-separator></ui5-tab-separator>
            <ui5-tab icon="action-settings" text="Tab 5">
                <ui5-label>Explicabo laboriosam ab consequuntur, qui dignissimos inventore sapiente ullam quaerat ratione libero vero, beatae laudantium! Aperiam numquam tempore, laudantium perferendis recusandae autem.</ui5-label>
            </ui5-tab>
        </ui5-tabcontainer>
    </div>
`,i=()=>t`
<h3>TabContainer with text only tabs</h3>
    <div class="snippet">
        <ui5-tabcontainer class="full-width" collapsed="" fixed="">
            <ui5-tab text="Home"></ui5-tab>
            <ui5-tab text="What's new" selected=""></ui5-tab>
            <ui5-tab text="Who are we"></ui5-tab>
            <ui5-tab text="About"></ui5-tab>
            <ui5-tab text="Contacts"></ui5-tab>
        </ui5-tabcontainer>
    </div>
`,n=()=>t`
<h3>Text only End Overflow</h3>
    <div class="snippet">
        <ui5-tabcontainer collapsed="" fixed="">
            <ui5-tab text="Tab 1">
            </ui5-tab>
            <ui5-tab text="Tab 2">
            </ui5-tab>
            <ui5-tab text="Tab 3">
            </ui5-tab>
            <ui5-tab text="Tab 4">
            </ui5-tab>
            <ui5-tab text="Tab 5">
            </ui5-tab>
            <ui5-tab text="Tab 6">
            </ui5-tab>
            <ui5-tab text="Tab 7">
            </ui5-tab>
            <ui5-tab text="Tab 8">
            </ui5-tab>
            <ui5-tab text="Tab 9">
            </ui5-tab>
            <ui5-tab text="Tab 10">
            </ui5-tab>
            <ui5-tab text="Tab 11">
            </ui5-tab>
            <ui5-tab text="Tab 12">
            </ui5-tab>
            <ui5-tab text="Tab 13" selected="">
            </ui5-tab>
            <ui5-tab text="Tab 14">
            </ui5-tab>
            <ui5-tab text="Tab 15">
            </ui5-tab>
            <ui5-tab text="Tab 16">
            </ui5-tab>
            <ui5-tab text="Tab 17">
            </ui5-tab>
            <ui5-tab text="Tab 18">
            </ui5-tab>
            <ui5-tab text="Tab 19">
            </ui5-tab>
            <ui5-tab text="Tab 20">
            </ui5-tab>
            <ui5-tab text="Tab 21">
            </ui5-tab>
            <ui5-tab text="Tab 22">
            </ui5-tab>
            <ui5-tab text="Tab 23">
            </ui5-tab>
        </ui5-tabcontainer>
    </div>
`,o=()=>t`
<h3>TabContainer with text and additional-text</h3>
    <div class="snippet">
        <ui5-tabcontainer collapsed="" fixed="">
            <ui5-tab text="Info" additional-text="3">
            </ui5-tab>
            <ui5-tab text="Attachments" additional-text="24" selected="">
            </ui5-tab>
            <ui5-tab text="Notes" additional-text="16">
            </ui5-tab>
            <ui5-tab text="People" additional-text="34">
            </ui5-tab>
        </ui5-tabcontainer>
    </div>
`,u=()=>t`
<h3>TabContainer with tabLayout="Inline"</h3>
    <div class="snippet">
        <ui5-tabcontainer tab-layout="Inline" collapsed="" fixed="">
            <ui5-tab text="Monitors" additional-text="10">
            </ui5-tab>
            <ui5-tab text="Cameras" additional-text="2" selected="">
            </ui5-tab>
            <ui5-tab text="Rooms" additional-text="16">
            </ui5-tab>
        </ui5-tabcontainer>
        <ui5-tabcontainer tab-layout="Inline" collapsed="" fixed="">
            <ui5-tab icon="laptop" text="Monitors" additional-text="10">
            </ui5-tab>
            <ui5-tab icon="video" text="Cameras" additional-text="2" selected="">
            </ui5-tab>
            <ui5-tab icon="home" text="Rooms" additional-text="16">
            </ui5-tab>
        </ui5-tabcontainer>
    </div>
`,s=()=>t`
<h3>TabContainer with nested tabs</h3>
    <div class="snippet">
        <ui5-tabcontainer collapsed="">
            <ui5-tab text="Notes">
                Notes go here ...
            </ui5-tab>
            <ui5-tab text="Products">
                Products go here ...
                <ui5-tab slot="subTabs" text="Computers">
                    Computers go here ...
                    <ui5-tab slot="subTabs" text="Laptops">
                        Laptops go here ...
                    </ui5-tab>
                    <ui5-tab slot="subTabs" text="Desktops">
                        <ui5-tab slot="subTabs" text="Work Stations">
                            Work Stations go here ...
                        </ui5-tab>
                        <ui5-tab slot="subTabs" text="Game Stations">
                            Game Stations go here ...
                        </ui5-tab>
                        Desktops go here ...
                    </ui5-tab>
                </ui5-tab>
                <ui5-tab text="Phones" slot="subTabs">
                    <ui5-tab text="Smartphones" slot="subTabs">
                        Smartphones go here ...
                    </ui5-tab>
                    <ui5-tab text="Tablets" slot="subTabs">
                        Tablets go here ...
                    </ui5-tab>
                    Phones go here ...
                </ui5-tab>
            </ui5-tab>
            <ui5-tab text="Orders">
                Orders go here ...
                <ui5-tab slot="subTabs" text="Attachments">
                    Order attachments go here ...
                </ui5-tab>
            </ui5-tab>
        </ui5-tabcontainer>
    </div>
`,e=()=>t(d||(d=H([`
<style>
        .radio-button-group {
            display: flex;
            flex-direction: column;
        }
        .design-options {
            display: flex;
            gap: 2rem;
        }
    </style>
    <h3>TabContainer Design Background</h3>
    <div class="snippet">
        <div class="design-options">
            <div role="radiogroup" id="radioGroup-headerDesign" class="radio-button-group">
                <ui5-label>Header Background</ui5-label>
                <ui5-radio-button text="Solid" checked="" name="Group1"></ui5-radio-button>
                <ui5-radio-button text="Transparent" name="Group1"></ui5-radio-button>
                <ui5-radio-button text="Translucent" name="Group1"></ui5-radio-button>
            </div>
            <div role="radiogroup2" id="radioGroup-contentDesign" class="radio-button-group">
                <ui5-label>Content Background</ui5-label>
                <ui5-radio-button text="Solid" name="Group2"></ui5-radio-button>
                <ui5-radio-button text="Transparent" checked="" name="Group2"></ui5-radio-button>
                <ui5-radio-button text="Translucent" name="Group2"></ui5-radio-button>
            </div>
        </div>
        <ui5-tabcontainer id="tabContainerBackgroundDesign" header-background-design="Solid" content-background-design="Transparent">
            <ui5-tab text="Tab 1" selected="">
                <ui5-label>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptates accusamus est quibusdam inventore ipsam?</ui5-label>
            </ui5-tab>
            <ui5-tab text="Tab 2">
                <ui5-label>Accusamus minus aperiam sunt ipsam eos quos et maxime facilis tempora neque ratione nemo laborum expedita aliquid officiis nisi, necessitatibus quasi distinctio?</ui5-label>
            </ui5-tab>
            <ui5-tab text="Tab 3">
                <ui5-label>Dolores totam perferendis numquam incidunt obcaecati, id quo at alias rem deserunt praesentium repellat ipsum commodi consequuntur veniam et ducimus animi qui nobis accusantium tenetur eveniet culpa non!</ui5-label>
            </ui5-tab>
        </ui5-tabcontainer>
        <script>
            const radioGroupHeaderDesign = document.getElementById("radioGroup-headerDesign");
            const radioGroupContentDesign = document.getElementById("radioGroup-contentDesign");
            const tabContainerBackgroundDesign = document.getElementById("tabContainerBackgroundDesign");
            radioGroupHeaderDesign.addEventListener("change", function (e) {
                tabContainerBackgroundDesign.headerBackgroundDesign = e.target.text;
            });
            radioGroupContentDesign.addEventListener("change", function (e) {
                tabContainerBackgroundDesign.contentBackgroundDesign = e.target.text;
            });
        <\/script>
    </div>
`])));e.parameters={docs:{story:{inline:!1}}};var c,p,m;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`() => html\`
<!-- Workaround for IE issue -->
    <style>
        ui5-tabcontainer {
            width: calc(100% + 2 * .0625rem) !important;
        }
    </style>
    <h3>Basic TabContainer</h3>
    <div class="snippet">
        <ui5-tabcontainer class="full-width">
            <ui5-tab icon="menu" text="Tab 1">
                <ui5-label>Quibusdam, veniam! Architecto debitis iusto ad et, asperiores quisquam perferendis reprehenderit ipsa voluptate minus minima, perspiciatis cum. Totam harum necessitatibus numquam voluptatum.</ui5-label>
            </ui5-tab>
            <ui5-tab icon="activities" text="Tab 2" selected="">
                <ui5-label>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga magni facere error dicta beatae optio repudiandae vero, quidem voluptatibus perferendis eum maiores rem tempore voluptates aperiam eos enim delectus unde.</ui5-label>
            </ui5-tab>
            <ui5-tab icon="add" text="Tab 3">
                <ui5-label>Dignissimos debitis architecto temporibus doloribus reiciendis libero rem nemo, nobis quidem dolor praesentium, beatae voluptatum iste eveniet, nam voluptatem obcaecati ducimus dolore.</ui5-label>
            </ui5-tab>
            <ui5-tab icon="calendar" text="Tab 4">
                <ui5-label>Possimus ipsa eos impedit aut nisi repellendus recusandae, temporibus ducimus, necessitatibus tenetur facere, minima vero fugit rem reiciendis natus ratione quia numquam?</ui5-label>
            </ui5-tab>
            <ui5-tab-separator></ui5-tab-separator>
            <ui5-tab icon="action-settings" text="Tab 5">
                <ui5-label>Explicabo laboriosam ab consequuntur, qui dignissimos inventore sapiente ullam quaerat ratione libero vero, beatae laudantium! Aperiam numquam tempore, laudantium perferendis recusandae autem.</ui5-label>
            </ui5-tab>
        </ui5-tabcontainer>
    </div>
\``,...(m=(p=a.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var x,g,T;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`() => html\`
<h3>TabContainer with text only tabs</h3>
    <div class="snippet">
        <ui5-tabcontainer class="full-width" collapsed="" fixed="">
            <ui5-tab text="Home"></ui5-tab>
            <ui5-tab text="What's new" selected=""></ui5-tab>
            <ui5-tab text="Who are we"></ui5-tab>
            <ui5-tab text="About"></ui5-tab>
            <ui5-tab text="Contacts"></ui5-tab>
        </ui5-tabcontainer>
    </div>
\``,...(T=(g=i.parameters)==null?void 0:g.docs)==null?void 0:T.source}}};var h,v,f;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`() => html\`
<h3>Text only End Overflow</h3>
    <div class="snippet">
        <ui5-tabcontainer collapsed="" fixed="">
            <ui5-tab text="Tab 1">
            </ui5-tab>
            <ui5-tab text="Tab 2">
            </ui5-tab>
            <ui5-tab text="Tab 3">
            </ui5-tab>
            <ui5-tab text="Tab 4">
            </ui5-tab>
            <ui5-tab text="Tab 5">
            </ui5-tab>
            <ui5-tab text="Tab 6">
            </ui5-tab>
            <ui5-tab text="Tab 7">
            </ui5-tab>
            <ui5-tab text="Tab 8">
            </ui5-tab>
            <ui5-tab text="Tab 9">
            </ui5-tab>
            <ui5-tab text="Tab 10">
            </ui5-tab>
            <ui5-tab text="Tab 11">
            </ui5-tab>
            <ui5-tab text="Tab 12">
            </ui5-tab>
            <ui5-tab text="Tab 13" selected="">
            </ui5-tab>
            <ui5-tab text="Tab 14">
            </ui5-tab>
            <ui5-tab text="Tab 15">
            </ui5-tab>
            <ui5-tab text="Tab 16">
            </ui5-tab>
            <ui5-tab text="Tab 17">
            </ui5-tab>
            <ui5-tab text="Tab 18">
            </ui5-tab>
            <ui5-tab text="Tab 19">
            </ui5-tab>
            <ui5-tab text="Tab 20">
            </ui5-tab>
            <ui5-tab text="Tab 21">
            </ui5-tab>
            <ui5-tab text="Tab 22">
            </ui5-tab>
            <ui5-tab text="Tab 23">
            </ui5-tab>
        </ui5-tabcontainer>
    </div>
\``,...(f=(v=n.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var D,k,q;o.parameters={...o.parameters,docs:{...(D=o.parameters)==null?void 0:D.docs,source:{originalSource:`() => html\`
<h3>TabContainer with text and additional-text</h3>
    <div class="snippet">
        <ui5-tabcontainer collapsed="" fixed="">
            <ui5-tab text="Info" additional-text="3">
            </ui5-tab>
            <ui5-tab text="Attachments" additional-text="24" selected="">
            </ui5-tab>
            <ui5-tab text="Notes" additional-text="16">
            </ui5-tab>
            <ui5-tab text="People" additional-text="34">
            </ui5-tab>
        </ui5-tabcontainer>
    </div>
\``,...(q=(k=o.parameters)==null?void 0:k.docs)==null?void 0:q.source}}};var C,y,B;u.parameters={...u.parameters,docs:{...(C=u.parameters)==null?void 0:C.docs,source:{originalSource:`() => html\`
<h3>TabContainer with tabLayout="Inline"</h3>
    <div class="snippet">
        <ui5-tabcontainer tab-layout="Inline" collapsed="" fixed="">
            <ui5-tab text="Monitors" additional-text="10">
            </ui5-tab>
            <ui5-tab text="Cameras" additional-text="2" selected="">
            </ui5-tab>
            <ui5-tab text="Rooms" additional-text="16">
            </ui5-tab>
        </ui5-tabcontainer>
        <ui5-tabcontainer tab-layout="Inline" collapsed="" fixed="">
            <ui5-tab icon="laptop" text="Monitors" additional-text="10">
            </ui5-tab>
            <ui5-tab icon="video" text="Cameras" additional-text="2" selected="">
            </ui5-tab>
            <ui5-tab icon="home" text="Rooms" additional-text="16">
            </ui5-tab>
        </ui5-tabcontainer>
    </div>
\``,...(B=(y=u.parameters)==null?void 0:y.docs)==null?void 0:B.source}}};var G,S,w;s.parameters={...s.parameters,docs:{...(G=s.parameters)==null?void 0:G.docs,source:{originalSource:`() => html\`
<h3>TabContainer with nested tabs</h3>
    <div class="snippet">
        <ui5-tabcontainer collapsed="">
            <ui5-tab text="Notes">
                Notes go here ...
            </ui5-tab>
            <ui5-tab text="Products">
                Products go here ...
                <ui5-tab slot="subTabs" text="Computers">
                    Computers go here ...
                    <ui5-tab slot="subTabs" text="Laptops">
                        Laptops go here ...
                    </ui5-tab>
                    <ui5-tab slot="subTabs" text="Desktops">
                        <ui5-tab slot="subTabs" text="Work Stations">
                            Work Stations go here ...
                        </ui5-tab>
                        <ui5-tab slot="subTabs" text="Game Stations">
                            Game Stations go here ...
                        </ui5-tab>
                        Desktops go here ...
                    </ui5-tab>
                </ui5-tab>
                <ui5-tab text="Phones" slot="subTabs">
                    <ui5-tab text="Smartphones" slot="subTabs">
                        Smartphones go here ...
                    </ui5-tab>
                    <ui5-tab text="Tablets" slot="subTabs">
                        Tablets go here ...
                    </ui5-tab>
                    Phones go here ...
                </ui5-tab>
            </ui5-tab>
            <ui5-tab text="Orders">
                Orders go here ...
                <ui5-tab slot="subTabs" text="Attachments">
                    Order attachments go here ...
                </ui5-tab>
            </ui5-tab>
        </ui5-tabcontainer>
    </div>
\``,...(w=(S=s.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var E,I,L;e.parameters={...e.parameters,docs:{...(E=e.parameters)==null?void 0:E.docs,source:{originalSource:`() => html\`
<style>
        .radio-button-group {
            display: flex;
            flex-direction: column;
        }
        .design-options {
            display: flex;
            gap: 2rem;
        }
    </style>
    <h3>TabContainer Design Background</h3>
    <div class="snippet">
        <div class="design-options">
            <div role="radiogroup" id="radioGroup-headerDesign" class="radio-button-group">
                <ui5-label>Header Background</ui5-label>
                <ui5-radio-button text="Solid" checked="" name="Group1"></ui5-radio-button>
                <ui5-radio-button text="Transparent" name="Group1"></ui5-radio-button>
                <ui5-radio-button text="Translucent" name="Group1"></ui5-radio-button>
            </div>
            <div role="radiogroup2" id="radioGroup-contentDesign" class="radio-button-group">
                <ui5-label>Content Background</ui5-label>
                <ui5-radio-button text="Solid" name="Group2"></ui5-radio-button>
                <ui5-radio-button text="Transparent" checked="" name="Group2"></ui5-radio-button>
                <ui5-radio-button text="Translucent" name="Group2"></ui5-radio-button>
            </div>
        </div>
        <ui5-tabcontainer id="tabContainerBackgroundDesign" header-background-design="Solid" content-background-design="Transparent">
            <ui5-tab text="Tab 1" selected="">
                <ui5-label>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptates accusamus est quibusdam inventore ipsam?</ui5-label>
            </ui5-tab>
            <ui5-tab text="Tab 2">
                <ui5-label>Accusamus minus aperiam sunt ipsam eos quos et maxime facilis tempora neque ratione nemo laborum expedita aliquid officiis nisi, necessitatibus quasi distinctio?</ui5-label>
            </ui5-tab>
            <ui5-tab text="Tab 3">
                <ui5-label>Dolores totam perferendis numquam incidunt obcaecati, id quo at alias rem deserunt praesentium repellat ipsum commodi consequuntur veniam et ducimus animi qui nobis accusantium tenetur eveniet culpa non!</ui5-label>
            </ui5-tab>
        </ui5-tabcontainer>
        <script>
            const radioGroupHeaderDesign = document.getElementById("radioGroup-headerDesign");
            const radioGroupContentDesign = document.getElementById("radioGroup-contentDesign");
            const tabContainerBackgroundDesign = document.getElementById("tabContainerBackgroundDesign");
            radioGroupHeaderDesign.addEventListener("change", function (e) {
                tabContainerBackgroundDesign.headerBackgroundDesign = e.target.text;
            });
            radioGroupContentDesign.addEventListener("change", function (e) {
                tabContainerBackgroundDesign.contentBackgroundDesign = e.target.text;
            });
        <\/script>
    </div>
\``,...(L=(I=e.parameters)==null?void 0:I.docs)==null?void 0:L.source}}};const Z=["Template0","Template1","Template2","Template3","Template4","Template5","Template6"];export{a as Template0,i as Template1,n as Template2,o as Template3,u as Template4,s as Template5,e as Template6,Z as __namedExportsOrder,Y as default};
//# sourceMappingURL=TabContainer.stories.3bcb8cb3.js.map
