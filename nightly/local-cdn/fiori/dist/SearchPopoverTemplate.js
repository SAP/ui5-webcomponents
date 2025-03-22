import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Text from "@ui5/webcomponents/dist/Text.js";
import List from "@ui5/webcomponents/dist/List.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import ListSeparator from "@ui5/webcomponents/dist/types/ListSeparator.js";
import TitleLevel from "@ui5/webcomponents/dist/types/TitleLevel.js";
import PopoverHorizontalAlign from "@ui5/webcomponents/dist/types/PopoverHorizontalAlign.js";
import PopoverPlacement from "@ui5/webcomponents/dist/types/PopoverPlacement.js";
export default function SearchPopoverTemplate() {
    return (_jsx(ResponsivePopover, { hideArrow: true, preventFocusRestore: true, preventInitialFocus: true, placement: PopoverPlacement.Bottom, horizontalAlign: PopoverHorizontalAlign.Start, open: this.open, opener: this, onOpen: this._handleOpen, onClose: this._handleClose, class: "ui5-search-popover", children: this._showIllustration ?
            _jsx("slot", { name: "illustration" })
            : (this._showLoading ?
                _jsx(BusyIndicator, { class: "ui5-search-popover-loading-bi", active: true })
                : (_jsxs(_Fragment, { children: [this._showHeader &&
                            (_jsxs("header", { slot: "header", class: "ui5-search-popover-header", children: [_jsx(Title, { size: TitleLevel.H6, children: this.headerText }), _jsx(Text, { class: "ui5-search-popover-subheader", children: _jsx("i", { children: this.subheaderText }) })] })), _jsx("main", { children: _jsx(List, { class: "ui5-search-list", onLoadMore: this._handleMore, separators: ListSeparator.None, growingButtonText: this.popupActionText, growing: this._effectiveGrowing, onKeyDown: this._onItemKeydown, onItemClick: this._onItemClick, children: _jsx("slot", {}) }) })] }))) }));
}
//# sourceMappingURL=SearchPopoverTemplate.js.map