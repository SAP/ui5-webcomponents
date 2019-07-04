
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const block0 = (context) => { return html`${ context.h1 ? block1(context) : undefined }${ context.h2 ? block2(context) : undefined }${ context.h3 ? block3(context) : undefined }${ context.h4 ? block4(context) : undefined }${ context.h5 ? block5(context) : undefined }${ context.h6 ? block6(context) : undefined }`; };
const block1 = (context) => { return html`<h1			class="${ifDefined(classMap(context.classes.main))}">				<span id="${ifDefined(context._id)}-inner"><slot></slot></span></h1>`; };
const block2 = (context) => { return html`<h2			class="${ifDefined(classMap(context.classes.main))}">				<span id="${ifDefined(context._id)}-inner"><slot></slot></span></h2>`; };
const block3 = (context) => { return html`<h3			class="${ifDefined(classMap(context.classes.main))}">				<span id="${ifDefined(context._id)}-inner"><slot></slot></span></h3>`; };
const block4 = (context) => { return html`<h4			class="${ifDefined(classMap(context.classes.main))}">				<span id="${ifDefined(context._id)}-inner"><slot></slot></span></h4>`; };
const block5 = (context) => { return html`<h5			class="${ifDefined(classMap(context.classes.main))}">				<span id="${ifDefined(context._id)}-inner"><slot></slot></span></h5>`; };
const block6 = (context) => { return html`<h6			class="${ifDefined(classMap(context.classes.main))}">				<span id="${ifDefined(context._id)}-inner"><slot></slot></span></h6>`; };

export default block0;