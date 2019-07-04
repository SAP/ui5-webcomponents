
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const BusyIndicatorLitRenderer = {};
const block0 = (context) => { return html`<div class="${ifDefined(classMap(context.classes.main))}">	${ context.active ? block1(context) : undefined }<slot></slot></div>`; };
const block1 = (context) => { return html`<div class="ui5-busyindicator-dynamic-content"><div class="ui5-busyindicator-circle circle-animation-0"></div><div class="ui5-busyindicator-circle circle-animation-1"></div><div class="ui5-busyindicator-circle circle-animation-2"></div></div>	`; };
const renderMe = block0;
BusyIndicatorLitRenderer.render = renderMe;
export default BusyIndicatorLitRenderer;