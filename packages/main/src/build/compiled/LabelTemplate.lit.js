
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const block0 = (context) => { return html`<label class="${ifDefined(classMap(context.classes.main))}" for="${ifDefined(context.for)}"><bdi id="${ifDefined(context._id)}-bdi"><slot></slot></bdi></label>`; };

export default block0;