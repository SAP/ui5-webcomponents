/* eslint no-unused-vars: 0 */
import { html, repeat, ifDefined, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `<div class="ui5-calendar-legend-root" @focusout="${this._onFocusOut}" @focusin="${this._onFocusIn}" @keydown="${this._onItemKeyDown}" @mousedown="${this._onMouseDown}">${repeat(this.defaultItemsMapping, (item, index) => item._id || index, (item, index) => block1.call(this, context, tags, suffix, item, index))}${repeat(this.legendItems, (item, index) => item._id || index, (item, index) => block3.call(this, context, tags, suffix, item, index))}</div>`; }
function block1(context, tags, suffix, item, index) { return html `${!item.hide ? block2.call(this, context, tags, suffix, item, index) : undefined}`; }
function block2(context, tags, suffix, item, index) { return suffix ? html `<${scopeTag("ui5-calendar-legend-item", tags, suffix)} type=${ifDefined(item.type)}></${scopeTag("ui5-calendar-legend-item", tags, suffix)}>` : html `<ui5-calendar-legend-item type=${ifDefined(item.type)}></ui5-calendar-legend-item>`; }
function block3(context, tags, suffix, item, index) { return html `<slot name="${ifDefined(item._individualSlot)}"></slot>`; }
export default block0;
//# sourceMappingURL=CalendarLegendTemplate.lit.js.map