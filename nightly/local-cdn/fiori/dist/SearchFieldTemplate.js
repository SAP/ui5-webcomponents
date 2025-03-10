import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Option from "@ui5/webcomponents/dist/Option.js";
import Select from "@ui5/webcomponents/dist/Select.js";
import SearchMode from "./types/SearchMode.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import search from "@ui5/webcomponents-icons/dist/search.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
export default function SearchFieldTemplate() {
    return (this.expanded ? (_jsx("div", { class: "ui5-search-field-root", role: "search", children: _jsxs("div", { class: "ui5-search-field-content", children: [this.mode === SearchMode.Scoped &&
                    _jsxs(_Fragment, { children: [_jsx(Select, { onChange: this._handleScopeChange, class: "sapUiSizeCompact", accessibleName: this._translations.scope, tooltip: this._translations.scope, children: this.scopeOptions.map(scopeOption => {
                                    return _jsx(Option, { selected: scopeOption.selected, "data-ui5-stable": scopeOption.stableDomRef, ref: this.captureRef.bind(scopeOption), children: scopeOption.text });
                                }, this) }), _jsx("div", { class: "ui5-search-field-separator" })] }), _jsx("input", { class: "ui5-search-field-inner-input", role: "searchbox", "aria-label": this.accessibleName, value: this.value, placeholder: this.placeholder, "data-sap-focus-ref": true, onInput: this._handleInput, onFocusIn: this._onfocusin, onFocusOut: this._onfocusout, onKeyDown: this._onkeydown }), this._effectiveShowClearIcon &&
                    _jsx(Icon, { class: "ui5-shell-search-field-icon", name: decline, showTooltip: true, accessibleName: this._translations.clearIcon, onClick: this._handleClear }), _jsx(Icon, { class: {
                        "ui5-shell-search-field-icon": true,
                        "ui5-shell-search-field-search-icon": this._isSearchIcon,
                    }, name: search, showTooltip: true, accessibleName: this._translations.searchIcon, onClick: this._handleSearchIconPress })] }) })) : (_jsx(Button, { class: "ui5-shell-search-field-button", icon: search, design: ButtonDesign.Transparent, "data-sap-focus-ref": true, onClick: this._handleSearchIconPress, tooltip: this._translations.collapsedSearch, accessibleName: this._translations.collapsedSearch, accessibilityAttributes: this._searchButtonAccessibilityAttributes })));
}
//# sourceMappingURL=SearchFieldTemplate.js.map