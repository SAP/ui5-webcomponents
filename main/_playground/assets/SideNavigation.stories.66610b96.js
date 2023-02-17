import{y as r}from"./lit-html.9e2e9691.js";import{D as m}from"./docs.ac7cb078.js";import"./index.854754ad.js";import"./iframe.7e023a71.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.028c5fc4.js";import"./chunk-R4NKYYJA.15989c7a.js";const c={default:{control:{type:"text"}},fixedItems:{control:{type:"text"}},header:{control:{type:"text"}}},v={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.8"};var e=Object.freeze,l=Object.defineProperty,g=(t,d)=>e(l(t,"raw",{value:e(d||t.slice())})),n;const a="ui5-side-navigation",L={title:"Fiori/SideNavigation",component:a,subcomponents:{SideNavigationItem:"ui5-side-navigation-item",SideNavigationSubItem:"ui5-side-navigation-sub-item"},parameters:{docs:{page:m({...v,component:a})}},argTypes:c},i=()=>r(n||(n=g([`
<style>
        .ui5-side-nav {
            height: 93%;
        }
        ui5-shellbar::part(root) {
            padding-left: .5rem;
        }
    </style>
    <h3>Side Navigation in Application</h3>
    <div class="snippet" style="height: 40rem;">
        <ui5-shellbar primary-title="UI5 Web Components" secondary-title="The Best Run SAP" show-co-pilot="">
            <ui5-button icon="menu" slot="startButton" id="startButton"></ui5-button>
        </ui5-shellbar>
        <ui5-side-navigation class="ui5-side-nav">
            <ui5-side-navigation-item text="Home" icon="home"></ui5-side-navigation-item>
            <ui5-side-navigation-item text="People" expanded="" icon="group">
                <ui5-side-navigation-sub-item text="From My Team"></ui5-side-navigation-sub-item>
                <ui5-side-navigation-sub-item text="From Other Teams"></ui5-side-navigation-sub-item>
            </ui5-side-navigation-item>
            <ui5-side-navigation-item text="Locations" icon="locate-me" selected=""></ui5-side-navigation-item>
            <ui5-side-navigation-item text="Events" icon="calendar">
                <ui5-side-navigation-sub-item text="Local"></ui5-side-navigation-sub-item>
                <ui5-side-navigation-sub-item text="Others"></ui5-side-navigation-sub-item>
            </ui5-side-navigation-item>
            <ui5-side-navigation-item slot="fixedItems" text="Useful Links" icon="chain-link"></ui5-side-navigation-item>
            <ui5-side-navigation-item slot="fixedItems" text="History" icon="history"></ui5-side-navigation-item>
        </ui5-side-navigation>
        <script>
            var sideNavigation = document.querySelector("ui5-side-navigation");
            document.querySelector("#startButton").addEventListener("click", function(event) {
                sideNavigation.collapsed = !sideNavigation.collapsed;
            });
        <\/script>
    </div>
`])));i.parameters={docs:{story:{inline:!1}}};var o,s,u;i.parameters={...i.parameters,docs:{...(o=i.parameters)==null?void 0:o.docs,source:{originalSource:`() => html\`
<style>
        .ui5-side-nav {
            height: 93%;
        }
        ui5-shellbar::part(root) {
            padding-left: .5rem;
        }
    </style>
    <h3>Side Navigation in Application</h3>
    <div class="snippet" style="height: 40rem;">
        <ui5-shellbar primary-title="UI5 Web Components" secondary-title="The Best Run SAP" show-co-pilot="">
            <ui5-button icon="menu" slot="startButton" id="startButton"></ui5-button>
        </ui5-shellbar>
        <ui5-side-navigation class="ui5-side-nav">
            <ui5-side-navigation-item text="Home" icon="home"></ui5-side-navigation-item>
            <ui5-side-navigation-item text="People" expanded="" icon="group">
                <ui5-side-navigation-sub-item text="From My Team"></ui5-side-navigation-sub-item>
                <ui5-side-navigation-sub-item text="From Other Teams"></ui5-side-navigation-sub-item>
            </ui5-side-navigation-item>
            <ui5-side-navigation-item text="Locations" icon="locate-me" selected=""></ui5-side-navigation-item>
            <ui5-side-navigation-item text="Events" icon="calendar">
                <ui5-side-navigation-sub-item text="Local"></ui5-side-navigation-sub-item>
                <ui5-side-navigation-sub-item text="Others"></ui5-side-navigation-sub-item>
            </ui5-side-navigation-item>
            <ui5-side-navigation-item slot="fixedItems" text="Useful Links" icon="chain-link"></ui5-side-navigation-item>
            <ui5-side-navigation-item slot="fixedItems" text="History" icon="history"></ui5-side-navigation-item>
        </ui5-side-navigation>
        <script>
            var sideNavigation = document.querySelector("ui5-side-navigation");
            document.querySelector("#startButton").addEventListener("click", function(event) {
                sideNavigation.collapsed = !sideNavigation.collapsed;
            });
        <\/script>
    </div>
\``,...(u=(s=i.parameters)==null?void 0:s.docs)==null?void 0:u.source}}};const O=["Template0"];export{i as Template0,O as __namedExportsOrder,L as default};
//# sourceMappingURL=SideNavigation.stories.66610b96.js.map
