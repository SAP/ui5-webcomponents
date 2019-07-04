
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const block0 = (context) => { return html`<div	data-sap-ui-fastnavgroup="true"	class="${ifDefined(classMap(context.classes.main))}"	role="${ifDefined(context.accRole)}"><!-- header: either header or h1 with header text -->	${ context.fixed ? block1(context) : block4(context) }<!-- content area --><div class="${ifDefined(classMap(context.classes.content))}" tabindex="-1" style="${ifDefined(styleMap(context.styles.content))}"><slot></slot></div></div>`; };
const block1 = (context) => { return html`${ context.header.length ? block2(context) : undefined }${ context.shouldRenderH1 ? block3(context) : undefined }`; };
const block2 = (context) => { return html`<div class="sapMPanelHdrToolbar"><slot name="header"></slot></div>	`; };
const block3 = (context) => { return html`<h1 id="${ifDefined(context._id)}-header" class="sapMPanelHdr">			${ifDefined(context.headerText)}</h1>	`; };
const block4 = (context) => { return html`<header            @click="${ifDefined(context._header.press)}"            @keydown="${ifDefined(context.onHeaderKeyDown)}"            @keyup="${ifDefined(context.onHeaderKeyUp)}"            class="${ifDefined(classMap(context.classes.header))}"            tabindex="${ifDefined(context.headerTabIndex)}"		><ui5-icon				class="${ifDefined(classMap(context.classes.icon))}"				src="${ifDefined(context._icon.src)}"				title="${ifDefined(context._icon.title)}"				tabindex="${ifDefined(context.iconTabIndex)}"				aria-expanded="${ifDefined(context.expanded)}"				aria-labelledby="${ifDefined(context.ariaLabelledBy)}"				@ui5-press="${ifDefined(context._icon.press)}"			></ui5-icon>			${ context.header.length ? block5(context) : undefined }${ context.shouldRenderH1 ? block6(context) : undefined }</header>	`; };
const block5 = (context) => { return html`<div class="sapMPanelHdrToolbar"><slot name="header"></slot></div>	`; };
const block6 = (context) => { return html`<h1 id="${ifDefined(context._id)}-header" class="sapMPanelHdr">			${ifDefined(context.headerText)}</h1>	`; };

export default block0;