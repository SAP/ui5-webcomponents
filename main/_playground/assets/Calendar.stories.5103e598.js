import{y as e}from"./lit-html.9e2e9691.js";import{D as W}from"./docs.ac7cb078.js";import"./index.854754ad.js";import"./iframe.7e023a71.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.028c5fc4.js";import"./chunk-R4NKYYJA.15989c7a.js";const E={selectionMode:{control:"select",options:["Multiple","Range","Single"]},default:{control:{type:"text"}},primaryCalendarType:{control:"select",options:["Buddhist","Gregorian","Islamic","Japanese","Persian"]},secondaryCalendarType:{control:"select",options:["Buddhist","Gregorian","Islamic","Japanese","Persian"]}},O={package:"@ui5/webcomponents",since:"1.0.0-rc.11"},p="ui5-calendar",$={title:"Main/Calendar",component:p,subcomponents:{CalendarDate:"ui5-date"},parameters:{docs:{page:W({...O,component:p})}},argTypes:E},a=()=>e`
<h3>Basic Calendar</h3>
    <div class="snippet">
        <div class="datepicker-width">
            <ui5-calendar></ui5-calendar>
        </div>
    </div>
`,i=()=>e`
<h3>Calendar with Minimum and Maximum Date &amp; Format Pattern</h3>
    <div class="snippet">
        <div class="datepicker-width">
            <ui5-calendar min-date="7/7/2020" max-date="20/10/2020" format-pattern="dd/MM/yyyy"></ui5-calendar>
        </div>
    </div>
`,r=()=>e`
<h3>Calendar with Hidden Week Numbers</h3>
    <div class="snippet">
        <div class="datepicker-width">
            <ui5-calendar hide-week-numbers=""></ui5-calendar>
        </div>
    </div>
`,d=()=>e`
<h3>Calendar with Selection Mode Multiple</h3>
    <div class="snippet">
        <div class="datepicker-width">
            <ui5-calendar selection-mode="Multiple"></ui5-calendar>
        </div>
    </div>
`,s=()=>e`
<h3>Calendar with Selection Mode Range</h3>
    <div class="snippet">
        <div class="datepicker-width">
            <ui5-calendar selection-mode="Range"></ui5-calendar>
        </div>
    </div>
`,n=()=>e`
<h3>Japanese Calendar</h3>
    <div class="snippet">
        <div class="datepicker-width">
            <ui5-calendar primary-calendar-type="Japanese"></ui5-calendar>
        </div>
    </div>
`,t=()=>e`
<h3>Islamic Calendar</h3>
    <div class="snippet">
        <div class="datepicker-width">
            <ui5-calendar primary-calendar-type="Islamic"></ui5-calendar>
        </div>
    </div>
`,c=()=>e`
<h3>Buddhist Calendar</h3>
    <div class="snippet">
        <div class="datepicker-width">
            <ui5-calendar primary-calendar-type="Buddhist"></ui5-calendar>
        </div>
    </div>
`,l=()=>e`
<h3>Persian Calendar</h3>
    <div class="snippet">
        <div class="datepicker-width">
            <ui5-calendar primary-calendar-type="Persian"></ui5-calendar>
        </div>
    </div>
`;var o,m,u;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`() => html\`
<h3>Basic Calendar</h3>
    <div class="snippet">
        <div class="datepicker-width">
            <ui5-calendar></ui5-calendar>
        </div>
    </div>
\``,...(u=(m=a.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var h,v,y;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`() => html\`
<h3>Calendar with Minimum and Maximum Date &amp; Format Pattern</h3>
    <div class="snippet">
        <div class="datepicker-width">
            <ui5-calendar min-date="7/7/2020" max-date="20/10/2020" format-pattern="dd/MM/yyyy"></ui5-calendar>
        </div>
    </div>
\``,...(y=(v=i.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var w,k,C;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`() => html\`
<h3>Calendar with Hidden Week Numbers</h3>
    <div class="snippet">
        <div class="datepicker-width">
            <ui5-calendar hide-week-numbers=""></ui5-calendar>
        </div>
    </div>
\``,...(C=(k=r.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};var g,T,M;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`() => html\`
<h3>Calendar with Selection Mode Multiple</h3>
    <div class="snippet">
        <div class="datepicker-width">
            <ui5-calendar selection-mode="Multiple"></ui5-calendar>
        </div>
    </div>
\``,...(M=(T=d.parameters)==null?void 0:T.docs)==null?void 0:M.source}}};var S,P,B;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`() => html\`
<h3>Calendar with Selection Mode Range</h3>
    <div class="snippet">
        <div class="datepicker-width">
            <ui5-calendar selection-mode="Range"></ui5-calendar>
        </div>
    </div>
\``,...(B=(P=s.parameters)==null?void 0:P.docs)==null?void 0:B.source}}};var f,x,I;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`() => html\`
<h3>Japanese Calendar</h3>
    <div class="snippet">
        <div class="datepicker-width">
            <ui5-calendar primary-calendar-type="Japanese"></ui5-calendar>
        </div>
    </div>
\``,...(I=(x=n.parameters)==null?void 0:x.docs)==null?void 0:I.source}}};var b,J,D;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`() => html\`
<h3>Islamic Calendar</h3>
    <div class="snippet">
        <div class="datepicker-width">
            <ui5-calendar primary-calendar-type="Islamic"></ui5-calendar>
        </div>
    </div>
\``,...(D=(J=t.parameters)==null?void 0:J.docs)==null?void 0:D.source}}};var R,_,F;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`() => html\`
<h3>Buddhist Calendar</h3>
    <div class="snippet">
        <div class="datepicker-width">
            <ui5-calendar primary-calendar-type="Buddhist"></ui5-calendar>
        </div>
    </div>
\``,...(F=(_=c.parameters)==null?void 0:_.docs)==null?void 0:F.source}}};var G,H,N;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`() => html\`
<h3>Persian Calendar</h3>
    <div class="snippet">
        <div class="datepicker-width">
            <ui5-calendar primary-calendar-type="Persian"></ui5-calendar>
        </div>
    </div>
\``,...(N=(H=l.parameters)==null?void 0:H.docs)==null?void 0:N.source}}};const ee=["Template0","Template1","Template2","Template3","Template4","Template5","Template6","Template7","Template8"];export{a as Template0,i as Template1,r as Template2,d as Template3,s as Template4,n as Template5,t as Template6,c as Template7,l as Template8,ee as __namedExportsOrder,$ as default};
//# sourceMappingURL=Calendar.stories.5103e598.js.map
