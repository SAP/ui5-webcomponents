/* eslint no-unused-vars: 0 */
import { html, classMap, ifDefined } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `<ul part="native-li" tabindex="${ifDefined(this.forcedTabIndex)}" class="ui5-ghli-root ${classMap(this.classes.main)}" @focusin="${this._onfocusin}" @keydown="${this._onkeydown}" aria-label="${ifDefined(this.ariaLabelText)}" aria-roledescription="${ifDefined(this.groupHeaderText)}" role="group"><div id="${ifDefined(this._id)}-content" class="ui5-li-content"><span class="ui5-ghli-title"><slot></slot></span></div></ul>`; }
export default block0;
//# sourceMappingURL=ListItemGroupHeaderTemplate.lit.js.map