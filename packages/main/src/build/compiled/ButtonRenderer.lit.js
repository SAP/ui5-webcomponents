
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const ButtonLitRenderer = {};
const block0 = (context) => { return html`<button 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}"		type="button"		class="${ifTruthy(context.classes.main)}"		style="${ifTruthy(context.styles.main)}"		disabled="${ifTruthy(context.ctr.disabled)}"		aria-disabled="${ifTruthy(context.ariaDisabled)}"		title="${ifTruthy(context.ctr.tooltip)}"		tabindex="${ifTruthy(context.tabindex)}"		data-sap-focus-ref			>		${ context.ctr._iconSettings ? block1(context) : undefined }${ context.ctr._nodeText ? block2(context) : undefined }</button>`; };
const block1 = (context) => { return html`<ui5-icon				class="${ifTruthy(context.classes.icon)}"				src="${ifTruthy(context.ctr._iconSettings.src)}"			></ui5-icon>		`; };
const block2 = (context) => { return html`<span id="${ifTruthy(context.ctr._id)}-content" dir="${ifTruthy(context.dir)}" class="${ifTruthy(context.classes.text)}"><bdi>${ifTruthy(context.ctr._nodeText)}</bdi></span>		`; };
const renderMe = block0;
ButtonLitRenderer.render = renderMe;
export default ButtonLitRenderer;