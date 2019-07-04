
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const block0 = (context) => { return html`<div class="ui5-badge-wrapper" dir="${ifDefined(context.rtl)}"><slot name="icon"></slot>	${ context.hasText ? block1(context) : undefined }</div>`; };
const block1 = (context) => { return html`<label class="ui5-badge-text"><bdi><slot></slot></bdi></label>	`; };

export default block0;