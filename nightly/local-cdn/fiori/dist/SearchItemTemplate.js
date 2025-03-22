import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Tag from "@ui5/webcomponents/dist/Tag.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
import TagDesign from "@ui5/webcomponents/dist/types/TagDesign.js";
export default function SearchFieldTemplate() {
    return (_jsx("li", { part: "native-li", class: "ui5-li-root ui5-li--focusable", "data-sap-focus-ref": true, draggable: this.movable, tabindex: this._effectiveTabIndex, onFocusIn: this._onfocusin, onFocusOut: this._onfocusout, onKeyUp: this._onkeyup, onKeyDown: this._onkeydown, onClick: this._onclick, children: _jsx("div", { part: "content", class: "ui5-search-item-content", children: _jsxs("div", { class: "ui5-search-item-begin-content", children: [this.icon &&
                        _jsx(Icon, { class: "ui5-search-item-icon", name: this.icon }), this.scopeName &&
                        _jsx(Tag, { design: TagDesign.Set2, colorScheme: "10", children: this.scopeName }), _jsx("div", { class: "ui5-search-item-titles-container", children: _jsx("span", { part: "title", class: "ui5-search-item-heading", dangerouslySetInnerHTML: { __html: this._markupText } }) }), this.selected &&
                        _jsx(Button, { class: "ui5-search-item-selected-delete", design: ButtonDesign.Transparent, icon: decline, onClick: this._onDeleteButtonClick })] }) }) }));
}
//# sourceMappingURL=SearchItemTemplate.js.map