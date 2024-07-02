import{x as a}from"./lit-element-c5a2b594.js";import{o as n}from"./unsafe-html-0ddd83da.js";import{l as b}from"./if-defined-c29cffe1.js";const x={default:{control:{type:"text"},table:{type:{summary:"Array<SideNavigationItem | SideNavigationGroup>"}}},fixedItems:{control:{type:"text"},table:{type:{summary:"Array<SideNavigationItem | SideNavigationGroup>"}}},header:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},"selection-change":{description:"Fired when the selection has changed via user interaction",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"SideNavigationSelectableItemBase",references:[{name:"SideNavigationSelectableItemBase",package:"@ui5/webcomponents-fiori",module:"dist/SideNavigationSelectableItemBase.js"}]},name:"item",_ui5privacy:"public",description:"the clicked item."}]}}},I={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.8",tagName:"ui5-side-navigation"};var o=Object.freeze,h=Object.defineProperty,f=(i,p)=>o(h(i,"raw",{value:o(p||i.slice())})),s;const y={title:"Fiori/Side Navigation",component:"SideNavigation",argTypes:x},c=i=>a`
<ui5-side-navigation ?collapsed="${b(i.collapsed)}">
    ${i.header?n(i.header):null}
    ${n(i.default)}
    ${n(i.fixedItems)}
</ui5-side-navigation>`,v=i=>a`<style>
    ui5-side-navigation {
        height: 600px;
    }
</style>

${i()}`,e=c.bind({});e.args={default:`<ui5-side-navigation-item text="Home" icon="home"></ui5-side-navigation-item>
    <ui5-side-navigation-group text="Group 1" expanded>
        <ui5-side-navigation-item text="External Link" icon="chain-link" href="https://sap.com" target="_blank"></ui5-side-navigation-item>
        <ui5-side-navigation-item text="People" expanded icon="group">
            <ui5-side-navigation-sub-item text="From My Team"></ui5-side-navigation-sub-item>
            <ui5-side-navigation-sub-item text="From Other Teams"></ui5-side-navigation-sub-item>
        </ui5-side-navigation-item>
    </ui5-side-navigation-group>
    <ui5-side-navigation-group text="Group 2" expanded>
        <ui5-side-navigation-item text="Locations" icon="locate-me" selected></ui5-side-navigation-item>
        <ui5-side-navigation-item text="Locations" disabled icon="locate-me"></ui5-side-navigation-item>
        <ui5-side-navigation-item text="Events" icon="calendar">
            <ui5-side-navigation-sub-item text="Local"></ui5-side-navigation-sub-item>
            <ui5-side-navigation-sub-item text="External Link" href="https://sap.com" target="_blank"></ui5-side-navigation-sub-item>
            <ui5-side-navigation-sub-item text="Others"></ui5-side-navigation-sub-item>
        </ui5-side-navigation-item>
    </ui5-side-navigation-group>`,fixedItems:`<ui5-side-navigation-item slot="fixedItems" text="Useful Links" icon="chain-link">
        <ui5-side-navigation-sub-item text="External Link" href="https://sap.com" target="_blank"></ui5-side-navigation-sub-item>
    </ui5-side-navigation-item>
    <ui5-side-navigation-item slot="fixedItems" text="History" icon="history"></ui5-side-navigation-item>`};e.decorators=[v];e.parameters={docs:{story:{iframeHeight:"700px",inline:!1}}};const t=c.bind({});t.args={default:`<ui5-side-navigation-item text="Home" icon="home"></ui5-side-navigation-item>
    <ui5-side-navigation-group text="Group" expanded>
        <ui5-side-navigation-item text="People" expanded icon="group">
            <ui5-side-navigation-sub-item text="From My Team"></ui5-side-navigation-sub-item>
            <ui5-side-navigation-sub-item text="From Other Team"></ui5-side-navigation-sub-item>
        </ui5-side-navigation-item>
        <ui5-side-navigation-item text="Locations" icon="locate-me" selected></ui5-side-navigation-item>
        <ui5-side-navigation-item text="Events" icon="calendar">
            <ui5-side-navigation-sub-item text="Local"></ui5-side-navigation-sub-item>
            <ui5-side-navigation-sub-item text="Others"></ui5-side-navigation-sub-item>
            <ui5-side-navigation-sub-item text="External Link" href="https://sap.com" target="_blank"></ui5-side-navigation-sub-item>
        </ui5-side-navigation-item>
    </ui5-side-navigation-group>
    <ui5-side-navigation-item text="External Link" icon="chain-link" href="https://sap.com" target="_blank"></ui5-side-navigation-item>`,fixedItems:`<ui5-side-navigation-item slot="fixedItems" text="Useful Links" icon="chain-link">
        <ui5-side-navigation-sub-item text="External Link" href="https://sap.com" target="_blank"></ui5-side-navigation-sub-item>
    </ui5-side-navigation-item>
    <ui5-side-navigation-item slot="fixedItems" text="History" icon="history"></ui5-side-navigation-item>`};t.decorators=[v,i=>a(s||(s=f([`<style>
	ui5-shellbar::part(root) {
		padding-inline-start: 0.75rem;
		padding-inline-end: 1.25rem;
		border-radius: 0.5rem;
		box-shadow:
			0 0 0.125rem 0 color-mix(in srgb, var(--sapContent_ShadowColor) 16%, transparent),
			0 0.5rem 1rem 0 color-mix(in srgb, var(--sapContent_ShadowColor) 16%, transparent);
	}

	.tool-layout {
		padding: 0.5rem 0.5rem 0 0.5rem;
		background: color-mix(in srgb, black 4%, var(--sapBackgroundColor));
		display: grid;
		gap: 0.5rem;
		grid-template-rows: auto 1fr;
		grid-template-columns: auto 1fr;
	}

	ui5-shellbar {
		grid-column: 1 / span 2;
		grid-row: 1 / 2;
	}

	ui5-side-navigation {
		border-radius: 0.5rem 0.5rem 0 0.5rem;
	}

	.content {
		background: var(--sapBackgroundColor);
		border-radius: 0.5rem 0.5rem 0 0;
		box-shadow:
			0 0 0.125rem 0 color-mix(in srgb, var(--sapContent_ShadowColor) 16%, transparent),
			0 0.5rem 1rem 0 color-mix(in srgb, var(--sapContent_ShadowColor) 16%, transparent);
	}
</style>

<div class="tool-layout">
	<ui5-shellbar
		primary-title="Product Name"
		secondary-title="Second Title"
		notifications-count="1"
		show-notifications>
		<img slot="logo" src="../assets/images/sap-logo-svg.svg" />
		<ui5-input slot="searchField"></ui5-input>
		<ui5-button icon="menu" slot="startButton" id="toggle"></ui5-button>
		<ui5-avatar slot="profile">
			<img src="../assets/images/avatars/woman_avatar_5.png" />
		</ui5-avatar>
		<ui5-shellbar-item icon="source-code" text="Settings" title="Settings"></ui5-shellbar-item>
		<ui5-shellbar-item icon="background" text="Settings" title="Settings"></ui5-shellbar-item>
		<ui5-shellbar-item icon="activity-assigned-to-goal" text="Settings" title="Settings"></ui5-shellbar-item>
		<ui5-shellbar-item icon="action-settings" text="Settings" title="Settings"></ui5-shellbar-item>
	</ui5-shellbar>

	`,`

	<div class="content"></div>
</div>

<script>
	var sidenav = document.querySelector("ui5-side-navigation");
	document.getElementById("toggle").addEventListener("click", () => {
		sidenav.toggleAttribute("collapsed");
	});
<\/script>`])),i())];t.parameters={layout:"fullscreen",docs:{story:{iframeHeight:"700px",inline:!1}}};var r,d,u;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`args => {
  return html\`
<ui5-side-navigation ?collapsed="\${ifDefined(args.collapsed)}">
    \${args.header ? unsafeHTML(args.header) : null}
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.fixedItems)}
</ui5-side-navigation>\`;
}`,...(u=(d=e.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var l,m,g;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`args => {
  return html\`
<ui5-side-navigation ?collapsed="\${ifDefined(args.collapsed)}">
    \${args.header ? unsafeHTML(args.header) : null}
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.fixedItems)}
</ui5-side-navigation>\`;
}`,...(g=(m=t.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};const S=["Basic","ToolLayout"],T=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,ToolLayout:t,__namedExportsOrder:S,default:y},Symbol.toStringTag,{value:"Module"}));export{T as C,I as c};
