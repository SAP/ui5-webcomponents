import{x as p}from"./lit-element-c5a2b594.js";import{l as a}from"./if-defined-c29cffe1.js";import{o as s}from"./unsafe-html-0ddd83da.js";import{P as c}from"./PageBackgroundDesign-7e89cd25.js";const g={backgroundDesign:{control:"select",options:["List","Solid","Transparent"]},header:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},default:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},footer:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}}},S={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.12",tagName:"ui5-page"},v={title:"Fiori/Page",component:"Page",argTypes:g},d=e=>p`
<ui5-page
    style="height: 500px"
    background-design="${a(e.backgroundDesign)}"
    ?disable-scrolling="${a(e.disableScrolling)}"
    ?floating-footer="${a(e.floatingFooter)}"
    ?hide-footer="${a(e.hideFooter)}">
    ${s(e.header)}
    ${s(e.default)}
    ${s(e.footer)}
</ui5-page>`,i=d.bind({});i.args={backgroundDesign:c.Solid,default:`
    <div>
        <p class="content-paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis massa sed elementum tempus egestas sed sed risus pretium. Eget nullam non nisi est sit amet facilisis. Imperdiet dui accumsan sit amet nulla facilisi morbi. Sem viverra aliquet eget sit amet tellus cras adipiscing. Faucibus purus in massa tempor nec. Egestas quis ipsum suspendisse ultrices gravida dictum. Amet facilisis magna etiam tempor. Sapien et ligula ullamcorper malesuada proin libero nunc consequat. Ac orci phasellus egestas tellus. Quis imperdiet massa tincidunt nunc.
        </p>
        <p class="content-paragraph">
            Amet consectetur adipiscing elit duis tristique. Tortor condimentum lacinia quis vel eros. Elit sed vulputate mi sit amet mauris commodo quis imperdiet. Sed nisi lacus sed viverra tellus in hac habitasse. Praesent tristique magna sit amet purus gravida quis blandit. Magnis dis parturient montes nascetur ridiculus. Sit amet nulla facilisi morbi tempus iaculis urna id. Senectus et netus et malesuada fames. Faucibus ornare suspendisse sed nisi lacus sed. Facilisis volutpat est velit egestas dui id ornare arcu odio. In tellus integer feugiat scelerisque. Eu turpis egestas pretium aenean pharetra magna. Integer enim neque volutpat ac tincidunt vitae semper quis lectus.
        </p>
        <p class="content-paragraph">
            Sodales ut eu sem integer. Arcu vitae elementum curabitur vitae nunc sed velit dignissim. Tellus rutrum tellus pellentesque eu tincidunt tortor. Etiam tempor orci eu lobortis elementum nibh. Velit laoreet id donec ultrices tincidunt arcu non sodales. Scelerisque felis imperdiet proin fermentum leo vel orci porta non. Odio ut sem nulla pharetra diam sit amet nisl. Semper auctor neque vitae tempus quam pellentesque nec nam aliquam. Donec enim diam vulputate ut pharetra sit. Posuere ac ut consequat semper viverra nam libero. Viverra mauris in aliquam sem fringilla ut morbi tincidunt augue. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices.
        </p>
    </div>`,header:`
    <ui5-bar design="Header" slot="header">
        <ui5-button design="Transparent" icon="home" tooltip="Go home" slot="startContent"></ui5-button>
        <ui5-label slot="startContent">Title</ui5-label>
        <ui5-button design="Transparent" icon="action-settings" tooltip="Go to settings" slot="endContent"></ui5-button>
    </ui5-bar>`,footer:`
    <div slot="footer">
        <ui5-bar>
            <ui5-button design="Positive" slot="endContent">Agree</ui5-button>
            <ui5-button design="Negative" slot="endContent">Decline</ui5-button>
            <ui5-button design="Transparent" slot="endContent">Cancel</ui5-button>
        </ui5-bar>
    </div>`};const t=d.bind({});t.args={backgroundDesign:c.Transparent,floatingFooter:!0,default:`
    <div>
        <p class="content-paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis massa sed elementum tempus egestas sed sed risus pretium. Eget nullam non nisi est sit amet facilisis. Imperdiet dui accumsan sit amet nulla facilisi morbi. Sem viverra aliquet eget sit amet tellus cras adipiscing. Faucibus purus in massa tempor nec. Egestas quis ipsum suspendisse ultrices gravida dictum. Amet facilisis magna etiam tempor. Sapien et ligula ullamcorper malesuada proin libero nunc consequat. Ac orci phasellus egestas tellus. Quis imperdiet massa tincidunt nunc. Mollis nunc sed id semper risus in hendrerit gravida rutrum.
        </p>
        <p class="content-paragraph">
            Amet consectetur adipiscing elit duis tristique. Tortor condimentum lacinia quis vel eros. Elit sed vulputate mi sit amet mauris commodo quis imperdiet. Sed nisi lacus sed viverra tellus in hac habitasse. Praesent tristique magna sit amet purus gravida quis blandit. Magnis dis parturient montes nascetur ridiculus. Sit amet nulla facilisi morbi tempus iaculis urna id. Senectus et netus et malesuada fames. Faucibus ornare suspendisse sed nisi lacus sed. Facilisis volutpat est velit egestas dui id ornare arcu odio. In tellus integer feugiat scelerisque. Eu turpis egestas pretium aenean pharetra magna. Integer enim neque volutpat ac tincidunt vitae semper quis lectus. Euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Ante in nibh mauris cursus mattis. Sagittis vitae et leo duis.
        </p>
        <p class="content-paragraph">
            Sodales ut eu sem integer. Arcu vitae elementum curabitur vitae nunc sed velit dignissim. Tellus rutrum tellus pellentesque eu tincidunt tortor. Etiam tempor orci eu lobortis elementum nibh. Velit laoreet id donec ultrices tincidunt arcu non sodales. Scelerisque felis imperdiet proin fermentum leo vel orci porta non. Odio ut sem nulla pharetra diam sit amet nisl. Semper auctor neque vitae tempus quam pellentesque nec nam aliquam. Donec enim diam vulputate ut pharetra sit. Posuere ac ut consequat semper viverra nam libero. Viverra mauris in aliquam sem fringilla ut morbi tincidunt augue. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. Ac placerat vestibulum lectus mauris ultrices.
        </p>
        <p class="content-paragraph">
            Consequat semper viverra nam libero justo laoreet. In mollis nunc sed id. Eget egestas purus viverra accumsan in. Diam vulputate ut pharetra sit amet aliquam. Arcu bibendum at varius vel pharetra vel turpis nunc. Lacus sed turpis tincidunt id aliquet risus feugiat. Tempus urna et pharetra pharetra massa massa. Volutpat maecenas volutpat blandit aliquam etiam. Viverra suspendisse potenti nullam ac. Nisl purus in mollis nunc sed id. Nibh mauris cursus mattis molestie a iaculis at erat. Ultricies leo integer malesuada nunc vel risus commodo viverra maecenas. Tempor id eu nisl nunc mi ipsum faucibus vitae. Eget lorem dolor sed viverra. Pellentesque habitant morbi tristique senectus et. Et tortor at risus viverra adipiscing at in tellus.
        </p>
        <p class="content-paragraph">
            Venenatis lectus magna fringilla urna. Sed cras ornare arcu dui vivamus arcu felis. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Aliquam purus sit amet luctus venenatis lectus magna fringilla urna. Arcu dictum varius duis at consectetur lorem donec. Tortor posuere ac ut consequat semper viverra nam. Vulputate mi sit amet mauris commodo quis. Convallis convallis tellus id interdum velit. Ac placerat vestibulum lectus mauris ultrices eros. Nulla at volutpat diam ut venenatis tellus.
        </p>
        <p class="content-paragraph">
            Facilisi nullam vehicula ipsum a arcu cursus vitae. Massa sapien faucibus et molestie ac. Viverra ipsum nunc aliquet bibendum enim facilisis gravida. Sit amet massa vitae tortor condimentum lacinia. Sit amet risus nullam eget felis. Ipsum a arcu cursus vitae congue mauris rhoncus aenean vel. Consequat mauris nunc congue nisi vitae suscipit tellus mauris a. Tellus at urna condimentum mattis pellentesque id nibh tortor. Sagittis eu volutpat odio facilisis mauris sit amet massa vitae. Magna etiam tempor orci eu lobortis elementum nibh tellus. Volutpat ac tincidunt vitae semper quis. Diam vel quam elementum pulvinar etiam non quam lacus suspendisse. Id leo in vitae turpis massa sed elementum tempus. Convallis tellus id interdum velit laoreet id donec ultrices. Ac turpis egestas maecenas pharetra convallis posuere morbi leo. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Amet cursus sit amet dictum sit amet justo donec. Habitant morbi tristique senectus et netus.
        </p>
    </div>`,header:`
    <ui5-bar design="Header" slot="header">
        <ui5-button design="Transparent" icon="home" tooltip="Go home" slot="startContent"></ui5-button>
        <ui5-label slot="startContent">Title</ui5-label>
        <ui5-button design="Transparent" icon="action-settings" tooltip="Go to settings" slot="endContent"></ui5-button>
    </ui5-bar>`,footer:`
    <div slot="footer">
        <ui5-bar design="FloatingFooter">
            <ui5-button design="Positive" slot="endContent">Agree</ui5-button>
            <ui5-button design="Negative" slot="endContent">Decline</ui5-button>
            <ui5-button design="Transparent" slot="endContent">Cancel</ui5-button>
        </ui5-bar>
    </div>`};var n,u,r;i.parameters={...i.parameters,docs:{...(n=i.parameters)==null?void 0:n.docs,source:{originalSource:`args => {
  return html\`
<ui5-page
    style="height: 500px"
    background-design="\${ifDefined(args.backgroundDesign)}"
    ?disable-scrolling="\${ifDefined(args.disableScrolling)}"
    ?floating-footer="\${ifDefined(args.floatingFooter)}"
    ?hide-footer="\${ifDefined(args.hideFooter)}">
    \${unsafeHTML(args.header)}
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.footer)}
</ui5-page>\`;
}`,...(r=(u=i.parameters)==null?void 0:u.docs)==null?void 0:r.source}}};var o,l,m;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`args => {
  return html\`
<ui5-page
    style="height: 500px"
    background-design="\${ifDefined(args.backgroundDesign)}"
    ?disable-scrolling="\${ifDefined(args.disableScrolling)}"
    ?floating-footer="\${ifDefined(args.floatingFooter)}"
    ?hide-footer="\${ifDefined(args.hideFooter)}">
    \${unsafeHTML(args.header)}
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.footer)}
</ui5-page>\`;
}`,...(m=(l=t.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const b=["Basic","FloatingFooter"],A=Object.freeze(Object.defineProperty({__proto__:null,Basic:i,FloatingFooter:t,__namedExportsOrder:b,default:v},Symbol.toStringTag,{value:"Module"}));export{A as C,S as c};
