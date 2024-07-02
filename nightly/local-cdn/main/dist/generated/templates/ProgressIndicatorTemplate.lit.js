/* eslint no-unused-vars: 0 */
import { html, classMap, styleMap, ifDefined, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `<div class="ui5-progress-indicator-root ${classMap(this.classes.root)}" role="progressbar" aria-valuemin="0" aria-valuenow="${ifDefined(this.validatedValue)}" aria-valuemax="100" aria-valuetext="${ifDefined(this.valueStateText)}" aria-label="${ifDefined(this.accessibleName)}"><div class="ui5-progress-indicator-bar" part="bar" style="${styleMap(this.styles.bar)}">${!this.showValueInRemainingBar ? block1.call(this, context, tags, suffix) : undefined}</div><div class="ui5-progress-indicator-remaining-bar" part="remaining-bar">${this.showValueInRemainingBar ? block6.call(this, context, tags, suffix) : undefined}</div></div>`; }
function block1(context, tags, suffix) { return html `${this.showIcon ? block2.call(this, context, tags, suffix) : undefined}${!this.hideValue ? block3.call(this, context, tags, suffix) : undefined}`; }
function block2(context, tags, suffix) { return suffix ? html `<${scopeTag("ui5-icon", tags, suffix)} name="${ifDefined(this.valueStateIcon)}" class="ui5-progress-indicator-icon"></${scopeTag("ui5-icon", tags, suffix)}>` : html `<ui5-icon name="${ifDefined(this.valueStateIcon)}" class="ui5-progress-indicator-icon"></ui5-icon>`; }
function block3(context, tags, suffix) { return html `<span class="ui5-progress-indicator-value">${this.displayValue ? block4.call(this, context, tags, suffix) : block5.call(this, context, tags, suffix)}</span>`; }
function block4(context, tags, suffix) { return html `${ifDefined(this.displayValue)}`; }
function block5(context, tags, suffix) { return html `${ifDefined(this.validatedValue)}% `; }
function block6(context, tags, suffix) { return html `${this.showIcon ? block7.call(this, context, tags, suffix) : undefined}${!this.hideValue ? block8.call(this, context, tags, suffix) : undefined}`; }
function block7(context, tags, suffix) { return suffix ? html `<${scopeTag("ui5-icon", tags, suffix)} name="${ifDefined(this.valueStateIcon)}" class="ui5-progress-indicator-icon"></${scopeTag("ui5-icon", tags, suffix)}>` : html `<ui5-icon name="${ifDefined(this.valueStateIcon)}" class="ui5-progress-indicator-icon"></ui5-icon>`; }
function block8(context, tags, suffix) { return html `<span class="ui5-progress-indicator-value">${this.displayValue ? block9.call(this, context, tags, suffix) : block10.call(this, context, tags, suffix)}</span>`; }
function block9(context, tags, suffix) { return html `${ifDefined(this.displayValue)}`; }
function block10(context, tags, suffix) { return html `${ifDefined(this.validatedValue)}% `; }
export default block0;
//# sourceMappingURL=ProgressIndicatorTemplate.lit.js.map