import{x as s}from"./lit-element-c5a2b594.js";import{l as t}from"./if-defined-c29cffe1.js";import{o as d}from"./unsafe-html-0ddd83da.js";import{T as G,a as P}from"./TableGrowingMode-c57ef93b.js";const j={growing:{control:"select",options:["Button","Scroll","None"]},mode:{control:"select",options:["None","SingleSelect","MultiSelect"]},default:{control:{type:"text"},table:{type:{summary:"Array<ITableRow>"}}},columns:{control:{type:"text"},table:{type:{summary:"Array<TableColumn>"}}},"row-click":{description:"Fired when a row in `Active` mode is clicked or `Enter` key is pressed.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"row",_ui5privacy:"public",description:"the activated row."}]}},"popin-change":{description:"Fired when `ui5-table-column` is shown as a pop-in instead of hiding it.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"Array"},name:"poppedColumns",_ui5privacy:"public",description:"popped-in columns."}]}},"selection-change":{description:"Fired when selection is changed by user interaction\nin `SingleSelect` and `MultiSelect` modes.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"Array"},name:"selectedRows",_ui5privacy:"public",description:"An array of the selected rows."},{type:{text:"Array"},name:"previouslySelectedRows",_ui5privacy:"public",description:"An array of the previously selected rows."}]}}},J={package:"@ui5/webcomponents",tagName:"ui5-table"};var p=Object.freeze,W=Object.defineProperty,U=(l,E)=>p(W(l,"raw",{value:p(E||l.slice())})),g,m;let e=0;const K={title:"Main/Table",component:"Table",argTypes:j},b=l=>s`
<ui5-table
    id="table-${++e}"
    no-data-text="${t(l.noDataText)}"
    growing-button-text="${t(l.growingButtonText)}"
    growing-button-subtext="${t(l.growingButtonSubtext)}"
    ?hide-no-data="${t(l.hideNoData)}"
    growing="${t(l.growing)}"
    ?busy="${t(l.busy)}"
    busy-delay="${t(l.busyDelay)}"
    ?sticky-column-header="${t(l.stickyColumnHeader)}"
    mode="${t(l.mode)}"
    accessible-name="${t(l.accessibleName)}"
    accessible-name-ref="${t(l.accessibleNameRef)}"
>
    ${d(l.default)}
    ${d(l.columns)}
</ui5-table>
`,o=b.bind({});o.decorators=[l=>s`
            <style>
                ui5-table ui5-table-column.table-header-text-alignment::part(column) {
                    text-align: end;
                }
            </style>
            ${l()}`];o.args={mode:G.None,columns:`
        <ui5-table-column slot="columns">
            <span>Product</span>
        </ui5-table-column>
        <ui5-table-column slot="columns" min-width="800">
            <span>Supplier</span>
        </ui5-table-column>
        <ui5-table-column slot="columns" min-width="600" popin-text="Dimensions" demand-popin="" class="table-header-text-alignment">
            <span>Dimensions</span>
        </ui5-table-column>
        <ui5-table-column slot="columns" min-width="600" popin-text="Weight" demand-popin="" class="table-header-text-alignment">
            <span>Weight</span>
        </ui5-table-column>
        <ui5-table-column slot="columns" class="table-header-text-alignment">
            <span>Price</span>
        </ui5-table-column>`,default:`
        <ui5-table-row>
            <ui5-table-cell>
                <span>Notebook Basic 15</span>
            </ui5-table-cell>
            <ui5-table-cell>
                <span>Very Best Screens</span>
            </ui5-table-cell>
            <ui5-table-cell style="text-align: right">
                <span>30 x 18 x 3cm</span>
            </ui5-table-cell>
            <ui5-table-cell style="text-align: right">
                <span style="color: #2b7c2b"><b style='padding-right: 0.125rem'>4.2</b>KG</span>
            </ui5-table-cell>
            <ui5-table-cell style="text-align: right">
                <span><b style='padding-right: 0.125rem'>956</b>EUR</span>
            </ui5-table-cell>
        </ui5-table-row>`};const r=b.bind({});r.decorators=[l=>s`
            <style>
                ui5-table ui5-table-column.table-header-text-alignment::part(column) {
                    text-align: end;
                }
            </style>
            ${l()}`];r.args={columns:`
        <ui5-table-column slot="columns" popin-display="Inline">
            <span>Product</span>
        </ui5-table-column>
        <ui5-table-column slot="columns" min-width="600" popin-text="Supplier" demand-popin="" popin-display="Inline">
            <span>Supplier</span>
        </ui5-table-column>
        <ui5-table-column slot="columns" min-width="800" popin-text="Dimensions" demand-popin="" class="table-header-text-alignment" popin-display="Inline">
            <span>Dimensions</span>
        </ui5-table-column>
        <ui5-table-column slot="columns" min-width="800" popin-text="Weight" demand-popin="" class="table-header-text-alignment" popin-display="Inline">
            <span>Weight</span>
        </ui5-table-column>
        <ui5-table-column slot="columns" class="table-header-text-alignment" popin-display="Inline">
            <span>Price</span>
        </ui5-table-column>`,default:`
        <ui5-table-row>
            <ui5-table-cell>
                <span>Notebook Basic 15</span>
            </ui5-table-cell>
            <ui5-table-cell>
                <span>Very Best Screens</span>
            </ui5-table-cell>
            <ui5-table-cell style="text-align: right">
                <span>30 x 18 x 3cm</span>
            </ui5-table-cell>
            <ui5-table-cell style="text-align: right">
                <span style="color: #2b7c2b"><b style='padding-right: 0.125rem'>4.2</b>KG</span>
            </ui5-table-cell>
            <ui5-table-cell style="text-align: right">
                <span><b style='padding-right: 0.125rem'>956</b>EUR</span>
            </ui5-table-cell>
        </ui5-table-row>
        <ui5-table-row>
            <ui5-table-cell>
                <span>Notebook Basic 175</span>
            </ui5-table-cell>
            <ui5-table-cell>
                <span>Very Best Screens</span>
            </ui5-table-cell>
            <ui5-table-cell style="text-align: right">
                <span>29 x 17 x 3.1cm</span>
            </ui5-table-cell>
            <ui5-table-cell style="text-align: right">
                <span style="color: #2b7c2b"><b style='padding-right: 0.125rem'>4.5</b>KG</span>
            </ui5-table-cell>
            <ui5-table-cell style="text-align: right">
                <span><b style='padding-right: 0.125rem'>1249</b>EUR</span>
            </ui5-table-cell>
        </ui5-table-row>
        <ui5-table-row>
            <ui5-table-cell>
                <span>Notebook Basic 18</span>
            </ui5-table-cell>
            <ui5-table-cell>
                <span>Very Best Screens</span>
            </ui5-table-cell>
            <ui5-table-cell style="text-align: right">
                <span>28 x 19 x 2.5cm</span>
            </ui5-table-cell>
            <ui5-table-cell style="text-align: right">
                <span style="color: #2b7c2b"><b style='padding-right: 0.125rem'>4.2</b>KG</span>
            </ui5-table-cell>
            <ui5-table-cell style="text-align: right">
                <span><b style='padding-right: 0.125rem'>1570</b>EUR</span>
            </ui5-table-cell>
        </ui5-table-row>`};const c=b.bind({});c.decorators=[l=>s`
            <style>
                ui5-table ui5-table-column.table-header-text-alignment::part(column) {
                    text-align: end;
                }
            </style>
            <div style="height: 150px; overflow: scroll;">
                ${l()}
            </div>`];c.args={stickyColumnHeader:!0,columns:`
        <ui5-table-column slot="columns">
            <span>Product</span>
        </ui5-table-column>
        <ui5-table-column slot="columns" min-width="800">
            <span>Supplier</span>
        </ui5-table-column>
        <ui5-table-column slot="columns" min-width="600" popin-text="Dimensions" demand-popin="" class="table-header-text-alignment">
            <span>Dimensions</span>
        </ui5-table-column>
        <ui5-table-column slot="columns" min-width="600" popin-text="Weight" demand-popin="" class="table-header-text-alignment">
            <span>Weight</span>
        </ui5-table-column>
        <ui5-table-column slot="columns" class="table-header-text-alignment">
            <span>Price</span>
        </ui5-table-column>`,default:`
        <ui5-table-row>
            <ui5-table-cell>
                <span>Notebook Basic 15</span>
            </ui5-table-cell>
            <ui5-table-cell>
                <span>Very Best Screens</span>
            </ui5-table-cell>
            <ui5-table-cell style="text-align: right">
                <span>30 x 18 x 3cm</span>
            </ui5-table-cell>
            <ui5-table-cell style="text-align: right">
                <span style="color: #2b7c2b"><b style='padding-right: 0.125rem'>4.2</b>KG</span>
            </ui5-table-cell>
            <ui5-table-cell style="text-align: right">
                <span><b style='padding-right: 0.125rem'>956</b>EUR</span>
            </ui5-table-cell>
        </ui5-table-row>
        <ui5-table-row>
            <ui5-table-cell>
                <span>Notebook Basic 175</span>
            </ui5-table-cell>
            <ui5-table-cell>
                <span>Very Best Screens</span>
            </ui5-table-cell>
            <ui5-table-cell style="text-align: right">
                <span>29 x 17 x 3.1cm</span>
            </ui5-table-cell>
            <ui5-table-cell style="text-align: right">
                <span style="color: #2b7c2b"><b style='padding-right: 0.125rem'>4.5</b>KG</span>
            </ui5-table-cell>
            <ui5-table-cell style="text-align: right">
                <span><b style='padding-right: 0.125rem'>1249</b>EUR</span>
            </ui5-table-cell>
        </ui5-table-row>
        <ui5-table-row>
            <ui5-table-cell>
                <span>Notebook Basic 18</span>
            </ui5-table-cell>
            <ui5-table-cell>
                <span>Very Best Screens</span>
            </ui5-table-cell>
            <ui5-table-cell style="text-align: right">
                <span>28 x 19 x 2.5cm</span>
            </ui5-table-cell>
            <ui5-table-cell style="text-align: right">
                <span style="color: #2b7c2b"><b style='padding-right: 0.125rem'>4.2</b>KG</span>
            </ui5-table-cell>
            <ui5-table-cell style="text-align: right">
                <span><b style='padding-right: 0.125rem'>1570</b>EUR</span>
            </ui5-table-cell>
        </ui5-table-row>
        <ui5-table-row>
            <ui5-table-cell>
                <span>Notebook Basic 19</span>
            </ui5-table-cell>
            <ui5-table-cell>
                <span>Smartcards</span>
            </ui5-table-cell>
            <ui5-table-cell style="text-align: right">
                <span>32 x 21 x 4cm</span>
            </ui5-table-cell>
            <ui5-table-cell style="text-align: right">
                <span style="color: #2b7c2b"><b style='padding-right: 0.125rem'>4.2</b>KG</span>
            </ui5-table-cell>
            <ui5-table-cell style="text-align: right">
                <span><b style='padding-right: 0.125rem'>1650</b>EUR</span>
            </ui5-table-cell>
        </ui5-table-row>`};const n=b.bind({});n.decorators=[l=>s`
            <style>
                ui5-table ui5-table-column.table-header-text-alignment::part(column) {
                    text-align: end;
                }
            </style>
            ${l()}`];n.args={noDataText:"No Data",columns:`
        <ui5-table-column slot="columns">
            <span>Product</span>
        </ui5-table-column>
        <ui5-table-column slot="columns" min-width="800">
            <span>Supplier</span>
        </ui5-table-column>
        <ui5-table-column slot="columns" min-width="600" popin-text="Dimensions" demand-popin="" class="table-header-text-alignment">
            <span>Dimensions</span>
        </ui5-table-column>
        <ui5-table-column slot="columns" min-width="600" popin-text="Weight" demand-popin="" class="table-header-text-alignment">
            <span>Weight</span>
        </ui5-table-column>
        <ui5-table-column slot="columns" class="table-header-text-alignment">
            <span>Price</span>
        </ui5-table-column>`};const a=b.bind({});n.decorators=[l=>s`
            <style>
                ui5-table ui5-table-column.table-header-text-alignment::part(column) {
                    text-align: end;
                }
            </style>
            ${l()}`];a.args={growing:P.Button,columns:`
        <ui5-table-column slot="columns">
            <span>Product</span>
        </ui5-table-column>
        <ui5-table-column slot="columns" min-width="800">
            <span>Supplier</span>
        </ui5-table-column>
        <ui5-table-column slot="columns" min-width="600" popin-text="Dimensions" demand-popin="" class="table-header-text-alignment">
            <span>Dimensions</span>
        </ui5-table-column>
        <ui5-table-column slot="columns" min-width="600" popin-text="Weight" demand-popin="" class="table-header-text-alignment">
            <span>Weight</span>
        </ui5-table-column>
        <ui5-table-column slot="columns" class="table-header-text-alignment">
            <span>Price</span>
        </ui5-table-column>`};a.decorators=[l=>s(g||(g=U([`
			`,`
			<script>
				const growingTable`,' = document.getElementById("table-',`");
				const rows`,` = 4;
				let loads`,` = 1;
				let sliceIndex`,` = 0;
				let endSliceIndex`," = sliceIndex"," + rows",`;
				const init`,` = async (rows) => {
					const response = await fetch("../assets/data/products.json");
					const products = await response.json();
					const collectionLength = products.length;
					const loadsAll = Math.ceil(collectionLength / rows);
					const result = products.slice(sliceIndex`,", endSliceIndex",`).map((product, index) => {
                        return "<ui5-table-row  id=roll-" + index + ">" +
                            "<ui5-table-cell><span>" + product.name +"</span></ui5-table-cell>" +
                            "<ui5-table-cell><span>" + product.supplierName + "</span></ui5-table-cell>" +
                            "<ui5-table-cell style='text-align: right'><span>" + product.width + " x " + product.depth + " x " + product.height + product.dimUnit + "</span></ui5-table-cell>" +
                            "<ui5-table-cell style='text-align: right'><span style='color: #2b7c2b' class='middle'><b style='padding-right: 0.125rem'>" + product.weightMeasure + "</b>" + product.weightUnit + "</span></ui5-table-cell>" +
                            "<ui5-table-cell style='text-align: right'><span><b style='padding-right: 0.125rem'> " + product.price + "</b>" + product.currencyCode + "</span></ui5-table-cell></ui5-table-row>";
                    }).join("");
                    if (loads`,` >= loadsAll) {
						growingTable`,`.growing = "None";
					} else {
						growingTable`,'.setAttribute("growing-button-subtext", loads',` * rows + " of " + collectionLength);
						sliceIndex`,` += rows;
					}
					growingTable`,`.insertAdjacentHTML('beforeend', result);
				}
				const loadMore`,` = () => {
					growingTable`,`.busy = true;
					setTimeout(() => {
						++loads`,`;
						endSliceIndex`," = sliceIndex"," + rows",`;
						init`,"(rows",`);
						growingTable`,`.busy = false;
					}, 1500);
				}
				growingTable`,'.addEventListener("load-more", loadMore',`);
				init`,"(rows",`);
			<\/script>
			<style>
				ui5-table ui5-table-column.table-header-text-alignment::part(column) {
					text-align: end;
				}
			</style>`])),l(),e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e)];a.storyName='Growing with "More" Button';const i=b.bind({});i.args={growing:P.Scroll,columns:`
        <ui5-table-column id="column-1" slot="columns" width="350px">
            <ui5-label>Product</ui5-label>
        </ui5-table-column>
        <ui5-table-column id="column-2" slot="columns" min-width="800" popin-text="Supplier">
            <ui5-label>Supplier</ui5-label>
        </ui5-table-column>
        <ui5-table-column id="column-3" slot="columns" min-width="600" popin-text="Dimensions" demand-popin="" class="table-header-text-alignment">
            <div class="column-content">
                <ui5-label>Dimensions</ui5-label>
            </div>
        </ui5-table-column>
        <ui5-table-column id="column-4" slot="columns" min-width="600" popin-text="Weight" demand-popin="" class="table-header-text-alignment">
            <ui5-label>Weight</ui5-label>
        </ui5-table-column>
        <ui5-table-column id="column-5" slot="columns" class="table-header-text-alignment">
            <ui5-label>Price</ui5-label>
        </ui5-table-column>`};i.decorators=[l=>s(m||(m=U([`
			<div style="height: 200px; overflow: scroll;">
				`,`
			</div>
			<script>
				const growingTableScroll`,' = document.getElementById("table-',`");
				const rowsScroll`,` = 4;
				let sliceIndexScroll`,` = 0;
				let loadsScroll`,` = 1;
				let endSliceIndexScroll`," = sliceIndexScroll"," + rowsScroll",`;
				const fill`,` = async (rowsScroll) => {
					const responseScrollTable = await fetch("../assets/data/products.json");
					const productsScrollTable = await responseScrollTable.json();
					const collectionLengthScroll = productsScrollTable.length;
					let loadsAllScroll = Math.ceil(collectionLengthScroll / rowsScroll);
					const result = productsScrollTable.slice(sliceIndexScroll`,", endSliceIndexScroll",`).map((product, index) => {
                        return "<ui5-table-row  id=roll-" + index + ">" +
                            "<ui5-table-cell><span>" + product.name +"</span></ui5-table-cell>" +
                            "<ui5-table-cell><span>" + product.supplierName + "</span></ui5-table-cell>" +
                            "<ui5-table-cell style='text-align: right'><span>" + product.width + " x " + product.depth + " x " + product.height + product.dimUnit + "</span></ui5-table-cell>" +
                            "<ui5-table-cell style='text-align: right'><span style='color: #2b7c2b'><b style='padding-right: 0.125rem'>" + product.weightMeasure + "</b>" + product.weightUnit + "</span></ui5-table-cell>" +
                            "<ui5-table-cell style='text-align: right'><span><b style='padding-right: 0.125rem'> " + product.price + "</b>" + product.currencyCode + "</span></ui5-table-cell></ui5-table-row>";
                    }).join("");
                    if (loadsScroll`,` >= loadsAllScroll) {
						growingTableScroll`,`.growing = "None";
					} else {
						sliceIndexScroll`,` += rowsScroll;
					}
					growingTableScroll`,`.insertAdjacentHTML('beforeend', result);
				}
				const growOnScroll`,` = () => {
					let timeout`,`;
					growingTableScroll`,`.busy = true;
					if (timeout`,`) {
						clearTimeout(timeout`,`);
					}
					timeout`,` = setTimeout(() => {
						loadsScroll`,`++
						endSliceIndexScroll`," = sliceIndexScroll"," + rowsScroll",`;
						fill`,"(rowsScroll",`);
						growingTableScroll`,`.busy = false;
					}, 1500);
				}
				growingTableScroll`,'.addEventListener("load-more", growOnScroll',`);
				fill`,"(rowsScroll",`);
			<\/script>
			<style>
				ui5-table ui5-table-column.table-header-text-alignment::part(column) {
					text-align: end;
				}
			</style>`])),l(),e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e)];i.storyName="Growing on Scroll";const u=b.bind({});u.args={mode:G.SingleSelect,columns:`
        <ui5-table-column id="column-1" slot="columns">
            <ui5-label>City</ui5-label>
        </ui5-table-column>
        <ui5-table-column id="column-2" slot="columns" min-width="500" popin-text="Supplier" demand-popin="">
            <ui5-label>Supplier</ui5-label>
        </ui5-table-column>
        <ui5-table-column id="column-3" slot="columns" min-width="500">
            <ui5-label>Country</ui5-label>
        </ui5-table-column>
        `,default:`
        <ui5-table-group-row>Country: Bulgaria</ui5-table-group-row>
        <ui5-table-row>
            <ui5-table-cell><span>Sofia</span></ui5-table-cell>
            <ui5-table-cell><span>Company 1</span></ui5-table-cell>
            <ui5-table-cell><span>Bulgaria</span></ui5-table-cell>
        </ui5-table-row>
        <ui5-table-row>
            <ui5-table-cell><span>Plovdiv</span></ui5-table-cell>
            <ui5-table-cell><span>Company 2</span></ui5-table-cell>
            <ui5-table-cell><span>Bulgaria</span></ui5-table-cell>
        </ui5-table-row>
        <ui5-table-group-row><span>Country: USA</span></ui5-table-group-row>
        <ui5-table-row>
            <ui5-table-cell><span>Denver</span></ui5-table-cell>
            <ui5-table-cell><span>Company 3</span></ui5-table-cell>
            <ui5-table-cell><span>USA</span></ui5-table-cell>
        </ui5-table-row>
        <ui5-table-row>
            <ui5-table-cell><span>Boston</span></ui5-table-cell>
            <ui5-table-cell><span>Company 4</span></ui5-table-cell>
            <ui5-table-cell><span>USA</span></ui5-table-cell>
        </ui5-table-row>
        `};u.storyName="Grouping and Selection";var f,y,x;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`args => html\`
<ui5-table
    id="table-\${++index}"
    no-data-text="\${ifDefined(args.noDataText)}"
    growing-button-text="\${ifDefined(args.growingButtonText)}"
    growing-button-subtext="\${ifDefined(args.growingButtonSubtext)}"
    ?hide-no-data="\${ifDefined(args.hideNoData)}"
    growing="\${ifDefined(args.growing)}"
    ?busy="\${ifDefined(args.busy)}"
    busy-delay="\${ifDefined(args.busyDelay)}"
    ?sticky-column-header="\${ifDefined(args.stickyColumnHeader)}"
    mode="\${ifDefined(args.mode)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.columns)}
</ui5-table>
\``,...(x=(y=o.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var h,w,D;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`args => html\`
<ui5-table
    id="table-\${++index}"
    no-data-text="\${ifDefined(args.noDataText)}"
    growing-button-text="\${ifDefined(args.growingButtonText)}"
    growing-button-subtext="\${ifDefined(args.growingButtonSubtext)}"
    ?hide-no-data="\${ifDefined(args.hideNoData)}"
    growing="\${ifDefined(args.growing)}"
    ?busy="\${ifDefined(args.busy)}"
    busy-delay="\${ifDefined(args.busyDelay)}"
    ?sticky-column-header="\${ifDefined(args.stickyColumnHeader)}"
    mode="\${ifDefined(args.mode)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.columns)}
</ui5-table>
\``,...(D=(w=r.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};var $,S,T;c.parameters={...c.parameters,docs:{...($=c.parameters)==null?void 0:$.docs,source:{originalSource:`args => html\`
<ui5-table
    id="table-\${++index}"
    no-data-text="\${ifDefined(args.noDataText)}"
    growing-button-text="\${ifDefined(args.growingButtonText)}"
    growing-button-subtext="\${ifDefined(args.growingButtonSubtext)}"
    ?hide-no-data="\${ifDefined(args.hideNoData)}"
    growing="\${ifDefined(args.growing)}"
    ?busy="\${ifDefined(args.busy)}"
    busy-delay="\${ifDefined(args.busyDelay)}"
    ?sticky-column-header="\${ifDefined(args.stickyColumnHeader)}"
    mode="\${ifDefined(args.mode)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.columns)}
</ui5-table>
\``,...(T=(S=c.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var N,B,M;n.parameters={...n.parameters,docs:{...(N=n.parameters)==null?void 0:N.docs,source:{originalSource:`args => html\`
<ui5-table
    id="table-\${++index}"
    no-data-text="\${ifDefined(args.noDataText)}"
    growing-button-text="\${ifDefined(args.growingButtonText)}"
    growing-button-subtext="\${ifDefined(args.growingButtonSubtext)}"
    ?hide-no-data="\${ifDefined(args.hideNoData)}"
    growing="\${ifDefined(args.growing)}"
    ?busy="\${ifDefined(args.busy)}"
    busy-delay="\${ifDefined(args.busyDelay)}"
    ?sticky-column-header="\${ifDefined(args.stickyColumnHeader)}"
    mode="\${ifDefined(args.mode)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.columns)}
</ui5-table>
\``,...(M=(B=n.parameters)==null?void 0:B.docs)==null?void 0:M.source}}};var k,v,I;a.parameters={...a.parameters,docs:{...(k=a.parameters)==null?void 0:k.docs,source:{originalSource:`args => html\`
<ui5-table
    id="table-\${++index}"
    no-data-text="\${ifDefined(args.noDataText)}"
    growing-button-text="\${ifDefined(args.growingButtonText)}"
    growing-button-subtext="\${ifDefined(args.growingButtonSubtext)}"
    ?hide-no-data="\${ifDefined(args.hideNoData)}"
    growing="\${ifDefined(args.growing)}"
    ?busy="\${ifDefined(args.busy)}"
    busy-delay="\${ifDefined(args.busyDelay)}"
    ?sticky-column-header="\${ifDefined(args.stickyColumnHeader)}"
    mode="\${ifDefined(args.mode)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.columns)}
</ui5-table>
\``,...(I=(v=a.parameters)==null?void 0:v.docs)==null?void 0:I.source}}};var H,C,L;i.parameters={...i.parameters,docs:{...(H=i.parameters)==null?void 0:H.docs,source:{originalSource:`args => html\`
<ui5-table
    id="table-\${++index}"
    no-data-text="\${ifDefined(args.noDataText)}"
    growing-button-text="\${ifDefined(args.growingButtonText)}"
    growing-button-subtext="\${ifDefined(args.growingButtonSubtext)}"
    ?hide-no-data="\${ifDefined(args.hideNoData)}"
    growing="\${ifDefined(args.growing)}"
    ?busy="\${ifDefined(args.busy)}"
    busy-delay="\${ifDefined(args.busyDelay)}"
    ?sticky-column-header="\${ifDefined(args.stickyColumnHeader)}"
    mode="\${ifDefined(args.mode)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.columns)}
</ui5-table>
\``,...(L=(C=i.parameters)==null?void 0:C.docs)==null?void 0:L.source}}};var R,_,A;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`args => html\`
<ui5-table
    id="table-\${++index}"
    no-data-text="\${ifDefined(args.noDataText)}"
    growing-button-text="\${ifDefined(args.growingButtonText)}"
    growing-button-subtext="\${ifDefined(args.growingButtonSubtext)}"
    ?hide-no-data="\${ifDefined(args.hideNoData)}"
    growing="\${ifDefined(args.growing)}"
    ?busy="\${ifDefined(args.busy)}"
    busy-delay="\${ifDefined(args.busyDelay)}"
    ?sticky-column-header="\${ifDefined(args.stickyColumnHeader)}"
    mode="\${ifDefined(args.mode)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.columns)}
</ui5-table>
\``,...(A=(_=u.parameters)==null?void 0:_.docs)==null?void 0:A.source}}};const O=["Basic","PopinDisplayInline","StickyHeader","NoData","GrowingTableMoreButton","GrowingTableScroll","GroupingTableSelect"],Q=Object.freeze(Object.defineProperty({__proto__:null,Basic:o,GroupingTableSelect:u,GrowingTableMoreButton:a,GrowingTableScroll:i,NoData:n,PopinDisplayInline:r,StickyHeader:c,__namedExportsOrder:O,default:K},Symbol.toStringTag,{value:"Module"}));export{Q as C,J as c};
