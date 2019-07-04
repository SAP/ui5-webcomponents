
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const TokenLitRenderer = {};
const block0 = (context) => { return html`<div tabindex="${ifDefined(context._tabIndex)}" @click="${ifDefined(context._select)}" @keydown="${ifDefined(context._keydown)}" class="ui5-token--wrapper"><span class="ui5-token--text"><slot></slot></span>	${ !context.readonly ? block1(context) : undefined }</div>`; };
const block1 = (context) => { return html`<ui5-icon @click="${ifDefined(context._delete)}" src="${ifDefined(context.iconURI)}" class="ui5-token--icon"></ui5-icon>	`; };
const renderMe = block0;
TokenLitRenderer.render = renderMe;
export default TokenLitRenderer;