"use strict";(self.webpackChunk_ui5_webcomponents_website=self.webpackChunk_ui5_webcomponents_website||[]).push([[8094],{64020:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>b,contentTitle:()=>d,default:()=>x,frontMatter:()=>c,metadata:()=>h,toc:()=>u});var i=n(31085),o=n(71184);const l='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor)">\n    <div class="section">\n\x3c!-- playground-fold-end --\x3e\n\n<ui5-table id="table" row-action-count="3">\n\x3c!-- playground-fold --\x3e\n\t<ui5-table-header-row slot="headerRow">\n\t\t<ui5-table-header-cell>Product</ui5-table-header-cell>\n\t\t<ui5-table-header-cell>Supplier</ui5-table-header-cell>\n\t\t<ui5-table-header-cell horizontal-align="End">Price</ui5-table-header-cell>\n\t</ui5-table-header-row>\n\t<ui5-table-row row-key="1" interactive>\n\t\t<ui5-table-cell><ui5-label><b>Notebook Basic 15</b><br><a href="#">HT-1000</a></ui5-label></ui5-table-cell>\n\t\t<ui5-table-cell><ui5-label>Very Best Screens</ui5-label></ui5-table-cell>\n\t\t<ui5-table-cell><ui5-label><b>899.99</b> EUR</ui5-label></ui5-table-cell>\n\t\t<ui5-table-row-action-navigation slot="actions"></ui5-table-row-action-navigation>\n\t</ui5-table-row>\n\x3c!-- playground-fold-end --\x3e\n\t<ui5-table-row row-key="2">\n\t\t<ui5-table-cell><ui5-label><b>Astro Laptop 216</b><br><a href="#">HT-1251</a></ui5-label></ui5-table-cell>\n\t\t<ui5-table-cell><ui5-label>Technocom</ui5-label></ui5-table-cell>\n\t\t<ui5-table-cell><ui5-label><b>679.99</b> EUR</ui5-label></ui5-table-cell>\n\t\t<ui5-table-row-action slot="actions" icon="delete" text="Delete" handler="onDelete"></ui5-table-row-action>\n\t\t<ui5-table-row-action slot="actions" icon="add" text="Add" handler="onAdd"></ui5-table-row-action>\n\t\t<ui5-table-row-action slot="actions" icon="edit" text="Edit" handler="onEdit"></ui5-table-row-action>\n\t\t<ui5-table-row-action slot="actions" icon="share" text="Share" handler="onShare"></ui5-table-row-action>\n\t\t<ui5-table-row-action slot="actions" icon="heart" text="Like" handler="onLike"></ui5-table-row-action>\n\t\t<ui5-table-row-action-navigation slot="actions" handler="onNavigate" interactive></ui5-table-row-action-navigation>\n\t</ui5-table-row>\n\x3c!-- playground-fold --\x3e\n\t<ui5-table-row row-key="3" navigated>\n\t\t<ui5-table-cell><ui5-label><b>Benda Laptop 1408</b><br><a href="#">HT-6102</a></ui5-label></ui5-table-cell>\n\t\t<ui5-table-cell><ui5-label>Ultrasonic United</ui5-label></ui5-table-cell>\n\t\t<ui5-table-cell><ui5-label><b>699.99</b> EUR</ui5-label></ui5-table-cell>\n\t\t<ui5-table-row-action slot="actions" icon="share" text="Share" handler="onShare"></ui5-table-row-action>\n\t\t<ui5-table-row-action slot="actions" icon="edit" text="Edit" handler="onEdit" invisible></ui5-table-row-action>\n\t\t<ui5-table-row-action slot="actions" icon="heart" text="Like" handler="onLike"></ui5-table-row-action>\n\t</ui5-table-row>\n\t<ui5-table-row row-key="4">\n\t\t<ui5-table-cell><ui5-label><b>Broad Screen 22HD</b><br><a href="#">HT-1255</a></ui5-label></ui5-table-cell>\n\t\t<ui5-table-cell><ui5-label>Speaker Experts</ui5-label></ui5-table-cell>\n\t\t<ui5-table-cell><ui5-label><b>399.99</b> EUR</ui5-label></ui5-table-cell>\n\t\t<ui5-table-row-action slot="actions" icon="share" text="Share" handler="onShare"></ui5-table-row-action>\n\t\t<ui5-table-row-action slot="actions" icon="add" text="Add" handler="onAdd"></ui5-table-row-action>\n\t</ui5-table-row>\n\x3c!-- playground-fold-end --\x3e\n</ui5-table>\n\n\x3c!-- playground-fold --\x3e\n\t</div>\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n',a='import "@ui5/webcomponents/dist/Table.js";\nimport "@ui5/webcomponents/dist/TableHeaderRow.js";\nimport "@ui5/webcomponents/dist/TableHeaderCell.js";\nimport "@ui5/webcomponents/dist/TableRow.js";\nimport "@ui5/webcomponents/dist/TableCell.js";\nimport "@ui5/webcomponents/dist/TableRowAction.js";\nimport "@ui5/webcomponents/dist/TableRowActionNavigation.js";\nimport "@ui5/webcomponents/dist/Label.js";\nimport "@ui5/webcomponents-icons/dist/add.js";\nimport "@ui5/webcomponents-icons/dist/edit.js";\nimport "@ui5/webcomponents-icons/dist/share.js";\nimport "@ui5/webcomponents-icons/dist/heart.js";\nimport "@ui5/webcomponents-icons/dist/delete.js";\n\nconst handlers = {\n\tonAdd: (row) => {\n\t\tconsole.log(`Add action of row ${row.rowKey} is clicked`);\n\t},\n\tonEdit: (row) => {\n\t\tconsole.log(`Edit action of row ${row.rowKey} is clicked`);\n\t},\n\tonLike: (row) => {\n\t\tconsole.log(`Like action of row ${row.rowKey} is clicked`);\n\t},\n\tonDelete: (row) => {\n\t\tconsole.log(`Delete action of row ${row.rowKey} is clicked`);\n\t},\n\tonShare: (row) => {\n\t\tconsole.log(`Share action of row ${row.rowKey} is clicked`);\n\t},\n\tonNavigate: (row) => {\n\t\tconsole.log(`Navigate action of row ${row.rowKey} is clicked`);\n\t},\n};\n\nconst table = document.getElementById("table");\ntable.addEventListener("row-action-click", (e) => {\n\tconst { action, row } = e.detail;\n\tconst handler = action.getAttribute("handler");\n\thandlers[handler]?.(row);\n})';function s(e){const t={code:"code",p:"p",...(0,o.R)(),...e.components},{Editor:n}=t;return n||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"ui5-table-row-action"})," component lets you incorporate interactive elements into table rows, enabling users to take actions directly related to each row."]}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"row-action-count"})," property of the ",(0,i.jsx)(t.code,{children:"ui5-table"})," component determines the width of the row action column. A maximum value of ",(0,i.jsx)(t.code,{children:"3"})," is recommended, as exceeding this limit may take up too much space on smaller screens. If the number of row actions exceeds the ",(0,i.jsx)(t.code,{children:"row-action-count"}),", an overflow button will appear, providing access to the additional actions."]}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"invisible"})," property of row actions allows you to hide specific row actions while preserving their space. This can be useful for consistent alignment of row actions across several rows."]}),"\n",(0,i.jsx)(n,{html:l,js:a})]})}function r(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}const c={slug:"../../TableRowAction",sidebar_class_name:"newComponentBadge expComponentBadge",ui5_tag_name:"ui5-table-row-action",ui5_since:"2.7.0"},d=void 0,h={id:"components/main/Table/TableRowAction",title:"TableRowAction",description:"The following entity is available under an experimental flag and its API and behavior are subject to change.",source:"@site/docs/components/main/Table/TableRowAction.mdx",sourceDirName:"components/main/Table",slug:"/components/TableRowAction",permalink:"/ui5-webcomponents/nightly/components/TableRowAction",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{slug:"../../TableRowAction",sidebar_class_name:"newComponentBadge expComponentBadge",ui5_tag_name:"ui5-table-row-action",ui5_since:"2.7.0"},sidebar:"componentsSidebar",previous:{title:"TableRow",permalink:"/ui5-webcomponents/nightly/components/TableRow"},next:{title:"TableRowActionNavigation",permalink:"/ui5-webcomponents/nightly/components/TableRowActionNavigation"}},b={},u=[{value:"ES6 Module Import",id:"es6-module-import",level:3},{value:"Properties",id:"properties",level:2},{value:"icon",id:"icon",level:3},{value:"text",id:"text",level:3},{value:"invisible",id:"invisible",level:3},{value:"Slots",id:"slots",level:2},{value:"Events",id:"events",level:2},{value:"click",id:"click",level:3},{value:"Methods",id:"methods",level:2},{value:"CSS Parts",id:"css-parts",level:2},{value:"Basic Sample",id:"basic-sample",level:2}];function p(e){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.admonition,{type:"info",children:(0,i.jsx)(t.p,{children:"The following entity is available under an experimental flag and its API and behavior are subject to change."})}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"ui5-table-row-action"})," component defines an action for table rows."]}),"\n",(0,i.jsx)(t.h3,{id:"es6-module-import",children:"ES6 Module Import"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.code,{children:'import "@ui5/webcomponents/dist/TableRowAction.js";'})}),"\n",(0,i.jsx)(t.h2,{id:"properties",children:"Properties"}),"\n",(0,i.jsx)(t.h3,{id:"icon",children:"icon"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{}),(0,i.jsx)(t.th,{})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Description"}),(0,i.jsxs)(t.td,{children:["Defines the icon of the row action.",(0,i.jsx)("br",{}),(0,i.jsx)(t.strong,{children:"Note:"})," For row actions to work properly, this property is mandatory.",(0,i.jsx)("br",{}),(0,i.jsx)(t.strong,{children:"Note:"})," SAP-icons font provides numerous built-in icons. To find all the available icons, see the ",(0,i.jsx)(t.a,{href:"https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html",children:"Icon Explorer"}),"."]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Type"}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"string"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Default"}),(0,i.jsx)(t.td,{children:'""'})]})]})]}),"\n",(0,i.jsx)(t.h3,{id:"text",children:"text"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{}),(0,i.jsx)(t.th,{})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Description"}),(0,i.jsxs)(t.td,{children:["Defines the text of the row action.",(0,i.jsx)("br",{}),(0,i.jsx)(t.strong,{children:"Note:"})," For row actions to work properly, this property is mandatory."]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Type"}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"string"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Default"}),(0,i.jsx)(t.td,{children:'""'})]})]})]}),"\n",(0,i.jsx)(t.h3,{id:"invisible",children:"invisible"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{}),(0,i.jsx)(t.th,{})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Description"}),(0,i.jsxs)(t.td,{children:["Defines the visibility of the row action.",(0,i.jsx)("br",{}),(0,i.jsx)(t.strong,{children:"Note:"})," Invisible row actions still take up space, allowing to hide the action while maintaining its position."]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Type"}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"boolean"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Default"}),(0,i.jsx)(t.td,{children:"false"})]})]})]}),"\n",(0,i.jsx)(t.h2,{id:"slots",children:"Slots"}),"\n",(0,i.jsx)(t.p,{children:"No slots available for this component."}),"\n",(0,i.jsx)(t.h2,{id:"events",children:"Events"}),"\n",(0,i.jsx)(t.h3,{id:"click",children:"click"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{}),(0,i.jsx)(t.th,{})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Description"}),(0,i.jsx)(t.td,{children:"Fired when a row action is clicked."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Type"}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"CustomEvent"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Since"}),(0,i.jsx)(t.td,{children:"2.9.0"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Bubbles"}),(0,i.jsx)(t.td,{children:"Yes"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Cancelable"}),(0,i.jsx)(t.td,{children:"No"})]})]})]}),"\n",(0,i.jsx)(t.h2,{id:"methods",children:"Methods"}),"\n",(0,i.jsx)(t.p,{children:"No methods available for this component."}),"\n",(0,i.jsx)(t.h2,{id:"css-parts",children:"CSS Parts"}),"\n",(0,i.jsx)(t.p,{children:"No CSS parts available for this component."}),"\n",(0,i.jsx)(t.h2,{id:"basic-sample",children:"Basic Sample"}),"\n",(0,i.jsx)(r,{})]})}function x(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(p,{...e})}):p(e)}},71184:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>s});var i=n(14041);const o={},l=i.createContext(o);function a(e){const t=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),i.createElement(l.Provider,{value:t},e.children)}}}]);