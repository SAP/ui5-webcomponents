import{y as t}from"./lit-html.9e2e9691.js";import{D as g}from"./docs.9716d2dc.js";import"./index.766d49cf.js";import"./iframe.8d816ebf.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.2cfeaebe.js";import"./chunk-R4NKYYJA.15989c7a.js";const h={arrowsPlacement:{control:"select",options:["Content","Navigation"]},pageIndicatorStyle:{control:"select",options:["Default","Numeric"]},default:{control:{type:"text"}},navigateTo:{table:{category:"Methods"}}},v={package:"@ui5/webcomponents",since:"1.0.0-rc.6"},s="ui5-carousel",j={title:"Main/Carousel",component:s,parameters:{docs:{page:g({...v,component:s})}},argTypes:h},e=()=>t`
<h3>Carousel With Single Item per Page</h3>
    <div class="snippet">
        <ui5-carousel>
            <img src="../assets/images/sample1.jpg" alt="Landscape 1">
            <img src="../assets/images/sample2.jpg" alt="Landscape 2">
            <img src="../assets/images/sample3.jpg" alt="Bulb">
        </ui5-carousel>
    </div>
`,a=()=>t`
<h3>Carousel With Multiple Items per Page</h3>
    <div class="snippet">
        <ui5-carousel items-per-page-s="1" items-per-page-m="2" items-per-page-l="2">
            <ui5-card class="medium">
                <ui5-card-header slot="header" title-text="Activities" subtitle-text="For Today"></ui5-card-header>
                <ui5-timeline>
                    <ui5-timeline-item id="test-item" title-text="called" timestamp="1487583000000" icon="phone" name="John Smith" name-clickable=""></ui5-timeline-item>
                    <ui5-timeline-item title-text="Weekly Sync - CP Design" timestamp="1517349600000" icon="calendar">
                        MR SOF02 2.43
                    </ui5-timeline-item>
                    <ui5-timeline-item title-text="Video Converence Call - UI5" timestamp="1485813600000" icon="calendar">
                        Online meeting
                    </ui5-timeline-item>
                </ui5-timeline>
            </ui5-card>
            <ui5-card class="small">
                <ui5-card-header slot="header" title-text="David Willams" subtitle-text="Sales Manager">
                    <img src="../assets/images/avatars/man_avatar_1.png" slot="avatar">
                </ui5-card-header>
                <ui5-list separators="Inner" class="content-padding">
                    <ui5-li icon="competitor" icon-end="">Personal Development</ui5-li>
                    <ui5-li icon="wallet" icon-end="">Finance</ui5-li>
                    <ui5-li icon="collaborate" icon-end="">Communications Skills</ui5-li>
                </ui5-list>
            </ui5-card>
            <ui5-card class="medium">
                <ui5-card-header slot="header" title-text="Team Dolphins" subtitle-text="Direct Reports" status="1 of 2">
                    <ui5-icon name="group" slot="avatar"></ui5-icon>
                </ui5-card-header>
                <div class="card-content">
                    <ui5-list separators="None" class="card-content-child" style="width: 100%">
                        <ui5-li image="../assets/images/avatars/man_avatar_1.png" description="User Researcher">Alain Chevalier</ui5-li>
                        <ui5-li image="../assets/images/avatars/woman_avatar_1.png" description="Artist">Monique Legrand</ui5-li>
                        <ui5-li image="../assets/images/avatars/woman_avatar_2.png" description="UX Specialist">Michael Adams</ui5-li>
                    </ui5-list>
                </div>
            </ui5-card>
            <ui5-card class="medium">
                <ui5-card-header slot="header" title-text="Team Bears" subtitle-text="Direct Reports" interactive="" status="2 of 2">
                        <ui5-icon name="group" slot="avatar"></ui5-icon>
                </ui5-card-header>
                <div class="card-content">
                    <ui5-list separators="None" class="card-content-child" style="width: 100%">
                        <ui5-li image="../assets/images/avatars/man_avatar_2.png" description="Software Architect">Richard Wilson</ui5-li>
                        <ui5-li image="../assets/images/avatars/woman_avatar_3.png" description="Visual Designer">Elena Petrova</ui5-li>
                        <ui5-li image="../assets/images/avatars/man_avatar_3.png" description="Quality Specialist">John Miller</ui5-li>
                    </ui5-list>
                </div>
            </ui5-card>
        </ui5-carousel>
    </div>
`,i=()=>t`
<h3>Carousel With Arrow Placement and Cyclic</h3>
    <div class="snippet">
        <ui5-carousel arrows-placement="Navigation" cyclic="">
            <img src="../assets/images/sample1.jpg" alt="Landscape 1">
            <img src="../assets/images/sample2.jpg" alt="Landscape 2">
            <img src="../assets/images/sample3.jpg" alt="Bulb">
        </ui5-carousel>
    </div>
`;var n,r,l;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`() => html\`
<h3>Carousel With Single Item per Page</h3>
    <div class="snippet">
        <ui5-carousel>
            <img src="../assets/images/sample1.jpg" alt="Landscape 1">
            <img src="../assets/images/sample2.jpg" alt="Landscape 2">
            <img src="../assets/images/sample3.jpg" alt="Bulb">
        </ui5-carousel>
    </div>
\``,...(l=(r=e.parameters)==null?void 0:r.docs)==null?void 0:l.source}}};var c,o,m;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`() => html\`
<h3>Carousel With Multiple Items per Page</h3>
    <div class="snippet">
        <ui5-carousel items-per-page-s="1" items-per-page-m="2" items-per-page-l="2">
            <ui5-card class="medium">
                <ui5-card-header slot="header" title-text="Activities" subtitle-text="For Today"></ui5-card-header>
                <ui5-timeline>
                    <ui5-timeline-item id="test-item" title-text="called" timestamp="1487583000000" icon="phone" name="John Smith" name-clickable=""></ui5-timeline-item>
                    <ui5-timeline-item title-text="Weekly Sync - CP Design" timestamp="1517349600000" icon="calendar">
                        MR SOF02 2.43
                    </ui5-timeline-item>
                    <ui5-timeline-item title-text="Video Converence Call - UI5" timestamp="1485813600000" icon="calendar">
                        Online meeting
                    </ui5-timeline-item>
                </ui5-timeline>
            </ui5-card>
            <ui5-card class="small">
                <ui5-card-header slot="header" title-text="David Willams" subtitle-text="Sales Manager">
                    <img src="../assets/images/avatars/man_avatar_1.png" slot="avatar">
                </ui5-card-header>
                <ui5-list separators="Inner" class="content-padding">
                    <ui5-li icon="competitor" icon-end="">Personal Development</ui5-li>
                    <ui5-li icon="wallet" icon-end="">Finance</ui5-li>
                    <ui5-li icon="collaborate" icon-end="">Communications Skills</ui5-li>
                </ui5-list>
            </ui5-card>
            <ui5-card class="medium">
                <ui5-card-header slot="header" title-text="Team Dolphins" subtitle-text="Direct Reports" status="1 of 2">
                    <ui5-icon name="group" slot="avatar"></ui5-icon>
                </ui5-card-header>
                <div class="card-content">
                    <ui5-list separators="None" class="card-content-child" style="width: 100%">
                        <ui5-li image="../assets/images/avatars/man_avatar_1.png" description="User Researcher">Alain Chevalier</ui5-li>
                        <ui5-li image="../assets/images/avatars/woman_avatar_1.png" description="Artist">Monique Legrand</ui5-li>
                        <ui5-li image="../assets/images/avatars/woman_avatar_2.png" description="UX Specialist">Michael Adams</ui5-li>
                    </ui5-list>
                </div>
            </ui5-card>
            <ui5-card class="medium">
                <ui5-card-header slot="header" title-text="Team Bears" subtitle-text="Direct Reports" interactive="" status="2 of 2">
                        <ui5-icon name="group" slot="avatar"></ui5-icon>
                </ui5-card-header>
                <div class="card-content">
                    <ui5-list separators="None" class="card-content-child" style="width: 100%">
                        <ui5-li image="../assets/images/avatars/man_avatar_2.png" description="Software Architect">Richard Wilson</ui5-li>
                        <ui5-li image="../assets/images/avatars/woman_avatar_3.png" description="Visual Designer">Elena Petrova</ui5-li>
                        <ui5-li image="../assets/images/avatars/man_avatar_3.png" description="Quality Specialist">John Miller</ui5-li>
                    </ui5-list>
                </div>
            </ui5-card>
        </ui5-carousel>
    </div>
\``,...(m=(o=a.parameters)==null?void 0:o.docs)==null?void 0:m.source}}};var u,p,d;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`() => html\`
<h3>Carousel With Arrow Placement and Cyclic</h3>
    <div class="snippet">
        <ui5-carousel arrows-placement="Navigation" cyclic="">
            <img src="../assets/images/sample1.jpg" alt="Landscape 1">
            <img src="../assets/images/sample2.jpg" alt="Landscape 2">
            <img src="../assets/images/sample3.jpg" alt="Bulb">
        </ui5-carousel>
    </div>
\``,...(d=(p=i.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const A=["Template0","Template1","Template2"];export{e as Template0,a as Template1,i as Template2,A as __namedExportsOrder,j as default};
//# sourceMappingURL=Carousel.stories.94d288fc.js.map
