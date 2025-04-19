import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import CheckBox from "./CheckBox.js";
import TableHeaderCell from "./TableHeaderCell.js";
export default function TableHeaderRowTemplate() {
    return (_jsxs(_Fragment, { children: [this._hasRowSelector &&
                _jsx(TableHeaderCell, { id: "selection-cell", "aria-selected": this._isSelected, "aria-label": this._i18nSelection, "data-ui5-table-cell-fixed": true, "data-ui5-table-selection-component": true, children: this._isMultiSelect &&
                        _jsx(CheckBox, { id: "selection-component", tabindex: -1, checked: this._isSelected, onChange: this._onSelectionChange, accessibleName: this._i18nRowSelector }) }), this._visibleCells.map(cell => (_jsx("slot", { name: cell._individualSlot }, cell._individualSlot))), this._rowActionCount > 0 &&
                _jsx(TableHeaderCell, { id: "actions-cell", "aria-label": this._i18nRowActions }), this._popinCells.length > 0 &&
                _jsx(TableHeaderCell, { id: "popin-cell", "aria-label": this._i18nRowPopin, "data-excluded-from-navigation": true })] }));
}
//# sourceMappingURL=TableHeaderRowTemplate.js.map