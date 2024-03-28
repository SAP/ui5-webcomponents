import{x as m}from"./lit-element-c5a2b594.js";import{o as i}from"./unsafe-html-0ddd83da.js";import{l as a}from"./if-defined-c29cffe1.js";const o={layout:{control:"select",options:["Square","Wide"]},default:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},thumbnail:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}}},f={package:"@ui5/webcomponents-fiori",since:"1.1.0",tagName:"ui5-media-gallery-item",showDefaultStoryOnly:!0},n=e=>m`
    <style>
        ui5-media-gallery-item:not(:defined) {
            visibility: hidden;
        }

        @media (min-width: 600px) {
            ui5-media-gallery {
                height: 50rem;
            }
        }
    </style>
    ${e()}
`,d={title:"Fiori/Media Gallery/Media Gallery Item",component:"MediaGalleryItem",decorators:[n],argTypes:o},u=e=>m` <ui5-media-gallery>
        <ui5-media-gallery-item
            ?selected="${a(e.selected)}"
            ?disabled="${a(e.disabled)}"
            layout="${a(e.layout)}"
        >
            ${i(e.default)}
            ${i(e.thumbnail)}
        </ui5-media-gallery-item>
        <ui5-media-gallery-item>
            <img src="../assets/images/HT-1010.jpg" />
        </ui5-media-gallery-item>
    </ui5-media-gallery>`,t=u.bind({});t.tags=["_hidden_"];t.args={default:'<img src="../assets/images/HT-1000.jpg" />',selected:!0};var l,r,s;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`args => {
  return html\` <ui5-media-gallery>
        <ui5-media-gallery-item
            ?selected="\${ifDefined(args.selected)}"
            ?disabled="\${ifDefined(args.disabled)}"
            layout="\${ifDefined(args.layout)}"
        >
            \${unsafeHTML(args.default)}
            \${unsafeHTML(args.thumbnail)}
        </ui5-media-gallery-item>
        <ui5-media-gallery-item>
            <img src="../assets/images/HT-1010.jpg" />
        </ui5-media-gallery-item>
    </ui5-media-gallery>\`;
}`,...(s=(r=t.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};const y=["Basic"],b=Object.freeze(Object.defineProperty({__proto__:null,Basic:t,__namedExportsOrder:y,default:d},Symbol.toStringTag,{value:"Module"}));export{b as C,f as c};
