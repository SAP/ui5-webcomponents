"use strict";(self.webpackChunk_ui5_webcomponents_website=self.webpackChunk_ui5_webcomponents_website||[]).push([[1182],{24813:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>O,contentTitle:()=>U,default:()=>G,frontMatter:()=>X,metadata:()=>Y,toc:()=>q});var i=t(31085),s=t(71184);const r='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor)">\n    \x3c!-- playground-fold-end --\x3e\n\n    <ui5-avatar initials="FJ"></ui5-avatar>\n\n    \x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n',o='import "@ui5/webcomponents/dist/Avatar.js";\n';function a(e){const{Editor:n}={...(0,s.R)(),...e.components};return n||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,i.jsx)(n,{html:r,js:o})}function d(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}const c='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor)">\n    \x3c!-- playground-fold-end --\x3e\n\n    <ui5-avatar id="avt" interactive initials="FJ"></ui5-avatar>\n\n    <ui5-label id="lbl"></ui5-label>\n    \x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n',l='import "@ui5/webcomponents/dist/Label.js";\nimport "@ui5/webcomponents/dist/Avatar.js";\n\nconst avatar = document.getElementById("avt");\nconst label = document.getElementById("lbl");\nlet counter = 0;\n\navatar.addEventListener("click", (e) => {\n\tlabel.innerHTML = `Avatar clicked! :: ${++counter}`;\n})\n';function h(e){const{Editor:n}={...(0,s.R)(),...e.components};return n||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,i.jsx)(n,{html:c,js:l})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}const x='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor)">\n    \x3c!-- playground-fold-end --\x3e\n\n    <ui5-avatar initials="AB">\n        <ui5-tag slot="badge" wrapping-type="None">\n            <ui5-icon slot="icon" name="accelerated"></ui5-icon>\n        </ui5-tag>\n    </ui5-avatar>\n\n    \x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n',j='import "@ui5/webcomponents/dist/Tag.js";\nimport "@ui5/webcomponents/dist/Icon.js";\nimport "@ui5/webcomponents-icons/dist/accelerated.js";\nimport "@ui5/webcomponents/dist/Avatar.js";\n';function u(e){const{Editor:n}={...(0,s.R)(),...e.components};return n||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,i.jsx)(n,{html:x,js:j})}function m(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}const v='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor)">\n    \x3c!-- playground-fold-end --\x3e\n   \n    <ui5-avatar color-scheme="Accent1"></ui5-avatar>\n    <ui5-avatar color-scheme="Accent2"></ui5-avatar>\n    <ui5-avatar color-scheme="Accent3"></ui5-avatar>\n    <ui5-avatar color-scheme="Accent4"></ui5-avatar>\n    <ui5-avatar color-scheme="Accent5"></ui5-avatar>\n    <ui5-avatar color-scheme="Accent7"></ui5-avatar>\n    <ui5-avatar color-scheme="Accent8"></ui5-avatar>\n    <ui5-avatar color-scheme="Accent9"></ui5-avatar>\n    <ui5-avatar color-scheme="Accent10"></ui5-avatar>\n    <ui5-avatar color-scheme="Placeholder"></ui5-avatar>\n   \n    \x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n',b='import "@ui5/webcomponents/dist/Avatar.js";\n';function f(e){const{Editor:n}={...(0,s.R)(),...e.components};return n||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,i.jsx)(n,{html:v,js:b})}function g(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(f,{...e})}):f(e)}const y='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor)">\n    \x3c!-- playground-fold-end --\x3e\n\n    <ui5-avatar initials="XS" size="XS"></ui5-avatar>\n    <ui5-avatar initials="S" size="S"></ui5-avatar>\n    <ui5-avatar initials="M" size="M"></ui5-avatar>\n    <ui5-avatar initials="L" size="L"></ui5-avatar>\n    <ui5-avatar initials="XL" size="XL"></ui5-avatar>\n    \x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n',w='import "@ui5/webcomponents/dist/Avatar.js";\n';function S(e){const{Editor:n}={...(0,s.R)(),...e.components};return n||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,i.jsx)(n,{html:y,js:w})}function A(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(S,{...e})}):S(e)}const k='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor)">\n    \x3c!-- playground-fold-end --\x3e\n   \n    <ui5-avatar\n        shape="Circle"\n        size="M"\n        initials="CI"\n    >\n    </ui5-avatar>\n\n    <ui5-avatar\n        shape="Square"\n        size="M"\n        initials="Sq"\n    >\n    </ui5-avatar>\n   \n    \x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n',E='import "@ui5/webcomponents/dist/Avatar.js";\n';function T(e){const{Editor:n}={...(0,s.R)(),...e.components};return n||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,i.jsx)(n,{html:k,js:E})}function D(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(T,{...e})}):T(e)}const C='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor)">\n    \x3c!-- playground-fold-end --\x3e\n   \n    <ui5-avatar fallback-icon="employee" size="XS">\n        <img alt="Woman" src="../assets/images/avatars/woman_avatar_1.png" />\n    </ui5-avatar>\n    <ui5-avatar fallback-icon="employee" size="S">\n        <img alt="Woman" src="../assets/images/avatars/woman_avatar_1.png" />\n    </ui5-avatar>\n    <ui5-avatar fallback-icon="employee" size="M">\n        <img alt="Woman" src="../assets/images/avatars/woman_avatar_1.png" />\n    </ui5-avatar>\n    <ui5-avatar fallback-icon="employee" size="L">\n        <img alt="Woman" src="../assets/images/avatars/woman_avatar_1.png" />\n    </ui5-avatar>\n    <ui5-avatar fallback-icon="employee" size="XL">\n        <img alt="Woman" src="../assets/images/avatars/woman_avatar_1.png" />\n    </ui5-avatar>\n   \n    \x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n',z='import "@ui5/webcomponents/dist/Avatar.js";\n';function I(e){const{Editor:n}={...(0,s.R)(),...e.components};return n||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,i.jsx)(n,{html:C,js:z})}function _(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(I,{...e})}):I(e)}const R='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor)">\n    \x3c!-- playground-fold-end --\x3e\n   \n    <ui5-avatar icon="filter" size="XS"></ui5-avatar>\n    <ui5-avatar icon="employee" size="S"></ui5-avatar>\n    <ui5-avatar icon="product" size="M"></ui5-avatar>\n    <ui5-avatar icon="supplier" size="L"></ui5-avatar>\n    <ui5-avatar icon="shipping-status" size="XL"></ui5-avatar>\n   \n    \x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n',L='import "@ui5/webcomponents/dist/Avatar.js";\n\nimport "@ui5/webcomponents-icons/dist/filter.js";\nimport "@ui5/webcomponents-icons/dist/employee.js";\nimport "@ui5/webcomponents-icons/dist/product.js";\nimport "@ui5/webcomponents-icons/dist/supplier.js";\nimport "@ui5/webcomponents-icons/dist/shipping-status.js";';function M(e){const{Editor:n}={...(0,s.R)(),...e.components};return n||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,i.jsx)(n,{html:R,js:L})}function P(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(M,{...e})}):M(e)}const B='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor)">\n    \x3c!-- playground-fold-end --\x3e\n\n    <ui5-avatar size="XL" shape="Square"\n        style="width: 250px; height:250px; border: 1px solid var(--sapField_BorderColor);">\n        <img src="../assets/images/avatars/Lamp_avatar_01.jpg" alt="Lamp" style="object-fit: contain" />\n    </ui5-avatar>\n    \x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n',F='import "@ui5/webcomponents/dist/Avatar.js";\n';function N(e){const{Editor:n}={...(0,s.R)(),...e.components};return n||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,i.jsx)(n,{html:B,js:F})}function W(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(N,{...e})}):N(e)}const X={slug:"../Avatar",ui5_tag_name:"ui5-avatar",ui5_since:"1.0.0-rc.6"},U=void 0,Y={id:"components/main/Avatar",title:"Avatar",description:"An image-like component that has different display options for representing images and icons",source:"@site/docs/components/main/Avatar.mdx",sourceDirName:"components/main",slug:"/components/Avatar",permalink:"/ui5-webcomponents/components/Avatar",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{slug:"../Avatar",ui5_tag_name:"ui5-avatar",ui5_since:"1.0.0-rc.6"},sidebar:"componentsSidebar",previous:{title:"Main",permalink:"/ui5-webcomponents/components"},next:{title:"AvatarGroup",permalink:"/ui5-webcomponents/components/AvatarGroup"}},O={},q=[{value:"Keyboard Handling",id:"keyboard-handling",level:3},{value:"ES6 Module Import",id:"es6-module-import",level:3},{value:"Basic Sample",id:"basic-sample",level:2},{value:"Properties",id:"properties",level:2},{value:"disabled",id:"disabled",level:3},{value:"interactive",id:"interactive",level:3},{value:"icon",id:"icon",level:3},{value:"fallbackIcon",id:"fallbackicon",level:3},{value:"initials",id:"initials",level:3},{value:"shape",id:"shape",level:3},{value:"size",id:"size",level:3},{value:"colorScheme",id:"colorscheme",level:3},{value:"accessibleName",id:"accessiblename",level:3},{value:"accessibilityAttributes",id:"accessibilityattributes",level:3},{value:"Slots",id:"slots",level:2},{value:"default",id:"default",level:3},{value:"badge",id:"badge",level:3},{value:"Events",id:"events",level:2},{value:"Methods",id:"methods",level:2},{value:"CSS Parts",id:"css-parts",level:2},{value:"More Samples",id:"more-samples",level:2},{value:"Shapes",id:"shapes",level:3},{value:"Sizes",id:"sizes",level:3},{value:"Interactive",id:"interactive-1",level:3},{value:"Color Schemes",id:"color-schemes",level:3},{value:"With Icon",id:"with-icon",level:3},{value:"With Image",id:"with-image",level:3},{value:"With Badge",id:"with-badge",level:3},{value:"Custom Styling",id:"custom-styling",level:3}];function H(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"An image-like component that has different display options for representing images and icons\nin different shapes and sizes, depending on the use case."}),"\n",(0,i.jsx)(n.p,{children:"The shape can be circular or square. There are several predefined sizes, as well as an option to\nset a custom size."}),"\n",(0,i.jsx)(n.h3,{id:"keyboard-handling",children:"Keyboard Handling"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["[Space] / [Enter] or [Return] - Fires the ",(0,i.jsx)(n.code,{children:"click"})," event if the ",(0,i.jsx)(n.code,{children:"interactive"})," property is set to true."]}),"\n",(0,i.jsx)(n.li,{children:"[Shift] - If [Space] is pressed, pressing [Shift] releases the component without triggering the click event."}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"es6-module-import",children:"ES6 Module Import"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:'import "@ui5/webcomponents/dist/Avatar.js";'})}),"\n",(0,i.jsx)(n.h2,{id:"basic-sample",children:"Basic Sample"}),"\n",(0,i.jsx)(d,{}),"\n",(0,i.jsx)(n.h2,{id:"properties",children:"Properties"}),"\n",(0,i.jsx)(n.h3,{id:"disabled",children:"disabled"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{}),(0,i.jsx)(n.th,{})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Description"}),(0,i.jsx)(n.td,{children:"Defines whether the component is disabled. A disabled component can't be pressed or focused, and it is not in the tab chain."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Type"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Default"}),(0,i.jsx)(n.td,{children:"false"})]})]})]}),"\n",(0,i.jsx)(n.h3,{id:"interactive",children:"interactive"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{}),(0,i.jsx)(n.th,{})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Description"}),(0,i.jsxs)(n.td,{children:["Defines if the avatar is interactive (focusable and pressable).",(0,i.jsx)("br",{}),(0,i.jsx)(n.strong,{children:"Note:"})," This property won't have effect if the ",(0,i.jsx)(n.code,{children:"disabled"})," property is set to ",(0,i.jsx)(n.code,{children:"true"}),"."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Type"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Default"}),(0,i.jsx)(n.td,{children:"false"})]})]})]}),"\n",(0,i.jsx)(n.h3,{id:"icon",children:"icon"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{}),(0,i.jsx)(n.th,{})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Description"}),(0,i.jsxs)(n.td,{children:["Defines the name of the UI5 Icon, that will be displayed.",(0,i.jsx)("br",{}),(0,i.jsx)(n.strong,{children:"Note:"})," If ",(0,i.jsx)(n.code,{children:"image"})," slot is provided, the property will be ignored.",(0,i.jsx)("br",{}),(0,i.jsx)(n.strong,{children:"Note:"}),' You should import the desired icon first, then use its name as "icon".',(0,i.jsx)("br",{}),(0,i.jsx)(n.code,{children:'import "@ui5/webcomponents-icons/dist/{icon_name}.js"'}),(0,i.jsx)("br",{}),(0,i.jsx)(n.code,{children:'<ui5-avatar icon="employee">'}),(0,i.jsx)("br",{}),(0,i.jsx)(n.strong,{children:"Note:"}),' If no icon or an empty one is provided, by default the "employee" icon should be displayed.',(0,i.jsx)("br",{}),"See all the available icons in the ",(0,i.jsx)(n.a,{href:"https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html",children:"Icon Explorer"}),"."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Type"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string | undefined"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Default"}),(0,i.jsx)(n.td,{children:"undefined"})]})]})]}),"\n",(0,i.jsx)(n.h3,{id:"fallbackicon",children:"fallbackIcon"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{}),(0,i.jsx)(n.th,{})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Description"}),(0,i.jsxs)(n.td,{children:["Defines the name of the fallback icon, which should be displayed in the following cases:",(0,i.jsx)("br",{}),"- If the initials are not valid (more than 3 letters, unsupported languages or empty initials).",(0,i.jsx)("br",{}),"- If there are three initials and they do not fit in the shape (e.g. WWW for some of the sizes).",(0,i.jsx)("br",{}),"- If the image src is wrong.",(0,i.jsx)("br",{}),(0,i.jsx)(n.strong,{children:"Note:"}),' If not set, a default fallback icon "employee" is displayed.',(0,i.jsx)("br",{}),(0,i.jsx)(n.strong,{children:"Note:"}),' You should import the desired icon first, then use its name as "fallback-icon".',(0,i.jsx)("br",{}),(0,i.jsx)(n.code,{children:'import "@ui5/webcomponents-icons/dist/{icon_name}.js"'}),(0,i.jsx)("br",{}),(0,i.jsx)(n.code,{children:'<ui5-avatar fallback-icon="alert">'}),(0,i.jsx)("br",{}),"See all the available icons in the ",(0,i.jsx)(n.a,{href:"https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html",children:"Icon Explorer"}),"."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Type"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Default"}),(0,i.jsx)(n.td,{children:'"employee"'})]})]})]}),"\n",(0,i.jsx)(n.h3,{id:"initials",children:"initials"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{}),(0,i.jsx)(n.th,{})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Description"}),(0,i.jsxs)(n.td,{children:["Defines the displayed initials.",(0,i.jsx)("br",{}),"Up to three Latin letters can be displayed as initials."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Type"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string | undefined"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Default"}),(0,i.jsx)(n.td,{children:"undefined"})]})]})]}),"\n",(0,i.jsx)(n.h3,{id:"shape",children:"shape"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{}),(0,i.jsx)(n.th,{})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Description"}),(0,i.jsx)(n.td,{children:"Defines the shape of the component."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Type"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:'"Circle" | "Square"'})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Default"}),(0,i.jsx)(n.td,{children:'"Circle"'})]})]})]}),"\n",(0,i.jsx)(n.h3,{id:"size",children:"size"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{}),(0,i.jsx)(n.th,{})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Description"}),(0,i.jsx)(n.td,{children:"Defines predefined size of the component."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Type"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:'"XS" | "S" | "M" | "L" | "XL"'})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Default"}),(0,i.jsx)(n.td,{children:'"S"'})]})]})]}),"\n",(0,i.jsx)(n.h3,{id:"colorscheme",children:"colorScheme"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{}),(0,i.jsx)(n.th,{})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Description"}),(0,i.jsxs)(n.td,{children:["Defines the background color of the desired image. If ",(0,i.jsx)(n.code,{children:"colorScheme"})," is set to ",(0,i.jsx)(n.code,{children:"Auto"}),", the avatar will be displayed with the ",(0,i.jsx)(n.code,{children:"Accent6"})," color."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Type"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:'"Auto" | "Accent1" | "Accent2" | "Accent3" | "Accent4" | "Accent5" | "Accent6" | "Accent7" | "Accent8" | "Accent9" | "Accent10" | "Placeholder"'})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Default"}),(0,i.jsx)(n.td,{children:'"Auto"'})]})]})]}),"\n",(0,i.jsx)(n.h3,{id:"accessiblename",children:"accessibleName"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{}),(0,i.jsx)(n.th,{})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Description"}),(0,i.jsx)(n.td,{children:"Defines the text alternative of the component. If not provided a default text alternative will be set, if present."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Type"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string | undefined"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Default"}),(0,i.jsx)(n.td,{children:"undefined"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Since"}),(0,i.jsx)(n.td,{children:"1.0.0-rc.7"})]})]})]}),"\n",(0,i.jsx)(n.h3,{id:"accessibilityattributes",children:"accessibilityAttributes"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{}),(0,i.jsx)(n.th,{})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Description"}),(0,i.jsxs)(n.td,{children:["Defines the additional accessibility attributes that will be applied to the component. The following field is supported:",(0,i.jsx)("br",{}),"- ",(0,i.jsx)(n.strong,{children:"hasPopup"}),": Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button. Accepts the following string values: ",(0,i.jsx)(n.code,{children:"dialog"}),", ",(0,i.jsx)(n.code,{children:"grid"}),", ",(0,i.jsx)(n.code,{children:"listbox"}),", ",(0,i.jsx)(n.code,{children:"menu"})," or ",(0,i.jsx)(n.code,{children:"tree"}),"."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Type"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"AvatarAccessibilityAttributes"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Default"}),(0,i.jsx)(n.td,{children:"{}"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Since"}),(0,i.jsx)(n.td,{children:"2.0.0"})]})]})]}),"\n",(0,i.jsx)(n.h2,{id:"slots",children:"Slots"}),"\n",(0,i.jsx)(n.h3,{id:"default",children:"default"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{}),(0,i.jsx)(n.th,{})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Description"}),(0,i.jsxs)(n.td,{children:["Receives the desired ",(0,i.jsx)(n.code,{children:"<img>"})," tag",(0,i.jsx)("br",{}),(0,i.jsx)(n.strong,{children:"Note:"})," If you experience flickering of the provided image, you can hide the component until it is defined with the following CSS:",(0,i.jsx)("br",{})," ",(0,i.jsx)(n.code,{children:"ui5-avatar:not(:defined) {"}),(0,i.jsx)("br",{})," \xa0\xa0\xa0\xa0",(0,i.jsx)(n.code,{children:"visibility: hidden;"}),(0,i.jsx)("br",{})," ",(0,i.jsx)(n.code,{children:"}"})]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Type"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"Array<HTMLElement>"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Since"}),(0,i.jsx)(n.td,{children:"1.0.0-rc.15"})]})]})]}),"\n",(0,i.jsx)(n.h3,{id:"badge",children:"badge"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{}),(0,i.jsx)(n.th,{})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Description"}),(0,i.jsxs)(n.td,{children:["Defines the optional badge that will be used for visual affordance.",(0,i.jsx)("br",{}),(0,i.jsx)(n.strong,{children:"Note:"})," While the slot allows for custom badges, to achieve the Fiori design, you can use the ",(0,i.jsx)(n.code,{children:"ui5-tag"})," with ",(0,i.jsx)(n.code,{children:"ui5-icon"})," in the corresponding ",(0,i.jsx)(n.code,{children:"icon"})," slot, without text nodes."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Type"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"Array<HTMLElement>"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Since"}),(0,i.jsx)(n.td,{children:"1.7.0"})]})]})]}),"\n",(0,i.jsx)(n.h2,{id:"events",children:"Events"}),"\n",(0,i.jsx)(n.p,{children:"No events available for this component."}),"\n",(0,i.jsx)(n.h2,{id:"methods",children:"Methods"}),"\n",(0,i.jsx)(n.p,{children:"No methods available for this component."}),"\n",(0,i.jsx)(n.h2,{id:"css-parts",children:"CSS Parts"}),"\n",(0,i.jsx)(n.p,{children:"No CSS parts available for this component."}),"\n",(0,i.jsx)(n.h2,{id:"more-samples",children:"More Samples"}),"\n",(0,i.jsx)(n.h3,{id:"shapes",children:"Shapes"}),"\n",(0,i.jsx)(n.p,{children:"The Avatar comes in two shapes (Square and Circle)."}),"\n",(0,i.jsx)(D,{}),"\n",(0,i.jsx)(n.h3,{id:"sizes",children:"Sizes"}),"\n",(0,i.jsx)(n.p,{children:"The Avatar comes in several sizes (S to XL)."}),"\n",(0,i.jsx)(A,{}),"\n",(0,i.jsx)(n.h3,{id:"interactive-1",children:"Interactive"}),"\n",(0,i.jsx)(n.p,{children:"The Avatar can be interactive, e.g. responds to hover, focus and press."}),"\n",(0,i.jsx)(p,{}),"\n",(0,i.jsx)(n.h3,{id:"color-schemes",children:"Color Schemes"}),"\n",(0,i.jsx)(n.p,{children:"The Avatar can be dislpayed in multiple color schemes."}),"\n",(0,i.jsx)(g,{}),"\n",(0,i.jsx)(n.h3,{id:"with-icon",children:"With Icon"}),"\n",(0,i.jsx)(n.p,{children:"The Avatar can show icons."}),"\n",(0,i.jsx)(P,{}),"\n",(0,i.jsx)(n.h3,{id:"with-image",children:"With Image"}),"\n",(0,i.jsx)(n.p,{children:"The Avatar can show images."}),"\n",(0,i.jsx)(_,{}),"\n",(0,i.jsx)(n.h3,{id:"with-badge",children:"With Badge"}),"\n",(0,i.jsx)(n.p,{children:"The Avatar can show badge."}),"\n",(0,i.jsx)(m,{}),"\n",(0,i.jsx)(n.h3,{id:"custom-styling",children:"Custom Styling"}),"\n",(0,i.jsx)(n.p,{children:"The Avatar allows customization with pure CSS on tag level."}),"\n",(0,i.jsx)(W,{})]})}function G(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(H,{...e})}):H(e)}},71184:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>a});var i=t(14041);const s={},r=i.createContext(s);function o(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);